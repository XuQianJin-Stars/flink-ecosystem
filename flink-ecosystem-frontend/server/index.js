const Hapi = require('hapi');
const Path = require('path');
// const mocker = require('mocker-data-generator').default;

const user = require('./user');
const tags = require('./tags');
const package = require('./packages/package');

const random = outOf => {
  return Math.floor(Math.random() * outOf + 1);
};

// const vote = {
//   username: { faker: "internet.userName" },
//   repository: { faker: "internet.url" },
// };

// votes = await mocker()
//   .schema("votes", vote, 50)
//   .build();

// makeVotes = () => ({
//   function() {
//     return this.faker.random.arrayElement(votes.votes);
//   },
//   length: random(),
// });

// comments: [
//   {
//     function() {
//       return {
//         avatar: this.faker.internet.avatar(),
//         text: this.faker.lorem.paragraph(),
//         username: this.faker.internet.userName(),
//         added: this.faker.date.past(),
//       };
//     },
//     length: random(100),
//   },
// ],

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: true,
      files: { relativeTo: Path.join(__dirname, 'dist/flink-ecosystem') },
    },
    router: { stripTrailingSlash: true },
  });

  await server.register(require('inert'));

  [user, tags, package].map(module => {
    module.route(server);
  });

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: '.',
        listing: false,
        index: ['index.html'],
      },
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
