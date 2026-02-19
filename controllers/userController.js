function homePage(req, res) {
  res.end('Welcome to the Home Page!');
}

function aboutPage(req, res) {
  res.end('This is the About Page!');
}

function notFound(req, res) {
  res.end('404 - Page Not Found');
}

export { homePage, aboutPage, notFound };

