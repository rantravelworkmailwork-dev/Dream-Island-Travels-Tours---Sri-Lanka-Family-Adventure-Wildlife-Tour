document.addEventListener("DOMContentLoaded", function () {
  // Initialize map container safely
  const mapElement = document.getElementById("sri-lanka-map");
  if (!mapElement) return;

  const map = L.map("sri-lanka-map", {
    scrollWheelZoom: false // Prevents accidental scrolling on mobile
  }).setView([7.0, 80.6], 8);

  // Clean English-Only Map (Esri - Free, No API Key, No Watermarks)
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
  }).addTo(map);

  // Route pins matching the exact 10-day itinerary
  const routeStops = [
    {
      day: "Day 1 (Nov 21)",
      title: "Bandaranaike Airport",
      coords: [7.1803, 79.8841],
      desc: "Meet your Dream Island Travels & Tours chauffeur and transfer directly to Mirissa."
    },
    {
      day: "Days 1 – 5 (Nov 21 – 25)",
      title: "Mirissa",
      coords: [5.9483, 80.4716],
      desc: "Madu River boat safari, Galle Fort, southern coast beaches, Sinharaja Rainforest, optional whale & dolphin watching and Weligama Beach."
    },
    {
      day: "Day 5 (Nov 25)",
      title: "Udawalawe",
      coords: [6.4745, 80.8990],
      desc: "Morning jeep safari and a visit to the Udawalawe Elephant Transit Home."
    },
    {
      day: "Days 5 – 10 (Nov 25 – 30)",
      title: "Ella",
      coords: [6.8667, 81.0467],
      desc: "Ravana Falls, Mahamevnawa Monastery, Little Adam’s Peak sunrise, Nine Arch Bridge, Ella town and Lipton’s Seat."
    },
    {
      day: "Day 10 (Nov 30)",
      title: "Nanu Oya",
      coords: [6.9419, 80.7603],
      desc: "Scenic train journey from Ella to Nanu Oya, where your chauffeur meets you."
    },
    {
      day: "Day 10 (Nov 30)",
      title: "Nuwara Eliya",
      coords: [6.9497, 80.7891],
      desc: "Hill town with British colonial heritage, a traditional tea factory with a tea-making experience, and Ramboda Falls."
    },
    {
      day: "Day 10 (Nov 30)",
      title: "Colombo",
      coords: [6.9271, 79.8612],
      desc: "Arrive in Colombo and check in to your hotel. Overnight stay in Colombo."
    }
  ];

  const routeCoords = [];

  // Add Custom Numbered Markers & Popups
  routeStops.forEach((stop, index) => {
    routeCoords.push(stop.coords);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Jost', sans-serif; padding: 4px; max-width: 220px;">
        <span style="background:#0284c7; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${stop.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a; font-size: 14px;">${stop.title}</h6>
        <p style="font-size:12px; margin-top:4px; color:#1e293b; line-height: 1.4;">${stop.desc}</p>
      </div>
    `;

    L.marker(stop.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Draw Dashed Route Line Connecting the Destinations
  const polyline = L.polyline(routeCoords, {
    color: '#a8843f',
    weight: 4,
    opacity: 0.9,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View to show all Pins cleanly
  const fitMapBounds = () => {
    const isMobile = window.innerWidth < 768;
    const paddingVal = isMobile ? [15, 15] : [35, 35];
    map.fitBounds(polyline.getBounds(), { padding: paddingVal });
  };

  fitMapBounds();

  // Recalculate on screen resize or orientation change
  window.addEventListener('resize', () => {
    map.invalidateSize();
    fitMapBounds();
  });
});