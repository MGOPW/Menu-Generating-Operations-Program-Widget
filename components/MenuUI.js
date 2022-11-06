import MenuItem from "./MenuItem";

const MenuUI = ({ menuTree, updateMenu, updateTree }) => {
  return (
    <>
      {menuTree.map((tree) => {
        const { id, children, choice, label, type, page, sys_id, href } = tree;
        return (
          <ul key={`${id}-ul`}>
            <MenuItem
              key={id}
              parent={id}
              choice={choice}
              label={label}
              type={type}
              page={page}
              sys_id={sys_id}
              href={href}
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
