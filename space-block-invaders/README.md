# Space Block Invaders

A 3D voxel-style space invader game built with JavaScript and WebGL. Defend your world against the invaders!

## Controls
- **W, A, S, D** / **Arrow Keys**: Move
- **Mouse**: Look around (click the screen to lock the pointer)
- **Space**: Fire
- **E**: Interact / Use

## How to Run Locally

Because this game uses ES modules, you need to serve the files through a local web server rather than opening the `index.html` file directly in your browser.

1. Open your terminal and navigate to the project root, then into the `src` directory:
   ```bash
   cd src
   ```

2. Start a local HTTP server. For example, using Python 3:
   ```bash
   python3 -m http.server 8000
   ```
   *Or using Node.js:*
   ```bash
   npx serve
   ```

3. Open your web browser and navigate to `http://localhost:8000`

## Deployment (Vercel)

This project is configured for easy deployment on Vercel. The included `vercel.json` file automatically routes incoming requests from the root URL to the `src` directory, ensuring the game loads correctly. 

Simply import the GitHub repository into Vercel, leave the default settings, and deploy.

## Building for Production

This project includes a `compile.sh` script to bundle, minify, and aggressively compress the game into a tiny `.zip` archive. 

**Requirements for compiling:**
- `rollup`
- `terser`
- `roadroller`
- `zip`
- `ect` (Efficiency Compression Tool - binary included in root)

**To build:**
```bash
./compile.sh
```
This will produce a highly compressed `dist.zip` archive containing the production-ready game.