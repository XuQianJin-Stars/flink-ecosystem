const mocker = require('mocker-data-generator').default;

const tag = { faker: 'commerce.productAdjective' };

module.exports = function(server) {
  server.route({
    method: 'GET',
    path: '/api/v1/tags',
    handler: () =>
      mocker()
        .schema('items', tag, 30)
        .build(),
  });
};
