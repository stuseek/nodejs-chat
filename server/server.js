const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware2');

function respond(req, res, next) {
  const response = [
    {
      ID: 4519304701333,
      created_timestamp: '2022-05-10T23:59:00Z',
      message: 'Hello',
      author_name: 'Stan',
      author_icon: 'https://batelle.com/wp-content/uploads/2021/07/cropped-batelle-fav-1-270x270.png',
      author_ID: 520661
    },
    {
      ID: 4519304701334,
      created_timestamp: '2022-05-10T23:59:00Z',
      message: 'How it`s going?',
      author_name: 'Stan',
      author_icon: 'https://batelle.com/wp-content/uploads/2021/07/cropped-batelle-fav-1-270x270.png',
      author_ID: 520661
    },
  ];

  res.header('content-type', 'json');
  res.send(response);

  next();
}

const server = restify.createServer();

// enable cors
const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'], // only for dev purposes
  allowHeaders:['X-App-Version'],
  exposeHeaders:[]
});

server.pre(cors.preflight);
server.use(cors.actual);


server.get('/messages', respond);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
