# SaathiGo — Architecture & Workflow

```text
Browser only (no server data)
 ┌──────────────────────────────────────────────┐
 │ __root.tsx  Header (Settings) + Nav  │
 │   AppProvider (src/lib/saathi.tsx)           │
 │     state: textSize, highContrast,           │
 │            draft {pickup, destination},      │
 │            bookings[]  <──> localStorage     │
 │   Pages (src/routes):                        │
 │     /            Home                        │
 │     /book        Booking form + voice        │
 │     /review      Review + sample fare        │
 │     /confirmed/$id  Success screen           │
 │     /rides       My Rides list               │
 │     /rides/$id   Trip details + route sketch │
 │     /help        Safety & Help               │
 └──────────────────────────────────────────────┘
```

## Booking workflow
```text
Home ──tap destination / Book a Ride──> /book
/book ──Continue (validated)──> /review
/review ──Confirm──> createBooking() ──> saved ──> /confirmed/$id
/confirmed ──View Trip──> /rides/$id ; Back to Home ──> / ; Share ──> navigator.share or copy text
```

## Key files
- `src/lib/saathi.tsx` — sample data, fare estimate, booking creation, shared state.
- `src/components/TripCard.tsx` — trip details, share button, demo notice.
- `src/styles.css` — colour tokens, high-contrast theme, text sizes, button styles.
