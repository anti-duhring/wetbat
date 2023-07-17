# Wetbat Travel

## Deploy
You can find a deployed version of this project right here:
- [Wetbat App](https://wetbat-app.vercel.app/) on Vercel
- [Wetbat API](https://wetbat-api.onrender.com/api) on Render.com
## How to run
First of all you need to generate the prisma client folder and seed the database with all the airports. On the root of the project run the following command:
```bash
npm run prisma:generate
```

After this step you can now run both the web-app and the API by running the following command:
```bash
npm run dev
```

The web application are gonna be executed at `http://localhost:3000` and the api at `http://localhost:3001/api`

## Frontend

### Main technologies
I choosed the following techonologies for this project:
- Next.js + React
- TypeScript
- Material UI
- react-query

Material UI is nice and complete lib with a ton of plug-in-play components. It's easy to maintain and to create responsiveness with. There's a lot of CSS-in-js on this project because I think this make the life much easy when we need to review the code for a component and we want to know exactly what the CSS is doing on specific parts of this component and it also prevents some unexpected overwritten of CSS code. I only took the decision to extract the stylization from the component itself and use [styled](https://mui.com/system/styled/) when the this stylization evolves a lot of properties and other class, so this approach make the component looks cleaner.

### Architecture
I personally likes a feature/domain based architecture, I think it scales pretty good and is way more easy to maintain and organize and thats why I choosed it for this project.

On the src/app folder there's another folder called features, each folder inside it is a different and independent feature for this project, like a tiny version of an application. All components, hooks, utils and context used in each features stay on this feature folder, except for those ones who is shared and used trough all the application, so in this case these components, hooks, context, functions and etc are placed inside the app/core folder. The components from these features folder only are used outside its own features folder when they are used on the page, beucase this newer versions of Next uses a file system route, but if this project were done in react-native or any other framework that doesn't use file system route even the pages of each featue would stay inside its own features folder.

### Hooks
Hooks is really easy to work with and provides access to all built-in react hooks, so I choosed to use hooks for every action that communicates with the API. All fetchs, post and update actions are made with hooks using axios and react-query.

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

NestJS provides a great architecture to work with, because it's based on modules that works almost like independent small-version applications, like a domain based architecture. It's a really good fit on what I understand what a ideal organized Node project should be, so that was a no-brainer choice.

Prisma is perfect to small projects and MVPs because it takes all the main responsibility that would be done by a repository in other ways. You may notice that I didn't use repositories at all on this project, and the reason is, because it's an MVP and prisma works so well on those situations, I could actually make a good use of all the custom queries and ways to manipulate data that prisma provides. In a real project maybe I would choose to extract all these communications with the database to a repository layer, but on this case I it feels unecessary. 

### Architecture
I said early on this article that I like a domain based architecture and Nest provides it nativelly and the official documentation recommend this approach because of the inspiration in AngularJS, so I choosed to work with it. All domains are based on it's own folder inside the src/modules folder and all functions, dtos, services, and tests are based on these folder. The only functions and utils that is not on a module folder is the ones that is shared trough all the application, like exceptions and some enums, on this case they are placed on the src/common folder.

## Database

### Technologies
- Postgres
- Docker and docker-compose

To the database I choosed Postgres because it's easy to work with and very powerful, there's a lot of built-in tools.

### Entities
Because I had to work with a SQL database I choosed to create 3 entities to provides all data and information we need to make this project works: Quote, Contact and Airport.

The Quote entity has all informations about the quotes itself, like price, travellers amount, transportation type and so on, and has a relation to Contact entity by the email field.
The Contact entity has all informations about the customer, like name, email and phone. I did chose the email field to be the FK that relates with the Quote entity because it's the easy information to be provided on the Quick Quote form on the frontend. Thinking about the product I saw that is way more easy to the employee to create a new quote using the email of the costumer than using his ID or something like that.
The Airport entity is a interesting one because, when I first saw the challegend I tought to allow simple names as departure and destination locations, but it sould be way more difficult to extract statistics and create any optmized queries to look up for these airports, so I choosed to create an entity for that I running a seed to save a large amount of airport inside the database. This seed is automatically triggered by prisma when we setup the project.