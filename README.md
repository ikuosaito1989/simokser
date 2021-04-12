# simokser

Json-server is now more user-friendly. The first is to create one Json file for one API, which prevents the json file from getting bloated. The second is to create an API for errors by simply changing the json file.

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
$ yarn mock-server

  simokser:0.0.1

  Resources
  http://localhost:3000/comments
  http://localhost:3000/posts

  Other routes
  /v1/* -> /$1

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

Accessing error will return a 500 error.

```json
{
  "error": "error message here"
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

Now if you go to http://localhost:3000/posts/1, you'll get

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
