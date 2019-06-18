import React, { Component , Fragment } from 'react'
import { Query } from 'react-apollo'
import { AUTH_TOKEN } from '../constant';
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

class Profile extends Component {
    render(){
        const auth_token = localStorage.getItem(AUTH_TOKEN)
        return(
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
        )
    }
}

export default Profile