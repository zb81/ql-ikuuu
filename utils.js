const { initInstance, getEnv } = require('./qlApi.js')

/** 获取 cookie */
async function getCookie() {
  let instance = null
  try {
    instance = await initInstance()
  } catch (e) { }

  let cookie = process.env.IKUUU_COOKIE || []
  try {
    if (instance) cookie = await getEnv(instance, 'IKUUU_COOKIE')
  } catch (e) { }

  if (!cookie) {
    console.log('未获取到 cookie, 程序终止')
    process.exit(1)
  }

  return cookie
}

module.exports = { getCookie }
