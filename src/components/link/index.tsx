import type { ComponentProps, MouseEvent } from 'react';
import { Link as RRLink, useLocation } from 'react-router';

type RRLinkProps = ComponentProps<typeof RRLink>;

interface CustomLinkProps extends Omit<RRLinkProps, 'to'> {
  href?: RRLinkProps['to'];
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  scroll?: boolean;
}

function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export default function Link({
  href,
  children,
  onClick,
  scroll = false,
  className,
  ...props
}: CustomLinkProps) {
  const location = useLocation();
  const isActive = href ? location.pathname === href : false;

  if (!href && onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  if (!href) {
    return <div className={className}>{children}</div>;
  }

  if (typeof href === 'string' && isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-external=""
        onClick={onClick}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <RRLink
      to={href}
      preventScrollReset={!scroll}
      data-active={isActive || undefined}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </RRLink>
  );
}
