const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const app = express();
const port = 3000;
const host = '127.0.0.1';

app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', '/app/app/views');

app.use(express.urlencoded({ extended: false, limit: '16kb' }));
app.use(cookieParser());
app.use('/assets', express.static('/app/app/public', {
  setHeaders(res) {
    res.setHeader('Cache-Control', 'public, max-age=600');
  }
}));

app.use('/', routes);

app.listen(port, host, () => {
  console.log(`VVIP Lounge listening on ${host}:${port}`);
});
