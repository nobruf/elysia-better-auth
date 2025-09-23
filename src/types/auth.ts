import type { User } from "better-auth/types";

export interface AuthContext {
  user?: User | null;
  session?: any;
}
