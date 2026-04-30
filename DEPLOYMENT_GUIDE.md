# Weboreels Monorepo - Vercel Deployment Updates

## Summary

All 24 game projects in the weboreels monorepo have been successfully updated for Vercel deployment. Each project now includes:
- **package.json** - NPM configuration with dev/build scripts
- **vercel.json** - Vercel deployment configuration
- **README.md** - Project documentation and deployment instructions

## Projects Updated

### Simple Static Games (11 projects)
These projects run with vanilla JavaScript/HTML/CSS and only need http-server for local development.

1. **asteroids** - Classic asteroids arcade game
2. **coloron** - Color-matching ball and bar game
3. **highway-race** - Fast-paced highway racing game
4. **marble-labyrinth** - Tilt-controlled marble maze
5. **packabunchas** - Packing and matching puzzle game
6. **square-match** - Match-three style puzzle game
7. **stack** - Block stacking puzzle game
8. **super-hopper** - 3D platformer with Three.js
9. **zuma** - Marble matching game
10. **the-mine** - Mining game with SCSS
11. **tower-block** - Tower building game with SCSS

### SCSS-Based Projects (2 projects)
These include SCSS preprocessing that compiles to CSS during build.

- **lighthouse** - Lighthouse-themed experience
- **the-mine** - Mining game

### Complex Build Projects (5 projects)
These have existing build systems maintained as-is.

- **beat-rocks** - Parcel/TypeScript project
- **black-hole-square** - Webpack-based project
- **callisto** - Custom build system
- **cat-survivors** - Vite-based project
- **clawstrike** - Custom build pipeline
- **SafeSpace** - JS13k competition entry with custom build
- **soul-jumper** - Grunt-based build
- **space-block-invaders** - Already had vercel.json
- **SpaceHuggers** - Serve-based project
- **winXP** - React-based project with existing build

## Root Monorepo Configuration

**package.json** workspace now includes all 24 projects:
```json
{
  "name": "weboreels-monorepo",
  "private": true,
  "workspaces": [
    "asteroids",
    "beat-rocks",
    "black-hole-square",
    "callisto",
    "cat-survivors",
    "clawstrike",
    "coloron",
    "dying-dreams",
    "highway-race",
    "hit-the-space",
    "lighthouse",
    "marble-labyrinth",
    "packabunchas",
    "SafeSpace",
    "soul-jumper",
    "space-block-invaders",
    "SpaceHuggers",
    "square-match",
    "stack",
    "super-hopper",
    "the-mine",
    "tower-block",
    "winXP",
    "zuma"
  ]
}
```

## Deployment Instructions

For each project, you can now deploy to Vercel:

```bash
cd project-folder
vercel
```

## Local Development

For simple static projects:
```bash
cd project-folder
npm install
npm run dev
```

For projects with SCSS:
```bash
npm run build  # Compiles SCSS to CSS
npm run dev    # Starts local server
```

## Configuration Details

### package.json Template (Static Projects)
- `dev`: Starts http-server on port 3000
- `build`: Placeholder or SCSS compilation
- `start`: Alias for dev

### vercel.json Configuration
- **buildCommand**: Specifies what runs during deployment
- **outputDirectory**: Where built files are located
- **framework**: Set to "static" for static sites
- **public**: Set to true for public deployments

## Next Steps

1. **Install dependencies**: Run `npm install` in root directory to set up all workspaces
2. **Test locally**: Run `npm run dev` in any project folder to test locally
3. **Deploy individually**: Use `vercel` CLI in each project folder or connect repository to Vercel
4. **Environment variables**: If projects need API keys or environment variables, add them to Vercel project settings

## Notes

- All projects maintain their original source code and dependencies
- Build processes have been preserved for complex projects
- Static projects now have proper Vercel deployment configuration
- The monorepo structure allows central management while independent deployment per project
