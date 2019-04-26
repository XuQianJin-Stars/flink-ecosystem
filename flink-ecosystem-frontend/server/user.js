const mocker = require('mocker-data-generator').default;

const user = {
  name: { faker: 'internet.userName' },
  avatar_url: { faker: 'internet.avatar' },
  url: { faker: 'internet.url' },
  email: { faker: 'internet.email' },
};

module.exports = function(server) {
  server.route({
    method: 'GET',
    path: '/api/v1/user',
    handler: () =>
      mocker()
        .schema('user', user, 1)
        .build()
        .then(data => data.user[0]),
  });
};
