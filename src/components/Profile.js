import React, { Component , Fragment } from 'react'
import { Query } from 'react-apollo'
import { AUTH_TOKEN } from '../constant';
import Link  from "./Link"
import { timeDifferenceForDate } from '../utils';
import gql from "graphql-tag";


export const USER_QUERY = gql`
  query UserQuery {
    user {
      name
      email
    }
  }
`
export const LINKS_BY_USER = gql`
  query LinksByUser{
      linksByUser{
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
    }
  }
`

class Profile extends Component {
    render(){
        const auth_token = localStorage.getItem(AUTH_TOKEN)
        return(
            <Fragment>


                
                <Query query = { USER_QUERY }  >
                {( {loading, error, data  }) => {
                    if(loading) return <div>Fetching</div>
                    if(error) return <div> Error</div>
                    return(
                    <Fragment>
                        <div className = "flex mt2 items-start">

                            <div className = "flex items-center">
                                { auth_token && ( <div>
                                    Welcome !! 
                                    {data.user.name}{'. email - '}
                                    {data.user.email}
                                    </div>
                                ) }
            

                            </div>

                            <div className ="ml1">
                            </div>

                        </div>
                    </Fragment>
                    )
                }}
                </Query>
                <br />
                <p >Posts by user</p> 

                <Query query = {LINKS_BY_USER} >
                    {({loading,error,data}) => {
                            if(loading) return <div>Fetching</div>
                            if(error) return <div> Error</div>
                            return(
                                <div>
                                    {data.linksByUser.map( (link) => (
                                    < Link 
                                        key ={link.id} 
                                        link = {link} 
                                        />
                                        ))}
                                </div>
                            )
                   }}

                </Query>

            </Fragment>
        )
    }
}

export default Profile