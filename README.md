# FreshCart

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Deployment

The project is deployed and accessible at the following link:

[https://e-commerce-angular-2.vercel.app/](https://e-commerce-angular-2.vercel.app/)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Project Architecture

The project is structured as follows:

- **Core**: Contains core modules, guards, interceptors, and environment configurations.
  - `guards/`: Authentication and auto-login guards.
  - `interceptors/`: Token interceptors for HTTP requests.
  - `environment/`: Environment-specific configurations.
- **Features**: Includes feature-specific modules, components, and services.
  - `components/`: Reusable feature components.
  - `pages/`: Feature-specific pages like `home`, `products`, `checkout`, etc.
  - `services/`: Services for handling business logic related to features.
- **Shared**: Contains shared components, interfaces, and services.
  - `components/`: UI components shared across the application.
  - `interfaces/`: Shared TypeScript interfaces for data models.
  - `services/`: Shared services like `cart`, `order`, and `wishlist`.
- **Public**: Static assets like images, icons, and logos.
- **Styles**: Global styles and theming using SCSS.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
