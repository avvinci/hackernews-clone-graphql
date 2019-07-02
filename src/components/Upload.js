import React from 'react';
import axios from 'axios';
import { gql, graphql } from 'react-apollo';


class Upload extends React.Component {
  
  state = {
    name: '',
    file: null,
  };

  // onDrop = async files => {
  //   this.setState({ file: files[0] });
  // };

  onChange = e => {
    this.setState({file: e.target.files[0] }) 
  }


  submit = async () => {
    const { name, file } = this.state;

    const formData = new FormData();
    const cloud = process.env.CLOUD_NAME
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
      formData,
    );

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
    return (
      <div>
          <input type='file' id='single' onChange={this.onChange} /> 
          <button onClick={this.submit}>Submit</button>

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