export {};

declare global {
  interface AIStudioClient {
    hasSelectedApiKey(): Promise<boolean>;
    openSelectKey(): Promise<void>;
  }

  interface Window {
    aistudio?: AIStudioClient;
  }
}

// Declarations to fix missing types in the environment
declare module 'react-router-dom';
declare module 'framer-motion';