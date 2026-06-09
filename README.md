# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Run Web Server
Make sure you have the dependencies installed.  
If you don't have them, run the following in the terminal:  ```npm install```.

Then run ```npm run dev``` to start the web server at http://localhost:5173/

## Share with a URL
Use `ngrok` to share your web server with someone else.  
Run the following in the terminal:  ```ngrok http 5173```.

Then, ngrok will give you a URL that you can share with someone else.  
That URL will be something like ```https://finishing-bloating-ongoing.ngrok-free.dev```.
