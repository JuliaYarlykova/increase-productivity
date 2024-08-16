import { type RouteProps } from 'react-router-dom';

import { AuthPage } from "@/pages/AuthPage";
import { CatalogPage } from '@/pages/CatalogPage';
import { EmployeePage } from '@/pages/EmployeePage';
import { EventsPage } from '@/pages/EventsPage';
import { InstructionsPage } from '@/pages/InstructionsPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { TestDiagramsPage } from '@/pages/TestDiagrams'; // TODO: Потом удалить
import { ValueConstructorPage } from '@/pages/ValueConstructorPage';
import { ValuesPage } from '@/pages/ValuesPage';
import {
  AppRoutes,
  getRouteValues,
  getRouteValuesConstructor,
  getRouteEmployee,
  getRouteEvents,
  getRouteCatalog,
  getRouteInstructions,
  getTestDiagrams, // TODO: Потом удалить
  getRouteMain,
  getRouteProfile, getRouteAuth,
} from '@/shared/const/router';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <ProfilePage />,
  },
  [AppRoutes.VALUES]: {
    path: getRouteValues(),
    element: <ValuesPage />,
  },
  [AppRoutes.VALUES_CONSTRUCTOR]: {
    path: getRouteValuesConstructor(),
    element: <ValueConstructorPage />,
  },
  [AppRoutes.EMPLOYEE]: {
    path: getRouteEmployee(':id'),
    element: <EmployeePage />,
  },
  [AppRoutes.EVENTS]: {
    path: getRouteEvents(),
    element: <EventsPage />,
  },
  [AppRoutes.CATALOG]: {
    path: getRouteCatalog(),
    element: <CatalogPage />,
  },
  [AppRoutes.INSTRUCTIONS]: {
    path: getRouteInstructions(),
    element: <InstructionsPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
  [AppRoutes.TEST_DIAGRAMS]: {
    // TODO: Потом удалить
    path: getTestDiagrams(),
    element: <TestDiagramsPage />,
  },
  [AppRoutes.AUTH]: {
    path: getRouteAuth(),
    element: <AuthPage />,
  },
};
