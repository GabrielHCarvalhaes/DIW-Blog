const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db', 'db.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public') // Servir arquivos estáticos da pasta public
});

// Middlewares padrão do JSON Server
server.use(middlewares);

// Custom routes before JSON Server router
server.get('/api', (req, res) => {
  res.jsonp({ message: 'Welcome to the API' });
});

// Usando o router do JSON Server
server.use('/api', router);

// Iniciando o servidor na porta 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});

