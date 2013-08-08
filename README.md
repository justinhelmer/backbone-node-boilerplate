backbone-node-boilerplate
=========

There are many approaches to backbone and node out there, and a number of boilerplates. This one tries to combine the two in a simple and elegant way.

This is very much IN PROGRESS; I would recommend not using it on prodution builds until it gets more solidified.

Pull requests are encouraged

## Getting Started
- Install [Node](http://nodejs.org/)
- Ensure it is in your PATH, and you have version 0.10.x:

```shell
$> node -v
v0.10.15
```

- Install [Ruby](http://www.ruby-lang.org/en/) (Should already be installed on OSX)
- Ensure it is in your PATH, and you have version 2.0.x:

```shell
$> ruby -v
ruby 2.0.0p247 (2013-06-27)
```

From the root of your working copy (the repository clone), run the following commands:

```shell
$> cd client
$> ./setup.sh
```

This will install the necessary requirements for your system.

Next, open the file located at `client/app/js/config.js`, and set the correct API url for your environment, i.e.:

```js
/**
 * @file
 * client/app/js/config.js
 */
define({
  api: {
    url: 'http://api.backbone.ops.com:3000/v1/'
  }
});
```

## Building the web app

The system uses [Grunt](http://gruntjs.com/) to handle various repetitive tasks.

There are two build modes: `dev` and `dist`:

- `dev` is faster, and will automatically launch the local node server to make API requests.

```shell

$> grunt build:dev

```

- `dist` provides further compression options to minimize the final payload for production builds.

```shell

$> grunt build:dist

```

From here, set up a virtual host entry to point to the particular build of choice:

`client/build/dev`, or `client/build/dist` (or both).

** IMPORTANT: API requests on a different domain or port (inevitable with node) have to deal with [Same origin policy](http://en.wikipedia.org/wiki/Same_origin_policy)

There is no solution built into this application. I just launch chrome with the flag:

```shell
--disable-web-security
```

Doing this, I am able to make XMLHttpRequests OK.

## Grunt Tips

Although the `build:dev` task is relatively fast, the grunt tasks have been set up in a way that will allow for updating only specific components.

In addition, you can chain multiple grunt tasks together in the command line with `[space]`.

For example, if you are only making `.scss` tweaks, you can recompile the sass and launch a node server with the following command:

```shell
$> grunt compass:dev server
```

Couple this with Chrome's [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en), and you can even avoid refreshing the browser

The same holds true for all of the installed grunt plugins.

I have also set up a default grunt task which runs the build processes for both `dev` and `dist`. Simply run:

```shell
$> grunt
```

..and you will get full working builds, as well as launch a node server.


## Standards
- [commonjs module and package systems](http://wiki.commonjs.org/wiki/CommonJS)
- [Semantic Versioning 2.0.0](http://semver.org/)
- [JSHint](http://www.jshint.com/) with the following options:

```js
options: {
  camelcase: true,
  curly: true,
  eqeqeq: true,
  indent: 2,
  newcap: true,
  quotmark: 'single'
},
```

## Server Technologies
- [Node](http://nodejs.org/api/)
- [Npm](https://npmjs.org/doc/)
- [Express](http://expressjs.com/api.html)

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