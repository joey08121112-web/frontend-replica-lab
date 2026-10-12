# 前端复刻实验室

把顶级官网变成前端教材的**交互式学习平台**：27 个关卡全部在浏览器页面内完成——不需要装任何东西，不需要打开任何文档。

> 在线体验：**GitHub Pages 首页即课程入口**（本项目 index.html 会带你进入 `learn.html`）

## 它解决什么问题

零基础学前端，最难受的不是没教程，而是教程看完了、眼睛会了、手还是不会。这个平台的思路是：不背知识点，直接把顶级官网「拆」了学。

## 每一关的完整闭环

- **十问卡片（Tag Lab）**：10 张卡片先考你，先自己想，再翻答案
- **页面内编辑器**：改代码 → Run → 右侧实时看渲染结果
- **Challenge 自动判分 + Debug 关**：专治「写错了但不知道错在哪」
- **Compare 对比**：你的实现 vs 参考实现，逐行看差异
- **盲审期末考**：不给提示直接考，过了才算真学会
- **进度存本地浏览器**：学没学会自己标记，随时可 Reset

## 三级成长路线：逐渐脱离教程

| 路线 | 模式 | 内容 |
|---|---|---|
| Project A · iPhone 18 Pro | Guided 强教学 | 15 关，每个标签、属性、设计决策的「为什么」讲透 |
| Project B · iPhone Duo | Assisted 半独立 | 6 关，先预测再揭示，没人先告诉你答案 |
| Project C · 沐光 HelioHub | Independent 独立 | 6 Phase，接虚构客户真实 Brief，设计判断全归你（制作中） |

## 本地运行

```bash
git clone https://github.com/joey08121112-web/frontend-replica-lab.git
cd frontend-replica-lab
python3 -m http.server 8000
# 打开 http://localhost:8000
```

纯静态、零依赖、零后端。

## 版权说明

- 课程素材（`assets/`）全部为**原创占位素材**（SVG），不含任何 Apple 官方图片
- 本公开版按版权要求**未收录** Apple 官网参考截图；课程中相应环节会引导你**前往 Apple 官网观察真实页面**——这本来就是该环节的教学意图
- 本项目为个人学习用途，与 Apple Inc. 无任何关联；「iPhone」「Apple」名称仅用于指称其公开网页

## 完整源码

本站为课程的可运行展示版；完整课程源码（含教案内容源与开发历史）见 [frontend-replica-course](https://github.com/joey08121112-web/frontend-replica-course)。
