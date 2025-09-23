# 🚀 Elysia API com Better Auth

Uma API moderna e robusta construída com **Elysia**, **Better Auth** e **Drizzle ORM**, rodando no runtime **Bun**.

## ✨ Características

- ⚡ **Ultra-rápida** - Powered by Bun runtime
- 🔐 **Autenticação completa** - Better Auth com email/password
- 📊 **Banco de dados** - PostgreSQL com Drizzle ORM
- 📝 **Documentação automática** - OpenAPI/Swagger integrado
- 🛡️ **Tipagem forte** - TypeScript em toda aplicação
- 🏗️ **Arquitetura modular** - Organização limpa e escalável

## 🛠️ Stack Tecnológica

| Tecnologia | Descrição |
|------------|-----------|
| [Elysia](https://elysiajs.com/) | Framework web ultra-rápido para Bun |
| [Better Auth](https://www.better-auth.com/) | Sistema de autenticação moderno |
| [Drizzle ORM](https://orm.drizzle.team/) | ORM type-safe para TypeScript |
| [Bun](https://bun.sh/) | Runtime JavaScript ultra-rápido |
| [PostgreSQL](https://postgresql.org/) | Banco de dados relacional |
| [Zod](https://zod.dev/) | Validação de esquemas TypeScript |

## 🚦 Início Rápido

### Pré-requisitos

- [Bun](https://bun.sh/) instalado
- PostgreSQL rodando
- Node.js 18+ (para algumas dependências)

### Instalação

```bash
# Clone o repositório
git clone <seu-repo>
cd app

# Instale as dependências
bun install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com sua DATABASE_URL

# Execute as migrações
bun run db:migrate

# Gere as tabelas do Better Auth
bun run db:auth:generate

# Inicie o servidor de desenvolvimento
bun run dev
```

## 📁 Estrutura do Projeto

```
src/
├── database/           # Configuração do banco
│   ├── client.ts      # Cliente Drizzle
│   ├── schema/        # Schemas das tabelas
│   └── migrations/    # Migrações SQL
├── modules/           # Módulos da aplicação
│   ├── auth/         # Configuração Better Auth
│   └── users/        # Controller de usuários
├── plugins/          # Plugins globais
│   ├── auth.ts      # Middleware de autenticação
│   └── openapi.ts   # Configuração OpenAPI
├── types/           # Tipos TypeScript
└── index.ts        # Entrada da aplicação
```

## 🔌 API Endpoints

### Autenticação
```
POST   /auth/sign-up     # Criar conta
POST   /auth/sign-in     # Fazer login
POST   /auth/sign-out    # Fazer logout
GET    /auth/session     # Obter sessão atual
```

### Usuários
```
GET    /users/:id        # Buscar usuário por ID (requer auth)
```

### Documentação
```
GET    /openapi          # Documentação Swagger UI
```

## 🔐 Autenticação

O projeto usa **Better Auth** com as seguintes configurações:

- **Email/Password**: Autenticação tradicional
- **Sessões**: 24h de duração com cache de 5min
- **Cookies seguros**: HTTPOnly e Secure
- **Middleware global**: Injeta `user` automaticamente

### Exemplo de uso:

```typescript
// Controller protegido
.get("/protected", ({ user }) => {
  return { message: `Olá, ${user.name}!` };
}, { auth: true })
```

## 🗄️ Banco de Dados

### Schema Principal

**Users**
- `id` - UUID v7 (primary key)
- `name` - Nome do usuário
- `email` - Email único
- `emailVerified` - Status de verificação
- `image` - Avatar (opcional)
- `createdAt` / `updatedAt` - Timestamps

### Comandos Úteis

```bash
# Gerar nova migração
bun run db:generate

# Aplicar migrações
bun run db:migrate

# Gerar tabelas do Better Auth
bun run db:auth:generate
```

## 🧪 Desenvolvimento

### Scripts Disponíveis

```bash
bun run dev              # Servidor desenvolvimento (watch mode)
bun run db:generate      # Gerar migrações Drizzle
bun run db:migrate       # Aplicar migrações
bun run db:auth:generate # Gerar tabelas Better Auth
```

### Estrutura de Resposta

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "name": "João Silva"
}
```

### Tratamento de Erros

```json
{
  "message": "Unauthorized"
}
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Personalização

- **Sessões**: Modifique `session.expiresIn` em `src/modules/auth/index.ts`
- **Validações**: Ajuste schemas Zod nos controllers
- **CORS**: Configure no `src/index.ts` se necessário

## 🚀 Deploy

### Produção

1. Configure `DATABASE_URL` para produção
2. Execute migrações: `bun run db:migrate`
3. Configure Redis (recomendado para sessões)
4. Inicie: `bun src/index.ts`

### Docker (opcional)

```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY . .
RUN bun install
EXPOSE 4000
CMD ["bun", "src/index.ts"]
```

## 📚 Recursos Adicionais

- [Documentação Elysia](https://elysiajs.com/introduction.html)
- [Better Auth Docs](https://www.better-auth.com/docs)
- [Drizzle ORM Guide](https://orm.drizzle.team/docs/overview)
- [Bun Documentation](https://bun.sh/docs)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'Add nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

⚡ **Feito com Bun + Elysia** - Velocidade e simplicidade em primeiro lugar!