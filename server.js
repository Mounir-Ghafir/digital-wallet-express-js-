import http from 'http'
import router from './routes/userRoutes.js'; 

const server = http.createServer(router);

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});