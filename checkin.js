const axios = require('axios')
const { getCookie } = require('./utils')
const notify = require('./sendNotify')
const { getTraffic } = require('./traffic')

const checkinURL = 'https://ikuuu.pw/user/checkin'

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
  const traffic = await getTraffic(cookie)
  await notify.sendNotify(`iKuuu VPN 签到通知`, [message, ...traffic].join('\n'))
})()
