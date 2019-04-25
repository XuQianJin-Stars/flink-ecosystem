const mocker = require('mocker-data-generator').default;

const random = outOf => {
  return Math.floor(Math.random() * outOf + 1);
};

const package = {
  id: { incrementalId: 0 },
  name: { faker: 'commerce.productName' },
  description: { faker: 'lorem.paragraph' },
  readme: { faker: 'lorem.paragraphs(4)' },
  image: {
    function() {
      return this.faker.image.image().replace('http://', 'https://') + '/';
    },
  },
  website: { faker: 'internet.url' },
  repository: { faker: 'internet.url' },
  license: { faker: 'commerce.productAdjective' },
  commentsCount: { faker: 'random.number({"min": 20, "max": 100})' },
  upvotes: { faker: 'random.number({"min": 100, "max": 1000})' },
  downvotes: { faker: 'random.number({"min": 50, "max": 100})' },
  tags: [
    {
      function() {
        return this.faker.company.catchPhraseNoun();
      },
      length: random(10),
    },
  ],
  added: { faker: 'date.past' },
  updated: { faker: 'date.past' },
  owner: { faker: 'internet.userName' },
};

module.exports = {
  route(server) {
    server.route({
      method: 'GET',
      path: '/api/v1/packages',
      handler: () =>
        mocker()
          .schema('packages', package, 30)
          .build()
          .then(data => ({ items: data.packages })),
    });

    server.route({
      method: ['GET', 'PATCH', 'DELETE'],
      path: '/api/v1/packages/{package}',
      handler: request => {
        switch (request.method) {
          case 'PATCH':
          case 'DELETE':
            return {};
          case 'GET':
            return mocker()
              .schema('packages', package, 1)
              .build()
              .then(data => data.packages[0]);
          default:
            throw new Error();
        }
      },
    });

    server.route({
      method: 'POST',
      path: '/api/v1/packages/{package}/upvote',
      handler: (request, h) => h.response({}).code(201),
    });

    server.route({
      method: 'POST',
      path: '/api/v1/packages/{package}/downvote',
      handler: (request, h) => h.response({}).code(201),
    });
  },
};
