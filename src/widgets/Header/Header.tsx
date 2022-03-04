import { ROUTES } from "@shared/lib";
import { Link } from "atomic-router-react";

import styles from "./styles.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div onClick={ROUTES.INDEX.open}>Logo</div>
      <div>
        <Link to={ROUTES.ABOUT}>About</Link>
      </div>
    </header>
  );
}
