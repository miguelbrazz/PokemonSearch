var formulario = document.querySelector('form')
formulario.addEventListener('submit', function(e) {

    //Bloqueia o refresh da página
    e.preventDefault()

    //Url da pesquisa
    let urlForm = "https://pokeapi.co/api/v2/pokemon/";

    //Valor do input Name
    let name = document.getElementById("name")

    //Concatena a Url com o inputname
    urlForm = urlForm + this.name.value

    //Transforma os valores em minúsculas
    urlForm = urlForm.toLocaleLowerCase()

    //ID Content
    let resposta = document.getElementById('content')
    
    //ID imgPokemon
    let imagem = document.getElementById('imgPokemon')

    // Resposta em HTML
    let html = ''

    fetch(urlForm)
        .then(resposta => resposta.json())
        .then(function(data){
            console.log(data)
            html = 'Nome: ' + maiuscula(data.name) + '<br>'
            html = html + 'Tipo: ' + getType()
            resposta.innerHTML = html

            imagem.innerHTML = "<img src='" + data.sprites.front_default +
            "'><img src='" + data.sprites.back_default + "'><img src='" + data.sprites.front_shiny + "'>"

            getType()
            function getType() {
                if (data.types.length == 2) {
                    return '' + maiuscula(data.types[0].type.name) + " & " + maiuscula(data.types[1].type.name)
                }
                return '' + maiuscula(data.types[0].type.name)
}
        })
        .catch(function(err){
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
                html = 'Pokémon ou número não encontrado 😔<br>(o nome deve ser em inglês)'
            } else{
                html = 'Erro:' + err
            }
            resposta.innerHTML = html
        })        
});

function maiuscula(val) {
    return val[0].toUpperCase() + val.substr(1)
}
