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
