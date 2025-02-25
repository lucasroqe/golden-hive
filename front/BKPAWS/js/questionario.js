
function listarQuestao() {
  // Verifica se o usuário está logado
  if (!usuarioLogado) {
    // Esconde o botão de logout
    document.getElementById("botao-logout").style.display = "none";
    document.getElementById("saida").innerHTML = "<p>O usuário não está logado. Clique para efetuar o <a href='./login.html'>login</a>.</p>";
  } else {
    // Configuração da requisição
    const url = `${urlbase}/questao`;

    // Submete a requisição
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        let questoes = "";
        const shuffled = shuffle(data);
        const slice = shuffled.slice(0,20);
        for (i = 0; i < slice.length; i++) {
          questoes += `<div class='questao'>
            <div class='linha-enunciado'>${data[i].enunciado}</div>
            <div class='linha-alternativa'>
              <div class='item-alternativa'>
                <input type="radio" value="true" name="questao-opcao-${data[i].idquestao}" id="verdadeiro${i}">
                <label for="verdadeiro${i}">Verdadeiro</label>
              </div>
              <div class='item-alternativa'>
                <input type="radio" value="false" name="questao-opcao-${data[i].idquestao}" id="falso${i}">
                <label for="falso${i}">Falso</label>
              </div>
            </div>
          </div>`;
        }
        document.getElementById("saida").innerHTML = questoes;
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
