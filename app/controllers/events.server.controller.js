var mongoose = require('mongoose');
var Events = mongoose.model('CollegeEvents');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function(req, res) {
    var event = new Events(req.body);
    event.creator = req.user;
    event.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(event);
        }
    });
};

exports.list = function(req, res) {
    Events.find().sort('-created').populate('creator', 'name username').exec(function(err, events) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(events);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.event);
};

exports.eventByID = function(req, res, next, id) {
    Events.findById(id).populate('creator', 'name username').exec(function(err, event) {
        if (err)
            return next(err);

        if (!event)
            return next(new Error('Failed to load event ' + id));

        req.event = event;
        next();
    });
};

exports.update = function(req, res) {
    var event = req.event;
    event.title = req.body.title;
	event.branch = req.body.branch;
	event.description = req.body.description;
    event.comment = req.body.comment;
    event.completed = req.body.completed;

    event.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(event);
        }
    });
};

exports.delete = function(req, res) {
    var event = req.event;
    event.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(event);
        }
    });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.user.role != 'admin') {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};
