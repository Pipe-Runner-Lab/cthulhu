# Cthulhu 🚢
Project Cthulhu is a web based ship simulator that allows you to compute, run and visualize a ship simulation, **all on your browser**. For the frontend, it uses [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/). For the 3D part of the project, it uses [Three.js](https://threejs.org/) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction).  
We wanted to experiment with WASM and reuse the python code we had already written in our code. Thus we ended up using [Pyodide](https://pyodide.org/en/stable/). 

## Setup
```bash
npm install
```

## Run
```bash
npm start
```

### Reference
- https://karay.me/2022/07/12/bringing-python-to-the-web.html
- https://www.cgtrader.com/free-3d-models/watercraft/other/set-of-schematic-vessels (Modified by us)
- https://www.cgtrader.com/free-3d-models/watercraft/other/3000-lateral-buoy-sea-mark (Modified by us)
- https://dev.to/achukka/deploy-react-app-using-github-actions-157d