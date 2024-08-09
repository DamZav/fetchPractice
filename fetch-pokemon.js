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
    if (pokemon) {
        // si se obtiene un pokemon válido se actualiza el currentPokemonId en el localStorage (almacenamiento local)
        localStorage.setItem("currentPokemonId", pokemon.id);
        console.log(pokemon.name);
    } else {
        console.log(`No Pokemon found with ID ${newId}`);
    }
});


document.getElementById("next-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = currentPokemonId + 1;
    const pokemon = await fetchPokemon(newId);
    if (pokemon) {
        // si se obtiene un pokemon válido se actualiza el currentPokemonId en el localStorage (almacenamiento local)
        localStorage.setItem("currentPokemonId", pokemon.id);
        console.log(pokemon.name);
    } else {
        console.log(`No Pokemon found with ID ${newId}`);
    }
});



const displayPokemon = (pokemon) => {

    // Selecciona el contenedor donde se mostrará la información del pokemon
    const pokemonInfoDiv = document.getElementById("pokemon-card");

    // Limpia el contenido anterior
    pokemonInfoDiv.innerHTML = "";

    // pokemonInfoDiv.innerHTML = `
    //     <h2>${pokemon.name}</h2>
    //     <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    //     <p>ID: ${pokemon.id}</p>
    //     <p>Types: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
    //     <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
    // `;

    // Crea los elementos para mostrar la información del pokemon
    const pokemonName = document.createElement("h2");
    pokemonName.textContent = pokemon.name;

    const pokemonId = document.createElement("p");
    pokemonId.textContent = `ID: ${pokemon.id}`;

    const pokemonTypes = document.createElement("p");
    pokemonTypes.textContent = `Types: ${pokemon.types.map(type => type.type.name).join(", ")}`;

    const pokemonAbilities = document.createElement("p");
    pokemonAbilities.textContent = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}`;

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;

    // Añade los elementos al contenedor de la información del pokemon
    pokemonInfoDiv.appendChild(pokemonName);
    pokemonInfoDiv.appendChild(pokemonImage);
    pokemonInfoDiv.appendChild(pokemonId);
    pokemonInfoDiv.appendChild(pokemonTypes);
    pokemonInfoDiv.appendChild(pokemonAbilities);
};


// Función para actualizar la información del Pokémon
const updatePokemon = async (pokemonId) => {
    const pokemon = await fetchPokemon(pokemonId);
    if (pokemon) {
        displayPokemon(pokemon);
        localStorage.setItem("currentPokemonId", pokemon.id);
    } else {
        console.log(`No Pokémon found with ID ${pokemonId}`);
        document.getElementById("pokemon-card").innerHTML = "<p>Pokemon not found. Please check the name or ID.</p>";
    }
};


window.addEventListener("load", async () => {
    const initialId = localStorage.getItem("currentPokemonId") || 1;
    await updatePokemon(initialId);
});



// Luego asegúrate de llamar a displayPokemon() después de obtener el Pokémon
document.getElementById("get-btn").addEventListener("click", async () => {
    const text = document.getElementById("pokemon-name").value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    if (pokemon) {
        localStorage.setItem("currentPokemonId", pokemon.id);
        displayPokemon(pokemon);
        console.log(pokemon.name);
    }
});


// const displayPokemon = (pokemon) => {

//     // Crear contenedor de la tarjeta
//     const cardContainer = document.createElement("div");
//     cardContainer.classList.add("container row card-container");

//     const pokemonInfoDiv = document.getElementById("pokemon-card");

//     // Crear contenido HTML con la información del Pokémon, incluida la imagen
    // pokemonInfoDiv.innerHTML = `
    //     <h2>${pokemon.name}</h2>
    //     <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    //     <p>ID: ${pokemon.id}</p>
    //     <p>Types: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
    //     <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
    // `;

//     // Clear previous content
//     pokemonInfoDiv.innerHTML = "";

//     // Create elements to display Pokemon information
//     const pokemonName = document.createElement("h2");
//     cardTitleElement.classList.add("card-title");
//     pokemonName.textContent = pokemon.name;

//     const pokemonId = document.createElement("p");
//     pokemonId.textContent = `ID: ${pokemon.id}`;

//     const pokemonTypes = document.createElement("p");
//     pokemonTypes.textContent = `Types: ${pokemon.types.map(type => type.type.name).join(", ")}`;

//     const pokemonAbilities = document.createElement("p");
//     pokemonAbilities.textContent = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}`;

//     // Append elements to the info div
//     pokemonInfoDiv.appendChild(pokemonName);
//     pokemonInfoDiv.appendChild(pokemonId);
//     pokemonInfoDiv.appendChild(pokemonTypes);
//     pokemonInfoDiv.appendChild(pokemonAbilities);

//     cardContainer.append(pokemonName, pokemonId, pokemonTypes, pokemonAbilities);

//     // Agregar contenedor de la tarjeta al contenedor principal
//     container.appendChild(cardContainer);
// };





// fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json; charset=utf-8",
//     },
//     body: JSON.stringify({
//         title: "Test Post",
//         body: "This is a test post",
//         userId: 1
//     }),
// })
//     .then((res) => res.json())
//     .then((data) => console.log(data))