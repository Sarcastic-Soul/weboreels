# Space Huggers

A run and gun roguelike platformer with destructible environments, built purely with vanilla JavaScript and HTML5 Canvas/WebGL. No heavy frameworks or build steps are required.

## How to run locally

Since this project doesn't use Node.js packages (`package.json`) or heavy build tools, there are no deprecated libraries or NPM packages to update! You can serve it directly with any local web server.

### Option 1: Using Node.js (npx)
If you have Node.js installed, you can simply use `npx serve` inside the directory:

```bash
cd SpaceHuggers
npx serve
```

### Option 2: Using Python 3
If you have Python installed, you can use its built-in HTTP server:

```bash
cd SpaceHuggers
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.
