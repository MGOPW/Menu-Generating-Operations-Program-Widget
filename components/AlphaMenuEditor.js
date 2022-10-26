import styled from 'styled-components';
import '../src/stylesheets/styles.scss';

const MenuEditor = ({ parent, updateTree, setMenuTree, setMenu, id }) => {
    const handleAdd = (choice) => {
        updateTree(choice, id, parent);
    };

    const handleDelete = () => {
        setMenuTree([]);
        setMenu({});
    };

    const choseAction = () => {
        handleAdd('action');
    };
    const choseMenu = () => {
        handleAdd('menu');
    };

    return (
        <Wrapper>
            <label>
                Menu Creator:
                <button onClick={choseAction}>Action</button>
                <button onClick={choseMenu}>Menu</button>
            </label>
            <button onClick={handleDelete}>Delete All</button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    //color: red;
`;

export default MenuEditor;
