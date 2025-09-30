import express from "express";
import session from "express-session"
import {counterMiddleware, loggerMiddleware} from "./middleware.js";

const server = express();
const port = 8000;

server.use(session({
  name: "session",
  secret: "simple",
  resave: true,
  saveUninitialized: true
}))

server.use(express.urlencoded({extended: false}))
server.use(counterMiddleware)
server.use(loggerMiddleware)


server.get("/reset", (req,res) => {
  req.session.regenerate((err) => {
    res.redirect("/")
  })
})

server.get("/destroy", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/")
  })
})

server.all("*path", (req, res) => {
  res.send(`
    <code>
      <a href="/">/</a><br>
      <a href="/app">/app</a><br>
      <a href="/app/Julian">/app/Julian</a><br>
      <a href="/app/Driss?lang=ca">/app/Driss?lang=ca</a><br>
      <a href="/reset">/reset</a><br>
      <a href="/destroy">/destroy</a><br>
      <br>
      <form action="/app/create" method="post">
        <input type="text" name="name" placeholder="name" size="5" />
        <button type="submit">POST /app/create</button>
      </form>
    </code>
  `)
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})