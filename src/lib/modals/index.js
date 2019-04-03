import React, {Component} from "react";
import {connect}          from 'react-redux';
import InfoModal          from 'components/modals/InfoModal';

export default class Modals {
  static autoHide = true;
  static _dispatch = null;
  static _history = null;
  static ACTIONS = {
    MODALS_OPEN: 'MODALS_OPEN',
    MODALS_CLOSE: 'MODALS_CLOSE',
  };
  static MODALS = {};
  static _modals = {};
  /**
   * Render component view
   */
  static Render = connect(
    mapStateToProps,
    null
  )(render());

  /**
   * Set dispatch for updates state
   * @param {function} dispatch
   */
  static setDispatch(dispatch) {
    Modals._dispatch = dispatch;
  }

  static setHistory(history) {
    Modals._history = history;
    history.listen(() => {
      Modals.autoHide && Modals._dispatch && Modals._dispatch({type: Modals.ACTIONS.MODALS_CLOSE});
    });
  }

  /**
   * Setting apu modals
   * @param {string} key - key of modal
   * @param {Component} Component - React component of modal
   */
  static setModal(key, Component) {
    Modals.MODALS[key] = key;
    Modals._modals[key] = props => <Component {...props}/>;
  }

  /**
   * Called on rendering selected modal
   * @param {string} modal - key of modal
   * @param {Object} props - params for modal
   * @returns {Component}
   */
  static _getModal(modal, props) {
    return Modals._modals[modal](props);
  }

  /**
   * Display selected modal
   * @param {string} modal - key of modal (Modals.MODALS)
   * @param {Object} props - Props to modals React component
   */
  static openModal(modal, props) {
    if (!Modals._modals[modal]) throw new Error('No modal: ' + modal);
    Modals._dispatch({
      type: Modals.ACTIONS.MODALS_OPEN,
      payload: {modal, props}
    });
  }

  /**
   * Close current open modal
   */
  static closeModal() {
    Modals._dispatch({type: Modals.ACTIONS.MODALS_CLOSE});
  }

  static modalReducer(state = {open: false, modal: '', props: {}}, action) {
    switch (action.type) {
      case Modals.ACTIONS.MODALS_OPEN:
        const {payload} = action;
        return {
          ...state,
          modal: payload.modal,
          props: payload.props,
          open: true
        };
      case Modals.ACTIONS.MODALS_CLOSE:
        return {...state, props: {}, open: false};
      default:
        return state;
    }
  }
}

function render() {
  return class ModalRender extends Component {
    render() {
      const {_modals} = this.props;
      return (
        <div>
          {
            _modals.open &&
            Modals._getModal(_modals.modal, _modals.props)
          }
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  let {_modals} = state;
  return {_modals};
}

Modals.setModal('INFO_MODAL', InfoModal);
