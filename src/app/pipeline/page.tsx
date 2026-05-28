"use client";

import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L: any;
  }
}

interface PipelineTarget {
  name: string;
  org_name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  status: string;
  research_priority: string;
  succession_risk_label: string;
  succession_risk_score: number;
  layer2_score: number;
  acquisition_score: number;
  estimated_capacity_mw: number;
  capacity_mw: number;
  capacity_confident: boolean;
  inflect_mw: number;
  inflect_tier: string;
  inflect_pue: number;
  network_count: number;
  ix_count: number;
  domain: string;
  website: string;
  peeringdb_id: number;
  domain_registrant_is_person: string;
  best_outreach_email: string;
  l3_founder_name_guess: string;
  l3_news_summary: string;
  l3_status: string;
  l4_primary_contact_name: string;
  l4_primary_contact_title: string;
  l4_primary_email: string;
  l4_linkedin_url: string;
  l4_outreach_readiness: number;
  l4_outreach_label: string;
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "#22c55e",
  NEEDS_REVIEW: "#eab308",
  DISQUALIFIED: "#ef4444",
  UNPROCESSED: "#64748b",
};

const TABLE_COLS = [
  { key: "name", label: "Name", width: "200px" },
  { key: "city", label: "City" },
  { key: "country", label: "CC", width: "40px" },
  { key: "capacity_mw", label: "MW", width: "50px", numeric: true },
  { key: "layer2_score", label: "L2", width: "50px", numeric: true },
  { key: "succession_risk_label", label: "Risk" },
  { key: "status", label: "Status" },
  { key: "research_priority", label: "Priority" },
  { key: "best_outreach_email", label: "Email", width: "180px" },
  { key: "l3_founder_name_guess", label: "Founder" },
];

export default function PipelineMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clusterRef = useRef<any>(null);
  const [allData, setAllData] = useState<PipelineTarget[]>([]);
  const [filteredData, setFilteredData] = useState<PipelineTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentView, setCurrentView] = useState<"map" | "table">("map");
  const [selectedTarget, setSelectedTarget] = useState<PipelineTarget | null>(null);
  const [sortCol, setSortCol] = useState("layer2_score");
  const [sortAsc, setSortAsc] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    statuses: ["ACTIVE", "NEEDS_REVIEW", "DISQUALIFIED", "UNPROCESSED"],
    priorities: ["HIGH", "MEDIUM", "LOW"],
    risks: ["High", "Medium", "Low"],
    countries: [] as string[],
    mwMin: 0,
    mwMax: 25,
    l2Min: 0,
    verifiedMw: false,
    hasEmail: false,
    hasFounder: false,
    personReg: false,
  });

  // Load data
  useEffect(() => {
    fetch("/api/pipeline-data")
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then((json) => {
        setAllData(json.features);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current, {
      center: [5, 115],
      zoom: 4,
      zoomControl: true,
      preferCanvas: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap &copy; CARTO",
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    const cluster = L.markerClusterGroup({
      maxClusterRadius: 40,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      iconCreateFunction: (c: any) => {
        const count = c.getChildCount();
        const size = count > 50 ? 44 : count > 20 ? 36 : 28;
        return L.divIcon({
          html: `<div style="width:${size}px;height:${size}px;background:#3b82f6cc;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;border:2px solid #3b82f644;">${count}</div>`,
          className: "",
          iconSize: [size, size],
        });
      },
    });
    map.addLayer(cluster);
    mapInstanceRef.current = map;
    clusterRef.current = cluster;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      clusterRef.current = null;
    };
  }, [loading]);

  // Apply filters
  const applyFilters = useCallback(() => {
    const f = filters;
    const filtered = allData.filter((d) => {
      if (!f.statuses.includes(d.status)) return false;
      if (!f.priorities.includes(d.research_priority)) return false;
      if (
        !f.risks.includes(d.succession_risk_label) &&
        d.succession_risk_label
      )
        return false;
      if (f.countries.length && !f.countries.includes(d.country)) return false;
      const mw = d.capacity_mw || d.estimated_capacity_mw || 0;
      if (mw < f.mwMin || mw > f.mwMax) return false;
      if (f.verifiedMw && !d.capacity_confident) return false;
      if (d.layer2_score < f.l2Min) return false;
      if (f.hasEmail && !d.best_outreach_email && !d.l4_primary_email)
        return false;
      if (f.hasFounder && !d.l3_founder_name_guess && !d.l4_primary_contact_name)
        return false;
      if (f.personReg && d.domain_registrant_is_person !== "Yes") return false;
      return true;
    });
    setFilteredData(filtered);
  }, [allData, filters]);

  useEffect(() => {
    if (allData.length) applyFilters();
  }, [allData, filters, applyFilters]);

  // Update map markers
  useEffect(() => {
    const L = window.L;
    const cluster = clusterRef.current;
    if (!L || !cluster) return;

    cluster.clearLayers();
    filteredData.forEach((d) => {
      const color = STATUS_COLORS[d.status] || "#64748b";
      const mw = d.capacity_mw || d.estimated_capacity_mw || 0;
      const size = Math.max(8, Math.min(20, 8 + mw * 4));
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:${size}px;height:${size}px;background:${color};border:2px solid ${color}44;border-radius:50%;opacity:0.9;"></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
      const marker = L.marker([d.lat, d.lng], { icon });
      marker.on("click", () => setSelectedTarget(d));
      cluster.addLayer(marker);
    });
  }, [filteredData]);

  // Resize map on view toggle
  useEffect(() => {
    if (currentView === "map" && mapInstanceRef.current) {
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 100);
    }
  }, [currentView]);

  const countries = [...new Set(allData.map((d) => d.country))].sort();

  const toggleFilter = (key: "statuses" | "priorities" | "risks", value: string) => {
    setFilters((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      statuses: ["ACTIVE", "NEEDS_REVIEW", "DISQUALIFIED", "UNPROCESSED"],
      priorities: ["HIGH", "MEDIUM", "LOW"],
      risks: ["High", "Medium", "Low"],
      countries: [],
      mwMin: 0,
      mwMax: 25,
      l2Min: 0,
      verifiedMw: false,
      hasEmail: false,
      hasFounder: false,
      personReg: false,
    });
  };

  // Stats
  const stats = {
    shown: filteredData.length,
    total: allData.length,
    active: filteredData.filter((d) => d.status === "ACTIVE").length,
    review: filteredData.filter((d) => d.status === "NEEDS_REVIEW").length,
    dq: filteredData.filter((d) => d.status === "DISQUALIFIED").length,
    unprocessed: filteredData.filter((d) => d.status === "UNPROCESSED").length,
    countries: new Set(filteredData.map((d) => d.country)).size,
    avgScore: filteredData.length
      ? (filteredData.reduce((s, d) => s + d.layer2_score, 0) / filteredData.length).toFixed(1)
      : "0",
  };

  // Sorted table data
  const sortedData = [...filteredData].sort((a, b) => {
    const col = TABLE_COLS.find((c) => c.key === sortCol);
    const av = (a as unknown as Record<string, unknown>)[sortCol];
    const bv = (b as unknown as Record<string, unknown>)[sortCol];
    if (col?.numeric) return sortAsc ? Number(av) - Number(bv) : Number(bv) - Number(av);
    return sortAsc
      ? String(av || "").localeCompare(String(bv || ""))
      : String(bv || "").localeCompare(String(av || ""));
  });

  const handleSort = (col: string) => {
    if (sortCol === col) setSortAsc(!sortAsc);
    else {
      setSortCol(col);
      setSortAsc(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: "#0f172a", color: "#e2e8f0" }}>
        <div className="text-center">
          <div className="text-xl font-bold mb-2">Loading Pipeline Map...</div>
          <div className="text-sm text-slate-400">Fetching target data</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: "#0f172a", color: "#e2e8f0" }}>
        <div className="text-center">
          <div className="text-xl font-bold mb-2 text-red-400">Error</div>
          <div className="text-sm text-slate-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: "#0f172a", color: "#e2e8f0", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Stats Bar */}
      <div className="flex items-center gap-6 px-4 py-2 border-b shrink-0" style={{ background: "#1e293b", borderColor: "#334155", fontSize: "13px" }}>
        <div className="font-bold text-[15px] text-white">GridLine Pipeline</div>
        <Stat value={stats.shown} label={`/ ${stats.total} targets`} />
        <Stat value={stats.active} label="Active" dot="active" />
        <Stat value={stats.review} label="Review" dot="review" />
        <Stat value={stats.dq} label="Disqualified" dot="disqualified" />
        <Stat value={stats.unprocessed} label="Unprocessed" dot="unprocessed" />
        <Stat value={stats.countries} label="Countries" />
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Avg L2:</span>
          <span className="font-bold text-[15px] text-white">{stats.avgScore}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[280px] shrink-0 overflow-y-auto p-3 border-r" style={{ background: "#1e293b", borderColor: "#334155" }}>
          {/* View Toggle */}
          <div className="flex gap-1 mb-3">
            <button
              onClick={() => setCurrentView("map")}
              className="flex-1 py-1.5 rounded text-xs border cursor-pointer transition-colors"
              style={{
                background: currentView === "map" ? "#3b82f6" : "#0f172a",
                color: currentView === "map" ? "#fff" : "#94a3b8",
                borderColor: currentView === "map" ? "#3b82f6" : "#334155",
              }}
            >
              Map
            </button>
            <button
              onClick={() => setCurrentView("table")}
              className="flex-1 py-1.5 rounded text-xs border cursor-pointer transition-colors"
              style={{
                background: currentView === "table" ? "#3b82f6" : "#0f172a",
                color: currentView === "table" ? "#fff" : "#94a3b8",
                borderColor: currentView === "table" ? "#3b82f6" : "#334155",
              }}
            >
              Table
            </button>
          </div>

          <FilterHeading>Status</FilterHeading>
          <div className="mb-2">
            {(["ACTIVE", "NEEDS_REVIEW", "DISQUALIFIED", "UNPROCESSED"] as const).map((s) => (
              <label key={s} className="flex items-center gap-1.5 text-[13px] py-0.5 cursor-pointer">
                <input type="checkbox" checked={filters.statuses.includes(s)} onChange={() => toggleFilter("statuses", s)} className="accent-blue-500" />
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s === "ACTIVE" ? "bg-green-500" : s === "NEEDS_REVIEW" ? "bg-yellow-500" : s === "DISQUALIFIED" ? "bg-red-500" : "bg-slate-500"}`} />
                {s === "NEEDS_REVIEW" ? "Needs Review" : s.charAt(0) + s.slice(1).toLowerCase()}
              </label>
            ))}
          </div>

          <FilterHeading>Country</FilterHeading>
          <div className="mb-2">
            <select
              multiple
              size={6}
              value={filters.countries}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  countries: [...e.target.selectedOptions].map((o) => o.value).filter(Boolean),
                }))
              }
              className="w-full text-[13px] rounded border px-2 py-1"
              style={{ background: "#0f172a", color: "#e2e8f0", borderColor: "#334155" }}
            >
              <option value="">All countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c} ({allData.filter((d) => d.country === c).length})
                </option>
              ))}
            </select>
          </div>

          <FilterHeading>Priority</FilterHeading>
          <div className="mb-2">
            {["HIGH", "MEDIUM", "LOW"].map((p) => (
              <label key={p} className="flex items-center gap-1.5 text-[13px] py-0.5 cursor-pointer">
                <input type="checkbox" checked={filters.priorities.includes(p)} onChange={() => toggleFilter("priorities", p)} className="accent-blue-500" />
                {p}
              </label>
            ))}
          </div>

          <FilterHeading>Succession Risk</FilterHeading>
          <div className="mb-2">
            {["High", "Medium", "Low"].map((r) => (
              <label key={r} className="flex items-center gap-1.5 text-[13px] py-0.5 cursor-pointer">
                <input type="checkbox" checked={filters.risks.includes(r)} onChange={() => toggleFilter("risks", r)} className="accent-blue-500" />
                {r}
              </label>
            ))}
          </div>

          <FilterHeading>Capacity (MW)</FilterHeading>
          <div className="mb-2">
            <input
              type="range"
              min={0}
              max={25}
              step={0.5}
              value={filters.mwMin}
              onChange={(e) => setFilters((prev) => ({ ...prev, mwMin: Number(e.target.value) }))}
              className="w-full accent-blue-500"
            />
            <div className="text-xs text-slate-400 text-right">
              {filters.mwMin} &ndash; {filters.mwMax} MW
            </div>
            <input
              type="range"
              min={0}
              max={25}
              step={0.5}
              value={filters.mwMax}
              onChange={(e) => setFilters((prev) => ({ ...prev, mwMax: Number(e.target.value) }))}
              className="w-full accent-blue-500"
            />
          </div>

          <FilterHeading>Layer 2 Score (min)</FilterHeading>
          <div className="mb-2">
            <input
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={filters.l2Min}
              onChange={(e) => setFilters((prev) => ({ ...prev, l2Min: Number(e.target.value) }))}
              className="w-full accent-blue-500"
            />
            <div className="text-xs text-slate-400 text-right">&ge; {filters.l2Min}</div>
          </div>

          <FilterHeading>Signals</FilterHeading>
          <div className="mb-2 space-y-1">
            <ToggleRow label="Verified capacity only" checked={filters.verifiedMw} onChange={(v) => setFilters((prev) => ({ ...prev, verifiedMw: v }))} />
            <ToggleRow label="Has email" checked={filters.hasEmail} onChange={(v) => setFilters((prev) => ({ ...prev, hasEmail: v }))} />
            <ToggleRow label="Founder identified" checked={filters.hasFounder} onChange={(v) => setFilters((prev) => ({ ...prev, hasFounder: v }))} />
            <ToggleRow label="Person registrant" checked={filters.personReg} onChange={(v) => setFilters((prev) => ({ ...prev, personReg: v }))} />
          </div>

          <button
            onClick={resetFilters}
            className="w-full py-2 rounded text-[13px] mt-2 cursor-pointer border-none"
            style={{ background: "#334155", color: "#e2e8f0" }}
          >
            Reset Filters
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Map */}
          <div ref={mapRef} className="w-full h-full" style={{ display: currentView === "map" ? "block" : "none" }} />

          {/* Detail Panel */}
          {selectedTarget && currentView === "map" && (
            <DetailPanel target={selectedTarget} onClose={() => setSelectedTarget(null)} />
          )}

          {/* Table */}
          {currentView === "table" && (
            <div className="w-full h-full overflow-auto">
              <table className="w-full border-collapse text-xs">
                <thead className="sticky top-0 z-10">
                  <tr>
                    {TABLE_COLS.map((c) => (
                      <th
                        key={c.key}
                        onClick={() => handleSort(c.key)}
                        className="text-left px-2.5 py-2 whitespace-nowrap cursor-pointer border-b-2 hover:bg-slate-700/50"
                        style={{ background: "#1e293b", borderColor: "#334155", width: c.width }}
                      >
                        {c.label}
                        <span className="ml-1 text-slate-500">
                          {sortCol === c.key ? (sortAsc ? " ▲" : " ▼") : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((d, i) => {
                    const sc = d.status.toLowerCase().replace("needs_review", "review");
                    const borderColor =
                      sc === "active" ? "#22c55e" : sc === "review" ? "#eab308" : sc === "disqualified" ? "#ef4444" : "#64748b";
                    return (
                      <tr
                        key={i}
                        onClick={() => setSelectedTarget(d)}
                        className="cursor-pointer hover:bg-slate-800"
                        style={{ background: "#0f172a", borderLeft: `3px solid ${borderColor}` }}
                      >
                        {TABLE_COLS.map((c) => {
                          const val = (d as unknown as Record<string, unknown>)[c.key];
                          return (
                            <td key={c.key} className="px-2.5 py-1.5 whitespace-nowrap border-b" style={{ borderColor: "#1e293b" }}>
                              {c.key === "status" ? <Badge status={d.status} /> : c.key === "succession_risk_label" && val ? <Badge status={String(val)} /> : String(val || "")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function Stat({ value, label, dot }: { value: number | string; label: string; dot?: string }) {
  const dotColor = dot === "active" ? "#22c55e" : dot === "review" ? "#eab308" : dot === "disqualified" ? "#ef4444" : dot === "unprocessed" ? "#64748b" : null;
  return (
    <div className="flex items-center gap-1.5">
      {dotColor && <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: dotColor }} />}
      <span className="font-bold text-[15px] text-white">{value}</span>
      <span className="text-slate-400">{label}</span>
    </div>
  );
}

function FilterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[11px] uppercase tracking-wider text-slate-500 mt-3 mb-1.5 first:mt-0">{children}</h3>;
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between text-[13px] py-0.5">
      <span>{label}</span>
      <label className="relative w-9 h-5 cursor-pointer">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
        <span className="absolute inset-0 rounded-full transition-colors peer-checked:bg-blue-500" style={{ background: checked ? "#3b82f6" : "#334155" }} />
        <span
          className="absolute w-3.5 h-3.5 rounded-full left-[3px] bottom-[3px] transition-transform peer-checked:translate-x-4"
          style={{ background: checked ? "#fff" : "#94a3b8" }}
        />
      </label>
    </div>
  );
}

function Badge({ status }: { status: string }) {
  const s = status.toLowerCase().replace("needs_review", "review");
  const colors: Record<string, { bg: string; fg: string }> = {
    active: { bg: "#22c55e22", fg: "#22c55e" },
    review: { bg: "#eab30822", fg: "#eab308" },
    disqualified: { bg: "#ef444422", fg: "#ef4444" },
    unprocessed: { bg: "#64748b22", fg: "#94a3b8" },
    high: { bg: "#ef444422", fg: "#ef4444" },
    medium: { bg: "#eab30822", fg: "#eab308" },
    low: { bg: "#22c55e22", fg: "#22c55e" },
  };
  const c = colors[s] || { bg: "#64748b22", fg: "#94a3b8" };
  return (
    <span className="inline-block px-2 py-0.5 rounded-xl text-[11px] font-semibold" style={{ background: c.bg, color: c.fg }}>
      {status}
    </span>
  );
}

function DetailPanel({ target: d, onClose }: { target: PipelineTarget; onClose: () => void }) {
  const scoreColor = d.layer2_score >= 8 ? "#22c55e" : d.layer2_score >= 6 ? "#eab308" : "#ef4444";
  const founderName = d.l4_primary_contact_name || d.l3_founder_name_guess || "";
  const founderTitle = d.l4_primary_contact_title || "";
  const email = d.l4_primary_email || d.best_outreach_email || "";

  return (
    <div
      className="absolute top-2.5 right-2.5 w-[340px] max-h-[calc(100%-20px)] overflow-y-auto rounded-lg border z-[1000]"
      style={{ background: "#1e293bee", borderColor: "#334155" }}
    >
      <button onClick={onClose} className="absolute top-2 right-3 bg-transparent border-none text-slate-400 text-lg cursor-pointer hover:text-white">
        &times;
      </button>

      {/* Header */}
      <div className="px-4 pt-4 pb-2 border-b" style={{ borderColor: "#334155" }}>
        <h2 className="text-base font-bold text-white pr-6">{d.name}</h2>
        <div className="text-[13px] text-slate-400">
          {d.org_name ? `${d.org_name} · ` : ""}
          {d.city}, {d.country}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex gap-1.5 flex-wrap">
          <Badge status={d.status} />
          <Badge status={d.succession_risk_label || "N/A"} />
          <span className="inline-block px-2 py-0.5 rounded-xl text-[11px] font-semibold" style={{ background: "#3b82f622", color: "#60a5fa" }}>
            {d.research_priority}
          </span>
        </div>

        {/* Scores */}
        <Section title="Scores">
          <Row label="Layer 2 Score" value={`${d.layer2_score}/10`} />
          <div className="h-1.5 rounded-full overflow-hidden mt-0.5" style={{ background: "#334155" }}>
            <div className="h-full rounded-full" style={{ width: `${d.layer2_score * 10}%`, background: scoreColor }} />
          </div>
          <Row label="Acquisition Score" value={`${d.acquisition_score}/10`} />
          <Row label="Succession Risk" value={`${d.succession_risk_score}/5`} />
          {d.l4_outreach_readiness ? <Row label="Outreach Readiness" value={`${d.l4_outreach_readiness}/5 (${d.l4_outreach_label})`} /> : null}
        </Section>

        {/* Facility */}
        <Section title="Facility">
          <Row label="Capacity" value={`${d.capacity_mw} MW ${d.capacity_confident ? "✓" : "(est.)"}`} />
          {d.inflect_mw ? <Row label="Inflect Verified" value={`${d.inflect_mw} MW`} /> : null}
          {d.inflect_tier ? <Row label="Tier" value={d.inflect_tier} /> : null}
          {d.inflect_pue ? <Row label="PUE" value={String(d.inflect_pue)} /> : null}
          <Row label="Networks" value={String(d.network_count)} />
          <Row label="IXs" value={String(d.ix_count)} />
          {d.domain ? <Row label="Domain" value={d.domain} /> : null}
        </Section>

        {/* Contact */}
        {(founderName || email) && (
          <Section title="Contact">
            {founderName && <Row label="Contact" value={`${founderName}${founderTitle ? ` (${founderTitle})` : ""}`} />}
            {email && (
              <Row
                label="Email"
                value={
                  <a href={`mailto:${email}`} className="text-blue-400 no-underline hover:underline">
                    {email}
                  </a>
                }
              />
            )}
            {d.l4_linkedin_url && (
              <Row
                label="LinkedIn"
                value={
                  <a href={d.l4_linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 no-underline hover:underline">
                    Search &rarr;
                  </a>
                }
              />
            )}
          </Section>
        )}

        {/* News */}
        {d.l3_news_summary && (
          <Section title="News Check">
            <div className="text-xs text-slate-400 leading-relaxed">{d.l3_news_summary}</div>
          </Section>
        )}

        {/* Links */}
        <Section title="Links">
          {d.website && (
            <Row
              label="Website"
              value={
                <a href={d.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 no-underline hover:underline">
                  {d.website.replace(/https?:\/\/(www\.)?/, "").slice(0, 30)}
                </a>
              }
            />
          )}
          {d.peeringdb_id && (
            <Row
              label="PeeringDB"
              value={
                <a href={`https://www.peeringdb.com/fac/${d.peeringdb_id}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 no-underline hover:underline">
                  View &rarr;
                </a>
              }
            />
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] uppercase tracking-wider text-slate-500 mb-1.5">{title}</h4>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-0.5 text-[13px]">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-200 font-medium text-right max-w-[200px] overflow-hidden text-ellipsis">{value}</span>
    </div>
  );
}
