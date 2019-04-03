import React, {Component}    from 'react';
import {withRouter}          from 'react-router';
import {connect}             from 'react-redux';
import {bindActionCreators}  from 'redux';
import PropTypes             from 'prop-types';
import Toast                 from 'lib/toast';
import {actions}             from 'rdx';
import routes, {ScrollToTop} from 'routes/index';

import Header from 'components/common/Header';

class App extends Component {
  render() {
    return (
      <>
        <Header/>
        {routes}
        {/*___________________________*/}
        <Toast.render/>
        <ScrollToTop/>
      </>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(actions.userActions, dispatch),
  };
}

function mapStateToProps(state) {
  let {user} = state;
  return {user};
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
