<h1 align="center"> Polity - Vision </h1>
<p align="center">
  <img src="https://user-images.githubusercontent.com/35246325/187027016-86be54cf-53f9-4536-9b1e-c296a6381629.png" width="120px" height="120px"/>
  <br>
  <i>The goal of polity is to create a - theoretically - global real-time decision platform for political parties, individuals and public bodies.
</i>
  <br>
</p>


<p align="center">
  <a href="https://www.figma.com/proto/cAT8Aonu8P7ojwgnKcVlkz/Polity?node-id=51098%3A4670"><strong>Our Goal & Figma Clickdummy 🚀</strong></a>
  <br>
    <a href="https://www.figma.com/proto/cAT8Aonu8P7ojwgnKcVlkz/Polity?node-id=51098%3A4670"><img src="https://img.shields.io/badge/Clickdummy-up-brightgreen" alt="Clickdummy" /></a>
  </a>
  <br>
  Message <a href="tobias.hassebrock@gmail.com">tobias.hassebrock@gmail.com</a> to gain access to the Figma Design files.
</p>

<p align="center">
  <stong><strong>Current development state</strong>
  <br>
    <a href="https://donnerstagnacht.github.io/polity/register"><img src="https://img.shields.io/badge/prototype-up-brightgreen" alt="Prototype" /></a>
</p>
  
<hr>

<h1>Weekly Wednesday meeting and collaboration </h1>
    
We are meeting every Wednesday at 8pm CET on a discord server to work on the project and have a good time in general. To start, you can choose a task from our published projects or suggest your own ideas.

<p align="center">
  <strong>Discord server:</strong>
  <br>
  <a href="https://discord.gg/5bpnZ5ys"><img src="https://img.shields.io/badge/Discord-up-brightgreen" alt="Discord" /></a>
  <br>
  <strong>👉Issues</strong>
  <br>
  <a href="https://github.com/Donnerstagnacht/polity/issues"><img src="https://img.shields.io/badge/issues-up-brightgreen" /></a>
  <br>
  <strong>👉Projects</strong>
  <br>
  <a href="https://github.com/Donnerstagnacht/polity/projects"><img src="https://img.shields.io/badge/projects-up-brightgreen" /></a>
  <br>
  Contact:
  <br>
  <a href="tobias.hassebrock@gmail.com">tobias.hassebrock@gmail.com</a>
</p>

<h1>Techstack</h1>
Polity is based 100% on OpenSource technologies and is self-hostable.

<ul>
  <li>Backend: <a href="https://github.com/supabase/supabase">Supabase</a></li>
  <li>Frontend: <a href="https://github.com/angular/angular">Angular</a></li>
  <li>Frontend State Management: <a href="https://github.com/salesforce/akita">Akita</a></li>
  <li>UI-library: <a href="https://github.com/primefaces/primeng">NGPrime</a></li>
  <li>e2e Testing: <a href="https://github.com/cypress-io/cypress">Cypress</a></li>
</ul>

<h1> Dataflow & Architecture</h1>
Data is added to the database mostly by PostgreSQL functions. To display data to the user, data is queried with a traditional join first and then stored in an Akita Frontend Store. Additionally, a Supabase real-time subscription is used to update the store pessimisticly (and therefore the UI) whenever subscribed data in the database is changed.

    *** Data in ***
    User --> Frontend --> PostgreSQL function --> Database
    
    *** Data out: ***
    Database --> Initial join + real-time subscription --> Akita Store --> Frontend --> User

Thus, the data is highly normalized in the database. However, in the Akita store the data may be denormalized to offer frontend components a quick and easy access to the desired data. This approach brings three challenges:
<ol>
  <li>Many real-time subscriptions are used to mirror the initial SQL joins. We currently do not know if this approach is performant</li>
   <li>Most business logic is transferred to powerful PostgreSQL functions and Supabase real-time subscriptions</li>
</ol>
<br>
Angular files are organized in the <code>src/app</code> folder while Cypress files are organized in the <code>Cypress/e2e</code> folder. Subfolders mirror app features and mostly correspond to the available routes. However, the file order of Cypress files should be identical to their test execution order.
<br>
<br>
Supabase files and functions are organized in the <code>supabase</code> folder and must (!) be in the order of deploying them to the database during resets.

<h1> Database Schema</h1>
  <img src="https://user-images.githubusercontent.com/35246325/187255789-11d7ce30-75ae-4481-8ff6-a8c8739745e7.png" width="100%"/>
![Supbase Schema](https://user-images.githubusercontent.com/35246325/187255789-11d7ce30-75ae-4481-8ff6-a8c8739745e7.png)

<hr>
<h1>Get startet with development </h1>

1. Clone the repo
   ```sh
   git clone https://github.com/Donnerstagnacht/polity.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
2. Install Supabase CLI
   ```sh
   (todo)
   ```
3. Run Development instance
   ```sh
   yarn start
   ```
<hr>
<h1>Development server Frontend (Angular)</h1>
Run <code>ng serve</code> for a dev server. Navigate to <code>http://localhost:4200/</code>. The application will automatically reload if you change any of the source files.

<h1>Development server Backend (Supabase)</h1>
Run <code>supabase start</code> for a local dev server. Navigate to <code>http://localhost:54323/</code>. Follow the <a href="https://supabase.com/docs/guides/cli/local-development">local development<a/> guide of Supabase to reset or reload your environment:

<h1>Running Cypress end-to-end tests</h1>
Reset your backend environment before running the e2e test by executing the <code>resetinfrastructureAutomatic.bat</code> file. Otherwise, run <code>npm run e2e_open</code> to open the Cypress test runner and execute tests without resetting your Supabase environment. Run <code>npm run e2e_run</code> to run the e2e test in your command line.

<h1>Naming conventions</h1>
PostgreSQL code and code or variables which are used to call PostgreSQL functions, should be written in lower case with underscores e.g. <code>a_variable_for_a_postgres functions.</code> For purely frontend related variables and code camelCase is used e.g. <code>aVariableForTheFrontend</code>. HTML elements used for testing should either contain the <code>data-cy="element-name"</code> attribute or an id with the postfix <code>cy</code>, e.g. <code>id="element-name-cy"</code>.
<br>
In general, use speaking names and choose a longer more specific name over a short unspecific name.

<h1>Documentation</h1>
  Use the <a href="https://tsdoc.org/">typescript Doc</a> convention to document your code - especially for reused services & state management files.

<h1>Testing Approach</h1>
The project uses no unit tests so far. However, all features should be comitted with a working end-to-end test.

<h1>Recommended "Definition of Done" Checklist</h1>
This is not mandatory - but a guideline.
<ol>
  <li>Check naming conventions</li>
  <li>Document the code with typescript Doc</li>
  <li>Implement end-to-end-tests</li>
  <li>Pass all existing end-to-end-test to ensure code compatibility</li>
</ol>
