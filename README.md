# SaathiGo — Every journey, with care

> Student Prototype — Demonstration Only. No real rides are booked.

SaathiGo is a senior-friendly ride-booking concept for older adults in India. It is a mobile-first, interactive web prototype.

## Features
- **Home**: tagline, welcome message, large quick-destination buttons (Hospital, Market, Pharmacy, Visit Family), Book a Ride button, bottom navigation (Home, My Rides, Help).
- **Ride booking**: editable sample pickup, destination with suggestions, optional voice input (browser speech recognition where supported, typing always works), validation on Continue.
- **Review**: pickup, destination, clearly labelled sample fare, Confirm button.
- **Confirmation**: sample booking ID, driver, vehicle, arrival time, demo notice, View Trip / Back to Home / Share Trip Details (native share or copyable text).
- **My Rides**: list of demo bookings with status, empty state, link back to booking.
- **Safety & Help**: simulated emergency alert, demo trip info, fictional trusted contacts, prepared message you can edit and copy, labelled sample route illustration (no live map, no GPS).
- **Accessibility**: 3 text sizes, high-contrast mode, large touch targets, visible focus outlines, semantic HTML, labelled controls. Settings and bookings saved in `localStorage`.

## Technologies
React 19, TanStack Start/Router, Tailwind CSS v4, TypeScript, Vitest. No backend, no API keys, no paid services.

## Setup
```bash
bun install      # or npm install
bun run dev      # open http://localhost:8080
bunx vitest run  # run unit tests
```

## Limitations
- All data (drivers, vehicles, fares, contacts) is fictional.
- Fares are sample values, not real pricing.
- Emergency alerts are simulated and contact no one. In a real emergency call 112.
- Voice input depends on browser support (works best in Chrome on Android).
- Data is stored only in this browser; clearing site data removes it.

## Testing
See [docs/TEST_CASES.md](docs/TEST_CASES.md) for manual test cases and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the workflow.

## License
MIT — see [LICENSE](LICENSE).
