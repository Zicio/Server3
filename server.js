const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const router = new Router();
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const app = new Koa();

const options = {
  origin: '*'
};
app.use(cors(options));

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true
}));

router.get('/messages/unread', async ctx => {
  const data = {
    status: 'ok',
    timestamp: Date.now(),
    messages: [
      {
        id: uuidv4(),
        from: faker.internet.email(),
        subject: faker.lorem.words(),
        body: faker.lorem.text(),
        received: faker.date.past().getTime()
      }
    ]
  };
  ctx.response.status = 200;
  ctx.response.body = data;
  console.log(ctx.response.body);
});

app.use(router.routes()).use(router.allowedMethods());
const port = process.env.PORT || 7000;
const server = http.createServer(app.callback());

server.listen(port);