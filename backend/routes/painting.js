const router = require("express").Router();
let Exercise = require("../models/painting.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const description = req.body.description;
  const descriptio = req.body.descriptio;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    description,
    descriptio,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
