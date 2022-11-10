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

- mongodb needs to whitelist IP??? hahahaa.... (FIXED)
