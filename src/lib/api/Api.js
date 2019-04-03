import {stringify}  from 'lib/queryString/index';
import {USER_STATE} from 'rdx/constants';
import {global} from 'config';
import Toast from 'lib/toast';

export class ApiClient {
  static _dispatch = null;

  constructor(prefix = global.origin + global.apiPrefix) {
    this.prefix = prefix;
  }

  static setDispatch(dispatch) {
    ApiClient._dispatch = dispatch
  };

  get(requestUrl, params = {}, options = {}) {
    return this.request(
      {
        url: requestUrl,
        method: 'get',
        params
      },
      options
    );
  }

  put(requestUrl, payload = {}) {
    return this.request({
      url: requestUrl,
      method: 'put',
      body: payload
    });
  }

  patch(requestUrl, payload = {}) {
    return this.request({
      url: requestUrl,
      method: 'patch',
      body: payload
    });
  }

  post(requestUrl, payload = {}, options = {}) {
    return this.request({
      url: requestUrl,
      method: 'post',
      body: payload,
    }, options);
  }

  delete(requestUrl, payload = {}) {
    return this.request({
      url: requestUrl,
      method: 'delete',
      body: payload,
    });
  }

  async multipartFormData(path, data, options = {}) {
    const body = new FormData();
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach(item => {
          body.append(`${key}`, item);
        })
      } else {
        body.append(key, data[key]);
      }
    }

    let res = await fetch(
      `${this.prefix}/${path}`,
      {
        method: options.method || 'POST',
        body,
        headers: {
          'Authorization': localStorage.getItem('token') || ''
        }
      }
    );
    return await this._handleResponse(res);
  }

  async fileLoader(path, method = 'get', body = {}) {
    const options = {
      method: method,
      headers: {
        'Authorization': localStorage.getItem('token') || '',
        'Content-Type': 'application/json',
      }
    };
    if (method !== 'get') {
      options.body = JSON.stringify(body);
    }
    let res = await fetch(`${this.prefix}/${path}`, options);
    let filename = "";
    let disposition = res.headers.get('Content-Disposition');
    if (disposition && disposition.indexOf('attachment') !== -1) {
      let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      let matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    const blob = await res.blob();

    return {blob, filename}
  }

  static async staticFileLoader(path, method = 'get', body = {}, addOptions = {}) {
    const options = {
      method: method,
      // headers: {
      //   'Authorization': localStorage.getItem('token') || '',
      //   'Content-Type': 'application/json',
      // }
    };
    if (method !== 'get') {
      options.body = JSON.stringify(body);
    }
    let res = await fetch(path, options);
    let filename = "";
    let disposition = res.headers.get('Content-Disposition');
    if (disposition && disposition.indexOf('attachment') !== -1) {
      let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      let matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = addOptions.filename || filename;
    a.click();
  }

  async request({url, method, params = {}, body}, options = {}) {
    const urlWithQuery = `${url}?${stringify(params)}`;
    const token = localStorage.getItem('token') || '';

    const init = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      credentials: 'same-origin'
    };

    if (method !== 'get' && method !== 'head') {
      if (process.env.BROWSER) body._csrf = document.head.querySelector('[name="_csrf"]').content;
      init.body = JSON.stringify(body);
    }

    let res = await fetch(`${this.prefix}/${urlWithQuery}`, init);
    return await this._handleResponse(res, options);
  }

  async _handleResponse(res, options = {}) {
    if (!res.ok) {
      res = await res.json();
      switch (res.status) {
        case 401: {
          localStorage.removeItem('token');
          ApiClient._dispatch && ApiClient._dispatch({
            type: USER_STATE,
            payload: {isAuth: false, userData: {}}
          });
          break;
        }
        case 413: {
          Toast.showError('File too large!');
          break;
        }
        default: {
          Toast.showError(res.message || 'Error!', res.details || []);
        }
      }
      throw new Error(res.message);
    }
    const optionsRes = {};
    if (options.returnHeaders) {
      optionsRes.headers = res.headers
    }
    res = await res.json();
    if (!res.message) {
      if (Object.keys(optionsRes).length) {
        return {
          response: res,
          options: optionsRes,
        }
      }
      return res;
    } else {
      throw new Error(res.message || res.toString());
    }
  }
}

export default class Api {
  constructor() {
    this.apiClient = new ApiClient();
  }
}
