import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const planeSvg = `
  <svg fill="currentColor" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.75,12a1,1,0,0,0-.55-.89L15.08,8.05v-4a3.08,3.08,0,1,0-6.16,0v4L2.8,11.11a1,1,0,0,0-.55.89v3.33a1,1,0,0,0,.43.83,1,1,0,0,0,.92.11l5.32-2V18l-1.82.6a1,1,0,0,0-.68.95V22a1,1,0,0,0,.3.71,1,1,0,0,0,.7.29h9.17a1,1,0,0,0,1-1V19.5a1,1,0,0,0-.68-.95L15.08,18V14.28l5.32,2a1,1,0,0,0,.92-.11,1,1,0,0,0,.43-.83Zm-7.31-.1a1,1,0,0,0-.93.11,1,1,0,0,0-.43.82v5.84a1,1,0,0,0,.69.95l1.81.6V21H8.41v-.78l1.81-.6a1,1,0,0,0,.69-.95V12.83a1,1,0,0,0-.43-.82,1,1,0,0,0-.93-.11l-5.31,2V12.62l6.11-3.06a1,1,0,0,0,.56-.89V4.08a1.08,1.08,0,1,1,2.16,0V8.67a1,1,0,0,0,.56.89l6.11,3.06v1.27Z"/>
  </svg>
`;

const getStyleByAltitude = (altitude) => {
  if (altitude < 3000) return { color: "#f59e0b", dashArray: "5, 5" };
  if (altitude < 9000) return { color: "#3b82f6", dashArray: "10, 10" };
  return { color: "#ef4444", dashArray: null };
};

const highlightStyle = {
  weight: 4,
  opacity: 1,
  dashArray: null,
};

const FlightMap = ({ flightData,selectedFlight,setSelectedFlight }) => {
  const mapRef = useRef(null);
  const flightLayersRef = useRef({});
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  useEffect(() => {
    if (selectedFlight) {
      setSelectedFlightId(selectedFlight.id);
    }else{
      setSelectedFlightId(null);
    }
    }, [selectedFlight]);

  console.log(selectedFlight, "selectedFlight");

  // Inisialisasi peta
  useEffect(() => {
    const map = L.map("flight-map").setView([20, 110], 4);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map);
    mapRef.current = map;

    const handleMapClick = () => {
      setSelectedFlightId(null);
      setSelectedFlight(null);
    };
    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
      map.remove();
    };
  }, []);

  // Render flight data
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.values(flightLayersRef.current).forEach((layerGroup) => {
      map.removeLayer(layerGroup);
    });
    flightLayersRef.current = {};

    flightData.forEach((flight) => {
      if (flight.status !== "Mengudara" && flight.status !== "EN_ROUTE") return;

      const { ketinggian = 0 } = flight.tooltipInfo ?? {};
      const defaultStyle = getStyleByAltitude(ketinggian);

      const startLatLng = L.latLng(flight.pathCoordinates[0].lat, flight.pathCoordinates[0].lon);
      const endLatLng = L.latLng(flight.pathCoordinates[1].lat, flight.pathCoordinates[1].lon);

      const flightPath = L.polyline([startLatLng, endLatLng], {
        ...defaultStyle,
        weight: 2,
        opacity: 0.7,
      });
      flightPath.addTo(map); // Harus sebelum getCenter()

      const midPoint = flightPath.getCenter();
      const p1 = map.project(startLatLng);
      const p2 = map.project(endLatLng);
      const angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI + 90;

      const planeIcon = L.divIcon({
        html: `<div style="transform: rotate(${angleDeg}deg); color: ${defaultStyle.color};">${planeSvg}</div>`,
        className: "leaflet-plane-icon",
        iconSize: [24, 24],
      });

      const marker = L.marker(midPoint, { icon: planeIcon });

      marker.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        setSelectedFlightId(flight.id);
        setSelectedFlight(flight);
      });

      const popupContent = `
        <div style="font-size: 0.85rem;">
          <strong>${flight.tooltipInfo?.maskapai ?? "Tanpa Nama"}</strong><br/>
          Status: <span style="color: #16a34a;">${flight.status}</span><br/>
          <hr style="margin: 4px 0;" />
          ✈️ <b>${flight.tooltipInfo?.pesawat ?? "Unknown"}</b><br/>
          <b>Rute:</b> ${flight.from} → ${flight.to}<br/>
          <hr style="margin: 4px 0;" />
          <b>Jadwal:</b><br/>
          🕑 ${new Date(flight.timestamp).toLocaleString()}<br/>
          <b>Ketinggian:</b> ${flight.tooltipInfo?.ketinggian ?? "-"} m<br/>
          <b>Kecepatan:</b> ${flight.tooltipInfo?.kecepatan ?? "-"} km/h<br/>
          <b>Heading:</b> ${flight.heading?.toFixed(1) ?? "-"}°<br/>
          ⏳ ${flight.progress ?? "-"}%
        </div>`;

      marker.bindPopup(popupContent);

      const group = L.layerGroup([flightPath, marker]).addTo(map);
      flightLayersRef.current[flight.id] = group;
    });
  }, [flightData]);

  // Highlight & sembunyikan layer berdasarkan state
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.entries(flightLayersRef.current).forEach(([id, group]) => {
      const flight = flightData.find((f) => f.id === id);
      if (!flight) return;

      const [path, marker] = group.getLayers();
      const markerElement = marker.getElement();

      const defaultStyle = getStyleByAltitude(flight.tooltipInfo?.ketinggian ?? 0);

      if (!markerElement) return;

      if (selectedFlightId) {
        if (id === selectedFlightId) {
          path.setStyle({ ...highlightStyle, color: defaultStyle.color, opacity: 1,weight: 4 });
          markerElement.parentElement.style.opacity = 1;
          markerElement.parentElement.style.zIndex = 1000;
        } else {
          path.setStyle({ ...defaultStyle, opacity: 0.05, weight: 2 });
          markerElement.parentElement.style.opacity = 0.2;
          markerElement.parentElement.style.zIndex = 100;
        }
      } else {
        path.setStyle({ ...defaultStyle, opacity: 0.3 ,weight: 2 });
        markerElement.parentElement.style.opacity = 1;
        markerElement.parentElement.style.zIndex = 500;
      }
    });
  }, [selectedFlightId, flightData]);

  return <div id="flight-map" className="w-full h-full p-4 rounded-lg z-10"></div>;
};

export default FlightMap;
