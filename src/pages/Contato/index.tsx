import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TituloPagina from '../../components/TituloPagina'
import CampoFormulario from '../../components/CampoFormulario'
import { classeInput } from '../../utils/estilos'

interface ContatoFormData {
  nome: string
  email: string
  mensagem: string
}

export default function Contato() {
  const [enviado, setEnviado] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContatoFormData>()

  function onSubmit() {
    // Formulário institucional: a API não tem endpoint de contato, então só confirmamos na tela.
    setEnviado(true)
    reset()
  }

  return (
    <section className="max-w-xl">
      <TituloPagina titulo="Contato" subtitulo="Dúvidas, sugestões ou parcerias? Escreva para a gente." />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <CampoFormulario id="nome" label="Nome" erro={errors.nome?.message}>
          <input
            id="nome"
            type="text"
            className={classeInput}
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={errors.nome ? 'nome-erro' : undefined}
            {...register('nome', {
              required: 'Informe seu nome.',
              minLength: { value: 3, message: 'O nome precisa ter pelo menos 3 caracteres.' },
            })}
          />
        </CampoFormulario>

        <CampoFormulario id="email" label="E-mail" erro={errors.email?.message}>
          <input
            id="email"
            type="email"
            className={classeInput}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-erro' : undefined}
            {...register('email', {
              required: 'Informe seu e-mail.',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Informe um e-mail válido.' },
            })}
          />
        </CampoFormulario>

        <CampoFormulario id="mensagem" label="Mensagem" erro={errors.mensagem?.message}>
          <textarea
            id="mensagem"
            rows={5}
            className={classeInput}
            aria-invalid={Boolean(errors.mensagem)}
            aria-describedby={errors.mensagem ? 'mensagem-erro' : undefined}
            {...register('mensagem', {
              required: 'Escreva sua mensagem.',
              minLength: { value: 10, message: 'A mensagem precisa ter pelo menos 10 caracteres.' },
            })}
          />
        </CampoFormulario>

        <button
          type="submit"
          className="rounded bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
        >
          Enviar mensagem
        </button>

        {enviado && (
          <p role="status" className="rounded bg-primary-bg p-3 text-primary-dark">
            Mensagem enviada! Obrigado pelo contato.
          </p>
        )}
      </form>
    </section>
  )
}