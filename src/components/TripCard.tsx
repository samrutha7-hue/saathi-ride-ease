import { useState } from "react";
import { shareText, type Booking } from "../lib/saathi";

export function TripDetails({ b }: { b: Booking }) {
  return (
    <dl className="grid gap-3">
      {[
        ["Booking ID", b.id],
        ["From", b.pickup],
        ["To", b.destination],
        ["Driver (sample)", b.driver],
        ["Vehicle (sample)", b.vehicle],
        ["Estimated arrival (sample)", `${b.etaMinutes} minutes`],
        ["Sample fare", `₹${b.fare}`],
      ].map(([k, v]) => (
        <div key={k}>
          <dt className="text-sm font-bold text-muted-foreground">{k}</dt>
          <dd className="text-lg font-bold">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ShareButton({ b, label = "Share Trip Details" }: { b: Booking; label?: string }) {
  const [fallback, setFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const text = shareText(b);

  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title: "SaathiGo demo trip", text }); return; } catch { /* cancelled */ }
    }
    setFallback(true);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(text); setCopied(true); } catch { setCopied(false); }
  }

  return (
    <div className="space-y-2">
      <button onClick={share} className="btn btn-outline w-full">📤 {label}</button>
      {fallback && (
        <div className="card space-y-2 p-4">
          <label htmlFor={`share-${b.id}`} className="font-bold">Copy this message:</label>
          <textarea id={`share-${b.id}`} readOnly value={text} rows={7} className="field" />
          <button onClick={copy} className="btn btn-primary w-full">{copied ? "✓ Copied" : "Copy text"}</button>
        </div>
      )}
    </div>
  );
}

export function DemoNotice() {
  return (
    <p role="note" className="rounded-xl border-2 border-warning-foreground bg-warning p-3 font-bold text-warning-foreground">
      ⚠ This is a demonstration booking. No real ride has been requested.
    </p>
  );
}
