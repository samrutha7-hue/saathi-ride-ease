import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { createBooking, estimateFare, useApp } from "../lib/saathi";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Review your ride — SaathiGo" },
      { name: "description", content: "Check your pickup, destination and sample fare before confirming." },
      { property: "og:title", content: "Review your ride — SaathiGo" },
      { property: "og:description", content: "Confirm your demo SaathiGo ride." },
    ],
  }),
  component: Review,
});

function Review() {
  const { draft, addBooking } = useApp();
  const navigate = useNavigate();

  if (!draft.pickup.trim() || !draft.destination.trim()) {
    return (
      <div className="card space-y-4 p-6 text-center">
        <h1 className="text-2xl font-bold">Please choose your trip first</h1>
        <Link to="/book" className="btn btn-primary w-full">Go to Book a Ride</Link>
      </div>
    );
  }

  function confirm() {
    const b = createBooking(draft.pickup, draft.destination);
    addBooking(b);
    navigate({ to: "/confirmed/$id", params: { id: b.id } });
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Review your ride</h1>
      <div className="card space-y-4 p-5">
        <div>
          <p className="text-sm font-bold uppercase text-muted-foreground">🟢 Pickup</p>
          <p className="text-lg font-bold">{draft.pickup}</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-muted-foreground">📍 Destination</p>
          <p className="text-lg font-bold">{draft.destination}</p>
        </div>
        <div className="rounded-xl bg-accent p-4 text-accent-foreground">
          <p className="text-sm font-bold">Sample estimated fare (demo only)</p>
          <p className="text-3xl font-bold">₹{estimateFare(draft.destination)}</p>
        </div>
      </div>
      <button onClick={confirm} className="btn btn-teal w-full text-xl">✓ Confirm Ride</button>
      <Link to="/book" className="btn btn-outline w-full">← Change details</Link>
    </div>
  );
}
