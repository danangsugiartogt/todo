
const emptyNotes = () => {
    return 'there are no notes in database.';
};

const noteAdded = (id) => {
    return `new note with id: ${id} added.`;
};

const noteNotFound = (id) => {
    return `note with id: ${id} is not found.`;
};

const noteUpdated = (id) => {
    return `note with id: ${id} updated.`;
};

const noteDeleted = (id) => {
    return `note with id: ${id} deleted.`;
};

const unknownError = () => {
    return 'something error.';
};

const titleNotValid = () => {
    return 'title is not valid.';
};

module.exports = { emptyNotes, noteAdded, noteNotFound, noteUpdated, noteDeleted, unknownError, titleNotValid };