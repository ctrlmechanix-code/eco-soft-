
export {};

declare global {
  interface Window {
    // aistudio property is already declared in environment types
  }
}

// Declarations to fix missing types in the environment
declare module 'react-router-dom';
declare module 'framer-motion';
