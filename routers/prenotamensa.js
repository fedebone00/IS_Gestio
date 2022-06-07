const express = require('express')
const router = express.Router()
const PrenotaMensa = require("../models/Prenotamensa.js");
const { isAuthenticated, isAuthorized } = require("../middlewares/auth.js");
const { check, validationResult } = require("express-validator");

router.get("/", isAuthenticated, isAuthorized, (req, res) => {
  PrenotaMensa.find().then((prenotamensa) => res.status(201).send(prenotamensa));
});

router.post("/", isAuthenticated,isAuthorized, check("user_id").notEmpty(), (req, res) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      var datona = new Date();
      var dd = String(datona.getDate()).padStart(2, "0");
      var mm = String(datona.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = datona.getFullYear();
  
      datona = String(yyyy + "/" + mm + "/" + dd);
      console.log(datona);
  
      let p = new PrenotaMensa({user_id: req.body["user_id"],data: datona});
      p.save()
        .then(() =>
          res.status(201).send(`Successfully booked, id ${req.params.user_id}`)
        )
        .catch(() => res.status(500).send("Error while booking"));
    }
  );

router.delete("/:id",isAuthenticated,isAuthorized,(req, res) => {

    PrenotaMensa.findByIdAndRemove(req.params.id)
      .then(() => res.status(201).send(`Successfully remove id ${req.body.id}`))
      .catch(() => res.status(500).send(`Error deleting id ${req.body.id} `));
  }
);

router.patch("/:id",isAuthenticated,isAuthorized, async (req, res) => {

      try {
        const prenota = await PrenotaMensa.findById({_id: req.params.id})
        if(!prenota){
            return res.status(404).json("id not found")
        }else{
            PrenotaMensa.updateOne({_id: req.params.id},{$set:req.body}).exec()
            res.status(200).json({ message: 'success' })
        }
    }catch(err){
        res.status(500).json({ message: err.message })
    }

  }
);

module.exports = router;