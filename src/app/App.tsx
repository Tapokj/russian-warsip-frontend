import { RouterProvider, Route } from "atomic-router-react";

// pages

import { CrimesPage } from "@pages/crimes";
import { AboutPage } from "@pages/about";

import { router } from "./routing";
import { Header } from "@widgets/Header";

export function App() {
  return (
    <RouterProvider router={router}>
      <Header />
      <Route route={CrimesPage.route} view={CrimesPage.page} />
      <Route route={AboutPage.route} view={AboutPage.page} />
    </RouterProvider>
  );
}
