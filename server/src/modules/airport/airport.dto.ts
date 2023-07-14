import { faker } from "@faker-js/faker";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsDate, IsInt, IsLatitude, IsLongitude, IsString, IsTimeZone } from "class-validator";

export class AirportDTO {
    @ApiProperty({
        description: 'Airport ID',
        example: faker.number.int({ min: 0, max: 100 }),
        uniqueItems: true
    })
    @IsInt()
    id: number;

    @ApiProperty({
        description: 'Airport latitude',
        example: faker.location.latitude()
    
    })
    @IsLatitude()
    lat: string

    @ApiProperty({
        description: 'Airport longitude',
        example: faker.location.longitude()
    
    })
    @IsLongitude()
    lon: string

    @ApiProperty({
        description: 'Airport name that is a unique identifier',
        example: `International Airport of ${faker.location.city()}`,
        uniqueItems: true
    })
    @IsString()
    name: string

    @ApiProperty({
        description: 'Airport city',
        example: faker.location.city()
    })
    @IsString()
    city: string

    @ApiProperty({
        description: 'Airport state',
        example: faker.location.state()
    })
    @IsString()
    state: string

    @ApiProperty({
        description: 'Airport country',
        example: faker.location.country()
    })
    @IsString()
    country: string

    @ApiProperty({
        description: 'Airport timezone',
        example: faker.location.timeZone()
    })
    @IsTimeZone()
    tz: string

    @ApiProperty({
        description: 'Date of creation of this entity. This field is filled automatically by the database.',
        example: faker.date.past(),
        default: new Date(),
        readOnly: true
      })
      @IsDate()
      createdAt: Date;
    
      @ApiProperty({
        description: 'Date of the last update of this entity. This field is filled automatically by the database.',
        example: faker.date.past(),
        default: new Date(),
        readOnly: true
      })
      @IsDate()
      updatedAt: Date;
}

export class CreateAirportDTO extends OmitType(AirportDTO, ['id', 'createdAt', 'updatedAt'])  {
}

export class UpdateAirportDTO extends PartialType(OmitType(AirportDTO, ['id', 'createdAt', 'updatedAt']))  {
}