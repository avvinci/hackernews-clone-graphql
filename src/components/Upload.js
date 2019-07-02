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
  }

  onChange = e => {
    let f = e.target.files[0] 
    this.setState({file: e.target.files[0] }) 
    this.setState( { fileInfo: URL.createObjectURL(e.target.files[0]) })
  }


  submit = async () => {
    const { name, file } = this.state;

    const formData = new FormData();
    formData.append('file', file);
    // formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

    const response = await axios.post(
      // `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
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
          <input class="btn btn-light btn-block" type='file' id='single' onChange={this.onChange} /> 
          <div >
            <img   class="img-thumbnail mx-auto" style = {{ width: "300px" ,margin:'10px' }} 
              src = {this.state.file ? this.state.fileInfo : ''}
              />
          </div>

          {this.state.showComponent ?
            <div class="alert alert-primary" role="alert">
                upload successful :)
            </div> :
           null
        }
          <button class="btn btn-dark" onClick={this.submit}>Upload</button>


 
   


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