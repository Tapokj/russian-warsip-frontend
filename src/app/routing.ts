import { sample } from "effector";
import { createBrowserHistory } from "history";
import { createHistoryRouter } from "atomic-router";

// pages

import { CrimesPage } from "@pages/crimes";
import { NotFoundPage } from "@pages/not-found";
import { AboutPage } from "@pages/about";
import { AtomicRoutes } from "@shared/lib";

const routes: AtomicRoutes = [
  {
    path: CrimesPage.name,
    route: CrimesPage.route,
  },
  {
    path: AboutPage.path,
    route: AboutPage.route,
  },
];

export const history = createBrowserHistory();

export const router = createHistoryRouter({
  routes,
});

router.setHistory(history);

sample({
  clock: router.routeNotFound,
  fn: () => ({}),
  target: NotFoundPage.route.open,
});
