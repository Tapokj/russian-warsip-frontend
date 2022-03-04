import { RouteInstance } from "atomic-router";
import { TODO_ANY } from "..";

export type AtomicRoute = {
  path: string;
  route: RouteInstance<Record<string, TODO_ANY>>;
};

export type AtomicRoutes = AtomicRoute[];
