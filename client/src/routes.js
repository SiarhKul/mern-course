import React from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { CreatePage } from './pages/CreatePage.js';
import { DetailPage } from './pages/DetailPage.js';
import { LinksPage } from './pages/LinksPage.js';
import { AuthPage } from './pages/AuthPage.js';

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/links" exact>
					<LinksPage />
				</Route>
				<Route path="/create" exact>
					<CreatePage />
				</Route>
				<Route path="/detail/:id">
					<DetailPage />
				</Route>
				<Redirect to="/create" />
			</Switch>
		);
	}

	return (
		<Switch>
			<Route path="/">
				<AuthPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};
