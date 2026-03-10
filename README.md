# ocean-backend-mar-2026

## Configuracao do MongoDB Atlas

1. Crie o arquivo `.env` na raiz do projeto.
2. Preencha a variavel `MONGODB_URI` com a sua string de conexao do Atlas.
3. Rode o projeto com `npm run dev`.

Exemplo de variavel:

```env
MONGODB_URI=mongodb+srv://USUARIO:SENHA@CLUSTER.mongodb.net/?retryWrites=true&w=majority&appName=SEU_APP
```

A API utiliza o banco `ocean-backend-mar-2026` e a collection `personagens`.