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

From the root of your working copy (the repository clone), run the following commands:

```shell
$> chmod 755 setup.sh
$> ./setup.sh
```

This will install the necessary requirements for your system.

Next, open the file located at `server/config.js`, and set the configuration options you would like to launch your node server with, i.e.:

```js
/**
 * @file config.js
 * Define global server-side configuration
 */

(function () {
  'use strict';

  module.exports = {
    apiRoot : '/',
    host : '127.0.0.1',
    port : 3000,
    corsOptions : {}, // access to all origins (not safe for production),
    contentNegotiation: { // assumes 1<->1 relationship
      'application/vnd.emal.webclient+json': 'json'
    }
  };
}());
```

Finally, open the file located at `client/app/js/config.js`, and make sure the API url for your environment corresponds with the server configuration you just set up for node, i.e.:

```js
/**
 * @file config.js
 * Define global client-side configuration
 */

define({
  api: {
    url: 'http:127.0.0.1:3000',

    // Use version 1.0 of the API
    version: '1.0'
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

## Grunt Tips

Although the `build:dev` task is relatively fast, the grunt tasks have been set up in a way that will allow for updating only specific components.

In addition, you can chain multiple grunt tasks together in the command line with `[space]`.

For example, if you are only making `.scss` tweaks, you can recompile the sass and launch a node server with the following command:

```shell
$> grunt compass:dev server
```

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
  quotmark: 'single',
  strict: true
},
```

*NOTE that all custom javascript must adhere to EMCAScript 5's [Strict mode](https://developer.mozilla.org/en/JavaScript/Strict_mode).

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