const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const app = express();

app.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json', (res) => {
    console.log(res);
});
//console.log(JSON.parse(await fs.readFile("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json")));



app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})