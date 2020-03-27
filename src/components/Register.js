import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import fire from '../config/fire';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nombre: '',
			apellido: '',
			usuario: '',
			password: '',
			password1: '',
			alert: false,
			alertData: {}
		};

		this.update = this.update.bind(this);

		this.displayLogin = this.displayLogin.bind(this);
	}
	
	showAlert(type, message) {
		this.setState({
			alert: true,
			alertData: { type, message }
		});
		setTimeout(() => {
			this.setState({ alert: false });
		}, 2000)
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

		const params = {
			nombre: this.state.nombre,
			apellido: this.state.apellido,
			usuario: this.state.usuario,
			password: this.state.password
		};

		if (params.nombre && params.apellido && params.usuario && params.password) {
			if (this.state.password === this.state.password1) {
				
				
				fire.auth().createUserWithEmailAndPassword(params.usuario, params.password)
					.then((u) => {
				
						const db = fire.firestore();
						if (db.collection("user").add({nombre: params.nombre,apellido:params.apellido,usuario:params.usuario,password:params.password})) {
							this.showAlert('success', 'Your message was sent successfull');
							this.setState({
								nombre: '',
								apellido: '',
								usuario: '',
								password: '',
								password1: ''
							});
						}else{
							this.showAlert('danger', 'mensage no registrado');
						}

					})
					.catch((err) => {
						this.showAlert('danger','Error: ' + err.toString());
					})

				
				
			

			} else {
				alert("Contraseña incorrcta");
				this.setState({
					password: '',
					password1: ''
				});
			}
		} else {
			// En caso de no llenar los elementos necesario despliega un mensaje de alerta
			this.showAlert('warning', 'Please fill the form');
		};


	}

	componentDidMount(){

	}

	

	render() {
		return (

			<div className="register">
				{this.state.alert && <div className={`alert alert-${this.state.alertData.type}`} role='alert'>
					<div className='container'>
						{this.state.alertData.message}
					</div>
				</div>}
				<form onSubmit={this.displayLogin}>
					<h2 className="center">SINGUP</h2>

					<div className="form-group">
						<input
							type="text"
							placeholder="Nombre"
							name="nombre"
							value={this.state.nombre}
							onChange={this.update}
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							placeholder="Apellido"
							name="apellido"
							value={this.state.apellido}
							onChange={this.update}
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							placeholder="Correo"
							name="usuario"
							value={this.state.usuario}
							onChange={this.update}
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<input
							type="password"
							placeholder="Contraseña"
							name="password"
							value={this.state.password}
							onChange={this.update}
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<input value={this.state.password1}
							onChange={this.update}
							type="password"
							className="form-control"
							placeholder="Confirmar Contraseña"
							name="password1" />
					</div>

					<div className="USER">
						<button type="submit" className="btn btn-primary">
							LOGIN
                  </button>
					</div>
				</form>
				<div className="top">
					< Link to="/auth">Login Here</Link>
				</div>
				
			</div>
		);
	}
}

export default Register;
