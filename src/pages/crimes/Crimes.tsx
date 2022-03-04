import { ROUTES } from "@shared/lib";

function Crimes() {
  return <div>Main page here</div>;
}

export const CrimesPage = {
  route: ROUTES.INDEX,
  page: Crimes,
  name: "/",
};
