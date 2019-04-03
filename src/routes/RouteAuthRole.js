import React             from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes         from 'prop-types';
import {connect}         from 'react-redux';
import {withRouter}      from 'react-router';
const RouteAuthRole = (props) => {
  const {isAuthenticated, roles, userRole, redirectPath, componentProps={}, component: Component, ...rest} = props;
  console.log(props);
  if (!isAuthenticated || !access(roles, Array.isArray(userRole) ? userRole : [userRole])) {
    return <Redirect
      to={(redirectPath || '/sign-in')}/>;
  } else {
    if (Component) {
      return <Route
        {...rest}
        exact
        render={props => <Component {...props} {...componentProps}/>}
      />
    } else {
      return rest.children;
    }
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuth,
    userRole: state.user.role,
  }
}

RouteAuthRole.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  redirectPath: PropTypes.string,
};

export default withRouter(connect(mapStateToProps)(RouteAuthRole))

export function access (arr1, arr2) {
  return arr1.some(el1=>arr2.some(el2=>el2===el1))
}
