const Joi = require('joi');

/**
 *
 * 结合`joi`库实现数据校验的方法
 */
exports.expressJoi = function (schemas, options) {
  /**
   * 用户指定了什么 schema，就校验什么样的数据
   */
  return function (req, res, next) {
    ['body', 'query', 'params'].forEach((key) => {
      // 如果当前循环的这一项 schema 没有提供，则不执行对应的校验
      if (!schemas[key]) return;

      // 执行校验
      const schema = Joi.object(schemas[key]);
      const { error, value } = schema.validate(req[key], options);

      if (error) {
        // 校验失败
        throw error;
      } else {
        // 校验成功，把校验的结果重新赋值到 req 对应的 key 上
        req[key] = value;
      }
    });

    // 校验通过
    next();
  };
};
