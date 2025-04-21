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

## 📌 Code Scaffolding
Generate a new component:
```bash
ng generate component component-name
```
For more schematics (components, directives, pipes, etc.), run:
```bash
ng generate --help
```

---

## 🏗 Building the Project
Generate a production-ready build:
```bash
ng build --configuration=production
```
> The compiled files will be available in the `dist/` directory.

---

## 🚀 Deployment
The application is deployed on **Vercel**. You can access it here:
🔗 [Live Demo](https://e-commerce-angular-2-44kh8y8wg-maher-samys-projects.vercel.app/)

To deploy manually using Vercel CLI:
```bash
vercel --prod
```
## 📚 Additional Resources
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Official Docs](https://angular.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📝 License
This project is licensed under the **MIT License**.

---

Made with ❤️ by Maher Samy

