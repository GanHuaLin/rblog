# rblog

这是一个基于 Next.js 的博客项目

博客样式完全参照于锤子便签实现 

## 环境

推荐 Node.js v10.x 以上

## 贡献

该项目用于个人学习使用，同时也欢迎大家使用

但是不接受 pull request 如果你喜欢该项目并且有任何新的想法和需求可以自行 fork 之后自由发挥 

## 使用

### 边写文章边预览

该命令另外加了 watch 功能，可以监控 `_post` 目录下所有文件夹和文件的改动，如果发生改动会自动生成博客数据文件，这意味着在 `_post` 下编辑完 markdown 文件并且保存之后，可以立马在浏览器刷新看到页面效果 

```
yarn run dev -w 
# 或者 
npm run dev -w
```

**注意：当你在 `_post` 目录下做如下这些操作之后，刷新浏览器可能会遇到 `404`，原因是分类和文章的唯一标识是依赖于它们的文件名生成的短 hash，而它是页面路由组成的一部分，路由映射关系详见 Next.js 关于 [`next.config.js`](https://nextjs.org/docs/#static-html-export) 的说明，当改变了文件名，数据文件已经更新，但是你正在浏览的页面 URL 可能没有改变，所以导致了 `404` 不过编辑 markdown 文件内容则完全没有影响**

+ 新建文件夹或者文件
+ 删除文件夹或者文件
+ 修改文件夹或者文件名称

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

### watch _post 文件夹
 
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

## 注意

Next.js 中的 `next` `next build` `next export` `next start` 命令不能直接使用于该项目

该项目数据依赖于 `db` 目录下的 `article-meta.json` 和 `article-list.json` 文件，在执行上述 Next.js 提供的命令之前必须保证它们存在而且格式必须正确才可使用

## 规则

约定 `_post` 目录下的子级文件夹为文章的分类，称之为分类文件夹，所有 markdown 文件均放在对应的分类文件夹下

约定所有文章均为 markdown 编写，文件名后缀为 `.md` 

`_post` 目录规规则如下：

+ 目录下只能有文件夹，不能有任何文件

+ 目录下的分类文件夹里不能再有子级文件夹

+ 目录下的分类文件夹允许为空文件夹

+ 分类文件夹里只能放 `.md` 后缀结尾的文件，不能放文件夹和其他任何文件

markdown 文件规则如下：

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
+ `id` 文章唯一标识，由 markdown 文件名 `hash` 生成
+ `time` 文章发表时间，由 markdown 文件名截取而来
+ `title` 文章标题，由 markdown 文件名截取而来

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

但在 WebStorm 中，将生成特定结构的 JSON 数据写入 `db` 文件夹中的两个文件时，有概率写入错误格式的 JSON 数据，特别是在 markdown 文件中有换行符的情况下

目前解决办法是在 listening 中判断监控目标文件的后缀只能是空字符串或者 `.md` 才可以进行扫描生成写入逻辑

所以，当你使用了 `npm run dev -w` 或者 `npm run watch` 命令发现错误时，优先检查一下 `db` 文件夹下的文件是否存在以及内容是否是标准 JSON 


