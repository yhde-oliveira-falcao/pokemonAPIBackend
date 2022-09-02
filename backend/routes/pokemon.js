const router = require('express').Router();
let Pokemon = require('../models/pokemon.model');

router.route('/').get((req, res) => {
  Pokemon.find()
    .then(pokemons => res.json(pokemons))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;

  const newPokemon = new Pokemon({
    username,
    description,
  });

  newPokemon.save()
  .then(() => res.json('Pokemon added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Pokemon.findById(req.params.id)
    .then(pokemon => res.json(pokemon))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Pokemon.findByIdAndDelete(req.params.id)
    .then(() => res.json('Pokemon deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Pokemon.findById(req.params.id)
    .then(pokemon => {
      pokemon.username = req.body.username;
      pokemon.description = req.body.description;


      pokemon.save()
        .then(() => res.json('Pokemon updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;