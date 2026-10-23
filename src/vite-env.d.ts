/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_OPENAI_MODEL: string
  readonly VITE_ANTHROPIC_API_KEY: string
  readonly VITE_ANTHROPIC_MODEL: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_ENABLE_REAL_AI: string
  readonly VITE_ENABLE_ANALYTICS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
