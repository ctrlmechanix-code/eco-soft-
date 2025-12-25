export {};

declare global {
  interface AIStudio {
    // Methods are defined in the environment types.
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

// Declarations to fix missing types in the environment
declare module 'react-router-dom';
declare module 'framer-motion';
