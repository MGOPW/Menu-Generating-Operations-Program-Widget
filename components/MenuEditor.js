import { useState } from 'react';

const MenuEditor = ({ parent, showDelete, updateTree, id }) => {
    const [choice, setChoice] = useState('action');

    const changeChoice = ({ target: { value } }) => {
        setChoice(value);
    };

    const handleAdd = () => {
        updateTree(choice, id, parent);
    };

    return (
        <>
            <label>
                Build Menu:
                <select value={choice} onChange={changeChoice}>
                    <option value="action">Action</option>
                    <option value="menu">Menu</option>
                </select>
            </label>
            <button onClick={handleAdd}>Add Child</button>
            {showDelete && <button>Delete</button>}
        </>
    );
};

export default MenuEditor;
