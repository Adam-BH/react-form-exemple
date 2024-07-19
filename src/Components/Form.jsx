import './Form.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const Form = () => {
	const schema = yup.object().shape({
		fullName: yup.string().required('You must enter a vaid full name'),
		email: yup.string().email().required(),
		age: yup.number().positive().integer().min(18).required(),
		pass: yup.string().min(4).max(16).required(),
		confirmPass: yup
			.string()
			.oneOf([yup.ref('pass'), null], 'passwords not matching')
			.required(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmit = (data) => {
		// send data to database
		console.log('Form submitted');
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form">
			<input
				type="text"
				placeholder="Full name ..."
				{...register('fullName')}
			/>
			<p>{errors.fullName?.message}</p>
			<input type="text" placeholder="email ..." {...register('email')} />
			<p>{errors.email?.message}</p>
			<input type="number" placeholder="age ..." {...register('age')} />
			<p>{errors.age?.message}</p>
			<input type="password" placeholder="Password" {...register('pass')} />
			<p>{errors.pass?.message}</p>
			<input
				type="password"
				placeholder="Confirm Password"
				{...register('confirmPass')}
			/>
			<p>{errors.confirmPass?.message}</p>
			<input type="submit" />
		</form>
	);
};
