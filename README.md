# :monkey_face: rblog

这是点子有点烂大街基于 [Next.js](https://nextjs.org/) 的静态博客项目，博客整体样式完全参照于锤子便签

说它烂大街是因为基于不同编程语言，核心功能一样，用的最多也比较有代表的已经有 Node.js 的 [Hexo](https://hexo.io) 基于 Ruby 的 [Jekyll](https://jekyllrb.com/) 基于 Go 的 [Hugo](https://gohugo.io/) ...

## 为什么会有这个项目

+ 我觉得静态博客的点子很棒，不需要数据库，任意一家云服务器厂商的最低配置就可以毫无压力的部署使用

+ 我觉得用 Markdown 写文章很酷，文章即数据，数据即文件，博客的核心数据是 Markdown 文件，而不是在数据库里被富文本编辑器处理过的字符串。你甚至不用做任何事或者只进行少量修改，就可以直接把你的 Markdown 文章迁移在笔记软件，或者 Github 和简书这样的网站中

+ 所用技术和自己想要的功能契合的刚刚好，既不复杂，也不简陋，打蚊子真正没用高射炮

+ 我想要一个简单好看，自己一手打造的博客 

+ 我想只用 JavaScript 这一种语言实现我的博客，我想用 ES6 的语法来写代码，我想用 React.js 中组件化的方式来组织我的页面结构

+ 我不会 Ruby 不会 Go

+ 我想实现喜欢的博客样式而不是只能用其他人的主题

+ Hexo 的自定义主题也考虑过，由于有一些限制和规则而且需要使用 ejs 之类的 Dynamic Web 技术不是我想要的

+ 我觉得再好的富文本编辑器可以解决较为复杂的文本编辑需要，却无法给你带来纯字符编辑的乐趣

+ 我想要了解 Next.js

+ 虽然我很努力的在"编"各种理由，但上面一条是认真的

## 环境

推荐 Node.js v10.x 以上

## 贡献

希望大家能够喜欢并且随意使用，但是不接受 pull request 如果你对该项目感兴趣并且有任何新的想法和需求可以自行 fork 之后自由发挥，随意修改 

## 规则

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

## 注意

由于该项目获取数据的特殊性，当使用 `npm run dev` 时，如果修改的是关于页面的代码，浏览器会自动刷新，如果是 `_post` 下的文件夹和文件的修改，需要手动刷新浏览器

Next.js 中的 `next` `next build` `next export` `next start` 命令不能直接使用于该项目

该项目数据依赖于 `db` 目录下的 `article-meta.json` 和 `article-list.json` 文件，在执行上述 Next.js 提供的命令之前必须保证它们存在而且格式必须正确才可使用

**所以请不要直接使用上面提到的 Next.js 原生命令，如果要使用，请先执行 `npm run generate` 命令**

## 简易使用

Step1: 项目刚下载

```
yarn
# 或者 
npm
```

Step2: 开始创作

```
yarn run dev -w 
# 或者 
npm run dev -w
```

命令执行成功后，在 `_post` 新建一个文件夹，这就是你的文章分类，再在该文件夹下新建一个文件名为 `[文章标题]-[时间].md` 的文件，打开以后开始尽情创作吧

Step3: 写完部署

```
yarn run export 
# 或者 
npm run export
```

命令执行成功后，在根目录找到 `out` 文件夹，复制到你喜欢的 Web 服务器对应的 WebRoot 目录下，配置一下就可以了

## 完整使用

### 边写文章边预览

该命令另外加了 watch 功能，可以监控 `_post` 目录下所有文件夹和文件的改动，如果发生改动会自动生成博客数据文件，这意味着在 `_post` 下编辑完 Markdown 文件并且保存之后，可以立马在浏览器刷新看到页面效果 

```
yarn run dev -w 
# 或者 
npm run dev -w
```

需要注意的是，当你在 `_post` 目录下做如下这些操作之后，刷新浏览器可能会遇到 `404`，原因是分类和文章的唯一标识是依赖于它们的文件名生成的短 hash，而它是页面路由组成的一部分，路由映射关系详见 Next.js 关于 [`next.config.js`](https://nextjs.org/docs/#static-html-export) 的说明，当改变了文件名，数据文件已经更新，但是你正在浏览的页面 URL 可能没有及时改变，所以导致了 `404` 不过只是编辑 Markdown 文件内容则完全没有影响。使用导出命令导出的静态页面不会出现这样的问题

+ 新建文件夹或者文件(增加文章分类或者增加一篇文章)
+ 删除文件夹或者文件(删除文章分类或者删除一篇文章)
+ 修改文件夹或者文件名称(修改文章分类的名称或者修改文章的标题)

我尝试过解决这个问题，但是没有成功

**所以，目前的解决办法是手动访问首页，或者点击没有操作过的分类或者文章的链接**

### 修改页面

该命令等同于 Next.js 的 `next` 命令，但在 `next` 命令之前额外做了一些操作

```
yarn run dev 
# 或者 
npm run dev
```

### 生成博客数据

该命令会根据 `_post` 文件夹下的所有文件夹和文件自动生成博客数据文件写入 `db` 目录，页面数据来源于 `db` 目录的两个文件

```
yarn run generate 
# 或者 
npm run generate
```

### 监控 _post 文件夹
 
该命令会 watch `_post` 文件夹，一旦有文件发生新建，删除，修改的操作，自动生成博客数据文件

```
yarn run watch 
# 或者 
npm run watch
```

### 导出

该命令会导出整个博客静态项目，成功导出后位于默认的 `out` 目录，此时可以部署在任何你喜欢的 Web 服务器上

```
yarn run export 
# 或者 
npm run export
```

### 预览

该命令可以预览模拟部署到真实 Web 服务器以后的页面效果

```
yarn run preview 
# 或者 
npm run preview
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
        "time": "20181227",
        "title": "Learn javascript"
      }
    ]
  }
]
```

整个博客项目，对于文章来说，只有分类一种属性

文章分类部分字段说明：

+ `category_id` 分类唯一标识，由分类名称 `hash` 生成
+ `category_name` 分类名称，由在 `_post` 下的文件夹名称而来 
+ `article_list` 该分类下所有文章信息

某一分类下所有文章信息字段说明：
+ `id` 文章唯一标识，由 Markdown 文件名 `hash` 生成
+ `time` 文章发表时间，由 Markdown 文件名截取而来
+ `title` 文章标题，由 Markdown 文件名截取而来

### `article-list.json`

该文件描述了对 `article-meta.json` 中具体某一文章内容的映射

一个合法的 `article-list.json` 文件的结构示例为：

```
{
  "31d586af": "### hello js",
}
```

## 问题

在对 `_post` 目录添加 watch 功能时，使用了 `node-watch` 库，它的功能和官方提供的类似，但是不管 `node-watch` 还是官方的 watch 都会出现一些问题，有些编辑器在修改文件的时候会有其他动作

例如，在使用 `node-watch` 的前提下，WebStorm 中编辑文件，修改 `[test]-[20181228].md` 文件然后只保存一次，打印 listening 中 event 和 name 参数会看到如下信息：

```
remove---/Users/anonymous/Code/frontend/blog-birch/_post/Life/[test]-[20181228].md___jb_tmp___
update---/Users/anonymous/Code/frontend/blog-birch/_post/Life/[test]-[20181228].md
remove---/Users/anonymous/Code/frontend/blog-birch/_post/Life/[test]-[20181228].md___jb_old___
```

只对文件修改保存一次，但是会触发三次 watch listening

如果使用 Visual Studio Code 编辑文件，即使在没有修改任何内容时，只要保存，就会触发一次 watch listening

不过在 Visual Studio Code 中修改文件除了 watch listening 频率高一点，功能正常

但在 WebStorm 中，将生成特定结构的 JSON 数据写入 `db` 文件夹中的两个文件时，有概率写入错误格式的 JSON 数据，特别是在 Markdown 文件中有换行符的情况下

目前解决办法是在 listening 中判断监控目标文件的后缀只能是空字符串或者 `.md` 才可以进行扫描生成写入逻辑

所以，当你使用了 `npm run dev -w` 或者 `npm run watch` 命令很不凑巧的遇到没有错误说明只有错误堆栈的异常时，可以优先检查一下 `db` 文件夹下的文件是否存在以及内容是否是标准 JSON 


