import { createBrowserRouter } from 'react-router'
import App from '../App'
import Home from '../pages/Home'
import Sobre from '../pages/Sobre'
import Faq from '../pages/Faq'
import Integrantes from '../pages/Integrantes'
import NaoEncontrada from '../pages/NaoEncontrada'
import Contato from '../pages/Contato'
import Locais from '../pages/Locais'
import LocalDetalhe from '../pages/LocalDetalhe'
import Relatos from '../pages/Relatos'

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
            { path: 'locais', element: <Locais /> },
            { path: 'locais/:id', element: <LocalDetalhe /> },
            { path: 'relatos', element: <Relatos /> },
            { path: '*', element: <NaoEncontrada /> },
        ],
    },
])