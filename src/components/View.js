import React, { Component } from 'react';
import fire from '../config/fire';
import "./View.css";
import img from '../components/mas.png';
import { Link } from 'react-router-dom';


class View extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Todos: []
        };
        this.update = this.update();
    }

    update() {

        const db = fire.firestore();
        db.collection('tasks')
            .onSnapshot((data) => {
                console.log(data)
                //console.log((data.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
                this.setState({
                    Todos: (data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                })
                console.log(this.state.Todos)

            });

    }


    render() {


        return (
            <div >
                <h1>
                    Hello
                     </h1>
                <p>Let's workout to get someone gains !</p>
                <nav className="navbar navbar-light bg-primary">
                    <a className="navbar-brand" href=" ">
                        <img src="https://firebasestorage.googleapis.com/v0/b/tutoriales-e4830.appspot.com/o/exercise.png?alt=media&token=b9c4b236-16a9-4a56-bba2-90c9660a0f06" width="30" height="30" className="d-inline-block align-top" alt="" />
                            Welcome to our web page port your profile
                   </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        < Link to="/auth">
                            <img src={img} className="Fitness-Add" />
                        </Link>
                    </button>
                </nav>
                {this.state.Todos.map(spell => (
                    <div className="card mx-auto Fitness-Card "
                        style={{
                            backgroundImage: `url(${img}), linear-gradient(to right, ${spell.color || '#56CCF2'}  , ${spell.color1 || '#2F80ED'}) `
                        }}
                        key={spell.id}
                    >
                        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active arreglo">
                                    <img src={spell.codigo} className="d-block w-100" alt="..." />
                                    <div className="carousel-caption ">
                                        <div className="card-body ">
                                            <h5 style={{
                                                color: `${spell.color}`
                                            }} className="card-title">Name: {spell.name}</h5>
                                            <p className="card-text">Coment {spell.comentario}
                                            </p>
                                        </div>
                                        <p className="list-group" style={{
                                            color: `${spell.color1}`
                                        }}>
                                            <li>nickname: {spell.name1}</li>
                                            <li>what i like {spell.gusto1}</li>
                                            <li >{spell.gusto2}</li>
                                        </p>
                                        <div className="card-body">
                                            <a href={spell.facebook} className="card-link">Facebook</a>
                                            <a href={spell.instagram} className="card-link">Instagrams</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        )
    }
}

export default View; 