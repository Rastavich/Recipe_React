import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecipe } from '../../actions/profile';

const AddRecipe = ({ addRecipe }) => {
	const addRecipes = addRecipe.map(recipe => (
		<tr key={recipe._id}>
			<td>{recipe.name}</td>
			<td>{recipe.servingQty}</td>
			<td>{recipe.prepTimeInMin}</td>
			<td>
				<button className='btn btn-danger'>Delete</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 className='my-2'>Saved Recipes</h2>updates
			<table className='table'>
				<thead>
					<tr>
						<th>Recipe Name</th>
						<th className='hide-sm'>Serving Qty</th>
						<th className='hide-sm'>Prep Time</th>
						<th />
					</tr>
				</thead>
				<tbody>{addRecipes}</tbody>
			</table>
		</Fragment>
	);
};

AddRecipe.propTypes = {
	addRecipe: PropTypes.array.isRequired
};

export default addRecipe;
