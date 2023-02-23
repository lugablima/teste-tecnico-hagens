# Teste técnico da Hagens

## 📌 Descrição

Aplicativo de cadastro, login e edição de usuários, desenvolvido para o teste técnico da empresa Hagens. 

## 📑 Índice

- [🧰 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🧭 Referências da API](#-referências-da-api)
  - [Cadastro de usuário](#cadastro-de-usuário)
  - [Login de usuário](#login-de-usuário)
  - [Buscar dados do usuário](#buscar-dados-do-usuário)
  - [Editar dados do usuário](#editar-dados-do-usuário)
- [🚀 Rodando a Aplicação](#-rodando-a-aplicação)

## 🧰 Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## 🧭 Referências da API

### Cadastro de usuário

```http
POST /signup
```

Nesta rota é possível realizar o cadastro do usuário fornecendo os seguintes dados:

- `name` deve ser uma string contendo no mínimo 2 e no máximo 70 caracteres;
- `phone` deve ser uma string e possuir o seguinte formato: `(11) 11111-1111`;
- `email` deve ter o formato de um email e possuir no máximo 70 caracteres;
- `password` deve ser uma string com no mínimo 6 caracteres;

#### Requisição

```json
{
    "name": "John Smith",
    "phone": "(11) 11111-1111",
    "email": "john@email.com",
    "password": "123456"
}
```

#### Resposta

```http
HTTP/1.1 201 Created
```

```json
"Usuário cadastrado com sucesso."
```

| Body             |  Code      |  Description                                                                 |
| :--------------- | :-------   | :--------------------------------------------------------------------------- |
| `json`           |   `201`    | **Created**                                                                  |
| `json`           |   `409`    | **Conflict**, Email já cadastrado                                            | 
| `json`           |   `422`    | **Unprocessable Entity**, dados inválidos, ex.: Email em um formato inválido |

### Login de usuário

```http
POST /signin
```

Nesta rota é possível realizar o login do usuário fornecendo os seguintes dados:

- `email` deve ter o formato de um email e possuir no máximo 70 caracteres;
- `password` deve ser uma string com no mínimo 6 caracteres;

#### Requisição

```json
{
    "email": "john@email.com",
    "password": "123456"
}
```

#### Resposta

```http
HTTP/1.1 200 Ok
```

```json
{
  "token": "Token JWT" 
}
```

| Body             |  Code      |  Description                                                                 |
| :--------------- | :-------   | :--------------------------------------------------------------------------- |
| `json`           |   `200`    | **Ok**                                                                       |
| `json`           |   `401`    | **Unauthorized**, E-mail e/ou senha inválido(s)                              |
| `json`           |   `422`    | **Unprocessable Entity**, dados inválidos, ex.: Email em um formato inválido |

### Buscar dados do usuário

```http
GET /users/info
```

Nesta rota, é possível buscar os dados do um usuário, fornecendo o seguinte dado: 

#### Requisição

| Headers         | Tipo     | Descrição                    |
| :-------------- | :------- | :--------------------------- |
| `Authorization` | `string` | **Obrigatório**. Token JWT.  |

`O campo Authorization deve ter o seguinte formato: Bearer token_JWT`
  
#### Resposta

```http
HTTP/1.1 200 OK
```

```json
{
  "id": "3d82be1d-4ecc-4a29-befb-0bb5cb666c2c",
  "name": "John Smith",
  "phone": "(11) 11111-1111",
  "email": "john@email.com",
  "image": {
    "id": "7a264b78-dca6-4150-b98a-b14544218770",
    "name": "Perfil.jpeg",
    "type": "image/jpeg",
    "data": "string no formato base64"
  }  
}
```

| Body             |  Code      |  Description                          |
| :--------------- | :-------   | :------------------------------------ |
| `json`           |   `200`    | **OK**                                |
| `json`           |   `404`    | **Not Found**, Usuário não encontrado |

### Editar dados do usuário

```http
PATCH /users
```

Nesta rota, é possível alterar os dados do usuário, fornecendo **pelo menos um** dos seguintes dados:

#### Requisição

| Headers         | Tipo     | Descrição                                   |
| :-------------- | :------- | :------------------------------------------ |
| `Authorization` | `string` | **Obrigatório**. Token JWT.                 |
| `image`         | `file`   | **Opcional**. Arquivo de imagem para upload.|

`O campo Authorization deve ter o seguinte formato: Bearer token_JWT`

`O campo image é opcional e é designado para fazer o upload da imagem do usuário, para isso, utilize algum REST API Client (Insomnia, Postman, etc) que possua suporte a este tipo de operação`

```json
{
    "name": "John Smith",
    "phone": "(11) 11111-1111",
    "email": "john@email.com",
    "password": "123456"
}
```

#### Resposta

```http
HTTP/1.1 200 OK
```

```json
"Usuário modificado com sucesso."
```

| Body             |  Code      |  Description                                                                 |
| :--------------- | :-------   | :--------------------------------------------------------------------------- |
| `json`           |   `200`    | **OK**                                                                       |
| `json`           |   `400`    | **Bad Request**, Payload da request está vazio                               |
| `json`           |   `404`    | **Not Found**, Usuário não encontrado                                        |
| `json`           |   `409`    | **Conflict**, Email já cadastrado                                            | 
| `json`           |   `422`    | **Unprocessable Entity**, dados inválidos, ex.: Email em um formato inválido |

## 🚀 Rodando a Aplicação

1. Clone e navegue até o repositório do back-end:

    ```bash
      git clone https://github.com/lugablima/teste-tecnico-hagens.git

      cd teste-tecnico-hagens/back/
    ```

2. Crie um arquivo `.env.dev` na raiz da pasta `back` seguindo o exemplo descrito em `.env.example`:

    | Nome                 | Descrição                                          |
    |--------------------- |--------------------------------------------------- |
    | `PORT`               | porta onde a aplicação vai rodar                   |
    | `JWT_SECRET`         | chave secreta para gerar o token JWT               |
    | `CRYPTR_SECRET`      | chave secreta para criptografar dados com o cryptr |
    | `POSTGRES_USERNAME`  | username do postgres                               |
    | `POSTGRES_PASSWORD`  | senha do postgres                                  |
    | `POSTGRES_HOST`      | host do postgres                                   |
    | `POSTGRES_PORT`      | porta do postgres                                  |
    | `POSTGRES_DATABASE`  | nome do banco de dados                             |
    | `DATABASE_URL`       | URL de conexão do postgres                         |

    - É importante manter a variável `POSTGRES_HOST` como sendo igual a `postgres_hagens_dev`.
    - Mantenha também a variável `POSTGRES_PORT` como sendo igual a `5432`.
    - Certifique-se de que não há nenhuma aplicação rodando em `http://localhost:5432`.  

3. Instale as dependências do projeto:

    ```bash
      npm i
    ```

4. Rode o projeto em modo de desenvolvimento com NPM ou docker:

    ```bash
      ## Rodando com NPM e Node
      npm run dev

      ## Rodando com Docker e docker-compose
      npm run dev:docker
    ```
    
