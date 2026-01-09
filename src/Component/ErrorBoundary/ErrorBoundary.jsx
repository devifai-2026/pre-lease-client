// src/components/ErrorBoundary/ErrorBoundary.jsx
import React, { Component } from 'react';
import WentWrong from '../../Pages/ErrorPages/WentWrong';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <WentWrong />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;