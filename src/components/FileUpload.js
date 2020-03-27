import React, { Component } from 'react'
import fire from '../config/fire';
import { Button } from 'react-bootstrap';


class FileUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadValue: 0,
      codigo:''
    }
  }

 
  handleOnChange (e) {
    const file = e.target.files[0]
    const storageRef = fire.storage().ref(`pictures/${file.name}`)
    const task = storageRef.put(file)
    task.on('state_changed', (snapshot) =>{
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
            uploadValue:percentage
        })
    }, (error)=>{
        this.setState({
            message:`ha ocurrido un error: ${error.message}`
        })
    }, ()=>{
        this.setState({
           message:'archivo subido',
            
        })
        
        const storageReff = fire.storage().ref(`pictures`)
        // var forestRef = storageRef.child('goey120505.jpg');
     
         storageReff.child(file.name).getDownloadURL().then((url)=> {
         
             // `url` is the download URL for 'images/stars.jpg'
           
             // This can be downloaded directly:
             var xhr = new XMLHttpRequest();
             xhr.responseType = 'blob';
             xhr.onload = function(event) {
               
             };
             xhr.open('GET', url);
             xhr.send();
              this.setState({
                  codigo:url
              })
           }).catch(function(error) {
             // Handle any errors
     
             console.log(error.message)
           });
    })


  }

   todo = ()=>{
    const db = fire.firestore();
    if(this.state.message === 'archivo subido'){
        if (db.collection("tasks").add({
            name: this.props.newTask, name1: this.props.newTask1, comentario: this.props.comentario, color1: this.props.leftColor, color: this.props.rightColor
            , gusto1: this.props.gusto1, gusto2: this.props.gusto2, facebook: this.props.facebook, instagram: this.props.instagram, email: this.props.email,
            codigo:this.state.codigo
        })) {
            alert('Datos guardado')
      
        }
    }else{
        alert('esperando por le imagen gracias')
    }
    
   }
  render () {
    return (
      <div>
        <progress value={this.state.uploadValue} max='100'>
          {this.state.uploadValue} %
        </progress>
        <br />
        <input  className="btn btn-primary" type='file' onChange={this.handleOnChange.bind(this)}/>
        <br />
        {this.state.message}
        <br/>
        <Button className="btn btn-default" variant="primary"  onDoubleClick={this.props.onCreate} onClick={this.todo } >
                                ADD NEW POST</Button>
      </div>
    )
  }
}
export default FileUpload;