define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["LayoutView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"container-inner\">\n  <header id=\"header\"></header>\n  <nav id=\"navigation\"></nav>\n  <aside id=\"sidebar-left\"></aside>\n  <section id=\"main\"></section>\n  <footer id=\"footer\"></footer>\n</div>\n\n";
  });

this["JST"]["DashboardPageView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div style=\"\n  width:100%;\n  border: 3px solid black;\n  margin-bottom: 30px;\n  padding: 20px;\n\">\n  This is the dashboard page view<br/><br/>\n  <a href=\"/foos\">View foos</a>\n</div>\n\n\n";
  });

this["JST"]["FooBlockView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<article style=\"\n  border: 3px solid #CCC;\n  border-radius: 10px;\n  margin-bottom: 30px;\n  padding: 30px 80px;\n\">\n  <strong>Foo name: </strong>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "<br/>\n  <strong>Foo description: </strong>";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "<br/><br/><br/><br/>\n  <a style=\"\n    background: #666;\n    color: #FFF;\n    padding: 0px 20px;\n    line-height: 40px;\n    height: 40px;\n  \" href=\"/foos/";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">See full details</a>\n</article>\n";
  return buffer;
  });

this["JST"]["FooPageView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<article>\n  <h1>Name: <i>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</i></h1>\n  <strong>ID: </strong>";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "<br/>\n  <strong>Description: </strong>";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "<br/><br/><br/><br/>\n  <img src=\"http://info.ibs-us.com/Portals/14010/images/document%20management%20software%202.jpg\" />\n</article>\n";
  return buffer;
  });

this["JST"]["FooListPageView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = self.invokePartial(partials.fooBlock, 'fooBlock', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.foos, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["JST"]["FooterBlockView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div style=\"\n  width:100%;\n  border: 3px solid black;\n  padding: 20px 0;\n  font-size: 40px;\n  font-weight: bold;\n  text-align: center;\n\">\n  This is the footer\n</div>";
  });

this["JST"]["HeaderBlockView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div style=\"\n  width:100%;\n  border: 3px solid black;\n  margin-bottom: 30px;\n  padding: 20px 0;\n  font-size: 40px;\n  font-weight: bold;\n  text-align: center;\n\">\n  This is the header\n</div>";
  });

return this["JST"];

});