"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ChatPage({ params }: { params: { projectId: string } }) {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.accessToken
            ? { Authorization: `Bearer ${session.accessToken}` }
            : {}),
        },
        body: JSON.stringify({ projectId: params.projectId, message: input }),
      }
    );
    const data = await res.json();
    setMessages((msgs) => [
      ...msgs,
      { from: "ai", text: data.reply || "No reply" },
    ]);
    setInput("");
  };

  return (
    <div className="container max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Project Chat</h1>
      <div className="border rounded p-4 mb-4 h-64 overflow-y-auto flex flex-col gap-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === "user" ? "text-right" : "text-left"}>
            <span
              className={
                msg.from === "user"
                  ? "inline-block bg-blue-200 px-2 py-1 rounded"
                  : "inline-block bg-gray-200 px-2 py-1 rounded"
              }
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border px-2 py-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded font-semibold">
          Send
        </button>
      </form>
    </div>
  );
}