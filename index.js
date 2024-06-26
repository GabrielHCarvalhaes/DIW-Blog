const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000; 

app.use(cors()); 


app.use(express.static(path.join(__dirname, 'public')));


app.use('/db', express.static(path.join(__dirname, 'db')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/repo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'repo.html'));
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
