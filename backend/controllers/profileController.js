const Profile = require('../models/Profile');

// @desc    Get all profiles
// @route   GET /api/profiles
// @access  Public
const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single profile
// @route   GET /api/profiles/:id
// @access  Public
const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a profile
// @route   POST /api/profiles
// @access  Public
const createProfile = async (req, res) => {
    try {
        const profile = await Profile.create(req.body);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get projects with respective skills and profile ID
// @route   GET /projects?Skills=Python
// @access  Public
const getProjects = async (req, res) => {
    try {
        const { Skills } = req.query;
        let query = {};

        if (Skills) {
            // Case-insensitive search inside the skills array
            query.skills = { $regex: new RegExp(Skills, 'i') };
        }

        const profiles = await Profile.find(query);

        let results = [];
        profiles.forEach(profile => {
            if (profile.projects && profile.projects.length > 0) {
                profile.projects.forEach(project => {
                    results.push({
                        profileId: profile._id,
                        project: {
                            id: project._id,
                            title: project.title,
                            description: project.description,
                            links: project.links
                        },
                        skills: profile.skills
                    });
                });
            }
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProfiles,
    getProfileById,
    createProfile,
    getProjects
};
