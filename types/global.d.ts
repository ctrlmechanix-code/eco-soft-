export {};

declare global {
  interface AIStudio {
    hasSelectedApiKey(): Promise<boolean>;
    openSelectKey(): Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

// Declarations to fix missing types in the environment
declare module 'react-router-dom';
declare module 'framer-motion';