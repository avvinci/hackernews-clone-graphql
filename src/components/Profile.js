import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constant';
import { timeDifferenceForDate } from '../utils';
import {Mutation} from 'react-apollo'
import gql from "graphql-tag";



class Profile extends Component {
    render(){
        const auth_token = localStorage.getItem(AUTH_TOKEN)
        return (
            <div className = "flex mt2 items-start">

                <div className = "flex items-center">
                    { auth_token && (
                        'Welcome User'
                    )}
                </div>

                <div className ="ml1">
                </div>

            </div>
        )
    }
}

export default Profile