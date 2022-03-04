import { ROUTES } from "@shared/lib";

function About() {
  return <div>Hello world name</div>;
}

export const AboutPage = {
  route: ROUTES.ABOUT,
  page: About,
  path: "/about",
};
