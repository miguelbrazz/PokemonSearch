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
            html = maiuscula(data.name) 
            html = html + ' • ' + data.id + '<br>'
            html = html + 'Type: ' + getType()
            resposta.innerHTML = html

            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"

            getType()
            function getType() {
                if (data.types.length == 2) {
                    return '' + maiuscula(data.types[0].type.name) + " & " + maiuscula(data.types[1].type.name)
                }
                return '' + maiuscula(data.types[0].type.name)
}
        })
        .catch(function(err){
            if(err == `SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON`){
                html = 'Pokémon not found.'
            } else{
                html = err
            }
            resposta.innerHTML = html
        })        
});

function maiuscula(val) {
    return val[0].toUpperCase() + val.substr(1)
}