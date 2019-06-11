## API Teste Desenvolvedor NodeJS Dev Ninjas

API desenvolvida para participação do processo seletivo da vaga de desenvolvedor. 

***OBS.: O teste necessita de conexão com o banco de dados MySQL instalado localmente.***
**No código está sendo considerado que o usuário do banco e a senha seja *'root'* para ambos. Caso queira alterar, realize esta operação alterando o usuário na *linha 6* e a senha na *linha 7* no arquivo *knexfile.js*.**

#### 1° Passo:
### Execução das queries para criação das tabelas no Banco de Dados.

Junto ao projeto, encontra-se um arquivo ***queries.sql*** com todas as queries iniciais para cada tabela no banco de dados.

#### 2º Passo:
### Cadastro de usuário "admin" para geração de token de acesso:

Após rodar os comandos SQL de criação das tabelas, deve-se criar um usuário "admin" apenas para que seja possível a geração de token, simulando assim, a operação de login, já que o mesmo é usado para validação em cada rota.

##### POST:
`/v1/users`

```json
{
  "name": "admin",
  "password": "123456",
  "email": "admin@email.com"
}
```

Deverá retornar está mensagem:
```json
{
    "success": true,
    "message": "User created!"
}
```

Para gerar o token deve realizar **post** na rota `/v1/token` passando o email no corpo da requisição:

```json
{
    "email": "admin@email.com"
}
```

Deve retornar isto:
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NjAyMTU1OTd9.QLtt3GKeJBaO7JTdYlmJ7I8EAEaco99o89ByWzdIgQ8"
}
```

Recomenda-se o uso do [Postman](https://www.getpostman.com/downloads/) para simular as requisições. Salve o token gerado como **Bearer token** na seção *Authorization*.

**Os demais passos seguem o que foi passado no próprio repositório do teste, que pode ser conferido [neste link](https://github.com/godevninjas/backend-challenge/blob/master/README.md).**

