define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["LayoutView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"container-inner\">\r\n  <header id=\"header\"></header>\r\n  <nav id=\"navigation\"></nav>\r\n  <aside id=\"sidebar-left\"></aside>\r\n  <section id=\"main\"></section>\r\n  <footer id=\"footer\"></footer>\r\n</div>\r\n\r\n";
  });

this["JST"]["DashboardPageView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div style=\"\r\n  width:100%;\r\n  border: 3px solid black;\r\n  margin-bottom: 30px;\r\n  padding: 20px;\r\n\">\r\n  This is the dashboard page view<br/><br/>\r\n  <a href=\"/foos\">View foos</a>\r\n</div>\r\n\r\n\r\n";
  });

this["JST"]["FooBlockView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<article style=\"\r\n  border: 3px solid #CCC;\r\n  border-radius: 10px;\r\n  margin-bottom: 30px;\r\n  padding: 30px 80px;\r\n\">\r\n  <strong>Foo name: </strong>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "<br/>\r\n  <strong>Foo description: </strong>";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "<br/><br/><br/><br/>\r\n  <a style=\"\r\n    background: #666;\r\n    color: #FFF;\r\n    padding: 0px 20px;\r\n    line-height: 40px;\r\n    height: 40px;\r\n  \" href=\"/foos/";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">See full details</a>\r\n</article>\r\n";
  return buffer;
  });

this["JST"]["FooPageView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<article>\r\n  <h1>Name: <i>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</i></h1>\r\n  <strong>ID: </strong>";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "<br/>\r\n  <strong>Description: </strong>";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "<br/><br/><br/><br/>\r\n  <img src=\"http://info.ibs-us.com/Portals/14010/images/document%20management%20software%202.jpg\" />\r\n</article>\r\n";
  return buffer;
  });

this["JST"]["FooListPageView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n  ";
  stack1 = self.invokePartial(partials.fooBlock, 'fooBlock', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.foos, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });

this["JST"]["FooterBlockView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div style=\"\r\n  width:100%;\r\n  border: 3px solid black;\r\n  padding: 20px 0;\r\n  font-size: 40px;\r\n  font-weight: bold;\r\n  text-align: center;\r\n\">\r\n  This is the footer\r\n</div>";
  });

this["JST"]["HeaderBlockView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div style=\"\r\n  width:100%;\r\n  border: 3px solid black;\r\n  margin-bottom: 30px;\r\n  padding: 20px 0;\r\n  font-size: 40px;\r\n  font-weight: bold;\r\n  text-align: center;\r\n\">\r\n  This is the header\r\n</div>";
  });

return this["JST"];

});