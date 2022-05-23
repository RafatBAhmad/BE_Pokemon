const app = (randomPokemon, i) => {
    const apiData = {
        url: 'https://pokeapi.co/api/v2/pokemon/',
        id: randomPokemon
    }
    const { url, id } = apiData
    const apiUrl = `${url}${id}`
    try {
        fetch(apiUrl)
            .then((data) => data.json())
            .then((pokemon) => generateHtml(pokemon, i))
    } catch (err) {
        console.log(err);
    }
}

const generateHtml = (data, i) => {
    console.log(data)
    let string = data.types[0].type.name
    let pokeType = string.charAt(0).toUpperCase() + string.slice(1);
    let index = i;
    if (i == 0) { i = 1 }
    const html =
        `
            <h3>${i}</h3>
            <img class="pokemonImg" src=${data.sprites.front_default}>
            <div class="name">${data.name}</div>
            <div class="details">
                <span>${pokeType}</span>
            </div>
            <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
            </label>
        `;
    var classNum = index.toString()

    const pokemonDiv = document.querySelector('.pokemon' + classNum)
    pokemonDiv.innerHTML = html

};

for (let i = 1; i < 7; i++) {
    var randomPokemon = Math.floor((Math.random() * 898) + 1);
    app(randomPokemon, i)
}
const searchBar = document.getElementById("Tsearch");
searchBar.addEventListener('keypress', () => {
    searchpoke();
})
function searchpoke() {
    let pokemonName = document.getElementById("Tsearch").value
    app(pokemonName, 0)
}
