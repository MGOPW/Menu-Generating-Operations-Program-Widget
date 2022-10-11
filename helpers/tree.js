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
    if (!node) return false;

    if (node.id === parent) {
        path.push(i);
        return true;
    }

    path.push(i);
    path.push('children');
    for (let i = 0; i < node.children.length; i++) {
        let found = traverse(node.children[i], parent, path, i);

        if (found) return true;
    }

    return false;
};
