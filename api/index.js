const express = require('express');
const path = require('path');
const sitemap = require('sitemap');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/zohoverify', express.static(path.join(__dirname, 'zohoverify')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/sitemap.xml', (req, res) => {
  const sitemapContent = sitemap.createSitemap({
    hostname: 'https://www.luambacul.ro',
    cacheTime: 600000,
    urls: [
      { url: '/', changefreq: 'daily', priority: 1.0 },
    ]
  });

  res.header('Content-Type', 'application/xml');
  res.send(sitemapContent.toString());
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render('page_404');
});

// Handle 500 errors
app.use((req, res, next) => {
  res.status(500).render('page_500');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
