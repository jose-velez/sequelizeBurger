var express = require("express");

var router = express.Router();
var db = require("../models");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  db.Burger.findAll().then(function(dbBurger) {
    //res.json(dbBurger)
    // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
    var hbsObject = { burgers: dbBurger };
    res.render("index", hbsObject);
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  db.Burger.create({
    burger_name: req.body.burger_name}).then(function(dbBurger){
      //res.json(dbBurger);
      res.redirect("/");
    });
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle


});

// put route -> back to index
router.delete("/burgers/delete/:id", function(req, res) {
  db.burger.destroy({
    where: {
      id : req.params.id
    }}).then(function(dbBurger) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

module.exports = router;
