const axios = require('axios')
const { initInstance, getEnv } = require('./qlApi.js')
const notify = require('./sendNotify')

const checkinURL = 'https://ikuuu.pw/user/checkin'

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

/** 签到 */
async function checkin(cookie) {
  try {
    const res = await axios(checkinURL, {
      method: 'POST',
      headers: {
        Cookie: cookie
      },
      withCredentials: true
    })
    return res.data.msg
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

(async () => {
  const cookie = await getCookie()
  const message = await checkin(cookie)
  await notify.sendNotify(`iKuuu VPN 签到通知`, message)
})()
