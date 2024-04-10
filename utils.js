const { initInstance, getEnv } = require('./qlApi.js')
const axios = require('axios')

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

const infoURL = 'https://ikuuu.pw/user'
const todayTrafficReg = /今日已用\n.*\s(\d+\.?\d*)([M|G]B)/
const restTrafficReg = /剩余流量[\s\S]*<span class="counter">(\d+\.?\d*)<\/span> ([M|G]B)/

/** 获取流量 */
async function getTraffic(cookie) {
  try {
    const { data } = await axios(infoURL, {
      method: 'GET',
      headers: {
        Cookie: cookie
      },
      withCredentials: true
    })

    const [, today, todayUnit] = data.match(todayTrafficReg)
    const [, rest, restUnit] = data.match(restTrafficReg)

    return [
      `今日已用：${today} ${todayUnit}`,
      `剩余流量：${rest} ${restUnit}`
    ]
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = { getCookie, getTraffic }
