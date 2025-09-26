# 🚀 Elysia API with Better Auth

A modern and robust API built with **Elysia**, **Better Auth** and **Drizzle ORM**, running on **Bun** runtime.

> **Note:** This is the **main branch** - basic version without organization features. For the multi-tenant organization version, check the `organization` branch.

## ✨ Features

- ⚡ **Ultra-fast** - Powered by Bun runtime
- 🔐 **Complete authentication** - Better Auth with email/password
- 📊 **Database** - PostgreSQL with Drizzle ORM
- 📝 **Automatic documentation** - Integrated OpenAPI/Swagger
- 🛡️ **Strong typing** - TypeScript throughout the application
- 🏗️ **Modular architecture** - Clean and scalable organization

## 🛠️ Tech Stack

| Technology                                  | Description                       |
| ------------------------------------------- | --------------------------------- |
| [Elysia](https://elysiajs.com/)             | Ultra-fast web framework for Bun |
| [Better Auth](https://www.better-auth.com/) | Modern authentication system     |
| [Drizzle ORM](https://orm.drizzle.team/)    | Type-safe ORM for TypeScript     |
| [Bun](https://bun.sh/)                      | Ultra-fast JavaScript runtime    |
| [PostgreSQL](https://postgresql.org/)       | Relational database              |
| [Zod](https://zod.dev/)                     | TypeScript schema validation     |

## 🚦 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed
- PostgreSQL running
- Node.js 18+ (for some dependencies)

### Installation

```bash
# Clone the repository
git clone https://github.com/nobruf/elysia-better-auth.git
cd app

# Install dependencies
bun install

# Configure environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Run migrations
bun run db:migrate

# Generate Better Auth tables
bun run db:auth:generate

# Start development server
bun run dev
```

## 📁 Project Structure

```
src/
├── database/           # Database configuration
│   ├── client.ts      # Drizzle client
│   ├── schema/        # Table schemas
│   └── migrations/    # SQL migrations
├── modules/           # Application modules
│   ├── auth/         # Better Auth configuration
│   └── users/        # Users controller
├── plugins/          # Global plugins
│   ├── auth.ts      # Authentication middleware
│   └── openapi.ts   # OpenAPI configuration
├── types/           # TypeScript types
└── index.ts        # Application entry point
```

## 🔌 API Endpoints

### Authentication

```
POST   /auth/sign-up     # Create account
POST   /auth/sign-in     # Sign in
POST   /auth/sign-out    # Sign out
GET    /auth/session     # Get current session
```

### Users

```
GET    /users/:id        # Get user by ID (requires auth)
```

### Documentation

```
GET    /openapi          # Swagger UI documentation
```

## 🔐 Authentication

The project uses **Better Auth** with the following configurations:

- **Email/Password**: Traditional authentication
- **Sessions**: 24h duration with 5min cache
- **Secure cookies**: HTTPOnly and Secure
- **Global middleware**: Automatically injects `user`

### Usage example:

```typescript
// Protected controller
.get("/protected", ({ user }) => {
  return { message: `Hello, ${user.name}!` };
}, { auth: true })
```

## 🗄️ Database

### Main Schema

**Users**

- `id` - UUID v7 (primary key)
- `name` - User name
- `email` - Unique email
- `emailVerified` - Verification status
- `image` - Avatar (optional)
- `createdAt` / `updatedAt` - Timestamps

### Useful Commands

```bash
# Generate new migration
bun run db:generate

# Apply migrations
bun run db:migrate

# Generate Better Auth tables
bun run db:auth:generate
```

## 🧪 Development

### Available Scripts

```bash
bun run dev              # Development server (watch mode)
bun run db:generate      # Generate Drizzle migrations
bun run db:migrate       # Apply migrations
bun run db:auth:generate # Generate Better Auth tables
```

### Response Structure

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "name": "John Doe"
}
```

### Error Handling

```json
{
  "message": "Unauthorized"
}
```

## 🔧 Configuration

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Customization

- **Sessions**: Modify `session.expiresIn` in `src/modules/auth/index.ts`
- **Validations**: Adjust Zod schemas in controllers
- **CORS**: Configure in `src/index.ts` if needed

## 🚀 Deploy

### Production

1. Configure `DATABASE_URL` for production
2. Run migrations: `bun run db:migrate`
3. Configure Redis (recommended for sessions)
4. Start: `bun src/index.ts`

### Docker (optional)

```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY . .
RUN bun install
EXPOSE 4000
CMD ["bun", "src/index.ts"]
```

## 📚 Additional Resources

- [Elysia Documentation](https://elysiajs.com/introduction.html)
- [Better Auth Docs](https://www.better-auth.com/docs)
- [Drizzle ORM Guide](https://orm.drizzle.team/docs/overview)
- [Bun Documentation](https://bun.sh/docs)

## 🤝 Contributing

1. Fork the project
2. Create a branch: `git checkout -b feature/new-feature`
3. Commit: `git commit -m 'Add new feature'`
4. Push: `git push origin feature/new-feature`
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for details.

---

⚡ **Built with Bun + Elysia** - Speed and simplicity first!