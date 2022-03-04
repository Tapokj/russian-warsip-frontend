import { createRoute } from "atomic-router";

const indexRoute = createRoute();
const aboutRoute = createRoute();

export const ROUTES = {
  INDEX: indexRoute,
  ABOUT: aboutRoute,
};
