import { GoogleGenerativeAI } from "@google/generative-ai"
import { useState } from "react";


const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const useChat = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [modelType, setModelType] = useState("gemini-1.5-flash");
  const [generationConfig, setGenerationConfig] = useState({
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  });

  const [messages, setMessages] = useState([]);
  let chatSession;

  const model = genAI.getGenerativeModel({
    model: modelType,
    systemInstruction: systemPrompt,
  });

  async function startChat() {
    chatSession = model.startChat({ generationConfig });
  }
  const sendMessage = async (userMessage) => {
    if (!chatSession) {
      await startChat();
    }
    setMessages((messages) => [...messages, { role: "user", content: userMessage }]);

    const result = await chatSession.sendMessage(userMessage);
    const message = result.response.text();
    setMessages((messages) => [...messages, { role: "assistant", content: message }]);
  }

  return {
    generationConfig,
    setGenerationConfig,
    setModelType,
    systemPrompt,
    setSystemPrompt,
    messages,
    sendMessage
  };
}

export default useChat