//Requisição HTTP da API
const details = document.querySelector('.details');
const pokeApiDetalhe = {}
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let offSet = 0;
let limit = 10;
let listaPokemon = document.querySelector('#pokemon_ol');
const pokemonHTML = listaPokemon;
const pokemonIdDetalhe = 1;







function loadPokemon(offSet, limit){
    pokeApi.getPokemons(offSet, limit).then((pokemons = []) => {  
        const newHtml = pokemons.map((pokemon)  =>`
        <li class="lista_pokemonsli  ${pokemon.type}  ">
        
            <div class="nome_tipo_pokemon " >
                <div class="nome_pokemon" >${pokemon.pokeName}</div>
                ${pokemon.types.map((type) => `<div class="tipo_pokemon ${type}">${type}</div>`).join('')}
            </div>
            <div class="poke_id">
                <div class="number">#0${pokemon.pokeId}</div>
                <img class="img_pokemon" src= "${pokemon.image}" alt="${pokemon.pokeName}">
                <div class="ver_detalhes" onclick="clicarDetalhe(${pokemon.pokeId})">Mais...</div>
            </div>
            
        </li>
        `).join("")
        pokemonHTML.innerHTML = newHtml
    })
}

loadPokemon(offSet, limit)





pokeApiDetalhe.getDetalhePokemon = (pokemonIdDetalhe = 1) => {
    const urlDetalhe = (`https://pokeapi.co/api/v2/pokemon/${pokemonIdDetalhe}`);
    return fetch(urlDetalhe).then((res) => res.json()).then((data =[]) => {

        //Const para dar cor de fundo de acordo com o tipo do pokemon
        let types = data.types.map((type) => type.type.name);
        const [type] = types;
        details.classList.remove("normal", "grass", "ground", "fighting", "rock", "steel", "fire", "electric", "flying", "psychic", "bug", "dragon", "water", "ice", "poison", "dark", "ghost", "fairy");
        details.classList.add(type);

        //Aplicando o HTML dentro da const htmlLista que está vinculada a SECTION dos detalhes dos pokemons
        const htmlLista = `
        <div class="top_details">
            <div class="id_nome ">
                <span class="material-symbols-outlined voltar_detalhes" onclick="clicarDetalhe(${data.id})">keyboard_backspace</span>
                    <div class="name_details">${data.name}</div>
                    <div class="id_details">#0${data.id}</div>
                </div>
                <ol>
                ${data.types.map((type) => `<li class="tipo_details ${type.type.name}">${type.type.name}</li>` ).join("")}
            
                </ol>
                <img class="image_details" src="${data.sprites['versions']['generation-v']['black-white']['animated']['front_default']}">
        </div>
            <section id="details_core">
                <ol class="details_core_ol">
                    <li>Especie:
                        <span>${data.species.name}</span>
                    </li>
                    <li>Altura:
                        <span>${(data.height / 10).toFixed(2).replace('.',",")}cm</span>
                    </li>
                    <li>Peso:
                        <span>${(data.weight / 10).toFixed(1).replace('.', ",") }Kg</span>
                    </li>
                    <li>Habilidades:
                    ${data.abilities.map((ability) => `<span class="habilidades ${type}"></br>${ability.ability.name}</span>`).join("")}
                        
                    </li>
                </ol>
            </section>
    `
        details.innerHTML = htmlLista;
        return details
    }).catch((error) => {
        console.log(`erro ${error}`)
    })
}



function clicarDetalhe(id = 200) {
    pokeApiDetalhe.getDetalhePokemon(id)
    details.classList.toggle('details_on')
}



//Botão de carregar mais pokémons
next.addEventListener('click', () =>{
    if(offSet <=130){
        offSet += limit
        details.classList.remove('details_on');
        loadPokemon(offSet, limit)
        if(offSet == 140){
            offSet = offSet + 1 
            details.classList.remove('details_on');
            loadPokemon(offSet, limit)
        }
    }else{
        console.log('Lista Finalizada')
        alert(`Você atingiu o limite de ${offSet + limit} pokemons, que correpondem a 1ª geração.`)
    } 
})

//Botão de carregar menos pokémons

prev.addEventListener('click', () => {
    if (offSet == 0) {
        alert(`Não é possível voltar mais a lista está no inicio`)
    } else if (offSet > 140){
        offSet = offSet - (limit + 1)
        details.classList.remove('details_on');
        loadPokemon(offSet, limit)
    } else
        offSet -= limit
    details.classList.remove('details_on');
    loadPokemon(offSet, limit)
        
})

