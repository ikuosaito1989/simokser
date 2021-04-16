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

  simokser has started

  Resources
  http://localhost:4200/comments
  http://localhost:4200/posts

  Other routes
  /v1/* -> /$1

  Custom routes
  /bad_request  | Status:400
  /server_error | Status:500
  /delay        | Status:200, Delay:3000

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

By modifying custom.json, you can create an error API or an API to delay requests.

- Properties

  | Property | Description                                     | Required |
  | -------- | ----------------------------------------------- | -------- |
  | status   | HTTP Status Code                                | true     |
  | body     | Response body                                   | true     |
  | delay    | The delay duration in milliseconds （default 0) | false    |

```json
// Create a custom.json file. Pay attention to start every route with /.
{
  "/bad_request": {
    "status": 400,
    "body": {
      "status": 400,
      "error": "bad request."
    }
  },
  "/server_error": {
    "status": 500,
    "body": {
      "error": "an error occurred."
    }
  },
  "/delay": {
    "status": 200,
    "delay": 3000,
    "body": {
      "message": "This API has a 3000ms delay."
    }
  }
}
```

Now if you go to http://localhost:3000/bad_request, you'll get

```json
// status: 400
{
  "status": 400,
  "error": "bad request."
}
```

CLI usage

```bash
Options:
  --port, -p Set port [default: 3000]
```

## Links

https://github.com/typicode/json-server
