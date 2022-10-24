import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getRoot, TreeNode } from "../helpers/tree";
import JSONGenerator from "./JSONGenerator";
import MenuEditor from "./MenuEditor";
import AlphaMenuEditor from "./AlphaMenuEditor";
import MenuUI from "./MenuUI";

const MenuBuilder = () => {
  const [menu, setMenu] = useState({});
  const [menuTree, setMenuTree] = useState([]);

  const updateMenu = (id, input) => {
    let newMenu = { ...menu };
    newMenu[id] = input;

    setMenu(newMenu);
  };

  const updateTree = (choice, id, parent) => {
    if (!parent) {
      const newTree = new TreeNode(id, [], null, choice);
      setMenuTree([...menuTree, newTree]);
    } else {
      const newState = [...JSON.parse(JSON.stringify(menuTree))];

      const path = getRoot(parent, newState);

      let node = newState;
      for (const key of path) {
        node = node[key];
      }

      node.children.push(new TreeNode(id, [], parent, choice));

      setMenuTree(newState);
    }
  };

  return (
    <>
      <AlphaMenuEditor updateTree={updateTree} id={uuidv4()} />

      <div className="treeview js-treeview">
        <ul>
          <MenuUI
            menuTree={menuTree}
            updateMenu={updateMenu}
            updateTree={updateTree}
          />
        </ul>
      </div>

      <div>
        <JSONGenerator menu={menu} trees={menuTree} />
      </div>
    </>
  );
};

export default MenuBuilder;
