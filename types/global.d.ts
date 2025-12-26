export {};

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey(): Promise<boolean>;
      openSelectKey(): Promise<void>;
    };
  }
}

// Declarations to fix missing types in the environment
declare module 'react-router-dom';
declare module 'framer-motion';
