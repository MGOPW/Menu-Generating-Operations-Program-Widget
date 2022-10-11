const traverseTree = (tree, menu) => {
    if (tree.children.length === 0) return;

    for (let child of tree.children) {
        traverseTree(child, menu);

        if (child.parent) {
            let parentJSON = menu[child.parent];
            if (!parentJSON.children) parentJSON.children = {};
            if (!parentJSON.children.items) parentJSON.children.items = [];

            if (child.choice === 'action') {
                parentJSON.children.action = menu[child.id]?.value;
            } else {
                parentJSON.children.items.push({ ...menu[child.id] });
            }
        }
    }
};

const JSONGenerator = ({ menu, trees }) => {
    menu = JSON.parse(JSON.stringify(menu));
    trees = JSON.parse(JSON.stringify(trees));

    for (let tree of trees) {
        traverseTree(tree, menu);
    }

    let outputJSON = trees.map((tree) => {
        return menu[tree.id];
    });

    if (outputJSON.length > 1) {
        outputJSON = [outputJSON.join(',')];
    }

    return (
        <pre>
            <code>{JSON.stringify(outputJSON)}</code>
        </pre>
    );
};

export default JSONGenerator;
