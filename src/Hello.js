import React from 'react';
import ReactDOM from 'react-dom';


const users = [
	{id: 1, name:'Jacky', email: 'jacky@gmail.com'},
	{id: 2, name:'Tom', email: 'tom@gmail.com'},
	{id: 3, name:'Henry', email: 'henry@gmail.com'},
	{id: 4, name:'Kim', email: 'kim@gmail.com'},
	{id: 5, name:'Abidon', email: 'abidon@gmail.com'},
	{id: 6, name:'Huska', email: 'huska@gmail.com'},
	{id: 7, name:'Mic', email: 'mic@gmail.com'},
]

class UserItem extends React.Component{
	onButtonClick(e){
		this.props.deleteHandler(this.props.name);
	}

	render(){
		let style = {
			width: 70,
			display: 'inline-block'
		}
		return (
			<li>
				<strong style={style} >{this.props.name}</strong> - <em>{this.props.email}</em>
				<button onClick={this.onButtonClick.bind(this)}>Delete</button>
			</li>
		)
	}
}

class UserList extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			users: users
		}
	}

	deleteUser(name){
		console.log(name)
		let newUsers = this.state.users.filter(user => user.name !== name)
		this.setState({
			users: newUsers
		})
	}

	render(){
		let renderList = this.state.users.map(user => <UserItem key={user.id} name={user.name} email={user.email} deleteHandler={this.deleteUser.bind(this)} />)
		return(
			<ul>{renderList}</ul>
		)
	}
}


class Demo extends React.Component {

	constructor(props){
        super(props);
        this.state = {
            resultInput: ''
        };
    }

	handleSubmit(e){
        e.preventDefault();
        this.setState({
            resultInput: this.myInput.value
        })
    }

    handleOnClick(){
    	this.setState({
            resultInput: this.myInput.value
        })
    }

    handleOnChange(e){
    	this.myInput = e.target;
    	this.setState({
    		resultInput: e.target.value
    	})
    }

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" onChange={this.handleOnChange.bind(this)} />
                    <button onClick={this.handleOnClick.bind(this)}>Click me</button>
                    <p>{this.state.resultInput}</p>
                </form>
                <UserList users={users} />
			</div>
			
		)
	}
}



export default Demo;