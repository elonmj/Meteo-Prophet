interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
  }
  
  export function Card({ children, className, ...props }: CardProps) {
    return (
      <div
        className={`rounded-lg border bg-card p-4 shadow-sm ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
  