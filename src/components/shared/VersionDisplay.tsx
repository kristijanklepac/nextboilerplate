import { getVersionString, isPrerelease } from '@/utils/version';

interface VersionDisplayProps {
  className?: string;
}

export const VersionDisplay = ({ className = '' }: VersionDisplayProps) => {
  const version = getVersionString();
  const isPreRel = isPrerelease();

  return (
    <div 
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
        isPreRel 
          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      } ${className}`}
      title={isPreRel ? 'Pre-release version' : 'Stable version'}
    >
      {version}
    </div>
  );
}; 