import { CircleMarker, MapContainer, Popup } from 'react-leaflet'
import { Link } from 'react-router'
import 'leaflet/dist/leaflet.css'
import CamadaBase from '../CamadaBase'
import MensagemVazia from '../MensagemVazia'
import { corDaClassificacao, temCoordenadas } from '../../utils/mapa'
import { estiloClassificacao } from '../../utils/rotulos'
import type { Trecho } from '../../types'

interface MapaTrechosProps {
  trechos: Trecho[]
  compacto?: boolean
}

const LEGENDA = [
  { classificacao: 'BOA', rotulo: 'Boa (nota 80 ou mais)' },
  { classificacao: 'ATENCAO', rotulo: 'Atenção (nota de 50 a 79)' },
  { classificacao: 'CRITICA', rotulo: 'Crítica (nota abaixo de 50)' },
]

export default function MapaTrechos({ trechos, compacto = false }: MapaTrechosProps) {
  const comCoordenadas = trechos.filter(temCoordenadas)

  if (comCoordenadas.length === 0) {
    return <MensagemVazia texto="Nenhum trecho com coordenadas cadastradas para mostrar no mapa." />
  }

  const limites = comCoordenadas.map((t): [number, number] => [t.latitude, t.longitude])

  return (
    <div>
      <div
        className={`overflow-hidden rounded border border-slate-200 ${compacto ? 'h-64' : 'h-96 md:h-[32rem]'}`}
      >
        <MapContainer
          bounds={limites}
          boundsOptions={{ padding: [40, 40], maxZoom: 16 }}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <CamadaBase />
          {comCoordenadas.map((trecho) => {
            const cor = corDaClassificacao(trecho.classificacao)
            const classificacao = estiloClassificacao(trecho.classificacao)
            return (
              <CircleMarker
                key={trecho.id}
                center={[trecho.latitude, trecho.longitude]}
                radius={10}
                pathOptions={{ color: '#ffffff', weight: 2, fillColor: cor, fillOpacity: 0.9 }}
              >
                <Popup>
                  <strong>{trecho.nomeRua}</strong>
                  <br />
                  {trecho.bairro} · {trecho.cidade}
                  <br />
                  Nota {trecho.notaAcessibilidade}/100 · {classificacao.rotulo}
                  <br />
                  <Link to={`/trechos/${trecho.id}`}>Ver detalhes</Link>
                </Popup>
              </CircleMarker>
            )
          })}
        </MapContainer>
      </div>

      {!compacto && (
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700" aria-label="Legenda do mapa">
          {LEGENDA.map((item) => (
            <li key={item.classificacao} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: corDaClassificacao(item.classificacao) }}
              />
              {item.rotulo}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}