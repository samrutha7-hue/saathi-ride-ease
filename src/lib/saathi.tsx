// Simple client-side state for SaathiGo. Everything is saved in localStorage.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type TextSize = "normal" | "large" | "xlarge";
export type Booking = {
  id: string;
  pickup: string;
  destination: string;
  fare: number;
  driver: string;
  vehicle: string;
  etaMinutes: number;
  createdAt: string;
};

export const DESTINATIONS = [
  { key: "hospital", label: "Hospital", place: "City Care Hospital, MG Road", icon: "🏥" },
  { key: "market", label: "Market", place: "Gandhi Bazaar Market", icon: "🛒" },
  { key: "pharmacy", label: "Pharmacy", place: "Sri Sai Medicals, 4th Cross", icon: "💊" },
  { key: "family", label: "Visit Family", place: "Priya's Home, Jayanagar 9th Block", icon: "🏠" },
];

export const SAMPLE_PICKUP = "12, Lakshmi Nivas, Basavanagudi";

export const TRUSTED_CONTACTS = [
  { name: "Priya Sharma", relation: "Daughter", phone: "+91 98XXX 12345" },
  { name: "Dr. Anil Rao", relation: "Family Doctor", phone: "+91 97XXX 67890" },
];

const DRIVERS = ["Ramesh Kumar", "Suresh Gowda", "Mohammed Irfan", "Lakshmi Devi"];
const VEHICLES = ["White Maruti Dzire · KA 05 AB 1234", "Silver Toyota Etios · KA 01 CD 5678", "Blue Hyundai Aura · KA 03 EF 9012"];

/** Sample fare: ₹80 base + ₹10 per "distance step" derived from the destination text. */
export function estimateFare(destination: string): number {
  const sum = [...destination.trim()].reduce((a, c) => a + c.charCodeAt(0), 0);
  return 80 + (sum % 12) * 10;
}

export function createBooking(pickup: string, destination: string): Booking {
  const n = Math.floor(Math.random() * 90000) + 10000;
  return {
    id: `SG-DEMO-${n}`,
    pickup,
    destination,
    fare: estimateFare(destination),
    driver: DRIVERS[n % DRIVERS.length],
    vehicle: VEHICLES[n % VEHICLES.length],
    etaMinutes: 5 + (n % 6),
    createdAt: new Date().toISOString(),
  };
}

export function shareText(b: Booking) {
  return `SaathiGo DEMO trip (not a real ride)\nBooking ID: ${b.id}\nFrom: ${b.pickup}\nTo: ${b.destination}\nDriver: ${b.driver}\nVehicle: ${b.vehicle}\nEstimated arrival: ${b.etaMinutes} minutes`;
}

type Ctx = {
  textSize: TextSize;
  setTextSize: (t: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  draft: { pickup: string; destination: string };
  setDraft: (d: { pickup: string; destination: string }) => void;
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  clearBookings: () => void;
};

const AppCtx = createContext<Ctx | null>(null);
const KEY = "saathigo-v1";

export function AppProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSize] = useState<TextSize>("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [draft, setDraft] = useState({ pickup: SAMPLE_PICKUP, destination: "" });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (s.textSize) setTextSize(s.textSize);
      if (typeof s.highContrast === "boolean") setHighContrast(s.highContrast);
      if (Array.isArray(s.bookings)) setBookings(s.bookings);
      if (s.draft) setDraft(s.draft);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ textSize, highContrast, bookings, draft }));
    } catch {}
    const html = document.documentElement;
    html.classList.remove("ts-large", "ts-xlarge");
    if (textSize !== "normal") html.classList.add(`ts-${textSize}`);
    html.classList.toggle("hc", highContrast);
  }, [textSize, highContrast, bookings, draft, loaded]);

  return (
    <AppCtx.Provider
      value={{
        textSize, setTextSize, highContrast, setHighContrast, draft, setDraft, bookings,
        addBooking: (b) => setBookings((prev) => [b, ...prev]),
        clearBookings: () => setBookings([]),
      }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}
