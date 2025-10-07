### users collection

{
"_id": "user_101",
"email": "[user@example.com](mailto:user@example.com)",
"username": "LexiUser",
"project_memberships": ["proj_A", "proj_B"]  // References to Project IDs
}

### projects collection

{
"_id": "proj_A",
"name": "Q4 Strategy",
"owner_id": "user_101",                     // Reference to User ID
"created_at": "2025-01-01T00:00:00Z"
}

### conversations collection

{
"_id": "conv_X5Y6Z",
"project_id": "proj_A",                     // Reference to Project ID
"title": "Initial Product Brainstorm",
"updated_at": "2025-10-06T14:30:00Z",
"archive_status": "ACTIVE",
"ai_summary": "Finalized plan for database migration." // AI-generated metadata
}

## messages collection

{
"_id": "msg_00456",
"conversation_id": "conv_X5Y6Z",            // Reference to Conversation ID (Crucial for lookups)
"user_id": "user_101",                      // Reference to User ID
"role": "assistant",                        // ('user', 'assistant')
"content": "Here is the final recommendation...",
"timestamp": "2025-10-06T14:30:00Z",
"llm_model_id": "gemini-2.5-pro",           // Used for comparison/analysis
"tokens_used": 550,
"embedding": [0.123, -0.456, ...],         // Vector for Semantic Search
"prompt_message_id": "msg_00455"            // Links response back to the user's prompt
}