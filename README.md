<p align="center">
  <img src="logos/miranexus-logo-500-final.svg" alt="Miranexus logo" width="120">
</p>

<h1 align="center">Angular + PHP Showcase</h1>

<p align="center">
  A responsive storefront and component showcase built with Angular, PrimeNG and a PHP API.
</p>

<p align="center">
  <a href="#getting-started">Getting started</a> &bull;
  <a href="#php-api">PHP API</a> &bull;
  <a href="#project-structure">Project structure</a>
</p>

## About

This project brings together a storefront-inspired interface and examples of PrimeNG components. The storefront includes responsive product carousels, a banner and category links; the project also includes table, dialog and select examples. A separate PHP API provides a health endpoint and basic MySQL-backed CRUD endpoints.

The storefront defaults to bundled sample products, with search, category, featured and special-offer filters. Its demo cart is saved in browser storage and supports quantity changes, removal and a euro subtotal; it has no checkout, payment or server-side cart. Sample prices and offers are illustrative, not real prices or promotions. A runtime setting can switch the catalogue to a PHP endpoint without rebuilding; see [PHP API](#php-api). The separate PrimeNG data service is configured to use its deployed PHP API by default.

## Tech stack

- **Frontend:** Angular 21, TypeScript, PrimeNG, SCSS and NgRx
- **Backend:** PHP, PDO and MySQL
- **Testing:** Jasmine and Karma

## Getting started

### Prerequisites

- Node.js supported by Angular 21 (for example, Node 22.16 or later in the Node 22 release line) and npm
- PHP with the PDO MySQL extension and a MySQL database, if you want to run the API locally

### Run the frontend

From the repository root:

```bash
cd showcase-angular-php-master
npm ci
npm start
```

Open [http://localhost:4200/angular/showcase-angular-php/](http://localhost:4200/angular/showcase-angular-php/). The development server reloads when source files change.

The Angular application lives in `showcase-angular-php-master`; the root `npm start` script is not the Angular development server.

### Build and test

Run these commands from `showcase-angular-php-master`:

```bash
# Create an Angular production build
npm run ng -- build

# Run the Karma unit tests
npm test
```

The build is written to `dist/showcase-angular-php/browser/`. The Angular app is configured for the `/angular/showcase-angular-php/` base path; adjust the base path and hosting rewrite rules if deploying elsewhere.

On Windows, `npm run build` additionally copies the provided Apache rewrite configuration and creates `build.zip` at the repository root. This packaging script requires PowerShell.

## PHP API

The PHP API is in [`showcase-angular-php-master/php-api`](showcase-angular-php-master/php-api). It supports a read-only `/products` catalogue, `/health`, a demo `/login`, and CRUD routes for `prime-ng-data`. The product endpoint currently reads the same sample JSON bundled into the frontend; a future PHP backend can supply the same product contract from a database. See the [API setup guide](showcase-angular-php-master/php-api/README.md) for setup and the runtime switch.

To try a seeded JSON catalogue served by PHP and inspect the request in your browser, follow [Seed and try the product API](showcase-angular-php-master/php-api/README.md#seed-and-try-the-product-api). Bundled products remain the default.

> **Important:** The API is a demo, not production-ready. Its CRUD routes currently execute before the authentication and rate-limiting code, and the login uses hard-coded demo credentials. Do not expose it publicly or use it for sensitive data without implementing and verifying proper authentication, authorization and other production protections.

## Project structure

```text
.
├── logos/                         # Project branding
└── showcase-angular-php-master/
    ├── php-api/                   # PHP API, controllers and models
    ├── public/                    # Public assets
    ├── src/app/                   # Angular components, services and routes
    └── src/styles/                # Shared SCSS styles
```

The root `package.json` contains separate deployment-oriented scripts; use the nested Angular project for local frontend development.
