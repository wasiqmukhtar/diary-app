const Diary = require('../models/diary.model.js');
const User = require('../controllers/user.controller.js');

// Create and Save a new Diary
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Diary content can not be empty"
        });
    }

    //Create a promise instance to get User_ID
    var initializePromise = User.getUserId(req.body.username);
    
    // Create a Diary
    initializePromise
    .then(function(result) {
        //Create diary object
        const diary = new Diary({
            title: req.body.title || "Untitled Diary entry", 
            content: req.body.content,
            user_id: result
        });

        // Save Diary in the database
        diary.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Diary."
            });
        });
    })
};

// Retrieve and return all diary entries from the database.
exports.findAll = (req, res) => {
    Diary.find({user_id:req.params.userId})
    .then(diary => {
        res.send(diary);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Diary entries."
        });
    });
};

// Find a single diary entry with a pageId
exports.findOne = (req, res) => {
    Diary.findById(req.params.pageId)
    .then(diary => {
        if(!diary) {
            return res.status(404).send({
                message: "Diary entry not found with id " + req.params.pageId
            });            
        }
        res.send(diary);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Diary entry not found with id " + req.params.pageId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Diary entry with id " + req.params.pageId
        });
    });
};

// Update a Diary entry identified by the pageId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Diary content can not be empty"
        });
    }

    // Find diary entry and update it with the request body
    Diary.findByIdAndUpdate(req.params.pageId, {
        title: req.body.title || "Untitled Entry",
        content: req.body.content
    }, {new: true})
    .then(diary => {
        if(!diary) {
            return res.status(404).send({
                message: "Diary entry not found with id " + req.params.pageId
            });
        }
        res.send(diary);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Diary entry not found with id " + req.params.pageId
            });                
        }
        return res.status(500).send({
            message: "Error updating Diary entry with id " + req.params.pageId
        });
    });
};

// Delete a Diary entry with the specified pageId in the request
exports.delete = (req, res) => {
    Diary.findByIdAndRemove(req.params.pageId)
    .then(diary => {
        if(!diary) {
            return res.status(404).send({
                message: "Diary entry not found with id " + req.params.pageId
            });
        }
        res.send({message: "Diary entry deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Diary entry not found with id " + req.params.pageId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Diary entry with id " + req.params.pageId
        });
    });
};

//Delete entire diary
exports.deleteAll = (req, res) => {
    Diary.deleteMany()
    .then(diary => {
        if(!diary) {
            return res.status(404).send({
                message: "There was an error deleting the diary"
            });
        }
        res.send({message: "Diary deleted successfully!"});
    })
}
