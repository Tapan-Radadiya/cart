# Backend Service

## Gemini Migration

This backend now uses **Google Gemini** via its OpenAI-compatible endpoint.  
To use the chat features, you will need a valid Google Gemini API key.

### Environment Setup

Copy `.env.example` to `.env` and provide your Gemini API key:

```
GEMINI_API_KEY=your-google-gemini-api-key-here
```

The backend will look for `GEMINI_API_KEY` first and fall back to `OPENAI_API_KEY` for backward compatibility, but using Gemini is now the default and recommended path.

### Chat Service

The ChatService uses the `openai` npm SDK (v5.x) and points to Gemini's OpenAI-compatible endpoint at `https://generativelanguage.googleapis.com/v1beta/openai` with the model `gemini-1.5-pro`.

No additional configuration changes are needed besides setting your API key.