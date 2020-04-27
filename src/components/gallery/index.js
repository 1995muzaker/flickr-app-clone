import React from "react";

class Gallery extends React.Component {
  state = {
    id: null,
  };
  componentDidMount() {
    let id = this.props.match.params.post_id;
    this.setState({
      id,
    });
  }
  render() {
    return (
      <div>
        <p>{this.state.id}</p>
      </div>
    );
  }
}

export default Gallery;
