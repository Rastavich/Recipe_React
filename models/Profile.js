const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	favouriteRecipes: [
		{
			recipename: {
				type: String
			},
			servingQty: {
				type: String
			},
			prepTimeInMin: {
				type: String
			},
			ingredients: [
				{
					ingredient: {
						type: String
					},
					quantity: {
						type: Number
					},
					measure: {
						type: String
					},
					format: {
						type: String
					}
				}
			],
			method: {
				type: String
			},
			isfavourite: {
				type: String
			}
		}
	],
	savedRecipes: [
		{
			recipename: {
				type: String
			},
			servingQty: {
				type: String
			},
			prepTimeInMin: {
				type: String
			},
			ingredients: [
				{
					ingredient: {
						type: String
					},
					quantity: {
						type: Number
					},
					measure: {
						type: String
					},
					format: {
						type: String
					}
				}
			],
			method: {
				type: String
			},
			isfavourite: {
				type: String
			}
		}
	],
	status: {
		type: String
	},
	location: {
		type: String
	},
	favouritefood: {
		type: String
	},
	favouritecuisine: {
		type: String
	},
	bio: {
		type: String
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
