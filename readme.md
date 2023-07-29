第一天:

#client:

1. client 初始化项目 typescript 版本
2. 添加 react-router
3. 添加 axios http 拦截器
4. 补全 auth

#server:

1. server 初始化 nest 项目, port = 4200
2. 添加 swagger 模块
3. 添加 user 模块
4. 了解了 jwt 的原理，明天添加全局 JwtAuthGuard

第二天:

#client:

#server:

1. 创建 auth 模块 实现简单的 JWT 授权 https://docs.nestjs.com/security/authentication
2. 实现 LocalAuthGuard 全局守护接口验证问题， 开启所有接口 jwt 验证
3. 添加接口/api/login 登录获得授权
4. 添加接口/api/profile 授权后获得用户信息

5. 阅读https://docs.nestjs.com/recipes/passport文档 使用 passport 重构 auth 模块
6. 登录接口/api/login 走 LocalAuthGuard 策略
7. 其他需要登录态的接口 走 JwtAuthGuard
8. 不需要登录态的接口 @SkipJwtAuth()

第三天:

#client:

1. login 页面 登录实现

#server:

1. user 实体构建 包含 entity 映射数据库
2. user 模块的增删改查
3. auth 相关 user 逻辑修改
4. cors 解决跨越问题，让前端可以调接口
5. transform TransformInterceptor 实现接口返回拦截功能

第四天

#client:

1. Todo 页面
2. 完善 media 内容

#server:

1. 日志功能 reportLogger 模块
2. 异常 Filters
3. todo 功能实现
4. 上传文件

第五天

#client:

1. 访问量显示
2. 每日名言显示
3. chat 聊天室

#server:

1. count 统计访问量并使用 redis
2. quote 调用外部 api
3. chat websocket 聊天室

第六天
#client:
#server:

1. role.guard 管理员权限逻辑
2. swagger
3. test 逻辑太乱，bug 太多，需要找到更好更新的最佳实践
4. docker 要先关掉 3306 和 6379 端口 sudo kill `sudo lsof -t -i:3306`, 本地运行环境会跟 docker 冲突,还是找更好的实践吧
5. 完结吧
