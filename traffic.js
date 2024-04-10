const axios = require('axios')
const { getCookie } = require('./utils')
const notify = require('./sendNotify')

const infoURL = 'https://ikuuu.pw/user'
const todayTrafficReg = /今日已用\n.*\s(\d+\.?\d*)([M|G]B)/
const restTrafficReg = /剩余流量[\s\S]*<span class="counter">(\d+\.?\d*)<\/span> ([M|G]B)/

/** 获取今日已用流量 */
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
      `今日已用: ${today}${todayUnit}`,
      `剩余流量: ${rest}${restUnit}`
    ]
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

(async () => {
  const cookie = await getCookie()
  const arr = await getTraffic(cookie)
  await notify.sendNotify(`iKuuu VPN 今日流量统计`, arr.join('\n'))
})()

module.exports = { getTraffic }
