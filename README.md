# simokser

Json-server is now more user-friendly.

- One Json file is created for one API, which prevents the json file from becoming bloated.
- Error APIs can be created by simply changing the json file.
- The mock server can be restarted when the json file is changed.

## Getting started

Create a json file named after the path in the fixtures directory

```json
// fixtures/posts.json
[
  {
    "id": 1,
    "title": "json-server",
    "author": "typicode"
  }
]
```

Start Mock Server

```bash
$ yarn simokser

$ node src/start.js

  simokser has started

  Resources
  http://localhost:3000/comments
  http://localhost:3000/posts

  Other routes
  /v1/* -> /$1

  Error routes
  /v1/posts/6 -> 500
  /bad_request -> 400
  /server_error -> 500

  simokser is running

```

Now if you go to http://localhost:3000/posts/1, you'll get

```json
{
  "id": 1,
  "title": "json-server",
  "author": "typicode"
}
```

Add custom routes

```json
// Create a routes.json file. Pay attention to start every route with /.
{
  "/api/*": "/$1",
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}
```

Add error routes

```json
// Create a errors.json file. Pay attention to start every route with /.
{
  "/v1/posts/6": {
    "statusCode": 500,
    "message": "This API is buggy! Please fix it immediately!."
  },
  "/bad_request": {
    "statusCode": 400,
    "message": "bad request."
  }
}
```

Now if you go to http://localhost:3000/posts/6, you'll get

```json
// statusCode: 500
{
  "error": "This API is buggy! Please fix it immediately!."
}
```

CLI usage

```bash
Options:
  --port, -p Set port [default: 3000]
```

## Links

https://github.com/typicode/json-server
