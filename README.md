# paint-stock-app
Django BE &amp; React FE application for managing paint stocks

## Local Builds
To build locally,
Please run these commands.
- docker-compose build
- docker-compose run frontend npm install
- docker-compose run backend python manage.py migrate
And if issues arised,
- docker-compose run frontend npm uninstall mobile-drag-drop
- docker-compose run frontend npm install mobile-drag-drop


## Limitations

Due to lack of time, I made some limitations to the functionalities.

- Authentication is beyond the scope of this project. Therefore, instead of handling login and generating tokens, the landing page asks users to click login.
- Edits for admin users (such as Adam) are intentionally omitted. Changing Adam to a non-admin account would result in no one being able to manage users from the frontend.
- The application is hosted on a small low-cost instance. Drag-and-drop functionality should have been ideally much faster. On the website, it might take several seconds for changes to be reflected.
