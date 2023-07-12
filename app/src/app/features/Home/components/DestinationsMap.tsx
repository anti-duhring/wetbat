import { useState } from 'react'
import theme from '@/app/core/theme'
import { Box, IconButton } from '@mui/material'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import { GEOGRAPHY_URL } from '../utils/destinationsMap'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type TPosition = {
  coordinates: [number, number]
  zoom: number
}


const markers = [
  {
    name: 'New York',
    coordinates: [-73.935242, 40.73061],
  },
  { name: 'London', coordinates: [-0.118092, 51.509865] },
  { name: 'Peru', coordinates: [-77.042793, -12.046374] },
  { name: 'Tokyo', coordinates: [139.817413, 35.672855] },
  { name: 'Sydney', coordinates: [151.208755, -33.865143] },
  { name: 'Hong Kong', coordinates: [114.177216, 22.302711] },
]


const DestinationsMap = () => {
  const [position, setPosition] = useState<TPosition>({
    coordinates: [0, 0],
    zoom: 1,
  })
  const [MAX_ZOOM, MIN_ZOOM] = [4, 1]

  const handleZoomIn = () => {
    if (position.zoom >= MAX_ZOOM) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= MIN_ZOOM) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }))
  }

  const handleMoveEnd = (position: TPosition) => setPosition(position)
  

  return (
    <Box sx={{ flex: 3, height: 'auto' }}>
      <ComposableMap projection="geoEquirectangular" height={500}>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={GEOGRAPHY_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: theme.palette.progressbarColors[3],
                      stroke: theme.palette.progressbarColors[3],
                    },
                    hover: {
                      fill: theme.palette.progressbarColors[0],
                      stroke: theme.palette.progressbarColors[0],
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates as [number, number]}>
              <g
                fill="none"
                stroke={theme.palette.darkRed}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-24, -48) scale(2)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <Controls handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />
    </Box>
  )
}

type TControlsProps = {
  handleZoomIn: () => void,
  handleZoomOut: () => void
}

const Controls = ({ handleZoomIn, handleZoomOut }: TControlsProps) => {
  return (
    <Box>
      <IconButton onClick={handleZoomIn}>
        <AddCircleOutlineIcon sx={{fontSize: 30}} />
      </IconButton>
      <IconButton onClick={handleZoomOut}>
        <RemoveCircleOutlineIcon sx={{fontSize: 30}} />
      </IconButton>
  </Box>
  )
}

export default DestinationsMap
