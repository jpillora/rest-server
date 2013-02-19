var RestEasy = require("../index");


var server = new RestEasy.Server('/api/');

server.add('user', {
  // if truthy - set resource as the 'user' resource
  user: {
    //defaults
    usernameField: 'username',
    passwordField: 'password',
    loginPath: 'login/',
    logoutPath: 'logout/',

    //default rank 1         2           3
    roles: ['admin', 'manager', 'employee'],
    //custom ranks
    // 2 can only create/edit/destroy roles > 2
    rolesCustom: {
      admin: 1,
      manager: 2,
      employeeA: 3,
      employeeB: 3
    }

  },

  schema: {

  }
  //...
});

server.add('forum', {
  //...
  access: {
    allow: ['admin']
  }

});

server.forum.add('post', {
  //...
});

server.forum.post.add('comment', {

});


