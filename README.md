# ocean-backend-intro-fev-2026

Curso desenvolvido pela Samsung Ocean, com a aplicação desenvolvida no curso de Backend com NodeJs e Express, faremos a migração dos endpoints para funcionarem com o banco de dados MongoDB. Introduzindo o assunto sobre banco de dados, falando um pouco sobre SQL e NoSQL e os principais serviços que possibilitam essas tecnologias
## Configuração do banco de dados 🗄️

Os endpoints agora acessam a collection `personagens` dentro do banco de dados
`ocean-backend-mar-2026` hospedado no MongoDB Atlas.

Para que a aplicação consiga se conectar, defina a variável de ambiente
`MONGODB_URI` com a _connection string_ fornecida pelo Atlas. Por exemplo:

```bash
export MONGODB_URI="mongodb+srv://usuario:senha@cluster0.mongodb.net"
```

Você também pode substituir diretamente o placeholder em `src/db.js`:

```js
const MONGODB_URI = process.env.MONGODB_URI || '<YOUR_MONGODB_ATLAS_CONNECTION_STRING>'
```

Após configurar a URI, inicie a aplicação como de costume (`npm start`).

> Caso utilizem um arquivo `.env`, o nome da variável deve ser `MONGODB_URI`.
> O valor existente no repositório ainda contém `<db_password>` e precisa ser
> preenchido.
