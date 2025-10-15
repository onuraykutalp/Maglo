/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // başka VITE_ ile başlayan değişkenleri buraya ekleyebilirsin
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}