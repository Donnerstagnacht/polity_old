# Polity - Vision
The goal of polity is to create a - theoretically - global real-time decision platform for political parties, individuals and public bodies.

You can access a Clickdummy/visual prototype here:
https://www.figma.com/proto/cAT8Aonu8P7ojwgnKcVlkz/Polity?node-id=51098%3A4670
In case you would like to improve the overall design, message tobias.hassebrock@gmail.com to gain access to the Figma Design files.

You can find a demo of the current master Branch here:
coming soon.
## Weekly Wednesday meeting and collaboration
We are meeting every Wednesday at 8pm CET on a discord server to work on the project and have a good time in general. To start, you can also choose a task from our published projects.

Discord server:
coming soon

Projects:
coming soon

Contact:
Tobias Hassebrock: tobias.hassebrock@gmail.com

## Techstack
Polity is using OpenSource technologies and is self-hostable.

Backend: Supabase
Frontend: Angular
Frontend State Management: Akita
UI-library: Ngx-Prime
e2e Testing: Cypress

## Dataflow & Architecture
Data is added to the database mostly by PostgreSQL functions. To display data to the user, data is queried with a traditional join first and then stored in an Akita Front End Store. Additionally, a Supabase real-time subscription is used to update the store pessimistic (and therefore the UI) whenever subscribed data in the databased is changed. 

In short:
Data in: User -> Frontend -> PostgreSQL function -> Database
Data out: Database -> Initial join + real-time subscription -> Akita Store -> Frontend -> User

Thus, the data is highly normalized in the database. However, in the Akita store the data may be denormalized to offer frontend components a quick and easy access to the desired data. This approach brings three challenges:
1. Many real-time subscriptions (WebSocket connections) are used to mirrow the initial SQL joins. We currently do not know if this approach is performant
2. Most business logic is transferred to powerful PostgreSQL functions and Supabase real-time subscriptions
3. It is not 100% clear, when a real-time subscription delivers the new data and how this influences data integrity
## Development server Frontend (Angular)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Development server backend (Supabase Backend)
Run `supabase start` for a local dev server. Navigate to `http://localhost:54323/`. 

Follow the local development guide of Supabase to reset or reload your environment:
## Running Cypress end-to-end tests
Reset your backend environment before running the e2e test by executing the `resetinfrastructureAutomatic.bat` file.

Then run `npm run e2e_open` to open the Cypress test runner and execute tests. Run `npm run e2e_run` to run the e2e test in your command line.
## Naming conventions
PostgreSQL code and code or variables which are used to call PostgreSQL functions, should be written in lower case with underscores e.g. a_variable_for_a_postgres functions.

For purely frontend related variables and code camelCase is used e.g. aVariableForTheFrontend

In general, use speaking names and choose a longer more specific name over a short unspecific name.
## Documentation
Use the typescript Doc convention to document your code - especially for reused services & state management files.
## Testing Approach
The project used no unit tests so far. However, all features should be comitted with a working end-to-end test.
## Recommended "Definition of Done" Checklist
This is not mandatory - but a guideline.
1. Check naming conventions
2. Document code with typescript Doc
3. Build end-to-end-test
4. Pass all end-to-end-test to ensure code compatibility
