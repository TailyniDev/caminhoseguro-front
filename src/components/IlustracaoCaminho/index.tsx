// Ilustração decorativa: um caminho com marcadores nas mesmas cores do mapa
export default function IlustracaoCaminho() {
  return (
    <svg viewBox="0 0 400 260" aria-hidden="true" className="h-auto w-full">
      <rect width="400" height="260" rx="16" fill="#e6f1fa" />
      <path
        d="M-10 190 C 70 150, 120 230, 200 170 S 330 90, 410 120"
        fill="none"
        stroke="#ffffff"
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M-10 190 C 70 150, 120 230, 200 170 S 330 90, 410 120"
        fill="none"
        stroke="#0b5fa5"
        strokeWidth="4"
        strokeDasharray="4 14"
        strokeLinecap="round"
      />
      <circle cx="95" cy="180" r="14" fill="#15803d" stroke="#ffffff" strokeWidth="3" />
      <circle cx="210" cy="168" r="14" fill="#d97706" stroke="#ffffff" strokeWidth="3" />
      <circle cx="320" cy="108" r="14" fill="#dc2626" stroke="#ffffff" strokeWidth="3" />
    </svg>
  )
}