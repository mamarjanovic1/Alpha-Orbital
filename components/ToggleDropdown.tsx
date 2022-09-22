import { NextPage } from "next";
import { useState } from "react";
import {
  BsFillCaretDownFill,
  BsFillCaretRightFill,
  BsFillTrashFill,
} from "react-icons/bs";
import styles from "../styles/ToggleBtn.module.css";
import { Category } from "../utils/types";

export const ToggleDropdown: NextPage<{
  categories: Category[];
  deleteAll(id: string): any;
}> = ({ categories, deleteAll }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className={styles.toggle_button} onClick={() => setToggle(!toggle)}>
        {categories?.length !== 1 && toggle ? (
          <BsFillCaretRightFill />
        ) : (
          <BsFillCaretDownFill />
        )}
      </div>
      {categories?.length !== 1 && toggle && (
        <div className={styles.dropdown}>
          <div className={styles.dropdown_content}>
            <ul>
              {categories.map(
                (menu, idx) =>
                  menu.id !== "0" && (
                    <li key={idx}>
                      {menu.name}
                      <BsFillTrashFill
                        onClick={() => deleteAll(menu.id)}
                        style={{ float: "right", cursor: "pointer" }}
                      />
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
