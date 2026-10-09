import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { DESTINATIONS, useApp } from "../lib/saathi";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SaathiGo — Where would you like to go today?" },
      { name: "description", content: "Book a calm, caring ride to the hospital, market, pharmacy or family. Demo prototype." },
      { property: "og:title", content: "SaathiGo — Every journey, with care" },
      { property: "og:description", content: "Senior-friendly ride booking prototype for older adults in India." },
    ],
  }),
  component: Home,
});

function Home() {
  const { draft, setDraft } = useApp();
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <section>
        <p className="text-lg text-muted-foreground">Namaste 🙏</p>
        <h1 className="text-3xl font-bold">Where would you like to go today?</h1>
      </section>
      <section aria-label="Quick destinations" className="grid grid-cols-2 gap-3">
        {DESTINATIONS.map((d) => (
          <button
            key={d.key}
            className="card flex min-h-32 flex-col items-center justify-center gap-2 p-4 text-lg font-bold hover:bg-accent"
            aria-label={`Go to ${d.label}: ${d.place}`}
            onClick={() => {
              setDraft({ ...draft, destination: d.place });
              navigate({ to: "/book" });
            }}
          >
            <span aria-hidden="true" className="text-4xl">{d.icon}</span>
            {d.label}
          </button>
        ))}
      </section>
      <Link to="/book" className="btn btn-teal w-full text-xl">🚕 Book a Ride</Link>
      <p className="card p-4 text-muted-foreground">
        Need help? Tap <Link to="/help" className="font-bold text-primary underline">Help</Link> at the bottom any time.
      </p>
    </div>
  );
}
