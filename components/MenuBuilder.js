import MenuItem from './MenuItem';
import MenuEditor from './MenuEditor';
import JSONGenerator from './JSONGenerator';
import { TreeNode, getRoot } from '../helpers/tree';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MenuBuilder = () => {
    const [menu, setMenu] = useState({});
    const [menuTree, setMenuTree] = useState([]);
    const [ids, setIds] = useState([]);

    const updateMenu = (id, input) => {
        let newMenu = { ...menu };
        newMenu[id] = input;

        setMenu(newMenu);
    };

    const updateTree = (choice, id, parent) => {
        setIds([...ids, id]);

        if (!parent) {
            const newTree = new TreeNode(id, [], null, choice);
            setMenuTree([...menuTree, newTree]);
        } else {
            const newState = [...JSON.parse(JSON.stringify(menuTree))];

            const path = getRoot(parent, newState);
            console.log(path);

            let node = newState;
            for (const key of path) {
                node = node[key];
            }

            node.children.push(new TreeNode(id, [], parent, choice));

            setMenuTree(newState);
        }
    };

    return (
        <div>
            <MenuEditor updateTree={updateTree} id={uuidv4()} />
            <pre>{JSON.stringify(menuTree)}</pre>
            <ul>
                {ids.map((node) => {
                    return (
                        <MenuItem
                            key={node}
                            parent={node}
                            updateMenu={updateMenu}
                            updateTree={updateTree}
                        />
                    );
                })}
            </ul>
            <JSONGenerator menu={menu} trees={menuTree} />
        </div>
    );
};

export default MenuBuilder;
