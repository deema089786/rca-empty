import React             from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes         from 'prop-types';
import {connect}         from 'react-redux';
import {withRouter}      from 'react-router';

const RouteNoteAuth = ({notAuth, component: Component, ...rest}) => {
  if (!notAuth) return <Redirect to='/'/>;
  else {
    if (Component) {
      return <Route
        {...rest}
        exact
        render={props => <Component {...props}/>}
      />
    } else {
      return rest.children;
    }
  }
};

function mapStateToProps(state) {
  const {user} = state;
  return {
    notAuth: !state.user.isAuth || (user.role !== 'client'),
  }
}

RouteNoteAuth.propTypes = {
  notAuth: PropTypes.bool.isRequired
};

export default withRouter(connect(mapStateToProps)(RouteNoteAuth))