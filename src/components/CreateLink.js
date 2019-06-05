import React , { Component } from 'react'

class CreateLink extends Component{

    state = {
        url :'',
        description:'',
    }

    render(){
        const {url , description} = this.state 
        return(
            <div>
                <div className="flex flex-column mt3" >
                    <input 
                        className = "mb2"
                        placeholder = "A description for link"
                        onChange = { e => this.setState({description: e.target.value})}
                        type = "text"
                        value = {description}
                    />
                    <input
                        className = "mb2"
                        placeholder = "A url for link"
                        onChange = { e => this.setState({url: e.target.value})}
                        type = "text"
                        value = {url}
                    />
                </div>
                < button onClick = {} >Submit</button>
            </div>
        )
    }
}

export default CreateLink