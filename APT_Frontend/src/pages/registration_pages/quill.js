/* eslint-disable */
import React, { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's snow theme CSS
import PropTypes from "prop-types";
import io from "socket.io-client";
import CRDTStructure from "./CRDTStructure";
const crdt = new CRDTStructure();
let forced = false;
function insertQuillNode(editor, nnode = null) {
  const nodes = crdt.getNodes();
  let index = 0;
  forced = true;
  let selection = editor.getSelection();
  editor.setText("");
  function insertQuillNode(editor, nnode = null) {
    const nodes = crdt.getNodes();
    let index = 0;
    forced = true;
    let selection = editor.getSelection();
    editor.setText("");
    for (let i = 1; i < nodes.length - 1; i++) {
      if (nodes[i].tombstone) {
        continue;
      }
      try {
        if (
          nnode &&
          nodes[i].uniqueIdentifier === nnode.uniqueIdentifier &&
          index < selection.index
        ) {
          if (nnode.tombstone) {
            selection.index--;
          } else {
            selection.index++;
          }
        }
      } catch (e) {
        console.log(e);
      }

      forced = true;
      const node = nodes[i];
      const format = {};
      format["italic"] = node.italic;
      format["bold"] = node.bold;
      console.log(format);
      editor.insertText(index, node.letter, format);
      index++;
    }
    editor.setSelection(selection);
  }
  editor.setSelection(selection);
}

// eslint-disable-next-line require-jsdoc
function TextEditor({ documentId, userid, role }) {
  // eslint-disable-next-line no-unused-vars
  const [editorContent, setEditorContent] = useState("");
  console.log("role is", role);
  console.log("documentid is", documentId);

  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    const socket = io("http://25.18.96.118:3001/", {
      //dont hard code
      query: {
        userId: userid,
        documentId: documentId,
      },
    });

    console.log("Component mounted");
    socket.on("nodeDeleted", (node) => {
      console.log("Node deleted");
      crdt.removeNode(node);
      const string = crdt.myToString();
      forced = true;
      insertQuillNode(editor, node);
    });
    socket.on("nodeInserted", (node) => {
      console.log("Node inserted");
      crdt.addNode(node);
      const string = crdt.myToString();
      forced = true;
      insertQuillNode(editor, node);
    });
    socket.on("nodeEdited", (nodes) => {
      console.log("Node Edited");
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        crdt.updateNode(node);
      }
      forced = true;
      insertQuillNode(editor);
    });
    socket.on("receive document", (document) => {
      console.log(document);
      crdt.myFromArray(document);
      const string = crdt.myToString();
      console.log("String:", string);
      if (string !== "") {
        forced = true;
        insertQuillNode(editor);
      }
    });
    const editor = new Quill("#editor", {
      theme: "snow", // Use the snow theme
      readOnly: !role, //change to correct
    });
    // Listen for text-change event to update editorContent
    editor.on("text-change", (delta, oldDelta, source) => {
      const formats = editor.getFormat();
      const isBold = formats["bold"];
      const isItalic = formats["italic"];

      if (isBold) {
        console.log("Bold is applied");
      }
      if (isItalic) {
        console.log("Italic is applied");
      }
      if (forced) {
        forced = false;
        return;
      }

      const text = editor.getText(); // Get the text content of the editor
      const selection = editor.getSelection(); // Get the current selection
      const index = selection ? selection.index : -1; // Get the index of the change
      if (index === -1) {
        return;
      }
      setEditorContent(text);
      delta.ops.forEach((op) => {
        console.log("calculted index:", index >= 2 ? index - 1 : index);
        if (op.insert) {
          // Text was inserted
          console.log("Text inserted:", op.insert);
          const node = crdt.insertAtIndex(
            op.insert,
            index >= 2 ? index - 1 : index,
            isItalic,
            isBold
          );
          crdt.addNode(node);
          socket.emit("insert", node);
        } else if (op.delete) {
          // Text was deleted
          console.log("Text deleted:", index);
          const node = crdt.removeNodeAtIndex(index);
          socket.emit("delete", node);
        } else if (op.attributes) {
          // Text was formatted
          let nodes = [];
          for (let i = index; i < index + op.retain; i++) {
            const node = crdt.getNodeI(i + 1);
            console.log("Node:", node);
            if (op.attributes.bold === true) {
              node.bold = true;
            } else if (op.attributes.bold === null) {
              node.bold = false;
            }
            if (op.attributes.italic === true) {
              node.italic = true;
            } else if (op.attributes.italic === null) {
              node.italic = false;
            }
            crdt.updateNode(node);
            nodes.push(node);
          }
          socket.emit("Edit", nodes);
          // Handle formatting changes...
        }
      });
    });

    return () => {
      // Cleanup code when the component unmounts
      socket.disconnect();
      editor.off("text-change");
      editor.off("selection-change");
      // editor.remove();
    };
  }, []);

  return (
    <div>
      <div id="editor">
        {/* The Quill editor will be rendered inside this container */}
      </div>
      <div></div>
    </div>
  );
}

TextEditor.propTypes = {
  documentId: PropTypes.string,
  userid: PropTypes.string,
  role: PropTypes.boolean,
};

export default TextEditor;
