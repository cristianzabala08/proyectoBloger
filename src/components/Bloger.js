import React, { useState, useEffect } from 'react';
import "./Bloger.css";
import fire from '../config/fire';
import exerciseImg from './nueva.png'
import { Button, Row, Form, Col } from 'react-bootstrap';
import FileUpload from './FileUpload'


const Bloger = ({ email }) => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setnewTask] = useState('');
    const [newTask1, setnewTask1] = useState('');
    const [comentario, setcomentario] = useState('');
    const [leftColor, setleftColor] = useState('');
    const [rightColor, setrighColor] = useState('');
    const [gusto1, setgusto1] = useState('');
    const [gusto2, setgusto2] = useState('');
    const [facebook, setfacebook] = useState('');
    const [instagram, setinstagram] = useState('');


    useEffect(() => {

        const fetchData = async () => {
            const db = fire.firestore();
            db.collection('tasks').where('email', '==', email)
                .onSnapshot(function (data) {

                    setTasks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                });
        }
        fetchData();

    }, []);

    const onCreate = () => {

        setnewTask(' ');
        setnewTask1(' ');
        setcomentario(' ');
        setgusto1(' ');
        setgusto2(' ');
        setfacebook(' ');
        setinstagram(' ');

    };

    function onDelete(id, email1, url) {
        if (email === email1) {
            if (window.confirm("SEGURO QUE QUIERES ELIMINAR SU POST")) {

                const db = fire.firestore()
                db.collection('tasks').doc(id).delete()

                let storageRef = fire.storage();
                let desertRef = storageRef.refFromURL(url)

                desertRef.delete().then(function () {

                }).catch(function (error) {

                });
            }

        } else {
            alert('esta publicacion no fue agregada desde su correo')
        }

    }
    const singout = () => {
        fire.auth().signOut();
    }

    return (
        <div>
            <div >
                <nav className="navbar navbar-light bg-primary">
                    <a className="navbar-brand">
                        <img src="https://firebasestorage.googleapis.com/v0/b/tutoriales-e4830.appspot.com/o/exercise.png?alt=media&token=b9c4b236-16a9-4a56-bba2-90c9660a0f06" width="30" height="30" className="d-inline-block align-top" alt="" />
                        Welcome to our web page port your profile
                    </a>
                    <Button className="btn btn-default" variant="primary" onClick={singout} >
                        LOG OUT </Button>
                </nav>
            </div>

            <Row>
                <Col>
                    <div className="col text-center">
                        <h2>ADD YOUR NEW POST</h2>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        value={newTask} onChange={e => setnewTask(e.target.value)}
                                        placeholder="Nombre" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Apodo</Form.Label>
                                    <Form.Control type="text"
                                        value={newTask1} onChange={e => setnewTask1(e.target.value)}
                                        placeholder="Apodo" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Gusto</Form.Label>
                                    <Form.Control type="text"
                                        value={gusto1} onChange={e => setgusto1(e.target.value)}
                                        placeholder="gusto" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Otro Gusto</Form.Label>
                                    <Form.Control type="text"
                                        value={gusto2} onChange={e => setgusto2(e.target.value)}
                                        placeholder="Otro gusto" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>facebook link</Form.Label>
                                    <Form.Control type="text"
                                        value={facebook} onChange={e => setfacebook(e.target.value)}
                                        placeholder="facebook" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>instagram link</Form.Label>
                                    <Form.Control type="text"
                                        value={instagram} onChange={e => setinstagram(e.target.value)}
                                        placeholder="instagram" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Comentario</Form.Label>
                                <Form.Control as="textarea" rows="3"
                                    value={comentario} onChange={e => setcomentario(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Row className="form-row align-items-center">
                                <Form.Group controlId="color1">
                                    <Form.Label className="mr-sm-2">Primer color</Form.Label>
                                    <Form.Control as="select" value={leftColor} onChange={e => setleftColor(e.target.value)}>
                                        <option value="red" >red</option>
                                        <option value="black" >black</option>
                                        <option value="blue" >blue</option>
                                        <option value="yellow" >yellow</option>
                                        <option value="white" >white</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="color2">
                                    <Form.Label className="mr-sm-2">Primer color</Form.Label>
                                    <Form.Control as="select" value={rightColor} onChange={e => setrighColor(e.target.value)}>
                                        <option value="red">red</option>
                                        <option value="black" >black</option>
                                        <option value="blue" >blue</option>
                                        <option value="yellow" >yellow</option>
                                        <option value="white" >white</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <FileUpload
                                onCreate={onCreate}
                                newTask={newTask}
                                newTask1={newTask1}
                                comentario={comentario}
                                leftColor={leftColor}
                                rightColor={rightColor}
                                gusto1={gusto1}
                                gusto2={gusto2}
                                facebook={facebook}
                                instagram={instagram}
                                email={email}

                            />
                        </Form>
                    </div>
                </Col>
            </Row>
            {/*     {tasks.map(spell => (
                <div className="card mx-auto Fitness-Card"
                    style={{
                        backgroundImage: `url(${exerciseImg}), linear-gradient(to right, ${spell.color || '#56CCF2'}  , ${spell.color1 || '#2F80ED'}) `
                    }}
                    key={spell.id}
                >
                    <div className="card text-white bg-dark mb-3 boder" key={spell.id}>
                        <img className="card-img-top pequeña" src={spell.codigo || exerciseImg} alt="Card cap" />
                        <div className="card-body ">
                            <h5 className="card-title">{spell.name}</h5>
                            <p className="card-text">{spell.comentario}
                            </p>
                        </div>
                        <ul className="list-group list-group-flush  text-primary">
                            <li className="list-group-item">{spell.name1}</li>
                            <li className="list-group-item">{spell.gusto1}</li>
                            <li className="list-group-item">{spell.gusto2}</li>
                        </ul>
                        <div className="card-body">
                            <a href={spell.facebook} className="card-link">Facebook</a>
                            <a href={spell.instagram} className="card-link">Instagrams</a>
                        </div>
                        <Button className="btn btn-default" variant="danger" onClick={() => onDelete(spell.id, spell.email,spell.codigo)} >
                            Delet</Button>
                    </div>
                </div>
            ))} */}


            {tasks.map(spell => (
                <div className="card mx-auto Fitness-Card"
                    style={{
                        backgroundImage: `url(${exerciseImg}), linear-gradient(to right, ${spell.color || '#56CCF2'}  , ${spell.color1 || '#2F80ED'}) `
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
                    <Button className="btn btn-default" variant="danger" onClick={() => onDelete(spell.id, spell.email,spell.codigo)} >
                            Delet</Button>
                   
                </div>



            ))}

        </div>
    );
}

export default Bloger;
