const express = require("express");
const {route} = require("express/lib/router");
const routes = express.Router()

let db = [
  { "1": {Filme: "Avengers", Ano: "1985" } },
  { "2": {Filme: "Avengers", Ano: "1986" } },
  { "3": {Filme: "Avengers", Ano: "1987" } },
]
//buscar dados
routes.get("/", (req, res) => {
  return res.json(db);
})

// inserir dados
routes.post("/", (req, res) =>{
  const body = req.body
  console.log(body)

  if (!body)
    return res.status(400).end()

  db.push(body)
  return res.json(body)
})
//
// routes.delete("/:id", (req, res) =>{
//   const id = req.params.id
//
//   let newDB = db.filter(item => {
//     if (!item[id])
//       return item
//   })
//
//   db = newDB
//   return res.send(newDB)
// })


module.exports = routes

