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
    <a href="https://donnerstagnacht.github.io/polity/register"><img src="https://img.shields.io/badge/prototype-down-red" alt="Prototype" /></a>
        <!--<a href="https://donnerstagnacht.github.io/polity/register"><img src="https://img.shields.io/badge/prototype-up-brightgreen" alt="Prototype" /></a>-->

</p>
  
<hr>

<h1>Weekly Wednesday meeting and collaboration </h1>
    
<p>We are meeting every Wednesday at 8pm CET on a discord server to work on the project and have a good time in general. To start, you can choose a task from our published projects or suggest your own ideas.</p>

<p align="center">
  <strong>Discord server:</strong>
  <br>
  <a href="https://discord.gg/5bpnZ5ys"><img src="https://img.shields.io/badge/Discord-down-red" alt="Discord" /></a>
   <!-- <a href="https://discord.gg/5bpnZ5ys"><img src="https://img.shields.io/badge/Discord-up-brightgreen" alt="Discord" /></a>-->

  <br>
  <strong>👉Issues</strong>
  <br>
  <a href="https://github.com/Donnerstagnacht/polity/issues"><img src="https://img.shields.io/badge/issues-up-brightgreen" /></a>
   <!-- <a href="https://github.com/Donnerstagnacht/polity/issues"><img src="https://img.shields.io/badge/issues-up-brightgreen" /></a>-->

  <br>
  <strong>👉Projects</strong>
  <br>
  <a href="https://github.com/Donnerstagnacht/polity/projects"><img src="https://img.shields.io/badge/projects-down-red" /></a>
   <!-- <a href="https://github.com/Donnerstagnacht/polity/projects"><img src="https://img.shields.io/badge/projects-up-brightgreen" /></a>-->

  <br>
  Contact:
  <br>
  <a href="tobias.hassebrock@gmail.com">tobias.hassebrock@gmail.com</a>
  <p>Drop me a message/pull request here on GitHub or per mail if you are interested in supporting the project.</p>
</p>

<hr>
<h1>Get startet with development </h1>

1. Clone the repo
   ```sh
   git clone https://github.com/Donnerstagnacht/polity.git
   ```
2. Install Node-Js
   ```sh
   https://nodejs.org/en/
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Set up local development for supabase
   ```sh
   https://supabase.com/docs/guides/cli/local-development
   ```
6. Start Angular dev server
   ```sh
   ng serve
   ```

<h1>Techstack</h1>
<p>Polity is based 100% on OpenSource technologies and is self-hostable.</p>

<ul>
  <li>Backend: <a href="https://github.com/supabase/supabase">Supabase</a></li>
  <li>Frontend: <a href="https://github.com/angular/angular">Angular</a></li>
  <li>Frontend: State Management is self written: <a href="https://github.com/Donnerstagnacht/polity/tree/main/src/app/signal-store">Angular Signals</a></li>
  <li>UI-library: <a href="https://taiga-ui.dev/">Taiga UI</a></li>
  <li>e2e Testing: <a href="https://github.com/cypress-io/cypress">Cypress</a></li>
</ul>

<h1> Dataflow</h1>
<p>Data is queried mostly by PostgreSQL functions. The functions are executed in a wrapper service that handles loading and UI flags.</p>
<p>Additionally, a Supabase real-time subscription is used to update the store (and therefore the UI) pessimistically whenever subscribed data in the database is changed.</p>
<p>To display data to the user, the data is stored in Angular Signals.</p>  

    *** Data in ***
    User  --> PostgreSQL function --> Database --> UI
    
    *** Data out: ***
    Database --> Query Function and/or real-time subscription --> Signal Store--> UI --> User

<p>Summary: Most business logic is transferred to powerful PostgreSQL functions.</p>

<h1> Project Structure</h1>
<p>Angular files are organized in the <code>src/app</code>. Subfolders mirror app features and mostly correspond to the available routes.</p>
<p>Cypress files are organized in the <code>Cypress/e2e</code> folder and the file order should be identical to the test execution order.</p>
<p>Supabase files are organized in the <code>supabase/migrations</code> folder. These files must have a prefix that determines the migration/execution order.</p>



   ```sh

  - cypress: End-2-End tests organized by features
  - src

    - app: Frontend
      - auth: Authentication functionality
      - features: Features organized by routing
          - feature: One feature module
              - components: Presentation logic
              - routes: Routes of the feature
              - store: Front end store instantiations
              - actions: Link between database and frontend store
              - guards: Protecting routes
      - landing: Non-authenticated features (landing website before sign-in)
      - navigation
      - signal-store: Frontend data store
      - ui: Pure UI components

    - assets: static files
    - environments: Supabase parameter
    - environments: Styles global
      - Global component styles
      - Polity utility styles
      - TUI extensions & overwrites

  - supabase: Supabase / Backend
    - functions: Edge functions
    - migrations: POSTGRES files organized by feature
      - Schemas and other: 0000X prefix
      - Database types/ Enums/Table definitions: 0000X prefix
      - Schema/Table definitions: 1000X prefix
      - Database functions/queries: 4000X prefix
      - Database transactions (calling other functions): 6000X prefix
      - Database seed: 9000X prefix
    - types: Auto-generated supabase types - determining Front End types, too
      - supabase.modified.ts: Overwritten supabase types since generation is not always correct
      - supabase.shorthand-types.ts: Short-handed supabase types for easier usage in Front End code
      - supabase.ts: Auto-generated supabase types

  - copy_sql_files_to_migration_folder: A windows bat file to copy supabase files into the migration directory so that automatic migration can be executed
  - package.json: Project dependencies
  - cypress.config.ts: Cypress configuration

   ```

<hr>
<h1>Development server Frontend (Angular)</h1>
<p>Run <code>ng serve</code> for a dev server. Navigate to <code>http://localhost:4200/</code>.</p>

<h1>Development server Backend (Supabase)</h1>
<p>Run <code>supabase start</code> for a local dev server. Navigate to <code>http://localhost:54323/</code>. Follow the <a href="https://supabase.com/docs/guides/cli/local-development">local development</a> guide of Supabase to reset or reload your environment</p>

<h1>Running Cypress end-to-end tests</h1>
Run <code>npm run e2e_open</code> to open the Cypress test runner and execute tests without resetting your Supabase environment. Run <code>npm run e2e_run</code> to run the e2e test in your command line.

<h1>Naming conventions</h1>
<p>PostgreSQL code and code or variables that are used to call PostgreSQL functions should be written in lowercase with underscores e.g. <code>a_variable_for_a_postgres functions.</code>.</p> 
<p>For purely frontend-related variables code camelCase is used e.g. <code>aVariableForTheFrontend</code>.</p>
<p>HTML elements used for testing should contain the <code>[attr.data-cy]="'element-name'"</code>.</p>
<p>In general, use speaking names and choose a longer more specific name over a short unspecific name.</p>

<h1>Documentation</h1>
<p></p>Document public functions (especially in services).</p>
<h1>Testing Approach</h1>
<p>The project uses no unit tests so far. However, all features should be committed with a working end-to-end test.</p>

<h1>Recommended "Definition of Done" Checklist</h1>
<p>This is not mandatory - but a guideline:</p>
<ol>
  <li>Check naming conventions</li>
  <li>Document public functions</li>
  <li>Implement end-to-end-tests</li>
  <li>Pass all existing end-to-end-test to ensure code compatibility</li>
</ol>
