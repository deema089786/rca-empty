import React                   from 'react';
import {ToastContainer, toast} from 'react-toastify';

export default class Toast {
  static render = () => <ToastContainer/>;
  static show = props => toast(props);
  static showError = props => toast(props);
}
