const express = require("express");
const router = express.Router();
const {
  createRandomCategories,
  createRandomWorkers,
  filterWorkers,
  filterWorkers2,
  filterWorkers3,
  filterWorkers4,
  filterWorkers5,
  filterWorkers6,
} = require("../controllers/workerController");

router.post("/categories/create", createRandomCategories);
router.post("/create", createRandomWorkers);
router.get("/filter", filterWorkers);
router.get("/filter2", filterWorkers2);
router.get("/filter3", filterWorkers3);
router.get("/filter4", filterWorkers4);
router.get("/filter5", filterWorkers5);
router.get("/filter6", filterWorkers6);

module.exports = router;
