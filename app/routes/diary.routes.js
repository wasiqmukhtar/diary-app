module.exports = (app) => {
    const diary = require('../controllers/diary.controller.js');

    // Create a new diary
    app.post('/diary', diary.create);

    // Retrieve all diary entries
    app.get('/diary/:userId', diary.findAll);

    // Retrieve a single diary entry with pageId
    app.get('/diary/pages/:pageId', diary.findOne);

    // Update a diary entry with pageId
    app.put('/diary/pages/:pageId', diary.update);

    // Delete a diary entry with pageId
    app.delete('/diary/pages/:pageId', diary.delete);

    // Delete all entries
    app.delete('/diary',diary.deleteAll);
}