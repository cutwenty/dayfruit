# dayfruit

我的第一个项目，和朋友们做的项目，仿 [天天果园](http://m.fruitday.com/) 的 webapp。

为了部署到服务器上能看，还改了许多地方，其他人做的模块坑太多了...不过实在改的太累了。

刚刚一看，它竟然更新了，不过有许多页面还是没有变动，而且还是 touch 应用，不是 spa。

## 运行

项目使用 gulp+webpack 模式，gulp 管理项目工程化，webpack 编译压缩 js 文件。

并没有使用前后端分离，当初都不懂。倒是部署到服务器上时，做了分离，[www.hxhgta.com/dayfruit/index.html](http://www.hxhgta.com/dayfruit/index.html)。

1. 安装 node_modules
	
		npm install

2. 运行 gulp

		gulp

3. 打开页面

		http://localhost:8090/index.html

## 手机访问页面

如果想要在手机上测试，（可以使用 [debuggap](http://www.debuggap.com/)）

首先，在本机上打开 wifi，手机连接这个 wifi。

然后，查看 wifi 的 ip 地址：

	ifconfig
	
最后，执行命令打开服务

	gulp mobil --host ip地址
	
之后手机访问 ip:8090/dayfruit/index.html，就可以了。
	