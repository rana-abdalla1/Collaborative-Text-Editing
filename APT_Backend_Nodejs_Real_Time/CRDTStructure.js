const CRDTNode = require("./CRDTNode");
const UUID = require("uuid");
class CRDTStructure {
  constructor() {
    this.nodes = [];
    const beginningNode = new CRDTNode("\0", UUID.v4(), -1000.0);
    const endingNode = new CRDTNode("\0", UUID.v4(), 1000.0);
    this.nodes.push(beginningNode);
    this.nodes.push(endingNode);
    this.sortNodes();
  }
  sortNodes() {
    this.nodes.sort((a, b) => {
      if (a.position !== b.position) {
        return a.position - b.position;
      } else {
        return a.uniqueIdentifier.localeCompare(b.uniqueIdentifier);
      }
    });
  }

  evenlyDistributePositions() {
    // Get the beginning and ending nodes
    const beginningNode = this.nodes[0];
    const endingNode = this.nodes[this.nodes.length - 1];
    const diff = endingNode.position - beginningNode.position;

    // Calculate the increment
    const increment = diff / (this.nodes.length - 1);
    // Iterate through all nodes and update their positions
    for (let i = 1; i < this.nodes.length - 1; i++) {
      this.nodes[i].position = beginningNode.position + i * increment;
    }
  }
  getNodeI(index) {
    let counter = 0;
    let nextNode = null;
    for (let i = 1; i < this.nodes.length; i++) {
      nextNode = this.nodes[i];
      if (nextNode.tombstone) {
        counter--;
      }
      counter++;
      if (counter === index) {
        break;
      }
    }
    return nextNode;
  }
  updateNode(node) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].uniqueIdentifier === node.uniqueIdentifier) {
        this.nodes[i] = node;
        break;
      }
    }
  }

  insertAtIndex(letter, index, italic = false, bold = false) {
    index++;
    let previousNode = null;
    let nextNode = null;
    let counter = 0;
    for (let i = 1; i < this.nodes.length; i++) {
      nextNode = this.nodes[i];
      previousNode = this.nodes[i - 1];
      if (nextNode.tombstone) {
        counter--;
      }
      counter++;
      if (counter === index) {
        break;
      }
    }
    console.log("Inserting between", previousNode, nextNode);
    return this.insertBetween(previousNode, nextNode, letter, italic, bold);
  }

  insertBetween(node1, node2, letter, italic, bold) {
    const newPosition = (node1.position + node2.position) / 2;
    const uniqueIdentifier = UUID.v4();
    const newNode = new CRDTNode(
      letter,
      uniqueIdentifier,
      newPosition,
      false,
      italic,
      bold
    );
    return newNode;
  }
  addNode(node) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].uniqueIdentifier === node.uniqueIdentifier) {
        return;
      }
    }
    console.log("Adding node", node);
    if (this.nodes[this.nodes.length - 1].position - node.position < 1) {
      this.nodes[this.nodes.length - 1].position += 10;
    }
    this.nodes.push(node);

    this.sortNodes();

    return node;
  }
  removeNodeAtIndex(index) {
    let location = index + 1;
    let nextNode = null;
    for (let i = 0; i < this.nodes.length; i++) {
      nextNode = this.nodes[i];
      if (nextNode.tombstone) {
        location++;
      }
      location--;
      if (location === -1) {
        this.removeNode(nextNode);
        break;
      }
    }

    return nextNode;
  }

  removeNode(deletedNode) {
    let i = 0;
    for (i = 0; i < this.nodes.length; i++) {
      const nextNode = this.nodes[i];
      if (nextNode.uniqueIdentifier === deletedNode.uniqueIdentifier) {
        nextNode.tombstone = true;
        break;
      }
    }
    if (i === this.nodes.length) {
      console.log("Node not found");
      deletedNode.tombstone = true;
      this.nodes.push(deletedNode);
      this.sortNodes();
    }
  }
  printNodes() {
    for (let i = 0; i < this.nodes.length; i++) {
      console.log(
        this.nodes[i].letter +
          " " +
          this.nodes[i].position +
          " " +
          this.nodes[i].tombstone
      );
    }
  }

  myToString() {
    let result = "";
    for (let i = 1; i < this.nodes.length - 1; i++) {
      if (this.nodes[i].tombstone) {
        continue;
      }
      result += this.nodes[i].letter;
    }
    return result;
  }

  cleanup() {
    const temparr = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (!this.nodes[i].tombstone) {
        temparr.push(this.nodes[i]);
      }
    }
    this.nodes = temparr;
    this.sortNodes();
    this.evenlyDistributePositions();
  }
  myToArray() {
    console.log(this.nodes);
    return this.nodes;
  }
  // eslint-disable-next-line require-jsdoc
  myFromArray(array) {
    if (!array || array.length <= 2) {
      this.nodes = [];
      const beginningNode = new CRDTNode("\0", UUID.v4(), -1000.0);
      const endingNode = new CRDTNode("\0", UUID.v4(), 1000.0);
      this.nodes.push(beginningNode);
      this.nodes.push(endingNode);
      this.sortNodes();
      return;
    }
    this.nodes = [];
    for (const node of array) {
      const newNode = new CRDTNode(
        node.letter,
        node.uniqueIdentifier,
        node.position,
        node.tombstone,
        node.italic,
        node.bold
      );
      this.nodes.push(newNode);
    }
    this.sortNodes();
  }

  // eslint-disable-next-line require-jsdoc
  getNodes() {
    return this.nodes;
  }
}
module.exports = CRDTStructure;
