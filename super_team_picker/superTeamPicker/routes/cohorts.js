const express = require('express');
const router = express.Router();
const knex = require('../db');

const app = express();

router.post('/', (req, res) => {
  const name = req.body.name;
  const members = req.body.members;
  const logoUrl = req.body.logoUrl;

  knex
    .insert({
      name: name,
      members: members,
      logoUrl: logoUrl
    })
    .into('team')
    .then(() => {
      res.redirect('/cohorts');
    });
});

router.get('/', (req, res) => {
  knex
    .select()
    .from('team')
    .orderBy('created_at', 'DESC')
    .then(cohorts => {
      res.render('cohorts/index', {
        cohorts
      });
    });
});

router.get('/new', (req, res) => {
  res.render('cohorts/new');
});


// router.post('/show', (req, res) => {
//       res.send('/cohorts/new');
// });

router.get('/:id', (req, res, next) => {
  const cohortId = req.params.id;
  // we use query function with only get method
  // we use body function with only post method
  const quantity = Number(req.query.quantity)
  const opt = req.query.method

  if (isNaN(parseInt(cohortId, 10))) {
    return res.redirect('/')
  }


  knex
    .first() // replace select with first when you only want one row
    .from('team')
    .where({
      id: cohortId
    })
    .then(cohort => {

      if (isNaN(parseInt(quantity)) || opt === undefined || cohort.members === []) {
        return res.render('cohorts/show', {
          cohort: cohort || {},
          group: [],
          group2: {},
          returnQuery: {},
        });
      }

      let quan_arr = cohort.members.split(',').map(name => name.trim());
      let person = Math.floor(quan_arr.length / quantity);
      let person2 = Math.round(quan_arr.length / quantity);
      const teams = {};

      let quan = quantity;

      let arr = [];
      let num = quan_arr.length;


      if (opt === 'teamCount') {
        for (let i = 0; i < quantity; i++) {

          arr[i] = [];
          for (let j = 0; j < person; j++) {
            let idx = Math.floor(Math.random() * quan_arr.length)
            arr[i].push(' ' + quan_arr[idx]);
            quan_arr.splice(idx, 1);
          }
        }
        // }
        // quan_arr only has people without groups
        let rest = quan_arr.length
        if (rest !== 0) {
          for (let k = 0; k < rest; k++) {
            let idx2 = Math.floor(Math.random() * quan_arr.length)
            arr[k].push(' '+ quan_arr[idx2]);
            quan_arr.splice(idx2, 1);
          }
        }
      } else {
        for (let l = 1; l <= person2; l++) {
          teams[l] = [];
        }
        while (quan_arr.length > 0) {
          for (let team in teams) {
            let idx = Math.floor(Math.random() * quan_arr.length)
            let spl = quan_arr.splice(idx, 1);
            teams[team].push(` ${spl[0]}`);
            if (quan_arr.length === 0) {
              break;
            }
          }
        }
      }

      res.render('cohorts/show', {
        cohort: cohort || {},
        group: arr || [],
        group2: teams || {},
        returnQuery: req.query || {},
      });
    })
});

module.exports = router;
