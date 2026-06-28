'use client';

import { useReveal } from '@/src/hooks/use-reveal';

type Direction = 'up' | 'left' | 'right' | 'fade';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  threshold?: number;
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold,
}: RevealProps) {
  const ref = useReveal(threshold);

  return (
    <div
      ref={ref}
      data-reveal={direction}
      className={className}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
