import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";
import { randomUUIDv7 } from "bun";

export const sessions = pgTable("sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
