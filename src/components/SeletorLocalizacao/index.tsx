import { CircleMarker, MapContainer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CamadaBase from '../CamadaBase'
import { CENTRO_PADRAO } from '../../utils/mapa'

interface SeletorLocalizacaoProps {
  latitude?: number
  longitude?: number
  aoEscolher: (latitude: number, longitude: number) => void
}

interface CliqueNoMapaProps {
  aoEscolher: (latitude: number, longitude: number) => void
}

// Componente sem visual: só escuta o clique no mapa
function CliqueNoMapa({ aoEscolher }: CliqueNoMapaProps) {
  useMapEvents({
    click(evento) {
      aoEscolher(evento.latlng.lat, evento.latlng.lng)
    },
  })
  return null
}

export default function SeletorLocalizacao({ latitude, longitude, aoEscolher }: SeletorLocalizacaoProps) {
  const ponto: [number, number] | null =
    latitude !== undefined && longitude !== undefined ? [latitude, longitude] : null

  return (
    <div className="h-72 overflow-hidden rounded border border-slate-300">
      <MapContainer center={ponto ?? CENTRO_PADRAO} zoom={15} scrollWheelZoom={false} className="h-full w-full">
        <CamadaBase />
        <CliqueNoMapa aoEscolher={aoEscolher} />
        {ponto && (
          <CircleMarker
            center={ponto}
            radius={10}
            pathOptions={{ color: '#ffffff', weight: 2, fillColor: '#0b5fa5', fillOpacity: 0.9 }}
          />
        )}
      </MapContainer>
    </div>
  )
}