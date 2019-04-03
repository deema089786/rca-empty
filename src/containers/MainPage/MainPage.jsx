import React, {Component}   from 'react';
import {withRouter}         from 'react-router';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes            from 'prop-types';
import {actions}            from 'rdx';

class MainPage extends Component {
  render() {
    return (
      <>
        <div>Main page</div>
      </>
    );
  }
}

MainPage.propTypes = {
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
)(MainPage));
