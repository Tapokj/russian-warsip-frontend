import { createRoute } from "atomic-router";

const route = createRoute();

function NotFound() {
  return (
    <div>
      <h1>Not found</h1>
    </div>
  );
}

export const NotFoundPage = {
  route,
  page: NotFound,
};
