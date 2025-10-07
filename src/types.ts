export interface Conversation {
    _id: string;
    title: string;
    created_at: any; // Using `any` for Firestore server timestamp
    user_id: string;
}

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