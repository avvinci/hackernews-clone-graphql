import React from 'react';
import axios from 'axios';
import { gql, graphql } from 'react-apollo';


class Upload extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      name: '',
      file: null,
      fileInfo: null,
    };
    // this._onButtonClick = this._onButtonClick.bind(this);
  }

  onChange = e => {
    let f = e.target.files[0] 
    this.setState({file: e.target.files[0] }) 
    this.setState( { fileInfo: URL.createObjectURL(e.target.files[0]) })
  }


  submit = async () => {
    const { name, file } = this.state;

    const formData = new FormData();
    const cloud = process.env.CLOUD_NAME
    formData.append('file', file);
    // process.env.REACT_APP_UPLOAD_PRESET
    formData.append('upload_preset', '');

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1//image/upload`,
      formData,
    );
    this.setState({showComponent:true})
 
   
    console.log(' upload successful :) ')
    // const graphqlResponse = await this.props.mutate({
    //   variables: {
    //     name,
    //     publicId: response.data.public_id,
    //   },
    // });

    // this.props.history.push(`/champion/${graphqlResponse.data.createChampion.id}`);
  };



  render() {
    var span = document.createElement('span');
    return (
      <div>
        
        <h4> Upload your profile picture </h4>
          <input type='file' id='single' onChange={this.onChange} /> 
          <button onClick={this.submit}>Submit</button>
          <div >
            <img  style = {{ height:`245px`,  alignContent : 'center',
              border: `1px solid #000`, margin: `10px 5px 0 0`, position: `relative`}}
              src = {this.state.file ? this.state.fileInfo : ''}
              />
          </div>

          {this.state.showComponent ?
            <div class="alert alert-primary" role="alert">
                upload successful :)
            </div> :
           null
        }

 
   


      </div>
    );
  }
}

// const CreateChampionMutation = gql`
//   mutation($name: String!, $publicId: String!) {
//     createChampion(name: $name, publicId: $publicId) {
//       id
//     }
//   }
// `;

// export default graphql(CreateChampionMutation)(Upload);

export default Upload