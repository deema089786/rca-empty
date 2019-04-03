import Api from './Api';

export default class SocialAuth extends Api {


  /**
   * Get social auth url
   *
   * Route: __[GET] /api/v1/auth/:type/url => {@link}__
   * @param {Object} params - data
   * @param {string} params.type - {google, facebook}
   * @return {Object} {url:url}
   */

  getAuthUrl({type}){
    return this.apiClient.get(`auth/${type}/url`);
  }

  /**
   * Login or register with Soacial network.
   *
   * Route: __[GET] /api/v1/auth/:type/login => {@link }__
   * @param {string} params - data
   * @param {string} params.type - {google, facebook}
   * @param {Object} params.data - google - {code:'dasdsda...'}, facebook - {access_token:'sdasdada....'}
   * @return {Object} User
   */
  signIn({type, data}){
    return this.apiClient.get(`auth/${type}/login`,data);
  }
}