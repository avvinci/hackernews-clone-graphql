import React, { Component } from "react"
import { withApollo } from "react-apollo"
import  Link  from "./Link"

class Search extends Component{

    state = {
        filter:'',
        links: []
    }

    render(){
        return(
            <div>
                <div>
                    {/* Search */}
                    <input  type = "text"
                        onChange = {e => this.setState({filter:e.target.value })}/>
                    <button onClick = {() => this._executeSearch()}>search</button>
                </div>
                {this.state.links.map((link,index) => (
                        <Link key={link.id}  link={link} index = {index} /> 
                    ))}
            </div>
        )
    }
    _executeSearch = async () => {

    }
}

export default withApollo(Search)