import { getDB } from "@coyle/chat-db";
import { messages } from "@coyle/chat-db/schema";
import { eq } from "drizzle-orm";

export const addReactionToMessage = async ({ reactions, messageId }) => {
  const db = getDB();
  await db
    .update(messages)

    .set({ reactions: reactions } as unknown)
    .where(eq(messages.id, messageId));
};
