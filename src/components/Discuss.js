import React, { Component , Fragment } from "react"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';


const COMMENTS_ON_LINK = gql`
  query CommentsonLink($linkId: String ){
    commentsOnLink(linkId : $linkId ) {
      text
    }
  }
`

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

class Discuss extends Component {
  state = {
    linkId: '',
    text : '',
  }
    componentDidMount(){
      const { linkId }  = this.props.location.state 
      this.setState({linkId : linkId })

    }

    render(){ 
      const {text , linkId }=  this.state 
      console.log(linkId)

      return(
        <Fragment> 

          {/* <Query query = { COMMENTS_ON_LINK }  variables = { {linkId} }  >
            {( {loading, error, data  }) => {
              if(loading) return <div>Fetching</div>
              if(error) return <div>   {`Error!:   ${error}`} </div>
              // const pageIndex = this.props.match.params.id 

              return(
                <Fragment>
                    Discussion on Post : {this.state.myLink}  {' '} 
                    <br />
                   
                </Fragment>
              )
            }}
          </Query>
           */}
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
                                        
                    { postMutation =>  < button onClick = {postMutation} >Submit</button> }

                    </Mutation>

                </div>
        </Fragment>
       
      )
    }
}

export default Discuss 