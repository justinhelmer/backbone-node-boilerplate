# backbone-node-boilerplate
> Client and server interaction architecture, with  client built on backbone.js and a server built on node.js

There are many approaches to backbone and node out there, and a number of boilerplates. This one tries to combine the two in a simple and elegant way.

This is very much **IN PROGRESS**; I would recommend not using it on prodution builds until it gets more solidified.

Pull requests are encouraged.

## Prerequisites
1. [npm](https://npmjs.org/), the [Node.js](http://nodejs.org/) package manager.
   > Ensure it is in your PATH, and you have version 0.10.x. It may work for other versions, but this app was built originally built on:

        $> node -v
        v0.10.15

2. [Ruby](http://www.ruby-lang.org/en/) (Should already be installed on OSX) - used by [Sass](http://sass-lang.com/)/[Compass](http://compass-style.org/)
   > Ensure it is in your PATH, and you have version 2.0.x. It may work for other versions, but this app was built originally built on:

        $> ruby -v
        ruby 2.0.0p247 (2013-06-27)

> More about [Server Technologies](#server-technologies) and [Client Technologies](#client-technologies) below.

## Getting Started

There are two options to get started with this web app:

1. Clone, build, and launch all in one step:
  > Download `onestep.sh` from the repository, and move it to where you want a working copy. Then run:

  ```shell
  $> chmod +x onestep.sh && ./onestep.sh
  ```

2. Clone project using your own tooling, and run setup script:

  ```shell
  $> chmod +x setup.sh && ./setup.sh
  ```

  > This will install the necessary requirements on your system. Hoever, note that with this method, you will have to [build](#building-the-web-app) as a separate step.

## Building the web app

The system uses [Grunt](http://gruntjs.com/) to handle various repetitive tasks.

There are two build modes: `dev` and `dist`:

- `dev` is faster, and will automatically launch a local web server and node server to make API requests.

```shell

$> grunt build:dev

```

- `dist` provides further compression options to minimize the final payload for production builds.

```shell

$> grunt build:dist

```

There is also a default grunt task which first runs `build:dist`, then runs `build:dev`. Simply run:

```shell
$> grunt
```

**tip:** run any grunt task with the `--browser` flag to open the web app in a browser window

## Launching the web app

The `build:dev` grunt task additionally triggers `concurrent:dev`, which launches a local web server on port 9001, a local node server on port 3000, a [LiveReload](http://livereload.com/) server on port 35729, and a [Node Inspector](https://github.com/node-inspector/node-inspector) server on port 5858, with web access (Chrome) on port 8080.

When the local servers are running, open a web browser and visit [http://127.0.0.1:9001](http://127.0.0.1:9001) to view the web app. By default, requests to the node server are made to [http://127.0.0.1:3000](http://127.0.0.1:3000) - these configuration options can be changed at `client/app/js/config.js` and `server/config.js`. In another window or tab, open [http://127.0.0.1:8080/debug?port=5858](http://127.0.0.1:8080/debug?port=5858) to view the [Node Inspector](https://github.com/node-inspector/node-inspector) tool. This workflow will allow you to debug the client and server simultaneously, all using Chrome's Web Developer tools.

Additionally, `concurrent:dev` triggers `watch:dev`, which listens for changes to development files, and will re-build application files and re-launch local livereload, node, and web servers automatically. If you have [LiveReload](http://livereload.com/) installed and running on your system, then the browser will automatically refresh to show the changes on each save.

## Standards
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

## Server Technologies
- [Node](http://nodejs.org/api/)
- [Npm](https://npmjs.org/doc/)
- [Express](http://expressjs.com/api.html)
- [Node Inspector](https://github.com/node-inspector/node-inspector)
- [Connect](http://www.senchalabs.org/connect/)

## Client Technologies
- [Backbone](http://backbonejs.org/)
- [requireJS](http://requirejs.org/)
- [jQuery](http://jquery.com/)
- [Lo-Dash](http://lodash.com/)
- [Handlebars](http://handlebarsjs.com/)
- [Sass](http://sass-lang.com/)
- [Compass](http://compass-style.org/)
- [Foundation](http://foundation.zurb.com/docs/)
- [JSHint](http://www.jshint.com/)

These lists are subject to change.
