import { createBrowserRouter } from 'react-router'
import App from '../App'
import Home from '../pages/Home'
import Sobre from '../pages/Sobre'
import Faq from '../pages/Faq'
import Integrantes from '../pages/Integrantes'
import Contato from '../pages/Contato'
import NaoEncontrada from '../pages/NaoEncontrada'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sobre', element: <Sobre /> },
      { path: 'faq', element: <Faq /> },
      { path: 'integrantes', element: <Integrantes /> },
      { path: 'contato', element: <Contato /> },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
])