export interface Message {
  _id: string;
  conversation_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  llm_model_id: string;
  tokens_used: number;
  embedding: number[];
  prompt_message_id: string;
}