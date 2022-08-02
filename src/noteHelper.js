
const isNotesEmpty = (notes) => {
    
    if(notes.length <= 0) return true;
    return false;
};

const isTitleValid = (title) => {
    if(title !== undefined && title.length > 2) return true;
    return false;
};

module.exports = { isNotesEmpty, isTitleValid };