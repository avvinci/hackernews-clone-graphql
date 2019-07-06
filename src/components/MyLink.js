import React , { Component } from 'react'
import { AUTH_TOKEN } from '../constant';
import { timeDifferenceForDate } from '../utils';
import { Mutation } from 'react-apollo'
import gql from "graphql-tag";
import { Link } from 'react-router-dom'


const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId : ID!) {
        vote(linkId : $linkId){
            id
            link {
               votes {
                   id
                    user {
                       id
                    }
               }
            }
            user {
                id
            }
        }
    }
`

class MyLink extends Component {
    render(){
        const auth_token = localStorage.getItem(AUTH_TOKEN)
        let discussLink = `/discuss/${this.props.index+1}`
        return (
            <div className = "flex mt2 items-start">

                <div className = "flex items-center">
                    <span className ="gray">  {this.props.index + 1}.</span>
                    { auth_token && (
                        <Mutation
                         mutation = {VOTE_MUTATION} 
                         variables = {{linkId : this.props.link.id }}
                         update = { (store, {data: {vote}}) =>
                             this.props.updateStoreAfterVote(store, vote , this.props.link.id)
                         }
                         >
                        { voteMutation => (
                                <div className ="ml1 gray f11" onClick = { voteMutation }> ▲</div> )}
                    </Mutation>
                    )}
                </div>

                <div className ="ml1">
                    <div>
                        {this.props.link.description} ({this.props.link.url})
                    </div>
                    <div className ="f6 lh-copy gray">
                        {this.props.link.votes.length} votes | {' '}
                        {this.props.postedBy ? this.props.postedBy.name : 'Unknown'}
                        {' '}
                        {timeDifferenceForDate(this.props.link.createdAt)}
                        {' '} | {' '}
                        <Link to = {{
                            pathname:  discussLink ,
                            state : {
                                linkId: this.props.link.id,
                                linkName: this.props.link.description,
                            }
                            }} className = "ml1 no-underline gray" > discuss </Link>

                                <Link to={{ 
                                pathname: `/nd/${this.props.link.id}`, 
                                query: {
                                    link: (this.props.link.id)
                                } 
                                }}>  New discuss</Link>
                    </div>
                    
                </div>

            </div>
        )
    }
}

export default MyLink