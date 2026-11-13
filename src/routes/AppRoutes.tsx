import { createBrowserRouter } from 'react-router'
import App from '../App'
import Home from '../pages/Home'
import NaoEncontrada from '../pages/NaoEncontrada'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
])