# ql-ikuuu

青龙脚本，iKuuu VPN 签到、获取今日使用流量。

## 如何使用

### 第一步：添加邮箱、密码到环境变量

打开青龙面板，创建 `IKUUU_EMAIL` 和 `IKUUU_PWD` 变量，多个邮箱或密码请换行。

> 注意：邮箱和密码数量必须一致且一一对应。

<img alt="picture 1" src="https://cdn.zb81.icu/95635412513591a0f93dd1b6c96662a8fc1a6b5dc86a13a24ef0d17660af73d1.png" />  

<img alt="picture 2" src="https://cdn.zb81.icu/8ebbee42e5fe546ae7d18efcb83ab4f6411b2317aa141db671eec74290d1dd38.png" />  

### 第二步：添加依赖项

<img alt="picture 2" src="https://cdn.zb81.icu/4c687674b765dcba0b1333532db886485e8de0d9d06d7578c4122c3e7024056e.png" />  

### 第三步：添加订阅

```sh
ql repo https://github.com/zb81/ql-ikuuu.git "checkin|traffic" "" "qlApi|utils"
```

添加订阅后在定时任务中执行：

<img alt="picture 4" src="https://cdn.zb81.icu/3bde21a7c6e07cd3e757705a3cc23df3c06885fe26579f502a86cfc74e2bbec8.png" />  

## 通知效果

<img alt="picture 3" src="https://cdn.zb81.icu/cdcb0c957db045c6b5b383d78814f8ce8a4a8ce7775911b4a3450abfeafc3b1e.jpg" />  


## 原理

- 签到：直接发送 POST 请求
- 流量：请求 HTML 字符串，通过正则表达式提取

## 感谢

- mrabit: [aliyundriveDailyCheck](https://github.com/mrabit/aliyundriveDailyCheck)
