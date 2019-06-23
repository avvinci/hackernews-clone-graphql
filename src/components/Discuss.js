import React, { Component , Fragment } from "react"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';

const  COMMENT_MUTATION = gql`
mutation CommentMutation($text: String!, $linkId: String!) {
    comment(text :$text , linkId: $linkId){
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
  query CommentsonLink($linkId: String ){
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
  }

  componentDidMount(){
      const { linkId }  = this.props.location.state 
      this.setState({linkId : linkId })

    }

    render(){ 
      const {text, linkId } =  this.state 
      console.log(linkId)

      return(
        <Fragment> 

          <Query query = { COMMENTS }>
            {( {loading, error, data  }) => {
              if(loading) return <div>Fetching</div>
              if(error) return <div>   {`Error!:   ${error}`} </div>
              // const pageIndex = this.props.match.params.id 

              return(
                <Fragment>
                    Comments : <br />
                    {data.comments.map(comment => (
                      <div> {comment.text} - {comment.postedBy.name} </div>
                    ))}
                    Discussion on Post : {this.state.linkId}  {' '} 
                    <br />
                   
                </Fragment>
              )
            }}
          </Query>


          <Query query = { COMMENTS_ON_LINK } variables = { {linkId :  this.state.linkId } }>
            {( {loading, error, data  }) => {
              if(loading) return <div>Fetching</div>
              if(error) return <div>   {`Error!:   ${error}`} </div>
              // const pageIndex = this.props.match.params.id 

              return(
                <Fragment>
                    Comments : <br />
                    {data.comments.map(comment => (
                      <div> {comment.text} - {comment.postedBy.name} </div>
                    ))}
                    Discussion on Post : {this.state.linkId}  {' '} 
                    <br />
                   
                </Fragment>
              )
            }}
          </Query>
          
          <div className="flex mt3">
                      <form class="pa4 black-80">
                          <div>
                              <label for="comment" class="f6 b db mb2">Add Comments <span class="normal black-60">(optional)</span></label>
                              <textarea id="comment" name="comment" 
                               onChange = { e => this.setState({text: e.target.value})}
                              class="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
                          </div>
                      </form>
                    <Mutation
                        mutation = {COMMENT_MUTATION} 
                        variables = { {text, linkId }}
                      >
                                        
                    { mutation =>  < button  className="pointer mr2 button" onClick = {mutation} >Submit</button> }

                    </Mutation>

                </div>
        </Fragment>
       
      )
    }
}

export default Discuss 