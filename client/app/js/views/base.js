/**
 * @file base.js
 * Set up base view for other views to extend
 *
 * @author Justin Helmer 8/5/2013
 */

define([
  'backbone',
  'lodash',
  'jst'
], function(Backbone, _, JST) {
  'use strict';

  var BaseView = Backbone.View.extend({
    /**
     * Used by backbone Views.
     *
     * Children SHOULD NOT override this method
     */
    initialize: function () {
      this.init().postInitialize();
    },

    /**
     * Attach any models/collections to the view, if applicable.
     *
     * Children CAN override this method, and MUST `return this`.
     *
     * @return this for chaining
     */
    init: function () {
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
          // This model/collection has an external data source
          // Attach data ready listener and error handler
          this.listenTo(node, 'ready', this.render);
          this.listenTo(node, 'error', this.renderError);

          // Attempt to retreive data from the external data source
          node.fetch({
            // Trigger "ready" when the data comes back.
            // *NOTE "error" is triggered by Backbone already
            success: function () {
              node.trigger('ready');
            }
          });
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
    render: function () {
      this.renderTemplate().postRender();
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
        templateData = this.model;
        break;
      case 'collection':
        templateData = this.collection.models;
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
      switch (resp.status) {
      case 404:
      case 406:
        require(['views/error'], function (ErrorView) {
          new ErrorView({
            status: resp.statusText,
            message: resp.responseText
          });
        });
        break;
      default:

        break;
      }

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
     * Children CAN override this method
     */
    template: function () {
      var _view = this;

      var _viewName;
      // Assume a template name that matches the name of the view.
      // To get the name of the view, search through view constructors
      // that have templates for a view that matches the instanceof property
      var found = _.find(Backbone.viewConstructors, function (View, viewName) {
        if (_view instanceof View) {
          _viewName = viewName;
          return true;
        }
        return false;
      });

      return _viewName;
    }
  });

  return BaseView;
});