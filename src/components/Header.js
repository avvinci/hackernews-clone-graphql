import React , { Component } from 'react' 
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router'
import  {AUTH_TOKEN} from '../constant'

class Header extends Component { 
    render(){
        const authtoken = localStorage.getItem(AUTH_TOKEN)

        return (
            <div className="flex pal justify-between nowrap orange">
                <div className="flex flex-fixed black">
                    <div className="fw7 mr1"> Hacker News </div>
                    <Link to = "/" className = "ml1 no-underline black" > new </Link>
                    <div className="ml1"> | </div>
                    <Link to = "/top" className = "ml1 no-underline black" > top </Link>
                    <div className="ml1"> | </div>
                    <Link to="/search" className = "ml1 no-underline black"> search </Link>   
                  
                    {authtoken && (
                        <div className = "flex"> 
                            <div className="ml1"> | </div>
                            <Link to="/create" className = "ml1 no-underline black"> submit </Link> 
                        </div>
                    )}
                    <div className="ml1"> | </div>
                    <Link to="/profile" className = "ml1 no-underline black"> profile </Link>                     
                    
                </div>

                <div className = "flex flex-fixed">
                    { authtoken ?
                            ( <div>
                               
                                <div
                                    className = " flex ml1 pointer black"
                                    onClick = { () => {
                                        localStorage.removeItem(AUTH_TOKEN)
                                        this.props.history.push('/')
                                    }}
                                    > 
                                    logout
                                </div>
                             </div>
                        )
                        :  
                        (<Link to="/login" className = "ml1 no-underline black"> Login </Link>) 
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Header)