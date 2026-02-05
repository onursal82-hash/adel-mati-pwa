# Assets Directory

This directory contains all game assets including images and sounds.

## Directory Structure

```
assets/
├── images/
│   ├── mati/          # Puzzle piece images (13 pieces)
│   └── ui/            # UI elements (buttons, backgrounds)
└── sounds/            # Sound effects
```

## Required Files

See `ASSET_NAMES.md` for the complete list of required asset filenames.

## Adding Assets

1. Place puzzle piece images in `images/mati/`
2. Place UI images in `images/ui/`
3. Place sound effects in `sounds/`

All assets will be automatically copied to `dist/assets/` during the build process.
