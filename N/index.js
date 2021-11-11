document.getElementById("filmesForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const text = document.getElementById("postText").value;
  const filme = {
    text: text,
    user_id: "ISABELLE",
    filme: "MIB",
    ano: "1997"
  }
  const filmesColecction = firebase.firestore().collection("filmes");
  filmesColecction.add(filme);

});

