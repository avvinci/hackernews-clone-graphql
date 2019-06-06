import React , { Component } from 'react'
import { AUTH_TOKEN } from '../constant'

class Login extends Component{
    state = {
        login: true,
        name:'',
        email:'',
        password:'',
    }

    render(){
        const {login, name , email, password} = this.state

        return(
            <div>
                <h4 className="mv3">
                    {login ? 'Login': 'Sign Up'}
                </h4>
                <div className = "flex flex-column">
                    {!login && (
                    <input 
                        value = {name}
                        type ="text"
                        placeholder="Your name"
                        onChange = { (e) => this.setState({name: e.target.value})}
                        />
                    )}
                    <input 
                        value = {email}
                        type ="text"
                        placeholder="Enter email"
                        onChange = { (e) => this.setState({email: e.target.value})}
                    />
                    <input 
                        value = {password}
                        type ="password"
                        placeholder="Enter password"
                        onChange = { (e) => this.setState({password: e.target.value})}
                    />
                </div>

                <div className="flex mt3">
                    <div className ="pointer mr2 button"
                        onClick = { () => this._confirm() }
                    >
                        {login ? 'login': 'Create account'}
                    </div>
                    <div className ="pointer  button"
                        onClick = {() => this.setState({login: !login})}
                    >
                        {login ? 'need to create a account': 'already have a account?'}
                    </div>

                </div>


            </div>
        )
    }

    _confirm = async () =>{

    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}


export default Login 