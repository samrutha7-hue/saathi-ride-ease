import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "../lib/saathi";

export const Route = createFileRoute("/rides/")({
  head: () => ({
    meta: [
      { title: "My Rides — SaathiGo" },
      { name: "description", content: "See your demo SaathiGo bookings." },
      { property: "og:title", content: "My Rides — SaathiGo" },
      { property: "og:description", content: "Your demo ride history." },
    ],
  }),
  component: Rides,
});

function Rides() {
  const { bookings, clearBookings } = useApp();
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Rides</h1>
      {bookings.length === 0 ? (
        <div className="card space-y-4 p-6 text-center">
          <p aria-hidden="true" className="text-5xl">🚗</p>
          <p className="text-lg font-bold">You have no rides yet.</p>
          <p className="text-muted-foreground">When you book a demo ride, it will appear here.</p>
          <Link to="/book" className="btn btn-teal w-full">Book a Ride</Link>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {bookings.map((b) => (
              <li key={b.id} className="card p-4">
                <p className="text-sm font-bold text-muted-foreground">{b.id} · {new Date(b.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
                <p className="text-lg font-bold">To: {b.destination}</p>
                <p className="mt-1 inline-block rounded-full bg-warning px-3 py-0.5 text-sm font-bold text-warning-foreground">Status: Demo booking — confirmed</p>
                <Link to="/rides/$id" params={{ id: b.id }} className="btn btn-outline mt-3 w-full">View Trip</Link>
              </li>
            ))}
          </ul>
          <Link to="/book" className="btn btn-teal w-full">Book another ride</Link>
          <button
            onClick={() => { if (confirm("Remove all demo rides from this device?")) clearBookings(); }}
            className="btn btn-outline w-full"
          >
            Clear demo rides
          </button>
        </>
      )}
    </div>
  );
}
