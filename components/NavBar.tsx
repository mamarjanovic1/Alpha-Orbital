import { NextPage } from "next";
import styles from "../styles/NavBar.module.css";
import { Category } from "../utils/types";
import { ToggleDropdown } from "./ToggleDropdown";

const Navbar: NextPage<{
  setSelectedCategoryId: any;
  categories: Category[];
  activeIdx: string;
  deleteAll(id: string): any;
}> = ({ setSelectedCategoryId, categories, activeIdx, deleteAll }) => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.nav__menu_list}>
          {categories.map((menu, idx) => (
            <div key={idx}>
              <a
                style={{ fontWeight: activeIdx === menu.id ? "bold" : "" }}
                onClick={() => setSelectedCategoryId(menu.id)}
                className={styles.nav__link}
              >
                {menu.name}
              </a>
            </div>
          ))}
          <ToggleDropdown deleteAll={deleteAll} categories={categories} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
