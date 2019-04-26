const mocker = require('mocker-data-generator').default;
const slugify = require('slugify');

const releases = require('./releases');

const random = outOf => {
  return Math.floor(Math.random() * outOf + 1);
};

const package = {
  id: {
    function() {
      return slugify(this.faker.commerce.productName());
    },
  },
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

module.exports = function(server) {
  server.route({
    method: 'get',
    path: '/api/v1/packages',
    handler: request => {
      const { query = '' } = request.query;
      const count = !query ? 30 : query.includes('tag:') ? 15 : 5;

      return mocker()
        .schema('items', package, count)
        .build();
    },
  });

  server.route({
    method: ['get', 'patch', 'delete'],
    path: '/api/v1/packages/{package}',
    handler: request => {
      switch (request.method) {
        case 'patch':
        case 'delete':
          return {};
        case 'get':
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
    method: 'post',
    path: '/api/v1/packages/{package}/upvote',
    handler: (request, h) => h.response({}).code(201),
  });

  server.route({
    method: 'post',
    path: '/api/v1/packages/{package}/downvote',
    handler: (request, h) => h.response({}).code(201),
  });

  [releases].map(route => route(server));
};
