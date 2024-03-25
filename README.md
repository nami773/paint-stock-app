# paint-stock-app
Django BE &amp; React FE application for managing paint stocks

## Local Builds
To build locally,
Please run these commands.
docker-compose build
docker-compose run frontend npm install
docker-compose run backend python manage.py migrate

## Limitations

- The authentication is beyond the scope of this project. For this reason, instead of handling login and generating token, the landing page asks user to click login.
- The edits for admin user (Adam) is intentionally omitted, as changing Adam to non-admin account will result in admin functionality unusable in further demo.