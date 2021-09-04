const fs = require('fs');
const FILE_NAME = './assets/people.json';

const people = {
  get: (resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    })
  },
  getById: (id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const person = JSON.parse(data).find(person => person.id == id);
        resolve(person);
      }
    })
  },
  search: (searchObject, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const people = JSON.parse(data).filter(person => {
          const keys = Object.keys(searchObject);
          let bool = true;
          for (let i = 0; i < keys.length; i++) {
            switch (keys[i]) {
              case 'name':
                if (!person[keys[i]].toLowerCase().includes(searchObject[keys[i]].toLowerCase())) {
                  bool = false;
                }
                break;
              default:
                if (person[keys[i]] != searchObject[keys[i]]) {
                  bool = false;
                }
            }
          }
          return bool;
        });
        resolve(people);
      }
    });
  },
  insert: (newData, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const people = JSON.parse(data);
        people.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(people), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: (newData, id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const people = JSON.parse(data);
        const person = people.find(person => person.id == id);
        if (person) {
          Object.assign(person, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(people), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  delete: (id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const people = JSON.parse(data);
        const index = people.findIndex(person => person.id == id);
        if (index !== -1) {
          people.splice(people.findIndex(person => person.id == id), 1);
          fs.writeFile(FILE_NAME, JSON.stringify(people), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve({ id });
            }
          });
        }
      }
    });
  }
};

module.exports = people;