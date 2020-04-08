import React from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]).isRequired,
  };

  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <div>
          <h1>Oops! An error occured!</h1>
          <h1>Oops! An error occured!</h1>
          <h2>{this.state.errorInfo}</h2>
        </div>;
    }
    return this.props.children;
  }
}
