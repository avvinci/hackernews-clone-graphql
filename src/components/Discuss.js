import React, { Component , Fragment } from "react"
import MyLink  from "./MyLink"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import {LINKS_PER_PAGE} from "../constant"

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip:Int, $orderBy: LinkOrderByInput ){
    feed(first : $first, skip: $skip, orderBy: $orderBy ) {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      count
    }
  }
`

class LinkList extends Component {

    _getQueryVariables = () => {
        const isNewPage  = this.props.location.pathname.includes('new')
        const page = parseInt(this.props.match.params.page,10)

        const skip = isNewPage ?  (page-1) * LINKS_PER_PAGE : 0
        const first = isNewPage ?  LINKS_PER_PAGE : 100
        const orderBy = isNewPage ?  'createdAt_DESC' : null
        return {first, skip, orderBy} 
    }



    render(){ 
          return(
              <Query query = { FEED_QUERY } variables = {this._getQueryVariables() } >
                {( {loading, error, data  }) => {
                  if(loading) return <div>Fetching</div>
                  if(error) return <div> Error</div>
                  
                  const linksToRender = data.feed.links
                  const pageIndex = this.props.match.params.id 

                  return(
                    <Fragment>
                        Discussion on Post : 
                        {pageIndex} 
                        <br />
                    {linksToRender.map( (link, index) => (
                    < MyLink 
                        key ={link.id} 
                        link = {link} 
                        index ={index + pageIndex} 
                        />
                        ))}
                    
                    <form class="pa4 black-80">
                        <div>
                            <label for="comment" class="f6 b db mb2">Add Comments <span class="normal black-60">(optional)</span></label>
                            <textarea id="comment" name="comment" class="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
                        </div>
                    </form>
                    </Fragment>
                  )
                }}
              </Query>
       
          )
    }

    
}

export default LinkList ; 