# Wetbat Travel

## Deploy
You can find a deployed version of this project right here:
- [Wetbat App](https://wetbat-app.vercel.app/) on Vercel
- [Wetbat API](https://wetbat-api.onrender.com/api) on Render.com
## How to run
First of all you need to generate the prisma client folder and seed the database with all the airports. This project uses turborepo, so on the root of the project run the following command:
```bash
npm run prisma:generate
```

After this step you can now run both the web-app and the API by running the following command on the root:
```bash
npm run dev
```

The web application are gonna be executed at `http://localhost:3000` and the api at `http://localhost:3001/api`

## Frontend

### Main technologies
I have chosen the following technologies for this project:
- Next.js + React
- TypeScript
- Material UI
- react-query

Material UI is a nice and comprehensive library with a wide range of plug-and-play components. It's easy to maintain and create responsive designs with. 

There is a lot of CSS-in-JS in this project because I believe it makes it much easier to review code for a component and understand exactly what the CSS is doing in specific parts of the component. It also helps prevent unexpected overwriting of CSS code. I made the decision to extract styling from the component itself and use [styled](https://mui.com/system/styled/) only on the situations when the styling involves a lot of properties and other classes, beucase this approach helps keep the components cleaner.

### Architecture
Personally, I prefer a feature/domain-based architecture as it scales well and is easier to maintain and organize. That's why I chose it for this project.

In the `src/app` folder, there is another folder called `features`. Each folder inside it represents a different and independent feature for this project, similar to a miniature version of an application. All components, hooks, utils, and context used within each feature are kept in their respective feature folders. However, shared components, hooks, context, functions, etc., that are used throughout the entire application are placed inside the `app/core` folder. 

The components from the `features` folder are only used outside their own feature folder when they are used on a page. This is only because newer versions of Next.js use a file system route. If this project were developed in React Native or any other framework that doesn't use a file system route, even the pages of each feature would remain inside their own feature folder.

### Hooks
Hooks are really easy to work with and provide access to all the built-in React hooks, that's why I chose to use hooks for every action that communicates with the API. All fetches, post requests, and update actions are made using hooks with axios and react-query.

### Pages
I did focused on the main features that was needed to this challenge, so this project only have two functional pages:
- `/` which is the Homepage.

![homepage](https://i.imgur.com/0oNkqHx.png)

- `quotes/QUOTE_ID` which shows the quote details:

You can access the details of one quote by clicking on any quote inside the `Pending Quotes` widget.

![Quote details](https://i.imgur.com/TkpsTeu.png)

## Backend

### Main techonologies
- Node.js
- NestJS
- TypeScript
- Prisma
- Swagger

NestJS provides a great architecture to work with as it is based on modules that function like independent mini-applications, similar to a domain-based architecture. It aligns well with my understanding of how an ideally organized Node project should be, so choosing NestJS was an obvious choice.

Prisma is perfect for small projects and MVPs because it takes on the main responsibilities that would typically be handled by a repository in other approaches. You may notice that I didn't use repositories at all in this project, and the reason is that, being an MVP, Prisma works exceptionally well in such scenarios. I was able to take full advantage of its custom queries and data manipulation capabilities. In a larger project, I might opt to extract all database communications to a repository layer. However, in this case, it felt unnecessary.

### Architecture
As mentioned earlier, I prefer a domain-based architecture, and NestJS natively supports this approach. The official documentation also recommends it, drawing inspiration from AngularJS. Therefore, I chose to work with it. Each domain has its own folder inside the `src/modules` directory, and all functions, DTOs, services, and tests related to each domain are kept in their own folder. The only functions and utilities that are not placed in a module folder are the ones shared across the entire application, such as exceptions and some enums. In this case, they are placed in the `src/common` folder.

## Database

### Technologies
- Postgres
- Docker and docker-compose

For the database, I chose Postgres due to its ease of use and powerful features. It provides a wide range of built-in tools that facilitate development.

### Entities
I created three entities to encompass all the necessary data and information: Quote, Contact, and Airport.

The Quote entity contains details about the quotes themselves, such as price, number of travelers, transportation type, and more. It establishes a relationship with the Contact entity through the email field.

The Contact entity holds information about the customers, including their name, email, and phone number. I decided to use the email field as the foreign key that links to the Quote entity. This choice was based on the ease of providing email information through the Quick Quote form on the frontend. Considering the user experience, I found it much simpler for employees to create a new quote using the customer's email rather than their ID or other identifiers.

The Airport entity is quite interesting. Initially, I considered allowing simple names for departure and destination locations, however, I realized that it would be challenging to extract statistics and create optimized queries for these airports. Therefore, I made the decision to create an entity specifically for airports and implemented a seed that populates a large number of airports within the database. This seed is automatically triggered by Prisma during project setup.