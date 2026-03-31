"use client";

import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    google?: {
      maps?: {
        places?: unknown;
        event?: { clearInstanceListeners: (instance: unknown) => void };
      };
    };
  }
}

interface PlaceResult {
  address: string;
  placeId: string;
  country: string;
}

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: PlaceResult) => void;
  placeholder?: string;
  className?: string;
}

let scriptLoadPromise: Promise<void> | null = null;

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;

  if (window.google?.maps?.places) {
    scriptLoadPromise = Promise.resolve();
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadPromise = null;
      reject(new Error("Failed to load Google Maps script"));
    };
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

export default function PlacesAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Start typing an address...",
  className = "",
}: PlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePlaceChanged = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();
    if (!place) return;

    const address = place.formatted_address || place.name || "";
    const placeId = place.place_id || "";

    let country = "";
    if (place.address_components) {
      const countryComponent = place.address_components.find((c: any) =>
        c.types.includes("country")
      );
      if (countryComponent) {
        country = countryComponent.long_name;
      }
    }

    onChange(address);
    onPlaceSelect({ address, placeId, country });
  }, [onChange, onPlaceSelect]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey || !inputRef.current) return;

    let cancelled = false;

    loadGoogleMapsScript(apiKey).then(() => {
      if (cancelled || !inputRef.current) return;
      setIsLoaded(true);

      autocompleteRef.current = new (window as any).google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["establishment", "geocode"],
          fields: ["formatted_address", "place_id", "address_components", "name"],
        }
      );

      autocompleteRef.current.addListener("place_changed", handlePlaceChanged);
    }).catch((err) => {
      console.warn("Google Places failed to load:", err);
    });

    return () => {
      cancelled = true;
      if (autocompleteRef.current) {
        (window as any).google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [handlePlaceChanged]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={isLoaded ? placeholder : "Enter facility address"}
      className={className}
      autoComplete="off"
    />
  );
}
