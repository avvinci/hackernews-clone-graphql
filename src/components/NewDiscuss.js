import React, { Component, Fragment } from "react"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const COMMENTS_ON_LINK = gql`
  query CommentsonLink($linkId: ID! ){
    commentsOnLink(linkId : $linkId ) {
      text
    }
  }
`

class NewDiscuss extends Component {
  state = {
    link: null,
    linkName: '',
    text : '',
  }

  componentDidMount(){
    const { id } = this.props.match.params
      console.log(id)
      this.setState({link : id })
    }


    render(){ 
    //   const {text, linkId ,linkName } =  this.state 
      console.log(this.state.link)
    //   console.log(linkName)

      return(
                // <div> Comments</div>
          <Query query = { COMMENTS_ON_LINK }    variables = {{linkId : this.state.link }} >
            {( {loading, error, data  }) => {
              if(loading) return <div>Fetching</div>
              if(error) return <div>   {`Error!:   ${error}`} </div>
              // const pageIndex = this.props.match.params.id 
              return(
                <Fragment>
                    Comments : <br /> 
                    {data.commentsOnLink.map(comment => (
                      <div> {comment.text} </div>
                    ))}
                    Discussion on Post : {this.state.linkId}  {' '} 
                    <br />
                </Fragment>
              )
            }}
          </Query>
          
      )}
}

export default NewDiscuss 