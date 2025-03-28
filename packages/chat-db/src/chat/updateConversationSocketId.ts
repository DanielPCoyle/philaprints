import { getDB } from "../..";
import { conversations } from "../../schema";
import type { Conversation } from "../../schema";
import { eq } from "drizzle-orm";

export async function updateConversationSocketId(
  id: number,
  socketId: string,
): Promise<void> {
  try {
    const db = getDB();
    await db
      .update(conversations)
      .set({ socketId } as Conversation)
      .where(eq(conversations.id, id));
  } catch (error) {
    console.error("Error adding conversation", error);
  }
}

export default updateConversationSocketId;
