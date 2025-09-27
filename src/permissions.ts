import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
  ownerAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  project: ["create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

const member = ac.newRole({
  project: ["create"],
});
const admin = ac.newRole({
  project: ["create", "update"],
  ...adminAc.statements,
});
const owner = ac.newRole({
  project: ["create", "update", "delete"],
  ...ownerAc.statements,
});

export { member, admin, owner };
