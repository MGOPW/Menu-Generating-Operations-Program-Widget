import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TreeNode } from "../helpers/tree";

const JSONImport = ({ setMenu, setMenuTree }) => {
  const [json, setJSON] = useState();

  const handleImport = () => {
    let inputJSON;
    if (!json) {
      inputJSON = [];
    } else {
      inputJSON = JSON.parse(json);
    }

    const menu = {};
    const menuTree = [];

    for (let tree of inputJSON) {
      traverseJSON(tree, menu, menuTree);
    }

    setMenu(menu);
    setMenuTree(menuTree);
  };

  const traverseJSON = (
    tree,
    menu,
    menuTree,
    parentID = null,
    parentNode = null,
    choice = "menu"
  ) => {
    const id = uuidv4();
    menu[id] = { value: tree.value };

    let {
      value: {
        label: { message },
      },
    } = tree;
    let {
      value: { type },
    } = tree;
    let route = tree.value.value?.route;
    let sysId = tree.value.value?.fields?.sysId;
    let href = tree.value.value?.href;

    const { children } = tree;
    const action = children?.action;

    let actionTree;

    let newTree = new TreeNode(
      id,
      [],
      parentID,
      choice,
      message,
      type,
      route,
      sysId,
      href
    );

    if (children) {
      for (const child of children.items) {
        traverseJSON(child, menu, menuTree, id, newTree);
      }

      // no recursion for actions so the parentNode is newTree
      if (action) {
        message = action.label?.message;
        type = action.type;
        route = action.value?.route;
        sysId = action.value?.fields?.sysId;

        const actionID = uuidv4();
        menu[actionID] = { value: action };

        actionTree = new TreeNode(
          actionID,
          [],
          id, // newTree's id
          "action",
          message,
          type,
          route,
          sysId,
          href
        );
      }
    }

    if (parentID) {
      parentNode.children.push(newTree);
      if (actionTree) newTree.children.push(actionTree);
    } else {
      menuTree.push(newTree);
    }
  };

  return (
    <>
      <textarea onChange={({ target: { value } }) => setJSON(value)}></textarea>
      <button onClick={handleImport}>Import</button>
    </>
  );
};

export default JSONImport;
