import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
	return (
		<div class='dash-buttons'>
			<Link to='/edit-profile' class='btn btn-light'>
				<i class='fas fa-user-circle text-primary'></i> Edit Profile
			</Link>
			<Link to='/add-recipe' class='btn btn-light'>
				<i class='fa fa-plus text-primary'></i> Add Recipe
			</Link>
			<Link to='/edit-favourite-recipes' class='btn btn-light'>
				<i class='fa fa-pencil text-primary'></i> Edit Favourite Recipes
			</Link>
		</div>
	);
};
