const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/zohoverify', express.static(path.join(__dirname, 'zohoverify')));

app.get('/', (req, res) => {
  res.render('index');
});

app.use((req, res, next) => {
  res.status(404).render('page_404');
});

app.use((req, res, next) => {
  res.status(404).render('page_500');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
