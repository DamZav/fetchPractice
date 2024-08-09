const BASE_URL = 'http://pokeapi.co/api/v2/';

// fetch(BASE_URL + "pokemon/" + 1)
// .then((res) => res.json())
// .then((data) => console.log(data));

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        console.log(response);
        const parsedData = await response.json();
        console.log(parsedData);
        return parsedData;
    } catch (err) {
        console.log(err);
    }
};

document.getElementById("get-btn")
    .addEventListener("click", async () => {
        const text = document.getElementById("pokemon-name").value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem("currentPokemonId", pokemon.id)
        console.log(pokemon.name);
});

document.getElementById("prev-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = Math.max(1, currentPokemonId - 1); // le resta 1, compara y si es 0, regresa el 1
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon.name);
});

document.getElementById("next-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = currentPokemonId + 1;
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon.name);
});

fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
        title: "Test Post",
        body: "This is a test post",
        userId: 1
    }),
})
    .then((res) => res.json())
    .then((data) => console.log(data))