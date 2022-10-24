import "../src/stylesheets/styles.scss";
import { FaClipboardList } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import React from "react";

const traverseTree = (tree, menu) => {
  if (tree.children.length === 0) return;

  for (let child of tree.children) {
    traverseTree(child, menu);

    if (child.parent) {
      let parentJSON = menu[child.parent];
      if (!parentJSON.children) parentJSON.children = {};
      if (!parentJSON.children.items) parentJSON.children.items = [];

      if (child.choice === "action") {
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
    return JSON.stringify(menu[tree.id]);
  });

  if (outputJSON.length > 1) {
    outputJSON = outputJSON.join(",");
  }

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = "[" + outputJSON + "]";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);

  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };

  return (
    <div className="code">
      <div className="copyToClipboard">
        <FaClipboardList onClick={copyToClipboard} />
        <Snackbar
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom"
          }}
          open={open}
          autoHideDuration={5000}
          message="Copied to Clipboard"
          onClose={handleToClose}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleToClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
      <code>[{outputJSON}]</code>
    </div>
  );
};

export default JSONGenerator;
