const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDatail){
    const pokemon = new Pokemon()
    pokemon.pokeId = pokeDatail.id
    pokemon.pokeName = pokeDatail.name
    const types = pokeDatail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.image = pokeDatail.sprites['versions']['generation-v']['black-white']['animated']['front_default']
    return pokemon

}

pokeApi.getPokemonsDetail = (pokemon) =>{
    return fetch(pokemon.url)
        .then((respomse) => respomse.json())
        .then(convertPokeApiDetailPokemon)   
}


pokeApi.getPokemons = (offSet = 0, limit = 10) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`;

    return  fetch(url).then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetailsList) => pokemonDetailsList) 
}











