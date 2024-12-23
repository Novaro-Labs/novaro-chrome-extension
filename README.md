# novaro-chrome-extension

navaro浏览器插件，在KOL的twitter主页上显示在navaro创建的代币信息。

## 主体流程
1. 在twitter主页注入 插件 逻辑
2. 获取用户twitter账号，请求api查询绑定的钱包地址
3. 与navaro合约交互， 查找该钱包创建的代币信息
4. 展示代币信息列表，支持搜索、排序、筛选及跳转等操作

