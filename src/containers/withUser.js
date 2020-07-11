import React from 'react';
import { UserContext } from '../context/UserProvider';

export default function withUser(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <UserContext.Consumer>
          {({ userState, setUserState }) => (
            <WrappedComponent
              {...this.props}
              userState={userState}
              setUserState={setUserState}
            />
          )}
        </UserContext.Consumer>
      );
    }
  };
}
