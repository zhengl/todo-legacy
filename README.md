# Todo
A showcase of building Todo with Backbone, Jade, Jest, Webpack, Material Design, etc.

[![Build Status](https://travis-ci.org/zhengl/todo-legacy.svg?branch=master)](https://travis-ci.org/zhengl/todo-legacy)

## Installation

```
npm install
```

## Testing

```
npm test
```

## Linting

```
npm run lint
```

## Running

Start a local server:

```
npm start
```

You may find the Todo application at http://localhost:8080.

Any changes you make to files in the `app/` directory will cause the server to
automatically rebuild the app.

## Developing

```
npm run watch
```

Also, any changes you make to files in the `app/` directory will trigger unit tests.


## Production

```
npm run build
```

All production code can be found in /public, you may provide a real server at constants.BASE_URL(http://localhost:3000 by default).
