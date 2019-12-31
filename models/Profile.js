const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	favouriteRecipes: [{
		name: {
			type: String
		},
		servingQty: {
			type: String
		},
		prepTimeInMin: {
			type: String
		},
		ingredients: [{
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
				type: String,
			}
		}]
	}],
	bio: {
		type: String
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);