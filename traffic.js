const { getCookie, getTraffic, getEmailAndPwdList } = require('./utils')
const notify = require('./sendNotify');

async function run() {
  const [emailList, pwdList] = await getEmailAndPwdList()
  const messages = []
  for (let i = 0; i < emailList.length; i++) {
    const email = emailList[i]
    const pwd = pwdList[i]
    let msg = `邮箱：${emailList[i]}`
    const cookie = await getCookie(email, pwd)
    if (cookie.includes('登录失败')) {
      msg += `\n${cookie}`
      messages.push(msg)
      continue
    }
    const arr = await getTraffic(cookie)
    msg += `\n${arr.join('\n')}`
    messages.push(msg)
  }

  await notify.sendNotify(`iKuuu VPN 今日流量统计`, messages.join('\n\n========================\n\n'))
}

run()
