## 安装

```bash
npm install @hcisme/express-joi
```

## 依赖

```bash
npm install joi@17.11.0
```

## 导入

```js
const { expressJoi } = require('@hcisme/express-joi');
```

## 使用

```js
const express = require('express');
const app = express();
const Joi = require('joi');
const expressJoi = require('@hcisme/express-joi');

// 解析 x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }));

const userSchema = {
  body: {
    username: Joi.string().alphanum().min(3).max(12).required(),
    password: Joi.string()
      .pattern(/^[\S]{6,15}$/)
      .required(),
    repassword: Joi.ref('password')
  },
  query: {
    name: Joi.string().alphanum().min(3).required(),
    age: Joi.number().integer().min(1).max(100).required()
  },
  params: {
    id: Joi.number().integer().min(0).required()
  }
};

// 3. 在路由中通过 expressJoi `(schema, options)`  `options`为`Joi.ValidationOptions`的方式
//    调用中间件进行参数验证
app.post('/api/:id', expressJoi(userSchema), function (req, res) {
  const body = req.body;
  res.send(body);
});

// 4.1 错误级别中间件
app.use(function (err, req, res, next) {
  // 4.1 Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message
    });
  }
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3000, function () {
  console.log('Express server running at http://127.0.0.1:3001');
});
```

## 验证规则

更多的验证规则，请参考 [Joi](https://joi.dev/) 的官方文档。

## 开源协议

![ISC](https://img.shields.io/badge/License-ISC-blue)
