const people = require('../repos/people');
const { buildNotFoundError } = require('../helpers/errorHelpers');

const peopleController = {
  getPeople: (req, res, next) => {
    people.get(data => {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "People received.",
        data
      });
    }, err => {
      next(err);
    })
  },
  getPersonById: (req, res, next) => {
    people.getById(req.params.id, data => {
      if (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "Person received.",
          data
        });
      } else {
        res.status(404).json(buildNotFoundError({ message: `Person with id: ${req.params.id} could not be found.` }));
      }
    }, err => {
      next(err);
    })
  },
  searchPeople: (req, res, next) => {
    people.search(req.query, data => {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "People received.",
        data
      });
    }, err => {
      next(err);
    })
  },
  insertPerson: (req, res, next) => {
    people.insert(req.body, data => {
      res.status(200).json({
        status: 201,
        statusText: "Created",
        message: "New person added.",
        data
      });
    }, err => {
      next(err);
    })
  },
  updatePerson: (req, res, next) => {
    people.getById(req.params.id, data => {
      if (data) {
        people.update(req.body, req.params.id, data => {
          res.status(200).json({
            status: 200,
            statusText: "OK",
            message: `A person's data with id: ${req.params.id} has been updated.`,
            data
          });
        }, err => {
          next(err);
        })
      } else {
        res.status(404).json(buildNotFoundError({ message: `Person with id: ${req.params.id} could not be found.` }));
      }
    }, err => {
      next(err);
    });
  },
  deletePerson: (req, res, next) => {
    people.getById(req.params.id, data => {
      if (data) {
        people.delete(req.params.id, data => {
          res.status(200).json({
            status: 200,
            statusText: "OK",
            message: `A person's data with id: ${req.params.id} has been deleted.`,
            data
          });
        }, err => {
          next(err);
        })
      } else {
        res.status(404).json(buildNotFoundError({ message: `Person with id: ${req.params.id} could not be found.` }));
      }
    }, err => {
      next(err);
    });
  }
};

module.exports = peopleController;