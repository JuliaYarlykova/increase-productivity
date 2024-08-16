import { SidebarItemType } from './sidebar';

import {
  getRouteCatalog,
  getRouteValues,
  getRouteEvents,
  getRouteMain,
} from '@/shared/const/router';

export const getSidebarItems = () => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      text: 'Главная',
    },
    {
      path: getRouteValues(),
      text: 'Ценности и метрики',
    },
    {
      path: getRouteEvents(),
      text: 'Мероприятия',
    },
    {
      path: getRouteCatalog(),
      text: 'Каталог',
    },
    // {
    //   path: getRouteInstructions(),
    //   text: 'Инструкция',
    // },
  ];

  return sidebarItemsList;
};
