import { NavLink } from 'react-router'

const LINKS = [
  { to: '/', rotulo: 'Início' },
  { to: '/locais', rotulo: 'Locais' },
  { to: '/relatos', rotulo: 'Relatos' },
  { to: '/sobre', rotulo: 'Sobre' },
  { to: '/integrantes', rotulo: 'Integrantes' },
  { to: '/faq', rotulo: 'FAQ' },
  { to: '/contato', rotulo: 'Contato' },
]

interface MenuProps {
  aberto: boolean
  aoNavegar: () => void
}

export default function Menu({ aberto, aoNavegar }: MenuProps) {
  return (
    <nav
      id="menu-principal"
      aria-label="Menu principal"
      className={`${aberto ? 'block' : 'hidden'} w-full lg:block lg:w-auto`}
    >
      <ul className="flex list-none flex-col gap-1 py-3 lg:flex-row lg:items-center lg:py-0">
        {LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === '/'}
              onClick={aoNavegar}
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-bg text-primary-dark'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {link.rotulo}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}