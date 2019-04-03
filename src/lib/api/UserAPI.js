import Api from './Api';

export default class UserAPI extends Api {
  signUp(data) {
    return this.apiClient.multipartFormData(`auth/register`, data)
  }

  signIn(data) {
    return this.apiClient.post(`auth/login`, data)
  }

  me() {
    return this.apiClient.get('me')
  }

  /**
   * Update own metadata
   *
   * Route: [POST] /api/v1/users/:type/update
   * @param {Object} data - http request
   * @param {string} data.values - multipart/form-data
   * @param {string} data.type - metadata type {profile, address, contacts }
   * @return {Object} updated user metadata
   */
  updateProfile({values, type}){
    return this.apiClient.multipartFormData(`users/${type}/update`, values);
  }

  /**
   * Change password
   *
   * Route: __[POST] /api/v1/auth/change-password => {@link Object}__
   * @param {Object} data - http request
   * @param {string} data.password - new password
   * @param {string} data.confirmPassword - confirmed new password
   * @param {string} data.currentPassword - current password
   * @return {Promise<{success: boolean}>} change password status
   */
  changePassword({password, confirmPassword, currentPassword}){
    return this.apiClient.post(`auth/change-password`,{password, confirmPassword, currentPassword});
  }

  /**
   * Reset password (initiate)
   *
   * Send email with reset password link
   *
   * Route: __[POST] /api/v1/auth/forgot-password => {@link Object}__
   * @param {Object} data - request
   * @param {string} data.email - email
   * @return {Object} reset password status
   */
  forgotPassword({email}){
    return this.apiClient.post(`auth/forgot-password`, {email})
  }

  /**
   * Reset password (processing)
   *
   * Reset password and set new one
   *
   * Route: __[POST] /api/v1/auth/reset-password => {@link Object}__
   * @param {Object} data - http request
   * @param {string} data.t - activation token
   * @param {string} data.password - new password
   * @param {string} data.confirmPassword - confirmed new password
   * @return {Promise<{success: boolean}>} reset password status
   */
  resetPassword({t, password, confirmPassword}){
    return this.apiClient.post(`auth/reset-password`,{t, password, confirmPassword})
  }

  /**
   * User subscriber
   *
   * Route: __[POST] /api/v1/auth/subscribe => {@link User}__
   * @param {Object} data - http request
   * @param {string} data.email               - user email
   * @param {string} data.firstName           - firstName
   * @param {string} data.lastName            - lastName
   * @return {Promise<User>} subscribed user
   */
  subscribe({email, firstName, lastName}) {
    return this.apiClient.post('auth/subscribe', {email})
  }

  /**
   * Get user with profile
   *
   * @param {Object} req - http request
   * @param {string} req.params.id - userId
   * @return {Object} User
   */
  getProfile(id) {
    return this.apiClient.get(`users/${id}/profile`)
  }
}