# PHP API

This directory contains a small PHP API for the Angular showcase. It uses PDO to access a MySQL table called `primeNgData`.

> **Not production-ready:** The CRUD routes are dispatched before the authentication and rate-limiting code, so they are not protected by either. The login endpoint also uses hard-coded demo credentials. Do not expose this API publicly or use it with sensitive data until authentication, authorization and other production protections have been implemented and verified.

## Local setup

You need PHP with PDO MySQL and a MySQL database. Create `php-api/.env` locally with values appropriate for your environment:

```dotenv
API_JWT_SECRET=replace-with-a-long-random-secret
DB_HOST=localhost
DB_NAME=your_database
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

Do not commit this file or real credentials. The JWT secret can alternatively be provided as the `API_JWT_SECRET` process environment variable. Database configuration is read from `php-api/.env`; the current database connection uses the default MySQL port.

Create the table in your database:

```sql
CREATE TABLE primeNgData (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  published TINYINT(1) NOT NULL DEFAULT 0,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

Table name casing matters on systems with case-sensitive MySQL table names.

From `showcase-angular-php-master`, start PHP's development server:

```bash
php -S localhost:8000 -t php-api
```

With the secret configured, check the API at [http://localhost:8000/index.php?path=/health](http://localhost:8000/index.php?path=/health). The health endpoint does not test the database connection.

## Endpoints

Pass the route in the `path` query parameter:

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Return API status and timestamp |
| POST | `/login` | Issue a demo JWT for the hard-coded demo user |
| GET | `/prime-ng-data` | List records |
| POST | `/prime-ng-data` | Create a record |
| GET | `/prime-ng-data/{id}` | Fetch a record |
| PUT | `/prime-ng-data/{id}` | Update a record |
| DELETE | `/prime-ng-data/{id}` | Delete a record |

For create and update requests, send a JSON object with `title`, `description` and `published`. The JWT secret must be configured even for the health endpoint.

## Angular integration

The Angular `PrimeNgDataService` defaults to the deployed API. To use a local API, set `window.__API_BASE_URL__` to `http://localhost:8000/index.php` before the Angular application starts. CORS origins are currently hard-coded in `index.php`; they include `http://localhost:4200`. Change the allowlist in code if using another frontend origin.

## Deployment

The PHP API files must be deployed separately from the Angular build. The current implementation looks for database settings in `.env` inside the API directory; if deploying to a web server, prevent public access to that file and review the API's security before exposing any endpoint. The `.htaccess` in this directory is an Angular SPA rewrite configuration used by the frontend packaging script, not a PHP API security configuration.
