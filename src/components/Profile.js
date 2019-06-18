import React, { Component , Fragment } from 'react'
import { Query } from 'react-apollo'
import { AUTH_TOKEN } from '../constant';
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
                                    { 'Welcome!! '}
                                    {data.user.name}
                                    <br />                                    
                                    {' email - '} {data.user.email}
                                    </div>
                                ) }
                            </div>
                          
                            <p > 
                            <br />
                            <br />  
                            Posts by {data.user.name}</p> 
                            <hr />
                        </div>
                    </Fragment>
                    )
                }}
                </Query>
              

                <Query query = {LINKS_BY_USER} >
                    {({loading,error,data}) => {
                            if(loading) return <div>Fetching</div>
                            if(error) return <div> Error</div>
                            return(
                                <div>
                                    {data.linksByUser.map( (link ,index ) => (
                                     <div className = "flex mt2 items-start">
                                        <div className = "flex items-center">
                                            <span className ="gray">  {index + 1}.</span>
                                        </div>
                                        <div className ="ml1">
                                                {link.description} ({link.url})
                                        </div>
                                     </div>
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