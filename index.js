const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
// const routes = require("./config/routes")
const app = express();
const {initializeApp} = require('firebase/app');
const {getFirestore, collection, getDocs, addDoc, setDoc, doc, deleteDoc, query, where} = require('firebase/firestore/lite');
const {add} = require("nodemon/lib/rules");

// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
// app.use(routes);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-hzNheZ9H7Hk9Z-M4BZO9_GNgGTxi1Zg",
  authDomain: "armagedomcinebox.firebaseapp.com",
  databaseURL: "https://armagedomcinebox-default-rtdb.firebaseio.com",
  projectId: "armagedomcinebox",
  storageBucket: "armagedomcinebox.appspot.com",
  messagingSenderId: "819169317176",
  appId: "1:819169317176:web:8f33c12a1affd0453df1cd",
  measurementId: "G-9CC90GY2R6"
};

// Initialize Firebase
const fbapp = initializeApp(firebaseConfig);
const db = getFirestore(fbapp);

// INFORMAÇÕES DO FILME
app.get('/filmes', async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "filmes",));
  let array = {};
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    array[doc.id] = doc.data();
    console.log(doc.id, " => ", doc.data());
  });
  res.send(array);
});
app.post('/filmes', async (req, res) => {
  const filmes = req.body;
  console.log(filmes);

  await addDoc(collection(db, "filmes",), filmes);
  res.status(201).send("POST concluído com sucesso!")
});

app.put('/filmes', async (req, res) => {
  const filmes = req.body;

  await setDoc(doc(db, "filmes", req.body.id), filmes);
  res.send("PUT concluído com sucesso!")
});

app.delete('/filmes', async (req, res) => {
  const filmes = req.body;

  await deleteDoc(doc(db, "filmes", req.body.id), filmes);
  res.send("Delete concluído com sucesso!")
});
// INFORMAÇÕES DO USUÁRIO/login
app.post('/cadastro', async (req, res) => {
  const usuarios = req.body;
  console.log(usuarios);

  await addDoc(collection(db, "usuarios",), usuarios);
  res.status(201).send("POST concluído com sucesso!")
});

// INFORMAÇÕES DO CADASTRO usuario
app.post('/login', async (req, res) => {
  const usuarios = req.body;
  const usuariosRef = collection(db,'usuarios');
  const q = await query(usuariosRef , where('email', '==', usuarios.email,), where('senha', '==', usuarios.senha));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    res.status(402).send("E-mail ou senha inválidos")
    return;
    };
  res.status(200).send("OK")
});


// const docRef = doc(db, "filmes", "SF");
// const docSnap = await getDoc(collection(db, 'filmes'));
// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }


app.listen(21262, () => {
  console.log(`Express started at http://localhost:21262`)
})
