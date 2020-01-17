import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
	return (
		<div className='dash-buttons'>
			<Link to='/edit-profile' className='btn btn-light'>
				<i className='fas fa-user-circle text-primary'></i> Edit Profile
			</Link>
			<Link to='/add-recipe' className='btn btn-light'>
				<i className='fa fa-plus text-primary'></i> Add Recipe
			</Link>
			<Link to='/edit-favourite-recipes' className='btn btn-light'>
				<i className='fa fa-pencil text-primary'></i> Edit Favourite Recipes
			</Link>
		</div>
	);
};
