import styled from "styled-components";
import "../src/stylesheets/styles.scss";

const MenuEditor = ({ parent, updateTree, id }) => {
  const handleAdd = (choice) => {
    updateTree(choice, id, parent);
  };

  const handleDelete = () => {
    updateTree(null, id, parent, true);
  };

  const choseAction = () => {
    handleAdd("action");
  };
  const choseMenu = () => {
    handleAdd("menu");
  };

  return (
    <Wrapper className="treeview__level-btns">
      <div className="btn btn-default btn-sm level-sub" onClick={choseAction}>
        <span>Add Child Action</span>
      </div>
      <div className="btn btn-default btn-sm level-same" onClick={choseMenu}>
        <span>Add Child Menu</span>
      </div>
      <div className="btn btn-default btn-sm level-remove">
        <span className="fa fa-trash text-danger"></span>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  //color: red;
`;

export default MenuEditor;
