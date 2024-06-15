import { memo } from 'react';

import { SidebarItemType } from '../../model/types/sidebar';

import { AppLink } from "@/shared/ui/AppLink";

import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
}

export const SidebarItem = memo(({ item }: SidebarItemProps) => (
    <AppLink
      variant="black"
      to={item.path}
      activeClassName={cls.active}
    >
      <span className={cls.link}>{item.text}</span>
    </AppLink>
  ));
