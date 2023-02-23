# Teste técnico da Hagens

## 📌 Descrição

Aplicativo de cadastro, login e edição de usuários, desenvolvido para o teste técnico da empresa Hagens. 

## 📑 Índice

- [🧰 Tecnologias e conceitos utilizados](#-tecnologias-e-conceitos-utilizados)
- [🧭 Funcionalidades](#funcionalidades)
- [🚀 Rodando a Aplicação](#-rodando-a-aplicação)

## 🧰 Tecnologias e conceitos utilizados

- Git;
- Typescript;
- Expo;
- React Native;
- Tailwind CSS: Framework CSS;
- Axios: Comunicação com a API;
- React Hook Form e Yup: Formulários com alta performance, inputs com máscaras e validações;
- React Navigation: Navegação entre as telas do app;
- Persistência de login;
- Async Storage e Cryptojs: Armazemaneto local e criptografado;
- Expo Camera: Acesso a câmera do usuário para poder capturar uma foto de perfil;

## 🧭 Funcionalidades

- Cadastro de usuário;
- Login de usuário (persistido);
- Exibição dos dados do usuário na tela Home do aplicativo;
- Navegação entre as telas por meio de um menu lateral;
- Edição dos dados do usuário;
- Deslogar do aplicativo;  
- Acesso à câmera do dispositivo para poder tirar uma foto de perfil;    

## 🚀 Rodando a Aplicação
  
1. Clone o projeto:

    ```bash
      git clone https://github.com/lugablima/teste-tecnico-hagens.git
    ```

2. Siga as intruções descritas no arquivo README.md do back-end (<a href="https://github.com/lugablima/teste-tecnico-hagens/tree/main/back">https://github.com/lugablima/teste-tecnico-hagens/tree/main/back</a>) para poder subir o servidor.

3. Em seguida, navegue até o diretório do mobile:

    ```bash
      # Estando no diretório do back-end
      cd ..
      
      cd mobile/
    ```

5. Crie um arquivo `.env` na raiz da pasta `mobile` seguindo o exemplo descrito em `.env.example`:

    | Nome                 | Descrição                                                               |
    |--------------------- |------------------------------------------------------------------------ |
    | `API_BASE_URL`            | URL onde está rodando o servidor (ex: hhtp://192.168.0.11:5000)*   |
    | `ASYNC_STORAGE_TOKEN_KEY` | chave secreta para armazenar localmente o token (ex: @myapp:token) |
    | `CRYPTO_SECRET_KEY`       | chave secreta para criptografar dados com o cryptr                 |

    - Para descobrir o seu endereço IPv4, digite no terminal `hostname -I` 

3. Instale as dependências do projeto:

    ```bash
      npm i
    ```

4. Rode o projeto em modo de desenvolvimento com o Expo:

    ```bash
      npx expo start --clear
    ```
    
