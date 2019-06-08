const app = require('./app')
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`App rodando em http://localhost:${port}
Pressione Ctrl + C para interromper a execução.`))
