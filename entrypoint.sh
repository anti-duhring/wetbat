#!/bin/bash

# Apply migrations
npx prisma migrate dev

# Start the NestJS application
npm run start:prod
