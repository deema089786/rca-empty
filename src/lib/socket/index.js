import io       from 'socket.io-client';
import {global} from 'config';

export class WS {
  static _dispatch = null;
  static setDispatch = dispatch => WS._dispatch = dispatch;

  constructor() {
    this._connect();
  }

  reconnect(role) {
    this.disconnect();
    this._connect();
  }

  disconnect() {
    this._socket && this._socket.disconnect();
  }

  _connect() {
    this._socket = io(global.origin,
      {
        forceNew: true,
        path: '/ws',
        query: {
          token: localStorage.getItem('token') || '',
          EIO: 3,
          transport: 'websocket',
        }
      });
    this._socket.on('connect', () => console.log('WS CONNECTED'));
    this._socket.on('connect_error', e => console.log('WS CONNECTION ERROR', e));
    this._socket.on('disconnect', () => console.log('WS DISCONNECTED'));

    //events
    // this._socket.on('notification', notification => {
    //   WS._dispatch && WS._dispatch({
    //     type: NOTIFICATIONS_PUSH_LIST,
    //     payload: {notification}
    //   })
    // });


  }


}

export default new WS();
