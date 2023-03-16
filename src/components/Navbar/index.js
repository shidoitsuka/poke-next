import { useRouter } from "next/router";
import styles from "../../styles/navbar.module.scss";

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/profile",
    name: "Profile",
  },
  {
    path: "/poke-list",
    name: "Pokemon List",
  },
];

const Navbar = (p) => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className={styles["nav-container"]}>
        <div className={styles["nav-links"]}>
          {routes.map((route) => (
            <a
              key={route.path}
              className={`${
                route.path === router.pathname ? styles.active : ""
              }`}
              href={route.path}
            >
              {route.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
