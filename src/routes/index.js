import React, {Component} from 'react';
import routes             from './routes';
import {withRouter}       from "react-router-dom";

export default routes;


class ScrollToTopComponent extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // scrollTo doesn`t work for iframe (managers page) on old version iPad safari
      if (!navigator.userAgent.match(/^(?=.*\bSafari\b)(?=.*\bMobile\b)(?=.*\biPad\b)/i)) {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    return null;
  }
}

export const ScrollToTop = withRouter(ScrollToTopComponent);