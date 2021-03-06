import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {
	const history = useHistory();

	const { request } = useHttp();
	const [link, setLink] = useState('');
	const auth = useContext(AuthContext);

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const pressHandler = async event => {
		if (event.key === 'Enter') {
			try {
				const data = await request(
					'/api/link/generate',
					'POST',
					{
						from: link,
					},
					{ Authorization: `Bearer ${auth.token}` }
				);
				history.push(`/detail/${data.link._id}`);
			} catch (error) {}
		}
	};

	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
				<div className="input-field">
					<input
						placeholder="вставьте ссылку"
						id="email"
						type="text"
						value={link}
						onChange={e => setLink(e.target.value)}
						onKeyPress={pressHandler}
					/>
					<label htmlFor="email">Введите ссылку</label>
				</div>
			</div>
		</div>
	);
};
