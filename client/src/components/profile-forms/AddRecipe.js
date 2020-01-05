import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecipe } from '../../actions/profile';

const AddRecipe = ({ addRecipe, history }) => {
	const [formData, setFormData] = useState({
		recipename: '',
		servingQty: '',
		prepTimeInMin: '',
		ingredients: [
			{
				ingredient: '',
				quantity: '',
				measure: '',
				format: ''
			}
		],
		method: '',
		isfavourite: ''
	});

	const {
		recipename,
		servingQty,
		prepTimeInMin,
		ingredients,
		method,
		isfavourite
	} = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Fragment>
			<h1 class='large text-primary'>Add a Recipe</h1>
			<p class='lead'>
				<i class='fa fa-cutlery'></i> Add a recipe, it's ingredients and the
				method
			</p>
			<small>* = required field</small>
			<form class='form'>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* Recipe Name'
						name='name'
						value={recipename}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* Serving Qty'
						name='servingQty'
						value={servingQty}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* PrepTimeInMin'
						name='prepTimeInMin'
						value={prepTimeInMin}
						onChange={e => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<h4>Ingredients</h4>
					<input
						type='text'
						name='ingredients'
						value={ingredients}
						onChange={e => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<p>
						<input
							type='checkbox'
							name='isfavourite'
							value={isfavourite}
							onChange={e => {
								setFormData({ ...formData, isfavourite: !isfavourite });
							}}
						/>{' '}
						Favourite Recipe
					</p>
				</div>
				<div class='form-group'>
					<textarea
						name='method'
						cols='30'
						rows='10'
						placeholder='Method'
						value={method}
						onChange={e => onChange(e)}
					></textarea>
				</div>
				<input type='submit' class='btn btn-primary my-1' />
				<a class='btn btn-light my-1' href='dashboard.html'>
					Go Back
				</a>
			</form>
		</Fragment>
	);
};

AddRecipe.propTypes = {
	addRecipe: PropTypes.func.isRequired
};

export default connect(null, { addRecipe })(AddRecipe);
