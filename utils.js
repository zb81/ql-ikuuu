const { initInstance, getEnv } = require('./qlApi.js')
const axios = require('axios')

const loginURL = 'https://ikuuu.pw/auth/login'
const infoURL = 'https://ikuuu.pw/user'
const todayTrafficReg = /今日已用\n.*\s(\d+\.?\d*)([M|G]B)/
const restTrafficReg = /剩余流量[\s\S]*<span class="counter">(\d+\.?\d*)<\/span> ([M|G]B)/

/** 获取邮箱和密码 */
async function getEmailAndPwd() {
  let instance = null
  try {
    instance = await initInstance()
  } catch (e) { }

  let email = process.env.IKUUU_EMAIL
  let pwd = process.env.IKUUU_PWD
  try {
    if (instance) {
      email = await getEnv(instance, 'IKUUU_EMAIL')
      pwd = await getEnv(instance, 'IKUUU_PWD')
    }
  } catch (e) { }

  if (!email || !pwd) {
    console.log('未获取到邮箱和密码, 程序终止')
    process.exit(1)
  }

  console.log('✅ 成功读取环境变量')

  return [email, pwd]
}

/** 登录获取 cookie */
async function getCookie() {
  const [email, pwd] = await getEmailAndPwd()
  const formData = new FormData()
  formData.append('email', email)
  formData.append('passwd', pwd)
  const res = await axios(loginURL, {
    method: 'POST',
    data: formData
  })
  console.log('✅ 登录成功！')
  return res.headers['set-cookie'].join('; ')
}

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
