const { getCookie, getTraffic } = require('./utils')
const notify = require('./sendNotify');

(async () => {
  const cookie = await getCookie()
  const arr = await getTraffic(cookie)
  await notify.sendNotify(`iKuuu VPN 今日流量统计`, arr.join('\n'))
})()
