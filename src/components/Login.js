import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import fire from '../config/fire';
class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			todos: [],
			mensajes: '',
			aler:" "
		};

		this.update = this.update.bind(this);

		this.displayLogin = this.displayLogin.bind(this);


	}

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}
	displayLogin(e) {
		e.preventDefault();
		fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((u) => {
				console.log('Successfully Logged In');
			})
			.catch((err) => {
				
				this.setState({
					mensajes:('Error: ' + err.toString()),
					aler:"alert-danger"
				})
			})
	}

	render() {

		return (
			<div className="login">
				<div className={"alert " + this.state.aler}  >
					{this.state.mensajes}
                   </div>

				<form onSubmit={this.displayLogin}>
					<h2 className="center">Login</h2>

					<div className="form-group">
						<input
							type="text"
							placeholder="Username..."
							className="form-control"
							value={this.state.email}
							onChange={this.update}
							name="email"
						/>
					</div>

					<div className="form-group">
						<input
							type="password"
							className="form-control"
							placeholder="Password..."
							value={this.state.password}
							onChange={this.update}
							name="password"
						/>
					</div>
					<div className="USER">
						<button type="submit" className="btn btn-primary">
							LOGIN
                  </button>
					</div>

				</form>
				<div className="top">
					< Link to="/register">Create an account</Link>
				</div>
			</div>
		);
	}
}

export default Login;
