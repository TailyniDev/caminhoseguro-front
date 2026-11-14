import { Link } from 'react-router'
import logo from '../../assets/imagens/logo.png'

interface LogoProps {
  className?: string
}

// O link já tem nome acessível; o alt da imagem fica vazio para o leitor de tela não repetir.
export default function Logo({ className = 'h-10 w-auto' }: LogoProps) {
  return (
    <Link to="/" aria-label="CaminhoSeguro, ir para a página inicial">
      <img src={logo} alt="" className={className} />
    </Link>
  )
}