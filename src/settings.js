module.exports = {

  title: 'QUP平台',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,
  isProduction: (process.env.NODE_ENV === 'production'),
  imgPrefix: process.env.VUE_APP_Img_prefix,
  programmeFlag: '/mdm-admin/'
}
