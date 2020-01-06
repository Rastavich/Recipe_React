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
		ingredients: [{ ingredient, quantity, measure, format }],
		method,
		isfavourite
	} = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Fragment>
			<h1 className='large text-primary'>Add a Recipe</h1>
			<p className='lead'>
				<i className='fa fa-cutlery'></i> Add a recipe, it's ingredients and the
				method
			</p>
			<small>* = required field</small>
			<form
				className='form'
				onSubmit={e => {
					e.preventDefault();
					addRecipe(formData, history);
				}}
			>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Recipe Name'
						name='recipename'
						value={recipename}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Serving Qty'
						name='servingQty'
						value={servingQty}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* PrepTimeInMin'
						name='prepTimeInMin'
						value={prepTimeInMin}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<h4>Ingredients</h4>
					<input
						type='text'
						name='ingredients'
						value={ingredient}
						placeholder='* Name'
						onChange={e => onChange(e)}
					/>
					<input
						type='text'
						name='quantity'
						value={quantity}
						placeholder='* Quantity'
						onChange={e => onChange(e)}
					/>
					<small>Serving Qty ie. How many serves?</small>
				</div>
				<div className='form-group'></div>
				<div className='form-group'>
					<input
						type='text'
						name='measure'
						value={measure}
						placeholder='* Measure'
						onChange={e => onChange(e)}
					/>
					<small>Measure Qty ie. 1 tbsp, 1 cup etc.</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='format'
						value={format}
						placeholder='format'
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='method'
						cols='30'
						rows='10'
						placeholder='Method'
						value={method}
						onChange={e => onChange(e)}
					></textarea>
				</div>
				<div className='form-group'>
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
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

AddRecipe.propTypes = {
	addRecipe: PropTypes.func.isRequired
};

export default connect(null, { addRecipe })(withRouter(AddRecipe));
