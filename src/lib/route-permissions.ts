import { pathToRegexp } from "path-to-regexp";

interface RoutesPrivate {
  path: string;
}

const routes: RoutesPrivate[] = [
  {
    path: "/vuelos",
  },
  {
    path: "/mis-reservas",
  },
];

export function isAllowed(path: string): boolean {
  const route = routes.find((route) => {
    const regex = pathToRegexp(route.path);
    return regex.regexp.test(path);
  });

  return !!route;
}
