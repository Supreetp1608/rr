/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZURE_OPENAI_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
