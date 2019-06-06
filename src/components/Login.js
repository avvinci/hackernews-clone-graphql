import React , { Component } from 'react'
import { AUTH_TOKEN } from '../constant'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'



const SIGNUP_MUTATION = gql`
mutation SignupMutation($email: String!, $password: String!, $name: String!) {
        signup (email :$email , password: $password, name : $name ) {
            token
        }   
    }
`


const  LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!) {
        login (email :$email , password: $password){
            token
        }   
    }
`


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
                    <Mutation
                        mutation = { login ? LOGIN_MUTATION:SIGNUP_MUTATION}
                        variables = { {name, email, password}}
                        onCompleted = { data => this._confirm(data)}
                        >
                        {mutation => (
                            <div className ="pointer mr2 button" onClick = {mutation }>
                                {login ? 'login': 'Create account'}
                            </div>
                        )}
                    </Mutation>

                    <div className ="pointer  button"
                        onClick = {() => this.setState({login: !login})}
                    >
                        {login ? 'need to create a account ?': 'already have a account?'}
                    </div>

                </div>


            </div>
        )
    }

    _confirm = async data =>{
        const {token} = this.state.login ? data.login : data.signup
        this._saveUserData(token)
        this.props.history.push('/')
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}


export default Login 