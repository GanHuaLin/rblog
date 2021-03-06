# :monkey_face: rblog

这是点子有点烂大街基于 [Next.js](https://nextjs.org/) 的静态博客项目，博客整体样式完全参照于锤子便签

说它烂大街是因为基于不同编程语言，核心功能一样，用的最多也比较有代表的已经有基于 Node.js 的 [Hexo](https://hexo.io) 基于 Ruby 的 [Jekyll](https://jekyllrb.com/) 基于 Go 的 [Hugo](https://gohugo.io/) ...

## 为什么会有这个项目

+ 我觉得静态博客的点子很棒，不需要数据库，任意一家云服务器厂商的最低配置就可以毫无压力的部署使用

+ 我觉得用 Markdown 写文章很酷，文章即数据，数据即文件，博客的核心数据是 Markdown 文件，而不是在数据库里被富文本编辑器处理过的字符串。你甚至不用做任何事或者只进行少量修改，就可以直接把你的 Markdown 文章迁移在笔记软件，或者 Github 和简书这样的网站中

+ 我觉得富文本编辑器可以解决较为复杂的文本编辑需要，却无法给你带来纯字符编辑的乐趣

+ 所决定实现的技术和自己想要的功能契合的刚刚好，既不复杂，也不简陋，打蚊子没用高射炮

+ 我想要一个简单好看，自己一手打造的博客 

+ 我想只用 JavaScript 这一种语言实现我的博客，我想用 ES6 的语法来写代码，我想用组件化的方式来组织我的页面结构

+ 我想要了解 Next.js

## 贡献

希望大家能够喜欢并且随意使用，但是不接受 pull request 如果你对该项目感兴趣并且有任何新的想法和需求可以自行 fork 之后自由发挥，随意修改 

## 环境

推荐 Node.js v10.x 以上

使用现代浏览器，如 Chrome Firefox Safari 最次怎么也得用 Edge 吧

## 简述

该博客项目分为 PC 端和移动端的 Web 两个独立的 Next.js 项目，但是共用一套博客数据，两端可以分别开发，部署和导出

`next-project/pc` 为 PC 端的项目

`next-project/mobile` 为移动端的 Web 项目

## 使用规则

约定所有文章均为 Markdown 编写，文件名后缀为 `.md`

约定 `_post` 目录下的子级文件夹为文章的分类，称之为分类文件夹，所有 Markdown 文件均放在对应的分类文件夹下

`_post` 目录规规则如下：

+ 目录下只能有文件夹，不能有任何文件

+ 目录下的分类文件夹里不能再有子级文件夹

+ 目录下的分类文件夹允许为空文件夹

+ 分类文件夹里只能放 `.md` 后缀结尾的文件，不能放文件夹和其他任何文件

Markdown 文件规则如下：

+ 必须隶属一个分类文件夹
+ 文件名格式为 `[文章标题]-[时间].md` 的形式，其中时间格式为：`YYYYMMdd` 例如：`[Learn JavaScript]-[20181225].md`

合法的目录结构例如：

```
.
├── _post
│   │
│   ├── Program
│   │   ├── [learn C]-[20171212].md
│   │   ├── [learn java]-[20181223].md
│   │   └── [Learn javascript]-[20181227].md
│   │
│   ├── Life
│   │
│   └── Study
│       └── [Hello]-[20171212].md
.
```

**请务必严格遵守规则**

## Markdown

支持主流 Markdown 语法，其中对一些语法的表现做出了修改

+ 其中 h3 h4 h5 h6 标题表现一致

+ 有序列表和无序列表表现一致

+ 分割线没有任何效果

+ 不支持流程图

+ 不支持甘特图

+ 如果需要加空行，可以使用 `&emsp;`

当然，如果你愿意可以自己添加和修改 Markdown 的渲染

### 关于渲染

渲染 Markdown 使用了 `react-markdown` 如果要修改 Markdown 的渲染，请参考阅读[官方文档](https://github.com/rexxars/react-markdown)

### 关于展示代码块

Markdown 中展示代码块用了 `react-syntax-highlighter` 同样，如果想要修改，请参考阅读[官方文档](https://github.com/conorhastings/react-syntax-highlighter)

其中对编程语言支持的语法高亮列表请参考[这里](https://github.com/conorhastings/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD)

举个例子，如果要展示 js 的代码，那么在列表中查询到 js 的完整名称为 `javascript` ，那么 Markdown 语法应该这样写：

\```javascript

console.log('Hello world');

\```

## 注意

由于该项目获取数据的特殊性，当使用 `npm run dev-pc` 或者 `npm run dev-mobile` 时，如果修改的是关于页面的代码，浏览器会自动刷新，如果是 `_post` 下的文件夹和文件的修改，需要手动刷新浏览器

Next.js 中的 `next` `next build` `next export` `next start` 命令不能直接使用于该项目

该项目数据依赖于 `db` 目录下的 `article-meta.json` 和 `article-list.json` 文件，在执行上述 Next.js 提供的命令之前必须保证它们存在而且格式必须正确才可使用

**所以请不要直接使用上面提到的 Next.js 原生命令，如果要使用，请先执行 `npm run generate` 命令，并且需要添加指定正确项目目录**

## 使用说明

凡是命令中带有 `-pc` 的都是对 PC 端项目进行操作，凡是命令中带有 `-mobile` 的都是对移动端 Web 项目进行操作

## 简易使用

基于 PC 端举例

Step1: Clone 或者下载好项目

```
npm i
```

Step2: 开始创作

```
npm run dev-pc -w
```

命令执行成功后，在 `_post` 新建一个文件夹，这就是你的文章分类，然后在该文件夹下新建一个文件，文件名为 `[文章标题]-[时间].md`，打开以后开始尽情创作吧

Step3: 写完部署

```
npm run export-pc
```

命令执行成功后，在 PC 端项目目录下找到 `out` 文件夹，复制到你喜欢的 Web 服务器对应的 WebRoot 目录下，配置一下就可以了

## 完整使用

### 边写文章边预览

该命令另外加了 watch 功能，可以监控 `_post` 目录下所有文件夹和文件的改动，如果发生改动会自动生成博客数据文件，这意味着在 `_post` 下编辑完 Markdown 文件并且保存之后，可以立马在浏览器刷新看到页面效果 

```
npm run dev-pc -w 
# 或者 
npm run dev-mobile -w
```

需要注意的是，当你在 `_post` 目录下做如下这些操作之后，刷新浏览器可能会遇到 `404`，原因是分类和文章的唯一标识是依赖于它们的文件名生成的短 hash，而它是页面路由组成的一部分，路由映射关系详见 Next.js 关于 [`next.config.js`](https://nextjs.org/docs/#static-html-export) 的说明，当改变了文件名，数据文件已经更新，但是你正在浏览的页面 URL 可能没有及时改变，所以导致了 `404` 不过只是编辑 Markdown 文件内容则完全没有影响

+ 新建文件夹或者文件(增加文章分类或者增加一篇文章)
+ 删除文件夹或者文件(删除文章分类或者删除一篇文章)
+ 修改文件夹或者文件名称(修改文章分类的名称或者修改文章的标题)

**所以，目前的解决办法是访问首页，或者点击没有操作过的分类或者文章的链接**

**这个小问题，这是在修改分类文件夹和文章名称的时候会出现，不会影响导出**

### 修改页面

该命令效果等同于 Next.js 的 `next dev` 命令，但在 `next` 命令之前额外做了一些操作

```
npm run dev-pc 
# 或者 
npm run dev-mobile
```

### 生成博客数据

该命令会根据 `_post` 文件夹下的所有文件夹和文件自动生成博客数据文件写入 `db` 目录，页面数据来源于 `db` 目录的两个文件

```
npm run generate
```

### 监控 _post 文件夹
 
该命令会 watch `_post` 文件夹，一旦有文件发生新建，删除，修改的操作，自动生成博客数据文件

```
npm run watch
```

### 导出

该命令会导出你指定的 PC 端或者移动 Web 端的静态项目，成功导出后位于对应端下的的 `out` 目录，此时可以部署在任何你喜欢的 Web 服务器上

```
npm run export-pc 
# 或者 
npm run export-mobile
```

## 部署

推荐使用 Nginx 做 Web 服务器，我自己的配置会自动根据设备的请求来自动识别是 PC 还是移动端，然后响应不同的页面，配置示例如下：

```
server {
  listen 80;
  server_name blog.rback.fun;
  set $mobile no;

  if ($http_user_agent ~* "(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|mobile|nokia|iphone|ipad|android|samsung|htc|blackberry|Android|iPhone|Windows Phone|UC|Kindle|MicroMessenger|micromessenger|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino") {
    set $mobile yes;
  }

  if ($http_user_agent ~* "^(1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-)") {
    set $mobile yes;
  }

  location / {
    if ($mobile = no) {
      root /var/www/blog/PC/out;
    }

    if ($mobile = yes) {
      root /var/www/blog/Mobile/out;
    }

    index index.html;
    error_page 404 /404/index.html;
  }
}
```

## 文章数据和结构

页面所使用的博客数据来源于 `_post` 目录下扫描的所有文件和文件夹生成特定结构数据的文件

当执行带有生成博客数据功能的命令时，会在项目根目录下的 `db` 文件夹下生成 `article-meta.json` 和 `article-list.json` 两个文件

### `article-meta.json`

该文件描述了一个分类下完整的文章信息，但是不包含文章具体内容，一个合法的 `article-meta.json` 文件的结构示例为：

```
[
  {
    "category_id": "40dc0cf1",
    "category_name": "Program",
    "article_list": [
      {
        "id": "31d586af",
        "date": "20181227",
        "title": "Learn javascript"
      }
    ]
  }
]
```

整个博客项目，对于文章来说，只有分类一种属性

字段说明：

+ `category_id` 分类唯一标识，由分类名称 `hash` 生成
+ `category_name` 分类名称，由在 `_post` 下的文件夹名称而来 
+ `article_list` 该分类下所有文章信息

分类下文章信息字段说明：
+ `id` 文章唯一标识，由 Markdown 文件名 `hash` 生成
+ `date` 文章发表时间，由 Markdown 文件名截取而来
+ `title` 文章标题，由 Markdown 文件名截取而来

### `article-list.json`

该文件描述了对 `article-meta.json` 中具体某一文章内容的映射

一个合法的 `article-list.json` 文件的结构示例为：

```
{
  "31d586af": "### hello js",
}
```

**`article-meta.json` 和 `article-list.json` 文件为程序自动生成而来，请不要手动修改**

## 问题

在对 `_post` 目录添加 watch 功能时，使用了 `node-watch` 库，它的功能和官方提供的类似，但是不管 `node-watch` 还是官方的 watch 都会出现一些问题，有些编辑器在修改文件的时候会有其他动作

例如，在使用 `node-watch` 的前提下，WebStorm 中编辑文件，修改 `[test]-[20181228].md` 文件然后只保存一次，打印 listening 中 event 和 name 参数会看到如下信息：

```
remove---/Users/anonymous/Code/frontend/blog-birch/_post/Life/[test]-[20181228].md___jb_tmp___
update---/Users/anonymous/Code/frontend/blog-birch/_post/Life/[test]-[20181228].md
remove---/Users/anonymous/Code/frontend/blog-birch/_post/Life/[test]-[20181228].md___jb_old___
```

只对文件修改保存一次，但是会触发三次监听回调

如果使用 Visual Studio Code 编辑文件，即使在没有修改任何内容时，只要保存，就会触发一次监听回调

不过在 Visual Studio Code 中修改文件除了监听回调频率高一点，功能正常

但在 WebStorm 中，将生成特定结构的 JSON 数据写入 `db` 文件夹中的两个文件时，有概率写入错误格式的 JSON 数据，特别是在 Markdown 文件中有换行符的情况下

目前的解决办法是在监听回调中判断监控目标文件的后缀只能是空字符串或者 `.md` 才进行扫描生成写入逻辑

所以，当你使用了 `npm run dev -w` 或者 `npm run watch` 命令很不凑巧的遇到没有错误说明只有错误堆栈的异常时，可以优先检查一下 `db` 文件夹下的文件是否存在以及内容是否是标准 JSON 

