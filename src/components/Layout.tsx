import { ReactNode } from 'react';
import { cn, responsiveClasses } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function Layout({ 
  children, 
  className, 
  centered = false, 
  maxWidth = 'md' 
}: LayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn(
      'min-h-screen bg-background',
      responsiveClasses.padding,
      centered && 'flex items-center justify-center',
      className
    )}>
      <div className={cn(
        'w-full',
        maxWidthClasses[maxWidth],
        centered && 'mx-auto'
      )}>
        {children}
      </div>
    </div>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className, padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4 sm:p-6',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  };

  return (
    <div className={cn(
      'bg-card border border-border rounded-lg shadow-sm',
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = { default: 1, md: 2, lg: 3 }, 
  gap = 'md',
  className 
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
  };

  const gridCols = cn(
    cols.default && `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  );

  return (
    <div className={cn(
      'grid',
      gridCols,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}