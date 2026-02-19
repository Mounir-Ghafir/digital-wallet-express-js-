import { homePage, aboutPage, notFound } from '../controllers/userController.js';

function router(req, res) {
  if (req.url === '/') {
    homePage(req , res);

  } else if (req.url === '/about') {
    aboutPage(req , res);

  } else {
    notFound(req , res);
  }
}

export default router 