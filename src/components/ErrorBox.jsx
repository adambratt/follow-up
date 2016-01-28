import React from 'react';

class ErrorBox extends React.Component {
  render() {
    if (!this.props.message) {
      return (<span />);
    }
    return (
      <div className="error-box">
         <i className="fa fa-exclamation-circle"></i> {this.props.message}
      </div>
    );
  }
}

ErrorBox.propTypes = {
  message: React.PropTypes.string
};

export default ErrorBox;
