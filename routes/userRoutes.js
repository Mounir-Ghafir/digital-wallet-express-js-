import { createUser, getUsers, updateUser, deleteUser, notFound } from '../controllers/userController.js';

function router(req, res) {
  const { url, method } = req;

  if (url === '/users' && method === 'POST') {
    createUser(req, res);
  } 
  else if (url === '/users' && method === 'GET') {
    getUsers(req, res);
  }
  else if (url.startsWith('/users/') && method === 'PUT') {
    updateUser(req, res);
  } 
  else if (url.startsWith('/users/') && method === 'DELETE') {
    deleteUser(req, res);
  }
  else {
    notFound(req, res);
  }
}

export default router;