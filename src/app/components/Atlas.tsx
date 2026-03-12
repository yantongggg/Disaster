import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Wind, Mountain, TriangleAlert, Droplets, Sun, X, Shield, ZoomIn, ZoomOut, Waves, CloudRain, Activity, AlertCircle } from "lucide-react";

// ASEAN Map Background Image
const aseanMapImage = "/asean-disaster-map.png";

// SVG Map Component with embedded markers via foreignObject
interface AseanMapSVGProps {
  markers: typeof markers;
  selectedDisaster: any;
  onMarkerClick: (marker: any) => void;
}

const AseanMapSVG = ({ markers, selectedDisaster, onMarkerClick }: AseanMapSVGProps) => (
  <svg viewBox="0 0 1600 1200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Ocean background */}
    <rect width="1600" height="1200" fill="#DBEAFE" />

    {/* Myanmar */}
    <path d="M300 280 L360 240 L380 300 L370 360 L350 420 L310 440 L270 420 L250 360 Z"
      fill="#FDE68A" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <text x="315" y="340" textAnchor="middle" fontWeight="900" fontSize="15" fill="#1E293B">Myanmar</text>

    {/* Laos */}
    <path d="M480 270 L530 250 L550 290 L540 350 L520 400 L490 380 L460 330 Z"
      fill="#D9F99D" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <text x="505" y="330" textAnchor="middle" fontWeight="900" fontSize="14" fill="#1E293B">Laos</text>

    {/* Thailand */}
    <path d="M390 380 L450 340 L480 370 L490 430 L480 500 L450 540 L410 550 L370 510 L350 440 Z"
      fill="#BBF7D0" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <text x="430" y="470" textAnchor="middle" fontWeight="900" fontSize="15" fill="#1E293B">Thailand</text>

    {/* Vietnam */}
    <path d="M620 270 L660 250 L680 290 L690 350 L710 410 L720 470 L710 530 L680 560 L640 540 L610 480 L600 410 Z"
      fill="#FECACA" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <text x="660" y="410" textAnchor="middle" fontWeight="900" fontSize="14" fill="#1E293B">Vietnam</text>

    {/* Cambodia */}
    <path d="M550 490 L600 470 L630 500 L620 550 L580 570 L540 540 Z"
      fill="#E9D5FF" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <text x="585" y="520" textAnchor="middle" fontWeight="900" fontSize="13" fill="#1E293B">Cambodia</text>

    {/* Malaysia (Peninsula) */}
    <path d="M440 610 L470 590 L490 620 L480 690 L460 750 L430 730 L400 670 Z"
      fill="#BFDBFE" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <text x="445" y="690" textAnchor="middle" fontWeight="900" fontSize="11" fill="#1E293B">Malaysia</text>

    {/* Singapore */}
    <circle cx="465" cy="795" r="16" fill="#FCA5A5" stroke="black" strokeWidth="4" />
    <text x="465" y="825" textAnchor="middle" fontWeight="900" fontSize="11" fill="#1E293B">SG</text>

    {/* Brunei */}
    <circle cx="720" cy="635" r="16" fill="#A7F3D0" stroke="black" strokeWidth="4" />
    <text x="720" y="665" textAnchor="middle" fontWeight="900" fontSize="11" fill="#1E293B">Brunei</text>

    {/* Malaysia (Borneo) */}
    <path d="M650 610 L720 590 L800 600 L820 640 L800 690 L740 700 L680 690 L650 650 Z"
      fill="#BFDBFE" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <text x="735" y="720" textAnchor="middle" fontWeight="900" fontSize="11" fill="#1E293B">Borneo</text>

    {/* Indonesia (Sumatra) */}
    <path d="M320 690 L380 650 L410 690 L400 770 L360 840 L320 860 L280 820 L270 760 Z"
      fill="#FED7AA" stroke="black" strokeWidth="4" strokeLinejoin="round" />

    {/* Indonesia (Java) */}
    <path d="M520 890 L600 880 L680 890 L740 900 L720 930 L620 940 L520 930 Z"
      fill="#FED7AA" stroke="black" strokeWidth="4" strokeLinejoin="round" />

    {/* Indonesia (Kalimantan) */}
    <path d="M650 690 L730 680 L810 700 L830 750 L800 800 L730 810 L670 790 L640 740 Z"
      fill="#FED7AA" stroke="black" strokeWidth="4" strokeLinejoin="round" />

    {/* Indonesia (Sulawesi) */}
    <path d="M860 710 L890 690 L910 720 L900 780 L880 800 L860 770 Z"
      fill="#FED7AA" stroke="black" strokeWidth="4" strokeLinejoin="round" />

    {/* Indonesia (Papua) */}
    <path d="M1020 740 L1100 720 L1160 740 L1150 790 L1080 810 L1020 790 Z"
      fill="#FED7AA" stroke="black" strokeWidth="4" strokeLinejoin="round" />

    <text x="730" y="970" textAnchor="middle" fontWeight="900" fontSize="17" fill="#1E293B">Indonesia</text>

    {/* Philippines */}
    <path d="M850 270 L880 250 L900 290 L890 350 L870 410 L850 390 L840 330 Z"
      fill="#C4B5FD" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <path d="M860 430 L890 420 L900 460 L880 490 L860 470 Z"
      fill="#C4B5FD" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <path d="M830 450 L850 440 L860 470 L840 500 L820 480 Z"
      fill="#C4B5FD" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <text x="885" y="340" textAnchor="middle" fontWeight="900" fontSize="14" fill="#1E293B">Philippines</text>

    {/* Compass rose */}
    <g transform="translate(1400, 950)">
      <circle r="40" fill="white" stroke="black" strokeWidth="4" />
      <polygon points="0,-32 6,-8 0,-14 -6,-8" fill="black" />
      <polygon points="0,32 6,8 0,14 -6,8" fill="#94A3B8" />
      <polygon points="-32,0 -8,-6 -14,0 -8,6" fill="#94A3B8" />
      <polygon points="32,0 8,-6 14,0 8,6" fill="#94A3B8" />
      <text y="-36" textAnchor="middle" fontWeight="900" fontSize="14" fill="black">N</text>
    </g>

    {/* Disaster Markers - rendered inside SVG using foreignObject for perfect alignment */}
    {!selectedDisaster && markers.map((marker) => {
      const IconComponent = marker.icon;
      // Offset by 48 to center the 96px marker (including shadow/padding)
      const offset = 48;

      return (
        <foreignObject
          key={marker.id}
          x={marker.svgX - offset}
          y={marker.svgY - offset}
          width="120"
          height="120"
          overflow="visible"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            onMarkerClick(marker);
          }}
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'markerFloat 3s ease-in-out infinite'
            }}
            className="marker-wrapper group"
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                border: '4px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                backgroundColor: 'white',
                position: 'relative',
                transition: 'transform 0.2s'
              }}
              className="hover:scale-110 active:scale-90"
            >
              <IconComponent size={32} color={marker.color} strokeWidth={2.5} />
            </div>

            {/* Country Label - shows on hover */}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '8px',
                backgroundColor: 'white',
                border: '3px solid black',
                padding: '4px 12px',
                borderRadius: '9999px',
                boxShadow: '2px 2px 0px rgba(0,0,0,1)',
                opacity: 0,
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
              }}
              className="group-hover:opacity-100 marker-label"
            >
              <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>
                {marker.country}
              </span>
            </div>
          </div>
        </foreignObject>
      );
    })}
  </svg>
);

// Matrix Markers (10 ASEAN Countries)
// Positions use exact SVG coordinates from text/circle elements
const markers = [
  {
    id: "ph",
    type: "typhoon",
    country: "Philippines",
    icon: Wind,
    color: "#4CC9F0",
    svgX: 885,  // From SVG text x="885"
    svgY: 340,  // From SVG text y="340"
    flag: "🇵🇭",
    profile: "Extremely high disaster risk. Located in the Pacific typhoon belt, volcanic arc, earthquake faults, and mountainous islands prone to landslides.",
    history: ["Super Typhoon Haiyan (2013): 6,300+ deaths, 4M displaced.", "Mount Pinatubo Eruption (1991): 800+ deaths."],
    pattern: ["Super typhoons", "Storm surges", "Flooding", "Volcanic eruptions"],
    forecast: "Climate models predict stronger typhoons, heavier rainfall, and larger storm surges."
  },
  {
    id: "id",
    type: "volcano",
    country: "Indonesia",
    icon: TriangleAlert,
    color: "#EF476F",
    svgX: 730,  // From SVG text x="730"
    svgY: 970,  // From SVG text y="970"
    flag: "🇮🇩",
    profile: "One of the most geologically active countries. Located along the Pacific Ring of Fire with 130+ active volcanoes.",
    history: ["2004 Indian Ocean Tsunami: 170,000+ deaths in Indonesia alone.", "Mount Merapi Eruption (2010): 350+ deaths.", "2025 Sumatra Flood: 1,000+ deaths."],
    pattern: ["Volcanic eruptions", "Earthquakes", "Monsoon flooding", "Tsunamis"],
    forecast: "Climate change increases extreme rainfall, landslides, and coastal flooding."
  },
  {
    id: "my",
    type: "flood",
    country: "Malaysia",
    icon: Droplets,
    color: "#4682B4",
    svgX: 445,  // From SVG text x="445"
    svgY: 690,  // From SVG text y="690"
    flag: "🇲🇾",
    profile: "Mainly faces hydrological disasters. High exposure to monsoon flooding, landslides, and coastal storms.",
    history: ["2021–2022 Floods: 54 deaths, massive damages in Selangor & KL.", "2025 Cyclonic Storm Senyar: Rare cyclone caused major flooding."],
    pattern: ["Flash floods", "Monsoon floods", "Urban flooding", "Landslides"],
    forecast: "Projections indicate heavier monsoon rainfall, stronger coastal storms, and increased urban flash floods."
  },
  {
    id: "th",
    type: "flood",
    country: "Thailand",
    icon: Waves,
    color: "#06D6A0",
    svgX: 430,  // From SVG text x="430"
    svgY: 470,  // From SVG text y="470"
    flag: "🇹🇭",
    profile: "Faces mainly monsoon floods, droughts, and tropical storms. Large rivers increase widespread flood risk.",
    history: ["2011 Mega Flood: 815 deaths, $46B damage. Bangkok almost completely flooded.", "2016–2017 Southern Floods: Affected 1.8M people."],
    pattern: ["Seasonal flooding", "Drought in northeast", "Tropical storms"],
    forecast: "Major concern: Bangkok sinking. Sea-level rise, river flooding, and urban drainage failure."
  },
  {
    id: "vn",
    type: "typhoon",
    country: "Vietnam",
    icon: CloudRain,
    color: "#118AB2",
    svgX: 660,  // From SVG text x="660"
    svgY: 410,  // From SVG text y="410"
    flag: "🇻🇳",
    profile: "One of the highest typhoon exposure levels in Asia. High risk of coastal and river flooding.",
    history: ["1964 Central Vietnam Floods: 7,000 deaths.", "2025 Typhoon Season: Several storms caused severe flooding."],
    pattern: ["Typhoons", "Flooding", "Landslides"],
    forecast: "Major issue: Mekong Delta sinking. Predictions suggest up to 54% of delta below sea level by 2100."
  },
  {
    id: "mm",
    type: "cyclone",
    country: "Myanmar",
    icon: Activity,
    color: "#FFD166",
    svgX: 315,  // From SVG text x="315"
    svgY: 340,  // From SVG text y="340"
    flag: "🇲🇲",
    profile: "Highly vulnerable to cyclones, earthquakes, landslides, and monsoon flooding.",
    history: ["Cyclone Nargis (2008): 138,000 deaths, millions displaced.", "2025 Earthquake: Magnitude 7.7 widespread damage.", "Cyclone Komen (2015): 1.7M displaced."],
    pattern: ["Cyclones", "Earthquakes", "Landslides", "Monsoon flooding"],
    forecast: "Climate models show stronger cyclones, increased coastal flooding, and landslides."
  },
  {
    id: "sg",
    type: "heat",
    country: "Singapore",
    icon: Sun,
    color: "#FF9F1C",
    svgX: 465,  // From SVG circle cx="465"
    svgY: 795,  // From SVG circle cy="795"
    flag: "🇸🇬",
    profile: "Has fewer disasters but faces increasing urban climate risks like heat waves and flash floods.",
    history: ["2010 Orchard Road Flood: Urban drainage failure caused major city flooding."],
    pattern: ["Heat waves", "Flash floods", "Sea level rise"],
    forecast: "Key concern: Sea level rise. Coastal flooding and extreme heat days are increasing."
  },
  {
    id: "kh",
    type: "flood",
    country: "Cambodia",
    icon: Droplets,
    color: "#073B4C",
    svgX: 585,  // From SVG text x="585"
    svgY: 520,  // From SVG text y="520"
    flag: "🇰🇭",
    profile: "Disasters are heavily linked to the Mekong River system, leading to alternating flood and drought cycles.",
    history: ["Mekong Floods (2000): 347 deaths, huge agricultural losses."],
    pattern: ["Seasonal flooding", "Droughts"],
    forecast: "Climate projections indicate extreme Mekong floods and severe droughts."
  },
  {
    id: "la",
    type: "flood",
    country: "Laos",
    icon: Mountain,
    color: "#8B5A2B",
    svgX: 505,  // From SVG text x="505"
    svgY: 330,  // From SVG text y="330"
    flag: "🇱🇦",
    profile: "A mountainous country facing significant risks from river flooding, landslides, and dam failures.",
    history: ["2018 Xe-Pian Xe-Namnoy Dam Collapse: Hundreds dead, thousands displaced."],
    pattern: ["River flooding", "Landslides", "Dam failures"],
    forecast: "Major threats include stronger monsoon floods and landslides."
  },
  {
    id: "bn",
    type: "storm",
    country: "Brunei",
    icon: Shield,
    color: "#06D6A0",
    svgX: 720,  // From SVG circle cx="720"
    svgY: 635,  // From SVG circle cy="635"
    flag: "🇧🇳",
    profile: "Lowest disaster exposure in ASEAN, with minimal displacement numbers.",
    history: ["Generally stable with the lowest disaster displacement numbers in Southeast Asia."],
    pattern: ["Flooding", "Storms"],
    forecast: "Potential future hazards include coastal flooding and stronger monsoon storms."
  }
];

export function Atlas() {
  const [selectedDisaster, setSelectedDisaster] = useState<any>(null);
  const [mapScale, setMapScale] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setMapScale(s => Math.min(s + 0.3, 2.5));
  const handleZoomOut = () => setMapScale(s => Math.max(s - 0.3, 0.5));

  const openDisaster = (d: any) => {
    setSelectedDisaster(d);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden font-sans bg-[#E6F4F1]">

      {/* Wave Background Pattern */}
      <div className="absolute inset-0 ocean-waves opacity-20 pointer-events-none z-0" />

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 pointer-events-none flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4 pointer-events-auto">
          <div className="flex-1 bg-white border-[4px] border-black rounded-full px-5 py-3 flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative">
            <Search size={20} className="text-slate-400" />
            <input
              type="text"
              placeholder="Where do you want to explore?"
              className="bg-transparent border-none outline-none w-full font-bold text-slate-700 placeholder:text-slate-400 text-sm"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
            />

            {/* Search Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && searchQuery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border-[4px] border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden z-50"
                >
                  {markers
                    .filter(m => m.country.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(m => (
                      <button
                        key={m.id}
                        onClick={() => openDisaster(m)}
                        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-slate-100 transition-colors text-left border-b border-slate-200 last:border-0"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-black shrink-0"
                          style={{ backgroundColor: m.color + '20', borderColor: m.color }}
                        >
                          <m.icon size={18} color={m.color} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-slate-800 text-sm">{m.country}</p>
                          <p className="text-xs text-slate-500 font-bold capitalize">{m.type} risk</p>
                        </div>
                        <span className="text-lg">{m.flag}</span>
                      </button>
                    ))}
                  {markers.filter(m => m.country.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="px-5 py-4 text-center text-slate-500 font-bold text-sm">
                      No countries found
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Base Layer */}
      <div className={`flex-1 relative overflow-hidden transition-all duration-700 ${selectedDisaster ? 'bg-[#1A2639]' : 'bg-[#E6F4F1]'}`} ref={mapRef}>

        {/* Map Focus Overlay */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-500 z-[5] pointer-events-none ${selectedDisaster ? 'opacity-20' : 'opacity-0'}`} />

        {/* Zoom Controls */}
        <div className="absolute bottom-24 right-6 z-20 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-12 h-12 bg-white rounded-full border-[3px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center active:translate-y-1 active:shadow-none transition-all"
          >
            <ZoomIn size={24} strokeWidth={2.5} className="text-slate-800" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-12 h-12 bg-white rounded-full border-[3px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center active:translate-y-1 active:shadow-none transition-all"
          >
            <ZoomOut size={24} strokeWidth={2.5} className="text-slate-800" />
          </button>
        </div>

        {/* Responsive Map Container */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div
            className="relative w-full max-w-[1600px] aspect-[4/3] origin-center rounded-3xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.3)] bg-[#DBEAFE]"
            animate={{ scale: mapScale }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag={!selectedDisaster}
            dragConstraints={mapRef}
            whileTap={{ cursor: selectedDisaster ? 'default' : 'grabbing' }}
            style={{
              backgroundImage: `url(${aseanMapImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          >
            {/* SVG Map with embedded markers - perfect alignment guaranteed */}
            <AseanMapSVG
              markers={markers}
              selectedDisaster={selectedDisaster}
              onMarkerClick={openDisaster}
            />
          </motion.div>
        </div>
      </div>

      {/* History Capsule Modal */}
      <AnimatePresence>
        {selectedDisaster && (
          <>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 w-full h-[65%] bg-white rounded-t-[32px] border-t-[4px] border-black shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-[50] p-6 flex flex-col"
            >
              {/* Handle */}
              <div className="w-16 h-2 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />

              <button
                onClick={() => { setSelectedDisaster(null); }}
                className="absolute top-6 right-6 w-10 h-10 bg-white border-2 border-slate-200 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors z-10"
              >
                <X size={20} strokeWidth={3} />
              </button>

              <div className="overflow-y-auto hide-scrollbar flex-1 pb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white`} style={{ borderColor: selectedDisaster.color }}>
                    <selectedDisaster.icon size={28} color={selectedDisaster.color} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-800 leading-none">
                      {selectedDisaster.country} <span className="text-2xl">{selectedDisaster.flag}</span>
                    </h2>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mt-1">Geographic Risk Profile</p>
                  </div>
                </div>

                {/* Risk Profile Card */}
                <div className="bg-slate-50 border-[3px] border-black rounded-2xl p-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-6">
                  <p className="text-lg font-bold text-slate-700 leading-snug">
                    {selectedDisaster.profile}
                  </p>
                </div>

                {/* Common Patterns */}
                <div className="mb-6">
                  <h3 className="text-lg font-black flex items-center gap-2 mb-3">
                    <Activity size={20} className="text-red-500" strokeWidth={3} /> Current Disaster Patterns
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDisaster.pattern.map((p: string, i: number) => (
                      <span key={i} className="bg-red-100 border-[2px] border-red-500 text-red-700 font-bold px-3 py-1 rounded-full text-sm shadow-[2px_2px_0px_rgba(239,68,68,1)]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Major Historical Disasters */}
                <div className="mb-6">
                  <h3 className="text-lg font-black flex items-center gap-2 mb-3">
                    <AlertCircle size={20} className="orange-500" strokeWidth={3} /> Major Historical Disasters
                  </h3>
                  <div className="space-y-3">
                    {selectedDisaster.history.map((h: string, i: number) => {
                      const [title, desc] = h.split(':');
                      return (
                        <div key={i} className="bg-white border-[2px] border-slate-300 rounded-xl p-3 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                          <span className="font-black text-slate-800 block">{title}</span>
                          {desc && <span className="font-medium text-slate-600 text-sm">{desc.trim()}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Future Forecast */}
                <div className="mb-6 bg-[#E6F4F1] border-[3px] border-black rounded-2xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-lg font-black flex items-center gap-2 mb-2 text-[#073B4C]">
                    <Search size={20} strokeWidth={3} /> Future Forecast Risks
                  </h3>
                  <p className="font-bold text-slate-700 text-sm leading-relaxed">
                    {selectedDisaster.forecast}
                  </p>
                </div>

              </div>
            </motion.div>

            {/* Click-away backdrop */}
            <div
              className="absolute inset-0 z-[40]"
              onClick={() => { setSelectedDisaster(null); }}
            />
          </>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .ocean-waves {
          background-image: radial-gradient(circle at 10px -5px, transparent 12px, #E6F4F1 13px),
                            radial-gradient(circle at 10px 15px, #E6F4F1 12px, transparent 13px);
          background-size: 20px 20px;
          background-color: #89CFF0;
        }
        @keyframes markerFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .marker-wrapper {
          animation: markerFloat 3s ease-in-out infinite;
        }
        .marker-wrapper:hover {
          animation-play-state: paused;
        }
        .marker-label:hover {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
