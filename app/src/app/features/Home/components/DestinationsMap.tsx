import theme from '@/app/core/theme'
import { Box } from '@mui/material'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json'

const markers = [
  {
    markerOffset: 15,
    name: 'New York',
    coordinates: [-73.935242, 40.730610],
  },
  { markerOffset: 15, name: 'London', coordinates: [ -0.118092, 51.509865] },
  { markerOffset: 15, name: 'Peru', coordinates: [ -77.042793, -12.046374] },
  { markerOffset: 15, name: 'Tokyo', coordinates: [139.817413, 35.672855] },
  { markerOffset: 15, name: 'Sydney', coordinates: [151.208755, -33.865143] },
  { markerOffset: 15, name: 'Hong Kong', coordinates: [114.177216, 22.302711] },
]

const DestinationsMap = () => {
  return (
    <Box sx={{ flex: 3, height: 'auto'}}>
      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{
          rotate: [58, 20, 0],
          scale: 200,
          center: [30, 0], 
        }}
        width={1500}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={theme.palette.progressbarColors[3]}
                stroke={theme.palette.progressbarColors[3]}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
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
      </ComposableMap>
    </Box>
  )
}

export default DestinationsMap
