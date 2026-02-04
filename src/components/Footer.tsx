import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-navy text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
             <div className="flex items-center mb-6">
                <span className="font-outfit text-2xl font-bold tracking-tighter">
                  GRID<span className="text-primary-blue">LINE</span>
                </span>
              </div>
              <p className="font-inter text-gridline-gray text-sm leading-relaxed mb-6">
                Aggregating premier digital infrastructure assets for the public markets.
              </p>
          </div>

          <div>
            <h4 className="font-instrument-sans text-xs font-bold uppercase tracking-widest text-gridline-gray mb-6">Investment</h4>
            <ul className="space-y-4 text-gridline-gray text-sm">
              <li><a href="#" className="font-inter hover:text-white transition-colors">Core Growth</a></li>
              <li><a href="#" className="font-inter hover:text-white transition-colors">Seed Capital</a></li>
              <li><a href="#" className="font-inter hover:text-white transition-colors">Performance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-instrument-sans text-xs font-bold uppercase tracking-widest text-gridline-gray mb-6">Company</h4>
            <ul className="space-y-4 text-gridline-gray text-sm">
              <li><a href="#" className="font-inter hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="font-inter hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-blue flex flex-col md:flex-row justify-between items-center gap-4 text-gridline-gray font-instrument-sans text-[10px] uppercase tracking-widest font-bold">
          <p>&copy; 2024 GRIDLINE. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-blue transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-blue transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-blue transition-colors">Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
