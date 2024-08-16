'use client';
import { memo, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

import { classNames } from '../../lib/classNames/classNames';

import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'white' | 'black' | 'button';
export type AppLinkSize = 's' | 'm' | 'l';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  size?: AppLinkSize;
  children?: ReactNode;
  activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    activeClassName = '',
    children,
    variant = 'primary',
    size = 'l',
    ...otherProps
  } = props;

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        classNames(cls.AppLink, { [activeClassName]: isActive }, [
          className,
          cls[variant],
          cls[size],
        ])
      }
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
