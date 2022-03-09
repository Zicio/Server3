const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const router = new Router();

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

// router.get('/messages/unread', async ctx => {
//   const index = users.findIndex(({ name }) => name === ctx.params.name);
//   if (index === -1) {
//     const { v4: uuidv4 } = require('uuid');
//     const newId = uuidv4();
//     users.push({ id: newId, name: ctx.params.name });
//     ctx.response.status = 200;
//     ctx.response.body = users;
//     return;
//   }
//   ctx.response.status = 400;
//   ctx.response.body = `Имя пользователя "${ctx.params.name}" уже занято!`;
// });

app.use(router.routes()).use(router.allowedMethods());
const port = process.env.PORT || 7000;
const server = http.createServer(app.callback());

server.listen(port);
