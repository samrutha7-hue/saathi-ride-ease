# SaathiGo — Sample Test Cases

| # | Steps | Expected |
|---|-------|----------|
| 1 | Open Home | Logo, tagline, "Where would you like to go today?", 4 destination buttons, Book a Ride, bottom nav, prototype label |
| 2 | Tap "Hospital" | Booking page opens with destination "City Care Hospital, MG Road" |
| 3 | Clear destination, tap Continue | Error "Please choose or type where you want to go." shown |
| 4 | Clear pickup, tap Continue | Pickup error shown |
| 5 | Tap 🎤 in unsupported browser | Message asks you to type instead |
| 6 | Fill both fields, Continue | Review page shows pickup, destination, "Sample estimated fare (demo only)" |
| 7 | Tap Confirm Ride | Success page with SG-DEMO-xxxxx ID, sample driver, vehicle, arrival, demo notice |
| 8 | Tap Share Trip Details | Native share opens, or copyable text appears |
| 9 | Tap View Trip | Trip page with labelled sample route illustration |
| 10 | Open My Rides | New booking listed with "Demo booking" status |
| 11 | Refresh page | Booking still listed |
| 12 | Clear demo rides | Empty state with Book a Ride button |
| 13 | Help → Send Emergency Alert (Demo) | Message says alert simulated, nothing sent |
| 14 | Help → Prepare message | Editable message for chosen fictional contact; Copy works |
| 15 | Settings → A++ | All text gets larger; persists after refresh |
| 16 | Settings → High contrast On | Black/white high-contrast colours |
| 17 | Use Tab key | Thick visible focus outline on every control |

Automated: `bunx vitest run` (routing, fare range, demo booking ID).
