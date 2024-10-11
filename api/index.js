const express = require('express');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/setcookieadmin1', (req, res) => {
  res.cookie('admin', '1', { maxAge: 900000, httpOnly: true });
  res.send('Cookie set');
});

app.get('/', (req, res) => {
  if (req.cookies.admin) {
      return res.render('index');
  }
  return res.redirect('https://www.pornhub.com/');
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
