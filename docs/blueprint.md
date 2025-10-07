# Project Blueprint

## Overview

A simple turn-based chatbot web application to interact with a cloud database and an LLM. The application will allow users to have conversations with an AI assistant across multiple chat rooms.

## Implemented Features

*   **Chat Interface:** A visually appealing and user-friendly chat interface.
*   **Message Display:** A component to display user and AI messages in a conversational format.
*   **User Input:** A text input field and a "Send" button for users to interact with the chatbot.
*   **Styling:** A modern design using Material-UI, including a color palette, custom components, and a responsive layout.
*   **Routing:** Basic routing implemented using `react-router-dom`.
*   **Firebase Integration:** Storing and retrieving chat messages from a Firestore database.
*   **Multi-Room Chat:** Support for multiple chat rooms with a dedicated chat list and named chat rooms.

## Current Plan: Flatten Firestore Data Structure

The current focus is to refactor the Firestore data model to use a flattened structure for better scalability.

1.  **`chats` Collection:** This collection will store only the metadata for each conversation, such as the title and timestamp.
2.  **`messages` Collection:** This collection will store all messages from all conversations. Each message will have a `conversation_id` field to link it to a specific chat in the `chats` collection.
3.  **Component Modification:**
    *   `NewChat.tsx` will be updated to create new chat documents in the `chats` collection with the new `Conversation` structure.
    *   `ChatPage.tsx` will be updated to fetch chat messages from the top-level `messages` collection, filtered by the `conversation_id`.
    *   `ChatList.tsx` will be updated to fetch chat metadata from the `chats` collection.
