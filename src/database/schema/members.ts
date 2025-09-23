
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";
import { randomUUIDv7 } from "bun";
import { users } from "./users";


export const members = pgTable("members", {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").default("member").notNull(),
    createdAt: timestamp("created_at").notNull(),
  });