const axios = require('axios')
const { initInstance, getEnv } = require('./qlApi.js')
const notify = require('./sendNotify')

const infoURL = 'https://ikuuu.pw/user'
const trafficReg = /(今日已用\n.*\s)(\d+\.?\d*)[M|G]B/

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

/** 获取今日已用流量 */
async function getTraffic(cookie) {
  try {
    const res = await axios(infoURL, {
      method: 'GET',
      headers: {
        Cookie: cookie
      },
      withCredentials: true
    })
    return trafficReg.exec(res.data)[0].replace(/[\n|\s]/g, '').replace(/:/, ': ')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

(async () => {
  const cookie = await getCookie()
  const message = await getTraffic(cookie)
  await notify.sendNotify(`iKuuu VPN 今日流量统计`, message)
})()
