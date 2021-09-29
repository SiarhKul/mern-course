const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const chalk = require('chalk');
const path = require('path');

//import routes middlewares
const app = express();

//midleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', require('./routes/auth.router'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//configs
const PORT = config.get('port') || 5000;
const errorServer = chalk.bold.italic.red;
const successServer = chalk.bold.italic.blue;

const start = () => {
	try {
		mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
		});

		app.listen(PORT, () => {
			console.log(successServer(`listening nodeJS server on port ${PORT}... `));
		});
	} catch (error) {
		console.log(errorServer('Server error', error.message));
		process.exit(1);
	}
};

start();
