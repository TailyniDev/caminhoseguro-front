interface TituloPaginaProps {
  titulo: string
  subtitulo?: string
}

export default function TituloPagina({ titulo, subtitulo }: TituloPaginaProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-primary">{titulo}</h1>
      {subtitulo && <p className="mt-2 text-slate-700">{subtitulo}</p>}
    </header>
  )
}