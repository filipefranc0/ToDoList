import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { Home } from './routes/Home.jsx';
import { Tarefas } from './routes/Tarefas.jsx';
import { Concluido } from './routes/Concluido.jsx';

/*const router = createBrowserRouter([{
  path: "/",
  element: <Home/>,
},
{
  path: "cafe",
  element: <Cafe/>,
},
{
  path: "cozinha",
  element: <Cozinha/>,
},
]);*/
const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "concluido",
      element: <Concluido/>,
    },
    {
      path: "tarefas",
      element: <Tarefas/>,
    },
    
  ]
},

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
