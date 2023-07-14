import { PrismaClient, Prisma } from "@prisma/client";
import * as airportsData from '../data/airports.json'

const prisma = new PrismaClient()
const airportNamesAdded = []

const getAirports = (): Prisma.AirportCreateInput[] => {
    return airportsData.map(airport => {
        if(airportNamesAdded.includes(airport.name)) return null

        airportNamesAdded.push(airport.name)

        return {
            name: airport.name,
            city: airport.city,
            state: airport.state ?? "",
            country: airport.country,
            tz: airport.tz,
            lat: airport.lat,
            lon: airport.lon
        }
    
    }).filter(airport => airport !== null)
}

void async function() {
    try {
        const data = await Promise.all(
            getAirports().map(airport => prisma.airport.create({ data: airport }))
        )

        console.log(`${data.length} airports created`)
    } catch(err) {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    }
}()