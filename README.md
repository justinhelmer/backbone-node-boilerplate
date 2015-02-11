# backbone-node-boilerplate
> Backbone framework with node server

## Getting Started

1. Run setup script:

  ```shell
  $> chmod +x setup.sh && ./setup.sh
  ```

  > This will install the necessary requirements on your system. However, note that with this method, you will have to [build](#building-the-web-app) as a separate step.

2. Set up environment variables

  ```shell
  $> source .profile
  ```

  > **tip:** add this line to your `.bash_profile` to automatically set up your shell environment

3. Build & launch the web app

  ```shell
  $> grunt --browser
  ```

  > **tip:** run any grunt task with the `--browser` flag to open the web app in a browser window

## Building the web app

The system uses [Grunt](http://gruntjs.com/) to handle various repetitive tasks.

The default grunt task is:

```shell
$> grunt
```

This will run `grunt build:dev`, where `dev` is the build mode build modes.

The two build modes, `dev` and `dist`, can be differentiated as followed:

- `dev` is faster, and will automatically launch a local web server and node server to make API requests. It also launches additional dev tools (see below).

```shell

$> grunt build:dev

```

- `dist` provides further compression options to minimize the final payload for production builds.

```shell

$> grunt build:dist

```

## Launching the web app

The `build:dev` grunt task additionally triggers `concurrent:dev`, which launches a local node server on port 9001 (by default), and a [LiveReload](http://livereload.com/) server on port 35729 (by default).

While the node server is running, open a web browser and visit [http://127.0.0.1:9001](http://127.0.0.1:9001) to view the web app.

Additionally, `concurrent:dev` triggers `watch:dev`, which listens for changes to development files, and will re-build application files and re-launch the local Node & LiveReload servers automatically. If you have [LiveReload](http://livereload.com/) installed and running on your system, then the browser will automatically refresh to show the changes on each save.

## Standards
- [Karma](http://karma-runner.github.io/0.12/index.html) for Behavior-Driven Development, built on top of
- [Jasmine](http://jasmine.github.io/2.1/introduction.html) as the BDD framework & expectation library
- [JSHint](http://www.jshint.com/) with the following options:

```js
options: {
  camelcase: true,
  curly: true,
  eqeqeq: true,
  indent: 2,
  newcap: true,
  quotmark: 'single',
  strict: true
},
```

*NOTE that with `strict: true`, all custom javascript must adhere to EMCAScript 5's [Strict mode](https://developer.mozilla.org/en/JavaScript/Strict_mode).

## Technologies
- [Node](http://nodejs.org/api/)
- [Express](http://expressjs.com/api.html)
- [RequireJS](http://requirejs.org/)
- [Backbone](http://backbonejs.org/)
- [jQuery](http://jquery.com/)
- [Lo-Dash](http://lodash.com/)
- [Handlebars](http://handlebarsjs.com/)
- [Sass](http://sass-lang.com/)
- [Foundation](http://foundation.zurb.com/docs/)