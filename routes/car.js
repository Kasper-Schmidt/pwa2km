const router = require("express").Router();
const car = require("../models/car");
const { verifyToken } = require("../validation");





// CRUD Operations

// Create product - post
router.post("/", verifyToken, (req, res) => {

    // Body, parsed as json
    let data = req.body;

    // passed into insertMany function of mongoose and inserted into the database
    car.insertMany(data)

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});


// Read all products - get
// Create product - post  "/" = /api/car/
router.get("/", (req, res) => {

    car.find()

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});











// Get random car
router.get("/random", (req, res) => {
    // Get number of all cars in collection
    car.countDocuments({})
        .then(count => {

            // Get a random car from the database
            let random = Math.floor(Math.random() * count);

            // Query all documents, but skip (fetch) only one with the offset of "random"
            car.findOne().skip(random)
                .then(data => { res.send(data) })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                })
        })
});






router.get("/random/supercar/", (req, res) => {
    const carType = "Supercar";

    car.countDocuments({ type: carType })
        .then(count => {
            if (count === 0) {
                return res.status(404).send({ message: "No Supercars found" });
            }

            let random = Math.floor(Math.random() * count);

            car.findOne({ type: carType }).skip(random)
                .then(data => { res.send(data) })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                });
        });
});




router.get("/random/suv/", (req, res) => {
    const carType = "SUV";

    car.countDocuments({ type: carType })
        .then(count => {
            if (count === 0) {
                return res.status(404).send({ message: "No SUV found" });
            }

            let random = Math.floor(Math.random() * count);

            car.findOne({ type: carType }).skip(random)
                .then(data => { res.send(data) })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                });
        });
});



router.get("/random/hypercar/", (req, res) => {
    const carType = "Hypercar";

    car.countDocuments({ type: carType })
        .then(count => {
            if (count === 0) {
                return res.status(404).send({ message: "No Hypercar found" });
            }

            let random = Math.floor(Math.random() * count);

            car.findOne({ type: carType }).skip(random)
                .then(data => { res.send(data) })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                });
        });
});


// cars/type/           
router.get("/:id", (req, res) => {

    car.findById(req.params.id)

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});










// Update specific product - put
router.put("/:id", (req, res) => {

    const id = req.params.id;

    car.findByIdAndUpdate(id, req.body)

        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update car by id=" + id + ". Maybe car was not found" })
            }
            else {
                res.send({ message: "Product was succesfully updated." })
            }

        })
        .catch(err => { res.status(500).send({ message: "Error updating car with id=" + id }); })
});




// Delete specific product - delete
router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    car.findByIdAndDelete(id)

        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete car by id=" + id + ". Maybe car was not found" })
            }
            else {
                res.send({ message: "Product was succesfully deleted." })
            }

        })
        .catch(err => { res.status(500).send({ message: "Error deleting car with id=" + id }); })
});







module.exports = router;





