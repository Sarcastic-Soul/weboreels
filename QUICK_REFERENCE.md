# Weboreels Projects - Quick Deploy Reference

## ✅ All 24 Projects Ready for Vercel

### Simple Static Games (Ready to Deploy)
- ✓ asteroids
- ✓ coloron
- ✓ highway-race
- ✓ marble-labyrinth
- ✓ packabunchas
- ✓ square-match
- ✓ stack
- ✓ super-hopper
- ✓ zuma

### SCSS Projects (Auto-compile on Deploy)
- ✓ lighthouse
- ✓ the-mine
- ✓ tower-block

### Complex Build Projects (Original Builds Preserved)
- ✓ beat-rocks (Parcel/TypeScript)
- ✓ black-hole-square (Webpack)
- ✓ callisto (Custom build)
- ✓ cat-survivors (Vite)
- ✓ clawstrike (Custom build)
- ✓ dying-dreams (TypeScript)
- ✓ hit-the-space (JS13k)
- ✓ SafeSpace (JS13k)
- ✓ soul-jumper (Grunt)
- ✓ space-block-invaders (Custom)
- ✓ SpaceHuggers (Node serve)
- ✓ winXP (React/CRA)

## Deploy a Single Project

```bash
cd asteroids
npm install
vercel
```

## Deploy All Projects (from root)

```bash
npm install  # Install all dependencies

# Then deploy each individually:
cd asteroids && vercel && cd ..
cd square-match && vercel && cd ..
# ... etc
```

## Each Project Has:
- ✓ package.json with npm scripts
- ✓ vercel.json with build config
- ✓ README.md with instructions
- ✓ Original source code preserved

## Monorepo Root
- ✓ Updated package.json with all 24 workspaces
- ✓ DEPLOYMENT_GUIDE.md for detailed info
