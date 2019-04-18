import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getData } from './services/getData';
import insertData from './services/insertData';
import updateData from './services/updateData';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            records: [],
            index: 0,
            editMode: false,
            firstname: '',
            lastname: ''
        }
        this.handleData = this.handleData.bind(this);
        this.handleOnEditClick = this.handleOnEditClick.bind(this);
        this.handleOnDeleteClick = this.handleOnDeleteClick.bind(this);
        this.handleOnUpdate = this.handleOnUpdate.bind(this);
        this.insertUserCallback = this.insertUserCallback.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.insertUserCallback = this.insertUserCallback.bind(this);
    }
    componentWillMount() {
        getData(this.handleData);
    }
    handleData(response) {
        let allRecords = Array.from(response)
        this.setState({
            records: allRecords
        })
    }
    handleOnInputChange(evt){
        let records = this.state.records;
        records[evt.target.name] = evt.target.value 
        this.setState({
            records: records
        })
    }
    handleOnEditClick(index) {
        let recordToUpdate = this.state.records;
        let firstNameInputTag = document.getElementById('firstName');
        let lastNameInputTag = document.getElementById('lastName');
        firstNameInputTag.value = recordToUpdate[index].first_name;
        lastNameInputTag.value = recordToUpdate[index].last_name;
        this.setState({
            index: index,
            editMode: true
        })
    }
    insertUserCallback(response){
        if(response.status === 201){
            let firstName = document.getElementById('firstName').value;
            let lastName = document.getElementById('lastName').value;
            let id= this.state.records[this.state.records.length-1].id + 1;
            let records= [...this.state.records,{id: id, first_name: firstName,last_name: lastName}]
            this.setState({
                records: records
            })
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
        }

    }
    updateCallback(response){
        debugger;
        if(response.status === 201){
            alert('record updated');
        }
    }
    handleOnUpdate = event => {
        event.preventDefault();
        let records = this.state.records;
        if(!this.state.editMode){
            let firstName = document.getElementById('firstName').value;
            let lastName = document.getElementById('lastName').value;
            if(firstName !== "" && lastName !==""){
                insertData(this.state, this.insertUserCallback)
            }
            else{
                alert("Insert some data");
            }
        }
        else{
            let firstName = document.getElementById('firstName').value;
            let lastName = document.getElementById('lastName').value;
            records[this.state.index].first_name = firstName;
            records[this.state.index].last_name = lastName;
            this.setState({
                records: records,
                editMode: false
            })
            updateData(this.state.records[this.state.index], this.updateCallback);

            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
        }
        
    }
    handleOnDeleteClick(index){
        let records = this.state.records;
        records.splice(index,1);
         this.setState({
            records: records
        })
    }

    render() {
        const auth = this.props.location.state;
        let allRecords = this.state.records;
        if (!auth) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div className="container">
                <h1> Welcome to Home </h1>
                <label>First Name: </label>
                <input id="firstName" type="text" name="first_name" placeholder="first name" onChange={this.handleOnInputChange} />
                <input id="lastName" type="text" name="last_name" placeholder="last name" onChange={this.handleOnInputChange} />
                <button onClick={this.handleOnUpdate}>{this.state.editMode ? 'Update Record' : 'Add New Record'}</button>
                {allRecords.map((record, index) =>
                    <div key={index}>
                        <h1>{record.first_name} {record.last_name}</h1>
                        <img src={record.avtar} alt="avtar" style={{height: 100, widht: 100}} />
                        <button onClick={(e) => this.handleOnEditClick(index)}>Edit</button>
                        <button onClick={(e) => this.handleOnDeleteClick(index)} >Delete</button>
                    </div>)}
                
            </div>
        )
    }
}
export default Home; 