import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getRoot, deleteNode, TreeNode } from '../helpers/tree';
import JSONGenerator from './JSONGenerator';
import MenuEditor from './MenuEditor';
import AlphaMenuEditor from './AlphaMenuEditor';
import MenuUI from './MenuUI';

const MenuBuilder = () => {
    const [menu, setMenu] = useState({});
    const [menuTree, setMenuTree] = useState([]);

    const updateMenu = (id, input, isDelete = false) => {
        let newMenu = { ...menu };
        if (isDelete) {
            deleteNode(id, newMenu, menuTree);
        } else {
            newMenu[id] = input;
        }
        setMenu(newMenu);
    };

    const updateTree = (choice, id, parent, isDelete = false) => {
        if (isDelete) {
            updateMenu(parent, null, true);

            let newState = [...JSON.parse(JSON.stringify(menuTree))];

            /**
             *  Get object of the node to be deleted
             */
            const path = getRoot(parent, newState);

            let node = newState;
            for (const key of path) {
                node = node[key];
            }

            /**
             * If node to be deleted is a child node, need to get the object of its parent
             * and remove this node from the parent's children array
             */
            if (node.parent) {
                const parentPath = getRoot(node.parent, newState);

                node = newState;
                for (const key of parentPath) {
                    node = node[key];
                }

                node.children = node.children.filter(
                    (child) => child.id !== parent
                );
            } else {
                /**
                 * Deleting a top-level node
                 */
                newState = newState.filter((tree) => tree.id !== parent);
            }

            setMenuTree(newState);
        } else {
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
        }
    };

    return (
        <>
            <AlphaMenuEditor
                updateTree={updateTree}
                setMenuTree={setMenuTree}
                setMenu={setMenu}
                id={uuidv4()}
            />
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
