import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "../lib/saathi";
import { DemoNotice, ShareButton, TripDetails } from "../components/TripCard";

export const Route = createFileRoute("/confirmed/$id")({
  head: () => ({
    meta: [
      { title: "Ride confirmed — SaathiGo" },
      { name: "description", content: "Your demo SaathiGo ride is confirmed." },
      { property: "og:title", content: "Ride confirmed — SaathiGo" },
      { property: "og:description", content: "Demo booking details." },
    ],
  }),
  component: Confirmed,
});

function Confirmed() {
  const { id } = Route.useParams();
  const { bookings } = useApp();
  const b = bookings.find((x) => x.id === id);
  if (!b) {
    return (
      <div className="card space-y-4 p-6 text-center">
        <h1 className="text-2xl font-bold">Booking not found</h1>
        <Link to="/rides" className="btn btn-primary w-full">Go to My Rides</Link>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <div className="text-center">
        <p aria-hidden="true" className="text-6xl">✅</p>
        <h1 className="text-3xl font-bold">Your ride is booked!</h1>
        <p className="text-muted-foreground">Your driver is on the way (sample).</p>
      </div>
      <DemoNotice />
      <div className="card p-5"><TripDetails b={b} /></div>
      <Link to="/rides/$id" params={{ id: b.id }} className="btn btn-primary w-full">🗺 View Trip</Link>
      <ShareButton b={b} />
      <Link to="/" className="btn btn-outline w-full">🏠 Back to Home</Link>
    </div>
  );
}
