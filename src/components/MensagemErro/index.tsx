interface MensagemErroProps {
  mensagem: string
  aoTentarNovamente?: () => void
}

export default function MensagemErro({ mensagem, aoTentarNovamente }: MensagemErroProps) {
  return (
    <div role="alert" className="rounded border border-red-200 bg-red-50 p-4 text-red-800">
      <p>{mensagem}</p>
      {aoTentarNovamente && (
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="mt-3 rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
}