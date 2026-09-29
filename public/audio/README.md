# Audio Guides

Drop your recorded voice notes here — or upload them to your UploadThing
app, which is the preferred path (the museum fetches those URLs
automatically via `/api/museum-audio`).

## Expected filenames

- `welcome.mp3` — the Curator's Welcome (plays from the Entrance)
- `laptop.mp3` — Exhibit 01, The Midnight Terminal
- `certificates.mp3` — Exhibit 03, The Proof of Independent Study
- `broken-code.mp3` — Exhibit 04, The First 100 Errors
- `notebook.mp3` — Exhibit 02, The AI + Biology Blueprint
- `bracelet.mp3` — Exhibit 09, The Quiet Sacrifices
- `drawer-letter.mp3` — Exhibit 08, The Kid's Promise

## How playback resolves

1. **UploadThing first**: if a file named `<id>.mp3` exists in your
   UploadThing app, the server resolves its public URL and the custom
   player uses it.
2. **Local fallback**: otherwise the player tries `/audio/<id>.mp3`
   from this folder.
3. **Transcript fallback**: if neither exists, the plaque shows the
   transcript-only panel — never a broken player.

Keep files small (mono 96–128 kbps MP3 is ideal for voice).
