// Reference: https://www.react-simple-maps.io/docs/geographies/
export const GEOGRAPHY_URL =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json'

export type TDestination = {
  name: string
  coordinates: [number, number]
  value: number
}
export const popularDestinations: TDestination[] = [
  {
    name: 'New York',
    coordinates: [-73.935242, 40.73061],
    value: 100,
  },
  { name: 'London', coordinates: [-0.118092, 51.509865], value: 100 },
  { name: 'Peru', coordinates: [-77.042793, -12.046374], value: 50 },
  { name: 'Tokyo', coordinates: [139.817413, 35.672855], value: 50 },
  { name: 'Sydney', coordinates: [151.208755, -33.865143], value: 60 },
  { name: 'Hong Kong', coordinates: [114.177216, 22.302711], value: 80 },
]
