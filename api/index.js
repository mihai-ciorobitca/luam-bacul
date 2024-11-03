const express = require('express');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const date = new Date();
  const minute = date.getMinutes();
  if (minute % 2 === 0) {
    //return res.send('');
  }
  return res.render('index');
});

app.get('/sitemap.xml', (req, res) => {
  const stream = new SitemapStream({ hostname: 'https://luambacul.ro' });
  stream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  stream.end();
  streamToPromise(stream)
    .then(sitemap => {
      res.header('Content-Type', 'application/xml');
      res.send(sitemap.toString());
    })
    .catch(err => {
      console.error('Error generating sitemap:', err);
      res.status(500).send('Error generating sitemap');
    });
});

app.use((req, res, next) => {
  res.status(404).render('page_404');
});

app.use((req, res, next) => {
  res.status(500).render('page_500');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
