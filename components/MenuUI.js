import MenuItem from "./MenuItem";

const MenuUI = ({ menuTree, updateMenu, updateTree }) => {
  return (
    <>
      {menuTree.map((tree) => {
        const { id, children, choice } = tree;
        return (
          <ul key={`${id}-ul`}>
            <MenuItem
              key={id}
              parent={id}
              choice={choice}
              updateMenu={updateMenu}
              updateTree={updateTree}
            />
            {children.length > 0 && (
              <MenuUI
                menuTree={children}
                updateMenu={updateMenu}
                updateTree={updateTree}
              />
            )}
          </ul>
        );
      })}
    </>
  );
};

export default MenuUI;
