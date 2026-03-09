import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PLACES = [
  {
    id: "belohorizonte",
    name: "Belo Horizonte",
    state: "Minas Gerais, BR",
    emoji: "🏠",
    coords: [-19.9167, -43.9345] as [number, number],
    description: "Cidade onde sempre morei com minha família. Onde nasci, cresci e espero viver por mais muitos anos.",
    photo: "/public/belohorizonte.jpg",
    color: "#16a34a",
  },
  {
    id: "resendecosta",
    name: "Resende Costa",
    state: "Minas Gerais, BR",
    emoji: "🏘️",
    coords: [-20.9197, -44.2406] as [number, number],
    description: "Cidade da família do meu pai, onde no passado costumava passar férias com meus primos, vivendo uma vida de interior.",
    photo: "/public/resendecosta.jpg",
    color: "#b45309",
  },
  {
    id: "capitolio",
    name: "Capitólio",
    state: "Minas Gerais, BR",
    emoji: "🏔️",
    coords: [-20.6122, -46.0442] as [number, number],
    description: "Cidade onde já frequentei algumas vezes, no passado com minha família e mais recentemente com minha atual empresa, a ForceOne. Sempre me deslumbro com as paisagens.",
    photo: "/public/capitolio.jpg",
    color: "#c2410c",
  },
  {
    id: "buzios",
    name: "Búzios",
    state: "Rio de Janeiro, BR",
    emoji: "🌊",
    coords: [-22.7469, -41.8819] as [number, number],
    description: "Meu destino favorito para praia, principalmente no reveillon. Foi lá que passei os dois ultimos com meus amigos.",
    photo: "/public/buzios.jpg",
    color: "#0369a1",
  },
  {
    id: "cabofrio",
    name: "Cabo Frio",
    state: "Rio de Janeiro, BR",
    emoji: "🏖️",
    coords: [-22.8794, -42.0189] as [number, number],
    description: "Praia favorita dos meus pais, onde geralmente vamos para nossas viagens em familia.",
    photo: "/public/cabofrio.jpg",
    color: "#0284c7",
  },
  {
    id: "salvador",
    name: "Salvador",
    state: "Bahia, BR",
    emoji: "🎭",
    coords: [-12.9714, -38.5014] as [number, number],
    description: "Fui a trabalho com a minha antiga empresa, onde trabalhei na parte de infraestrutura para a prova da Sociedade Brasileira de Cardiologia. Aproveitei para conhecer a cidade e a famosa gastronomia bahiana.",
    photo: "/public/salvador.jpg",
    color: "#7c3aed",
  },
  {
    id: "orlando",
    name: "Orlando",
    state: "Florida, EUA",
    emoji: "🎡",
    coords: [28.5383, -81.3792] as [number, number],
    description: "Uma viagem fantastica que fiz com minhas irmãs e meus tios e primos. Os parques são realmente mágicos e espero voltar um dia com os meus filhos para que eles possam viver a mesma experiência.",
    photo: "/orlando.jpg",
    color: "#dc2626",
  },
];

export default function MapsApp() {
  const mapRef      = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selected, setSelected] = useState<typeof PLACES[0] | null>(null);
  const [cardPos, setCardPos]   = useState<{ x: number; y: number } | null>(null);
  const cardDragOffset          = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [-18, -48],
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Fix tiles not loading due to overflow-hidden
    setTimeout(() => map.invalidateSize(), 50);
    setTimeout(() => map.invalidateSize(), 300);
    setTimeout(() => map.invalidateSize(), 800);

    const ro = new ResizeObserver(() => map.invalidateSize());
    if (mapRef.current) ro.observe(mapRef.current);

    PLACES.forEach((place) => {
      const icon = L.divIcon({
        className: "",
        html: `
          <div style="
            width: 36px; height: 36px;
            background: ${place.color};
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            cursor: pointer;
            transition: transform 0.2s;
          ">
            <span style="transform: rotate(45deg); font-size: 16px;">${place.emoji}</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });

      const marker = L.marker(place.coords, { icon }).addTo(map);
      marker.on("click", () => setSelected(place));
    });

    mapInstance.current = map;

    return () => {
      ro.disconnect();
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  const flyTo = (place: typeof PLACES[0]) => {
    setSelected(place);
    setCardPos(null); // reset position on new selection
    mapInstance.current?.flyTo(place.coords, 10, { duration: 1.5 });
  };

  return (
    <div className="flex w-full h-full overflow-hidden" style={{ background: "#0f1117", fontFamily: "'Georgia', serif" }}>

      {/* Sidebar */}
      <div
        className="flex flex-col overflow-hidden flex-shrink-0"
        style={{ width: "260px", background: "#13151a", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#4a5568" }}>My Travels</p>
          <p className="text-lg font-semibold" style={{ color: "#e2e8f0" }}>Places I've been</p>
        </div>

        {/* Place list */}
        <div className="flex-1 overflow-y-auto">
          {PLACES.map((place) => {
            const isActive = selected?.id === place.id;
            return (
              <button
                key={place.id}
                onClick={() => flyTo(place)}
                className="w-full text-left px-5 py-3 flex items-center gap-3 transition-all"
                style={{
                  background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                  borderLeft: isActive ? `3px solid ${place.color}` : "3px solid transparent",
                }}
              >
                <span style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: `${place.color}22`, border: `1px solid ${place.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", flexShrink: 0,
                }}>
                  {place.emoji}
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: isActive ? "#e2e8f0" : "#9ca3af" }}>{place.name}</p>
                  <p className="text-xs" style={{ color: "#4a5568" }}>{place.state}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Counter */}
        <div className="px-5 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "#4a5568" }}>
            {PLACES.length} lugares visitados
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Info card — outside map container to avoid Leaflet z-index issues */}
      {selected && (
        <div
          style={
            cardPos
              ? { position: "absolute", left: cardPos.x, top: cardPos.y, width: "400px", borderRadius: "16px", overflow: "hidden", background: "rgba(13,15,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", zIndex: 9999 }
              : { position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", width: "400px", borderRadius: "16px", overflow: "hidden", background: "rgba(13,15,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", zIndex: 9999 }
          }
        >
          {/* Drag handle */}
          <div
            style={{ height: "24px", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "grab", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            onMouseDown={(e) => {
              e.preventDefault();
              const rect = (e.currentTarget.closest("[style]") as HTMLElement).getBoundingClientRect();
              cardDragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
              const onMove = (ev: MouseEvent) => {
                if (!cardDragOffset.current) return;
                setCardPos({ x: ev.clientX - cardDragOffset.current.x, y: ev.clientY - cardDragOffset.current.y });
              };
              const onUp = () => {
                cardDragOffset.current = null;
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          >
            <div style={{ width: "32px", height: "3px", borderRadius: "99px", background: "rgba(255,255,255,0.15)" }} />
          </div>

          {/* Photo area */}
          <div
            className="w-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${selected.color}33, ${selected.color}11)`,
              borderBottom: `1px solid ${selected.color}33`,
            }}
          >
            {selected.photo ? (
              <img
                src={selected.photo}
                alt={selected.name}
                style={{ width: "100%", height: "auto", display: "block", maxHeight: "320px", objectFit: "contain" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                }}
              />
            ) : null}
            <div style={{ display: selected.photo ? "none" : "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "32px" }}>
              <span style={{ fontSize: "40px" }}>{selected.emoji}</span>
              <p className="text-xs" style={{ color: "#4a5568" }}>Foto em breve</p>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-base font-semibold" style={{ color: "#e2e8f0" }}>{selected.name}</p>
                <p className="text-xs" style={{ color: selected.color }}>{selected.state}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-xs px-2 py-1 rounded"
                style={{ color: "#4a5568", background: "rgba(255,255,255,0.05)" }}
              >
                ✕
              </button>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{selected.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}