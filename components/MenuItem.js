import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MenuEditor from "./MenuEditor";

import "../src/stylesheets/styles.scss";
import styled from "styled-components";

const MenuItem = ({
  parent,
  choice,
  updateMenu,
  updateTree,
  label,
  type,
  page,
  sys_id,
  href,
}) => {
  const [labelInput, setLabelInput] = useState(label);
  const [typeInput, setTypeInput] = useState(type);
  const [pageInput, setPageInput] = useState(page);
  const [sysIdInput, setSysIdInput] = useState(sys_id);
  const [hrefInput, setHrefInput] = useState(href);

  const routeJSON = {
    route: pageInput,
    fields: {
      sysId: sysIdInput,
    },
  };

  const externalJSON = {
    href: hrefInput,
  };

  const actionJSON = {
    value: {
      label: {
        translatable: true,
        message: labelInput,
      },
    },
  };

  if (typeInput !== "") {
    actionJSON.value.type = typeInput;
    actionJSON.value.value = typeInput === "route" ? routeJSON : externalJSON;
  }

  useEffect(() => {
    updateMenu(parent, actionJSON);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelInput, typeInput, pageInput, sysIdInput, hrefInput]);

  return (
    <Wrapper>
      <li className="list">
        <div className="treeview__level" data-choice={choice}>
          <span className="level-title">Label:</span>
          <input
            type="text"
            defaultValue={labelInput}
            onChange={({ target: { value } }) => setLabelInput(value)}
          />
          <label>
            Type:
            <select
              name="type"
              defaultValue={typeInput}
              onChange={({ target: { value } }) => setTypeInput(value)}
            >
              <option value="">-- None -- </option>
              <option value="route">Internal</option>
              <option value="external">External</option>
            </select>
          </label>
          {typeInput === "route" && (
            <>
              <label>
                Page:
                <input
                  type="text"
                  defaultValue={pageInput}
                  onChange={({ target: { value } }) => setPageInput(value)}
                />
              </label>
              <label>
                sys_id:
                <input
                  type="text"
                  defaultValue={sysIdInput}
                  onChange={({ target: { value } }) => setSysIdInput(value)}
                />
              </label>
            </>
          )}
          {typeInput === "external" && (
            <label>
              HREF:
              <input
                type="url"
                pattern="https://.*"
                defaultValue={hrefInput}
                onChange={({ target: { value } }) => setHrefInput(value)}
              />
            </label>
          )}
        </div>
        <MenuEditor parent={parent} id={uuidv4()} updateTree={updateTree} />
      </li>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  div[data-choice="action"] {
    color: orange;
  }
  div[data-choice="menu"] {
    color: green;
  }
`;

export default MenuItem;
