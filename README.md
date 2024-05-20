# ql-ikuuu

青龙脚本，iKuuu VPN 签到、获取今日使用流量。

## 如何使用

### 第一步：添加邮箱、密码到环境变量

打开青龙面板，创建 `IKUUU_EMAIL` 和 `IKUUU_PWD` 变量。

 <img alt="picture 0" src="https://cdn.zb81.icu/163bc6f247b4f29418ee9b07ac584934d9fd476304a6661240531aec98e1903d.png" />  


### 第三步：添加依赖项

<img alt="picture 2" src="https://cdn.zb81.icu/4c687674b765dcba0b1333532db886485e8de0d9d06d7578c4122c3e7024056e.png" />  

### 第四步：添加订阅

```sh
ql repo https://github.com/zb81/ql-ikuuu.git "checkin|traffic" "" "qlApi|utils"
```

添加订阅后在定时任务中执行：

<img alt="picture 4" src="https://cdn.zb81.icu/3bde21a7c6e07cd3e757705a3cc23df3c06885fe26579f502a86cfc74e2bbec8.png" />  

## 通知效果

<img alt="picture 0" src="https://cdn.zb81.icu/8027e8dbec62f99119e65edf308998762bf0697bda34cc6d561320961e5dd7bb.jpg" />  

## 原理

- 签到：直接发送 POST 请求
- 流量：请求 HTML 字符串，通过正则表达式提取

## 感谢

- mrabit: [aliyundriveDailyCheck](https://github.com/mrabit/aliyundriveDailyCheck)
