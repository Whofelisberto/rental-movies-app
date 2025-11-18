# 🎥 Rental Movies App

Este é um sistema de locação de filmes (“rental movies”) que oferece uma API para gerenciar filmes, aluguéis e usuários. A aplicação foi projetada para servir como backend robusto, com controle de dados, autenticação, e lógica de negócio para operações de locação.

## Tecnologias / Stack

- **Node.js** – ambiente de execução JavaScript  
- **Express** – framework web para Node  
- **Prisma** – ORM para modelagem e acesso ao banco de dados  
- **PostgreSQL** (banco compatível via Prisma) – para armazenar dados persistentes  
- **Docker / Docker Compose** – para orquestração de ambiente (banco)  
- **Middleware de autenticação** – para proteger rotas privadas  
- **Estrutura modular** com controllers, middlewares, rotas e utilitários  

## Características Principais

- Gerenciamento de filmes (CRUD)  
- Autenticação de usuários  
- Processamento de aluguéis: criar, listar, devolver filmes  
- Validação de dados e tratamento de erros  
- Configuração via Docker para facilitar a implantação  

---

## 📂 Estrutura de Pastas

Aqui está a estrutura de pastas do projeto, em formato de árvore (bash-style):

```bash
rental-movies-app/
├── controllers/
├── middlewares/
├── prisma/
├── routes/
├── src/
├── utils/
├── docker-compose.yml
├── package.json
├── package-lock.json
└── .gitignore
```
## Projeto

° controllers/: lida com a lógica dos endpoints (movies, rentals , users, etc)
° middlewares/: middlewares como autenticação, validação
° prisma/: esquema do banco de dados, migrações e cliente Prisma
° routes/: definição das rotas da API
° src/: servidor, configuração, ou código principal
° utils/: funções auxiliares, helpers e utilitários genéricos
° docker-compose.yml: para orquestrar containers (app + banco de dados)
° package.json & package-lock.json: dependências do projeto

## Aqui está uma estrutura das rotas (endpoints) da aplicação, organizadas por recurso:

```bash
/movies
  GET     /api/movies/todos/movie            → Listar todos os filmes  
  POST    /api/movies/criar/movie          → Criar novo filme  
  GET     /api/movies/movies/:id        → Buscar um filme específico  
  PUT     /api/movies/movie/update/:id        → Atualizar um filme  
  DELETE  /api/movies//movie/:id       → Deletar um filme

/rentals
  GET     /api/rentals/my-rentals           → Listar todos os aluguéis  
  POST    /api/rentals/rent/:movieId          → Criar um novo aluguel  
  PUT   /api/rentals/return/:rentalId    → Marcar uma locação como devolvida  

/auth
  POST    /api/auth/registrar      → Registrar novo usuário  
  POST    /api/auth/login         → Login de usuário
```

# 🚀 Como Rodar Localmente


1. Clone o repositório:
   
```bash
git clone https://github.com/Whofelisberto/rental-movies-app.git
```


2. Entre na pasta:

```bash

cd rental-movies-app
```

3. Instale as dependências:
   
```bash

npm install
```
4. Configure variáveis de ambiente: Crie um arquivo .env (se for necessário) com, por exemplo:

```bash
PORT=3000
DATABASE_URL=""
JWT_SECRET=troque_por_uma_chave_forte_aqui
```

5. Suba os serviços com Docker (se estiver usando):
```bash
   docker-compose up
```

6. Inicialize o Prisma:
```bash
  npx prisma migrate dev
  npx prisma generate
```
7. Execute a aplicação:
```bash
   npm run dev
```
