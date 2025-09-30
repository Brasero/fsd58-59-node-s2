import express from "express";

const server = express();
const port = 8000;

server.use(express.urlencoded({extended: false}))

server.all("*path", (req, res) => {
  res.send(`
    <code>
      <a href="/">/</a><br>
      <a href="/app">/app</a><br>
      <a href="/app/Julian">/app/Julian</a><br>
      <a href="/app/Driss?lang=ca">/app/Driss?lang=ca</a><br>
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