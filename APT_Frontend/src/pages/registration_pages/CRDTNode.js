/* eslint-disable require-jsdoc */

class CRDTNode {
    constructor(letter, uniqueIdentifier, position, tombstone = false, italic = false, bold = false) {
        this.letter = letter;
        this.uniqueIdentifier = uniqueIdentifier;
        this.position = position;
        this.tombstone = tombstone;
        this.italic = italic;
        this.bold = bold;
    }
}
export default CRDTNode;
