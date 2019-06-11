const app = require('./app')
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`API running in http://localhost:${port} address
Press Ctrl + C to stop execution.`))
