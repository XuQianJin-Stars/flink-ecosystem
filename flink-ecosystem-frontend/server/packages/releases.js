const mocker = require('mocker-data-generator').default;

const release = {
  id: { incrementalId: 0 },
  number: { faker: 'system.semver' },
  description: { faker: 'lorem.paragraph' },
  download_url: { faker: 'internet.url' },
  added: { faker: 'date.past' },
};

module.exports = function(server) {
  server.route({
    method: ['get', 'post'],
    path: '/api/v1/packages/{package}/releases',
    handler: () =>
      mocker()
        .schema('items', release, 10)
        .build(),
  });

  server.route({
    method: ['patch', 'delete'],
    path: '/api/v1/packages/{package}/releases/{id}',
    handler: (request, h) => h.response({}).code(200),
  });
};
