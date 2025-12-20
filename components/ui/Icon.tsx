
import React from 'react';
import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;

interface IconProps extends LucideIcons.LucideProps {
  name: IconName;
  // FIX: Explicitly add className to fix TypeScript error where it's not inferred.
  className?: string;
}

// FIX: Removed React.FC for consistency and better type inference.
const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = LucideIcons[name] as React.ElementType;
  if (!LucideIcon) {
    return <LucideIcons.HelpCircle {...props} />; // Fallback icon
  }
  return <LucideIcon {...props} />;
};

export default Icon;
