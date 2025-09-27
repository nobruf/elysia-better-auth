import { db } from "@/database/client";
import { members } from "@/database/schema/members";
import { organizations } from "@/database/schema/organizations";
import { eq } from "drizzle-orm";

export const getActiveOrganization = async (userId: string) => {
  const memberUser = await db.query.members.findFirst({
    where: eq(members.userId, userId),
  });

  if (!memberUser) return null;

  const activeOrganization = await db.query.organizations.findFirst({
    where: eq(organizations.id, memberUser?.organizationId),
  });

  return activeOrganization;
};
