import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
	const [formData, setFormData] = useState({
		status: '',
		location: '',
		favouritefood: '',
		favouritecuisine: '',
		bio: ''
	});

	const { status, location, favouritefood, favouritecuisine, bio } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		createProfile(formData, history);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Create Your Profile</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Let's get some information to make your
				profile stand out
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={e => onSubmit(e)}>
				<div className='form-group'>
					<select name='status' value={status} onChange={e => onChange(e)}>
						<option value='0'>* Select Cooking Skill Level</option>
						<option value='Beginer Cook'>Beginner Cook</option>
						<option value='Home Cook'>Home Cook</option>
						<option value='Amateur Chef'>Amateur Chef</option>
						<option value='Professional Chef'>Professional Chef</option>
						<option value='Other'>Other</option>
					</select>
					<small className='form-text'>
						Give us an idea of where you are at
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						City & state suggested (eg. Betoota, QLD)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Favourite Food'
						name='favouritefood'
						value={favouritefood}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Please use comma separated values (eg. Lasagna,Creme Brulee,Steak &
						Chips,Mashed Potatos)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Favourite Cuisine'
						name='favouritecuisine'
						value={favouritecuisine}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						eg. French, Japanese, Italian etc...
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='A short bio of yourself'
						name='bio'
						value={bio}
						onChange={e => onChange(e)}
					></textarea>
					<small className='form-text'>Tell us a little about yourself</small>
				</div>
				<input type='submit' class='btn btn-primary my-1' />
				<Link to='/dashboard'>
					<a className='btn btn-light my-1'>Go Back</a>
				</Link>
			</form>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
