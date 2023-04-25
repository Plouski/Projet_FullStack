const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

router.get("/", skillController.getSkills);
router.post("/", skillController.createSkill);
router.put("/", verifyToken, verifyIsAdmin, skillController.updateSkill);
router.delete("/", verifyToken, verifyIsAdmin, skillController.removeSkill);
// router.post("/", verifyToken, verifyIsAdmin, skillController.createSkill);
// router.put("/", verifyToken, verifyIsAdmin, skillController.updateSkill);
// router.delete("/", verifyToken, verifyIsAdmin, skillController.removeSkill);

module.exports = router;