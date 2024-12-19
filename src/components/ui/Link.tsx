import NextLink, {LinkProps as NextLinkProps} from 'next/link';

import {cn} from '@/core/utils/cn';

export type LinkProps = {
  className?: string;
  children: React.ReactNode;
  target?: string;
} & NextLinkProps;

export const Link = ({className, children, href, ...props}: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={cn(
        'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200',
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
};
