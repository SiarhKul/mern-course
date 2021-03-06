import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
	const auth = useContext(AuthContext);
	const history = useHistory();

	const logoutHandler = event => {
		event.preventDefault();
		auth.logout();
		history.push('/');
	};
	return (
		<nav>
			<div className="nav-wrapper blue darken-1" style={{ padding: '2 2rem' }}>
				<span className="brand-logo">Сокращение ссылок</span>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<NavLink to="/create">Создать</NavLink>
					</li>
					<li>
						<NavLink to="/links">Ссылки</NavLink>
					</li>
					<li>
						<NavLink to="/" onClick={logoutHandler}>
							Выйти
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};
