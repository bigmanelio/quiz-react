import React from 'react';

const name = localStorage.getItem('name');
const role = localStorage.getItem('role');
const withAuthorization = (allowedRoles) => (WrappedComponent) => {
  return class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        userRole: role
      };
    }

    render() {
      const { userRole } = this.state;

      if (allowedRoles.includes(userRole)) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <p>You are not authorized to view this page.</p>;
      }
    }
    
  };

};
export default withAuthorization;