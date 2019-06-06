import React , { Component } from 'react'
import { AUTH_TOKEN } from '../constant';
import { timeDifferenceForDate } from '../utils';

class Link extends Component {
    render(){
        const auth_token = localStorage.getItem(AUTH_TOKEN)
        return (
            <div className = "flex mt2 item-start">
                <div className = "flex item-center">
                    <span className ="gray">  {this.props.index + 1}.</span>
                    { auth_token && (
                        <div className ="ml1 gray f11"
                            onClick = { () => this._voteForLink() }
                        >▲</div>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default Link