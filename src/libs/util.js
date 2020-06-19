import cookies from './util.cookies'
import db from './util.db'

const util = {
  cookies,
  db
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'sdic'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

export default util
