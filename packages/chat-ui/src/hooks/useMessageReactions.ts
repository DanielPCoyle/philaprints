import React from "react";
import { useState, useEffect } from "react";
import { ChatContext } from "../ChatContext";
import type { Message as MessageType } from "../../types";

export const useMessageReactions = (message: MessageType) => {
  const { socket, email, id } = React.useContext(ChatContext);
  const [reactions, setReactions] = useState<{ [key: string]: string[] }>(
    message.reactions || {},
  );

  useEffect(() => {
    socket.on("addReaction", (payload) => {
      if (payload.messageId === message.id) {
        setReactions(payload.reactions);
      }
    });

    return () => {
      socket.off("addReaction");
    };
  }, []);

  const addReaction = (emoji: { emoji: string }) => {
    setReactions((prevReactions) => {
      const newReactions = { ...prevReactions };

      if (!newReactions[email]) {
        newReactions[email] = [];
      }

      // Prevent duplicate reactions by checking if it already exists
      if (!newReactions[email].includes(emoji.emoji)) {
        newReactions[email].push(emoji.emoji);
      }

      socket.emit("addReaction", {
        id,
        messageId: message.id,
        reactions: newReactions,
      });

      return newReactions;
    });
  };

  const removeReactions = (emoji: { emoji: string }) => {
    const newReactions = { ...reactions };
    if (newReactions[email]) {
      newReactions[email] = newReactions[email].filter(
        (e) => e !== emoji.emoji,
      );
      if (newReactions[email].length === 0) {
        delete newReactions[email];
      }
      setReactions(newReactions);

      socket.emit("addReaction", {
        id,
        messageId: message.id,
        reactions: newReactions,
      });
    }
  };

  return { reactions, addReaction, removeReactions };
};
