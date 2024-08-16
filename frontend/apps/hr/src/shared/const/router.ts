export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  VALUES = 'values',
  VALUES_CONSTRUCTOR = 'values_constructor',
  EMPLOYEE = 'employee',
  EVENTS = 'events',
  CATALOG = 'catalog',
  TEST_DIAGRAMS = 'test_diagrams', // TODO: Потом удалить
  INSTRUCTIONS = 'instructions',
  AUTH = 'auth',
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/hr/';
export const getRouteValues = () => `/hr/values`;
export const getRouteValuesConstructor = () => '/hr/values/constructor';
export const getRouteEmployees = () => '/hr/employees';
export const getRouteEmployee = (id: string) => `/hr/employees/${id}`;
export const getRouteEvents = () => '/hr/events';
export const getRouteCatalog = () => '/hr/catalog';
export const getRouteInstructions = () => '/hr/instructions';
export const getRouteProfile = (id: string) => `/hr/profile/${id}`;
export const getRouteAuth = () => `/hr/auth`;
export const getTestDiagrams = () => '/hr/test_diagrams'; // TODO: Потом удалить
