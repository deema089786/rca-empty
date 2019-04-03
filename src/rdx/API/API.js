export default class API {
  static _instance = null;
  static setInstance (api) {
    API._instance = api;
  }

  static getInstance(){
    return API._instance;
  }
}