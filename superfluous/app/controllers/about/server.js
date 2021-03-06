"use strict";

var page = require_core("server/page");
var bridge = require_core("server/bridge");
var template = require_core("server/template");
var readfile = require_core("server/readfile");

module.exports = {
  routes: {
    "" : "index"
  },

  index: function() {
    // use $C to create a component.
    var sidebar = $C("about_sidebar", { client_options: { div: ".contents" }});

    // Some components don't have any UI associated with them. 
    // The BG picture changer on the about page doesn't have any View,
    // so we just call 'marshall' to send it to the client.
    $C("bg_scroller", { }).marshall();
    this.set_title("Superfluous");

    var template_str = template.render("controllers/about.html.erb", { 
      template_code: readfile("app/static/templates/controllers/demo.html.erb"),
      client_code: readfile("app/controllers/demo/client.js"),
      server_code: readfile("app/controllers/demo/server.js"),
      about_server_code: readfile("app/controllers/about/server.js"),
      about_client_code: readfile("app/controllers/about/client.js"),
      render_sidebar: sidebar.toString
    });


    bridge.controller("about", "handle_sidebar", sidebar);
    page.render({ content: template_str, socket: true});
  }
};
