import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TRUSTED_CONTACTS, useApp } from "../lib/saathi";
import { ShareButton, TripDetails } from "../components/TripCard";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Safety & Help — SaathiGo" },
      { name: "description", content: "Simulated emergency help and trusted contacts for SaathiGo riders." },
      { property: "og:title", content: "Safety & Help — SaathiGo" },
      { property: "og:description", content: "Simulated safety features for the SaathiGo prototype." },
    ],
  }),
  component: Help,
});

function Help() {
  const { bookings } = useApp();
  const latest = bookings[0];
  const [alertSent, setAlertSent] = useState(false);
  const [showTrip, setShowTrip] = useState(false);
  const [contact, setContact] = useState(TRUSTED_CONTACTS[0]!.name);
  const [message, setMessage] = useState("");

  function prepare() {
    const where = latest ? `I am on a SaathiGo trip (${latest.id}) from ${latest.pickup} to ${latest.destination}.` : "I am not on a trip right now.";
    setMessage(`Hello ${contact.split(" ")[0]}, ${where} Please call me when you can. (Sent from SaathiGo demo)`);
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Safety & Help</h1>
      <p role="note" className="rounded-xl border-2 border-warning-foreground bg-warning p-3 font-bold text-warning-foreground">
        ⚠ Emergency alerts here are simulated. They do NOT contact emergency services or anyone. In a real emergency, call 112.
      </p>

      <section className="card space-y-3 p-5" aria-labelledby="sos-h">
        <h2 id="sos-h" className="text-xl font-bold">Emergency help</h2>
        <button onClick={() => setAlertSent(true)} className="btn btn-danger w-full text-xl">🚨 Send Emergency Alert (Demo)</button>
        <p aria-live="assertive">
          {alertSent && <span className="font-bold">Demo alert simulated. Nothing was actually sent.</span>}
        </p>
        <button onClick={() => setShowTrip(!showTrip)} aria-expanded={showTrip} className="btn btn-outline w-full">
          {showTrip ? "Hide" : "View"} demo trip information
        </button>
        {showTrip && (latest ? <TripDetails b={latest} /> : (
          <p>No trip yet. <Link to="/book" className="font-bold text-primary underline">Book a demo ride</Link>.</p>
        ))}
      </section>

      <section className="card space-y-3 p-5" aria-labelledby="tc-h">
        <h2 id="tc-h" className="text-xl font-bold">Trusted contacts (sample)</h2>
        <ul className="space-y-2">
          {TRUSTED_CONTACTS.map((c) => (
            <li key={c.name} className="rounded-xl bg-muted p-3">
              <p className="font-bold">{c.name} · {c.relation}</p>
              <p className="text-muted-foreground">{c.phone} (fictional)</p>
            </li>
          ))}
        </ul>
        <label htmlFor="contact" className="block font-bold">Prepare a message for</label>
        <select id="contact" className="field" value={contact} onChange={(e) => setContact(e.target.value)}>
          {TRUSTED_CONTACTS.map((c) => <option key={c.name}>{c.name}</option>)}
        </select>
        <button onClick={prepare} className="btn btn-primary w-full">✉ Prepare message</button>
        {message && (
          <>
            <label htmlFor="msg" className="block font-bold">Your message (you can edit it)</label>
            <textarea id="msg" className="field" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
            <CopyButton text={message} />
          </>
        )}
        {latest && <ShareButton b={latest} label="Share latest trip" />}
      </section>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => { try { await navigator.clipboard.writeText(text); setDone(true); } catch {} }}
      className="btn btn-outline w-full"
    >
      {done ? "✓ Copied — paste it in WhatsApp or SMS" : "Copy message"}
    </button>
  );
}
