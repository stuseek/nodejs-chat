const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware2');
const mysql = require('mysql');

function respond(req, res, next) {

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testchat'
  });

  connection.connect();

  connection.query(
    `SELECT Messages.Id AS Id, 
          Messages.ConversationId, 
          Messages.DateAdded,
          Messages.Message,
          Messages.AuthorId,
          Authors.Name,
          Authors.Icon from Messages
          LEFT JOIN Authors ON Messages.AuthorId = Authors.Id
          WHERE Messages.ConversationId = ${connection.escape(req.params.conversationId)}`, function (error, results) {
      if (error) {
        res.send('500', 'Database Error');
        throw error;
      } else {
        res.header('content-type', 'json');
        res.send(results);
        next();
      }
    });

  connection.end();

}

const server = restify.createServer();

// enable cors
const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'], // only for dev purposes
  allowHeaders: ['X-App-Version'],
  exposeHeaders: []
});

server.pre(cors.preflight);
server.use(cors.actual);


server.get('/messages/:conversationId', respond);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
