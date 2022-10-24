import styled from "styled-components";
import "../src/stylesheets/styles.scss";

const MenuEditor = ({ parent, showDelete, updateTree, id }) => {
  const handleAdd = (choice) => {
    updateTree(choice, id, parent);
  };

  const choseAction = () => {
    handleAdd("action");
  };
  const choseMenu = () => {
    handleAdd("menu");
  };

  return (
    <Wrapper>
      <label>
        Menu Creator:
        <button onClick={choseAction}>Action</button>
        <button onClick={choseMenu}>Menu</button>
      </label>
      {showDelete && <button>Delete</button>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  //color: red;
`;

export default MenuEditor;
