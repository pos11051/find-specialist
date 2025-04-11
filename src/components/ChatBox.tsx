import React, { useState } from "react";
import { chatWithGPT } from "../services/chat";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, `🧑: ${input}`]);
    setLoading(true);
    const reply = await chatWithGPT(input);
    setMessages((prev) => [...prev, `🤖: ${reply}`]);
    setInput("");
    setLoading(false);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 600, margin: "auto" }}>
      <h2>증상 기반 의사 추천 챗봇</h2>
      <div style={{ whiteSpace: "pre-line", marginBottom: "1rem" }}>
        {messages.map((m, idx) => (
          <div key={idx}>{m}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="증상을 입력해 주세요"
        style={{ width: "80%", padding: "0.5rem" }}
      />
      <button onClick={handleSend} disabled={loading} style={{ marginLeft: "1rem" }}>
        {loading ? "답변 중..." : "보내기"}
      </button>
    </div>
  );
} 