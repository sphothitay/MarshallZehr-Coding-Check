# MarshallZehrCodingCheck

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Running Cypress tests

Run `npm install` and start the project with `npm start`. Navigate to `http://localhost:4200/` to check if the currency converter is working.

Open another terminal and run `npm run cypress:open` to start the cypress dashboard. Select the E2E Testing type that is already configured. Then select one of the browsers (Chrome, Edge, and Electron) and click 'Start E2E Testing in [selected browser name here]'. This will open a new window and display Specs. From the list of specs run the `currency-converter-tests.cy.js` spec and the test cases should run.

NOTE: There are a few currencies in the list of currencies that the thrid party API returns with no rates for recent fixture data (2022-09-07). This currently causes 6 tests to fail for the MYR, THB, and VND conversions. We may need to handle when no rates are returned differently to prompt the user when no rates are available for specific currencies.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
