<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- All app state lives in `src/lib/saathi.tsx` (React context + localStorage); no backend — prototype must run without services or keys.
- Each screen is its own route file in `src/routes`; shared trip UI lives in `src/components/TripCard.tsx`.
