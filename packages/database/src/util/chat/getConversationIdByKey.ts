import { getDB } from "@coyle/database";
import { conversations as convos } from "@coyle/database/schema";
import { AdminDb } from "@coyle/database/src/db";
import { eq } from "drizzle-orm";
export const getConversationIdByKey = async (key) => {
  const db = getDB() as AdminDb;
  const conversation = await db
    .select()
    .from(convos)
    .where(eq(convos.conversationKey, key));
  const conversationId = conversation[0].id;
  return conversationId;
};
