import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { DESTINATIONS, useApp } from "../lib/saathi";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Ride — SaathiGo" },
      { name: "description", content: "Choose pickup and destination for your demo SaathiGo ride." },
      { property: "og:title", content: "Book a Ride — SaathiGo" },
      { property: "og:description", content: "Enter pickup and destination, by typing or by voice." },
    ],
  }),
  component: Book,
});

function Book() {
  const { draft, setDraft } = useApp();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ pickup?: string | undefined; destination?: string | undefined }>({});

  function onContinue(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (draft.pickup.trim().length < 3) next.pickup = "Please enter where we should pick you up.";
    if (draft.destination.trim().length < 3) next.destination = "Please choose or type where you want to go.";
    setErrors(next);
    if (!next.pickup && !next.destination) navigate({ to: "/review" });
  }

  return (
    <form onSubmit={onContinue} noValidate className="space-y-6">
      <h1 className="text-3xl font-bold">Book a Ride</h1>

      <Field
        id="pickup"
        label="Pickup location"
        value={draft.pickup}
        error={errors.pickup}
        onChange={(v) => setDraft({ ...draft, pickup: v })}
      />
      <Field
        id="destination"
        label="Destination"
        value={draft.destination}
        error={errors.destination}
        placeholder="Type a place, or pick one below"
        onChange={(v) => setDraft({ ...draft, destination: v })}
      />

      <fieldset>
        <legend className="mb-2 text-lg font-bold">Suggested destinations</legend>
        <div className="grid gap-2">
          {DESTINATIONS.map((d) => {
            const selected = draft.destination === d.place;
            return (
              <button
                type="button"
                key={d.key}
                aria-pressed={selected}
                onClick={() => setDraft({ ...draft, destination: d.place })}
                className={`btn justify-start text-left ${selected ? "btn-primary" : "btn-outline"}`}
              >
                <span aria-hidden="true" className="text-2xl">{d.icon}</span>
                <span><span className="block">{d.label}</span><span className="block text-sm font-normal">{d.place}</span></span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <button type="submit" className="btn btn-teal w-full text-xl">Continue →</button>
    </form>
  );
}

function Field(props: {
  id: string; label: string; value: string; error?: string | undefined; placeholder?: string;
  onChange: (v: string) => void;
}) {
  const [listening, setListening] = useState(false);
  const [note, setNote] = useState("");
  const SR = typeof window !== "undefined"
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

  function startVoice() {
    if (!SR) {
      setNote("Voice input is not supported in this browser. Please type instead.");
      return;
    }
    const rec = new SR();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.onresult = (e: any) => props.onChange(e.results[0][0].transcript);
    rec.onerror = () => setNote("Sorry, we couldn't hear you. Please try again or type.");
    rec.onend = () => setListening(false);
    setNote("Listening… please speak now.");
    setListening(true);
    rec.start();
  }

  return (
    <div>
      <label htmlFor={props.id} className="mb-1 block text-lg font-bold">{props.label}</label>
      <div className="flex gap-2">
        <input
          id={props.id}
          className="field"
          value={props.value}
          placeholder={props.placeholder}
          aria-invalid={!!props.error}
          aria-describedby={`${props.id}-msg`}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={startVoice}
          className={`btn shrink-0 ${listening ? "btn-teal" : "btn-outline"}`}
          aria-label={`Speak ${props.label}`}
        >
          🎤
        </button>
      </div>
      <p id={`${props.id}-msg`} aria-live="polite" className="mt-1">
        {props.error && <span className="font-bold text-destructive">⚠ {props.error}</span>}
        {!props.error && note && <span className="text-muted-foreground">{note}</span>}
      </p>
    </div>
  );
}
