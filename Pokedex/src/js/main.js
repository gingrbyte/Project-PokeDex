// ------------------------------- VARS POKEPICKER -------------------------------\\
const btn = document.querySelector("#btn");
const number = document.querySelector("#number");
const img = document.querySelector("#img");
const pokemonName = document.querySelector("#name");

const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");


// -------------------- FUNCTIONS POKEPICKER + BASE POKEMON ----------------------\\

async function getPokemonStart() {
    const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/1"
    );
    const data = await response.json();

    img.src = data.sprites.front_default;
    pokemonName.innerText = data.name.toUpperCase();

    // console.log(data);
}
getPokemonStart();



// Await + Sync geleerd met ChatGPT
number.addEventListener("input", async () => {
    const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
    

// Validate input!
if (number.value === '') {
        return;
} else if (number.value <= 0 || number.value >= 1026) {
    console.error(`
        Number ${number.value} does not qualify.

        Number range: 1 - 1025
    `);

    setTimeout(() => {
        window.alert(`
            Sadly, that doesn't work...

            Try something between 1 and 1025!
        `);

        number.value = "";
    }, 500);
} else {
        const response = await fetch(pokeUrl + number.value);
        const data = await response.json();

        img.src = data.sprites.front_default;
        pokemonName.innerText = data.name.toUpperCase();

        console(`
            Number ${number.value} - 1025`
        )
    }

    // console.log(data);
});



// -------------------- FUNCTIONS GRID POKEMONS ----------------------\\

async function getPokemon(url = "https://pokeapi.co/api/v2/pokemon") {
    const listData = await fetch(url);
    const data = await listData.json();

    // console.log(data.results);

// Clears display
document.querySelector("#grid-display").innerHTML = "";

    data.results.forEach(async pokemon => {
        const pokeGrid = document.querySelector("#grid-display");

        const pokeContainer = document.createElement("div");
        const pokeImg = document.createElement("img");
        const pokeName = document.createElement("h2");
        const pokeInfo = document.createElement("div");

        const pokemonData = await fetch(pokemon.url);
        const pokemonDetails = await pokemonData.json();

        const pokemonNameUpper = pokemon.name.toUpperCase();

        // Add containers and img + info
        pokeGrid.appendChild(pokeContainer);
        pokeContainer.appendChild(pokeImg);
        pokeContainer.appendChild(pokeName);
        pokeContainer.appendChild(pokeInfo);

        pokeImg.src = pokemonDetails.sprites.front_default;
        pokeName.innerHTML = pokemonNameUpper;
        pokeInfo.innerHTML += `
            <details>
                <summary>Moves:</summary>
                    <ul>
                        <li>${pokemonDetails.moves[0].move.name}</li>
                        <li>${pokemonDetails.moves[1].move.name}</li>
                        <li>${pokemonDetails.moves[2].move.name}</li>
                    </ul>
            </details>
        `;
    });

    btnPrev.href = data.previous ?? "./pokedex.html";
    btnNext.href = data.next;

    // console.log(data);

    
}
getPokemon();

// e = event = click
btnNext.addEventListener("click", (e) => {
    e.preventDefault();
    getPokemon(btnNext.href);
});

btnPrev.addEventListener("click", (e) => {
    e.preventDefault();
    getPokemon(btnPrev.href);
});
