export {};

declare global {
  interface AIStudio {
    // Methods are defined in the environment types.
  }

  interface Window {
    aistudio?: AIStudio;
  }
}