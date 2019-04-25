const mocker = require('mocker-data-generator').default;

const tag = { faker: 'commerce.productAdjective' };

module.exports = {
  route(server) {
    server.route({
      method: 'GET',
      path: '/api/v1/tags',
      handler: () =>
        mocker()
          .schema('tags', tag, 30)
          .build()
          .then(data => ({ items: data.tags })),
    });
  },
};
