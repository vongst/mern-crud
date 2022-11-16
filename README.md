- frontend: login
- frontend: products page
- backend: user auth
- backend: CRUD API endpoints. (today)
- backend: search (bonus)
- unit tests
- deploy + env variables

# Frontend: React, Redux

- login page
- admin dashboard
  - ProductListTable
    - ProductListItem (SKU, Title, Image)

Routes:
/login/
/products/list/

# Backend: Node, Express

USER AUTH

- return error/success code
- sha256+salt
- simple JWT

API Endpoints
/api/products/list
/api/products/create
/api/products/update
/api/products/delete

# Database: MongoDB

```
{
    "_id": ObjectId
    "sku": String,      // Alphanumeric, any length
    "title": String,
    "image": String     // File path
}
```

# Tests

# Deploy

===

- mongodb needs to whitelist IP??? hahahaa.... (FIXED. what is cyber security?)
- react strict mode => render components 2x
- req.query not req.body
- history not working in BrowserRouter v5 for react@16.14 / better routing / route guards / history

===

- [x] delete from db
- [x] create (fronend + db)

- [x] update (frontend + db)
- [x] rerender when store changes

- [x] jwt auth for frontend
- [x] jwt for backend api

- [x] failed auth message

- [ ] bug: react not re rendering new store / ProductList.tsx lifecycle bug

- refactor
- tests
- deploy

- search bar
- pagination, etc
- stronger input validation
- history not working in BrowserRouter v5 for react@16.14
