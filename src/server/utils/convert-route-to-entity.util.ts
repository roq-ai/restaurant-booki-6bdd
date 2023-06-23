const mapping: Record<string, string> = {
  employees: 'employee',
  'menu-items': 'menu_item',
  reservations: 'reservation',
  restaurants: 'restaurant',
  'table-layouts': 'table_layout',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
