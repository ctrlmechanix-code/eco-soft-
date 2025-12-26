
export {};

declare global {
  interface GenAIStudio {
    hasSelectedApiKey(): Promise<boolean>;
    openSelectKey(): Promise<void>;
  }

  interface Window {
    aistudio?: GenAIStudio;
  }
}

// Declarations to fix missing types in the environment
declare module 'react-router-dom';
declare module 'framer-motion';
