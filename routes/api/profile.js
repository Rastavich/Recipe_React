const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		}).populate('user', 'name');

		if (!profile) {
			return res.status(400).json({
				msg: 'There is no profile for this user'
			});
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Errror');
	}
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, async (req, res) => {
	const {
		status,
		location,
		favouritefood,
		favouritecuisine,
		favouriteRecipes,
		bio
	} = req.body;

	// Build Profile Object
	const profileFields = {};
	profileFields.user = req.user.id;
	if (status) profileFields.status = status;
	if (location) profileFields.location = location;
	if (favouritefood) profileFields.favouritefood = favouritefood;
	if (favouritecuisine) profileFields.favouritecuisine = favouritecuisine;
	if (favouriteRecipes) {
		profileFields.favouriteRecipes = favouriteRecipes
			.split(',')
			.map(favouriteRecipes => favouriteRecipes.trim());
	}
	if (bio) profileFields.bio = bio;

	try {
		let profile = await Profile.findOne({
			user: req.user.id
		});

		if (profile) {
			// Update
			profile = await Profile.findOneAndUpdate(
				{
					user: req.user.id
				},
				{
					$set: profileFields
				},
				{
					new: true
				}
			);

			return res.json(profile);
		}

		// Create
		profile = new Profile(profileFields);

		await profile.save();
		res.json(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', 'name');
		res.json(profiles);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
	try {
		// Finds profile by user ID (required param = user_id)
		const profile = await Profile.findOne({
			user: req.params.user_id
		}).populate('user', 'name');

		// If no profile by ID return 400
		if (!profile)
			return res.status(400).json({
				msg: 'Profile not found'
			});

		// Returns profile by ID
		res.json(profile);
	} catch (err) {
		console.log(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({
				msg: 'Profile not found'
			});
		}
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/profile
// @desc    Delete profile, user
// @access  Private
router.delete('/', auth, async (req, res) => {
	try {
		// Remove Profile
		await Profile.findOneAndRemove({
			user: req.user.id
		});

		await User.findOneAndRemove({
			_id: req.user.id
		});

		res.json({
			msg: 'User deleted'
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/profile/favouriteRecipes
// @desc    Add profile favourite recipes
// @access  Private
router.put(
	'/favouriteRecipes',
	[
		auth,
		[
			check('name', 'Name is required')
				.not()
				.isEmpty(),
			check('servingQty', 'Serving Qty is Required')
				.not()
				.isEmpty(),
			check('prepTimeInMin', 'Prep time is Required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({
				errors: errors.array()
			});
		}

		const {
			recipename,
			servingQty,
			prepTimeInMin,
			ingredients: [ingredient, quantity, measure, format],
			method,
			isfavourite
		} = req.body;

		const favouriteRecipes = {
			recipename,
			servingQty,
			prepTimeInMin,
			ingredients: [ingredient, quantity, measure, format],
			method,
			isfavourite
		};

		try {
			const profile = await Profile.findOne({
				user: req.user.id
			});

			profile.favouriteRecipes.unshift(favouriteRecipes);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Errror');
		}
	}
);

// @route   DELETE api/profile/favouriteRecipes/:favouriteRecipes_id
// @desc    Delete profile favourite recipes
// @access  Private
router.delete(
	'/favouriteRecipes/:favouriteRecipes_id',
	auth,
	async (req, res) => {
		try {
			const profile = await Profile.findOne({
				user: req.user.id
			});

			// Get remove index
			const removeIndex = profile.favouriteRecipes
				.map(item => item.id)
				.indexOf(req.params.favouriteRecipes_id);

			profile.favouriteRecipes.splice(removeIndex, 1);

			await profile.save();

			res.json(profile);
		} catch (error) {
			console.error(err.message);
			res.status(500).send('Server Errror');
		}
	}
);

// @route   PUT api/profile/savedRecipes
// @desc    Add profile recipes
// @access  Private
router.put(
	'/savedRecipes',
	[
		auth,
		[
			check('name', 'Name is required')
				.not()
				.isEmpty(),
			check('servingQty', 'Serving Qty is Required')
				.not()
				.isEmpty(),
			check('prepTimeInMin', 'Prep time is Required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({
				errors: errors.array()
			});
		}

		const {
			recipename,
			servingQty,
			prepTimeInMin,
			ingredients: [ingredient, quantity, measure, format],
			method
		} = req.body;

		const savedRecipes = {
			recipename,
			servingQty,
			prepTimeInMin,
			ingredients: [ingredient, quantity, measure, format],
			method
		};

		try {
			const profile = await Profile.findOne({
				user: req.user.id
			});

			profile.savedRecipes.unshift(savedRecipes);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Errror');
		}
	}
);

// @route   DELETE api/profile/savedRecipes/:savedRecipes_id
// @desc    Delete profile saved recipes
// @access  Private
router.delete('/savedRecipes/:savedRecipes_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		});

		// Get remove index
		const removeIndex = profile.savedRecipes
			.map(item => item.id)
			.indexOf(req.params.savedRecipes_id);

		profile.savedRecipes.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server Errror');
	}
});

module.exports = router;
