const axios = require('axios')
const { getCookie, getTraffic } = require('./utils')
const notify = require('./sendNotify')

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

  let message = await checkin(cookie)
  message += '\n\n'
  const traffic = await getTraffic(cookie)
  message += traffic.join('\n')

  await notify.sendNotify(`iKuuu VPN 签到通知`, message)
})()
