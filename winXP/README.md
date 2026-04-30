# WinXP in React

A nostalgic, web-based recreation of the classic Windows XP operating system, built entirely with React.js and Hooks. Experience the retro UI and classic applications directly in your browser.

## Features

- **Classic Desktop Interface**: Authentic Windows XP styling including the Start Menu, Taskbar, System Tray, and Desktop Icons.
- **Draggable & Resizable Windows**: Fully interactive window management.
- **Functional Applications**:
  - **Minesweeper**: The classic puzzle game.
  - **Internet Explorer**: A functional browser wrapper.
  - **Notepad**: A simple text editor.
  - **Winamp**: A fully functional retro media player (powered by `webamp`).
  - **Paint**: A digital drawing canvas.
  - **My Computer**: A file system explorer interface.

## Tech Stack

- **React**: Core UI framework (`react` & `react-dom`).
- **Styled Components**: CSS-in-JS for styling and theming the classic Windows components.
- **Webamp**: Used to embed the classic Winamp media player.
- **ESLint & Prettier**: Code quality and formatting.

## Getting Started

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed.

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

3. Create a production build:
   ```bash
   npm run build
   ```

## Deployment

This project is fully configured for deployment on platforms like Vercel. Simply push the repository to GitHub, connect it to your Vercel account, and Vercel will automatically detect the Create React App configuration, run the build process, and serve the application!
