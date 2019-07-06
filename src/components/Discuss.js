import React, { Component, Fragment } from "react"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';

const  COMMENT_MUTATION = gql`
mutation CommentMutation($text: String!, $linkId: ID!) {
    comment(text :$text, linkId: $linkId){
      postedBy{
          name
      }
      link{
          description
      }      
    }   
  }
`

const COMMENTS_ON_LINK = gql`
  query CommentsonLink($linkId: ID! ){
    commentsOnLink(linkId : $linkId ) {
      text
    }
  }
`
const COMMENTS = gql`
  query Comments{
    comments{
      text
      postedBy{
        name
      }
    }
  }
`

class Discuss extends Component {
  state = {
    linkId: '',
    linkName: '',
    text : '',
  }

  componentDidMount(){
      const { linkId , linkName }  = this.props.location.state 
      this.setState({linkId : linkId })
      this.setState({linkName: linkName})

    }

    _getQueryVariables = () => {
      const linkId = this.state.linkId
      return { linkId }
  }

    render(){ 
      const {text, linkId ,linkName } =  this.state 
      console.log(linkId)
      console.log(linkName)


      return(
        <Fragment> 

          <Query query = { COMMENTS }>
            {( {loading, error, data  }) => {
              if(loading) return <div>Fetching</div>
              if(error) return <div>   {`Error!:   ${error}`} </div>
              // const pageIndex = this.props.match.params.id 

              return(
                <Fragment>
                     <div className = "font-weight-bold"> Comments :  </div>  <br />
                    {data.comments.map(comment => (
                      <div> {comment.text} - {comment.postedBy.name} </div>
                    ))}
                    Discussion on Post : {this.state.linkId}  {' '} 
                    <br />

                </Fragment>
              )
            }}
          </Query>


          <Query query = { COMMENTS_ON_LINK }    variables = {{linkId : this.state.linkId }} >
            {( {loading, error, data  }) => {
              if(loading) return <div>Fetching</div>
              if(error) return <div>   {`Error!:   ${error}`} </div>
              // const pageIndex = this.props.match.params.id 

              return(
                <Fragment>
                    Comments : <br /> 
                    {data.commentsOnLink.map(comment => (
                      <div> {comment.text}  </div>
                    ))}
                    Discussion on Post : {this.state.linkId}  {' '} 
                    <br />
                   
                </Fragment>
              )
            }}
          </Query>
          
          <div className="d-flex flex-column  bd-highlight mb-3">
                      <form class="p-2 bd-highlight">
                          <div>
                              <label for="comment" class="f6 b db mb2">
                                Add Comments </label>
                              <textarea id="comment" name="comment" 
                               onChange = { e => this.setState({text: e.target.value})}
                              class=" w-100" 
                              aria-describedby="comment-desc"></textarea>
                          </div>
                      </form>
                    <Mutation
                        mutation = {COMMENT_MUTATION} 
                        variables = { {text, linkId }}
                      >
                                        
                    { mutation =>  < button  className="p-2 bd-highlight btn btn-dark" 
                      onClick = {mutation} >Submit</button> }

                    </Mutation>

                </div>
        </Fragment>
       
      )
    }
}

export default Discuss 