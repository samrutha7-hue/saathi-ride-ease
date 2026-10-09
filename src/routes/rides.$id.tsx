import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "../lib/saathi";
import { DemoNotice, ShareButton, TripDetails } from "../components/TripCard";

export const Route = createFileRoute("/rides/$id")({
  head: () => ({
    meta: [
      { title: "Trip details — SaathiGo" },
      { name: "description", content: "Details of your demo SaathiGo trip." },
      { property: "og:title", content: "Trip details — SaathiGo" },
      { property: "og:description", content: "Demo trip information." },
    ],
  }),
  component: Trip,
});

function Trip() {
  const { id } = Route.useParams();
  const b = useApp().bookings.find((x) => x.id === id);
  if (!b) {
    return (
      <div className="card space-y-4 p-6 text-center">
        <h1 className="text-2xl font-bold">Trip not found</h1>
        <Link to="/rides" className="btn btn-primary w-full">Back to My Rides</Link>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Your trip</h1>
      <DemoNotice />
      <RouteIllustration from={b.pickup} to={b.destination} />
      <div className="card p-5"><TripDetails b={b} /></div>
      <ShareButton b={b} />
      <Link to="/help" className="btn btn-danger w-full">🛟 Safety & Help</Link>
      <Link to="/rides" className="btn btn-outline w-full">← Back to My Rides</Link>
    </div>
  );
}

function RouteIllustration({ from, to }: { from: string; to: string }) {
  return (
    <figure className="card p-4">
      <svg viewBox="0 0 300 90" role="img" aria-label={`Sample route illustration from ${from} to ${to}. Not a live map.`} className="w-full">
        <path d="M20 60 C 90 10, 200 90, 280 30" fill="none" stroke="var(--color-secondary)" strokeWidth="5" strokeDasharray="10 8" strokeLinecap="round" />
        <circle cx="20" cy="60" r="10" fill="var(--color-secondary)" />
        <circle cx="280" cy="30" r="10" fill="var(--color-primary)" />
      </svg>
      <figcaption className="mt-2 text-sm font-bold text-muted-foreground">
        Sample route illustration — not a live map. No GPS tracking is used.
      </figcaption>
    </figure>
  );
}
