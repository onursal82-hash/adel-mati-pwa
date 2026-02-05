# Asset File Names

## Adel Character Images

Place these Adel character images in `src/assets/images/adel/`:

1. `adel-mascot.png` - Adel solo mascot (used in Login screen and Game screen for encouragement)
2. `adel-mati-team.png` - Adel and Mati together (used in Stage transitions and Final celebration)

## Puzzle Pieces (Mati)

Place these 13 puzzle piece images in `src/assets/images/mati/`:

1. `mati-piece-01.png` - First puzzle piece
2. `mati-piece-02.png` - Second puzzle piece
3. `mati-piece-03.png` - Third puzzle piece
4. `mati-piece-04.png` - Fourth puzzle piece
5. `mati-piece-05.png` - Fifth puzzle piece
6. `mati-piece-06.png` - Sixth puzzle piece
7. `mati-piece-07.png` - Seventh puzzle piece
8. `mati-piece-08.png` - Eighth puzzle piece
9. `mati-piece-09.png` - Ninth puzzle piece
10. `mati-piece-10.png` - Tenth puzzle piece
11. `mati-piece-11.png` - Eleventh puzzle piece
12. `mati-piece-12.png` - Twelfth puzzle piece
13. `mati-piece-13.png` - Thirteenth puzzle piece

**Note**: The final celebration uses `adel-mati-team.png` instead of a separate complete puzzle image.

## UI Assets

Place these UI images in `src/assets/images/ui/`:

### Backgrounds
- `background-lavender.png` - Main lavender background (used for login, game, and completion screens)

### Buttons
- `button-lavender-normal.png` - Normal state of answer buttons
- `button-lavender-hover.png` - Hover state of answer buttons

## Sound Effects

Place your sound effects in `src/assets/sounds/`:

### Background Music
- `background-music.mp3` - Background music that loops infinitely (volume: 0.3)

### Sound Effects
- `correct.mp3` or `correct.wav` - Sound when answer is correct
- `wrong.mp3` or `wrong.wav` - Sound when answer is wrong
- `timer-warning.mp3` or `timer-warning.wav` - Sound when timer is running low
- `stage-complete.mp3` or `stage-complete.wav` - Sound when stage is completed
- `celebration.mp3` or `celebration.wav` - Sound for final celebration

## Image Specifications

### Adel Character Images
- **adel-mascot.png**: 
  - Size: 250x400px recommended (will be scaled)
  - Format: PNG with transparency
  - Style: Child-friendly, encouraging pose
  - Usage: Login screen (left side) and Game screen (left/right side of questions)

- **adel-mati-team.png**:
  - Size: 400x400px recommended (will be scaled)
  - Format: PNG with transparency
  - Style: Celebratory, happy pose with Mati
  - Usage: Stage completion screens and final celebration

### Puzzle Pieces
- **Size**: 180x180px recommended (will be scaled to fit)
- **Format**: PNG with transparency
- **Style**: Soft, rounded edges, child-friendly design
- **Colors**: Should match lavender/pastel theme

### UI Background
- **Size**: 1920x1080px or larger (will be scaled)
- **Format**: PNG or JPG
- **Style**: Soft lavender gradient or pattern

### Buttons
- **Size**: Match button dimensions (will be used as background)
- **Format**: PNG with transparency
- **Style**: Rounded corners, lavender theme

## Notes

- All image paths in the code use relative paths from the CSS/TS files
- Images will be copied to `dist/assets/` during build
- Ensure all filenames match exactly (case-sensitive)
- Background music starts automatically on login screen and loops seamlessly
