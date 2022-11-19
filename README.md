# Olá, <img src="https://raw.githubusercontent.com/kaueMarques/kaueMarques/master/hi.gif" width="30px" height="30px"> Bem vindo ao repositório do desafio técnioco da <a href="https://ng.cash/"  target="_blank">NGCash!</a>

## 🤔 O que esse projeto faz?
O desafio consiste em criar uma api para que clientes da NG possam fazer transferências internas entre si, neste projeto é possível criar um novo cliente, fazer login e receber um token JWT, consultar o saldo na conta logado, ou seja, que apresente um token válido, fazer o depósito nesta conta, realizar transferências entre clientes passando o username e por fim filtrar as transações. 

---

## 🤷🏽‍♀️ Como iniciar o projeto
### 1. Clone o repositório: 
* `git clone git@github.com:CRafaelS/NGCahs_Trybe.git`
### 2. Entre na pasta do repositório que você acabou de clonar e na pasta Backend: 
* `cd NGCahs_Trybe/Backend`
### 3. Instale as dependências: 
* `npm install`
### 4. Utilize o docker-compose para criar o banco PostgreSQL: 
* `docker-compose up -d`
### 5. Inicie a aplicação, ela vai rodar da porta 3001: 
* `npm start` para iniciar com ts-node ou `npm run dev` para ts-node-dev.

---

## 👨‍💻 Vamos ver o projeto funcionando? 

É possível ver a documentação desta api pelo link `https://documenter.getpostman.com/view/20953705/2s8YmRQ2Ao`, esta documentação foi gerada e publicada através do <strong> Postman </strong>, mas vamos construir nosso banco juntos, lembrando que quando iniciamos o projeto iniciamos com um banco vazio, então vamos passar em todas as rotas e conhecê-las melhor.

## 1. Criar cliente
 Vamos iniciar criando clientes, para isso basta passarmos um username único e uma senha que tenha pelo menos uma letra maiúscula, um número e o seu tamanho deve ser maior que 8 caracteres.
 > <strong>POST</strong> `http://localhost:3001/client`

 ```json
 {
    "username": "Rafael",
    "password": "Teste1234"
 }
 ```
 Esta rota tem as seguintes verificações:
 - existe um username e password
 - username é unico e contém mais que 3 caracteres
 - password tem mais que 8 caracteres e se tem pelo menos um número e uma letra maiúscula

 Uma notícia boa é que todos os clientes NG desta API, iniciam com R$100,00 na conta e para não ocorrer nenhum problema no caminho a conta só é criada se tudo ocorrer bem 😄

 Aconselho criar mais que um cliente, pois vamos precisar para rotas futuras.

## 2. Login
 Para o login precisamos passar um username e password válido, e assim que esta condição for satisfeita a requisição retornará um token JWT com duração de 24h. 
 > <strong>POST</strong> `http://localhost:3001/auth`

 ```json
 {
    "username": "Rafael",
    "password": "Teste1234"
 }
 ```
## 3. Saldo
 Após fazer login podemos verificar qual é o nosso saldo, lembrando que temos que utilizar o token JWT gerado no login.
 > <strong>GET</strong> `http://localhost:3001/account`

## 4. Deposito