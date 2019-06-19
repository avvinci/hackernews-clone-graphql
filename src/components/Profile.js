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
        url
        description
    }
  }
`
export const UPVOTED_LINKS_BY_USER = gql`
  query UpvotedLinksByUser{
	upvotedLinksByUser{
        id
        link{
          description
          url
        }
      }
  }
`

export const COMMENTS_BY_USER = gql`
  query CommentsByUser{
    commentsByUser {
        link{
            description
            url
        }
        text    
    }
  }
`


class Profile extends Component {
    render(){
        const auth_token = localStorage.getItem(AUTH_TOKEN)
        let global_user = ""
        return(
            <Fragment> 
                <Query query = { USER_QUERY }  >
                    {( {loading, error, data  }) => {
                        if(loading) return <div>Getting data...</div>
                        if(error) return <div> Error</div>
                        global_user = data.user.name 
                        return(
                            <Fragment>
                                <div className = "flex mt2 items-start">
                                    <div className = "flex items-center">
                                        { auth_token && ( <div>
                                            { 'Welcome!! ' + global_user}
                                            <br />                                    
                                            {' Email - ' + data.user.email}
                                            </div>)}
                                    </div>
                                </div>

                            </Fragment>
                        )
                    }}
                </Query>
              
                <Query query = {LINKS_BY_USER} >
                    {({loading,error,data}) => {
                        if(loading) return <div>Getting data...</div>
                        if(error) return <div> Error</div>
                        return(
                            <div>
                                <br />  
                                <p >Posts by {global_user}</p> 
                                <hr />
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

                <Query query = {UPVOTED_LINKS_BY_USER} >
                    {({loading,error,data}) => {
                        if(loading) return <div>Getting data...</div>
                        if(error) return <div> Error</div>
                        return(
                            <div>
                                <br /> 
                                <p >Upvotes by {global_user}</p>
                                <hr /> 
                                {data.upvotedLinksByUser.map( (vote ,index ) => (
                                    <div className = "flex mt2 items-start">
                                        <div className = "flex items-center">
                                            <span className ="gray">  {index + 1}.</span>
                                        </div>
                                        <div className ="ml1">
                                                {vote.link.description} ({vote.link.url})
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    }}
                </Query>

                <Query query = {COMMENTS_BY_USER}  >
                    {({loading,error,data}) => {
                        if(loading) return <div>Getting data...</div>
                        if(error) return <div> Error</div>
                        return(
                            <div>
                                <br /> 
                                <p >Comments by {global_user}</p>
                                <hr /> 
                                {data.commentsByUser.map( (comment ,index ) => (
                                    <div>
                                        <div className = "flex mt2 items-start">
                                            <div className = "flex items-center">
                                                <span className ="gray">  {index + 1}.</span>
                                            </div>
                                            <div className ="ml1">
                                                    {comment.link.description} ({comment.link.url})
                                            </div>

                                        </div>
                                        <div className = "flex mt2 items-start">
                                            <div className ="ml1">
                                                   {'- '} {comment.text}
                                            </div>
                                            
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