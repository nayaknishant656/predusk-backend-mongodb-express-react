const express = require('express');
const router = express.Router();
const { getProfiles, getProfileById, createProfile, getProjects } = require('../controllers/profileController');

router.get('/projects', getProjects);
router.get('/', getProfiles);
router.get('/:id', getProfileById);
router.post('/', createProfile);

module.exports = router;
