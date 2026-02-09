# Specification

## Summary
**Goal:** Create a single-page, romantic Valentine prompt for “Aqsa Kousar” with an evasive “No” button and a “Yes” confirmation that reveals a “Good choice” meme image.

**Planned changes:**
- Build a simple, responsive single-page layout with a pink-and-white romantic theme that displays “Aqsa Kousar” and the text “Will you be my Valentine?”.
- Add exactly two primary buttons: “Yes” and “No”.
- Implement an evasive “No” button that repositions away on desktop hover and on touch interaction (iPad) so it cannot be clicked.
- On “Yes” click, transition to a confirmation state that reveals a meme image (with “Good choice” visible in the image) and removes/disables further interaction with the Yes/No UI.
- Add the meme image as a static asset under `frontend/public/assets/generated` and load it directly from the frontend via a static path.

**User-visible outcome:** On iPad Chrome (and desktop), the user sees a romantic Valentine question for Aqsa Kousar, cannot click “No” because it moves away, and clicking “Yes” shows a “Good choice” meme image with the choice UI no longer actionable.
