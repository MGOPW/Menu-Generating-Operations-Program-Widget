export class TreeNode {
    constructor(id, children, parent, choice) {
        this.id = id;
        this.children = children;
        this.parent = parent;
        this.choice = choice;
    }
}

export const getRoot = (parent, menuTree) => {
    for (let i = 0; i < menuTree.length; i++) {
        let path = [];
        let found = traverse(menuTree[i], parent, path, i);

        if (found) return path;
    }
};

const traverse = (node, parent, path, i) => {
    if (node.id === parent) {
        path.push(i);
        return true;
    }

    if (node.children) {
        path.push(i);
        path.push('children');

        for (let i = 0; i < node.children.length; i++) {
            let found = traverse(node.children[i], parent, path, i);

            if (found) return true;
            else {
                path.pop();
                path.pop();
            }
        }
    }

    return false;
};

export const deleteNode = (id, menu, menuTree) => {
    const path = getRoot(id, menuTree);

    let node = menuTree;
    for (const key of path) {
        node = node[key];
    }

    for (let i = 0; i < node.children.length; i++) {
        deleteNode(node.children[i].id, menu, menuTree);
    }

    delete menu[id];
};
