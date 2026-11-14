interface BannerProps {
  desktop: string
  mobile?: string
  alt?: string
  prioridade?: boolean
}

// Troca a imagem por tamanho de tela: a versão mobile é menor e carrega mais rápido no celular.
export default function Banner({ desktop, mobile, alt = '', prioridade = false }: BannerProps) {
  return (
    <picture>
      {mobile && <source media="(max-width: 767px)" srcSet={mobile} />}
      <img
        src={desktop}
        alt={alt}
        loading={prioridade ? 'eager' : 'lazy'}
        decoding="async"
        className="h-auto w-full rounded-2xl"
      />
    </picture>
  )
}