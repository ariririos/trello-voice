const express = require('express');

const app = express();

const routes = {};
// TODO: change to build (maybe)
routes.archive = require('../src/routes/archive');
routes.dates = require('../src/routes/dates');
routes.labels = require('../src/routes/labels');
routes.lists = require('../src/routes/lists');

app.use(express.static('build/public'));

app.set('views', 'build/views');

app.set('view engine', 'pug');

app.listen(9000, () => console.log('Hi world, I\'m listening on port 9000!')); // eslint-disable-line no-console

app.get('/', (req, res) => res.render('index'));

for (const [name, route] of Object.entries(routes)) {
  app.use(`/${name}`, route);
}

// TODO: get you a 404 page
app.use((req, res) => {
  res.status(404).send('Can\'t find that');
});

// TODO: get you a 500 error page
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err.stack); // eslint-disable-line no-console
  res.status(500).send('This dumb shit broke again <br/> It\'ll get fixed eventually');
});
