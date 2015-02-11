/**
 * @file base.js
 * Set up base view for other views to extend
 */

define([
  'backbone',
  'templates'
], function(Backbone, JST) {
  'use strict';

  var BaseView = Backbone.View.extend({
    /**
     * Used by backbone Views.
     *
     * Children SHOULD NOT override this method
     */
    initialize: function(data) {
      this._configure(data);
      this.subViews = {};
      this.init.apply(this, arguments).postInitialize();
    },

    /**
     * Performs the initial configuration of a View with a set of options.
     * Derived from Backbone 1.0.0 source code
     */
    _configure: function(data) {
      var options = _.result(data, 'options') || {};
      if (this.options) {
        options = _.extend({}, _.result(this, 'options'), options);
      }
      this.options = options;
    },

    /**
     * Attach any models/collections to the view, if applicable.
     *
     * Children CAN override this method, and MUST `return this`.
     *
     * @return this for chaining
     */
    init: function() {
      return this;
    },

    /**
     * Set up any listeners on a view's model/collection, and render the view.
     *
     * Children CAN override this method (with caution), and MUST `return this`.
     *
     * @return this for chaining
     */
    postInitialize: function () {
      var node;
      var nodeType = null;

      if (this.model) {
        node = this.model;
        nodeType = 'model';
      }
      else if (this.collection) {
        node = this.collection;
        nodeType = 'collection';
      }
      else {
        this.render();
      }

      if (typeof node !== 'undefined') {
        // This view has either a model or collection
        this.nodeType = nodeType;

        if (node.url) {
          /**
           * This model/collection has an external data source
           * Attach data ready listener and error handler
           */
          this.listenTo(node, 'sync', this.render);
          this.listenTo(node, 'error', this.renderError);

          // Attempt to retreive data from the external data source
          node.fetch();
        }
        else {
          // This model/collection has no external data source
          this.render();
        }
      }

      return this;
    },

    /**
     * Used by backbone Views.
     *
     * Children SHOULD NOT override this method
     *
     * @return this for chaining.
     */
    render: function(entity, resp, options) {
      this.renderTemplate(entity, resp, options).postRender();
      return this;
    },

    /**
     * Render a view's template with passed in data.
     *
     * Children CAN override this method, and MUST `return this`.
     *
     * @return this for chaining
     */
    renderTemplate: function () {
      var templateData = this.templateData || this.options;

      switch (this.nodeType) {
      case 'model':
      case 'collection':
        templateData = this[this.nodeType];
        break;
      default:
        templateData = templateData || {};
      }

      this.$el.html(this.handlebars(templateData));
      return this;
    },

    /**
     * Render an error thrown by a model/collection's fetch().
     *
     * Children CAN override this method (with caution), and MUST `return this`.
     *
     * @param {node} might be a Backbone.model or Backbone.collection
     * @param {resp} the response data
     * @param {options} the entire sync option set
     *
     * @return this for chaining.
     */
    renderError: function (node, resp, options) {
      var status = resp.statusText || 'Unknown error';
      var message = resp.responseText || 'Unable to reach host';

      this.$el.html('<h3>Unhandled error: ' + status + '</h3><pre>' + message + '</pre>');
      return this;
    },

    /**
     * Render additional views, attach UI/UX plugins, etc.
     *
     * Children CAN override this method, and MUST `return this`.
     *
     * @return this for chaining.
     */
    postRender: function () {
      return this;
    },

    /**
     * Process a handlebars template with the supplied data.
     *
     * Children SHOULD NOT override this method
     */
    handlebars: function (data) {
      return JST[_.result(this, 'template')](data);
    },

    /**
     * Set the name of the template for handlebars rendering.
     * Can be a string or a function that returns a string.
     *
     * Children SHOULD override this method
     */
    template: function () {
      throw new Error('Missing view.template');
    }
  });

  return BaseView;
});
