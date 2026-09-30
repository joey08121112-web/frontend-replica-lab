/* ============================================================
   课程内容数据层
   Source of Truth 仍是 curriculum/*.md（备份与 AI 参考）；
   本文件是交互式学习平台的呈现数据。
   ============================================================ */
window.COURSE_DATA = {

principles: [
  { id:'P01', name:'One Clear Visual Focus', cn:'一个清晰的视觉焦点',
    one:'首屏只允许一个核心主张 + 一个视觉 + 一个 CTA。',
    apple:'iPhone 18 Pro Hero：一束聚光灯打在黑暗中，只有一个光源和一个巨大的标语「Pro 再超前」，没有第二个视觉锚点。',
    why:'用户视线第一秒只有一处可去，信息被"喂"进脑子而不是被"找"出来。竞争信息为零时，氛围（黑 + 光）才成立。',
    bad:'首屏同时塞大标题、八个卖点图标、轮播、两个按钮、客服浮窗——每一项都在喊"看我"，结果用户一个都没记住。',
    use:'任何产品官网 Hero：先写下"用户第一眼该记住哪一句话"，多余的全部下放。' },
  { id:'P02', name:'Dark Rhythm', cn:'深浅节奏 / 分区交替',
    one:'长页面用背景明度交替制造"章节翻页"感，而不是一色到底。',
    apple:'整页 body 纯黑，区块用 theme-dark 与 background-alt（稍亮的深灰）交替，staggered-start/end 让区块边缘圆角交错。',
    why:'滚动长页需要"章节感"，否则用户失去位置感；深浅交替制造节奏而不破坏整体氛围。',
    bad:'整页一个背景色一路黑到底，区块之间只靠内容区分——滚了三屏像滚了一屏。',
    use:'设计长页时先规划"分区节奏表"：哪几屏深、哪几屏浅、哪里转折。' },
  { id:'P03', name:'Craft in the Invisible', cn:'看不见处的工艺',
    one:'专业感 = 可见部分 × 不可见部分的乘积。',
    apple:'lang="zh-CN"、title「产品名 - 品牌 - 地区」公式、图片 alt 认真描述画面、价格挂脚注星号——用户看不见，机器看得见。',
    why:'alt 和 lang 让读屏器、搜索引擎、翻译工具都"看得懂"；页面再美，乱码一次就破功。',
    bad:'alt 全是空字符串、每页 title 都叫"首页"、价格没有条件说明。',
    use:'交付前自查：lang、title、alt、footnote 逐个过一遍；文件命名和注释也算"看不见处"。' },
  { id:'P04', name:'Hierarchy by Scale Jump', cn:'字号跳跃制造层级',
    one:'层级靠字号大幅跳跃（2~4 倍），不靠小步微调。',
    apple:'Hero 里产品名 h1 只有 32px/600，标语「Pro 再超前」却是约 80px 级——层级第一的元素反而不是最大的字号标签。',
    why:'人眼判断层级靠对比强度；差距越大阅读顺序越无需思考。24→22→20 的小步调字号反而层级模糊。',
    bad:'标题 28px、副标题 26px、正文 24px——三个"差不多大"，用户不知道先看哪。',
    use:'定字号系统用"跳跃"而不是"渐变"：如 17 / 21 / 28 / 48 / 80，跳档使用。' },
  { id:'P05', name:'One Primary Action', cn:'CTA 收敛',
    one:'任何一屏内，主按钮不超过一个，其余降级为文字链接。',
    apple:'Hero 右下角价格胶囊里只有一个蓝色「购买」按钮；每个 section 结尾最多一个主动作链接，次级动作用「进一步了解 ›」弱化。',
    why:'按钮越多点击越分散；Apple 要的是明确转化路径：看 → 懂 → 买。',
    bad:'一屏三个等大按钮（立即购买 / 立即咨询 / 立即下载）互相抢点击。',
    use:'每屏先指定"唯一的主动作"，其余全部降级为文字链接或幽灵按钮。' },
  { id:'P06', name:'The Asset Is the Design', cn:'素材即设计',
    one:'高级感主要由摄影/3D 素材产生，CSS 只负责排版和框住它。',
    apple:'Hero 的聚光灯场景、相机模组特写——产品只占画面小部分，大量面积留给光、影和负空间；文案极短。',
    why:'代码排不出"质感"，质感来自素材本身；网页审美一大半是"选素材/造素材"的能力。',
    bad:'文案写得满满当当、图片小而挤——页面像超市传单。',
    use:'没有强素材时，用留白 + 单色渐变模拟"负空间"，绝不往里塞内容补空。' },
  { id:'P07', name:'Whitespace Creates Hierarchy', cn:'留白创造层级',
    one:'留白不是浪费的空间：它给视线提供降落点，间距的松紧本身就是层级。',
    apple:'Hero 中产品名↔标语紧凑成一组，标语↔说明拉开成另一组——间距节奏替代分隔线完成分组；桌面 section 间距 160px 级。',
    why:'元素离得近 = 被理解为"一组"（格式塔邻近原则）；离得远 = 两个单元。间距直接表达信息结构，不需要任何装饰线。',
    bad:'所有间距一样小：信息糊成一堵墙；或所有间距一样大：分组关系消失。',
    use:'排版前先分组：一组的元素靠近（8~16px），组与组之间拉开（24~48px）；Section 之间再大一级（80~160px）。' },
  { id:'P08', name:'Typography Creates Reading Order', cn:'排版决定阅读顺序',
    one:'用户按视觉权重阅读：字号、字重、颜色对比共同决定"先看哪里"。',
    apple:'Hero 四级文字：80px 标语 → 32px 产品名 → 17px 说明 → 价格胶囊。视线顺序被排版完全规定，无需任何箭头或编号。',
    why:'人眼先被最大/最重/对比最强的元素吸引。排版就是"不用手指的指引"——它替用户做了阅读排序。',
    bad:'全页文字两三个字号、统一字重：用户被迫自己找重点，阅读成本上升，跳出率上升。',
    use:'写完文案后先排"注意力优先级"：第 1 眼看什么、第 2 眼看什么——再用字号/字重/颜色实现它。' },
  { id:'P09', name:'Semantic Hierarchy ≠ Visual Size', cn:'语义层级 ≠ 视觉大小',
    one:'HTML 标题等级表达文档结构；CSS 字号表达视觉大小。两套系统，各自独立。',
    apple:'实测 h1 是 32px 的"iPhone 18 Pro"，而视觉最大的"Pro 再超前"约 80px，且 HTML 里只是一个 <p>（连标题元素都不是）——语义最高级不必是画面最大字，语义层级与视觉大小确实是两套系统。',
    why:'语义回答"这一页讲什么、分几部分"（给机器、读屏器、搜索引擎）；视觉回答"先看哪里"（给人眼）。需求不同，工具不同。',
    bad:'"哪个字最大哪个当 h1"——把视觉判断写进结构，文档大纲失真，读屏器"目录"全乱。',
    use:'写 HTML 时问"这是第几级"，写 CSS 时问"该多大多小"。两问分开，结构就再也不会错。' },
  { id:'P10', name:'Action Hierarchy Controls Attention', cn:'动作层级决定行动顺序',
    one:'Primary / Secondary / Tertiary：一屏至多一个 Primary，其余降级为文字链接或幽灵按钮。',
    apple:'Hero 整屏只有价格胶囊里一个 filled 蓝色「购买」；「进一步了解 ›」、"选购 iPhone ›" 全部是文字链接——视觉权重严格对齐商业意图。',
    why:'注意力是稀缺预算。动作权重 = 用户行动顺序：等权重 = 没有顺序 = 用户犹豫 = 流失。',
    bad:'三个等大的蓝色按钮（立即购买 / 立即咨询 / 立即下载）互相抢点击。',
    use:'排版前先回答："这一屏最想让用户做的唯一一件事是什么？"——把它做成唯一的 filled，其余全部降级。' },
  { id:'P11', name:'Interaction Feedback Confirms Intent', cn:'交互反馈确认意图',
    one:'每个可交互元素都要有轻微的状态反馈（hover/focus/active），但反馈是确认，不是表演。',
    apple:'「购买」hover 时蓝色轻微变亮；文字链接 hover 出现下划线——克制到几乎不被察觉，却让人确信"可以点"。',
    why:'反馈建立"界面在回应我"的可操控感；没有反馈像坏了，反馈过度像马戏团。两者都让用户分心。',
    bad:'hover 时放大 1.2 倍 + 发光 + 弹跳 + 阴影三件套——注意力从内容被抢到控件自己身上。',
    use:'给每个 CTA 做四态自查：default / hover / focus / active，每态最多改变一个维度（颜色或 1px 级位移），时长 150~250ms 级。' },
  { id:'P12', name:'Accessibility Is Part of Interaction Design', cn:'无障碍是交互设计的一部分',
    one:'键盘用户没有 hover，只有 focus。删掉焦点环不是"视觉优化"，是拆掉一部分交互。',
    apple:'Apple 全站保留 :focus-visible 焦点环、允许页面缩放、图片 alt 认真描述——无障碍与其设计语言融为一体，不是补丁。',
    why:'键盘、读屏、放大镜用户是真实用户的一部分；语义元素（a/button）+ 完整焦点环 = 浏览器免费赠送的无障碍基础。',
    bad:'outline:none 一删了之 + user-scalable=no 禁止缩放——键盘认路和放大需求同时被没收。',
    use:'交互自查清单永远包含：Tab 能走一圈吗？focus 环可见吗？点击目标语义正确吗（a vs button）？' },
  { id:'P13', name:'Composition Controls Attention', cn:'构图分配注意力',
    one:'主体大小、位置与裁切，决定了用户先看哪里——构图就是注意力的排版。',
    apple:'Hero 聚光灯场景：光源与产品都在画面右半区，产品约占一半版面——力量感与负空间平衡，视线自然从标语落向产品。',
    why:'人眼先看最大/最亮/最居中的东西。主体过大挤压一切、过小失去力量、裁切偏掉重心——构图错误时，任何排版都救不回来。',
    bad:'产品占满全部版面（没有文字落点）或缩成一角（没有力量感）；cover 裁切随意，产品被切掉一半。',
    use:'放置产品图前先问三件事：占多大？重心在哪？文字落点在哪？——用 object-position 与 max-width 回答它们。' },
  { id:'P14', name:'Negative Space Is Usable Space', cn:'负空间是可用空间',
    one:'图片里"空着的地方"不是浪费——它是留给文字、视线与呼吸的设计空间。',
    apple:'Hero 大图自带大面积暗部负空间，文案与 CTA 直接安放其中，图文互不侵犯；Stage 4 教学素材也按"产品在右、负空间在左"构图。',
    why:'负空间同时完成三件事：突出主体（P01）、安放文字、建立节奏。压满的图没有给信息留位置，文字只能压在主体上打架。',
    bad:'文字硬压在产品身上——两个视觉主体竞争，谁也看不清；或选一张毫无留白的素材，逼死排版。',
    use:'选素材时就看"它给文字留了哪里"；构图时把负空间当作版面的一半来经营。' },
  { id:'P15', name:'Different Screens May Need Different Art Direction', cn:'不同屏幕可能需要不同构图',
    one:'响应式不只是缩放——手机值得一张重新构图的图（picture + media）。',
    apple:'Apple 为桌面与移动准备不同裁切的资源，picture/source 大量使用（实测 166 picture / 581 source）；窄屏竖构图保住视觉重心。',
    why:'宽幅构图硬缩到 390px 时主体变得极小、负空间失去意义——Art Direction 让每个屏幕都看到"为它拍的"那张图。',
    bad:'一张 16:9 大图走天下：手机上产品小如邮票，或靠 cover 硬裁把主体裁丢。',
    use:'先问"手机上的视觉重心在哪"，再决定共用一张还是用 picture 换构图；窄屏候选写 max-width 媒体条件。' },
  { id:'P16', name:'Alternating Rhythm Creates Flow', cn:'交替节奏制造流动感',
    one:'相邻模块的图文方向左右交替，让长滚动页产生"翻页"式的阅读律动。',
    apple:'iPhone 18 Pro 页面中段的性能/摄像头/电池等模块图文左右交替（视觉观察，Stage 0 解剖确认）——长页被切成有节奏的"对页"。',
    why:'同向排列让视觉路径一成不变，读者后半页开始"滑读"；交替强迫视线每次重新入场，模块之间的边界自然清晰。',
    bad:'十个模块全部左文右图——从第四个开始，用户已经不再"看"，只剩"扫"。',
    use:'排模块清单时先画方向表：图左/图右交替；用 order 或 DOM 顺序实现，兼顾移动端堆叠后的阅读逻辑。' },
  { id:'P17', name:'Consistency Is a System', cn:'一致性构成系统感',
    one:'同族元素（卡片/按钮/图标）共享统一的底色、圆角、内边距与字号——一致性让个体读作系统。',
    apple:'Apple 页面的卡片矩阵：统一圆角、统一间距、统一字阶（视觉观察）——四张卡读作"一个系统"而非四个贴片。',
    why:'一致性降低认知成本：用户学会一次规则，处处适用；混搭风格则每个元素都要重新理解。',
    bad:'四张卡片四种圆角四种底色——像临时拼凑的展销摊。',
    use:'先定义卡片 token（底色/圆角/内边距/gap/字号），再批量套用；改系统一处，全局生效。' }
],

projects: [

/* ================= PROJECT A ================= */
{ id:'A', name:'Project A · iPhone 18 Pro', mode:'Guided 强教学',
  stages: [

/* ---------- Stage 0 ---------- */
{ id:'stage-0', num:0, title:'页面解剖', short:'整体解剖', status:'ready', minutes:'50–70 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'先看清整座山，再开始爬山。这一关不上手写代码——你将看到两个复刻目标的完整地图、平台怎么用、以及贯穿全程的设计原则库。',
    items:[
      '看清 Project A / B / C 三级成长路线：Guided → Assisted → Independent',
      '认识 iPhone 18 Pro 页面的 12 个核心模块，知道每个模块将在第几关被你亲手复刻',
      '记住几条实测数据（body 纯黑、19 个 section、字号 32px→80px 跳跃……）',
      '浏览 P01~P06 设计原则库——它们会在每一关反复出现',
      '学会用平台：改代码 → Run → 看结果 → Quiz → Checklist → 标记学会'
    ]},

  { type:'route' },

  { type:'factgrid', title:'实测硬数据', lead:'来自 2026-09 对两个真实页面的 DevTools 实测。这些数字以后每一关都会回来找你。',
    facts:[
      { n:'19', t:'main 里的 section 数量——每个都是独立主题区' },
      { n:'166', t:'picture 元素数量——响应式图片的载体' },
      { n:'154', t:'懒加载占位图——滚动到附近才换真图' },
      { n:'13', t:'video 元素——产品影片无处不在' },
      { n:'#000', mono:true, t:'body 背景——整页高级感的底色' },
      { n:'32→80', t:'Hero h1 与标语的字号跳跃（P04）' },
      { n:'160px', t:'桌面端 section 间距（ps-spacing-large-160）' },
      { n:'4~5 个', t:'整页在转的颜色数量——克制配色' }
    ],
    note:'字体栈实测："SF Pro SC", "SF Pro Display", "PingFang SC"；类名体系：theme-dark（深色）/ background-alt（交替层）/ staggered-start/end（交错圆角）。Apple 也有瑕疵——页面里出现了第二个 h1，规范上一页最好只有一个。学原则，不迷信权威。' },

  { type:'pagemap', title:'页面结构地图', lead:'点击任意模块，看它是什么、将在第几关复刻、涉及哪些技术、训练什么设计能力。',
    pages:[
      { id:'pro', name:'iPhone 18 Pro',
        modules:[
          { name:'Hero 主视觉', what:'聚光灯场景 + 产品名 + 大标语「Pro 再超前」+ 价格胶囊。首屏只有一个焦点。', stage:'Stage 2~5', h:['section','h1','h2','p','a','picture'], c:['background-color','max-width','clamp()'], j:[], skill:'视觉焦点 · 层级 · 留白', p:'P01 / P04 / P05' },
          { name:'全局导航', what:'Apple / 商店 / Mac / iPad / iPhone … 顶部 44px 黑条。', stage:'Stage 6', h:['header','nav','ul','li','a'], c:['flex','gap','hover'], j:[], skill:'结构语义 · 导航设计', p:'' },
          { name:'产品子导航', what:'「iPhone 18 Pro ｜ 探索 ▾ ｜ 购买」——滚动时吸顶。', stage:'Stage 7', h:['nav','a'], c:['position: sticky'], j:[], skill:'滚动行为 · 层级', p:'' },
          { name:'先刷重点', what:'影片按钮 + 四项选项卡图库（摄像头 / A20 Pro / 颜色 / 电池）。', stage:'Stage 10', h:['ol','li','button'], c:['grid','border-radius'], j:['选项卡切换'], skill:'卡片矩阵 · 内容密度', p:'P02' },
          { name:'设计 · 颜色选择器', what:'「一体成型的杰作」+ 四色切换（酒红 / 冰川蓝 / 银 / 黑）+ AR。', stage:'Stage 11', h:['button','img','data-*'], c:['transition'], j:['点击换色 ★核心交互'], skill:'交互反馈 · 状态', p:'' },
          { name:'性能', what:'「2 纳米芯旗舰」A20 Pro + 4 个子模块 + VC 均热板。', stage:'Stage 8', h:['section','h2','h3','p','figure'], c:['flex 两栏','align-items'], j:['滚动显现'], skill:'图文节奏 · 深浅分区', p:'P02' },
          { name:'Pro 级拍摄系统', what:'三摄规格 + 可变光圈四档选项卡 + 功能图库。', stage:'Stage 10', h:['ul','li','button'], c:['grid','tab 样式'], j:['tab 切换'], skill:'规格排版 · 信息层级', p:'' },
          { name:'Pro 级视频', what:'产品影片区：电影效果、低光视频、ProRes RAW……', stage:'Stage 9', h:['video'], c:['object-fit','全宽'], j:['自动播放控制'], skill:'素材气质 · 负空间', p:'P06' },
          { name:'电池续航', what:'「更强续航力」43 小时 + 快充模块。', stage:'Stage 8', h:['section','p'], c:['flex'], j:[], skill:'数字强调 · 层级', p:'P04' },
          { name:'机型对比', what:'「升级值不值」与 12 款旧机型对比 + vs iPhone Duo 表格。', stage:'Stage 13', h:['table','dl'], c:['grid 排版'], j:['下拉选择（选做）'], skill:'表格设计 · 对齐', p:'' },
          { name:'页脚', what:'脚注体系 + 站点地图 + 版权。', stage:'Stage 13', h:['footer','nav','h3','ul'], c:['多列 grid','小字排版'], j:[], skill:'信息架构 · 看不见处', p:'P03' },
          { name:'环境 / 价值观', what:'40% 回收材料等——同一模板的重复，做一个代表即可。', stage:'简化复刻', h:['section','h3'], c:[], j:[], skill:'模板复用取舍', p:'' }
        ]},
      { id:'duo', name:'iPhone Duo · Assisted 六关（M1–M6）',
        modules:[
          { name:'M1 拆解 Duo Hero', what:'预测先行：焦点 / 结构 / 定位 / 要不要 JS——你先判断并标注 Confidence，再看 Observation 校准。', stage:'M1', h:['由你判断'], c:['由你判断'], j:['先预测'], skill:'证据意识 · 校准', p:'P04' },
          { name:'M2 折叠状态模型', what:'closed / half / open——什么在变、什么在驱动？状态建模与同步，加上你的第一只 Bug Journal。', stage:'M2', h:['由你判断'], c:['由你判断'], j:['由你判断'], skill:'UI = f(state)', p:'' },
          { name:'M3 双屏响应式布局', what:'多解合法：布局方案由你选并说明理由，判分只看几何与响应行为。', stage:'M3', h:['由你判断'], c:['由你判断'], j:[], skill:'自主选型 · 论证', p:'P17' },
          { name:'M4 交互叙事', what:'这个效果 CSS 够还是需要 JS？成本分析决策 + FAQ 手风琴 + 滚动显现。', stage:'M4', h:['由你判断'], c:['由你判断'], j:['由你判断'], skill:'技术决策', p:'P11' },
          { name:'M5 复杂模块重建', what:'无教程：只有 Reference、Requirements 与验收标准——三级帮助计入 Independence。', stage:'M5', h:['由你判断'], c:['由你判断'], j:['由你判断'], skill:'独立重建', p:'' },
          { name:'M6 独立重建', what:'Duo 精华页自主实现，导出你的 Independent Reconstruction Artifact——Project B 毕业。', stage:'M6', h:['由你判断'], c:['由你判断'], j:['由你判断'], skill:'整合与交付', p:'P01~P17' }
        ]}
    ]},

  { type:'principles', title:'Apple Design Principles 知识库', lead:'每关新发现的原则都会登记进来。它们不只是"Apple 为什么好看"，更是你未来原创产品的 Checklist。' },

  { type:'quiz', title:'热身 Quiz', questions:[
      { q:'下列哪个组件是 iPhone Duo 页面有、而 iPhone 18 Pro 页面没有（或弱得多）的？',
        options:['FAQ 手风琴（约 14 问展开/折叠）','全局导航','颜色选择器','规格对比表'], answer:0,
        explain:'Duo 的「有问，就有答。」FAQ 区是 M4 的训练重点（手风琴由你选型实现）；其余三者两个页面都有。' },
      { q:'实测中，Apple 把整页背景纯黑（rgb(0,0,0)）设置在哪个元素上？',
        options:['html','body','main','每个 section 各自设置'], answer:1,
        explain:'body 是最常用的背景承载者。Stage 2 我们会亲手复刻这一行 CSS。' },
      { q:'Apple Hero 里，层级最高的元素是？',
        options:['h1「iPhone 18 Pro」（32px）','标语「Pro 再超前」（约 80px 级）','价格胶囊按钮','聚光灯图片'], answer:1,
        explain:'视觉层级和 h1 标签不是一回事——层级靠字号对比制造（P04），代码里最大的标题未必是画面里最大的字。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我能说出 Project A / B / C 三种模式分别怎么学',
      '我能对照模块地图说出 Hero 会在 Stage 2~5 复刻',
      '我记住了至少 3 条实测数据（如 body 纯黑 / 19 个 section）',
      '我浏览了 P01~P06 六条设计原则',
      '我打开了真实的 Apple 页面并按 F12 看了一眼结构'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['两个页面', '18 Pro 是布局百科全书；Duo 是组件与交互进阶'],
      ['技术地图', '每个模块 → 第几关复刻 → 用什么 HTML/CSS/JS'],
      ['原则库', 'P01~P06 已就位，后续每关追加'],
      ['平台规则', 'Learn → Try → Run → See → Think → Debug → Pass 全在页面内完成']
    ],
    next:{ stage:'stage-1', text:'进入 Stage 1：亲手写下你的第一个 HTML 文件' } }
]},

/* ---------- Stage 1 ---------- */
{ id:'stage-1', num:1, title:'HTML 文档骨架', short:'文档骨架', status:'ready', minutes:'150–180 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'从零写出一个结构正确的空白页面——后面 13 关的所有模块都长在这副骨架上。本关刻意没有一个"好看"的东西：结构归 HTML，视觉归 CSS，行为归 JS，三层职责从第一天分开。',
    items:[
      '写出 6 个骨架知识：DOCTYPE / html / lang / head / meta / title / body',
      '会诊断三类经典事故：怪异模式、乱码、手机缩放异常',
      '第一次使用 DevTools：Elements 面板 + Console',
      '理解"看不见处的工艺"（P03）：lang、title、alt 这些没人看的地方才是专业感'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'无标题页面', note:'BEFORE：什么都没有', dark:false, blank:'（空白文件）' },
    after:{ tab:'iPhone 18 Pro 复刻练习 - 我的前端教室', note:'AFTER：画布仍空白，但结构正确', dark:false, blank:'html ✓ head ✓ body ✓' },
    caption:'画布仍然空白是刻意的——本关只解决"结构正确"。Stage 2 第一批 CSS 会让页面第一次变黑。' },

  { type:'apple', title:'Apple 对应位置', img:'curriculum/reference/18pro-hero-desktop.png',
    imgCap:'iPhone 18 Pro 首屏（桌面 1440px 实拍截图，存在 curriculum/reference/）。你看到的每一层背后，都是本关的骨架知识。',
    points:[
      ['<title>', '标签页上的「iPhone 18 Pro 和 iPhone 18 Pro Max - Apple (中国大陆)」= 内容名 + 品牌 + 地区公式'],
      ['<head>', '幕后有 25 个 meta + 8 个 CSS——页面再大，骨架一模一样'],
      ['<html lang>', 'zh-CN——读屏器中文发音、翻译工具识别原文的依据'],
      ['<body>', '背景纯黑 rgb(0,0,0)——整页高级感的底色就设在这里'],
      ['alt', '每张图片 alt 都认真描述画面——P03 看不见处的工艺']
    ]},

  { type:'taglab', title:'Tag Lab · 骨架九件套', lead:'每张卡片七个标签页：是什么 / 什么时候用 / 最小例子 / Apple 官网例子 / 对比辨析 / 常见错误 / 马上练习。先自己想，再翻开看。',
    tags:[
    { tag:'<!DOCTYPE html>', cn:'文档类型声明', one:'一行"声明"：告诉浏览器"我是现代 HTML，请用标准规则渲染我"。',
      what:'它其实不是标签，是声明。必须是文件的<b>第一行</b>，上面不允许有任何东西。',
      when:'每个新 HTML 文件的第一行，无一例外。',
      min:'<!DOCTYPE html>',
      apple:'打开 apple.com.cn/iphone-18-pro/ → 右键「查看页面源代码」，第一行就是它。全世界现代网站都一样。',
      vs:'它不是元素：不进 DOM 树、不能被 CSS 选中。真正构成树的根是 &lt;html&gt;。',
      errs:'忘写 → 页面照常显示（最阴险），但浏览器进入<b>怪异模式</b>，CSS 行为诡异且难排查。验证：Console 输入 document.compatMode，"BackCompat"=出事，"CSS1Compat"=正常。',
      try:'动手：故意去掉 DOCTYPE，在 Console 查 document.compatMode 记下结果；加回来再查一次。这两个返回值就是你未来的第一件排错武器。' },
    { tag:'<html>', cn:'根元素', one:'整份文档的根，一切内容装在它里面——像"整栋楼"。',
      what:'页面唯一的最外层容器，只有两个孩子：<b>head</b> 和 <b>body</b>。',
      when:'DOCTYPE 之后，包住全部内容；一页只有一个。',
      min:'<html lang="zh-CN">\n  <head>…</head>\n  <body>…</body>\n</html>',
      apple:'实测 Apple 中国站：&lt;html lang="zh-CN"&gt;。各语言站点只换 lang（ja-JP / en-US…），结构全球通用。',
      vs:'html 管"整份文档"（含看不见的元信息 head）；body 只管"看得见的内容"。',
      errs:'忘写 lang → 页面照常，但英文读屏器把中文逐字发怪音，搜索引擎也判断不准语言。',
      try:'lang="zh-CN" 里 zh 和 CN 各代表什么？如果给台湾用户做繁体页，lang 应该写什么？' },
    { tag:'lang', cn:'语言声明（属性）', one:'写在 &lt;html&gt; 上的属性，告诉浏览器 / 读屏器 / 搜索引擎"这是什么语言"。',
      what:'属性而非标签。zh=中文，CN=中国（地区变体）。局部多语言内容也可以在任意元素上标 lang。',
      when:'每个页面的 &lt;html&gt; 都应声明；混排内容局部标注。',
      min:'<html lang="zh-CN">',
      apple:'Apple 各地区站点只换 lang——一套结构全球复用，这是"一套代码，全球部署"的地基之一。',
      vs:'lang vs charset：lang 管"这是什么语言"（发音、字形、翻译）；charset 管"用什么编码解码"。两个完全不同的问题。',
      errs:'缺失或写错 → 读屏器发音规则错误、浏览器选错默认字体、翻译工具误判。',
      try:'打开 Apple 页面 DevTools → Elements，找到最顶上的 &lt;html&gt;，读出它的 lang 值。' },
    { tag:'<head>', cn:'幕后信息区', one:'用户看不到、但浏览器和搜索引擎需要的信息区。',
      what:'存放"关于页面的信息"：编码、视口、标题、描述、样式表地址。<b>信息归 head，内容归 body</b>，各管各的。',
      when:'&lt;html&gt; 里、&lt;body&gt; 之前；每个页面必备。',
      min:'<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" …>\n  <title>…</title>\n</head>',
      apple:'实测这页 head 有 25 个 meta + 8 个 CSS 文件——大网站幕后很重，但骨架和我们写的一模一样。',
      vs:'<b>head vs header——新手第一大混淆</b>：head 是看不见的幕后信息区；header 是看得见的页头导航条。拼写差两个字母，职能毫无关系。',
      errs:'把要显示的内容（如产品介绍）写进 head → 不显示，还以为代码写错了。其实是放错了房间。',
      try:'判断放 head 还是 body，说理由：① 大标题"iPhone 18 Pro" ② 编码声明 ③ 一段产品介绍。' },
    { tag:'meta charset', cn:'编码声明', one:'"我的文件用 UTF-8 保存，请用同一套规则解码"——防乱码。',
      what:'计算机里所有文字都是数字编码；保存用一种编码、解码用另一种，中文就变"æå"天书。声明 UTF-8 让双方统一。',
      when:'head 的第一条，越靠前越好——浏览器解码正文前必须读到它。',
      min:'<meta charset="UTF-8">',
      apple:'Apple 页面同样有它。中文站点没有它，一次编码事故全页天书。',
      vs:'meta 是"关于数据的数据"，可以有很多个各管一件事：这条管编码，viewport 那条管手机视口，description 那条管搜索摘要。',
      errs:'缺失或声明与实际保存编码不符 → 乱码。注意：VS Code 右下角可查看/切换文件实际保存编码，两边必须一致。',
      try:'想一想：如果把 charset 写成 utf-16 但文件实际是 UTF-8 保存的，会发生什么？' },
    { tag:'viewport', cn:'手机视口声明', one:'"我的页面宽度 = 设备宽度，初始不缩放"——响应式的地基。',
      what:'一条 meta 声明，写给<b>手机浏览器</b>看："请把布局宽度当作设备宽度，不要假装自己是桌面"。',
      when:'所有响应式页面必备。没有它，手机浏览器会假装自己是 980px 宽的桌面，把整页缩小。',
      min:'<meta name="viewport" content="width=device-width, initial-scale=1">',
      apple:'Apple 页面有完全相同的一条。你在手机上打开 Apple 页面字清晰可读，这行声明功不可没。',
      vs:'width=device-width=宽度跟随设备；initial-scale=1=初始缩放 1 倍。后面还会见到 maximum-scale、user-scalable——后者慎用。',
      errs:'写成 user-scalable=no 禁止用户缩放 → 视力不佳的用户没法放大页面，伤害无障碍。Apple 从不这么干。',
      try:'用自己的话向别人（或橡皮鸭）解释这行代码的两个参数各是什么意思。' },
    { tag:'<title>', cn:'页面标题', one:'页面的名字：显示在浏览器标签页、收藏夹、搜索结果标题。',
      what:'head 里必须有且只有一个，内容是纯文字。它是 SEO 权重最高的单点。',
      when:'每个页面都要有，而且每页应该不同。',
      min:'<title>关于我们 - 我的咖啡店</title>\n<!-- 公式：内容名 + 品牌 -->',
      apple:'实测：「iPhone 18 Pro 和 iPhone 18 Pro Max - Apple (中国大陆)」= 内容 + 品牌 + 地区。起 title 直接抄这个公式。',
      vs:'<b>title vs h1</b>：title 给浏览器和搜索引擎（显示在标签页上）；h1 给读者（页面里最大的标题）。两者可以不同。',
      errs:'全站每页都叫"某某官网"→ 开十个标签页分不清；反向错误：堆十几关键词骗排名 → 被搜索引擎降权。',
      try:'给复刻页写一个仿 Apple 公式的 title；再想一步：未来你原创产品官网的 title 又该怎么写？' },
    { tag:'description', cn:'页面摘要', one:'搜索结果里标题下面那段介绍文字，来自这一条 meta。',
      what:'&lt;meta name="description"&gt;，每页一段 80 字以内的独特描述，说清"这页是什么"。',
      when:'head 里；每页内容不同。',
      min:'<meta name="description" content="80 字以内的页面摘要">',
      apple:'Apple 每个产品页都有独特 description——搜索"iPhone 18 Pro"结果里的摘要就来自它。',
      vs:'title 是"名字"（权重最高）；description 是"一句话广告"（影响点击率）。',
      errs:'全站复制同一段描述 → 被视为低质量；写太长 → 搜索结果里被截断。',
      try:'为你的复刻页写一条 description：说清"这是什么项目 + 在练什么能力"。' },
    { tag:'<body>', cn:'文档主体', one:'所有用户看得见的内容的容器。Stage 2 起我们写的一切都进 body。',
      what:'head 给机器，body 给人。从下一关开始，header、nav、main、section、footer……全部长在 body 里。',
      when:'head 之后；一页只有一个。',
      min:'<body>\n  <h1>你好，世界</h1>\n</body>',
      apple:'实测 body 背景纯黑 rgb(0,0,0)，里面依次是：全局导航、产品子导航、main（19 个 section）、footer——和我们的课程路线图完全对应。',
      vs:'重要认知：body 不是"屏幕"，它是文档的内容根；但对 CSS 来说它是最常用的背景色承载者。',
      errs:'内容全堆进 body 不分结构 → 读屏器不知道哪是导航、CSS 无处下手、三个月后的你也读不懂。结构是给未来留的路。',
      try:'DevTools 里数 Apple 页面 body 的直接子元素：几个 nav？几个 main？几个 footer？（答案：2 / 1 / 1）' }
    ]},

  { type:'lab', kind:'title', title:'实验室 1 · title 到底出现在哪', desc:'修改下面的标题文字，看右上方模拟浏览器标签页的即时变化。这就是 &lt;title&gt; 的"视觉位置"——不在页面里，在标签页上。' },

  { type:'lab', kind:'bodybg', title:'实验室 2 · body 背景与"高级感"', desc:'点击切换 body 背景。Apple 把它设为纯黑——观察同一份白色文字在三种底色下的气质差异。背景色是整页氛围的第一开关（P02）。' },

  { type:'lab', kind:'viewport', title:'实验室 3 · viewport 在防什么事故', desc:'切换 Desktop / Mobile 模拟：没有 viewport 声明时，手机会假装 980px 宽桌面，把整页缩小——字小到看不清。加了声明，宽度才真正跟随设备。',
    vpHtml:'<div style="padding:20px"><h1 style="margin:0 0 8px;font-size:24px">iPhone 18 Pro</h1><p style="margin:0;font-size:15px;line-height:1.6">Pro 再超前。这段文字在没有 viewport 声明的手机上会被缩小到难以阅读。</p></div>' },

  { type:'lab', kind:'choose', title:'实验室 4 · 结构判断', q:'页面顶部那条<b>看得见的</b>导航条，应该用哪个标签？',
    options:[
      { t:'<header>', ok:true, why:'正确。header 是看得见的页头结构，导航条通常包在 header > nav 里。' },
      { t:'<head>', ok:false, why:'head 是看不见的幕后信息区——用户永远看不到它的内容。' },
      { t:'<html>', ok:false, why:'html 是整份文档的根，不是某个具体区域。' }
    ]},

  { type:'domviz', title:'DOM Visualizer · 代码 ↔ 树 ↔ 页面', lead:'点击左边的树节点（或右边的区域），看"代码里的标签"对应"页面中的哪个位置"。先点 head 试试，再点 body。',
    tree:[
      { id:'doctype', label:'<!DOCTYPE html>' },
      { id:'html', label:'html lang="zh-CN"', children:[
        { id:'head', label:'head', children:[
          { id:'meta-charset', label:'meta charset' },
          { id:'meta-viewport', label:'meta viewport' },
          { id:'title', label:'title' }
        ]},
        { id:'body', label:'body' }
      ]}
    ],
    notes:{
      'doctype':'<!DOCTYPE html> 是渲染模式开关：决定浏览器用标准规则还是怪异模式。不可见，但影响全部 CSS。',
      'html':'根元素 = 整栋楼。lang="zh-CN" 告诉机器这是简体中文（中国）。',
      'head':'幕后信息区：用户看不到，浏览器和搜索引擎需要。点击右上"显示幕后"可以把它展开看。',
      'meta-charset':'编码说明书：没有它中文可能变天书。必须放在 head 最前面。',
      'meta-viewport':'手机视口说明书：没有它手机整页缩小。响应式的第一行。',
      'title':'页面的名字：head 里唯一"露脸"的地方——看顶部标签页文字。',
      'body':'内容容器：Stage 2 起一切看得见的东西都放这里。Apple 把背景纯黑设在这里（实验室 2 你刚体验过）。'
    }},

  { type:'challenge', title:'Coding Challenge · 补全 iPhone 18 Pro 页面骨架',
    task:'从零写出完整骨架。要求：DOCTYPE 在第一行、html 带 lang="zh-CN"、head 里有 charset + viewport + title（自拟，仿 Apple 公式）、body 存在。写完点「检查答案」。',
    starter:'<!-- TODO 1: 第一行声明（现代标准模式） -->\n<!-- TODO 2: 根元素 + 简体中文语言声明 -->\n<!-- TODO 3: 幕后信息区：UTF-8 编码 + 手机视口 + 页面标题 -->\n<!-- TODO 4: 内容容器（先空着） -->\n',
    checks:[
      { label:'第一行是 <!DOCTYPE html>', re:/^\s*<!doctype html>/i },
      { label:'html 标签带 lang="zh-CN"', re:/<html[^>]*lang\s*=\s*["']zh-cn["']/i },
      { label:'有 <head> 区', re:/<head[\s>]/i },
      { label:'charset 声明为 UTF-8', re:/<meta[^>]*charset\s*=\s*["']?utf-8/i },
      { label:'有 viewport 声明', re:/name\s*=\s*["']viewport["']/i },
      { label:'title 有实际内容（不是空的）', re:/<title>\s*\S[\s\S]*?<\/title>/i },
      { label:'有 <body> 区', re:/<body[\s>]/i }
    ],
    hints:[
      '顺序口诀：声明 → 根 → 幕后 → 内容。DOCTYPE 永远第一行；html 包住一切。',
      'head 里三条 meta/title 的推荐顺序：charset 最前 → viewport → title。',
      'title 用公式：内容名 + 品牌，例如「iPhone 18 Pro 复刻练习 - 我的前端教室」。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <title>iPhone 18 Pro 复刻练习 - 我的前端教室</title>\n    <meta name="description" content="前端学习项目：从零复刻 Apple iPhone 18 Pro 产品页。">\n  </head>\n  <body>\n    <!-- Stage 2 将在这里种下 header / nav / main / footer -->\n  </body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 五处事故现场',
    story:'下面这份"能打开"的页面藏着 5 个问题：怪异模式、缺语言声明、标题是空的、缺手机视口、内容跑到了 body 外面。运行它 → 修复 → 检查。先自己找，再逐级看提示。',
    starter:'<html>\n  <head>\n    <meta charset="UTF-8">\n    <title></title>\n  </head>\n  <h1>iPhone 18 Pro</h1>\n</html>',
    checks:[
      { label:'补上了 <!DOCTYPE html>', re:/^\s*<!doctype html>/i },
      { label:'html 带 lang="zh-CN"', re:/<html[^>]*lang\s*=\s*["']zh-cn["']/i },
      { label:'title 不再是空的', re:/<title>\s*\S[\s\S]*?<\/title>/i },
      { label:'补上了 viewport 声明', re:/name\s*=\s*["']viewport["']/i },
      { label:'h1 移进了 <body> 里', re:/<body[^>]*>[\s\S]*<h1[\s\S]*<\/body>/i }
    ],
    hints:[
      'Console 里 document.compatMode 返回什么？如果是 "BackCompat"，第一行缺了什么？',
      'title 两个标签中间是空的；手机上看这页会整页缩小——想想哪行声明没写。',
      'h1 现在在 &lt;/head&gt; 之后、&lt;/html&gt; 之前——浏览器会自动"救"出一个 body，但正确的做法是显式写 &lt;body&gt;。'
    ],
    cause:'① 缺 DOCTYPE → 怪异模式，CSS 行为不可预期；② 缺 lang → 无障碍与翻译受损；③ 空 title → 标签页显示文件路径，SEO 为零；④ 缺 viewport → 手机整页缩小；⑤ h1 在 body 外 → 靠浏览器容错"续命"，结构语义错误。' },

  { type:'design', title:'Design Thinking Challenge · 两个设计判断', questions:[
      { q:'同一个页面，两个 title，哪个更好？',
        a:{ label:'Option A', body:'<div style="font-family:var(--mono);font-size:15px">首页</div>' },
        b:{ label:'Option B', body:'<div style="font-family:var(--mono);font-size:13.5px">iPhone 18 Pro 和 iPhone 18 Pro Max - Apple (中国大陆)</div>' },
        correct:'b',
        analysis:'B 胜。它同时服务三类读者：开多个标签页的用户（可辨识）、搜索引擎（内容名权重最高）、地区分发（中国大陆）。"首页"对谁都没有信息量。',
        principle:'P03 Craft in the Invisible' },
      { q:'同一份 viewport 声明，哪个写法更专业？',
        a:{ label:'Option A', body:'<div style="font-family:var(--mono);font-size:13.5px">user-scalable=no（禁止用户缩放）</div>' },
        b:{ label:'Option B', body:'<div style="font-family:var(--mono);font-size:13.5px">width=device-width, initial-scale=1（允许缩放）</div>' },
        correct:'b',
        analysis:'B 胜。A 阻止视力不佳的用户放大页面，伤害无障碍；视觉还原的"稳定"不能以牺牲可访问性为代价。Apple 全站允许缩放。',
        principle:'P03 Craft in the Invisible' }
    ]},

  { type:'quiz', title:'Quiz · 骨架五连问', questions:[
      { q:'Console 里 document.compatMode 返回 "BackCompat"，说明？',
        options:['标准模式，一切正常','怪异模式，多半缺了 DOCTYPE','页面有乱码','手机适配失败'], answer:1,
        explain:'BackCompat = quirks mode（怪异模式）。CSS1Compat 才是标准模式。' },
      { q:'下面哪样东西应该放在 <head> 里？',
        options:['产品大标题"iPhone 18 Pro"','编码声明 charset','产品介绍段落','购买按钮'], answer:1,
        explain:'信息归 head，内容归 body。大标题和按钮都是"看得见的内容"。' },
      { q:'页面顶部那条看得见的导航条，它的容器标签是？',
        options:['<head>','<header>','<html>','<title>'], answer:1,
        explain:'head vs header 是新手第一大混淆：header 看得见（页头），head 看不见（元信息）。' },
      { q:'缺少 viewport 声明时，手机浏览器会？',
        options:['无法滚动','假装 980px 宽桌面，整页缩小','变成黑白屏','自动换行错乱'], answer:1,
        explain:'width=device-width 就是用来纠正这个默认行为的。' },
      { q:'title 和 h1 的关系是？',
        options:['必须完全一样','title 给浏览器/搜索引擎，h1 给读者，可以不同','h1 就是 title 的别名','一个页面可以有多个 title'], answer:1,
        explain:'Apple 这页：title 列出两个产品名 + 品牌 + 地区，页面里的 h1 只是"iPhone 18 Pro"。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '文件第一行是 <!DOCTYPE html>，它上面没有任何东西',
      '<html> 带有 lang="zh-CN"',
      'head 里第一条 meta 是 charset，页面中文不乱码',
      '有 viewport 声明，手机模式打开不会整页缩小',
      '浏览器标签页显示我自拟的标题',
      'Console 里 document.compatMode 返回 "CSS1Compat"',
      'Elements 面板里 html 只有 head 和 body 两个孩子',
      'Coding Challenge 七项检查全部通过',
      'Debug Challenge 五处事故全部修复'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['能力', '从零写出任何网站的骨架，而不是从模板里抄'],
      ['调试', '一步诊断：怪异模式（compatMode）、乱码（charset）、手机缩放（viewport）'],
      ['工具', 'Elements 面板读结构 + Console 执行第一行 JS'],
      ['设计', 'P03 看不见处的工艺：lang / title 公式 / description / alt']
    ],
    next:{ stage:'stage-2', text:'Stage 2：main / section / h1 / h2 / p 登场，页面第一次变纯黑' } }
]},

/* ---------- Stage 2 ---------- */
{ id:'stage-2', num:2, title:'语义结构与 Hero 文案', short:'语义 + Hero', status:'ready', minutes:'200–260 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'Stage 1 的页面正确但看不见。这一关它第一次"长出内容"：纯黑背景 + 白色 Hero 文案层级。同时你将开始两项贯穿全程的训练——语义判断与视觉判断。',
    items:[
      '学会 8 个新标签：main / section / div / h1 / h2 / p / span / strong——重点是判断力，不是背定义',
      '理解本关最重要的概念：<b>语义层级 ≠ 视觉大小</b>（h1 不必是页面上最大的字）',
      '第一批 CSS 正式登场：background-color / color / text-align / font-family / font-size / font-weight / line-height / letter-spacing / margin / padding',
      '通过 Typography Playground 和 Spacing Lab，亲手建立"字号跳跃 + 留白"的层级感',
      '完成 Hero 文案 Coding Challenge（判分检查真实渲染的 DOM 和计算样式）'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 1', dark:false, blank:'html ✓ head ✓ body ✓（但画布上什么都没有）' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 2', dark:true,
      hero:{ name:'iPhone 18 Pro', slogan:'Pro 再超前', desc:'iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。' } },
    caption:'本关只用 Typography + Background + Whitespace。产品图片是 Stage 4 的事——现在不偷跑。注意看：层级靠字号跳跃（32px → 80px 级）与留白建立，不靠颜色花活。' },

  { type:'observe', title:'Observe Apple · 先看再学', img:'curriculum/reference/18pro-hero-desktop.png',
    imgCap:'iPhone 18 Pro 首屏（1440px 实拍）。先自己回答，再展开参考观察。',
    items:[
      { q:'第一眼看到什么？', a:'一束聚光灯 + "Pro 再超前"大字。画面只有一个视觉焦点（P01 One Clear Visual Focus）——没有第二个元素在抢注意力。' },
      { q:'产品名是不是最大的文字？', a:'不是。"iPhone 18 Pro" 实测只有 32px/600；视觉最大的标语约 80px 级。语义等级和视觉大小是两套系统（后面 Heading Lab 亲手验证）。' },
      { q:'主标语比产品名大约多少？', a:'约 2.5 倍。这个"跳跃"不是随手定的——差距足够大，阅读顺序才不需要思考（P04 Hierarchy by Scale Jump）。' },
      { q:'文案一共有几个视觉层级？', a:'四层：① 80px 级标语 ② 32px 产品名 ③ 17px 购买说明 ④ 价格胶囊文字。层级越少、差距越大，层级越清楚。' },
      { q:'为什么页面几乎没有颜色？', a:'黑 + 白 + 一个链接蓝，全页就 4~5 个颜色在转。颜色越克制，产品（光、材质、图片）越成为主角（P06 The Asset Is the Design）。' },
      { q:'为什么大量区域是空的？', a:'留白不是"浪费的空间"，它给视线提供降落点：没有留白，焦点会被信息淹没（P07 Whitespace Creates Hierarchy）。黑色的大面积空旷同时制造"剧院感"。' },
      { q:'如果标题和正文一样大，会怎样？', a:'视线没有入口。所有信息平等地挤在一起，大脑被迫自己排序，阅读成本上升，"高级感"消失——本关 Design Challenge 会亲眼看到。' }
    ]},

  { type:'taglab', title:'Tag Lab · 语义八件套', lead:'本关标签卡比 Stage 1 多了三页：为什么存在 / 通常放哪里 / 在 Hero 中承担什么。先自己想，再翻开。',
    tags:[
    { tag:'<main>', cn:'主内容区', one:'一页唯一的核心内容容器：装下这一页真正要说的东西。',
      what:'页面的主内容区：整页只有一篇"正文"，main 就是它的容器。',
      why:'读屏器和搜索引擎需要区分"主内容"与"导航/页脚等外围"；"跳到主内容"的无障碍跳转也依赖它。一页只有一个 main。',
      where:'body 内、nav 之后、footer 之前。',
      inside:'一个或多个 section / article / div——页面的一切核心内容。',
      min:'<main>\n  <section>…</section>\n</main>',
      apple:'实测 Apple 页面 body 里依次是 nav + nav + main（内含 19 个 section）+ footer——主内容全部装在 main 里。',
      hero:'Hero 是 main 的第一个 section——主内容的开篇。',
      vs:'main vs body：body 是"整份文档的身体"（装一切可见内容，含导航页脚）；main 只装"这一页的核心内容"。',
      errs:'一页写多个 main；或把 nav / footer 塞进 main——外围结构混进主内容，语义失真。',
      try:'DevTools 看 Apple 页面：main 的直接子元素是什么？nav 在 main 里面还是外面？' },
    { tag:'<section>', cn:'语义主题区域', one:'有明确主题的内容区域——"说得清一件事"的语义单元。',
      what:'表示一个有明确主题的内容区域：拿掉周围内容，它自己仍然"说得清一件事"。',
      why:'给浏览器、读屏器、搜索引擎一个信号："这里是一个主题单元"——替代一排看不懂的 div。读屏器用户还能按区域跳转。',
      where:'main 内、article 内均可；通常自带一个标题（h2 起）。',
      inside:'标题 + 段落 + 图片 + 列表 + 子区块。',
      min:'<section>\n  <h2>摄像头</h2>\n  <p>……</p>\n</section>',
      apple:'实测 main 里有 19 个 section，类名直接写明主题：section-highlights（先刷重点）、section-performance（性能）、section-battery（电池）。',
      hero:'我们的 Hero 就是一个 section.hero——"iPhone 18 Pro 是什么"这个主题的第一个单元。',
      vs:'section vs div 是本关重点，下面有专门的判断挑战。一句话预告：有主题选 section，纯排版选 div。',
      errs:'两种极端：全页 div（结构失明）；每个小段落都套 section（语义通胀，等于没有语义）。',
      try:'不查资料判断：性能介绍区（A20 Pro + 散热 + AI）应该用 section 还是 div？说理由。' },
    { tag:'<div>', cn:'通用容器（无语义）', one:'无语义的通用容器：只负责分组，不添加任何含义。',
      what:'division 的缩写：没有任何语义的通用容器，唯一职责是"分组"。',
      why:'排版经常需要把一组元素当整体处理（限宽、加内边距、整体居中）——这时需要一个不添加语义的"打包盒"。',
      where:'任何地方；通常在 section 内部。',
      inside:'任何内容；也常是"纯样式包装"。',
      min:'<div class="hero-content">\n  <h2>…</h2>\n  <p>…</p>\n</div>',
      apple:'Apple 真实 DOM 里大量 div 负责布局包装（如 media-hero-wrapper）——真实网站里 section 和 div 是配合使用的，不是二选一。',
      hero:'Hero 里 h1/h2/p 外面那层"限制宽度、控制内边距"的包装，就是 div.hero-content。',
      vs:'section vs div：先问"这块内容有没有主题"。有主题 → section；只是排版需要 → div。主题是内容给的，不是样式给的。',
      errs:'全页 div（读屏器听到的是一串无名区域）；反过来用 section 做纯排版包装（语义通胀）。',
      try:'你 Hero 里那层"让内容别太宽"的包装盒，选谁？为什么另一个不对？' },
    { tag:'<h1>', cn:'一级标题', one:'文档大纲的第 1 级：整页主题的语义承载者。',
      what:'文档大纲的最高一级标题，表达"这一页是关于什么的"。',
      why:'建立文档大纲的根。读屏器用户靠标题等级导航；搜索引擎靠 h1 理解页面主题。',
      where:'body 里。一页一个最好（Apple 那页出现两个 h1，是它的瑕疵不是范本）。',
      inside:'纯文字为主（可包 span / em / img）。',
      min:'<h1>iPhone 18 Pro</h1>',
      apple:'实测 Apple 的 h1 是"iPhone 18 Pro"——只有 32px，不是页面上最大的字！',
      hero:'产品名 = h1。语义上最高的一级，视觉大小交给 CSS 决定。',
      vs:'h1 vs h2 不是"大字 vs 小字"，是"大纲第 1 级 vs 第 2 级"。字号是 CSS 的事，等级是 HTML 的事。',
      errs:'"哪个字最大哪个当 h1"——把视觉大小和语义等级混为一谈。这是本关要亲手拆掉的习惯（Heading Lab）。',
      try:'Hero 三段文字（产品名 / 大标语 / 辅助说明），你给它们的标题等级分配是？先写下，再看 h2 卡。' },
    { tag:'<h2>', cn:'二级标题', one:'大纲的第 2 级：每个 section 的标题。',
      what:'文档大纲的第 2 级，通常是每个 section 的标题。',
      why:'在 h1 之下细分结构；读屏器可以把全部 h2 列成"目录"，供用户直接跳转。',
      where:'section / article 内部，作为该区块的标题。',
      inside:'纯文字为主。',
      min:'<section>\n  <h2>性能</h2>\n  <p>……</p>\n</section>',
      apple:'实测每个 section 的标题都是 h2：先刷重点 / 升级大飞跃 / 设计 / 性能 / 电池续航……',
      hero:'我们把视觉主标语"Pro 再超前"定为 h2——它视觉最大，但语义上是第 2 级：因为整页的主题是 h1 产品名，标语只是"第一节的标题"。',
      vs:'h2 vs p：h2 是"这一节讲什么"的结构信息；p 是"具体内容"。',
      errs:'把 h2 当字号旋钮用（"比 h3 大一点所以选 h2"）——标题等级表达结构，不表达大小。',
      try:'想一想：Apple 为什么敢把"视觉最大"的标语不做 h1？"层级"和"大小"分别是给谁看的？' },
    { tag:'<p>', cn:'段落', one:'一段正文的默认容器：读屏器按它分段朗读。',
      what:'paragraph：一段正文的默认容器。',
      why:'让"这是一段可读正文"成为结构信息；浏览器给它默认边距，读屏器按段落朗读。',
      where:'任何有正文的地方。',
      inside:'文字 + 行内元素（a / strong / span / br）。',
      min:'<p>iPhone 18 Pro Max 现仅可在线购买。</p>',
      apple:'Hero 的购买信息"iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货……"就是一段 p，里面嵌着蓝色链接 a。',
      hero:'辅助说明文案 = p。它不是标题，是正文。',
      vs:'p vs div：p 有"段落"语义且默认带边距；div 什么都没有。正文不要用 div 装。',
      errs:'用一串 <br> 代替分段；或把整页文字塞进一个大 p。',
      try:'Hero 三段文字里哪个必须是 p？另外两个为什么不是？' },
    { tag:'<span>', cn:'行内中性包裹', one:'行内的 div：不换行的中性包裹，为样式提供钩子。',
      what:'和 div 一样无语义，但是行内级别（不换行）。',
      why:'需要给一句话里的某几个字单独加样式（变色、变小）而不改变结构时用。',
      where:'p / h1 / h2 / a 内部。',
      inside:'短文字。',
      min:'<p>RMB <span class="unit">417</span>/月 起</p>',
      apple:'实测 Apple 文案里大量 span 包住高亮词和标点，作为样式钩子——对特定文字做视觉处理，不动结构。',
      hero:'本关还请不出它——Stage 3 给"在线购买"加蓝色时才是它的主场。记住：span = 行内的 div。',
      vs:'span vs p：行内不换行无语义 vs 块级段落。span vs strong：span 纯样式钩子，strong 有语义。',
      errs:'用一串 span + class 拼出"伪段落"——块级结构信息丢失，读屏器听不出这是段落。',
      try:'"RMB 417/月 (24 期) 起"里想把"417/月"单独变蓝——这属于 p 还是 span 的工作？' },
    { tag:'<strong>', cn:'语义强调（重要）', one:'表示"重要"的语义强调——粗体只是默认样式的副作用。',
      what:'表示"重要、紧急"的内容，浏览器默认渲染为粗体——但"变粗"只是默认样式的副作用。',
      why:'它有语义：读屏器会重读，搜索引擎知道这个词重要。语义优先，样式其次。',
      where:'段落、标题内部的行内位置。',
      inside:'文字。',
      min:'<p>续航 <strong>最长增加 20 小时</strong>。</p>',
      apple:'实测 Apple 给关键数字做视觉强调用的是 CSS 类（"提速 50%"等），语义强调用 strong/em——视觉强调和语义强调是两套工具。',
      hero:'如果辅助说明里有一句最想让人记住的话可以用 strong——但 Hero 里克制：满页都是重点等于没有重点（P01）。',
      vs:'strong vs b：strong 语义强调（重要）；b 只是视觉加粗（如关键词标粗，无语义）。同理 em vs i。',
      errs:'把整段文字都加 strong——全是重点 = 没有重点。',
      try:'"充电 5 分钟，播放 7 小时"——想"既变粗又表示重要"用哪个？"只是想看起来粗"呢？' }
    ]},

  { type:'domviz', title:'Semantic Structure Visualizer · 结构四层连接', lead:'点击树节点或页面区域，建立"标签 ↔ DOM ↔ 页面区域 ↔ 视觉结果"的连接。这就是 Stage 2 之后的 Hero 结构。',
    tree:[
      { id:'body', label:'body', children:[
        { id:'main', label:'main', children:[
          { id:'section', label:'section.hero', children:[
            { id:'divc', label:'div.hero-content', children:[
              { id:'h1', label:'h1' },
              { id:'h2', label:'h2' },
              { id:'p', label:'p' }
            ]}
          ]}
        ]}
      ]}
    ],
    notes:{
      'body':'文档的身体：这里我们只画了 main（导航页脚略）。',
      'main':'主内容区：整页唯一。读屏器"跳到主内容"就是跳到这里。',
      'section':'主题区域：Hero 模块本身。它"说得清一件事"——iPhone 18 Pro 是什么。',
      'divc':'无语义包装：只负责限宽和内边距。拿掉它 Hero 仍是 Hero，只是排版失控。',
      'h1':'产品名：语义第 1 级。视觉上 32px——不是最大的。',
      'h2':'视觉主标语：语义第 2 级。视觉上 80px 级——语义和视觉是两套系统。',
      'p':'辅助说明：正文段落，17px 次级灰。'
    },
    visual:'<span class="b-doctype" style="cursor:default">&lt;!DOCTYPE html&gt;</span>'
      + '<div class="browser"><div class="b-chrome"><span class="b-dots"><i></i><i></i><i></i></span><span class="b-tab" style="cursor:default">iPhone 18 Pro 复刻练习</span></div>'
      + '<div class="dz-hero" data-r="body"><div class="dz-content" data-r="main" style="margin:0 0 12px">'
      + '<div class="dz-hero" data-r="section"><div class="dz-content" data-r="divc">'
      + '<p class="dz-name" data-r="h1">iPhone 18 Pro</p>'
      + '<p class="dz-slogan" data-r="h2">Pro 再超前</p>'
      + '<p class="dz-desc" data-r="p">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。</p>'
      + '</div></div></div></div></div>' },

  { type:'judge', title:'Semantic Judge · section 还是 div？', lead:'三个真实场景。凭判断选，选完立刻给反馈——目标是形成条件反射，不是背定义。',
    scenarios:[
      { q:'场景 A：完整的 Hero 模块——产品名 + 大标语 + 购买说明，主题是"iPhone 18 Pro 是什么"。',
        options:[
          { t:'section', ok:true, why:'✓ 有明确主题：拿掉页面其他内容，Hero 自己仍然成立。这就是 section 的判断标准。' },
          { t:'div', ok:false, why:'✗ 它有主题，却不标记——读屏器和搜索引擎永远不知道这里是一个"主题单元"（结构失明）。' }
        ]},
      { q:'场景 B：Hero 内部那层只为"限制宽度 + 加内边距"的包装容器。',
        options:[
          { t:'section', ok:false, why:'✗ 它没有任何内容主题，只是排版需要。给纯样式包装加语义 = 语义通胀，将来真正的主题区反而被淹没。' },
          { t:'div', ok:true, why:'✓ 无语义、纯排版——div 的本职工作。语义是稀缺资源，花在真正有主题的内容上。' }
        ]},
      { q:'场景 C："性能"介绍区——A20 Pro 芯片、散热、AI，配标题与图文。',
        options:[
          { t:'section', ok:true, why:'✓ 独立主题区域，Apple 原页面对应 section-performance。' },
          { t:'div', ok:false, why:'✗ 同场景 A：有主题不用语义标记，浪费了结构信息。' },
          { t:'article', ok:false, why:'△ article 适合"独立可分发"的完整内容（一篇新闻、一条评论）。产品页的功能区用 section 更贴切——想深入可以搜 HTML article。' }
        ]}
    ]},

  { type:'headinglab', title:'Heading Hierarchy Lab · 语义等级 ≠ 字体大小', lead:'左边是同一段 DOM（h1 产品名 / h2 标语 / p 说明）。右边切换三套 CSS 字号——DOM 一字不改，视觉天翻地覆。',
    q:'那么 h1 和 h2 的区别，到底是什么？',
    options:[
      { t:'h1 字号大、h2 字号小，大的是 h1', ok:false, why:'✗ 那是某一次 CSS 的选择，不是 HTML 的规则。刚才的反转模式里 h2 80px 照样比 h1 大。' },
      { t:'h1 是大纲第 1 级、h2 是第 2 级；字号由 CSS 决定', ok:true, why:'✓ 语义回答"这一页讲什么、分几部分"；视觉回答"先看哪里"。两套系统各管各的。Apple 的 h1 是 32px 产品名，而视觉最大的标语只是 h2。' },
      { t:'h1 一页只能有一个，所以必须最大', ok:false, why:'✗ 前半句是常见经验（现代 HTML 允许多个 h1，语法不非法；一个清晰主标题通常是更好的可访问性实践），后半句错——"必须最大"不是任何规范的要求。' }
    ],
    reveal:'记住这句话：<b>语义层级是给机器和结构看的，视觉大小是给人眼看的。</b>写 HTML 时问"这是第几级"；写 CSS 时问"该多大多小"。两者用不同工具表达，互不冲突——混用它们（大字 = h1）是新手最常见的结构错误。' },

  { type:'csslab', title:'CSS Property Lab · 第一批十件套', lead:'每个属性卡：是什么 / 默认情况 / 最小例子 / Apple 对应 / 删了会怎样 / 参数实验 / 马上练习。带 🔬 的卡片内置真实演示。',
    props:[
    { name:'background-color', cn:'背景颜色',
      what:'元素背景的颜色。整页氛围的第一开关。',
      def:'transparent（透明，透出父级背景——最终是浏览器白底）。',
      min:'body {\n  background-color: #000;\n}',
      apple:'实测 body 背景纯黑 rgb(0,0,0)。一个属性撑起整页"剧院感"（P02 深浅节奏的地基）。',
      gone:'页面回到浏览器默认白色——黑底氛围、白色文字、产品光影全部失效。',
      demo:{ kind:'bg', label:'🔬 点击切换背景：' },
      exp:'试 #000 / #1d1d1f / #f5f5f7 / #fff——观察白色文字在哪种底上最舒服。',
      try:'把你的 Hero 背景从纯黑换成 #1d1d1f，感受文字"刺眼度"的变化。' },
    { name:'color', cn:'文字颜色',
      what:'元素内文字的颜色。',
      def:'近黑色（浏览器默认，在浅色底上）。',
      min:'body {\n  color: #f5f5f7;\n}',
      apple:'实测深色底上正文用 #f5f5f7 而不是纯白——降低刺眼度；次级灰 #86868b 做辅助信息。颜色层级也是层级。',
      gone:'黑底黑字，页面"隐形"——Debug Challenge 里你会亲眼看到这个事故。',
      exp:'黑底上试 #fff / #f5f5f7 / #86868b：哪个最像 Apple 的层级？',
      try:'给你的 Hero 设 color:#f5f5f7，再把说明文字单独设成 #86868b。' },
    { name:'text-align', cn:'文本水平对齐',
      what:'块级元素内文字的水平对齐方式。',
      def:'left（中文/西文默认从左排）。',
      min:'.hero {\n  text-align: center;\n}',
      apple:'Apple 产品页 Hero 多数是左对齐——配合从左上开始的视线动线，阅读更自然；居中多用于营销短页。',
      gone:'无法改变默认对齐——整页只能从左排。',
      demo:{ kind:'align', label:'🔬 切换对齐：' },
      exp:'把同一份 Hero 分别 left / center，观察"气质"差异。',
      try:'把你的 Hero 设为 center 看看——再想想 Apple 为什么多数时候选左对齐？' },
    { name:'font-family', cn:'字体栈',
      what:'字体优先级列表：从左到右尝试，直到找到本机可用的字体。',
      def:'浏览器默认字体（中文常是宋体/衬线，气质完全不同）。',
      min:'body {\n  font-family: -apple-system,\n    "PingFang SC", sans-serif;\n}',
      apple:'实测字体栈："SF Pro SC", "SF Pro Display", "SF Pro Icons", "PingFang SC"——先用苹果专有字体，没有再退到系统中文。',
      gone:'中文页面退回宋体——气质立刻"报纸化"，一切字号努力都白费。',
      exp:'把 font-family 整行删掉看变化；再只写 serif 看"报纸感"。',
      try:'用 -apple-system, "PingFang SC", sans-serif 这套通用栈——为什么结尾永远留一个 sans-serif？（答案：兜底）' },
    { name:'font-size', cn:'字号',
      what:'文字的大小。',
      def:'16px（html 根元素的默认值，其他元素相对缩放）。',
      min:'.slogan {\n  font-size: 80px;\n}',
      apple:'32px 产品名 vs 80px 级标语——字号跳跃制造层级（P04）。Apple 的层级几乎完全建立在字号对比上。',
      gone:'全页 16px，层级消失——文字只靠位置区分，高级感无从谈起。',
      exp:'去下方 Typography Playground，把标语从 32 拖到 96。',
      try:'用 Playground 找到"层级清楚"的最小字号差——你找到的是几倍？' },
    { name:'font-weight', cn:'字重',
      what:'笔画粗细。400 = regular，600 = semibold，700 = bold。',
      def:'normal（400）。',
      min:'h1 {\n  font-weight: 600;\n}',
      apple:'实测 h1 用 600——中文大标题加半档字重更"实"，但不到 700 的笨重。',
      gone:'80px 的大字配上 400 的字重，在黑底上会显得"虚"、"飘"。',
      demo:{ kind:'weight', label:'🔬 切换字重：' },
      exp:'80px 标语分别用 400 / 500 / 600 / 700。',
      try:'选出最接近 Apple 气质的一档——为什么不是最粗的 700？' },
    { name:'line-height', cn:'行高',
      what:'行与行之间的距离。无单位数字 = 字号的倍数（推荐写法）。',
      def:'约 1.2 上下（依浏览器与字体而变）。',
      min:'p {\n  line-height: 1.6;\n}\n.slogan {\n  line-height: 1.1;\n}',
      apple:'正文约 17px / 1.47——宽松易读；大标语 1.1 上下——紧凑有力。行高也是层级工具：正文松、标题紧。',
      gone:'正文低于 1.3 挤成一团；大字 1.4 以上显得松散没力量。',
      demo:{ kind:'lh', label:'🔬 拖动行高：' },
      exp:'标语 80px 时试 1.1 vs 1.4；正文 17px 时试 1.3 vs 1.6。',
      try:'给你的 p 设 line-height:1.6，给 h2 设 1.1——感受"松的正文 + 紧的标题"。' },
    { name:'letter-spacing', cn:'字间距',
      what:'字符之间的距离。',
      def:'normal（由字体自带间距决定）。',
      min:'.slogan {\n  letter-spacing: 2px;\n}',
      apple:'中文大标题常加轻微正字距（1~2px）显"透气"；英文大标题反而常用负字距（-0.015em）显"紧密高级"。字距影响密度感。',
      gone:'大字号 + 默认字距，中文大标语可能显得拥挤。',
      demo:{ kind:'ls', label:'🔬 拖动字距：' },
      exp:'80px 中文标语试 0 / 2 / 4px——哪里开始"散"？哪里最舒服？',
      try:'给你的 h2 加 1~2px 字距对比一下。' },
    { name:'margin', cn:'外边距',
      what:'元素与元素之间的距离（向外推）。',
      def:'h1/h2/p 自带浏览器默认 margin（不同浏览器数值不同——这也是要显式设置的原因之一）。',
      min:'.slogan {\n  margin: 12px 0 20px;\n}',
      apple:'Hero 的行距节奏是精心设计的：产品名↔标语紧凑（一组），标语↔说明拉开（另一组）。margin 制造"节奏"。',
      gone:'只剩浏览器默认值——"差不多"，但没有节奏感。',
      exp:'去下方 Spacing Lab 拖"标语与产品名间距"滑块。',
      try:'在 Spacing Lab 复现 Apple 的"紧凑组 + 疏朗组"节奏。' },
    { name:'padding', cn:'内边距',
      what:'元素边框到内容的距离（向内撑开呼吸空间）。',
      def:'0。',
      min:'.hero {\n  padding: 120px 48px;\n}',
      apple:'实测桌面 section 间距 160px 级——留白不是浪费，是层级的一部分（P07）。Hero 的上下留白给"聚光灯场景"留出舞台。',
      gone:'文字贴着屏幕边缘——页面瞬间"廉价"。',
      exp:'Spacing Lab 三预设：Crowded / Balanced / Too Empty。',
      try:'Spacelab 里找到你觉得"高级"的留白数值，记住它。' }
    ]},

  { type:'typolab', title:'Hero Typography Playground · 调出层级', lead:'拖动参数，右侧实时预览。核心观察：拖大字号差 → 层级出现；拖小字号差 → 层级消失。预设按钮可一键对比。' },

  { type:'spacelab', title:'Whitespace Lab · 空间改变气质', lead:'先点三个预设感受整体差异，再用滑块微调。回答：哪个舒服？为什么？' },

  { type:'layers', title:'视觉拆解层 · 一个 Hero 的四张面孔', lead:'同一个 Hero 的四种视图：Final / Structure / Spacing / Hierarchy。切换着看，理解"最终页面背后存在不同的层"。' },

  { type:'challenge', title:'Coding Challenge · 构建 Hero 文案骨架',
    task:'写出 Hero 的完整结构与样式：main > section.hero > (h1 产品名 + h2 大标语 + p 辅助说明)，并在 style 里完成：body 纯黑背景 + 浅色文字 + h2 字号明显大于 h1。本关判分不只看代码字符串——会读取 iframe 里真实渲染的 DOM 和计算样式（getComputedStyle）。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  /* TODO 1: body 背景 #000、文字色 #f5f5f7 */\n\n</style>\n</head>\n<body>\n  <!-- TODO 2: main 主内容区 -->\n  <!-- TODO 3: section 里放 h1 + h2 + p -->\n</body>\n</html>',
    checks:[
      { label:'存在 main 主内容区', js:'doc && doc.querySelector("main")' },
      { label:'Hero 是语义区块（main 里有 section）', js:'doc && doc.querySelector("main section")' },
      { label:'h1（产品名）在 main 里', js:'doc && doc.querySelector("main h1")' },
      { label:'h2（视觉主标语）也在 main 里', js:'doc && doc.querySelector("main h2")' },
      { label:'有正文段落 p（辅助说明）', js:'doc && doc.querySelector("main section p")' },
      { label:'div 数量受控（0~2 个包装层足够）', js:'doc && doc.querySelectorAll("main div").length <= 2' },
      { label:'页面背景已应用深色（body 亮度 < 60%）', js:'(function(){ if(!doc || !doc.body) return false; var m = win.getComputedStyle(doc.body).backgroundColor.match(/\\d+/g); return !!m && ((+m[0]) + (+m[1]) + (+m[2])) < 180; })()' },
      { label:'文字颜色可读（标题偏亮）', js:'(function(){ if(!doc) return false; var h = doc.querySelector("main h1"); if(!h) return false; var m = win.getComputedStyle(h).color.match(/\\d+/g); return !!m && ((+m[0]) + (+m[1]) + (+m[2])) > 380; })()' },
      { label:'视觉层级成立（h2 字号 > h1 字号）', js:'(function(){ if(!doc) return false; var a = doc.querySelector("main h1"), b = doc.querySelector("main h2"); if(!a || !b) return false; return parseFloat(win.getComputedStyle(b).fontSize) > parseFloat(win.getComputedStyle(a).fontSize); })()' }
    ],
    hints:[
      '结构顺序：main > section > h1 / h2 / p。包装用的 div 可有可无（0 个也通过）。',
      'CSS 三行就够：body{background-color:#000;color:#f5f5f7} 加 h2{font-size:80px}。',
      '别忘了 h1 也要有样式（比如 font-size:32px;font-weight:600）——层级靠对比，别让 h1 和正文一样大。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body {\n    background-color: #000;\n    color: #f5f5f7;\n    font-family: -apple-system, "PingFang SC", sans-serif;\n    margin: 0;\n  }\n  h1 { font-size: 32px; font-weight: 600; margin: 0 0 10px; }\n  h2 { font-size: 80px; font-weight: 600; line-height: 1.1; letter-spacing: 1px; margin: 0 0 22px; }\n  p  { font-size: 17px; line-height: 1.6; color: #86868b; }\n</style>\n</head>\n<body>\n  <main>\n    <section class="hero">\n      <h1>iPhone 18 Pro</h1>\n      <h2>Pro 再超前</h2>\n      <p>iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或前往 Apple Store 零售店取货。</p>\n    </section>\n  </main>\n</body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 一个做坏的 Hero',
    story:'这个 Hero 能渲染，但从 HTML 结构、CSS 可读性、设计层级三个维度看全是问题。先 Run 看一眼，问自己"哪里不对"，再修复。判分同样读取真实 DOM。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { background-color: #000; color: #000; }\n  div { font-size: 24px; font-weight: 700; line-height: 1; }\n</style>\n</head>\n<body>\n  <div>iPhone 18 Pro</div>\n  <div>Pro 再超前</div>\n  <div>现仅可在线购买，可选择免费送货或取货。</div>\n</body>\n</html>',
    checks:[
      { label:'产品名改用 h1（不再是 div）', js:'doc && doc.querySelector("h1")' },
      { label:'出现 h2 与 p（结构有层级）', js:'doc && doc.querySelector("h2") && doc.querySelector("p")' },
      { label:'正文在黑底上可读（颜色偏亮）', js:'(function(){ if(!doc) return false; var p = doc.querySelector("p"); if(!p) return false; var m = win.getComputedStyle(p).color.match(/\\d+/g); return !!m && ((+m[0]) + (+m[1]) + (+m[2])) > 380; })()' },
      { label:'视觉层级重建（最大字号 ≥ 最小字号 × 2）', js:'(function(){ if(!doc) return false; var els = doc.querySelectorAll("h1,h2,p"); if(els.length < 3) return false; var mx = 0, mn = 1e9; els.forEach(function(e){ var v = parseFloat(win.getComputedStyle(e).fontSize); mx = Math.max(mx, v); mn = Math.min(mn, v); }); return mx >= mn * 2; })()' },
      { label:'不是所有文字都加粗（存在 ≤500 的元素）', js:'(function(){ if(!doc) return false; var els = doc.querySelectorAll("h1,h2,p"); if(!els.length) return false; var some = false; els.forEach(function(e){ if(parseInt(win.getComputedStyle(e).fontWeight) <= 500) some = true; }); return some; })()' },
      { label:'正文行高 ≥ 1.3（不再挤成一团）', js:'(function(){ if(!doc) return false; var p = doc.querySelector("p"); if(!p) return false; return parseFloat(win.getComputedStyle(p).lineHeight) / parseFloat(win.getComputedStyle(p).fontSize) >= 1.3; })()' },
      { label:'Hero 有呼吸空间（上下 padding ≥ 48px）', js:'(function(){ if(!doc) return false; var v = parseFloat(win.getComputedStyle(doc.body).paddingTop) || 0; var s = doc.querySelector("section, main > div"); if(s) v = Math.max(v, parseFloat(win.getComputedStyle(s).paddingTop) || 0); return v >= 48; })()' }
    ],
    hints:[
      '三个维度自查：HTML——三行 div 应该换成什么？CSS——黑底上的黑字、全体 24px、全体粗体、line-height:1 各错在哪？设计——层级和留白呢？',
      '修 CSS：body{color:#f5f5f7; padding:96px 48px}；给 h1/h2/p 分别设不同字号与行高；别全用 700。',
      '判分会读计算样式：h2 字号至少是 p 的 2 倍；正文行高 ≥ 1.3；至少一个元素字重 ≤ 500。'
    ],
    cause:'七个问题对应三个维度——<b>HTML 结构</b>：三行全是 div，语义为零（应 h1/h2/p）；<b>CSS 可读性</b>：黑底黑字看不见、line-height:1 挤成一团；<b>设计层级</b>：三行同字号同字重，视线没有入口，且文字贴边没有呼吸空间。HTML 正确 ≠ 设计正确——下一关的 Design Challenge 专门训练这件事。' },

  { type:'design', title:'Design Challenge · Typography 三连判', lead:'A/B 两版都是"真实渲染"的迷你 Hero。先选，再看分析——选择本身就是审美训练。',
    questions:[
      { q:'Q1 · 哪个版本的标题层级更清楚？',
        a:{ label:'Hero A', body:'<div style="height:170px;background:#000;display:flex;flex-direction:column;justify-content:center;padding:0 22px;box-sizing:border-box"><p style="margin:0;font-size:12px;color:#a1a1a6">iPhone 18 Pro</p><p style="margin:6px 0 12px;font-size:34px;line-height:1.1;color:#f5f5f7;font-weight:600">Pro 再超前</p><p style="margin:0;font-size:11px;line-height:1.5;color:#86868b">现仅可在线购买，并可选择免费送货或取货。</p></div>' },
        b:{ label:'Hero B', body:'<div style="height:170px;background:#000;display:flex;flex-direction:column;justify-content:center;padding:0 22px;box-sizing:border-box"><p style="margin:0;font-size:14px;color:#a1a1a6">iPhone 18 Pro</p><p style="margin:6px 0 12px;font-size:20px;line-height:1.2;color:#f5f5f7;font-weight:600">Pro 再超前</p><p style="margin:0;font-size:13px;line-height:1.5;color:#86868b">现仅可在线购买，并可选择免费送货或取货。</p></div>' },
        correct:'a',
        analysis:'A 胜。34px vs 12px 的跳跃让视线第一秒落在标语上；B 三个字号挤在 13~20px，"差不多大 = 没有层级"（P04）。注意 B 的 DOM 和 A 一模一样——差的只是 CSS 数值。' ,
        principle:'P04 Hierarchy by Scale Jump' },
      { q:'Q2 · 哪个版本的留白更舒服？',
        a:{ label:'Hero A', body:'<div style="height:170px;background:#000;display:flex;flex-direction:column;justify-content:center;padding:0 40px;box-sizing:border-box"><p style="margin:0 0 8px;font-size:12px;color:#a1a1a6">iPhone 18 Pro</p><p style="margin:0 0 16px;font-size:32px;line-height:1.1;color:#f5f5f7;font-weight:600">Pro 再超前</p><p style="margin:0;font-size:11px;line-height:1.5;color:#86868b">现仅可在线购买。</p></div>' },
        b:{ label:'Hero B', body:'<div style="height:170px;background:#000;display:flex;flex-direction:column;justify-content:center;padding:0 8px;box-sizing:border-box"><p style="margin:0;font-size:12px;color:#a1a1a6">iPhone 18 Pro</p><p style="margin:2px 0;font-size:32px;line-height:1.1;color:#f5f5f7;font-weight:600">Pro 再超前</p><p style="margin:2px 0;font-size:11px;line-height:1.2;color:#86868b">现仅可在线购买。</p><p style="margin:2px 0 0;font-size:11px;line-height:1.2;color:#86868b">免费送货 · 到店取货 · 24 期免息</p></div>' },
        correct:'a',
        analysis:'A 胜。行与行之间有"呼吸"：紧凑组（名↔标语）+ 疏朗组（标语↔说明）形成节奏；B 把所有间距压到 2px，信息糊成一堵墙（P07）。留白是层级的一部分，不是装饰。' ,
        principle:'P07 Whitespace Creates Hierarchy' },
      { q:'Q3 · 哪个版本的视觉焦点更单一？',
        a:{ label:'Hero A', body:'<div style="height:170px;background:#000;display:flex;flex-direction:column;justify-content:center;padding:0 28px;box-sizing:border-box"><p style="margin:0 0 6px;font-size:12px;color:#a1a1a6">iPhone 18 Pro</p><p style="margin:0 0 12px;font-size:34px;line-height:1.1;color:#f5f5f7;font-weight:600">Pro 再超前</p><p style="margin:0;font-size:11px;color:#86868b">现仅可在线购买。</p></div>' },
        b:{ label:'Hero B', body:'<div style="height:170px;background:#000;display:flex;flex-direction:column;justify-content:center;padding:0 28px;box-sizing:border-box"><p style="margin:0 0 6px;font-size:22px;color:#2997ff;font-weight:700">限时优惠</p><p style="margin:0 0 6px;font-size:22px;line-height:1.2;color:#f5f5f7;font-weight:700">Pro 再超前 · 性能翻倍</p><p style="margin:0;font-size:22px;color:#ffd60a;font-weight:700">RMB 9999 起 · 24 期免息</p></div>' },
        correct:'a',
        analysis:'A 胜。一个主焦点（大标语），其余全部降级为小字灰色；B 三行等大等粗还加了两种强调色——三件东西同时喊"看我"，用户一个都记不住（P01）。' ,
        principle:'P01 One Clear Visual Focus' }
    ]},

  { type:'transfer', title:'Transfer Challenge · 迁移到另一个产品', lead:'Apple 不是答案，原则才是。现在把 Hero 原则迁移到一个完全不同的产品：AI 笔记软件「墨记」。填文案、做设计决策，看实时预览。' },

  { type:'principles', title:'Design Principles · 本关新增与复习', lead:'本关正式新增三条原则（P07~P09）。点击展开；Stage 0 学过的 P01/P04/P06 在本关全部实际用到了。',
    ids:['P07','P08','P09'] },

  { type:'design2', title:'Typography Trade-off · 品牌张力 vs 信息清晰', lead:'Scenario：一个首次发布的新消费电子品牌，目标是建立品牌感，不是马上列完全部规格。User：25–35 岁设计敏感消费者。Constraint：只有一个首屏。',
    questions:[
      { q:'Q · Hero 排版：品牌戏剧性 vs 信息清晰度？',
        a:{ label:'品牌戏剧性', body:'<div style="background:#000;border-radius:10px;padding:28px;text-align:center"><p style="margin:0;font-size:34px;font-weight:800;color:#fff;letter-spacing:2px">FEEL<br>EVERYTHING</p></div>', when:'适合：品牌发布期、社交媒体引流、需要制造记忆点。' },
        b:{ label:'信息清晰度', body:'<div style="background:#000;border-radius:10px;padding:22px"><p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#a1a1a6">FEEL-1 Pro</p><p style="margin:0 0 10px;font-size:26px;font-weight:700;color:#fff;line-height:1.15">触感屏 · 2000nit · IP68</p><p style="margin:0;font-size:11px;color:#86868b">RMB 4,999 · 10 月发售</p></div>', when:'适合：搜索流量、比价阶段、用户已知道品类要什么。' },
        analysis:'发布期选 A 建记忆；比价期选 B 降低决策成本。最好的做法是 A/B 测试而不是预判。' }
    ] },

  { type:'quiz', title:'Quiz · 语义与视觉八连问', questions:[
      { q:'main 的正确用法是？',
        options:['一页可以有多个 main，分区管理','整页一个 main，装主内容；nav 和 footer 放在外面','main 里要放导航和页脚','main 就是 body 的别名'], answer:1,
        explain:'main = 主内容区，一页一个；外围结构（导航、页脚）留在 main 之外。' },
      { q:'结构判断：Hero 模块（产品名 + 标语 + 说明，主题明确）应该用？',
        options:['div','section','span','header'], answer:1,
        explain:'有主题 → section。div 没有语义，span 是行内的。' },
      { q:'Hero 里那层"只为了限宽和内边距"的包装容器应该用？',
        options:['section','article','div','main'], answer:2,
        explain:'纯排版、无主题 → div。语义是稀缺资源。' },
      { q:'Apple 页面视觉最大的"Pro 再超前"在语义上可以不是 h1，因为——',
        options:['它不够重要','语义等级 ≠ 视觉大小：页面主题是产品名（h1），标语是大纲第 2 级','Apple 忘了改','h1 必须是图片'], answer:1,
        explain:'这是本关核心：HTML 等级管结构大纲，CSS 字号管视觉大小。' },
      { q:'span 和 p 的区别是？',
        options:['span 是行内无语义包裹，p 是块级段落','完全一样','span 更大','p 只能放标题'], answer:0,
        explain:'span = 行内的 div；p 有段落语义且默认带边距。' },
      { q:'strong 的本质是？',
        options:['让文字变粗的标签','语义强调（重要），粗体只是默认样式','比 b 更粗','只能用在标题里'], answer:1,
        explain:'想"只变粗不表意"用 b；想"表意重要"用 strong。' },
      { q:'实测 Apple 把整页纯黑背景设在哪个元素？',
        options:['html','body','main','section.hero'], answer:1,
        explain:'body 是最常用的背景承载者。Stage 1 你在 DevTools 里亲眼看过 rgb(0,0,0)。' },
      { q:'设计判断：哪种做法让层级更清楚？',
        options:['三档文字 24 / 22 / 20px，渐变缩小','两档文字 80 / 32px，大幅跳跃','全部加粗','全部居中'], answer:1,
        explain:'层级靠对比强度（P04）。小步渐变反而模糊；"全部加粗 = 全部重点 = 没有重点"。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我知道 main 为什么存在，以及 nav/footer 为什么不在里面',
      '我能判断一个区块该用 section 还是 div（说出理由）',
      '我理解 h1/h2 是文档大纲的等级，不是字号档位',
      '我知道"视觉字号"和"HTML 等级"是两套系统（Heading Lab 验证过）',
      '我能用 CSS 设置背景色和文字颜色（黑底浅字可读）',
      '我能建立基础 Typography hierarchy（字号跳跃 + 字重 + 行高）',
      '我能解释为什么 Apple 使用字号跳跃（P04）',
      '我能解释留白如何影响视觉焦点（P07）',
      '我完成了 Hero 文案 Coding Challenge（9 项全过）',
      '我完成了 Debug Challenge（从结构/可读性/设计三个维度修好）',
      '我完成了 Design Challenge 三连判',
      '我把原则迁移到了「墨记」的 Hero（Transfer Challenge）'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['语义判断', '有主题 section，纯排版 div；标题等级是结构信息，不是字号'],
      ['视觉判断', '层级 = 字号跳跃 + 字重对比 + 留白节奏；颜色克制'],
      ['第一批 CSS', '背景 / 颜色 / 对齐 / 字体 / 字号 / 字重 / 行高 / 字距 / 边距'],
      ['三套工具', 'HTML 管结构 · CSS 管视觉 · 设计决策管"应该怎样呈现"']
    ],
    next:{ stage:'stage-3', text:'Stage 3：CTA 链接——a 标签与第一批交互反馈（hover + transition）' } }
]},

/* ---------- Stage 3 ---------- */
{ id:'stage-3', num:3, title:'CTA · 链接 vs 按钮 · 交互反馈', short:'CTA 与反馈', status:'ready', minutes:'210–270 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'Stage 2 的 Hero 只能"看"。这一关它第一次可以"行动"：进一步了解、购买、价格信息、Hover/Focus 反馈全部到位。但本关真正的问题不是"怎么做按钮"——而是：网页中的"动作"到底是什么？',
    items:[
      '建立 Action Model：去别处 = link（a），在这里做事 = button',
      '吃透 a：href、三种目的地（站外/站内/页内锚点）、键盘行为',
      '吃透 button：页内动作的语义，以及它为什么在 Stage 11 才正式上岗',
      '第一批交互 CSS：text-decoration / cursor / border / border-radius / display + 伪类 :hover / :focus-visible / :active + transition',
      '理解 Action Hierarchy：Primary / Secondary / Tertiary——设计是在分配注意力',
      '理解 focus 为什么不能删：无障碍是交互设计的一部分，不是额外功能'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 2：只能看', dark:true,
      hero:{ name:'iPhone 18 Pro', slogan:'Pro 再超前', desc:'iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。' } },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 3：可以行动', dark:true,
      hero:{ name:'iPhone 18 Pro', slogan:'Pro 再超前', desc:'iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。',
        cta:{ price:'RMB 9999 起 · 417/月 (24 期)', primary:'购买', secondary:'进一步了解 ›' } } },
    caption:'新增的东西一目了然：价格信息 + 一个 filled 主按钮（购买）+ 一个文字链接（进一步了解）。注意层级：蓝色 filled 只有一个——它是这一屏唯一的 Primary Action（P05）。' },

  { type:'observe', title:'Observe Apple CTA', img:'curriculum/reference/18pro-hero-desktop.png',
    imgCap:'还是这张首屏截图——但这次盯住"动作"：右下角价格胶囊里那个蓝色「购买」，以及正文里的蓝色文字链接。',
    items:[
      { q:'这一屏哪个 Action 最突出？', a:'价格胶囊里的「购买」：整屏唯一一个 filled 蓝色按钮。它是用户此刻唯一"该做的事"——下单（P05 One Primary Action）。' },
      { q:'为什么不是所有链接都做成大蓝按钮？', a:'如果每个动作都是大按钮，注意力被摊薄，"购买"反而找不到。等权 = 无权（P10）。' },
      { q:'为什么有些 CTA 只是蓝色文字？', a:'次级动作（如"选购 iPhone ›"）用文字链接：可发现、可点击，但不抢 Primary 的戏。视觉权重即行动顺序。' },
      { q:'「购买」和「进一步了解」的视觉权重为什么不同？', a:'转化路径是 看 → 懂 → 买。两步的优先级不同，样式就不同：filled vs text。样式表达的是商业意图。' },
      { q:'如果两个按钮完全一样重，会发生什么？', a:'用户犹豫：先点哪个？犹豫即流失。每个额外的大按钮都在给真正的 Primary 放血。' }
    ]},

  { type:'taglab', title:'Tag Lab · a 与 button', lead:'本关只有两个新标签，但每个都要吃透。a 比之前的卡多了三页：href 是什么 / 三种目的地 / 键盘与默认行为。',
    tags:[
    { tag:'<a>', cn:'链接（锚）', one:'本质是导航（Navigation）：把用户从当前位置带到另一个位置。',
      what:'a = anchor（锚）。网页里最古老的元素：把用户带到"另一个位置"。当前位置 → 别的位置，这就是导航（Navigation）。',
      why:'Web 的本质是超文本：文档之间靠链接连接。a 是浏览器唯一默认"可前往别处"的元素——中键新开标签页、右键复制链接地址、搜索引擎顺着 href 爬取，全都建立在它上面。',
      when:'点击后"去别处"的一切：另一个网站、站内另一页、购买流程、同页的某个区域。',
      href:'href = hypertext reference：链接的目的地。没有 href 的 a 只是一个没有能力的占位——浏览器不会给它链接的默认样式、键盘行为和读屏器播报。',
      kinds:'三种目的地（本关够用）：① 站外 &lt;a href="https://…"&gt; ② 站内 &lt;a href="/buy/"&gt; ③ 页内锚点 &lt;a href="#camera"&gt;——跳到当前页 id="camera" 的元素并滚动过去。URL 体系以后再深入。',
      kb:'浏览器默认赠送：Tab 可聚焦、Enter 触发跳转；鼠标中键 / 长按菜单可新开标签页；读屏器播报"链接"。这是"链接身份"自带的礼物——div 用 JS 模拟做不到全套。',
      min:'<a href="/buy/">购买</a>',
      apple:'实测 Apple Hero 的「购买」就是 a：href 指向 /cn/shop/goto/buy_iphone/iphone_18_pro——去购买流程，是导航，所以是链接（虽然长得像按钮）。',
      hero:'Hero 的两个 CTA 都由 a 承担：「进一步了解」去详情章节（页内锚点），「购买」去购买流程（站内链接）。',
      vs:'a vs button 一句话：去别处 → a；在这里做事 → button。视觉长相归 CSS，语义归 HTML。下面 Decision Lab 专门练判断。',
      errs:'三种常见错误：① a 不写 href（占位冒充链接，键盘和读屏器全失效）；② 用 div onclick 模拟链接（三无产品：无语义、无键盘、无默认行为）；③ 用 a 做"切换颜色"这类页内动作（假导航）。',
      try:'"回到顶部"应该用 a 还是 button？（提示：它去的位置在——当前页面的最上方。答案：a href="#top"，页内导航。）' },
    { tag:'<button>', cn:'按钮（页内动作）', one:'在当前界面执行一个行为（Action）：点击后世界不换页，而是"这里发生了变化"。',
      what:'button：在当前界面执行一个行为的按钮（Action）。点击后世界不换页，而是"这里发生了变化"。',
      why:'菜单开合、颜色切换、弹窗、提交、播放——这些是"操作"而不是"导航"。用 button，浏览器免费给你键盘触发、表单语义、读屏器播报"按钮"。',
      when:'打开菜单 / 切换颜色 / 展开收起 / 播放视频 / 提交表单 / 打开弹窗。',
      kb:'默认行为：Tab 可聚焦，Enter 和 Space 都能触发（比 a 多一个 Space）。注意：button 的 type 默认是 submit——放进表单会触发提交，非表单场景建议写 type="button"。',
      min:'<button type="button">切换到酒红色</button>',
      apple:'预告：Apple 页面的颜色选择器、"观看影片，iPhone 18 Pro"、图库的"上一项/下一项"——实测都是 button 语义（页内动作）。对照：Hero 的「购买」是去别处 = a；「观看影片」是原地播放 = button。',
      hero:'本关 Hero 里暂时没有 button——因为 Hero 的两个动作都是"去别处"。button 会在 Stage 11（颜色切换器）正式上岗。',
      vs:'长得像按钮 ≠ 是 button。视觉样式归 CSS，语义归 HTML：「购买」穿着按钮的外衣，骨子里是链接。',
      errs:'三种常见错误：① 用 a href="#" 跑页内动作（假链接）；② 用 div onclick 模拟按钮（无语义、无键盘、无播报）；③ button 忘写 type，塞进表单后一点就误提交。',
      try:'Stage 11 的「切换到酒红色」——用 a 还是 button？为什么？' }
    ]},

  { type:'decision', title:'Decision Lab · Link 还是 Button？', lead:'五个真实场景。先选，再看：正确答案 + 为什么 + 浏览器语义 + 键盘行为 + Apple 对应案例。最后会给你一个判断公式。',
    scenarios:[
      { q:'场景 1：「进一步了解 iPhone 18 Pro」——点击后跳到页面下方的"设计"章节。',
        answer:0,
        a:{ t:'a（链接）', why:'✓ 去别处：从 Hero 到"设计"章节——位置变了，这是导航。', semantics:'读屏器播报"链接"；可以被中键新开、被收藏。', keyboard:'Tab 聚焦 → Enter 跳转。', apple:'实测「进一步了解」就是 a。' },
        b:{ t:'button（按钮）', why:'✗ 它不改变当前界面，而是带你离开——button 语义会误导辅助工具。' } },
      { q:'场景 2：「切换到酒红色」——点击后当前预览的产品图变成酒红色。',
        answer:1,
        a:{ t:'a（链接）', why:'✗ 页面没有"酒红色页"——这是原地状态变化，导航语义是错的。', semantics:'链接语义会暗示"会去别处"，行为与语义打架。', keyboard:'链接只有 Enter；而且中键"新开标签页"会闹笑话。', apple:'颜色切换属于页内动作——Stage 11 将用 button 实现（Apple 真页面的颜色选择器同为按钮语义）。' },
        b:{ t:'button（按钮）', why:'✓ 在这里做事：修改当前界面的状态。语义、键盘（Enter/Space 都行）、读屏器播报全部正确。' } },
      { q:'场景 3：「购买」——点击后进入购买流程页面。',
        answer:0,
        a:{ t:'a（链接）', why:'✓ 虽然长得像按钮，但它是去别处——购买页。语义跟行为走，不跟长相走。', semantics:'链接语义带来全套福利：可新开标签页、可复制链接、搜索引擎可跟踪。', keyboard:'Tab + Enter。', apple:'实测 Apple 的「购买」就是 a href=…/buy_iphone/…——穿按钮外衣的链接。' },
        b:{ t:'button（按钮）', why:'✗ button 语义 = "原地发生点什么"，但实际发生的是整页导航——语义与行为不符。' } },
      { q:'场景 4：「展开产品参数」——点击后当前卡片下方展开参数表。',
        answer:1,
        a:{ t:'a（链接）', why:'✗ 没有去任何地方——内容在原地展开/收起。', semantics:'链接语义错误。（进阶：这类控件将来会配合 aria-expanded 播报展开状态。）', keyboard:'链接的语义让读屏器期待"跳转"。', apple:'实测 Apple 购买好处区有「展开了解 Apple Trade In」按钮——页内展开 = button。' },
        b:{ t:'button（按钮）', why:'✓ 原地改变界面状态，是 button 的本职。' } },
      { q:'场景 5：「播放介绍影片」——点击后弹出播放器开始播放。',
        answer:1,
        a:{ t:'a（链接）', why:'✗ 若弹出层播放，页面本身没有导航（除非跳去视频网站那种"新页面看片"——那才属于链接）。', semantics:'链接语义期待"去别处"。', keyboard:'Space 触发对按钮更自然。', apple:'实测「观看影片，iPhone 18 Pro」就是 button。' },
        b:{ t:'button（按钮）', why:'✓ 在当前界面打开播放器——典型的页内动作。' } }
    ],
    formula:'判断公式：去别处 → link（a）；在这里做事 → button。真实产品存在边界情况：登录弹窗里的「登录」是 button（原地提交）；「用 GitHub 登录」是 a（跳转授权页）。拿不准时问：点击之后，用户的"位置"变了吗？' },

  { type:'hreflab', title:'Href Lab · 三种目的地', lead:'下面是一个迷你页面（含"摄像头"与"购买"两个章节）。选一个 href，然后点击迷你页里的链接，观察三种目的地的区别：页内锚点 → 原地滚动；站内/站外 → 真实浏览器会离开本页（这里用地址栏模拟）。' },

  { type:'actionlevel', title:'Action Hierarchy · 主次动作', lead:'动作也有层级。看这三个真实渲染的 CTA——它们的差别不只是"好看不好看"，而是在回答"用户此刻该做什么"。' },

  { type:'statelab', title:'Interaction State Lab · 一个按钮的四种状态', lead:'按钮不是一张静态图片，它有状态。切换四种状态，观察每种该改变什么、不该改变什么。注意：预览里的按钮同时有真实 :hover——鼠标放上去试试。' },

  { type:'focuslab', title:'Focus Lab · 鼠标有 Hover，键盘只有 Focus', lead:'鼠标用户靠 Hover 发现可点击；键盘用户靠 Focus。下面迷你页面里有一个"被删掉 focus 样式"的按钮——用它体验键盘用户的绝望。',
    iframeDoc:'<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><style>body{margin:0;background:#000;padding:44px 36px;font-family:-apple-system,"PingFang SC",sans-serif}p.tip{color:#86868b;font-size:12px;margin:0 0 18px}a{color:#2997ff;text-decoration:none;display:block;margin-bottom:16px;font-size:15px}a:focus-visible{outline:2px solid #2997ff;outline-offset:3px;border-radius:4px}button{font:inherit;font-size:15px;background:#0071e3;color:#fff;border:0;border-radius:99px;padding:10px 24px;cursor:pointer}button:focus-visible{outline:2px solid #2997ff;outline-offset:3px}button.no-focus:focus{outline:none}</style></head><body><p class="tip">点进这个页面任意处（让键盘焦点进来）→ 按 Tab 逐个走 → 观察谁的焦点环消失了。</p><a href="#g" id="g1">进一步了解 ›</a><button type="button" id="g2">正常按钮（有 focus）</button><button type="button" class="no-focus" id="g3">被删掉 focus 的按钮</button></body></html>' },

  { type:'transitionlab', title:'Transition Playground · 交互的节奏', lead:'拖动时长滑块，然后把鼠标放到预览按钮上（或点"模拟 Hover"）。训练目标：对"交互节奏"形成手感——不是背数字。' },

  { type:'ctalab', title:'CTA Hierarchy Playground · 分配注意力', lead:'三个动作（购买 / 进一步了解 / 查看规格），三种样式（Filled / Outline / Text Link）。你来分配，实时看 Hero。做完点"诊断层级"。' },

  { type:'classify', title:'Bad CTA Hero · 问题分类挑战', lead:'下面这个 Hero 犯了 8 个错误。先自己看，然后把每个问题归入它所属的维度（语义 / CSS / 交互 / 设计 / 无障碍）——真实开发里，定位问题的能力来自这种分类。' },

  { type:'challenge', title:'Coding Challenge · 给 Hero 加上 CTA',
    task:'在 Stage 2 Hero 的基础上加入：① 价格/购买信息一行；②「购买」主 CTA（a 链接，filled 蓝色胶囊，href 任意如 /buy/）；③「进一步了解 ›」次级 CTA（文字链接，href="#design"）。要求：语义正确（去别处的都是 a）、层级清楚（只有购买是 filled）、有 :hover 反馈、focus 样式没被删、transition ≤ 0.6s。判分读取真实 DOM。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { background-color: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; margin: 0; padding: 90px 48px; }\n  h1 { font-size: 32px; font-weight: 600; margin: 0 0 10px; }\n  h2 { font-size: 80px; font-weight: 600; line-height: 1.1; margin: 0 0 22px; }\n  .desc { font-size: 17px; line-height: 1.6; color: #86868b; margin: 0 0 8px; }\n  /* TODO 1: 价格信息一行（.price，浅灰小字） */\n\n  /* TODO 2: 主 CTA「购买」——a 链接，filled 蓝色胶囊（.cta-buy）\n     参考值：background #0071e3 / color #fff / padding 12px 26px / border-radius 99px */\n\n  /* TODO 3: 次级 CTA「进一步了解 ›」——文字链接（.cta-more）\n     参考值：color #2997ff / 默认无下划线，hover 出现下划线 */\n\n  /* TODO 4: 给两个 CTA 加 transition（写在元素默认态上）与 :hover 反馈\n     注意：不要写 outline:none */\n\n</style>\n</head>\n<body>\n  <main>\n    <section class="hero">\n      <h1>iPhone 18 Pro</h1>\n      <h2>Pro 再超前</h2>\n      <p class="desc">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。</p>\n      <!-- TODO 5: 价格行 + 两个 CTA 链接（用 a，别用 div onclick） -->\n\n    </section>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'「购买」是 a 链接且带 href', js:'(function(){ if(!doc) return false; var as = [].slice.call(doc.querySelectorAll("a[href]")); return as.some(function(a){ return (a.textContent || "").indexOf("购买") >= 0; }); })()' },
      { label:'「进一步了解」也是 a（次级动作同为导航）', js:'(function(){ if(!doc) return false; return [].slice.call(doc.querySelectorAll("a")).some(function(a){ return (a.textContent || "").indexOf("了解") >= 0; }); })()' },
      { label:'没有可点击 div（页面中 onclick 计数为 0）', js:'doc && doc.querySelectorAll("[onclick]").length === 0' },
      { label:'价格/购买信息存在', js:'(function(){ if(!doc || !doc.body) return false; return /RMB|¥|￥|价格|\\d+\\/月/.test(doc.body.textContent); })()' },
      { label:'Primary CTA 有填充背景（不是裸文字）', js:'(function(){ if(!doc) return false; var as = [].slice.call(doc.querySelectorAll("a")); var buy = as.filter(function(a){ return (a.textContent||"").indexOf("购买") >= 0; })[0]; if(!buy) return false; var m = win.getComputedStyle(buy).backgroundColor.match(/[\\d.]+/g); if(!m) return false; return m.length < 4 || parseFloat(m[3]) > 0.5; })()' },
      { label:'Primary 与 Secondary 视觉不同（背景色可区分）', js:'(function(){ if(!doc) return false; var as = [].slice.call(doc.querySelectorAll("a")); if(as.length < 2) return false; var bgs = as.map(function(el){ return win.getComputedStyle(el).backgroundColor; }); return bgs.some(function(c, i){ return i > 0 && c !== bgs[0]; }); })()' },
      { label:'有 :hover 反馈（样式表包含 :hover 规则）', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && st.textContent.indexOf(":hover") >= 0; })()' },
      { label:'focus 样式没有被删除（无 outline:none / outline:0）', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && !/outline\\s*:\\s*(none|0)\\b/i.test(st.textContent); })()' },
      { label:'transition 存在且 ≤ 0.6s（不拖沓）', js:'(function(){ if(!doc) return false; var a = doc.querySelector("a"); if(!a) return false; var parts = (win.getComputedStyle(a).transitionDuration || "0s").split(","); var mx = 0; parts.forEach(function(p){ var v = parseFloat(p); if (p.indexOf("ms") >= 0) v = v / 1000; mx = Math.max(mx, v || 0); }); return mx > 0 && mx <= 0.61; })()' }
    ],
    hints:[
      '结构：价格和 CTA 都是普通元素——价格用 p，CTA 用两个 a，分别加 class。别用 div onclick。',
      '主 CTA：display:inline-block; background:#0071e3; color:#fff; padding:12px 26px; border-radius:99px; text-decoration:none。次级：color:#2997ff; text-decoration:none。',
      'transition 写在 .cta-buy { transition: background-color .2s, transform .2s } 里（默认态！），:hover 里只写变化后的值；focus 不要动 outline。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { background-color: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; margin: 0; padding: 90px 48px; }\n  h1 { font-size: 32px; font-weight: 600; margin: 0 0 10px; }\n  h2 { font-size: 80px; font-weight: 600; line-height: 1.1; margin: 0 0 22px; }\n  .desc { font-size: 17px; line-height: 1.6; color: #86868b; margin: 0 0 8px; }\n  .price { font-size: 14px; color: #86868b; margin: 0 0 24px; }\n  .cta-buy {\n    display: inline-block;\n    background-color: #0071e3;\n    color: #fff;\n    font-size: 17px;\n    text-decoration: none;\n    padding: 12px 26px;\n    border-radius: 99px;\n    margin-right: 22px;\n    transition: background-color .2s, transform .2s;\n  }\n  .cta-buy:hover { background-color: #0077ed; }\n  .cta-buy:active { transform: scale(.97); }\n  .cta-more {\n    color: #2997ff;\n    font-size: 17px;\n    text-decoration: none;\n    transition: color .2s;\n  }\n  .cta-more:hover { text-decoration: underline; }\n</style>\n</head>\n<body>\n  <main>\n    <section class="hero">\n      <h1>iPhone 18 Pro</h1>\n      <h2>Pro 再超前</h2>\n      <p class="desc">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。</p>\n      <p class="price">RMB 9999 起 · RMB 417/月 (24 期) 起</p>\n      <a class="cta-buy" href="/buy/">购买</a>\n      <a class="cta-more" href="#design">进一步了解 ›</a>\n    </section>\n  </main>\n</body>\n</html>' },

  { type:'kbdtest', title:'Keyboard Test · 把鼠标放下', lead:'键盘是无障碍的主战场。在下面的迷你页面里：先点击页面内部（让键盘焦点进来）→ 依次试 Tab、Shift+Tab、Enter、Space，验证四条观察。',
    iframeDoc:'<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><style>body{margin:0;background:#000;padding:44px 36px;font-family:-apple-system,"PingFang SC",sans-serif}p.tip{color:#86868b;font-size:12px;margin:0 0 18px}a{color:#2997ff;text-decoration:none;display:block;margin-bottom:16px;font-size:15px}a:focus-visible{outline:2px solid #2997ff;outline-offset:3px;border-radius:4px}button{font:inherit;font-size:15px;background:#0071e3;color:#fff;border:0;border-radius:99px;padding:10px 24px;cursor:pointer;margin-bottom:10px}button:focus-visible{outline:2px solid #2997ff;outline-offset:3px}button:active{transform:scale(.97)}p.echo{color:#ffd60a;font-size:13px;min-height:20px;margin-top:8px}</style></head><body><p class="tip">先点这里任意空白处，让键盘焦点进入本页面。</p><a href="#sec2" id="k1">进一步了解 ›</a><button type="button" id="k2" onclick="document.getElementById(\'echo\').textContent=\'按钮被触发（Enter 或 Space 都可以）\'">切换颜色</button><p class="echo" id="echo"></p><p id="sec2" style="color:#6e6e73;font-size:12px;margin-top:30px">↓ 按 Tab 让焦点走到这里试试（锚点 #sec2）</p></body></html>',
    checks:[
      'a（链接）：Enter 触发跳转（滚到 #sec2）；Space 没有反应',
      'button：Enter 和 Space 都能触发（看黄色提示行变化）',
      'Shift + Tab 可以反向移动焦点',
      '焦点环（focus-visible）在每个可交互元素上可见'
    ],
    limits:'诚实声明：① iframe 需要先点击内部才能接收键盘焦点——真实页面里 Tab 从地址栏就能开始；② 程序化 focus() 是否显示 focus-visible 环由浏览器启发式决定，所以本实验以真实 Tab 键为准；③ 以上行为全部来自浏览器原生机制，课程代码没有写一行 JS。' },

  { type:'debug', title:'Debug Challenge · 修好这个坏 Hero',
    story:'这条导航"能看"但用户说不太对劲——打开预览滚动一下、按 Tab 走一圈，能找出几个问题？修复后检查。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { background-color: #000; color: #000; padding: 24px 8px; }\n  h2 { font-size: 60px; color: #f5f5f7; margin: 0 0 0px; }\n  .btn {\n    display: inline-block;\n    background-color: #0071e3;\n    color: #fff;\n    font-size: 18px;\n    padding: 14px 30px;\n    border-radius: 99px;\n    text-decoration: none;\n    margin: 0px 10px 0 0;\n    outline: none;\n    transition: all 3s;\n  }\n  .fake {\n    display: inline-block;\n    background-color: #0071e3;\n    color: #fff;\n    font-size: 18px;\n    padding: 14px 30px;\n    border-radius: 99px;\n    cursor: pointer;\n  }\n</style>\n</head>\n<body>\n  <main>\n    <section class="hero">\n      <h2>Pro 再超前</h2>\n      <a class="btn" href="/buy/">立即购买 iPhone 18 Pro Max 旗舰机型享受 24 期免息</a>\n      <a class="btn" href="#design">了解更多详情信息</a>\n      <a class="btn" href="#specs">查看全部规格参数</a>\n      <div class="fake" onclick="void(0)">切换颜色</div>\n    </section>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'「购买」瘦身成短文字且仍是 a[href]', js:'(function(){ if(!doc) return false; var as = [].slice.call(doc.querySelectorAll("a[href]")); var buy = as.filter(function(a){ return (a.textContent||"").indexOf("购买") >= 0; })[0]; return !!buy && buy.textContent.trim().length <= 8; })()' },
      { label:'Primary 唯一（filled 蓝色链接 ≤ 1 个，button 控件不算）', js:'(function(){ if(!doc) return false; var as = [].slice.call(doc.querySelectorAll("a[href]")); var filled = as.filter(function(a){ var m = win.getComputedStyle(a).backgroundColor.match(/[\\d.]+/g); return m && m.length >= 3 && (+m[0]) < 120 && (+m[2]) > 150 && (m.length < 4 || parseFloat(m[3]) > 0.5); }); return filled.length <= 1; })()' },
      { label:'「切换颜色」改用 button（不再是 div onclick）', js:'(function(){ if(!doc) return false; return doc.querySelectorAll("button").length >= 1 && doc.querySelectorAll("[onclick]").length === 0; })()' },
      { label:'黑底文字可读（body 文字偏亮）', js:'(function(){ if(!doc || !doc.body) return false; var m = win.getComputedStyle(doc.body).color.match(/\\d+/g); return !!m && ((+m[0]) + (+m[1]) + (+m[2])) > 380; })()' },
      { label:'CTA 有 hover 反馈', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && st.textContent.indexOf(":hover") >= 0; })()' },
      { label:'focus 样式恢复（无 outline:none / outline:0）', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && !/outline\\s*:\\s*(none|0)\\b/i.test(st.textContent); })()' },
      { label:'transition 收敛到 ≤ 0.6s', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); if(!st) return false; var decls = st.textContent.match(/transition[^;}]*/g) || []; var ok = true; decls.forEach(function(t){ var m = t.match(/([\\d.]+)s/); if (m && parseFloat(m[1]) > 0.6) ok = false; }); return ok; })()' },
      { label:'标语与 CTA 之间有呼吸空间（间距 ≥ 16px）', js:'(function(){ if(!doc) return false; var h = doc.querySelector("h2"); if(!h) return false; return (parseFloat(win.getComputedStyle(h).marginBottom) || 0) >= 16; })()' }
    ],
    hints:[
      '五个维度自查：语义——div onclick、三个 filled 谁该是 Primary？CSS——黑底黑字、margin 0、transition 3s。交互——hover？无障碍——outline:none！设计——按钮文字、间距。',
      '动手顺序建议：先把 body 颜色修好 → div 换 button → 砍掉两个按钮的 filled（改文字链接样式）→ 删 outline:none → transition 3s 改 .2s → 加 hover → 给 h2 加 margin-bottom。',
      '「切换颜色」的 onclick 整个删掉：button 的行为 Stage 11 才学，本关只需要语义正确（空的 button type="button" 即可通过检查）。'
    ],
    cause:'完整病因单——<b>语义</b>：①「切换颜色」是页内动作却用 div onclick（无键盘、无播报、无语义）；②「进一步了解/查看规格」全部穿 filled 外衣 = 三个 Primary，层级崩塌。<b>CSS</b>：③ body 黑底黑字不可读；④ 标语与按钮 margin 0 挤成一团。<b>交互</b>：⑤ 没有任何 :hover 反馈；⑥ transition 3s——点击后世界卡了三秒。<b>无障碍</b>：⑦ outline:none 删掉键盘用户的眼睛。<b>设计</b>：⑧ 按钮文字长得像一句话——CTA 要克制，"购买"两个字足够。' },

  { type:'design', title:'Design Challenge · CTA 三连判', lead:'A/B 都是真实渲染。第 3 题要把鼠标放到卡片上——Hover 是"试"出来的，不是"看"出来的。',
    questions:[
      { q:'Q1 · 哪个版本的 CTA 层级更清楚？（可以把鼠标放到按钮上感受 hover）',
        a:{ label:'Hero A', body:'<div style="background:#000;border-radius:12px;padding:26px 22px"><div style="display:flex;gap:10px;flex-wrap:wrap"><span class="dq-btn" style="background:#0071e3;color:#fff">立即购买</span><span class="dq-btn" style="background:#0071e3;color:#fff">了解更多</span><span class="dq-btn" style="background:#0071e3;color:#fff">查看规格</span></div></div>' },
        b:{ label:'Hero B', body:'<div style="background:#000;border-radius:12px;padding:26px 22px"><div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><span class="dq-btn" style="background:#0071e3;color:#fff">购买</span><span class="dq-link" style="color:#2997ff">进一步了解 ›</span></div></div>' },
        correct:'b',
        analysis:'B 胜。一个 Primary（购买）承担"此刻最该做的事"，次级动作降级为文字链接——行动顺序一目了然（P05/P10）。A 的三个等大按钮互相放血，用户反而不知道先点哪个。',
        principle:'P10 Action Hierarchy Controls Attention' },
      { q:'Q2 · 哪个版本的间距更舒服？',
        a:{ label:'Hero A', body:'<div style="background:#000;border-radius:12px;padding:30px 26px"><p style="margin:0 0 10px;font-size:12px;color:#a1a1a6">iPhone 18 Pro</p><p style="margin:0 0 18px;font-size:30px;line-height:1.1;color:#f5f5f7;font-weight:600">Pro 再超前</p><p style="margin:0 0 20px;font-size:12px;color:#86868b">现仅可在线购买，可选择免费送货或取货。</p><div style="display:flex;gap:16px;align-items:center"><span class="dq-btn" style="background:#0071e3;color:#fff">购买</span><span class="dq-link" style="color:#2997ff">进一步了解 ›</span></div></div>' },
        b:{ label:'Hero B', body:'<div style="background:#000;border-radius:12px;padding:30px 26px"><p style="margin:0 0 10px;font-size:12px;color:#a1a1a6">iPhone 18 Pro</p><p style="margin:0 0 2px;font-size:30px;line-height:1.1;color:#f5f5f7;font-weight:600">Pro 再超前</p><p style="margin:2px 0 2px;font-size:12px;color:#86868b">现仅可在线购买，可选择免费送货或取货。</p><div style="display:flex;gap:16px;align-items:center;margin-top:2px"><span class="dq-btn" style="background:#0071e3;color:#fff">购买</span><span class="dq-link" style="color:#2997ff">进一步了解 ›</span></div></div>' },
        correct:'a',
        analysis:'A 胜。标语 → 说明 → CTA 三段之间有明确的间距节奏；B 把 CTA 焊死在文案上，动作和内容糊成一片，按钮失去"可点击"的心理暗示（P07）。' ,
        principle:'P07 Whitespace Creates Hierarchy' },
      { q:'Q3 · 把鼠标分别放到两个按钮上——哪个 Hover 更专业？',
        a:{ label:'Hover A（剧烈）', body:'<div style="background:#000;border-radius:12px;padding:34px 26px;display:flex;justify-content:center"><span class="dq-btn dq-hover-strong" style="background:#0071e3;color:#fff">购买</span></div>' },
        b:{ label:'Hover B（轻微）', body:'<div style="background:#000;border-radius:12px;padding:34px 26px;display:flex;justify-content:center"><span class="dq-btn dq-hover-soft" style="background:#0071e3;color:#fff">购买</span></div>' },
        correct:'b',
        analysis:'B 胜。轻微的颜色变化已经足够确认"可以点"；A 的放大、发光、阴影三件套把注意力从内容抢到按钮自己身上——反馈是确认意图，不是表演（P11）。Apple 的真实 hover 接近 B。',
        principle:'P11 Interaction Feedback Confirms Intent' }
    ]},

  { type:'motionlab', title:'Motion Taste · Subtle / Balanced / Exaggerated', lead:'三个 CTA，三种动效性格。把鼠标分别放上去感受，然后回答：哪一个最适合 Apple 风格的产品 Hero？' },

  { type:'transfercta', title:'Transfer Challenge · 给墨记设计 CTA', lead:'继续迁移训练：AI 笔记产品「墨记」。先想清楚策略，再做语义与样式决策，最后揭示分析——确认你不是只会复制 Apple。' },

  { type:'principles', title:'Design Principles · 本关新增', lead:'本关新增三条原则（P10~P12）。P05（CTA 收敛）在本关被反复应用——点开对照。',
    ids:['P10','P11','P12'] },

  { type:'design2', title:'CTA Trade-off · 转化聚焦 vs 品牌探索', lead:'Scenario：一个成熟品牌的升级产品页，80% 流量来自老用户换机，20% 来自新客。Goal：兼顾换机转化与新客探索。',
    questions:[
      { q:'Q · CTA 组合：单一转化 vs 双路径？',
        a:{ label:'单一转化', body:'<div style="background:#000;border-radius:10px;padding:20px;text-align:center"><div style="background:#0071e3;color:#fff;font-size:13px;font-weight:600;border-radius:99px;padding:8px 26px;display:inline-block">立即购买</div></div>', when:'适合：换机用户已知道要什么——减少决策摩擦，加速转化。' },
        b:{ label:'双路径', body:'<div style="background:#000;border-radius:10px;padding:20px;text-align:center"><div style="display:inline-flex;gap:12px"><div style="background:#0071e3;color:#fff;font-size:13px;font-weight:600;border-radius:99px;padding:8px 22px;display:inline-block">立即购买</div><div style="border:1.5px solid #2997ff;color:#2997ff;font-size:13px;font-weight:600;border-radius:99px;padding:8px 22px;display:inline-block">了解以旧换新</div></div></div>', when:'适合：20% 新客需要探索入口；换机用户仍走主 CTA 不受影响。' },
        analysis:'80/20 法则：老用户是主路径，但 20% 新客的"了解"入口不该被砍。双路径不是"CTA 不收敛"（P05），而是服务两群用户。' }
    ] },

  { type:'quiz', title:'Quiz · 动作与反馈九连问', questions:[
      { q:'a 的核心作用是？',
        options:['让文字变蓝','把用户带到另一个位置（导航）','提交表单','让元素可以点击'], answer:1,
        explain:'a = anchor，本质是导航。"可以点击"只是表象——button 也可以点击。' },
      { q:'button 的核心作用是？',
        options:['跳转到别的页面','在当前界面执行一个行为','让文字变粗','装饰页面'], answer:1,
        explain:'按钮 = 原地动作：切换、展开、播放、提交。位置不变。' },
      { q:'「购买」长得像按钮，Apple 却用 a 实现，因为——',
        options:['Apple 写错了','点击后进入购买流程页面——是导航','a 更好看','button 不能变蓝'], answer:1,
        explain:'语义跟行为走，不跟长相走：去别处 = a。' },
      { q:'href="#camera" 的含义是？',
        options:['打开 camera 文件夹','跳到当前页 id="camera" 的元素（页内锚点）','外链到相机官网','下载文件'], answer:1,
        explain:'# 开头 = 页内锚点，浏览器滚动到对应元素，不加载新页面。' },
      { q:'键盘用户靠什么发现"这里可以交互"？',
        options:['颜色更鲜艳','focus（焦点环）','字体变大','鼠标图标'], answer:1,
        explain:'鼠标用户有 hover，键盘用户只有 focus——所以 focus 样式不能删。' },
      { q:'outline:none 的直接后果是？',
        options:['页面更干净','键盘用户看不到焦点在哪里','网页加载更快','hover 失效'], answer:1,
        explain:'删除焦点环 = 键盘断网。正确做法是用 :focus-visible 定制样式，而不是删掉。' },
      { q:':active 什么时候触发？',
        options:['鼠标悬停时','被点击之后','按下未松开时','获得焦点时'], answer:2,
        explain:':hover 悬停、:active 按下未松、:focus 键盘聚焦——三种状态各管一段。' },
      { q:'transition 应该写在哪里？',
        options:['只写在 :hover 里','写在元素默认态上（进出场都平滑）','写在 body 上','不需要写'], answer:1,
        explain:'写在默认态：hover 进入平滑，移出也平滑；只写在 :hover 里，鼠标移开时会瞬间跳回。' },
      { q:'设计判断：一屏里出现两个 filled 蓝色主按钮，最大的问题是？',
        options:['颜色不够丰富','两个 Primary 抢注意力 = 没有行动层级','加载变慢','不兼容手机'], answer:1,
        explain:'注意力是预算：每个大按钮都在给真正的 Primary 放血（P05/P10）。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我知道什么时候用 a（去别处）',
      '我知道什么时候用 button（在这里做事）',
      '我理解 href 的三种目的地（站外 / 站内 / 页内锚点）',
      '我不会再把可点击的东西做成 div onclick',
      '我理解 hover / focus / active 三种状态分别何时触发',
      '我知道为什么不能随便删除 focus outline',
      '我能给 CTA 建立主次层级（Primary / Secondary / Tertiary）',
      '我能判断一个页面是否出现了太多 Primary Actions',
      '我能写基础 transition，并知道它该写在默认态上',
      '我完成了 Coding Challenge（9 项真实 DOM 检查全过）',
      '我在 Keyboard Test 里亲自验证了 a 和 button 的键盘行为',
      '我完成了 Design Challenge 与 Motion Taste 判断',
      '我完成了 Transfer Challenge（墨记的 CTA 策略）',
      '我能解释 Apple 的 CTA 为什么克制'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['Action Model', '去别处 = a（导航）；在这里做事 = button（页内动作）'],
      ['交互四态', 'default / hover / focus / active——focus 是键盘用户的命脉'],
      ['Action Hierarchy', '一屏至多一个 Primary；样式表达商业意图'],
      ['原生优先', 'Hover/Focus/Transition 全部由 CSS 原生完成——课程代码没有一行 JS']
    ],
    next:{ stage:'stage-4', text:'Stage 4：Hero 大图——img / picture / source，产品视觉登场' } }
]},

/* ---------- Stage 4 ---------- */
{ id:'stage-4', num:4, title:'图片 · 响应式媒体 · 素材与构图', short:'图片与素材', status:'ready', minutes:'240–300 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'Hero 有了文字和动作，还差 Apple 产品页最重要的东西：产品视觉。这一关图片正式登场——同时解决你一直存在的问题：没有 Apple 素材怎么办？答案是：理解素材、寻找素材、组织素材、正确加载素材，本身就是课程内容。',
    items:[
      '吃透 img：src / alt / width / height / void 元素 / 浏览器加载过程',
      '理解 picture 为什么存在：Desktop / Mobile 可能需要不同构图（Art Direction）',
      '理解 srcset / sizes 的基本目的：不同屏幕密度需要不同像素',
      '掌握 object-fit / object-position / aspect-ratio：图片不变形、裁切可控',
      'Asset Detective Lab：学会用 DevTools 自己找页面资源',
      '建立素材审美：Scale / Crop / Negative Space / 构图决定注意力（P13~P15）',
      '完成 Coding Challenge：真正的产品视觉进入你的 Hero'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 3：只有文字与动作', dark:true,
      hero:{ name:'iPhone 18 Pro', slogan:'Pro 再超前', desc:'iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。',
        cta:{ price:'RMB 9999 起 · 417/月 (24 期)', primary:'购买', secondary:'进一步了解 ›' } } },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 4：产品视觉登场', dark:true,
      hero:{ name:'iPhone 18 Pro', slogan:'Pro 再超前', desc:'iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。',
        cta:{ price:'RMB 9999 起 · 417/月 (24 期)', primary:'购买', secondary:'进一步了解 ›' },
        img:'assets/images/hero/product-desktop.png' } },
    caption:'网站第一次拥有视觉主体。注意：这不是随手贴图——图片自带构图（产品在右、负空间在左），与文字形成呼吸关系；它还有 alt、宽高、响应式资源。本关学的是"媒体系统 + 视觉构图"，不是收藏图片。' },

  { type:'taglab', title:'Tag Lab · img / picture / source', lead:'三个标签一张网：img 负责真正显示，picture 负责选择，source 负责候选规则。img 的卡片多了五页：src / alt / void 元素 / width-height / 加载失败。',
    tags:[
    { tag:'<img>', cn:'图像', one:'把一幅图像嵌入文档——网页视觉主体的标准载体。',
      what:'把一幅位图/矢量图嵌入文档。它是 void element：没有结束标签、不能包内容——因为图片不是"内容容器"，而是"被引用的资源"。',
      why:'HTML 需要一种标准方式引用外部图像并附上替代文本。alt 让图片对读屏器、搜索引擎、以及"加载失败的时刻"仍然有意义。',
      where:'任何需要显示图像的位置：Hero、卡片、图标、头像。',
      src:'src = source：图片的地址。浏览器解析到 img 时就根据 src 发起网络请求——不是等布局算完才请求，所以 src 写错会直接浪费一次请求。',
      alt:'alt = alternative text：图片的替代文本。三种命运：读屏器朗读它；图片加载失败时显示它；搜索引擎理解它。装饰性图片写 alt=""（空字符串，读屏器会跳过），内容图必须认真描述。',
      void:'img 不需要结束标签：它内部不允许有内容（图片内容来自 src 资源，不是标签之间的文字）。同类：meta、br、hr、input。',
      wh:'width / height 既是 HTML 属性也是 CSS 属性。HTML 属性写"原始宽高"（如 width="1200" height="675"），浏览器据此提前预留空间——防止图片加载完成时页面跳动（CLS）。显示大小则交给 CSS。',
      fail:'src 错误 → 显示 broken image 图标 + alt 文本。这就是 alt 的第三重意义：网络差、路径错、图被删时，用户仍然知道"这里本来是什么"。',
      min:'<img src="assets/images/hero/product-desktop.png"\n     alt="酒红色 iPhone 18 Pro 正面产品视图"\n     width="1200" height="675">',
      apple:'实测 Apple 页面有 169 个 img、166 个 picture。它的 Hero 大图 src 形如 /iphone-18-pro/images/overview/battery/hero__elo7tt0mnqy6_large_2x.webp——模块名__哈希_尺寸倍率.webp 的命名规则。',
      hero:'Hero 的产品主视觉由 img 承载。它不是装饰：它承担"产品长什么样"这一页面的核心信息——所以 alt 必须认真写。',
      vs:'img vs background-image（CSS）：有内容意义的图用 img（可写 alt、可被索引）；纯装饰纹理用 CSS 背景。img vs 内联 svg：图标类小图形可直接内联。',
      errs:'四大常见错误：① 不写 alt 或写无意义 alt="image"；② 不写 width/height 导致布局跳动；③ 用 CSS 硬拉变形；④ src 相对路径层级写错 → broken image。',
      try:'打开 Apple 页面 DevTools → Elements，找一张 img：读出它的 src 文件名、alt 内容、有没有 width/height 属性。' },
    { tag:'<picture>', cn:'响应式图片容器', one:'自己不显示任何东西的"选择器"：根据条件为内部 img 挑一张最合适的图。',
      what:'一个"选择器"容器：它自己不显示任何东西，职责是根据条件（视口宽度、屏幕密度、格式支持）从若干候选资源里挑一个交给内部的 img 显示。',
      why:'一张图不够所有屏幕：手机需要重新构图的竖版、Retina 需要双倍像素、新格式可以更小更清晰。picture 让"选哪张"成为 HTML 的声明，而不是 JS 的 hack。',
      where:'包住若干 source + 一个 img。img 永远是最后一个孩子——它是兜底。',
      inside:'零到多个 source + 必须有一个 img（fallback）。',
      min:'<picture>\n  <source media="(max-width: 734px)"\n          srcset="product-mobile.png 780w">\n  <img src="product-desktop.png"\n       alt="……" width="1200" height="675">\n</picture>',
      apple:'实测 Apple 大量使用 picture：同一模块为不同宽度准备不同资源；还有 154 张 picture 先用 1px base64 GIF 占位、滚动接近才换真图（懒加载的实践）。',
      hero:'你的 Hero 将用 picture 实现：窄屏换竖构图，宽屏用横构图——这就是 Art Direction（艺术指导式响应）。',
      vs:'picture vs img：img 是"显示这一张"；picture 是"帮 img 挑一张"。picture vs CSS 背景图切换：picture 保留 img 的全部语义（alt、宽高、懒加载）。',
      errs:'三种常见错误：① 忘写内部 img（picture 什么都不显示）；② 把 img 放在 source 前面（source 必须在前）；③ 以为 source 自己会显示图片。',
      try:'说出 picture 里三个孩子各自的职责：source(小屏)、img srcset(密度候选)、img(fallback)。谁在"显示"？谁在"规则"？' },
    { tag:'<source>', cn:'候选资源规则', one:'picture 里的"选择题选项"：自己永远不显示，只声明条件与资源。',
      what:'写在 picture 里的"候选资源 + 匹配条件"。它自己永远不显示——它是给 picture 的选择题选项。',
      why:'把"什么条件用什么图"声明出来：media 管视口条件，srcset 管密度/宽度候选，type 管格式（如 image/webp，浏览器不支持就跳过这条）。',
      where:'只能出现在 picture 内部（audio/video 里也有它，那是后面的课）。',
      inside:'无内容——void 元素，一切靠属性：media / srcset / sizes / type。',
      min:'<source media="(max-width: 734px)"\n       srcset="product-mobile.png 780w">',
      apple:'实测 Apple 页面有 581 个 source——平均每个 picture 配 3.5 条候选规则。条件大多是 max-width 断点 + 2x 密度。',
      hero:'你将写两条规则：一条管"窄屏换竖构图"（media），一条管"高分屏给大图"（srcset 的 2x 候选）。',
      vs:'source vs img：source 是规则不是画面；真正渲染的是 picture 里那个 img。media 属性 vs CSS @media：思想相同，一个选资源、一个选样式。',
      errs:'① 在 source 上写 alt（alt 属于 img）；② 忘写 media 或 srcset（规则不完整等于没有）；③ 以为浏览器会"同时加载所有 source"——不会，只加载选中的那一张。',
      try:'media="(max-width: 734px)" 的意思是"视口 ≤ 734px 时本条生效"。猜猜 734 这个数字大概是给什么设备分界准备的？' }
    ]},

  { type:'imgviz', title:'Image Loading Visualizer · 一张图的旅程', lead:'img 不是"把图片贴进去"。点击每一步，看浏览器从解析到绘制真正做了什么。' },

  { type:'srclab', title:'Source Lab · 路径的三种命运', lead:'切换不同的 src，观察：正确路径 → 图片出现；错误路径 → broken image + alt；站内绝对路径 → 在 file:// 下直接失败（它需要一台真正的服务器）。' },

  { type:'altlab', title:'Alt Text Lab · 看不见图片时，页面还说得通吗？', lead:'同一张产品图，四种 alt。先选你认为最合理的，再打开"读屏器模拟"——直观看到好 alt 和坏 alt 之间的鸿沟。' },

  { type:'domviz', title:'Structure Visualizer · picture 的分工', lead:'点击树节点或右侧区域，弄清 picture / source / img 各自的职责——特别是：谁在"显示"，谁在"选择"。',
    tree:[
      { id:'pic', label:'picture', children:[
        { id:'src-m', label:'source (max-width:734px)' },
        { id:'src-d', label:'img srcset (宽度候选)' },
        { id:'imgf', label:'img (fallback + 真正显示)' }
      ]}
    ],
    notes:{
      'pic':'选择容器：自己不显示任何东西。浏览器根据条件从候选里挑一条，交给内部 img 渲染。',
      'src-m':'候选规则一：视口 ≤ 734px 时生效——给手机换竖版构图（Art Direction）。',
      'src-d':'候选规则二：不设 media，管屏幕密度——1x 屏用 1x 图，2x Retina 用 @2x 大图。',
      'imgf':'真正的显示元素 + 兜底：所有 source 都不匹配（或浏览器太老）时显示它。alt、width、height 都写在它身上。'
    },
    visual:'<div class="browser"><div class="b-chrome"><span class="b-dots"><i></i><i></i><i></i></span><span class="b-tab" style="cursor:default">picture 结构</span></div>'
      + '<div style="background:#000;padding:20px">'
      + '<div class="dz-box" data-r="pic" style="border:1.5px dashed #2997ff;border-radius:10px;padding:12px;cursor:pointer"><span style="font-size:10px;color:#2997ff;font-family:var(--mono)">picture（选择）</span>'
      + '<div style="margin-top:10px;display:grid;gap:8px">'
      + '<div class="dz-chip" data-r="src-m" style="cursor:pointer">&lt;source media="(max-width:734px)"&gt;</div>'
      + '<div class="dz-chip" data-r="src-d" style="cursor:pointer">&lt;img srcset="1x / 2x 候选"&gt;</div>'
      + '<div class="dz-img" data-r="imgf" style="cursor:pointer"><img src="assets/images/hero/product-desktop.png" alt="" style="width:100%;display:block;border-radius:8px"><span style="font-size:10px;color:#86868b;font-family:var(--mono);display:block;margin-top:6px">img · 真正显示 · 携带 alt</span></div>'
      + '</div></div></div></div>' },

  { type:'artdirection', title:'Art Direction Lab · 一张图为什么不够', lead:'先制造问题：把一张为桌面设计的宽幅构图硬塞给手机，会发生什么？拖动宽度，对比方案 A（同图硬缩）和方案 B（Art Direction：窄屏换竖构图）。' },

  { type:'densitylab', title:'Density Lab · Retina 为什么需要 2x 图', lead:'先回答一个问题：同样 300px 的显示尺寸，普通屏幕和 Retina 屏幕需要的图片像素一样吗？想清楚再往下做实验。' },

  { type:'detective', title:'Asset Detective Lab · 学会自己找素材', lead:'从这一关起，"这张图在哪里"不再问 AI——DevTools 就是你的 X 光机。以下步骤全部可在真实的 Apple 页面上操作。' },

  { type:'sortlab', title:'Asset Organization Lab · 资产结构与命名', lead:'真实项目里不允许出现 image1.png / final-final2.png。两部分练习：先做资产分类，再判断文件命名的专业性。',
    groups:[
      { title:'第一部分 · 把文件放进正确的目录',
        items:[
          { t:'hero-desktop.webp（产品主视觉）', options:['assets/images/hero/','assets/images/sections/','assets/icons/','assets/video/'], correct:0,
            why:'Hero 专属视觉放 images/hero/——按模块分目录，一眼可知用途。' },
          { t:'camera-closeup.webp（相机模块特写，页面中段）', options:['assets/images/hero/','assets/images/sections/','assets/icons/','assets/video/'], correct:1,
            why:'内容区块的配图放 images/sections/——与 hero 分开，避免主视觉目录被稀释。' },
          { t:'logo.svg（品牌标志）', options:['assets/images/hero/','assets/icons/','assets/video/','assets/images/sections/'], correct:1,
            why:'图标与标志类矢量资源放 icons/——它们体型小、复用多、常需要单独缓存策略。' },
          { t:'intro.mp4（产品影片）', options:['assets/images/hero/','assets/icons/','assets/video/','assets/placeholder/'], correct:2,
            why:'视频独立成目录——它的体积、加载策略、 poster 姿态与图片完全不同（Stage 9 再学）。' },
          { t:'placeholder-device.svg（开发期占位图）', options:['assets/images/hero/','assets/icons/','assets/video/','assets/placeholder/'], correct:3,
            why:'占位素材单独放 placeholder/——上线前一眼扫出哪些还没换真图。' }
        ]},
      { title:'第二部分 · 哪个命名更专业？',
        items:[
          { t:'IMG_8872.png', options:['专业','不专业'], correct:1,
            why:'相机原始文件名：零语义——三个月后没人知道它是什么、用在哪。' },
          { t:'final2-new-new.png', options:['专业','不专业'], correct:1,
            why:'版本焦虑型命名：final 永远不是 final。语义信息为零，还暴露了混乱的工作流。' },
          { t:'iphone-hero-burgundy-desktop-2x.webp', options:['专业','不专业'], correct:0,
            why:'五段语义：产品-模块-颜色-设备-密度。不用死抄 Apple 的 hash 命名，但这种"自带说明书"的思路值得学。' },
          { t:'hero__elo7tt0mnqy6_large_2x.webp（Apple 实测文件名）', options:['专业','不专业'], correct:0,
            why:'Apple 的真实命名：模块__内容哈希_尺寸倍率。哈希负责缓存失效——资源更新时改 URL 强制刷新。这是工程化的命名，不是玄学。' }
        ]}
    ]},

  { type:'csslab', title:'CSS Lab · 媒体八件套', lead:'width 与 max-width 在此【复习+深化】（Stage 5 才是它们的主场）；真正的新面孔是 object-fit / object-position / aspect-ratio。带 🔬 的卡片内置真实演示。',
    props:[
    { name:'width / max-width', cn:'【复习+深化】宽度控制',
      what:'width 定宽；max-width 定上限——图片最常用的组合是 max-width:100%（永不溢出容器）。',
      def:'img 默认按原始像素显示；超出容器就会溢出。',
      min:'img {\n  max-width: 100%;\n  height: auto;\n}',
      apple:'Apple 的所有内容图都不会撑破布局——max-width 约束 + 容器系统（Stage 5 深入）。',
      gone:'小屏上图片溢出容器 → 页面出现横向滚动条。',
      exp:'在下方 Object Fit Playground 里观察 max-width:100% 与 height:auto 的配合。',
      try:'给你的 Hero 图写 max-width:100%; height:auto，并解释为什么必须配 height:auto（否则高度不变→变形）。' },
    { name:'height', cn:'【复习+深化】高度',
      what:'定高。图片常配合固定高度 + object-fit 做"裁切窗口"。',
      def:'auto（由宽度和原始比例推算）。',
      min:'.hero-visual {\n  height: 420px;\n}\n.hero-visual img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}',
      apple:'Apple 的全宽视觉区多为"固定高度窗口 + cover 裁切"——图片适应窗口，而不是窗口迁就图片。',
      gone:'没有高度约束，图片高度随宽度等比变化——构图不可控。',
      exp:'aspect-ratio 卡片的 🔬 演示本质就是"比例化的高度"。',
      try:'给 Hero 图容器设固定高度 + cover，观察窄屏时裁切发生了什么。' },
    { name:'object-fit', cn:'适应方式',
      what:'图片内容如何填进容器：拉伸(fill) / 完整显示(contain) / 裁切填满(cover) / 原始尺寸(none)。',
      def:'fill——强行拉满容器，宽高比不一致就变形。',
      min:'.hero-visual img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}',
      apple:'产品图从不变形——Apple 用与容器比例匹配的素材 + cover/精确裁切实现"填满且不变形"。',
      gone:'默认 fill：容器 16:9、图片 4:3 → 产品被横向拉胖。',
      demo:{ kind:'fit', label:'🔬 切换 object-fit：' },
      exp:'四种模式逐一切换，重点观察 fill 的变形和 contain 的留白。',
      try:'回答：产品图为什么不能 fill？什么内容适合 contain（如 Logo）？' },
    { name:'object-position', cn:'裁切焦点',
      what:'cover/contain 裁切或留白时，图片内容的对齐位置。',
      def:'50% 50%（center center）。',
      min:'.hero-visual img {\n  object-fit: cover;\n  object-position: center 30%;\n}',
      apple:'Apple 的构图精确到"产品在画面右三分之一、视线落点在负空间"——object-position 就是 CSS 层面的取景器。',
      gone:'默认 center：如果视觉主体偏在图的一角，cover 可能把它裁掉。',
      demo:{ kind:'pos', label:'🔬 切换 object-position：' },
      exp:'把位置从 center 拖到各个角落，观察主体何时被裁掉。',
      try:'记住这句话：CSS 不知道"产品在哪里"——设计师必须告诉它。' },
    { name:'aspect-ratio', cn:'宽高比',
      what:'用比例声明盒子的形状：aspect-ratio: 16/9。宽度定了，高度自动算。',
      def:'auto（由内容和宽高属性决定）。',
      min:'.hero-visual {\n  aspect-ratio: 16 / 9;\n}',
      apple:'Apple 的视觉区比例高度一致——比例统一带来节奏感。',
      gone:'高度只能手动写死或随内容浮动——响应式下很难保持构图。',
      demo:{ kind:'ratio', label:'🔬 切换 aspect-ratio：' },
      exp:'同一张图放进 16:9 / 4:3 / 1:1 / 9:16，观察构图如何被比例重塑。',
      try:'判断：Hero 桌面端常用什么比例？手机端呢？（没有标准答案——训练构图意识。）' },
    { name:'display', cn:'【复习】显示类型',
      what:'元素的显示类型。img 是行内替换元素——底部会有一小段基线空隙。',
      def:'img 默认 inline。',
      min:'.hero-visual img {\n  display: block;\n}',
      apple:'图片无缝拼接的分区页面必然处理了 img 的 inline 空隙。',
      gone:'img 下方出现 4~5px 神秘空隙——新手经典疑难。',
      exp:'无独立演示——Fit Lab 里已给 img 设 display:block，试着想想删掉会怎样。',
      try:'解释 img 底部空隙的来源（提示：inline 元素坐在基线上，基线下面还有下降部空间）。' },
    { name:'overflow', cn:'溢出处理',
      what:'容器内容超出时怎么办：visible(默认) / hidden / auto / scroll。',
      def:'visible（溢出照样显示，可能撑破布局）。',
      min:'.hero-visual {\n  overflow: hidden;\n}',
      apple:'圆角卡片内的图片裁切依赖 overflow:hidden——它是"裁切窗口"的边框。',
      gone:'cover 裁切失效、圆角内图片溢出、横向滚动出现。',
      exp:'Fit Lab 的容器就带着 overflow:hidden——没有它 none 模式会溢出。',
      try:'把容器想象成相框：overflow:hidden 负责"框住"，object-fit 负责"怎么摆"。' }
    ]},

  { type:'fitlab', title:'Object Fit Playground · 不变形的艺术', lead:'同一张图，固定容器。切换四种适应方式 + 拖动焦点，回答：为什么产品图不能随便拉伸？cover 什么时候裁掉了主体？' },

  { type:'ratiolab', title:'Aspect Ratio Lab · 比例重塑构图', lead:'同一张产品图，四种容器比例。观察构图如何被比例改变，然后回答：Hero / 卡片 / 手机端各适合什么比例？（没有标准答案——训练构图意识。）' },

  { type:'trio', title:'Asset Is the Design · 素材决定气质', lead:'三个 Hero：Typography、CTA、间距完全相同——只有素材不同。选出让整页"像 Apple"的那个，然后揭示为什么（P06 深化）。',
    options:[
      { key:'messy', label:'素材 A · 杂乱背景',
        html:'<div class="td-hero"><img src="assets/images/hero/product-messy.png" alt="" class="td-img"><div class="td-copy"><p class="td-name">iPhone 18 Pro</p><p class="td-slogan">Pro 再超前</p></div></div>' },
      { key:'plain', label:'素材 B · 平光白底',
        html:'<div class="td-hero"><img src="assets/images/hero/product-plain.png" alt="" class="td-img td-img-plain"><div class="td-copy td-copy-dark"><p class="td-name">iPhone 18 Pro</p><p class="td-slogan">Pro 再超前</p></div></div>' },
      { key:'studio', label:'素材 C · 棚拍光影',
        html:'<div class="td-hero"><img src="assets/images/hero/product-studio.png" alt="" class="td-img"><div class="td-copy"><p class="td-name">iPhone 18 Pro</p><p class="td-slogan">Pro 再超前</p></div></div>' }
    ],
    correct:'studio',
    analysis:'C 胜。三个 Hero 的 HTML/CSS 几乎一样——差距全部来自素材：A 的杂乱背景杀死焦点（P01），文字无处安放；B 的平光白底没有光影叙事，"产品照"变"证件照"；C 的深色棚拍自带聚光、影子与负空间——文字落在留白处，气质浑然一体。<b>不是所有高级感都能靠 CSS 补出来。</b>这就是 P06 The Asset Is the Design 的完整含义：网页审美的一大半，在素材本身。',
    principle:'P06 The Asset Is the Design' },

  { type:'design', title:'Design Challenge · 构图三连判', lead:'全部真实渲染。训练目标：Scale / Crop / Negative Space 三个构图武器的手感。',
    questions:[
      { q:'Q1 · 产品在 Hero 中的大小，哪个关系更好？',
        a:{ label:'构图 A', body:'<div class="dc-hero"><img src="assets/images/hero/product-studio.png" alt="" style="max-width:52%;display:block;margin-left:auto"><p class="dc-cap">图占版面约一半：产品有力量感，负空间仍然完整，文字有安放之处。</p></div>' },
        b:{ label:'构图 B', body:'<div class="dc-hero"><img src="assets/images/hero/product-studio.png" alt="" style="max-width:100%;display:block"><p class="dc-cap">图占满全部版面：产品巨大，但没有给文字留下任何落点。</p></div>' },
        correct:'a',
        analysis:'A 胜。产品大小决定"力量感 vs 空间感"的平衡：约一半的产品 + 一半的负空间，力量与呼吸兼得。B 不是"大气"，是失控——越大越高级是误区。',
        principle:'P13 Composition Controls Attention' },
      { q:'Q2 · 同一张图的两种裁切，哪个更有张力？',
        a:{ label:'裁切 A', body:'<div class="dc-frame"><img src="assets/images/hero/product-studio.png" alt="" style="object-position:20% 90%"></div>' },
        b:{ label:'裁切 B', body:'<div class="dc-frame"><img src="assets/images/hero/product-studio.png" alt="" style="object-position:80% 40%"></div>' },
        correct:'b',
        analysis:'B 胜：裁切窗口对准产品（object-position 80% 40%），产品完整、重心稳定。A 把窗口对准空地——产品被切掉大半，视觉重心偏掉。<b>裁切即取景：CSS 不知道产品在哪里，你必须告诉它。</b>',
        principle:'P13 Composition Controls Attention' },
      { q:'Q3 · 文字应该落在哪里？',
        a:{ label:'排布 A', body:'<div class="dc-hero" style="position:relative;padding:0"><img src="assets/images/hero/product-studio.png" alt="" style="display:block"><div style="position:absolute;right:14%;top:40%"><p style="margin:0;font-size:13px;color:#a1a1a6">iPhone 18 Pro</p><p style="margin:2px 0 0;font-size:30px;font-weight:600;color:#f5f5f7;line-height:1.1">Pro 再超前</p></div></div>' },
        b:{ label:'排布 B', body:'<div class="dc-hero" style="position:relative;padding:0"><img src="assets/images/hero/product-studio.png" alt="" style="display:block"><div style="position:absolute;left:7%;top:38%"><p style="margin:0;font-size:13px;color:#a1a1a6">iPhone 18 Pro</p><p style="margin:2px 0 0;font-size:30px;font-weight:600;color:#f5f5f7;line-height:1.1">Pro 再超前</p></div></div>' },
        correct:'b',
        analysis:'B 胜：文字落在图片自带的负空间（左侧暗部）——图与文互不侵犯，焦点唯一。A 把文字压在产品身上：两个视觉主体打架，谁也看不清。<b>负空间不是"空着的地方"，是留给文字和视线的可用空间（P14）。</b>',
        principle:'P14 Negative Space Is Usable Space' }
    ]},

  { type:'composelab', title:'Hero Composition Lab · 亲手构图', lead:'把 Typography + Whitespace + Product Image 三者放在一起调。目标：第一次自己完成 Hero 的构图平衡——没有"标准答案"，只有"是否成立"。' },

  { type:'refcompare', title:'Reference vs My Version · 对比训练', lead:'第一次正式的视觉对比训练：左边 Apple 参考，右边当前教学实现。不求像素级复制——训练"看出差别"的眼睛。' },

  { type:'challenge', title:'Coding Challenge · 产品视觉进入 Hero',
    task:'在 Stage 3 Hero 的 Typography + CTA 基础上加入真正的产品视觉。要求：① 使用 picture 结构：窄屏（max-width:734px）换竖构图 product-mobile.png，其余用 product-desktop.png；② img 兜底且带认真写的 alt（≥8 个字，不要 "image/图片"）；③ 写 width/height 属性防布局跳动；④ CSS：img display:block + max-width:100% + height:auto，不变形；⑤ Hero 主图不要 loading="lazy"。可用素材：assets/images/hero/product-desktop.png（1200×675）、product-mobile.png（780×1040）。判分读取真实 DOM。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { background-color: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; margin: 0; padding: 70px 40px; }\n  h1 { font-size: 30px; font-weight: 600; margin: 0 0 8px; }\n  h2 { font-size: 64px; font-weight: 600; line-height: 1.1; margin: 0 0 18px; }\n  .desc { font-size: 16px; line-height: 1.6; color: #86868b; margin: 0 0 6px; }\n  .price { font-size: 13px; color: #86868b; margin: 0 0 20px; }\n  .cta-buy { display: inline-block; background-color: #0071e3; color: #fff; font-size: 16px; text-decoration: none; padding: 11px 24px; border-radius: 99px; margin-right: 18px; }\n  .cta-more { color: #2997ff; font-size: 16px; text-decoration: none; }\n  /* TODO 1: 视觉容器 .hero-visual——与文字之间留出呼吸间距 */\n\n  /* TODO 2: img 基础样式——display:block / max-width:100% / height:auto，防变形防溢出 */\n\n</style>\n</head>\n<body>\n  <main>\n    <section class="hero">\n      <h1>iPhone 18 Pro</h1>\n      <h2>Pro 再超前</h2>\n      <p class="desc">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。</p>\n      <p class="price">RMB 9999 起 · RMB 417/月 (24 期) 起</p>\n      <a class="cta-buy" href="/buy/">购买</a>\n      <a class="cta-more" href="#design">进一步了解 ›</a>\n\n      <!-- TODO 3: picture 结构——\n           source(max-width:734px) → assets/images/hero/product-mobile.png\n           img 兜底 → assets/images/hero/product-desktop.png + 认真的 alt + width/height -->\n\n    </section>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'存在 img 元素', js:'doc && doc.querySelector("img")' },
      { label:'img 有资源（src 或 picture 内 source 提供候选）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); if (!i) return false; return !!i.getAttribute("src") || !!doc.querySelector("picture source[srcset]"); })()' },
      { label:'alt 认真（≥8 字且不是 image/图片 这类占位词）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); if (!i) return false; var a = (i.getAttribute("alt") || "").trim(); return a.length >= 8 && !/^(image|photo|图片|照片|图)\\d*$/i.test(a); })()' },
      { label:'写了 width 和 height 属性（防布局跳动）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); return !!i && !!i.getAttribute("width") && !!i.getAttribute("height"); })()' },
      { label:'图片真实加载成功（资源存在，naturalWidth > 0）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); return !!i && i.naturalWidth > 0; })()' },
      { label:'有 picture 且结构正确（source 在 img 前，img 兜底存在）', js:'(function(){ if(!doc) return false; var p = doc.querySelector("picture"); if (!p) return true; var kids = [].slice.call(p.children).map(function(e){ return e.tagName.toLowerCase(); }); var si = kids.indexOf("source"), ii = kids.indexOf("img"); return si >= 0 && ii >= 0 && si < ii; })()' },
      { label:'窄屏候选存在（source 带 max-width 媒体条件）', js:'(function(){ if(!doc) return false; var s = doc.querySelector("picture source[media]"); return !!s && s.getAttribute("media").indexOf("max-width") >= 0; })()' },
      { label:'图片样式防变形（渲染比例 = 固有比例，或 object-fit 非 fill）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); if (!i) return false; var cs = win.getComputedStyle(i); if (cs.objectFit !== "fill") return true; var rw = i.getBoundingClientRect().width, rh = i.getBoundingClientRect().height; var iw = i.naturalWidth || 1, ih = i.naturalHeight || 1; return Math.abs(rh / rw - ih / iw) / (ih / iw) < 0.05; })()' },
      { label:'max-width:100% 防溢出（无横向滚动）', js:'(function(){ if(!doc || !doc.documentElement) return false; var cs = win.getComputedStyle(doc.querySelector("img")); var noOverflow = doc.documentElement.scrollWidth <= doc.documentElement.clientWidth + 1; return (cs.maxWidth === "100%" || cs.width === "100%") && noOverflow; })()' },
      { label:'Hero 主图没有懒加载（首屏图立即加载）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); return !!i && i.getAttribute("loading") !== "lazy"; })()' }
    ],
    hints:[
      'picture 顺序：source 在前、img 在后（img 是兜底）。media 条件写 max-width:734px，srcset 给竖图路径。',
      'img 三件套：<img src="assets/images/hero/product-desktop.png" alt="酒红色 iPhone 18 Pro 正面产品视图" width="1200" height="675">。alt 描述"什么产品 + 什么视角"，别写"图片"。',
      'CSS 四行：img { display:block; max-width:100%; height:auto; } —— display:block 消灭 inline 空隙，max-width 防溢出，height:auto 保比例不变形。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { background-color: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; margin: 0; padding: 70px 40px; }\n  h1 { font-size: 30px; font-weight: 600; margin: 0 0 8px; }\n  h2 { font-size: 64px; font-weight: 600; line-height: 1.1; margin: 0 0 18px; }\n  .desc { font-size: 16px; line-height: 1.6; color: #86868b; margin: 0 0 6px; }\n  .price { font-size: 13px; color: #86868b; margin: 0 0 20px; }\n  .cta-buy { display: inline-block; background-color: #0071e3; color: #fff; font-size: 16px; text-decoration: none; padding: 11px 24px; border-radius: 99px; margin-right: 18px; }\n  .cta-more { color: #2997ff; font-size: 16px; text-decoration: none; }\n  .hero-visual { margin-top: 40px; }\n  .hero-visual img { display: block; max-width: 100%; height: auto; }\n</style>\n</head>\n<body>\n  <main>\n    <section class="hero">\n      <h1>iPhone 18 Pro</h1>\n      <h2>Pro 再超前</h2>\n      <p class="desc">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。</p>\n      <p class="price">RMB 9999 起 · RMB 417/月 (24 期) 起</p>\n      <a class="cta-buy" href="/buy/">购买</a>\n      <a class="cta-more" href="#design">进一步了解 ›</a>\n      <div class="hero-visual">\n        <picture>\n          <source media="(max-width: 734px)" srcset="assets/images/hero/product-mobile.png">\n          <img src="assets/images/hero/product-desktop.png"\n               alt="酒红色 iPhone 18 Pro 正面产品视图，深色背景，左侧留有大量负空间"\n               width="1200" height="675">\n        </picture>\n      </div>\n    </section>\n  </main>\n</body>\n</html>' },

  { type:'rimagelab', title:'Responsive Image Lab · 浏览器真的在选', lead:'下面 iframe 里是一个真实的 picture：窄屏候选 + 宽屏 fallback。切换宽度按钮，观察浏览器真实的资源选择——这不是模拟，是浏览器本人在选。' },

  { type:'sortlab', title:'Lazy Loading Lab · 首屏不该偷懒', lead:'"所有图片都加 loading=lazy"是新手第一大性能误区。判断下面每张图该懒加载（lazy）还是立即加载（eager）。',
    groups:[
      { title:'Above the Fold 还是 Below the Fold？',
        items:[
          { t:'Hero 首屏产品主图', options:['lazy（懒加载）','eager（立即加载）'], correct:1,
            why:'首屏图是 LCP 候选——lazy 会把它推后。立即加载。' },
          { t:'页面第 3 屏的相机模块特写', options:['lazy（懒加载）','eager（立即加载）'], correct:0,
            why:'用户滚到才看得到——lazy 省下的流量是真实的。Apple 的 154 张懒加载占位图就是这个思路。' },
          { t:'导航栏的 Logo 小图', options:['lazy（懒加载）','eager（立即加载）'], correct:1,
            why:'首屏元素 + 体积小——lazy 收益为零还增加调度开销。' },
          { t:'页脚上方的配件横幅图', options:['lazy（懒加载）','eager（立即加载）'], correct:0,
            why:'在页面最底部——典型 Below the Fold。' },
          { t:'用户点开才显示的弹窗插图', options:['lazy（懒加载）','eager（立即加载）'], correct:0,
            why:'交互后才出现的资源，lazy 让浏览器按需请求。' }
        ]}
    ]},

  { type:'debug', title:'Debug Challenge · 图片五连伤',
    story:'这个 Hero 的图片区域看起来很不对：有一个裂图图标、一张被拉得细长的图片、页面还能左右滑动。Run 看症状 → 找出原因 → 修复 → 检查。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { background-color: #000; color: #f5f5f7; margin: 0; padding: 60px 30px; }\n  h2 { font-size: 60px; font-weight: 600; margin: 0 0 16px; }\n  .hero-visual img {\n    width: 1400px;\n    height: 300px;\n    object-fit: fill;\n  }\n</style>\n</head>\n<body>\n  <main>\n    <section class="hero">\n      <h2>Pro 再超前</h2>\n      <div class="hero-visual">\n        <img src="assets/images/hero/produt-desktop.png" alt="">\n      </div>\n    </section>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'图片路径正确（naturalWidth > 0，不再是 broken image）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); return !!i && i.naturalWidth > 0; })()' },
      { label:'alt 认真填写（≥8 字，不是占位词）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); if (!i) return false; var a = (i.getAttribute("alt") || "").trim(); return a.length >= 8 && !/^(image|photo|图片|照片)\\d*$/i.test(a); })()' },
      { label:'图片不再被拉伸变形（渲染比例 = 固有比例，或 object-fit 非 fill）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); if (!i) return false; var cs = win.getComputedStyle(i); if (cs.objectFit !== "fill") return true; var rw = i.getBoundingClientRect().width, rh = i.getBoundingClientRect().height; var iw = i.naturalWidth || 1, ih = i.naturalHeight || 1; return Math.abs(rh / rw - ih / iw) / (ih / iw) < 0.05; })()' },
      { label:'图片不再溢出容器（无横向滚动）', js:'(function(){ if(!doc || !doc.documentElement) return false; return doc.documentElement.scrollWidth <= doc.documentElement.clientWidth + 1; })()' },
      { label:'有响应式候选（picture + max-width 媒体条件的 source）', js:'(function(){ if(!doc) return false; var s = doc.querySelector("picture source[media]"); return !!s && s.getAttribute("media").indexOf("max-width") >= 0; })()' },
      { label:'picture 结构正确（source 在前，img 兜底在后）', js:'(function(){ if(!doc) return false; var p = doc.querySelector("picture"); if (!p) return false; var kids = [].slice.call(p.children).map(function(e){ return e.tagName.toLowerCase(); }); var si = kids.indexOf("source"), ii = kids.indexOf("img"); return si >= 0 && ii >= 0 && si < ii; })()' },
      { label:'主图移除了 loading="lazy"（首屏图立即加载）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); return !!i && i.getAttribute("loading") !== "lazy"; })()' },
      { label:'写了 width/height 属性（防布局跳动）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); return !!i && !!i.getAttribute("width") && !!i.getAttribute("height"); })()' }
    ],
    hints:[
      '症状对应问题类别：broken image＝路径拼写（produt→product）＋空 alt；细长条变形＝CSS 硬拉（1400×300+fill）；横向滚动＝缺 max-width:100%；手机也用横构图＝缺 picture/source。',
      '修复 CSS：.hero-visual img { display:block; max-width:100%; height:auto; }——三行解决变形、溢出、跳动。',
      'picture 结构：<source media="(max-width:734px)" srcset="assets/images/hero/product-mobile.png"> + <img src="assets/images/hero/product-desktop.png" alt="…" width="1200" height="675">。'
    ],
    cause:'完整病因单——<b>HTML</b>：① src 拼写错误 produt→product（broken image，alt 又是空的，用户什么都看不到）；② 没有 width/height，图片加载完成时布局会跳动。<b>CSS</b>：③ width:1400px + height:300px + object-fit:fill——图片被硬拉成细长条；④ 缺少 max-width:100% → 图片撑破容器出现横向滚动。<b>响应式媒体</b>：⑤ 没有 picture/source——手机上也在加载桌面横构图。<b>无障碍</b>：⑥ alt="" 空替代——broken 时刻和读屏器用户同时失明。（lazy 误用本题没考——去 Lazy Loading Lab 补课。）' },

  { type:'transfermedia', title:'Transfer Challenge · 墨记 Recorder 的媒体策略', lead:'新产品：InkNote AI 录音硬件。给出三张可选素材与四个策略决策——输出你自己的媒体策略，然后揭示分析。' },

  { type:'principles', title:'Design Principles · 本关新增', lead:'本关新增三条构图原则（P13~P15）。P06（素材即设计）在 Asset Is the Design 实验中被彻底讲透。',
    ids:['P13','P14','P15'] },

  { type:'design2', title:'Composition Trade-off · 产品大图 vs 信息密度', lead:'Scenario：一款工业三防手机的详情页，目标用户是建筑工地采购经理，他们关心 IP68/MIL-STD 等认证参数超过外观。',
    questions:[
      { q:'Q · 首屏构图：大图冲击 vs 参数前置？',
        a:{ label:'大图冲击', body:'<div style="background:#000;border-radius:10px;padding:18px"><img src="assets/images/hero/product-studio.png" alt="" style="width:70%;display:block;margin:0 auto"><p style="margin:8px 0 0;text-align:center;font-size:11px;color:#86868b">视觉证明"三防"品质</p></div>', when:'适合：消费级产品、外观是购买驱动力、需要建立品质信心。' },
        b:{ label:'参数前置', body:'<div style="background:#000;border-radius:10px;padding:18px"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#f5f5f7">IP68 · MIL-STD-810H · -30°C~60°C</p><p style="margin:0 0 10px;font-size:11.5px;color:#86868b;line-height:1.6">通过军工级 12 项测试。从 3 米跌落、水下 1.5 米 30 分钟、极端温差——全部合格。</p><img src="assets/images/hero/product-studio.png" alt="" style="width:50%;display:block;margin:0 auto"></div>', when:'适合：B2B 采购、工程用户、参数驱动决策。文字先回答"能不能用"，图片再证明。' },
        analysis:'两个都合理——取决于用户是谁。消费者看图觉得"可靠"；采购经理看参数觉得"合规"。P01 的"焦点"对不同人意味着不同东西。' }
    ] },

  { type:'quiz', title:'Quiz · 图片十连问', questions:[
      { q:'img 为什么是 void element（没有结束标签）？',
        options:['为了节省字节数','它不是内容容器——内容来自 src 引用的资源','历史遗留','所有标签都可以不闭合'], answer:1,
        explain:'img 内部不允许有内容（画面来自 src 资源），所以不需要结束标签。同类：meta、br、input。' },
      { q:'浏览器解析到 <img> 时，什么时候发起图片请求？',
        options:['等整页渲染完','解析到该元素、拿到 src 就发起','等用户滚动到','等 CSS 加载完'], answer:1,
        explain:'src 就位立即请求——这也是懒加载能"推迟"请求的原理。' },
      { q:'alt=""（空字符串）的正确用途是？',
        options:['偷懒不写','标记装饰性图片——读屏器直接跳过','让图片不显示','提高 SEO'], answer:1,
        explain:'装饰图 alt="" 是规范用法；内容图必须认真描述。两者都不能省。' },
      { q:'HTML 属性 width="1200" height="675" 的主要作用是？',
        options:['固定显示大小','让浏览器提前预留空间，防止加载后布局跳动','压缩图片','替代 CSS width'], answer:1,
        explain:'宽高属性告知原始比例 → 浏览器加载前就留好位置（防 CLS）。显示大小仍由 CSS 管。' },
      { q:'picture 里真正的"显示元素"是？',
        options:['第一个 source','最后一个 source','内部的 img','picture 本身'], answer:2,
        explain:'picture 是选择器，source 是候选规则，img 才显示画面并携带 alt。' },
      { q:'source 的 media="(max-width:734px)" 生效时，浏览器会？',
        options:['同时下载所有候选','加载该 source 指定的资源，其余跳过','报错','需要 JS 配合'], answer:1,
        explain:'picture 是"多选一"：只加载选中的那张——这正是它省流量的方式。' },
      { q:'为什么 Retina 屏需要 2x 图片？',
        options:['更清晰（同样 CSS 尺寸下像素密度翻倍）','加载更快','格式更先进','没有为什么，惯例而已'], answer:0,
        explain:'300px 显示宽度在 2x 屏实际由 600 物理像素呈现——只给 300px 图就会模糊。Apple 资源名的 __large_2x 就是这个用途。' },
      { q:'object-fit: fill 的风险是？',
        options:['图片过大','容器与图片比例不一致时变形','无法懒加载','颜色失真'], answer:1,
        explain:'fill 强行拉满不保比例——产品图会变胖变扁。保比例用 cover（裁切）或 contain（留白）。' },
      { q:'aspect-ratio: 16/9 的意义是？',
        options:['把图片压缩成 16:9','声明盒子形状：宽度定了，高度按比例自动算','裁掉图片两侧','等效于 height:56.25%'], answer:1,
        explain:'它约束的是容器形状；配合 object-fit 决定内容如何填充。' },
      { q:'Hero 首屏主图应该加 loading="lazy" 吗？',
        options:['应该，lazy 万能','不应该——首屏图立即加载，lazy 留给滚动后才出现的图','看心情','只有 PNG 需要'], answer:1,
        explain:'lazy 推迟首屏主图 = 拖慢 LCP。Above the fold 立即加载，Below the fold 才懒加载。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我知道 img 的作用与 void 元素的原因',
      '我理解 src 与浏览器的请求时机',
      '我会写合理的 alt（装饰图 alt=""，内容图具体描述）',
      '我知道 picture 为什么存在（Art Direction + 格式/密度候选）',
      '我知道 source 不是显示图片的标签，img 才是',
      '我理解 Desktop / Mobile 为什么可能需要不同构图',
      '我理解 srcset 的基本目的（屏幕密度/宽度候选）',
      '我理解 object-fit 四种模式及变形的成因',
      '我理解 aspect-ratio 与构图的关系',
      '我会用 DevTools 的 Elements / Network / Sources 找页面图片资源',
      '我能判断图片是否被错误拉伸',
      '我开始理解负空间和 Crop（构图即分配注意力）',
      '我知道 Hero 主图不该 lazy',
      '我完成了 Coding Challenge（10 项真实 DOM 检查全过）',
      '我完成了 Debug Challenge（图片五连伤全部修复）',
      '我完成了 Design Challenge 与 Transfer Challenge'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['媒体系统', 'img 显示 · picture 选择 · source 规则 · srcset 密度 · loading 时机'],
      ['视觉控制', 'max-width 防溢出 · object-fit 防变形 · object-position 定焦点 · aspect-ratio 定构图'],
      ['素材审美', '素材决定气质（P06）· 构图分配注意力（P13）· 负空间可用（P14）· 换屏可换构图（P15）'],
      ['问题定位', '变形=CSS · broken=路径 · 太小=构图 · 没文字放=负空间 · 怎么都不像=素材本身']
    ],
    next:{ stage:'stage-5', text:'Stage 5：Hero 布局精修——max-width 容器系统、margin:auto、clamp()' } }
]},

/* ---------- Stage 5 ---------- */
{ id:'stage-5', num:5, title:'Hero 布局精修', short:'布局精修', status:'ready', minutes:'180–220 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'Stage 4 的 Hero 拥有文字、动作与产品视觉——但把浏览器拉宽到 2560px 会原形毕露：文字一行拉到两米长，图片糊满全屏。这一关建立 Hero 的"骨架级"约束：容器、居中、流式字号。完成后，Typography + CTA + Image 才第一次成为一个"构图系统"。',
    items:[
      '理解容器（container）：为什么内容不能无限宽——可读性的物理极限是每行 45~75 个字符',
      '掌握 max-width + margin-inline:auto + padding 的"容器三件套"',
      '学会 clamp()：字号随视口流动，但永远不小于可读下限、不大于构图上限',
      '理解 box-sizing:border-box 为什么是现代 CSS 第一行',
      'Hero Balance Lab：亲手把 Typography / Whitespace / Image 调到平衡',
      '完成 Coding Challenge：Stage 4 的 Hero 获得真正的容器系统'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 4：宽屏下失控', dark:true, blank:'文字拉满 2560px 宽 → 一行 30cm 长；图片糊满全屏边缘' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 5：容器约束下的 Hero', dark:true,
      hero:{ name:'iPhone 18 Pro', slogan:'Pro 再超前', desc:'iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。',
        cta:{ price:'RMB 9999 起 · 417/月 (24 期)', primary:'购买', secondary:'进一步了解 ›' },
        img:'assets/images/hero/product-desktop.png' } },
    caption:'同样的内容，容器让它"巨大而不散"。这就是 Apple 页面在超宽显示器上依然成立的第一秘密：背景可以铺满全屏，内容永远被约束在一个舒适的宽度里。' },

  { type:'csslab', title:'CSS Lab · 布局精修六件套', lead:'max-width 与 padding 是老朋友（复习+深化）；margin:auto、clamp()、box-sizing、视口单位是本关新面孔。',
    props:[
    { name:'max-width', cn:'【复习+深化】最大宽度',
      what:'元素的宽度上限。容器系统的核心：不管屏幕多宽，内容最宽就这么宽。',
      def:'none（可以无限宽）。',
      min:'.container {\n  max-width: 980px;\n}',
      apple:'实测 Apple 的内容模块被约束在约 980~1024px 内容宽（视觉观察 + 布局测量；ps-spacing 间距类负责外层呼吸）。背景铺满全屏、内容受限——这是 Apple 布局的基本语法。',
      gone:'2560px 显示器上文字一行接近两米——眼睛要从行尾找 回行首，读三行就累。',
      exp:'去下方 Container Lab，把宽度从 320 拖到 1600。',
      try:'找出"舒服"的宽度区间——你拖到多宽时开始不舒服？（答案通常在 900~1100px。）' },
    { name:'margin: auto', cn:'居中引擎',
      what:'margin 的 auto 值：把"剩余空间"平均分给左右——水平居中的经典手段。常写成 margin-inline:auto 或 margin:0 auto。',
      def:'0（块级元素贴在容器左侧）。',
      min:'.container {\n  max-width: 980px;\n  margin-inline: auto;\n}',
      apple:'Apple 的每一块内容都水平居中于全屏背景——靠的就是容器 + auto 外边距的组合。',
      gone:'容器限了宽却不居中：整块内容贴在屏幕左边，右边一大片空白——比不限宽还难看。',
      exp:'Container Lab 里有"居中开关"——关掉它看 3 秒，你就懂了。',
      try:'记住公式：max-width 定宽 + margin-inline auto 居中 + padding 给呼吸。三件套缺一不可。' },
    { name:'padding', cn:'【复习】内边距',
      what:'容器与内容之间的呼吸空间。容器系统里它保护"窄屏时刻"——内容不贴屏幕边。',
      def:'0。',
      min:'.container {\n  max-width: 980px;\n  margin-inline: auto;\n  padding-inline: 22px;\n}',
      apple:'实测移动端 Apple 内容距屏幕边约 20px 级——padding 在窄屏接手宽屏时 margin 的工作。',
      gone:'手机上文字贴着屏幕边缘——廉价感立现。',
      exp:'Container Lab 的宽度拉到 390，观察 padding 的作用。',
      try:'为什么 padding-inline 用在容器上，而不是给每个元素各自加 margin？（答案：统一管理，改一处生效全局。）' },
    { name:'clamp()', cn:'流式限制函数',
      what:'clamp(最小值, 首选值, 最大值)：首选值随视口流动，但被夹在上下限之间。流式字号（fluid typography）的核心工具。',
      def:'—（数学函数，无默认值概念）。',
      min:'h2 {\n  font-size: clamp(40px, 8vw, 80px);\n}',
      apple:'Apple 的大标题在小屏与大屏之间平滑过渡（视觉观察）——大屏不再堆一个死板的 64px，小屏也不会挤爆。',
      gone:'固定 80px：手机上标语占三行；固定 40px：大屏上标语没了气势。',
      exp:'Clamp Playground：拖动视口宽度，看 clamp 的字号如何"流动但被夹住"。',
      try:'算一算：clamp(40px, 8vw, 80px) 在 390px 和 1440px 视口下各是多少？（390×8%=31.2→夹到 40；1440×8%=115→夹到 80。）' },
    { name:'box-sizing', cn:'盒模型开关',
      what:'决定 width/height 算不算 padding 和 border：content-box（默认，宽度只是内容）vs border-box（宽度含一切）。',
      def:'content-box——加 padding 会把盒子撑大，布局算术变成噩梦。',
      min:'*, *::before, *::after {\n  box-sizing: border-box;\n}\n/* 现代项目第一行 CSS */',
      apple:'所有精确到像素的布局都建立在统一的盒模型约定上——border-box 让"宽度"一词恢复直觉。',
      gone:'容器 max-width:980 + padding 22 → 实际 1024px：每次加内边距都在破坏宽度约定。',
      exp:'无独立演示——记结论：写新项目第一行就是全局 border-box。',
      try:'算一下：content-box 下 width:980px + padding:22px 的真实总宽是多少？（1024px。）' },
    { name:'vw / vh', cn:'视口单位',
      what:'vw = 视口宽度的 1%，vh = 高度的 1%。clamp 的"流动引擎"就是它们。',
      def:'—（单位，无默认值）。',
      min:'font-size: 8vw; /* 390 视口 = 31.2px */\n/* 单独用太危险，交给 clamp 管束： */\nfont-size: clamp(40px, 8vw, 80px);',
      apple:'Apple 的流式排版（视觉观察）本质就是视口单位 + 上下限约束。',
      gone:'——不是"删了会怎样"，而是"裸用会怎样"：8vw 在 2560px 屏上是 205px 的怪物字。',
      exp:'Clamp Playground 把上限拉到 300px 试试"裸 vw"的灾难。',
      try:'说出 vw 的三个保镖：clamp 的下限、上限，以及（Stage 14 的）断点媒体查询。' }
    ]},

  { type:'containerlab', title:'Container Lab · 内容宽度的物理学', lead:'拖动宽度滑块 + 开关居中，观察三件事：行长（可读性）、构图（聚焦）、以及"背景全宽 vs 内容受限"的分层。' },

  { type:'clampplay', title:'Clamp Playground · 会流动的字号', lead:'左边调 clamp 参数和视口，右边实时预览。核心观察：clamp 的字号"流动但被夹住"——这就是 Apple 大标题在小屏大屏之间平滑过渡的秘密。' },

  { type:'herobalance', title:'Hero Balance Lab · 构图平衡', lead:'Typography / Whitespace / Image 三股力量同台。没有标准答案，只有"是否成立"：产品有力量感吗？文字有落点吗？整页在呼吸吗？' },

  { type:'design', title:'Design Challenge · 约束的两难', lead:'两个真实渲染的取舍。约束不是限制创意——约束创造构图。',
    questions:[
      { q:'Q1 · 同一份 Hero 内容，2560px 宽屏上哪个成立？',
        a:{ label:'版本 A', body:'<div style="background:#000;border-radius:12px;padding:22px"><p style="margin:0;font-size:13px;color:#f5f5f7;line-height:1.6">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或前往 Apple Store 零售店取货，还可享受 24 期免息分期与年年焕新计划。</p><p style="margin:8px 0 0;font-size:10.5px;color:#6e6e73">一行 40+ 汉字：眼睛从行尾回到行首会丢失位置。</p></div>' },
        b:{ label:'版本 B', body:'<div style="background:#000;border-radius:12px;padding:22px"><div style="max-width:62%"><p style="margin:0;font-size:13px;color:#f5f5f7;line-height:1.6">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或前往 Apple Store 零售店取货。</p></div><p style="margin:8px 0 0;font-size:10.5px;color:#6e6e73">约 22 字/行：可读性区间内。</p></div>' },
        correct:'b',
        analysis:'B 胜。可读性的物理极限：一行 45~75 个拉丁字符（中文约 20~35 字）。超宽屏上不限宽的正文 = 阅读灾难。容器约束是"为了眼睛"的工程决策。',
        principle:'P13 Composition Controls Attention' },
      { q:'Q2 · 大标题在手机与大屏之间，哪种策略成立？',
        a:{ label:'策略 A', body:'<div style="background:#000;border-radius:12px;padding:18px"><p style="margin:0;font-size:34px;font-weight:600;color:#f5f5f7">Pro 再超前</p><p style="margin:6px 0 0;font-size:10.5px;color:#6e6e73">手机上固定 34px：小屏刚好，大屏没气势</p></div>' },
        b:{ label:'策略 B', body:'<div style="background:#000;border-radius:12px;padding:18px"><p style="margin:0;font-size:clamp(26px,7vw,44px);font-weight:600;color:#f5f5f7">Pro 再超前</p><p style="margin:6px 0 0;font-size:10.5px;color:#6e6e73">clamp 流式：小屏不挤、大屏有气势</p></div>' },
        correct:'b',
        analysis:'B 胜。固定字号必须为某一档屏幕妥协；clamp 让字号成为"视口的函数"，一处声明全屏段成立——这正是 Apple 大标语在任意窗口宽度下都保持构图感的原因（视觉观察 + 教学实现）。',
        principle:'P04 Hierarchy by Scale Jump' }
    ]},

  { type:'refcompare', title:'Reference vs My Version · 容器校准', lead:'容器加上了——现在校准"宽多少、呼吸多少"。对比 Apple 参考与当前实现的：内容宽度、左右留白、文字行宽。',
    mine:'<div style="padding:34px 0 0;background:#000;height:100%"><div style="max-width:78%;margin:0 auto;padding:0 18px"><p style="margin:0 0 4px;font-size:14px;color:#a1a1a6;font-weight:600">iPhone 18 Pro</p><p style="margin:0 0 10px;font-size:34px;font-weight:600;color:#f5f5f7;line-height:1.1">Pro 再超前</p><p style="margin:0 0 14px;font-size:12px;color:#86868b">现仅可在线购买 · RMB 9999 起</p><span style="display:inline-block;background:#0071e3;color:#fff;font-size:12px;font-weight:600;padding:6px 16px;border-radius:99px">购买</span></div><img src="assets/images/hero/product-studio.png" alt="教学实现" style="display:block;width:100%;margin-top:14px"></div>',
    notes:[
      '内容宽度：Apple 的文字块明显更窄、更靠左下——容器宽度只是上限，构图还需要 Stage 8 的布局配合',
      '呼吸密度：Apple 的上下留白远大于本实现——这是 Stage 2 学过的 160px 级间距哲学',
      '行宽：参考图的说明文字每行更短——对比你实现的行宽，感受"可读性区间"'
    ]},

  { type:'challenge', title:'Coding Challenge · 给 Hero 装上容器系统',
    task:'给 Stage 4 的 Hero 建立容器系统：① 全局 box-sizing:border-box；② .container { max-width:980px; margin-inline:auto; padding-inline:22px } 包住 hero 内容与图片；③ h2 字号改为 clamp(40px, 8vw, 80px)。判分读取真实 DOM 的计算样式。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  /* TODO 1: 全局 box-sizing: border-box */\n\n  body { background-color: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; margin: 0; padding: 70px 0; }\n  h1 { font-size: 30px; font-weight: 600; margin: 0 0 8px; }\n  h2 { font-size: 80px; font-weight: 600; line-height: 1.1; margin: 0 0 18px; }\n  .desc { font-size: 16px; line-height: 1.6; color: #86868b; margin: 0 0 6px; }\n  .price { font-size: 13px; color: #86868b; margin: 0 0 20px; }\n  .cta-buy { display: inline-block; background-color: #0071e3; color: #fff; font-size: 16px; text-decoration: none; padding: 11px 24px; border-radius: 99px; margin-right: 18px; }\n  .cta-more { color: #2997ff; font-size: 16px; text-decoration: none; }\n  .hero-visual { margin-top: 40px; }\n  .hero-visual img { display: block; max-width: 100%; height: auto; }\n</style>\n</head>\n<body>\n  <main>\n    <!-- TODO 2: 加一层 .container 容器，包住全部 hero 内容 -->\n    <section class="hero">\n      <h1>iPhone 18 Pro</h1>\n      <h2>Pro 再超前</h2>\n      <p class="desc">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。</p>\n      <p class="price">RMB 9999 起 · RMB 417/月 (24 期) 起</p>\n      <a class="cta-buy" href="/buy/">购买</a>\n      <a class="cta-more" href="#design">进一步了解 ›</a>\n      <div class="hero-visual">\n        <picture>\n          <source media="(max-width: 734px)" srcset="assets/images/hero/product-mobile.png">\n          <img src="assets/images/hero/product-desktop.png" alt="酒红色 iPhone 18 Pro 正面产品视图，深色背景" width="1200" height="675">\n        </picture>\n      </div>\n    </section>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'全局 box-sizing: border-box', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && /box-sizing\\s*:\\s*border-box/.test(st.textContent); })()' },
      { label:'存在 max-width:980px 的容器', js:'(function(){ if(!doc) return false; var els = [].slice.call(doc.querySelectorAll("body *")); return els.some(function(e){ return win.getComputedStyle(e).maxWidth === "980px"; }); })()' },
      { label:'容器水平居中（几何判定：有剩余空间时中心对齐）', js:'(function(){ if(!doc) return false; var els = [].slice.call(doc.querySelectorAll("body *")); var c = els.filter(function(e){ return win.getComputedStyle(e).maxWidth === "980px"; })[0]; if(!c) return false; var pr = c.parentElement.getBoundingClientRect(); var r = c.getBoundingClientRect(); var slack = pr.width - r.width; if (slack < 40) return true; var cc = r.left + r.width / 2; var pc = pr.left + pr.width / 2; return Math.abs(cc - pc) <= 3; })()' },
      { label:'容器有内边距（padding-inline ≥ 16px）', js:'(function(){ if(!doc) return false; var els = [].slice.call(doc.querySelectorAll("body *")); var c = els.filter(function(e){ return win.getComputedStyle(e).maxWidth === "980px"; })[0]; if(!c) return false; var cs = win.getComputedStyle(c); return parseFloat(cs.paddingLeft) >= 16 && parseFloat(cs.paddingRight) >= 16; })()' },
      { label:'h2 使用 clamp() 流式字号', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && /clamp\\s*\\([^)]*vw[^)]*px[^)]*\\)/.test(st.textContent.replace(/\\s+/g, "")); })()' },
      { label:'clamp 生效（h2 字号在 40~80px 之间）', js:'(function(){ if(!doc) return false; var h = doc.querySelector("h2"); if (!h) return false; var v = parseFloat(win.getComputedStyle(h).fontSize); return v >= 40 && v <= 80; })()' },
      { label:'图片仍被容器约束（无横向溢出）', js:'(function(){ if(!doc || !doc.documentElement) return false; return doc.documentElement.scrollWidth <= doc.documentElement.clientWidth + 1; })()' },
      { label:'CTA 仍在（Stage 3 成果没有丢）', js:'(function(){ if(!doc) return false; return [].slice.call(doc.querySelectorAll("a[href]")).some(function(a){ return (a.textContent||"").indexOf("购买") >= 0; }); })()' }
    ],
    hints:[
      '三件套口诀：max-width 定宽、margin-inline:auto 居中、padding-inline 呼吸。容器包住 section 里的全部内容（含 hero-visual）。',
      '全局 border-box 写法：*, *::before, *::after { box-sizing: border-box; }——放在样式表第一行。',
      'clamp 的中间值用 vw：clamp(40px, 8vw, 80px)。判分会真的去量 h2 的计算字号。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  *, *::before, *::after { box-sizing: border-box; }\n  body { background-color: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; margin: 0; padding: 70px 0; }\n  .container { max-width: 980px; margin-inline: auto; padding-inline: 22px; }\n  h1 { font-size: 30px; font-weight: 600; margin: 0 0 8px; }\n  h2 { font-size: clamp(40px, 8vw, 80px); font-weight: 600; line-height: 1.1; margin: 0 0 18px; }\n  .desc { font-size: 16px; line-height: 1.6; color: #86868b; margin: 0 0 6px; }\n  .price { font-size: 13px; color: #86868b; margin: 0 0 20px; }\n  .cta-buy { display: inline-block; background-color: #0071e3; color: #fff; font-size: 16px; text-decoration: none; padding: 11px 24px; border-radius: 99px; margin-right: 18px; }\n  .cta-more { color: #2997ff; font-size: 16px; text-decoration: none; }\n  .hero-visual { margin-top: 40px; }\n  .hero-visual img { display: block; max-width: 100%; height: auto; }\n</style>\n</head>\n<body>\n  <main>\n    <section class="hero">\n      <div class="container">\n        <h1>iPhone 18 Pro</h1>\n        <h2>Pro 再超前</h2>\n        <p class="desc">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。</p>\n        <p class="price">RMB 9999 起 · RMB 417/月 (24 期) 起</p>\n        <a class="cta-buy" href="/buy/">购买</a>\n        <a class="cta-more" href="#design">进一步了解 ›</a>\n        <div class="hero-visual">\n          <picture>\n            <source media="(max-width: 734px)" srcset="assets/images/hero/product-mobile.png">\n            <img src="assets/images/hero/product-desktop.png" alt="酒红色 iPhone 18 Pro 正面产品视图，深色背景" width="1200" height="675">\n          </picture>\n        </div>\n      </div>\n    </section>\n  </main>\n</body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 失控的宽屏',
    story:'这个 Hero 在 390px 手机上看起来还行——但拉宽就崩：文字行长失控、内容贴边、标语死板、没有居中。把预览想象成 2560px 宽屏，修复容器系统。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { background-color: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; margin: 0; padding: 40px 0; }\n  h2 { font-size: 40px; font-weight: 600; margin: 0 0 18px; }\n  .desc { font-size: 16px; line-height: 1.6; color: #86868b; margin: 0 0 6px; }\n  .hero-visual img { display: block; max-width: 100%; height: auto; }\n</style>\n</head>\n<body>\n  <main>\n    <section class="hero">\n      <h2>Pro 再超前</h2>\n      <p class="desc">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或前往 Apple Store 零售店取货，还可享受 24 期免息分期与年年焕新计划等多重好礼。</p>\n      <div class="hero-visual">\n        <img src="assets/images/hero/product-desktop.png" alt="酒红色 iPhone 18 Pro 正面产品视图" width="1200" height="675">\n      </div>\n    </section>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'存在 max-width 约束的容器（≤1024px）', js:'(function(){ if(!doc) return false; var els = [].slice.call(doc.querySelectorAll("body *")); return els.some(function(e){ var mw = parseFloat(win.getComputedStyle(e).maxWidth); return mw > 0 && mw <= 1024; }); })()' },
      { label:'容器水平居中（auto 或相等 margin）', js:'(function(){ if(!doc) return false; var els = [].slice.call(doc.querySelectorAll("body *")); var c = els.filter(function(e){ var mw = parseFloat(win.getComputedStyle(e).maxWidth); return mw > 0 && mw <= 1024; })[0]; if(!c) return false; var cs = win.getComputedStyle(c); return cs.marginLeft === cs.marginRight; })()' },
      { label:'容器有呼吸内边距（≥16px）', js:'(function(){ if(!doc) return false; var els = [].slice.call(doc.querySelectorAll("body *")); var c = els.filter(function(e){ var mw = parseFloat(win.getComputedStyle(e).maxWidth); return mw > 0 && mw <= 1024; })[0]; if(!c) return false; var cs = win.getComputedStyle(c); return parseFloat(cs.paddingLeft) >= 16 || parseFloat(c.parentElement.getBoundingClientRect().left) >= 16; })()' },
      { label:'标语改为流式 clamp 字号', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && /clamp\\s*\\([^)]*vw[^)]*\\)/.test(st.textContent.replace(/\\s+/g, "")); })()' },
      { label:'全局 box-sizing: border-box', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && /box-sizing\\s*:\\s*border-box/.test(st.textContent); })()' },
      { label:'正文行宽被约束（desc 容器 ≤ 1024px）', js:'(function(){ if(!doc) return false; var d = doc.querySelector(".desc, p"); if (!d) return false; var e = d; while (e && e !== doc.body) { var mw = parseFloat(win.getComputedStyle(e).maxWidth); if (mw > 0) return mw <= 1024; e = e.parentElement; } return false; })()' },
      { label:'图片仍不变形且被约束', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img"); if (!i) return false; var cs = win.getComputedStyle(i); var rw = i.getBoundingClientRect().width, rh = i.getBoundingClientRect().height; var iw = i.naturalWidth || 1, ih = i.naturalHeight || 1; var ok = cs.maxWidth === "100%" && Math.abs(rh / rw - ih / iw) / (ih / iw) < 0.05; return ok; })()' }
    ],
    hints:[
      '四个症状对应四个缺失：内容贴边（无容器+padding）、行长失控（无 max-width）、贴左（无 margin auto）、标语死板（无 clamp）。',
      '容器加在哪？包住 section 的全部内容——但注意：图片要不要也被约束？看 Apple：全宽背景、受限内容。先统一约束，构图交给图片自身的负空间。',
      'clamp 中间值建议 8vw：clamp(40px, 8vw, 80px)。'
    ],
    cause:'完整病因单——<b>无容器</b>：max-width 缺失 → 宽屏行长失控（一行 40+ 字）；<b>无居中</b>：没有 margin-inline:auto → 内容贴左；<b>无 padding</b>：窄屏内容贴屏幕边；<b>固定字号</b>：40px 在大屏失去气势（本应 clamp 流动）；<b>无 box-sizing</b>：加 padding 时布局算术会走样。容器系统是"背景全宽、内容受限"的分层思想——Apple 布局的底层语法。' },

  { type:'quiz', title:'Quiz · 布局精修八连问', questions:[
      { q:'容器系统三件套是？',
        options:['float + clear + width','max-width + margin auto + padding','position + top + z-index','flex + grid + gap'], answer:1,
        explain:'定宽、居中、呼吸——三个各司其职，缺一不可。' },
      { q:'正文可读性的行宽区间大约是？',
        options:['越宽越好','中文约 20~35 字/行','必须一行一个字','固定 200px'], answer:1,
        explain:'一行太长眼睛回扫会丢行——这是容器宽度上限的生理学依据。' },
      { q:'clamp(40px, 8vw, 80px) 在 1440px 视口下是？',
        options:['115px','80px（被上限夹住）','40px','1440px'], answer:1,
        explain:'1440×8%=115 超过上限 → 夹到 80。clamp = 流动 + 管束。' },
      { q:'box-sizing: border-box 的意义是？',
        options:['让边框消失','width 包含 padding 和 border，布局算术恢复直觉','让盒子变圆','加速渲染'], answer:1,
        explain:'默认 content-box 下加 padding 会撑大盒子；border-box 让"宽度"一词恢复直觉。' },
      { q:'margin-inline:auto 居中的前提是？',
        options:['元素有背景色','元素宽度小于容器（有剩余空间）','必须配合 float','只在 flex 里生效'], answer:1,
        explain:'auto 分的是"剩余空间"——没有剩余（宽度撑满）就无空间可分。' },
      { q:'Apple 超宽屏上"背景铺满、内容受限"的分层思想靠什么实现？',
        options:['把文字写小一点','背景在 body/section 上，内容在 max-width 容器里','全部用图片','缩小浏览器'], answer:1,
        explain:'两层结构：氛围层全宽，内容层受限。Stage 2 的纯黑 body 就是氛围层。' },
      { q:'padding-inline 放在容器上的好处是？',
        options:['没有好处','统一管理呼吸空间，窄屏自动生效','让文字变色','替代 margin'], answer:1,
        explain:'一处声明，所有子内容共享呼吸——窄屏时它接手保护内容不贴边。' },
      { q:'8vw 裸用在 2560px 屏上会发生？',
        options:['什么都不会','205px 的怪物字——vw 必须被 clamp 管束','自动缩小','报错'], answer:1,
        explain:'vw 是无脑线性放大——clamp 的上下限就是它的保镖。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我能说出内容不能无限宽的原因（行宽可读性）',
      '我掌握容器三件套（max-width + margin auto + padding）',
      '我理解 clamp 的"流动但被夹住"',
      '我知道 box-sizing:border-box 为什么放第一行',
      '我理解"背景全宽、内容受限"的分层思想',
      '我在 Container Lab 找到了自己的舒适宽度区间',
      '我在 Hero Balance Lab 完成了一次自己的构图平衡',
      '我完成了 Coding Challenge（8 项计算样式检查全过）',
      '我完成了 Debug Challenge（失控宽屏全部修复）',
      '我能解释 Apple 布局为什么"巨大而不散"'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['容器系统', 'max-width 定宽 · margin auto 居中 · padding 呼吸——缺一不可'],
      ['流式排版', 'clamp(下限, vw, 上限)：字号成为视口的函数'],
      ['分层思想', '背景/氛围层全宽，内容层受限——Apple 布局底层语法'],
      ['盒模型', 'border-box 第一行：让"宽度"恢复直觉']
    ],
    next:{ stage:'stage-6', text:'Stage 6：全局导航——header / nav / ul 登场，Flexbox 第一课' } }
]},

/* ---------- Stage 6 ---------- */
{ id:'stage-6', num:6, title:'全局导航', short:'全局导航', status:'ready', minutes:'180–220 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'页面有了会呼吸的 Hero——现在给它头顶的"指挥系统"。这一关把 Flexbox 讲透第一层，并把 Apple 的 44px 全局导航复刻出来。你将第一次体会：最克制的地方，往往最考验功力。',
    items:[
      '吃透 header / nav / ul / li 四个语义标签——导航是它们的主场',
      'Flexbox 第一课：display:flex、主轴与交叉轴、justify-content、align-items、gap',
      '用 Flexbox 排出 Apple 式导航：等高、等距、克制',
      'Keyboard 复习：导航是 Tab 键的主战场',
      '完成 Coding Challenge：真实的 44px 全局导航'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 5：光杆 Hero', dark:true, blank:'（页面顶部没有导航——用户只能往下滚）' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 6：44px 全局导航登场', dark:true, blank:'header ▸ nav ▸ 12 个链接 · 44px 高 · Flex 排列 · 克制到几乎隐形' },
    caption:'导航是页面的"机场塔台"：所有人都看得见，但没人盯着它看。Apple 的全局导航只有 44px 高、12 个词——这一关训练的就是这种克制。' },

  { type:'observe', title:'Observe Apple Global Nav', img:'curriculum/reference/18pro-hero-desktop.png',
    imgCap:'盯着截图最顶部那条——所有问题都有真实依据（DevTools 实测）。',
    items:[
      { q:'导航有多高？', a:'实测 44px——约为 Hero 标语字高的二分之一。它必须"在场但不抢戏"（P01 的边界纪律）。' },
      { q:'一共几项？', a:'12 个文字项（商店/Mac/iPad/iPhone/Watch/Vision/AirPods/家居/娱乐/配件/技术支持）+ 搜索 + 购物袋。每项只有两三个字。' },
      { q:'项与项的间距是随意的吗？', a:'视觉观察：等距分布、由 Flex 布局天然保证——这正是 display:flex + justify-content 的标准场景。' },
      { q:'hover 一个导航项会怎样？', a:'视觉观察：文字透明度轻微提升（灰白 → 全白），没有背景色爆炸。反馈存在但极克制（P11）。' },
      { q:'为什么不把导航做成大大的菜单条？', a:'导航的职责是"随时可达"，不是"被欣赏"。它越安静，Hero 的聚光灯越亮（P01/P05 的系统协作）。' }
    ]},

  { type:'taglab', title:'Tag Lab · 导航四件套', lead:'header / nav / ul / li——语义分工明确：header 是"页头区域"，nav 是"导航职责"，ul/li 是"一组同类项"。缺一个，结构就哑掉一层。',
    tags:[
    { tag:'<header>', cn:'页头区域', one:'页面或区块的头部结构：通常容纳导航、标志与主标题。',
      what:'页面的"顶部区域"语义容器。它本身不导航——它是一个"这里是最重要的开场内容"的声明。',
      why:'读屏器用户可以一键跳到页头；机器知道"这是开场结构"而不是普通内容。',
      where:'body 开头（页面级 header），或任何 section/article 的开头（区块级 header）。',
      inside:'通常放 nav（导航）、logo、有时放 h1（当标题属于页头时）。',
      min:'<header>\n  <nav>…</nav>\n</header>',
      apple:'实测 Apple 页面 body 的开头就是 header 结构内的两条 nav（全局导航 + 产品子导航）。',
      hero:'你的全局导航将包在 header 里——它是页面的"第一眼结构"。',
      vs:'header vs head：本关开宗明义——head 是幕后元信息（看不见），header 是页头结构（看得见）。Stage 1 的第一大混淆，这里正式终结。',
      errs:'把页面主内容塞进 header；或者干脆用 div 当页头——结构信息归零。',
      try:'判断：Hero 的大标语属于"页头"吗？（答案方向：Hero 是 main 的第一个 section——不是 header。header 只装导航类开场结构。）' },
    { tag:'<nav>', cn:'导航职责', one:'声明"这里是一组导航链接"——读屏器据此提供"跳到导航"的能力。',
      what:'导航语义容器：内部的链接被标记为"网站导航体系"的一部分。',
      why:'读屏器用户最高频的操作就是"跳到导航/主内容"——nav 让这成为一行快捷键。',
      where:'header 内（主导航），或独立于 header（页脚导航也是 nav！）。',
      inside:'通常是 ul > li > a 的列表结构（也可以是裸 a，但列表语义更完整）。',
      min:'<nav>\n  <ul>\n    <li><a href="/mac/">Mac</a></li>\n    <li><a href="/ipad/">iPad</a></li>\n  </ul>\n</nav>',
      apple:'实测 Apple 页面有 2 个 nav 在顶部 + 页脚里还有多个 nav——"导航"是职责不是位置。',
      hero:'全局导航 + 产品子导航是两个独立的 nav——职责不同，语义就分开。',
      vs:'nav vs div 包链接：div 版读屏器听到的是"一堆链接"；nav 版听到的是"导航区"——天壤之别。',
      errs:'把页面主内容包进 nav（nav 是导航不是内容区）；一页造十几个 nav（每个都该有可辨的职责）。',
      try:'页脚那一排链接算导航吗？（算——Stage 13 你会给 footer 里的链接组加 nav。）' },
    { tag:'<ul>', cn:'无序列表', one:'一组"顺序不重要"的同类项——导航项、功能列表、标签集合。',
      what:'unordered list。导航项的顺序不影响含义（Mac 不必排在 iPad 前面），所以是 ul 而不是 ol。',
      why:'列表语义让读屏器播报"列表，共 12 项"——用户一听就知道规模。',
      where:'nav 内（导航项）、内容区（功能列表）。',
      inside:'只能直接包含 li（以及 script/template）。',
      min:'<ul class="nav-list">\n  <li>…</li>\n</ul>',
      apple:'实测 Apple 全局导航的 12 项就是 ul>li 结构（DevTools 可验证）。',
      hero:'你的导航 ul 将装 12 个 li——语义与视觉完全分离：ul 负责结构，CSS 负责横排。',
      vs:'ul vs ol：顺序有意义（步骤、排名）用 ol；无意义（导航、标签）用 ul。ul vs div：ul 自带"一组同类项"语义。',
      errs:'用一串 div 平铺导航项（规模信息丢失）；往 ul 里塞非 li 元素（结构违法）。',
      try:'Stage 10 的"先刷重点"四张卡有顺序吗？（没有——所以将来用 ul/ol 都行，但导航一定是 ul。）' },
    { tag:'<li>', cn:'列表项', one:'ul/ol 的孩子：一个列表成员。导航里它就是"一个入口"。',
      what:'list item。本身无语义花样，价值在于"我是这个列表的第 N 项"。',
      why:'li 包住 a（而不是 a 直接裸奔）让结构多一层"项"的单位——样式与状态都挂在它上面。',
      where:'ul 或 ol 内部。',
      inside:'任意流内容，但导航里通常就是 a。',
      min:'<li><a href="/iphone/">iPhone</a></li>',
      apple:'实测 Apple 导航每个 li 里一个 a，a 上是文字 + hover 状态。',
      hero:'li 是导航的"车厢"：Flex 空间分配将来可以给 li，hover 热区也归它。',
      vs:'li vs a：li 是"列表成员"结构；a 是"可去别处"的动作。缺一不可，别合并。',
      errs:'把 a 直接丢进 ul（跳过 li——HTML 不合法）；li 里塞 div 当链接（Stage 3 的老朋友：可点击 div）。',
      try:'导航项的 hover 效果应该加在 li 还是 a 上？（建议 a——热区就是链接本体。）' }
    ]},

  { type:'csslab', title:'CSS Lab · Flexbox 第一课', lead:'Flex 是"一维布局系统"：一行或一列，如何分配空间与对齐。先建立轴的概念，再逐个属性上手。',
    props:[
    { name:'display: flex', cn:'启用弹性布局',
      what:'让直接子元素成为 flex item，沿主轴排列——一维布局的开关。',
      def:'block（块级堆叠）。',
      min:'ul.nav-list {\n  display: flex;\n}',
      apple:'实测 Apple 导航的 ul 就是 flex——12 项才能等高一排开。',
      gone:'列表项竖着堆——那是列表的文档流默认。',
      exp:'下方 Flex Playground 里切换布局对比。',
      try:'说出 flex 的两个孩子：flex container（设 display 的父级）和 flex item（直接子元素）。' },
    { name:'justify-content', cn:'主轴对齐',
      what:'item 在主轴上如何分配：start / center / end / space-between / space-around…',
      def:'flex-start（挤在起点）。',
      min:'.nav-list {\n  display: flex;\n  justify-content: space-between;\n}',
      apple:'视觉观察：Apple 导航 12 项均匀分布——space-between 的教科书场景。',
      gone:'12 项挤成一团在左边，右边大片空白。',
      exp:'Flex Playground 逐个切换五种值。',
      try:'space-between 和 space-around 的差别？（around 给两端也留半份空隙。）' },
    { name:'align-items', cn:'交叉轴对齐',
      what:'item 在交叉轴（默认垂直）上如何对齐：stretch / start / center / end。',
      def:'stretch（拉伸填满交叉轴）。',
      min:'.nav-list {\n  display: flex;\n  align-items: center;\n}',
      apple:'实测导航文字垂直居中于 44px——align-items:center 一行搞定。',
      gone:'不同高度的 item 顶对齐或拉伸变形。',
      exp:'Playground 里给某个 item 加高度，切 align 看变化。',
      try:'记住口诀：justify 管主轴，align 管交叉轴——别搞反。' },
    { name:'gap', cn:'项间距',
      what:'flex/grid item 之间的固定间距——比 margin 方案干净得多（不会首尾多出空隙）。',
      def:'0。',
      min:'.nav-list {\n  display: flex;\n  gap: 24px;\n}',
      apple:'视觉观察：导航项间距均匀一致——gap 是唯一不产生"尾部多余空隙"的方案。',
      gone:'用 margin 排导航：最后一项右边多出一个 margin，两端对齐永远差一点。',
      exp:'Playground 拖 gap 滑杆。',
      try:'为什么 gap 优于 margin 排版？（语义上"间距"属于容器布局，不属于某个 item 的私事。）' },
    { name:'flex-direction', cn:'方向',
      what:'主轴方向：row（默认横） / column（竖）。justify/align 跟着主轴定义走。',
      def:'row。',
      min:'.nav-list {\n  display: flex;\n  flex-direction: column;\n}',
      apple:'Apple 移动端菜单（视觉观察）就是 column 版导航——同一组 DOM，方向一换。',
      gone:'——换方向后 justify/align 的含义跟着主轴转，理解错了就全乱。',
      exp:'Playground 切 row/column，观察 justify 的作用方向跟着转。',
      try:'column 布局里想"垂直居中"，该调 justify 还是 align？（justify——它变成了主轴。）' },
    { name:'height', cn:'【复习】高度',
      what:'给导航一个精确高度——44px 不是天生的，是设计出来的。',
      def:'auto（由内容撑开）。',
      min:'.global-nav {\n  height: 44px;\n}',
      apple:'实测 44px——所有 item 垂直居中于这条基准线。',
      gone:'导航高度随内容浮动——页面加载时抖一下。',
      exp:'Flex Playground 的导航预览自带 44px。',
      try:'给导航定高 + align-items:center = 垂直居中的最稳组合。' }
    ]},

  { type:'flexplay', title:'Flexbox Playground · 轴与空间', lead:'五个盒子 + 一个迷你导航预览。先切方向建立"轴"的直觉，再逐个调 justify / align / gap——每一下都实时反映在两个预览里。' },

  { type:'domviz', title:'Navigation Anatomy · 导航解剖', lead:'点击树节点或导航条上的元素，建立"语义层 ↔ 视觉层"的对应。',
    tree:[
      { id:'hd', label:'header', children:[
        { id:'nv', label:'nav', children:[
          { id:'ls', label:'ul.nav-list', children:[
            { id:'it', label:'li × 12', children:[ { id:'lk', label:'a × 12' } ] }
          ]}
        ]}
      ]}
    ],
    notes:{
      'hd':'header：页头区域。背景 #161617 级深灰、44px 高——它是容器也是氛围层。',
      'nv':'nav：导航职责声明。读屏器"跳到导航"就跳到这里。',
      'ls':'ul：12 项同类项的容器。display:flex 在它身上——所有 item 才能横排。',
      'it':'li：单项车厢。Flex 的 item 是 ul 的直接子元素（li），间距归 gap 管。',
      'lk':'a：可去别处的链接（Stage 3 判断过：导航是导航）。hover/focus 都在它身上。'
    },
    visual:'<div class="navmock" data-r="hd"><span class="nm-tag">header · 44px · #161617</span>'
      + '<div class="navmock-nav" data-r="nv"><span class="nm-tag2">nav</span>'
      + '<ul class="navmock-list" data-r="ls"><span class="nm-tag2">ul · flex · gap</span>'
      + '<li class="navmock-li" data-r="it"><a class="navmock-a" data-r="lk">Apple</a></li>'
      + '<li class="navmock-li"><a class="navmock-a">商店</a></li>'
      + '<li class="navmock-li"><a class="navmock-a">Mac</a></li>'
      + '<li class="navmock-li"><a class="navmock-a">iPhone</a></li>'
      + '<li class="navmock-li"><a class="navmock-a">…共 12 项</a></li>'
      + '</ul></div></div>' },

  { type:'kbdtest', title:'Keyboard Test · 导航是 Tab 的主场', lead:'导航是键盘用户最高频的路。在迷你导航里：点击内部 → Tab 走完 6 个链接 → Shift+Tab 反向 → 观察每个链接的 focus-visible 环（P12 复习）。',
    iframeDoc:'<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><style>body{margin:0;background:#161617;font-family:-apple-system,"PingFang SC",sans-serif}p.tip{color:#86868b;font-size:12px;margin:0;padding:12px 16px 10px}ul{list-style:none;margin:0;padding:0 16px 12px;display:flex;gap:22px;align-items:center}a{color:rgba(255,255,255,.8);font-size:12px;text-decoration:none;transition:color .2s}a:hover{color:#fff}a:focus-visible{outline:2px solid #2997ff;outline-offset:4px;border-radius:3px}</style></head><body><p class="tip">先点这里，再按 Tab 沿导航走一圈。</p><ul><li><a href="#a">Apple</a></li><li><a href="#b">商店</a></li><li><a href="#c">Mac</a></li><li><a href="#d">iPad</a></li><li><a href="#e">iPhone</a></li><li><a href="#f">技术支持</a></li></ul></body></html>',
    checks:[
      'Tab 按 DOM 顺序逐个走过 6 个链接',
      '每个链接的 focus-visible 环清晰可见',
      'hover 时文字从 80% 白变全白（鼠标试试）',
      'Shift+Tab 反向可走'
    ],
    limits:'iframe 需先点击内部获得键盘焦点；真实页面 Tab 从地址栏开始。行为全部为浏览器原生。' },

  { type:'challenge', title:'Coding Challenge · 复刻 44px 全局导航',
    task:'构建 Apple 式全局导航：① header > nav > ul > li > a 结构，8 个链接；② ul 为 flex：justify-content:space-between（或等距 gap）、align-items:center；③ 导航高度 44px、深色背景 #161617；④ a 的 hover：颜色从 80% 白变全白；⑤ 保留 focus-visible（不许 outline:none）。判分读取真实 DOM。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  /* TODO 1: .global-nav——header 容器：44px 高、背景 #161617 */\n\n  /* TODO 2: .nav-list——display:flex + justify-content:space-between + align-items:center */\n\n  /* TODO 3: 链接 hover 反馈（80% 白 → 全白）与 focus-visible */\n\n  body { margin: 0; background: #000; }\n</style>\n</head>\n<body>\n  <!-- TODO 4: header > nav > ul > li > a × 8 -->\n\n</body>\n</html>',
    checks:[
      { label:'header > nav > ul > li > a 结构完整', js:'doc && doc.querySelector("header nav ul li a")' },
      { label:'至少 8 个导航链接', js:'doc && doc.querySelectorAll("header nav ul li a").length >= 8' },
      { label:'ul 为 flex 布局', js:'(function(){ if(!doc) return false; var ul = doc.querySelector("header nav ul"); return !!ul && win.getComputedStyle(ul).display === "flex"; })()' },
      { label:'主轴 space-between 或等距 gap', js:'(function(){ if(!doc) return false; var ul = doc.querySelector("header nav ul"); var cs = win.getComputedStyle(ul); return cs.justifyContent === "space-between" || parseFloat(cs.columnGap || cs.gap) > 0; })()' },
      { label:'垂直居中（align-items: center）', js:'(function(){ if(!doc) return false; var ul = doc.querySelector("header nav ul"); return win.getComputedStyle(ul).alignItems === "center"; })()' },
      { label:'导航高度 44px（±6px 容差）', js:'(function(){ if(!doc) return false; var h = doc.querySelector("header") || doc.querySelector("nav"); var v = h.getBoundingClientRect().height; return v >= 38 && v <= 50; })()' },
      { label:'有 hover 反馈（:hover 规则存在）', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && st.textContent.indexOf(":hover") >= 0; })()' },
      { label:'focus 没有被删除', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && !/outline\\s*:\\s*(none|0)\\b/i.test(st.textContent); })()' }
    ],
    hints:[
      '结构四层嵌套：header 里 nav，nav 里 ul，ul 里 8 个 li，每个 li 里一个 a。',
      '布局三行：display:flex; justify-content:space-between; align-items:center; 高度加在 header 上，链接颜色加在 a 上。',
      'hover 用 color 过渡：a { color: rgba(255,255,255,.8); transition: color .2s } a:hover { color:#fff }。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; background: #000; }\n  .global-nav { height: 44px; background: #161617; }\n  .nav-list {\n    list-style: none;\n    margin: 0;\n    padding: 0 22px;\n    height: 100%;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .nav-list a {\n    color: rgba(255,255,255,.8);\n    font-size: 12px;\n    text-decoration: none;\n    transition: color .2s;\n  }\n  .nav-list a:hover { color: #fff; }\n  .nav-list a:focus-visible { outline: 2px solid #2997ff; outline-offset: 4px; border-radius: 3px; }\n</style>\n</head>\n<body>\n  <header class="global-nav">\n    <nav>\n      <ul class="nav-list">\n        <li><a href="#">Apple</a></li>\n        <li><a href="#">商店</a></li>\n        <li><a href="#">Mac</a></li>\n        <li><a href="#">iPad</a></li>\n        <li><a href="#">iPhone</a></li>\n        <li><a href="#">Watch</a></li>\n        <li><a href="#">AirPods</a></li>\n        <li><a href="#">技术支持</a></li>\n      </ul>\n    </nav>\n  </header>\n</body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 一条散装的导航',
    story:'这条导航"能看"但全是病：div 平铺（无语义）、inline-block + margin 手挤排版（间距不均）、高度随内容浮、hover 没反馈、focus 被删。Run → 修复 → 检查。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; }\n  .nav { background: #161617; padding: 10px 8px; outline: none; }\n  .item { display: inline-block; margin-right: 13px; color: rgba(255,255,255,.8); font-size: 14px; text-decoration: none; }\n  .item.last { margin-right: 0; }\n</style>\n</head>\n<body>\n  <div class="nav">\n    <a class="item" href="#">Apple</a>\n    <a class="item" href="#">商店</a>\n    <a class="item" href="#">Mac</a>\n    <a class="item" href="#">iPad</a>\n    <a class="item" href="#">iPhone</a>\n    <a class="item" href="#">Watch</a>\n    <a class="item last" href="#">技术支持</a>\n  </div>\n</body>\n</html>',
    checks:[
      { label:'语义结构 header > nav > ul > li > a', js:'doc && doc.querySelector("header nav ul li a")' },
      { label:'导航为 flex 布局', js:'(function(){ if(!doc) return false; var ul = doc.querySelector("nav ul"); return !!ul && win.getComputedStyle(ul).display === "flex"; })()' },
      { label:'用 gap 或 space-between 管间距（不再靠 margin 手挤）', js:'(function(){ if(!doc) return false; var ul = doc.querySelector("nav ul"); var cs = win.getComputedStyle(ul); return cs.justifyContent === "space-between" || parseFloat(cs.columnGap || cs.gap) > 0; })()' },
      { label:'导航高度收敛到 44px ±6px', js:'(function(){ if(!doc) return false; var h = doc.querySelector("header") || doc.querySelector("nav"); var v = h.getBoundingClientRect().height; return v >= 38 && v <= 50; })()' },
      { label:'链接数量保留（≥7）', js:'doc && doc.querySelectorAll("nav a").length >= 7' },
      { label:'focus 恢复（无 outline:none）', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && !/outline\\s*:\\s*(none|0)\\b/i.test(st.textContent); })()' },
      { label:'hover 反馈存在', js:'(function(){ if(!doc) return false; var st = doc.querySelector("style"); return !!st && st.textContent.indexOf(":hover") >= 0; })()' }
    ],
    hints:[
      '先把 div.nav 换成 header > nav > ul > li > a——结构不改，后面全是白干。',
      '间距三选一：justify-content:space-between（两端对齐）或 gap:22px（等距）。margin 手挤方案必然首尾不齐。',
      '高度 44px 加在 header 上，align-items:center 让链接垂直居中；删掉 outline:none。'
    ],
    cause:'完整病因单——<b>语义</b>：① div 平铺导航（无 header/nav/ul/li，读屏器的规模与职责感知全失）；<b>布局</b>：② inline-block + margin 手挤（间距不均、首尾不齐）；③ 高度随内容浮动（加载抖动）；<b>交互</b>：④ 无 hover 反馈；<b>无障碍</b>：⑤ outline:none（Stage 3 的老病灶）。Flex + gap + 44px 定高 = 导航的"工程三件套"。' },

  { type:'design', title:'Design Challenge · 导航的克制', lead:'导航设计的一切都关于"不抢戏"。两个真实渲染的取舍。',
    questions:[
      { q:'Q1 · 哪条导航的"存在感"是对的？',
        a:{ label:'版本 A', body:'<div style="background:#000;border-radius:10px;overflow:hidden"><div style="height:72px;background:#26262b;display:flex;align-items:center;gap:20px;padding:0 16px"><span style="color:#fff;font-size:14px;font-weight:700">APPLE</span><span style="color:#2997ff;font-size:14px">商店</span><span style="color:#fff;font-size:14px">Mac</span><span style="color:#fff;font-size:14px">iPhone</span></div></div>' },
        b:{ label:'版本 B', body:'<div style="background:#000;border-radius:10px;overflow:hidden"><div style="height:44px;background:#161617;display:flex;align-items:center;justify-content:space-between;padding:0 16px"><span style="color:rgba(255,255,255,.8);font-size:12px">Apple</span><span style="color:rgba(255,255,255,.8);font-size:12px">商店</span><span style="color:rgba(255,255,255,.8);font-size:12px">Mac</span><span style="color:rgba(255,255,255,.8);font-size:12px">iPhone</span></div></div>' },
        correct:'b',
        analysis:'B 胜。72px 大字 + 高亮品牌色 = 导航在跟 Hero 抢第一印象；44px + 80% 白 = "随时可达但绝不抢戏"。导航的克制是对页面焦点的尊重（P01）。',
        principle:'P01 One Clear Visual Focus' },
      { q:'Q2 · hover 反馈哪个更 Apple？',
        a:{ label:'Hover A', body:'<div style="background:#161617;border-radius:10px;padding:14px;display:flex;gap:16px;align-items:center"><span class="dq-btn" style="background:#0071e3;color:#fff;font-size:12px;padding:6px 14px">Mac</span><span style="color:#86868b;font-size:12px">（hover：蓝色按钮弹出）</span></div>' },
        b:{ label:'Hover B', body:'<div style="background:#161617;border-radius:10px;padding:14px;display:flex;gap:16px;align-items:center"><span class="dq-hover-soft" style="color:#fff;font-size:12px;cursor:pointer">Mac</span><span style="color:#86868b;font-size:12px">（hover：80% 白 → 全白）</span></div>' },
        correct:'b',
        analysis:'B 胜。导航项的 hover 只需确认"可点"——透明度微变足矣（P11）。给每个导航项上按钮底色，等于在机场塔台里开演唱会。',
        principle:'P11 Interaction Feedback Confirms Intent' }
    ]},

  { type:'quiz', title:'Quiz · 导航与 Flex 八连问', questions:[
      { q:'header 和 head 的关系是？',
        options:['同一个东西的两种写法','head 是幕后元信息，header 是看得见的页头结构','header 包含 head','没有关系但可以互换'], answer:1,
        explain:'Stage 1 的第一大混淆在这里正式终结：head 看不见，header 看得见。' },
      { q:'导航链接组的标准语义结构是？',
        options:['div > a × N','nav > ul > li > a × N','p > a × N','header > a × N'], answer:1,
        explain:'nav 声明职责，ul/li 声明"一组同类项"的规模。' },
      { q:'display:flex 后，justify-content 管的是？',
        options:['交叉轴','主轴','垂直方向永远是','z 轴'], answer:1,
        explain:'justify 管主轴（默认水平），align 管交叉轴——flex-direction 一换它们也跟着换。' },
      { q:'12 个导航项均匀分布，用？',
        options:['margin 手挤','justify-content:space-between 或等距 gap','text-align:center','float:left'], answer:1,
        explain:'space-between 天然两端对齐；gap 天然等距——都不需要手挤。' },
      { q:'gap 相比 margin 排版的优势是？',
        options:['没有优势','首尾不会多出空隙，间距属于容器布局','兼容性更好','能自动换行'], answer:1,
        explain:'margin 方案最后一项右侧必多一段——gap 从语义上把间距还给容器。' },
      { q:'44px 导航高度里让文字垂直居中，最稳组合是？',
        options:['padding-top 手调','height:44px + align-items:center','line-height 碰运气','绝对定位'], answer:1,
        explain:'定高 + align-items:center——不依赖字号，改字号也不歪。' },
      { q:'导航 hover 反馈的正确剂量是？',
        options:['弹出蓝色按钮','透明度轻微变化（80% 白 → 全白）','放大 1.5 倍','旋转'], answer:1,
        explain:'反馈确认意图即可（P11）——导航越安静，Hero 越亮。' },
      { q:'Apple 导航为什么只有 44px 高？',
        options:['省电','导航的职责是"随时可达"而不是"被欣赏"——克制是对页面焦点的尊重','屏幕太小','历史惯例不可改'], answer:1,
        explain:'塔台不该比飞机吵。P01 的边界纪律：每个区域有它的音量上限。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我会用 header > nav > ul > li > a 搭出语义完整的导航',
      '我理解 flex 的主轴/交叉轴，能说出 justify 和 align 各管哪根',
      '我能用 space-between 或 gap 做出等距导航',
      '我知道 gap 为什么优于 margin 排版',
      '我能复刻 44px 定高 + 垂直居中的导航',
      '我理解导航的"克制"是设计决策而非偷懒',
      '我在 Keyboard Test 里走完了导航的 Tab 链路',
      '我完成了 Coding Challenge（8 项真实 DOM 检查全过）',
      '我完成了 Debug Challenge（散装导航全部修复）',
      '我完成了 Design Challenge（存在感与 hover 剂量）'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['语义', 'header 区域 · nav 职责 · ul/li 规模——三层缺一不可'],
      ['Flex 第一课', '主轴/交叉轴 · justify/align · gap——一维布局的地基'],
      ['工程三件套', '44px 定高 + align center + space-between/gap'],
      ['设计', '导航的克制 = 对页面焦点的尊重（P01/P11 在导航上的落地）']
    ],
    next:{ stage:'stage-7', text:'Stage 7：产品子导航——position / sticky，滚动时的锚' } }
]},

/* ---------- Stage 7 ---------- */
{ id:'stage-7', num:7, title:'产品子导航 + Sticky', short:'子导航 Sticky', status:'ready', minutes:'160–200 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'用户滚到第三屏时早就忘了自己在哪个产品页——Apple 的答案是一条"跟着你走的子导航"。这一关学 position 家族（static / relative / absolute / sticky）、top、z-index 与层叠上下文，并把产品子导航做出来。',
    items:[
      '掌握 position 四兄弟：static / relative / absolute / sticky 各自的职责',
      'sticky 的三个要素：position:sticky + top 值 + 一个"不被 overflow 破坏"的父级',
      'z-index 与层叠上下文第一课：为什么 z-index:9999 有时会失灵',
      '设计判断：为什么需要第二层导航？sticky 和 fixed 差在哪？',
      '完成 Coding Challenge：滚动吸顶的产品子导航'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 6：滚下去就找不到"购买"', dark:true, blank:'（滚过 Hero 后：产品名和购买入口全部消失）' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 7：子导航滚动吸顶', dark:true, blank:'iPhone 18 Pro ｜ 探索 ▾ ｜ 购买 ← 44px 子导航，滚动时钉在顶部' },
    caption:'子导航是"上下文救生索"：无论滚多深，用户都知道自己在看什么、能立刻买。它只在滚动时有意义——这就是 position:sticky 的舞台。' },

  { type:'observe', title:'Observe Apple Subnav', img:'curriculum/reference/18pro-hero-desktop.png',
    imgCap:'首屏截图里子导航还"藏"在全局导航下面（iPhone 18 Pro ｜ 探索 ▾ ｜ 购买）。它的真本事要滚动后才出现——以下前两条来自 Stage 0 的 DevTools 实测。',
    items:[
      { q:'子导航长什么样？', a:'实测：左侧产品名"iPhone 18 Pro"，右侧「探索 ▾」下拉和蓝色「购买」胶囊。桌面高度实测 72px（高于全局导航的 44px）——两层塔台各有各的职责高度。课程教学取 44px 是简化，统一即可。' },
      { q:'它什么时候出现？', a:'实测 + 视觉观察：滚过 Hero 后吸顶驻留。滚动前它只是普通的一行。' },
      { q:'它和全局导航的层级关系？', a:'视觉观察：吸顶时覆盖在内容之上——z-index 的舞台。全局导航与子导航各自有明确的层位。' },
      { q:'为什么不直接用 fixed？', a:'教学判断：fixed 从一开始就钉死在视口上、会遮住 Hero 开场；sticky 是"自然滚到位后再驻留"——体验的关键差别。' },
      { q:'为什么用户需要它？', a:'设计判断：滚动 3 屏后"我在哪、我能买吗"两个问题必须随时有答案——这是转化路径（看→懂→买）的保障。' }
    ]},

  { type:'csslab', title:'CSS Lab · position 家族', lead:'position 决定"元素相对谁定位"。四个值四种世界观——sticky 是本关主角。',
    props:[
    { name:'position: static', cn:'默认（不定位）',
      what:'所有元素的默认值：正常文档流，top/left/z-index 对它通通无效。',
      def:'static。',
      min:'.nav { position: static; } /* 默认值，写不写一样 */',
      apple:'Apple 页面绝大多数元素都是 static——定位是特殊手段，不是默认姿势。',
      gone:'——它是"什么都没发生"的基准线。',
      exp:'Position Lab 里以它为对照。',
      try:'口头禅：先问"它在文档流里吗"——回答了这个问题，position 的选择就完成了一半。' },
    { name:'position: relative', cn:'相对定位',
      what:'元素仍在文档流里占位，但可以用 top/left 偏移"画在别处"；同时成为 absolute 子元素的定位参考。',
      def:'static。',
      min:'.badge-anchor {\n  position: relative;\n}',
      apple:'Apple 的角标、悬浮提示都以 relative 父级为锚——relative 是 absolute 的"地基"。',
      gone:'absolute 子元素会跑去最近的其他定位祖先——布局瞬间错乱。',
      exp:'Position Lab 里拖偏移滑杆，观察"占位不变、画面偏移"。',
      try:'relative 的两个身份：① 自己可偏移；② 给 absolute 子元素当锚。' },
    { name:'position: sticky', cn:'本关主角',
      what:'正常滚动，但碰到 top 阈值时"钉住"——直到滚出它的父容器。',
      def:'static。',
      min:'.subnav {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}',
      apple:'实测：Apple 产品子导航滚动吸顶——sticky 的标准应用（具体实现细节属于 Apple 内部，我们采用教学简化版）。',
      gone:'三个常见死法：忘写 top（永不吸附）；父容器 overflow:hidden/auto（吸附范围被毁）；父容器太矮（钉一下就跟着走了）。',
      exp:'Sticky Scroll Lab 亲手滚动体验 + 制造一次失效。',
      try:'背下 sticky 三要素：position:sticky、top:0、父容器干净且足够高。' },
    { name:'position: absolute', cn:'绝对定位',
      what:'脱离文档流，钉在最近的定位祖先（relative/absolute/sticky/fixed）的指定位置。',
      def:'static。',
      min:'.subnav .badge {\n  position: absolute;\n  top: -6px;\n  right: -6px;\n}',
      apple:'Apple 的角标、悬浮层、图片上的文字都靠 absolute + relative 父级组合。',
      gone:'没有定位祖先时会一路找到 body——元素"飞"到意想不到的地方。',
      exp:'Position Lab 把徽章钉到角落。',
      try:'absolute 找锚的口诀：往上找第一个"非 static"的祖先；找不到就 anchor 到 body。' },
    { name:'z-index', cn:'层叠顺序',
      what:'定位元素（非 static）的上下顺序。数字大在上。但 z-index 只在同一个"层叠上下文"里比较。',
      def:'auto。',
      min:'.subnav {\n  z-index: 100;\n}',
      apple:'吸顶子导航必须压过普通内容——z-index 给它层位（Apple 的具体层级值属于内部实现，教学取合理值）。',
      gone:'子导航被图片盖住一半——层位失守。',
      exp:'Z-index Visualizer 拖三个滑杆。',
      try:'为什么 z-index:9999 有时压不过 z-index:1？（父级创建了层叠上下文——你在小世界里称王，出不了门。）' }
    ]},

  { type:'positionlab', title:'Position Lab · relative 与 absolute', lead:'一个带徽章的卡片。先拖 relative 偏移感受"占位不变、画面偏移"，再把徽章切成 absolute 钉到角落——观察两种定位的世界观差别。' },

  { type:'stickyscroll', title:'Sticky Scroll Lab · 吸顶的滋味', lead:'在可滚动的迷你页面里，体验子导航的吸附；然后一键"制造失效"——亲眼看到 overflow 如何杀死 sticky。sticky 三要素，少一个都不行。' },

  { type:'zindexviz', title:'Z-Index Visualizer · 谁在上面', lead:'三层卡片三个滑杆。把子导航拉到最上，再体验"层叠上下文"：把某层的 z-index 拉满，它的孩子也出不了那层世界。' },

  { type:'judge', title:'Semantic Judge · sticky 的世界观', lead:'三个判断场景——sticky 不是万能胶。',
    scenarios:[
      { q:'场景 1：子导航滚过 Hero 后吸顶，离开页面区域后消失。',
        options:[
          { t:'position: sticky', ok:true, why:'✓ sticky = "自然滚动到位后驻留，随父容器离开"。正是这种"有条件的钉"。' },
          { t:'position: fixed', ok:false, why:'✗ fixed 从第一像素起就钉死视口、永不离开——会遮住 Hero 开场，且关不掉。' }
        ]},
      { q:'场景 2：全屏遮罩弹窗要压住一切、随时可关。',
        options:[
          { t:'position: sticky', ok:false, why:'✗ sticky 受父容器与滚动约束，还占文档流——弹窗需要的是"与滚动无关"。' },
          { t:'position: fixed', ok:true, why:'✓ fixed 相对视口、脱离文档流——遮罩层的标准解。' }
        ]},
      { q:'场景 3：写了 position:sticky top:0，滚动时却完全不吸附。',
        options:[
          { t:'浏览器坏了，换 fixed', ok:false, why:'✗ 90% 的概率是 sticky 三要素被破坏：没写 top？父容器 overflow 非 visible？父容器太矮？' },
          { t:'检查三要素：top 值 / 父容器 overflow / 父容器高度', ok:true, why:'✓ 排查口诀。本关 Sticky Scroll Lab 有一键制造失效按钮——亲手坏过一次，终身会修。' }
        ]}
    ]},

  { type:'challenge', title:'Coding Challenge · 滚动吸顶的产品子导航',
    task:'构建产品子导航：① nav 结构：左侧产品名链接，右侧「购买」CTA（复用 Stage 3 的胶囊样式）；② position:sticky + top:0 + 合理 z-index；③ 高度 44px、深色背景；④ 判分读取计算样式（sticky/top/z-index/高度）。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; }\n  .spacer { height: 1600px; background: linear-gradient(#000, #101014); }\n  /* TODO 1: .subnav——sticky + top + z-index + 44px 高 + 深色背景 */\n\n  /* TODO 2: 内部 flex 排列：产品名靠左、购买靠右（Stage 6 的 flex） */\n\n  .subnav .buy {\n    display: inline-block;\n    background-color: #0071e3;\n    color: #fff;\n    font-size: 12px;\n    text-decoration: none;\n    padding: 6px 16px;\n    border-radius: 99px;\n  }\n</style>\n</head>\n<body>\n  <!-- TODO 3: 子导航 nav（产品名 + 购买），随后是占位长页 -->\n\n  <div class="spacer"></div>\n</body>\n</html>',
    checks:[
      { label:'子导航 position: sticky', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); return !!n && win.getComputedStyle(n).position === "sticky"; })()' },
      { label:'设置了 top: 0（±2px）', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); if(!n) return false; return Math.abs(parseFloat(win.getComputedStyle(n).top)) <= 2; })()' },
      { label:'有 z-index 层位（≥ 1）', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); if(!n) return false; return (parseInt(win.getComputedStyle(n).zIndex) || 0) >= 1; })()' },
      { label:'高度 44px ±6px', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); if(!n) return false; var v = n.getBoundingClientRect().height; return v >= 38 && v <= 50; })()' },
      { label:'内部 flex：产品名靠左、购买靠右', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); if(!n) return false; var cs = win.getComputedStyle(n); return cs.display === "flex" && (cs.justifyContent === "space-between" || parseFloat(cs.columnGap) > 0); })()' },
      { label:'「购买」CTA 仍在（Stage 3 胶囊样式）', js:'(function(){ if(!doc) return false; return [].slice.call(doc.querySelectorAll("nav a")).some(function(a){ return (a.textContent||"").indexOf("购买") >= 0; }); })()' },
      { label:'sticky 真的吸附（滚动后 nav 顶部 ≤ 视口顶 + 2px）', js:'(function(){ if(!doc) return false; var w2 = win; var n = doc.querySelector("nav"); if(!n) return false; w2.scrollTo(0, 500); return Math.round(n.getBoundingClientRect().top) <= 2; })()' }
    ],
    hints:[
      'sticky 三要素：position:sticky + top:0 + （本页没有 overflow 破坏，放心）。',
      '内部布局是 Stage 6 的复习：display:flex + justify-content:space-between + align-items:center。',
      'z-index 给个 10 就够——层位是"够用"，不是"9999 焦虑"。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; background: #000; }\n  .spacer { height: 1600px; background: linear-gradient(#000, #101014); }\n  .subnav {\n    position: sticky;\n    top: 0;\n    z-index: 10;\n    height: 44px;\n    background: rgba(22,22,23,.9);\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0 22px;\n  }\n  .subnav .name {\n    color: #f5f5f7;\n    font-size: 14px;\n    font-weight: 600;\n    text-decoration: none;\n  }\n  .subnav .buy {\n    display: inline-block;\n    background-color: #0071e3;\n    color: #fff;\n    font-size: 12px;\n    text-decoration: none;\n    padding: 6px 16px;\n    border-radius: 99px;\n  }\n</style>\n</head>\n<body>\n  <nav class="subnav">\n    <a class="name" href="#">iPhone 18 Pro</a>\n    <a class="buy" href="/buy/">购买</a>\n  </nav>\n  <div class="spacer"></div>\n</body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 失灵的吸顶',
    story:'这个子导航写了 sticky 却"纹丝不吸"。三个经典死法至少中了两个。Run → 滚动预览验证 → 修复 → 检查（判分里有一项会真的滚动页面验证吸附）。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; }\n  .page-wrap { overflow: hidden; }\n  .spacer { height: 1600px; background: linear-gradient(#000, #101014); }\n  .subnav {\n    position: sticky;\n    height: 44px;\n    background: rgba(22,22,23,.9);\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0 22px;\n    z-index: 10;\n  }\n  .subnav .name { color: #f5f5f7; font-size: 14px; text-decoration: none; }\n  .subnav .buy { background-color: #0071e3; color: #fff; font-size: 12px; text-decoration: none; padding: 6px 16px; border-radius: 99px; }\n</style>\n</head>\n<body>\n  <div class="page-wrap">\n    <nav class="subnav">\n      <a class="name" href="#">iPhone 18 Pro</a>\n      <a class="buy" href="/buy/">购买</a>\n    </nav>\n    <div class="spacer"></div>\n  </div>\n</body>\n</html>',
    checks:[
      { label:'补上了 top 值（sticky 需要阈值）', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); if(!n) return false; var t = win.getComputedStyle(n).top; return t !== "auto" && !isNaN(parseFloat(t)); })()' },
      { label:'父容器不再破坏 sticky（overflow 改回 visible）', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); if(!n) return false; var p = n.parentElement; return p === doc.body || win.getComputedStyle(p).overflow === "visible"; })()' },
      { label:'position 仍是 sticky', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); return !!n && win.getComputedStyle(n).position === "sticky"; })()' },
      { label:'z-index 仍在（≥1）', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); if(!n) return false; return (parseInt(win.getComputedStyle(n).zIndex) || 0) >= 1; })()' },
      { label:'高度 44px ±6px', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); if(!n) return false; return n.getBoundingClientRect().height >= 38 && n.getBoundingClientRect().height <= 50; })()' },
      { label:'购买 CTA 仍在', js:'(function(){ if(!doc) return false; return [].slice.call(doc.querySelectorAll("nav a")).some(function(a){ return (a.textContent||"").indexOf("购买") >= 0; }); })()' },
      { label:'sticky 真的吸附（滚动 500px 后 nav 顶部 ≤ 2px）', js:'(function(){ if(!doc) return false; var n = doc.querySelector("nav"); if(!n) return false; win.scrollTo(0, 500); return Math.round(n.getBoundingClientRect().top) <= 2; })()' }
    ],
    hints:[
      '三要素排查：① CSS 里只有 position:sticky，没有 top——阈值缺失；② .page-wrap 的 overflow:hidden 是 sticky 头号杀手；③ 这页只有这两处坑。',
      'overflow:hidden 删掉或改 visible；top:0 补上。',
      '判分最后一项会真的 scrollTo(0,500) 再量 nav 的位置——吸附是"跑出来"的，不是"看起来像"。'
    ],
    cause:'完整病因单——<b>死法一：无 top</b>：sticky 没有阈值 = 永远不触发吸附；<b>死法二：父容器 overflow:hidden</b>：sticky 的"吸附范围"被父容器裁掉——它只能在父容器内钉住，而父容器此刻就是整页……overflow 一旦裁切，行为直接崩坏；其余项（z-index/高度/CTA）都在。修复 = 补 top:0 + 父容器 overflow 放开。<b>排查口诀：三要素，少一个就装死。</b>' },

  { type:'design', title:'Design Challenge · 第二层塔台', lead:'子导航的每个决策都是"存在感"的再平衡。',
    questions:[
      { q:'Q1 · 滚动到第三屏，哪个子导航让用户"安心"？',
        a:{ label:'版本 A', body:'<div style="background:#101014;border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center"><span style="color:#f5f5f7;font-size:13px;font-weight:600">iPhone 18 Pro</span><span class="dq-btn" style="background:#0071e3;color:#fff;font-size:11px;padding:5px 14px">购买</span></div>' },
        b:{ label:'版本 B', body:'<div style="background:#101014;border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center"><span style="color:#f5f5f7;font-size:13px;font-weight:600">iPhone 18 Pro</span><span class="dq-btn" style="background:#0071e3;color:#fff;font-size:11px;padding:5px 14px">购买</span><span class="dq-btn" style="background:#2997ff;color:#fff;font-size:11px;padding:5px 14px">对比</span><span class="dq-btn" style="background:#2997ff;color:#fff;font-size:11px;padding:5px 14px">咨询</span></div>' },
        correct:'a',
        analysis:'A 胜。吸顶条是常驻 UI——每多一个按钮，就多一分对正文的挤压（P05：常驻区域更要收敛）。"对比/咨询"可以是次级链接，不必是 filled。',
        principle:'P05 One Primary Action' },
      { q:'Q2 · 吸顶背景用哪种？',
        a:{ label:'背景 A', body:'<div style="background:linear-gradient(#000,#15151a);border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;opacity:1"><span style="color:#f5f5f7;font-size:13px">iPhone 18 Pro</span><span class="dq-btn" style="background:#0071e3;color:#fff;font-size:11px;padding:5px 14px">购买</span></div>' },
        b:{ label:'背景 B', body:'<div style="background:rgba(22,22,23,.72);backdrop-filter:blur(10px);border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center"><span style="color:#f5f5f7;font-size:13px">iPhone 18 Pro</span><span class="dq-btn" style="background:#0071e3;color:#fff;font-size:11px;padding:5px 14px">购买</span></div>' },
        correct:'b',
        analysis:'B 更 Apple（视觉观察 + 教学推测）：半透明 + 毛玻璃模糊（backdrop-filter）让吸顶条"在内容之上又不切断内容"。这行 CSS 是 Stage 14 视觉审计的常客——现在先认识它。',
        principle:'P02 Dark Rhythm' }
    ]},

  { type:'quiz', title:'Quiz · Sticky 七连问', questions:[
      { q:'sticky 和 fixed 的核心差别是？',
        options:['没有差别','sticky 先正常滚动、到阈值才钉住，且随父容器离开；fixed 从一开始钉死视口','fixed 更快','sticky 不支持 top'], answer:1,
        explain:'"有条件的钉" vs "无条件钉死"——体验差别决定选型。' },
      { q:'写了 position:sticky 却不吸附，最常见的原因是？',
        options:['浏览器太新','没写 top 值，或父容器 overflow 非 visible，或父容器太矮','z-index 太大','颜色太深'], answer:1,
        explain:'三要素排查口诀——本关 Debug 亲手坏过一次。' },
      { q:'z-index 对 static 元素生效吗？',
        options:['生效','不生效——z-index 只对非 static 定位元素有意义','只对图片生效','看运气'], answer:1,
        explain:'想用 z-index，先给 position（relative/sticky/absolute/fixed）。' },
      { q:'absolute 元素找定位锚的规则是？',
        options:['永远相对 body','最近的非 static 祖先','最近的 div','随机'], answer:1,
        explain:'这就是为什么 absolute 的搭档几乎总是 relative 父级。' },
      { q:'子导航为什么值得存在？',
        options:['为了好看','滚深之后"我在哪、能买吗"必须随时有答案','Apple 有的我们都要','方便加广告'], answer:1,
        explain:'它是转化路径（看→懂→买）的常驻保障。' },
      { q:'吸顶条里放几个 filled 主按钮合适？',
        options:['越多越好','至多一个（购买），其余降级为文字链接','三个起步','不放按钮'], answer:1,
        explain:'常驻 UI 更要收敛（P05）——它每秒都在和正文抢注意力。' },
      { q:'Apple 吸顶子导航的毛玻璃效果靠什么实现（教学简化认知）？',
        options:['半透明背景图片','backdrop-filter + 半透明背景色','叠加白色','PNG 蒙版'], answer:1,
        explain:'rgba 背景 + backdrop-filter:blur——"在内容之上，又不切断内容"。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我说得出 position 四兄弟各自的职责',
      '我背得出 sticky 三要素（sticky + top + 干净且够高的父级）',
      '我亲手制造并修复了一次 sticky 失效',
      '我知道 z-index 只在层叠上下文里有意义',
      '我能判断 sticky vs fixed 的选型（弹窗用 fixed，吸顶用 sticky）',
      '我的子导航通过了"滚动验证"判分（吸附是真的）',
      '我理解子导航的设计理由（上下文 + 转化保障）',
      '我完成了 Coding Challenge（7 项全过，含真实滚动验证）',
      '我完成了 Debug Challenge（失灵吸顶修复）'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['position 家族', 'static 基准 · relative 锚+偏移 · absolute 钉角 · sticky 条件吸附'],
      ['sticky 三要素', 'position:sticky + top:0 + 父容器干净且足够高'],
      ['层叠', 'z-index 管顺序，层叠上下文是它的"世界边界"'],
      ['设计', '第二层塔台 = 上下文救生索；常驻 UI 更要收敛（P05）']
    ],
    next:{ stage:'stage-8', text:'Stage 8：图文左右 Section——figure / Flex 深化，第一个产品模块' } }
]},

/* ---------- Stage 8 ---------- */
{ id:'stage-8', num:8, title:'图文左右模块', short:'图文模块', status:'ready', minutes:'170–210 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'从这一关起，你开始复刻"真正的产品模块"。性能、摄像头、电池——Apple 页面的中段全是"左文右图 / 左图右文"的交替节奏。Flex 深化 + figure 语义，让你第一次拥有可复用的模块骨架。',
    items:[
      '掌握 figure / figcaption：给图片配上"属于图片的说明"',
      'Flex 深化：flex-direction、flex（grow/shrink/basis）、order 与响应式堆叠',
      'Layout Builder：亲手调出"文图比例 / 图片侧 / 间距 / 对齐"',
      '设计判断：交替节奏（Alternating Rhythm）为什么比单向排列更有生命',
      '完成 Coding Challenge：性能模块（左文右图）真实落地'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 7：只有 Hero', dark:true, blank:'（Hero 之后直接是空白——中段模块还没有骨架）' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 8：第一个产品模块', dark:true, blank:'section ▸ 左：h3+p ｜ 右：figure>img —— 性能模块成型' },
    caption:'这就是 Apple 页面的"细胞"：一个主题 section = 文字列 + 视觉列。学会它，你就学会了 Apple 中段 80% 的模块。' },

  { type:'observe', title:'Observe Apple 模块节奏', img:'curriculum/reference/18pro-hero-desktop.png',
    imgCap:'回看首屏截图下方的模块流（性能 / 摄像头 / 电池）——本图只到 Hero，节奏规律来自 Stage 0 解剖 + 真实页面观察。',
    items:[
      { q:'典型模块的骨架是什么？', a:'视觉观察：一个主题标题 + 一段说明 + 一张主视觉。文字列与视觉列左右分立——就是本关的模块模板。' },
      { q:'模块之间的方向有规律吗？', a:'视觉观察：图文左右交替出现（上一张图在右、下一张在左）——交替节奏打断"流水线感"，制造翻页式的阅读律动（P16）。' },
      { q:'文与图的比例是多少？', a:'视觉观察：多数模块接近对半或 4:6——图占大头但文字列有完整呼吸。绝对不是"文字挤在角落"。' },
      { q:'figure 在 Apple 页面有吗？', a:'实测：Apple 大量用 figure/figcaption 承载"图 + 图注"组合（DevTools 可验证）。图注是"图片的说明"——语义上属于图，不属于正文。' }
    ]},

  { type:'taglab', title:'Tag Lab · figure 与 figcaption', lead:'img 早已认识——这一关给它配上"官方说明书"：figure 容器与 figcaption 图注。两者的关系是"说明属于图"，语义上不可分割。',
    tags:[
    { tag:'<figure>', cn:'独立内容容器', one:'一幅"可以独立存在"的视觉内容及其说明的组合单元。',
      what:'figure 表示"自我完整、可被整体引用"的内容：图、代码块、图表……最常见的就是"图 + 图注"。',
      why:'语义上宣告"figcaption 属于这张图"——而不是一段碰巧挨着图的正文。读屏器与搜索引擎因此能正确配对。',
      where:'main 内的 section 中；任何需要"图+注"组合的位置。',
      inside:'img / video / figcaption（通常第一个或最后一个孩子）。',
      min:'<figure>\n  <img src="…/a20.png" alt="A20 Pro 芯片">\n  <figcaption>A20 Pro 芯片实测能效曲线</figcaption>\n</figure>',
      apple:'实测：Apple 模块的主视觉大量包在 figure 里（DevTools 可验证），figcaption 承担"这张图是什么"的短说明。',
      hero:'你的性能模块右列 = figure：img 是主角，figcaption 是"图注级"的小字说明。',
      vs:'figure vs div：div 包图 = 图注与正文无区分；figure 让"说明属于图"成为结构事实。figure vs img 直排：多一层语义容器，不改变 img 本身。',
      errs:'把无关正文塞进 figure（它只装"自我完整"的内容）；figure 里没有 img 也没有 figcaption（空壳语义）。',
      try:'判断：产品 Hero 的大图需要 figure 吗？（Hero 图是"页面主视觉"而非"带说明的独立内容"——可以不用；模块配图+图注才是 figure 的主场。）' },
    { tag:'<figcaption>', cn:'图注', one:'figure 的官方说明文字：读屏器与搜索引擎都认定"它在说这张图"。',
      what:'figure 的图注：必须是 figure 的第一个或最后一个孩子。',
      why:'语义配对：figcaption 永远描述它所在的 figure，而不是旁边随便什么内容。',
      where:'figure 内部首尾。',
      inside:'短文字，可含 a。',
      min:'<figcaption>A20 Pro 芯片：2 纳米制程</figcaption>',
      apple:'实测：Apple 图注多为一句短话，字号小、颜色次级灰（视觉观察）——信息在，音量很低。',
      hero:'给性能模块的芯片图配一句图注——这是你第一处"语义配对"的实践。',
      vs:'figcaption vs p：p 是正文流；figcaption 语义绑定图片。视觉可以相似，结构完全不同。',
      errs:'用 p 模拟图注（配对关系丢失）；figcaption 写成三行长文（图注的音量纪律）。',
      try:'图注和 alt 有什么分工？（alt 给"看不见图"的时刻与读屏器——描述画面；figcaption 给所有人——补充图外的信息。）' }
    ]},

  { type:'csslab', title:'CSS Lab · Flex 深化', lead:'Stage 6 学会了"一排"；这一关学"怎么分"：方向、伸缩、顺序——两栏布局的全部数学。',
    props:[
    { name:'flex-direction', cn:'【复习+深化】两栏的行与列',
      what:'两栏模块 = row（桌面）；手机上切 column 即"响应式堆叠"。',
      def:'row。',
      min:'.module-flex {\n  display: flex;\n  flex-direction: row;\n}\n@media (max-width: 734px) {\n  .module-flex { flex-direction: column; }\n}',
      apple:'视觉观察：Apple 模块在窄屏全部变单列堆叠——方向切换是最朴素的响应式。',
      gone:'手机上两栏挤成两条细缝。',
      exp:'Layout Builder 切 row/column。',
      try:'这一段媒体查询 Stage 14 才系统学——先记住"堆叠 = 方向切换"。' },
    { name:'flex', cn:'伸缩简写',
      what:'flex: <grow> <shrink> <basis> 的简写。flex:1 = 平分剩余空间；flex:0 0 auto = 按内容定宽。',
      def:'0 1 auto（不放大、可缩小、按内容）。',
      min:'.module-copy { flex: 1; }\n.module-visual { flex: 1; }',
      apple:'视觉观察：文图接近对半——两个 flex:1 的自然结果。',
      gone:'一列被内容撑爆、另一列缩成细条。',
      exp:'Layout Builder 的"比例"滑杆（改 flex 值）。',
      try:'flex:2 vs flex:1 的两列分多少？（2/3 与 1/3。）' },
    { name:'flex-basis', cn:'基准尺寸',
      what:'分配剩余空间"之前"的初始主轴尺寸。basis:0 + grow 按比例分 = 精确比例列。',
      def:'auto（按内容）。',
      min:'.module-copy {\n  flex: 1 1 0;\n}\n.module-visual {\n  flex: 1 1 0;\n}',
      apple:'精确的 4:6 模块多用 basis:0 + 不同 grow（工程推测；教学取直观方案）。',
      gone:'内容长短不同导致两列比例飘忽。',
      exp:'Layout Builder 的比例本质上就是 grow 比。',
      try:'为什么 basis:0 + grow 比固定 width 更"弹性"？（空间变化时按比例重分，不溢出。）' },
    { name:'order', cn:'视觉排序',
      what:'改变 item 的视觉顺序（不改 DOM）。默认 0，小者在前。',
      def:'0。',
      min:'.module-visual { order: -1; }\n/* 移动端让图跑到文字上方 */',
      apple:'视觉观察：交替节奏 = 相邻模块图文左右互换——order（或 DOM 顺序）是实现手段之一。',
      gone:'所有模块永远"左文右图"，页面节奏单调。',
      exp:'Layout Builder 的"图片在左"开关。',
      try:'order 改变视觉但不改变 DOM——读屏器仍按 DOM 顺序读，用它交换时要想着内容逻辑。' },
    { name:'align-items', cn:'【复习】垂直对齐',
      what:'两栏的垂直关系：start（顶对齐）/ center（居中）/ end。',
      def:'stretch。',
      min:'.module-flex {\n  display: flex;\n  align-items: center;\n}',
      apple:'视觉观察：多数模块文字列与图垂直居中——呼吸感的一部分。',
      gone:'文字顶着图的上沿，重心失衡。',
      exp:'Layout Builder 的对齐开关。',
      try:'文字很长、图很矮时，center 会让两侧都舒服——试试。' }
    ]},

  { type:'layoutlab', title:'Layout Builder · 图文模块装配台', lead:'左侧装配参数，右侧实时看一个"性能模块"。调完回答：哪个方向该放图？比例多少舒服？交替的意义是什么？' },

  { type:'design', title:'Design Challenge · 节奏与重量', lead:'模块级的设计判断：方向、节奏、重量。',
    questions:[
      { q:'Q1 · 相邻两个模块的图文方向，哪种更有"翻页感"？',
        a:{ label:'节奏 A', body:'<div style="display:grid;gap:10px"><div style="background:#101014;border-radius:10px;padding:12px;display:flex;gap:10px"><div style="flex:1;background:#1c1c22;border-radius:6px;height:44px"></div><div style="flex:1.4;background:#23232a;border-radius:6px"></div></div><div style="background:#101014;border-radius:10px;padding:12px;display:flex;gap:10px"><div style="flex:1.4;background:#23232a;border-radius:6px"></div><div style="flex:1;background:#1c1c22;border-radius:6px;height:44px"></div></div></div>' },
        b:{ label:'节奏 B', body:'<div style="display:grid;gap:10px"><div style="background:#101014;border-radius:10px;padding:12px;display:flex;gap:10px"><div style="flex:1;background:#1c1c22;border-radius:6px;height:44px"></div><div style="flex:1.4;background:#23232a;border-radius:6px"></div></div><div style="background:#101014;border-radius:10px;padding:12px;display:flex;gap:10px"><div style="flex:1;background:#1c1c22;border-radius:6px;height:44px"></div><div style="flex:1.4;background:#23232a;border-radius:6px"></div></div></div>' },
        correct:'a',
        analysis:'A 胜。图文左右交替（Alternating Rhythm）打破"流水线"，让长页产生翻页律动（P16）；B 两个模块同向，读者视觉路径一成不变，后半页开始"滑读"。',
        principle:'P16 Alternating Rhythm Creates Flow' },
      { q:'Q2 · 同一个模块，文字列宽度哪种成立？',
        a:{ label:'版本 A', body:'<div style="background:#101014;border-radius:10px;padding:14px;display:flex;gap:12px;align-items:center"><div style="flex:1"><p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#f5f5f7">2 纳米芯旗舰</p><p style="margin:0;font-size:11px;color:#86868b;line-height:1.6">A20 Pro 采用 2 纳米制程，性能与能效均创 iPhone 新高。</p></div><div style="flex:1;background:#23232a;border-radius:8px;height:74px"></div></div>' },
        b:{ label:'版本 B', body:'<div style="background:#101014;border-radius:10px;padding:14px;display:flex;gap:12px;align-items:center"><div style="flex:2.2"><p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#f5f5f7">2 纳米芯旗舰</p><p style="margin:0;font-size:11px;color:#86868b;line-height:1.6">A20 Pro 采用 2 纳米制程，性能与能效均创 iPhone 新高。</p></div><div style="flex:0.5;background:#23232a;border-radius:8px;height:74px"></div></div>' },
        correct:'a',
        analysis:'A 胜。产品模块里视觉是主角（约一半或更多），文字列保持可读行宽；B 的图被挤成小拇指——图失去力量（P13），文字行却过宽，两头不讨好。',
        principle:'P13 Composition Controls Attention' }
    ]},

  { type:'challenge', title:'Coding Challenge · 性能模块（左文右图）',
    task:'构建一个产品模块：① section > .module-flex（flex 两栏）+ figure>img+figcaption 右列；② 文字列：h3 标题 + p 说明；③ 两列 flex:1 等分、gap ≥ 24px、align-items:center；④ 图片 max-width:100% 不变形；⑤ img 带 alt 与 width/height。判分读取真实 DOM。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; padding: 60px 40px; }\n  /* TODO 1: .module-flex——flex 两栏、gap ≥ 24px、align-items:center */\n\n  h3 { font-size: 40px; font-weight: 600; margin: 0 0 12px; }\n  .module-copy p { font-size: 16px; line-height: 1.6; color: #86868b; margin: 0; }\n  /* TODO 2: figure img——max-width:100%、height:auto、display:block */\n\n  figcaption { font-size: 12px; color: #6e6e73; margin-top: 10px; }\n</style>\n</head>\n<body>\n  <main>\n    <section class="module">\n      <!-- TODO 3: .module-flex > 文字列(h3+p) + figure(img+figcaption) -->\n\n    </section>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'两栏 flex 容器存在（display:flex）', js:'(function(){ if(!doc) return false; var f = doc.querySelector("section .module-flex, section [class*=flex]"); return !!f && win.getComputedStyle(f).display === "flex"; })()' },
      { label:'两列等分（两列宽度差 < 10%）', js:'(function(){ if(!doc) return false; var f = doc.querySelector("section .module-flex, section [class*=flex]"); if(!f) return false; var kids = [].slice.call(f.children).map(function(c){ return c.getBoundingClientRect().width; }); return kids.length >= 2 && Math.abs(kids[0] - kids[1]) / Math.max(kids[0], kids[1]) < 0.1; })()' },
      { label:'列间距 ≥ 24px', js:'(function(){ if(!doc) return false; var f = doc.querySelector("section .module-flex, section [class*=flex]"); if(!f) return false; var cs = win.getComputedStyle(f); var g = parseFloat(cs.columnGap || cs.gap); if (g >= 24) return true; var kids = [].slice.call(f.children); return kids.length === 2 && kids[1].getBoundingClientRect().left - kids[0].getBoundingClientRect().right >= 24; })()' },
      { label:'垂直居中（align-items:center）', js:'(function(){ if(!doc) return false; var f = doc.querySelector("section .module-flex, section [class*=flex]"); return !!f && win.getComputedStyle(f).alignItems === "center"; })()' },
      { label:'figure > img + figcaption 结构', js:'doc && doc.querySelector("figure img") && doc.querySelector("figure figcaption")' },
      { label:'图片有 alt 且不变形（比例保持）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("figure img"); if (!i || !i.getAttribute("alt")) return false; var rw = i.getBoundingClientRect().width, rh = i.getBoundingClientRect().height; var iw = i.naturalWidth || 1, ih = i.naturalHeight || 1; return Math.abs(rh / rw - ih / iw) / (ih / iw) < 0.05; })()' },
      { label:'图片不溢出（max-width 生效）', js:'(function(){ if(!doc || !doc.documentElement) return false; return doc.documentElement.scrollWidth <= doc.documentElement.clientWidth + 1; })()' },
      { label:'标题 h3 与说明 p 在文字列', js:'doc && doc.querySelector("[class*=copy] h3, section h3") && doc.querySelector("[class*=copy] p, section .module-copy p, section p")' }
    ],
    hints:[
      '结构：section > div.module-flex > (div.module-copy > h3 + p) + figure > img + figcaption。',
      '两栏核心：.module-flex { display:flex; gap:32px; align-items:center } 两个直接子元素各 flex:1。',
      '图片三行：display:block; max-width:100%; height:auto——不变形不溢出的老三样。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; padding: 60px 40px; }\n  .module-flex { display: flex; gap: 32px; align-items: center; }\n  .module-copy { flex: 1; }\n  .module-visual { flex: 1; }\n  h3 { font-size: 40px; font-weight: 600; margin: 0 0 12px; }\n  .module-copy p { font-size: 16px; line-height: 1.6; color: #86868b; margin: 0; }\n  .module-visual img { display: block; max-width: 100%; height: auto; }\n  figcaption { font-size: 12px; color: #6e6e73; margin-top: 10px; }\n</style>\n</head>\n<body>\n  <main>\n    <section class="module">\n      <div class="module-flex">\n        <div class="module-copy">\n          <h3>2 纳米芯旗舰</h3>\n          <p>A20 Pro 采用 2 纳米制程，性能和能效均创 iPhone 新高，配合新一代 VC 均热板，持久畅玩高阶游戏。</p>\n        </div>\n        <figure class="module-visual">\n          <img src="assets/images/hero/product-studio.png" alt="A20 Pro 芯片概念图：深色棚拍背景中的 iPhone 18 Pro" width="1200" height="675">\n          <figcaption>A20 Pro 芯片：2 纳米制程，7 核图形处理器</figcaption>\n        </figure>\n      </div>\n    </section>\n  </main>\n</body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 挤成一团的模块',
    story:'这个模块想两栏，结果：全堆叠、无间距、图片爆宽、图注用了 p、还出现横向滚动。Run → 修复 → 检查。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; padding: 40px 20px; }\n  h3 { font-size: 32px; margin: 0 0 12px; }\n  p { color: #86868b; }\n</style>\n</head>\n<body>\n  <main>\n    <section class="module">\n      <div class="module-flex">\n        <div class="module-copy">\n          <h3>2 纳米芯旗舰</h3>\n          <p>A20 Pro 采用 2 纳米制程，性能和能效均创 iPhone 新高。</p>\n        </div>\n        <figure class="module-visual">\n          <img src="assets/images/hero/product-studio.png" alt="A20 Pro 芯片概念图" width="1200" height="675">\n          <p>A20 Pro 芯片：2 纳米制程</p>\n        </figure>\n      </div>\n    </section>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'两栏 flex 生效（display:flex + 两列并排）', js:'(function(){ if(!doc) return false; var f = doc.querySelector(".module-flex"); if(!f) return false; if (win.getComputedStyle(f).display !== "flex") return false; var kids = [].slice.call(f.children).map(function(c){ return c.getBoundingClientRect(); }); return kids.length >= 2 && kids[1].left >= kids[0].right - 2; })()' },
      { label:'两列等分（宽度差 < 10%）', js:'(function(){ if(!doc) return false; var f = doc.querySelector(".module-flex"); if(!f) return false; var kids = [].slice.call(f.children).map(function(c){ return c.getBoundingClientRect().width; }); return kids.length >= 2 && Math.abs(kids[0]-kids[1])/Math.max(kids[0],kids[1]) < 0.1; })()' },
      { label:'图片不再爆宽（无横向滚动）', js:'(function(){ if(!doc || !doc.documentElement) return false; return doc.documentElement.scrollWidth <= doc.documentElement.clientWidth + 1; })()' },
      { label:'图片不变形（比例保持）', js:'(function(){ if(!doc) return false; var i = doc.querySelector("figure img"); if (!i) return false; var r = i.getBoundingClientRect(); var iw = i.naturalWidth || 1, ih = i.naturalHeight || 1; return Math.abs(r.height/r.width - ih/iw)/(ih/iw) < 0.05; })()' },
      { label:'图注改用 figcaption（语义配对）', js:'!!(doc && doc.querySelector("figure figcaption"))' },
      { label:'列间距 ≥ 24px', js:'(function(){ if(!doc) return false; var f = doc.querySelector(".module-flex"); if(!f) return false; var cs = win.getComputedStyle(f); return parseFloat(cs.columnGap || cs.gap) >= 24; })()' }
    ],
    hints:[
      '四个症状：堆叠（没写 display:flex）、等分（没写 flex:1）、爆宽（img 缺 max-width）、图注（p → figcaption）。',
      'CSS 四行解决大半：.module-flex{display:flex;gap:32px;align-items:center} 子列 flex:1。',
      'img 老三样：display:block; max-width:100%; height:auto。'
    ],
    cause:'完整病因单——<b>布局</b>：① .module-flex 没写 display:flex（两列堆叠成上下）；② 子列没有 flex:1（无法等分）；③ 没有任何 gap（两列贴死）。<b>媒体</b>：④ img 缺 max-width:100%——原始 1200px 直接撑破容器出横向滚动；<b>语义</b>：⑤ 图注用 p——figcaption 的"说明属于图"配对丢失。修复 = flex 三行 + img 老三样 + figcaption 换名。' },

  { type:'quiz', title:'Quiz · 模块七连问', questions:[
      { q:'figure 的价值是？',
        options:['让图片变清晰','声明"figcaption 属于这张图"的语义配对','自动居中','压缩图片'], answer:1,
        explain:'figure+figcaption 把"图与它的说明"绑成结构事实。' },
      { q:'figcaption 必须是 figure 的？',
        options:['任意位置','第一个或最后一个孩子','写在 img 里','同级放置'], answer:1,
        explain:'规范位置：首或尾。' },
      { q:'两栏等分用？',
        options:['width:50% 手算','两列各 flex:1','float:left','margin 凑'], answer:1,
        explain:'flex:1 平分剩余空间——比例由浏览器算。' },
      { q:'移动端两栏变单列，最直接的手段是？',
        options:['删掉一列','flex-direction 切 column','缩小字号','隐藏图片'], answer:1,
        explain:'堆叠 = 方向切换（系统化在 Stage 14）。' },
      { q:'图文交替节奏的价值是？',
        options:['纯装饰','打破流水线感，制造翻页律动','省流量','方便写 CSS'], answer:1,
        explain:'单向排列让长页后半段被"滑读"（P16）。' },
      { q:'模块里图与文的比例，Apple 风格倾向？',
        options:['图越小越好','约对半或图略多，文字列保持可读行宽','全是文字','全部等宽三栏'], answer:1,
        explain:'视觉是主角，但文字列必须有呼吸——两种极端都失衡。' },
      { q:'order 属性改变的只是？',
        options:['DOM 结构','视觉顺序（读屏器仍按 DOM 读）','z-index','flex 比例'], answer:1,
        explain:'视觉重排不等于语义重排——使用时想着内容逻辑。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我会用 figure + figcaption 做"图+注"语义配对',
      '我知道 figure 和 div 包图的区别',
      '我能用 flex 两栏 + flex:1 做等分模块',
      '我能说出 gap 与 align-items 在模块里的作用',
      '我理解交替节奏（P16）的价值',
      '我在 Layout Builder 调出过自己的模块比例',
      '我的模块图片不变形、不溢出',
      '我完成了 Coding Challenge（8 项真实 DOM 检查全过）',
      '我完成了 Debug Challenge（挤成一团的模块修复）'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['语义', 'figure/figcaption = 图与注的结构配对'],
      ['Flex 深化', 'flex:1 等分 · basis 比例 · order 视觉重排 · column 堆叠'],
      ['模块骨架', 'section > 文字列 + 视觉列——Apple 中段的细胞'],
      ['设计', '交替节奏（P16）+ 视觉重量（P13）= 模块的呼吸']
    ],
    next:{ stage:'stage-9', text:'Stage 9：全宽视频——video 标签与产品影片' } }
]},

/* ---------- Stage 9 ---------- */
{ id:'stage-9', num:9, title:'全宽视频', short:'产品影片', status:'ready', minutes:'150–190 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'Apple 页面会"动"。产品影片是它叙事的王牌——这一关把 video 标签讲透：属性矩阵、自动播放的浏览器规则、poster 的职责，以及最重要的设计判断：什么时候视频比图片更好，什么时候它是灾难。',
    items:[
      '吃透 video 与它的属性：src / poster / controls / autoplay / muted / loop / playsinline',
      '理解为什么 autoplay 必须 + muted（浏览器的声音铁律）',
      'Video Attribute Lab：亲手开关六个属性，看行为差异',
      'Autoplay Decision Lab：四种场景该不该自动播放',
      '完成 Coding Challenge：全宽产品影片区'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 8：模块全是静态', dark:true, blank:'（图文模块 · 图文模块 · 图文模块……）' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 9：会动的产品影片区', dark:true, blank:'section ▸ video（autoplay·muted·loop·playsinline + poster）' },
    caption:'一段无声循环的产品影片，是 Apple"氛围叙事"的心脏。技术只有一行标签——难点全在属性取舍与体验判断。' },

  { type:'observe', title:'Observe Apple Video', img:'curriculum/reference/18pro-hero-desktop.png',
    imgCap:'截图是静止的，但 Stage 0 实测过：这个页面有 13 个 video 元素。以下事实来自抓取与 DevTools 通用验证。',
    items:[
      { q:'Apple 页面有多少视频？', a:'实测：13 个 video 元素——从 Hero 场景到模块演示，视频承担"动起来才说得清"的部分。' },
      { q:'自动播放的视频有声音吗？', a:'实测 + 浏览器通用规则：自动播放必然静音（autoplay + muted）。有声音的视频必须用户主动点击播放。' },
      { q:'HLS / m3u8 是什么？', a:'实测：Apple 用 HLS 流媒体（m3u8 索引 + 分片）。概念：视频被切成小段按需加载。本课程只用本地 mp4——流媒体是后话。' },
      { q:'什么时候视频比图片好？', a:'设计判断：需要展示"过程/运动/氛围"时（产品滑出、光斑移动）。静态能说清的（参数、规格）用图——视频是奢侈品不是装饰。' }
    ]},

  { type:'taglab', title:'Tag Lab · video 与 source', lead:'video 是第一个"带状态的媒体元素"：它有播放、有时长、有声音策略。source 在这里负责多格式候选。',
    tags:[
    { tag:'<video>', cn:'视频元素', one:'在页面里嵌入视频——一个自带播放状态的媒体元素。',
      what:'媒体容器：播放器行为（播放/暂停/循环）由属性声明，外观由 poster 与 CSS 决定。',
      why:'网页需要标准化的视频播放：不依赖插件、可编程控制、可声明无障碍替代（字幕轨——后续课程）。',
      where:'全宽叙事区、模块演示位。',
      inside:'零到多个 source + 兜底文字；controls 由属性声明。',
      min:'<video src="assets/video/intro.mp4"\n       poster="assets/images/hero/product-desktop.png"\n       autoplay muted loop playsinline>\n</video>',
      apple:'实测（2026-09-27 快照）：Apple 的 13 个 video **没有一条带 autoplay 或 loop 属性**——实际机制是 muted + playsinline + JS 滚动触发播放。课程的四件套是"不写 JS 也能达到类似效果"的教学简化，不是 Apple 原始实现。',
      hero:'你的影片区将采用同一组合——网页"氛围视频"的黄金四件套。',
      vs:'video vs img：img 一帧即全部；video 是时间轴——所以多出播放策略（autoplay/loop）与声音策略（muted）两个维度。',
      errs:'autoplay 不加 muted（浏览器拒绝播放）；不加 playsinline（iOS 上自动全屏）；把 controls 和 autoplay 一起给（既自己动又显示控制条——两套意图打架）。',
      try:'"黄金四件套"是哪四个属性？各自防什么事故？' },
    { tag:'属性矩阵', cn:'video 六开关', one:'autoplay / muted / loop / playsinline / controls / poster——每个都是一次体验决策。',
      what:'autoplay=自动播放；muted=静音；loop=循环；playsinline=行内播放（禁 iOS 自动全屏）；controls=显示控制条；poster=加载前/未播放时的封面。',
      why:'它们不是"功能清单"而是"体验声明"：氛围视频要 autoplay+muted+loop+playsinline；教学视频要 controls+poster（不自动播）。',
      where:'写在 video 开标签上。',
      inside:'——属性即声明。',
      min:'<!-- 氛围视频 -->\n<video autoplay muted loop playsinline …></video>\n<!-- 教学视频 -->\n<video controls poster="…" …></video>',
      apple:'实测（通用规则验证）：氛围视频组合 muted+autoplay 是浏览器允许自动播放的唯一通行证。',
      hero:'影片区属于氛围视频——四件套齐上，不加 controls。',
      vs:'autoplay vs controls：自动播放的成熟形态是"无控制条"（它不是播放器，是氛围）；给用户主动看的视频必须给 controls（尊重控制权）。',
      errs:'六大误用：autoplay 无 muted；漏 playsinline（iOS 全屏劫持）；loop 加在教学视频（看完又重来）；poster 忘写（黑屏闪烁）；muted 写成 mute（拼错无效）；音频无 controls（用户关不掉）。',
      try:'说出"教学视频"与"氛围视频"各自的属性组合，以及为什么。' },
    { tag:'<source>（video 版）', cn:'格式候选', one:'同一视频的多种格式候选：浏览器选第一个自己支持的。',
      what:'picture 里的老朋友，在 video 里负责格式备选：mp4 / webm 各一条。',
      why:'不同浏览器支持不同编码——多格式候选是兼容性的保险（教学环境用 mp4 即可覆盖）。',
      where:'video 内部，兜底文字之前。',
      inside:'无内容，靠 src 与 type 属性。',
      min:'<video controls poster="…">\n  <source src="a.webm" type="video/webm">\n  <source src="a.mp4" type="video/mp4">\n  你的浏览器不支持视频。\n</video>',
      apple:'实测：Apple 用 HLS 流（m3u8）为主——流媒体按带宽动态切片，是 source 思路的工程化升级（概念了解即可）。',
      hero:'本关用单 mp4 即可；记住 source 在 video 里 = 格式候选。',
      vs:'video 的 source vs picture 的 source：都是候选规则；一个按格式，一个按视口/密度。',
      errs:'type 写错（浏览器误判放弃）；把兜底文字写成可见内容（只在不支持时显示）。',
      try:'为什么 type 属性能省流量？（浏览器不支持的格式不必下载探测。）' }
    ]},

  { type:'vidlab', title:'Video Attribute Lab · 六个开关', lead:'同一个视频，六个属性逐个开关。观察：autoplay 不 muted 会怎样？漏 playsinline 在手机上会发生什么？——每个属性都是一次事故预防。' },

  { type:'autolab', title:'Autoplay Decision Lab · 播不播，谁说了算', lead:'四个场景做判断：自动播放 vs 用户点击。核心原则：动画氛围归自动，声音与选择权归用户。' },

  { type:'challenge', title:'Coding Challenge · 全宽产品影片区',
    task:'构建影片区：① section > video，src 用 assets/video/intro.mp4，poster 用 assets/images/hero/product-desktop.png；② 氛围视频四件套：autoplay muted loop playsinline；③ 不加 controls；④ video 样式：display:block + width:100% + height:auto；⑤ 判分会真实检查 video 的播放状态与属性。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; }\n  h2 { color: #f5f5f7; font-size: 40px; font-weight: 600; text-align: center; padding: 48px 0 24px; margin: 0; }\n  /* TODO: video——全宽、不变形 */\n\n</style>\n</head>\n<body>\n  <main>\n    <h2>先刷重点</h2>\n    <!-- TODO: 氛围视频（四件套 + poster） -->\n\n  </main>\n</body>\n</html>',
    checks:[
      { label:'video 元素存在且指向 intro.mp4', js:'(function(){ if(!doc) return false; var v = doc.querySelector("video"); return !!v && (v.getAttribute("src") || "").indexOf("intro.mp4") >= 0; })()' },
      { label:'poster 已设置', js:'(function(){ if(!doc) return false; var v = doc.querySelector("video"); return !!v && (v.getAttribute("poster") || "").length > 0; })()' },
      { label:'autoplay 属性在', js:'doc && !!doc.querySelector("video[autoplay]")' },
      { label:'muted 属性在（autoplay 的通行证）', js:'(function(){ if(!doc) return false; var v = doc.querySelector("video"); return !!v && (v.hasAttribute("muted") || v.muted === true); })()' },
      { label:'loop 与 playsinline 都在', js:'(function(){ if(!doc) return false; return !!doc.querySelector("video[loop]") && !!doc.querySelector("video[playsinline]"); })()' },
      { label:'没有 controls（氛围视频不加控制条）', js:'(function(){ if(!doc) return false; return !doc.querySelector("video[controls]"); })()' },
      { label:'视频真实在播（readyState ≥ 2 且未暂停）', js:'(function(){ if(!doc) return false; var v = doc.querySelector("video"); return !!v && v.readyState >= 2 && !v.paused; })()' },
      { label:'全宽不溢出（video 宽 100%，无横向滚动）', js:'(function(){ if(!doc || !doc.documentElement) return false; var v = doc.querySelector("video"); if (!v) return false; var r = v.getBoundingClientRect(); var ok = Math.abs(r.width - doc.documentElement.clientWidth) < 8 || win.getComputedStyle(v).width === "100%"; return ok && doc.documentElement.scrollWidth <= doc.documentElement.clientWidth + 1; })()' }
    ],
    hints:[
      '四件套是一个组合：autoplay muted loop playsinline——少 muted 浏览器直接拒绝自动播放。',
      'poster 是"视频的 Hero 图"：加载前与未播放时的门面——用已有的产品图。',
      'video 老三样同 img：display:block; width:100%; height:auto。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; background: #000; }\n  h2 { color: #f5f5f7; font-size: clamp(28px, 4vw, 40px); font-weight: 600; text-align: center; padding: 48px 0 24px; margin: 0; }\n  video { display: block; width: 100%; height: auto; }\n</style>\n</head>\n<body>\n  <main>\n    <h2>先刷重点</h2>\n    <video src="assets/video/intro.mp4"\n           poster="assets/images/hero/product-desktop.png"\n           autoplay muted loop playsinline>\n    </video>\n  </main>\n</body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 拒绝营业的视频',
    story:'这段视频写着 autoplay 但一动不动、手机上打开会突然全屏、加载时黑屏闪烁、还有个多余的播放条、页面能左右滑。Run → 修 → 检查。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; }\n  video { width: 1300px; }\n</style>\n</head>\n<body>\n  <main>\n    <video src="assets/video/intro.mp4" autoplay controls>\n      视频\n    </video>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'补上 muted（autoplay 的通行证）', js:'(function(){ if(!doc) return false; var v = doc.querySelector("video"); return !!v && (v.hasAttribute("muted") || v.muted === true); })()' },
      { label:'补上 playsinline（防 iOS 全屏劫持）', js:'(function(){ if(!doc) return false; return !!doc.querySelector("video[playsinline]"); })()' },
      { label:'补上 poster（告别黑屏闪烁）', js:'(function(){ if(!doc) return false; var v = doc.querySelector("video"); return !!v && (v.getAttribute("poster") || "").length > 0; })()' },
      { label:'移除 controls（氛围视频）', js:'(function(){ if(!doc) return false; return !doc.querySelector("video[controls]"); })()' },
      { label:'循环播放 loop 在（氛围需要）', js:'doc && !!doc.querySelector("video[loop]")' },
      { label:'宽度收敛（无横向滚动）', js:'(function(){ if(!doc || !doc.documentElement) return false; return doc.documentElement.scrollWidth <= doc.documentElement.clientWidth + 1; })()' },
      { label:'视频真实在播（未暂停）', js:'(function(){ if(!doc) return false; var v = doc.querySelector("video"); return !!v && v.readyState >= 2 && !v.paused; })()' }
    ],
    hints:[
      '自动播放失败的第一嫌疑：没有 muted。浏览器铁律——不允许未静音的自动播放。',
      '氛围视频配置清单：autoplay muted loop playsinline；删 controls；补 poster。',
      '宽度 1300px 是写死的——改 width:100% + height:auto。'
    ],
    cause:'完整病因单——<b>声音铁律</b>：① autoplay 无 muted → 浏览器拒绝播放（一切"视频不动"的第一嫌疑）；<b>iOS 体验</b>：② 缺 playsinline → 自动全屏劫持页面；<b>门面</b>：③ 无 poster → 加载期黑屏闪烁；<b>意图混乱</b>：④ controls 与 autoplay 并存（自走自演却摆着控制台）；<b>循环</b>：⑤ 氛围视频无 loop → 放完定格很尴尬；<b>布局</b>：⑥ 固定 1300px 宽 → 溢出出横向滚动。' },

  { type:'design', title:'Design Challenge · 视频的资格', lead:'视频是重武器——三个场景判断它配不配上场。',
    questions:[
      { q:'Q1 · "产品如何从口袋滑出"这类内容，用什么？',
        a:{ label:'选择 A', body:'<div style="background:#101014;border-radius:10px;padding:16px;display:flex;align-items:center;gap:12px"><span style="font-size:22px">🎞️</span><p style="margin:0;font-size:12.5px;color:#f5f5f7">视频：运动过程一播就懂</p></div>' },
        b:{ label:'选择 B', body:'<div style="background:#101014;border-radius:10px;padding:16px;display:flex;align-items:center;gap:12px"><span style="font-size:22px">🖼️</span><p style="margin:0;font-size:12.5px;color:#f5f5f7">四张连续截图 + 箭头</p></div>' },
        correct:'a',
        analysis:'A 胜。"过程与运动"是视频的本职：时间维度的信息用时间维度的媒介。P06 深化：素材形态要匹配信息类型。',
        principle:'P06 The Asset Is the Design' },
      { q:'Q2 · 参数对比区（芯片规格文字）该配自动播放视频吗？',
        a:{ label:'配', body:'<div style="background:#101014;border-radius:10px;padding:14px"><p style="margin:0 0 8px;font-size:13px;color:#f5f5f7;font-weight:600">A20 Pro vs A19</p><div style="background:#000;border-radius:6px;height:40px;display:flex;align-items:center;padding:0 10px;color:#ffd60a;font-size:11px">▶ 背景视频持续播放中…</div><p style="margin:8px 0 0;font-size:11px;color:#86868b">表格文字在动的东西旁边很难读</p></div>' },
        b:{ label:'不配', body:'<div style="background:#101014;border-radius:10px;padding:14px"><p style="margin:0 0 8px;font-size:13px;color:#f5f5f7;font-weight:600">A20 Pro vs A19</p><div style="background:#000;border-radius:6px;height:40px"></div><p style="margin:8px 0 0;font-size:11px;color:#86868b">安静的画面 = 参数可被认真阅读</p></div>' },
        correct:'b',
        analysis:'B 胜。需要"读"的区域必须安静——运动抢走阅读注意力（P01 的区域纪律）。视频给"看"的区域，不给"读"的区域。',
        principle:'P01 One Clear Visual Focus' },
      { q:'Q3 · 页脚上方来一段循环品牌视频，加分吗？',
        a:{ label:'加', body:'<div style="background:#101014;border-radius:10px;padding:14px"><div style="background:#000;border-radius:6px;height:36px;display:flex;align-items:center;padding:0 10px;color:#ffd60a;font-size:11px">▶ 又一段循环视频</div><p style="margin:8px 0 0;font-size:11px;color:#86868b">流量花了，情绪断了，页脚更远了</p></div>' },
        b:{ label:'不加', body:'<div style="background:#101014;border-radius:10px;padding:14px"><p style="margin:0;font-size:12px;color:#f5f5f7">页脚区：安静、轻、直达信息</p></div>' },
        correct:'b',
        analysis:'B 胜。视频是情绪与信息的高成本载体——放在"完成任务收尾"的页脚区，只有成本没有收益。少即是多。',
        principle:'P05 One Primary Action' }
    ]},

  { type:'design2', title:'Media Trade-off · 影片叙事 vs 静态快速理解', lead:'Scenario：一款面向企业 IT 管理员的 MDM 管理工具发布页。用户每天处理 50+ 台设备，只想知道"能不能解决我的问题"。',
    questions:[
      { q:'Q · 功能展示区：电影感影片 vs 快速静态说明？',
        a:{ label:'影片叙事', body:'<div style="background:#101014;border-radius:10px;padding:16px;display:flex;align-items:center;gap:12px"><span style="font-size:22px">🎞️</span><p style="margin:0;font-size:12px;color:#f5f5f7">60 秒产品影片：从部署到管理的完整流程</p></div>', when:'适合：消费级产品、需要展示使用体验和情感、用户有 browsing 时间。' },
        b:{ label:'静态快速说明', body:'<div style="background:#101014;border-radius:10px;padding:16px"><p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#f5f5f7">三步部署</p><p style="margin:0;font-size:12px;color:#86868b;line-height:1.8">① 导入设备列表 → ② 选择策略模板 → ③ 一键推送</p></div>', when:'适合：B2B 工具、用户想快速评估"能不能用"、时间宝贵。步骤文字比 60 秒影片更快被扫读。' },
        analysis:'两个都合理。B2B 用户评估效率高、耐心低——静态步骤比影片更快回答"能不能"。消费产品用影片建立情感连接。关键是"用户有多长时间给这个区域"。' }
    ] },

  { type:'quiz', title:'Quiz · 视频七连问', questions:[
      { q:'浏览器为什么拒绝"autoplay 但有声"的视频？',
        options:['性能考虑','防止用户被突然的声音打扰——autoplay 必须 muted','格式限制','历史 bug'], answer:1,
        explain:'声音铁律：未经用户手势的自动播放必须是静音的。' },
      { q:'playsinline 防的是什么？',
        options:['循环播放','iOS 上视频自动全屏劫持页面','黑屏','无法暂停'], answer:1,
        explain:'不加它，iPhone 上的自动播放视频会强制全屏。' },
      { q:'poster 的职责是？',
        options:['片尾字幕','加载前/未播放时的封面画面','音量控制','清晰度'], answer:1,
        explain:'视频的"门面图"——没有它就是黑屏等待。' },
      { q:'氛围视频与教学视频的本质区别是？',
        options:['分辨率','前者自动播放无控制条（是氛围），后者用户点击+controls（是工具）','长度','有没有声音'], answer:1,
        explain:'意图不同，属性组合完全不同。' },
      { q:'HLS/m3u8 是什么？',
        options:['图片格式','流媒体方案：视频切片按需传输（本课只记概念）','压缩算法','字幕格式'], answer:1,
        explain:'Stage 0 实测 Apple 在用；课程用本地 mp4 替代。' },
      { q:'参数表格旁放循环视频的问题是？',
        options:['太好看','运动抢走阅读注意力——"读"的区域必须安静','费电','不兼容'], answer:1,
        explain:'视频给"看"的区域，不给"读"的区域（P01 区域纪律）。' },
      { q:'video 里的 source 负责？',
        options:['字幕','多格式候选（浏览器选第一个支持的）','封面','循环'], answer:1,
        explain:'与 picture 里的 source 同思想：候选规则。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我背得出氛围视频四件套（autoplay muted loop playsinline）',
      '我理解 autoplay+muted 的浏览器铁律',
      '我知道 playsinline 防 iOS 全屏劫持',
      '我会用 poster 给视频上封面',
      '我能区分"氛围视频"与"教学视频"的属性组合',
      '我能判断一个区域"该不该上视频"',
      '我完成了 Coding Challenge（8 项含真实播放状态全过）',
      '我完成了 Debug Challenge（拒绝营业的视频修复）',
      '我完成了 Design Challenge（视频的资格判断）'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['属性矩阵', 'autoplay/muted/loop/playsinline/controls/poster——六开关六决策'],
      ['铁律', '自动播放 = 必须静音；氛围视频 = 四件套 + 无 controls'],
      ['门面', 'poster 是视频的 Hero 图'],
      ['设计', '视频给"看"的区域；"读"的区域必须安静（P06/P01 深化）']
    ],
    next:{ stage:'stage-10', text:'Stage 10：先刷重点——CSS Grid 卡片矩阵' } }
]},

/* ---------- Stage 10 ---------- */
{ id:'stage-10', num:10, title:'重点卡片矩阵 Grid', short:'Grid 卡片', status:'ready', minutes:'170–210 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'"先刷重点"是 Apple 页面的信息密度担当：四张卡片两行两列，窄屏变一列。这一关学二维布局系统 CSS Grid——并把 Flexbox vs Grid 的选型判断讲清楚。',
    items:[
      '建立 Grid 心智：容器、轨道（track）、网格线、单元格',
      '掌握 grid-template-columns、repeat()、minmax()、gap',
      '理解 auto-fit/auto-fill 的实用层次（只教够用的）',
      'Flexbox vs Grid：一维 vs 二维的选型判断——本关最重要的工程判断',
      '完成 Coding Challenge："先刷重点"卡片矩阵'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 9：信息没有"集合感"', dark:true, blank:'（四个重点各自为政——没有矩阵）' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 10：2×2 卡片矩阵', dark:true, blank:'section ▸ grid ▸ 摄像头 / A20 Pro / 颜色 / 电池 四卡' },
    caption:'Grid 让"一组同类信息"获得矩阵秩序：桌面 2×2、窄屏 1×4——轨道声明一处，响应全局生效。' },

  { type:'observe', title:'Observe Apple Highlights', img:'curriculum/reference/18pro-hero-desktop.png',
    imgCap:'首屏截图的"先刷重点"区（Stage 0 解剖确认：选项卡式图库）。教学版将其简化为静态 2×2 卡片矩阵——这是标准的学习路径：先网格，后交互。',
    items:[
      { q:'重点信息以什么形态组织？', a:'实测：卡片/图库形态，每张卡=一个小主题（摄像头/芯片/颜色/电池）。信息集合需要矩阵秩序。' },
      { q:'桌面几列？手机几列？', a:'视觉观察：桌面 2 列、窄屏 1 列——grid-template-columns 一处声明即可两种秩序。' },
      { q:'卡片圆角与间距一致吗？', a:'视觉观察：统一圆角（约 18~28px）与统一 gap——一致性是"卡片系统"的尊严。' },
      { q:'这为什么不是 Flex？', a:'工程判断：卡片需要"行与列同时成立"（二维约束）。Flex 是一维的——它管不了"第二行自动等宽"。' }
    ]},

  { type:'csslab', title:'CSS Lab · Grid 核心六件', lead:'Grid 的心智模型：你在容器上画轨道，item 自动落格。',
    props:[
    { name:'display: grid', cn:'启用网格',
      what:'二维布局开关：子元素按行与列同时排布。',
      def:'block。',
      min:'.cards {\n  display: grid;\n}',
      apple:'视觉观察：Apple 的卡片矩阵区均为 grid 思维（具体类名属其内部）。',
      gone:'卡片只能靠 flex-wrap 模拟矩阵——列宽不齐。',
      exp:'Grid Playground 切换 flex/grid 对比。',
      try:'grid 与 flex 的本质区别：二维 vs 一维。' },
    { name:'grid-template-columns', cn:'列轨道',
      what:'定义列：grid-template-columns: 1fr 1fr = 两列等分；repeat(2, 1fr) 是它的简写。',
      def:'none（单列隐式）。',
      min:'.cards {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}',
      apple:'视觉观察："先刷重点"桌面 2 列——repeat(2, 1fr) 一行声明。',
      gone:'卡片各占一行或宽窄不一。',
      exp:'Playground 拖列数滑杆。',
      try:'1fr 的含义：每份等分剩余空间——比百分比稳在"自动扣除 gap"。' },
    { name:'gap（grid 版）', cn:'网格间距',
      what:'行间距与列间距：gap: 20px 或 row-gap/column-gap 分开设。',
      def:'0。',
      min:'.cards {\n  gap: 20px;\n}',
      apple:'视觉观察：卡片间距均匀——与 Flex 的 gap 同一哲学：间距属于容器。',
      gone:'卡片粘连或 margin 方案的边缘多余空隙。',
      exp:'Playground 拖 gap。',
      try:'row-gap 与 column-gap 可以不同——卡片系统通常设成一样。' },
    { name:'repeat()', cn:'重复轨道',
      what:'轨道的重复简写：repeat(4, 1fr)、repeat(auto-fit, minmax(280px, 1fr))。',
      def:'—（函数）。',
      min:'.cards {\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n}',
      apple:'视觉观察（教学简化）：响应式卡片列的自适应行为与此等价。',
      gone:'每个断点手写列数——重复劳动。',
      exp:'Playground 的 auto-fit 模式。',
      try:'auto-fit 卡片法的三个参数含义：最小可读宽 280px、能塞几列塞几列、剩余空间均分。' },
    { name:'minmax()', cn:'轨道区间',
      what:'轨道的尺寸区间：minmax(最小, 最大)。auto-fit + minmax = 不写媒体查询的响应式列。',
      def:'—（函数）。',
      min:'repeat(auto-fit, minmax(280px, 1fr))',
      apple:'（同上——现代卡片矩阵的通用语法。）',
      gone:'窄屏上卡片被压到不可读。',
      exp:'Playground 拖宽看列数自动增减。',
      try:'为什么 minmax 的最小值定 280px？（可读性下限——与 Stage 5 行宽哲学同源。）' }
    ]},

  { type:'gridplay', title:'Grid Playground · 轨道与卡片', lead:'列数、gap、auto-fit 三个开关 + 一个"先刷重点"迷你矩阵。拖一拖，看轨道如何统治卡片命运。' },

  { type:'judge', title:'Judge · Flex 还是 Grid？', lead:'本关最重要的工程判断。四个场景。',
    scenarios:[
      { q:'场景 1：全局导航——一排链接等距分布。',
        options:[
          { t:'Flex', ok:true, why:'✓ 一维排列：导航是 Flex 的主场（Stage 6 已实践）。' },
          { t:'Grid', ok:false, why:'✗ 能用，但杀鸡用牛刀——导航没有"行与列"的二维诉求。' }
        ]},
      { q:'场景 2：先刷重点——四张卡片，桌面 2×2、手机 1×4。',
        options:[
          { t:'Flex', ok:false, why:'✗ flex-wrap 能模拟，但第二行卡片宽度受首行内容影响——矩阵不等宽。' },
          { t:'Grid', ok:true, why:'✓ 行与列同时约束——二维秩序正是 Grid 的定义。' }
        ]},
      { q:'场景 3：图文模块——文字列 + 视觉列左右排。',
        options:[
          { t:'Flex', ok:true, why:'✓ 两个子项沿一行分配（Stage 8 方案）。两栏属于一维问题。' },
          { t:'Grid', ok:false, why:'△ Grid 也能做（两列轨道），但对两栏而言 Flex 更轻——选型看"需要多少二维约束"。' }
        ]},
      { q:'场景 4：页脚的多列站点地图（4 列链接组）。', 
        options:[
          { t:'Flex', ok:false, why:'△ flex-wrap 勉强——但列宽随内容飘，四列对不齐。' },
          { t:'Grid', ok:true, why:'✓ 四列轨道 + 自动换行——矩阵秩序（Stage 13 实战）。' }
        ]}
    ],
    formula:'选型公式：一维（一排/一列）用 Flex；二维（行列同时成立）用 Grid。"卡片矩阵、多列站点地图 = Grid；导航、两栏图文 = Flex"。' },

  { type:'challenge', title:'Coding Challenge · "先刷重点" 2×2 卡片矩阵',
    task:'构建重点矩阵：① section > h2"先刷重点" + ul.cards（grid）；② 四张 li 卡片：摄像头 / A20 Pro / 四色 / 电池，各含 h3 + p；③ grid-template-columns: repeat(2, 1fr)、gap ≥ 16px；④ 卡片深色圆角背景（border-radius ≥ 18px）+ 内边距 ≥ 20px。判分读取真实 DOM 的几何与样式。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; padding: 56px 40px; }\n  h2 { font-size: 36px; font-weight: 600; margin: 0 0 24px; }\n  /* TODO 1: .cards——grid 两列等分 + gap */\n\n  /* TODO 2: .cards li——卡片底色 #1d1d1f 级 + 圆角 18px+ + 内边距 20px+ */\n\n  .cards h3 { font-size: 21px; font-weight: 600; margin: 0 0 8px; }\n  .cards p { font-size: 14px; line-height: 1.6; color: #86868b; margin: 0; }\n  ul { list-style: none; padding: 0; margin: 0; }\n</style>\n</head>\n<body>\n  <main>\n    <section>\n      <h2>先刷重点</h2>\n      <!-- TODO 3: ul.cards > 四个 li（摄像头 / A20 Pro / 四色外观 / 电池续航） -->\n\n    </section>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'ul.cards 为 grid', js:'(function(){ if(!doc) return false; var g = doc.querySelector("ul.cards, ul[class*=cards]"); return !!g && win.getComputedStyle(g).display === "grid"; })()' },
      { label:'两列轨道（repeat(2,1fr) 或两列等宽）', js:'(function(){ if(!doc) return false; var g = doc.querySelector("ul[class*=cards]"); if(!g) return false; var cs = win.getComputedStyle(g); return cs.gridTemplateColumns.split(" ").length === 2; })()' },
      { label:'四张卡片都在', js:'(function(){ if(!doc) return false; return doc.querySelectorAll("ul[class*=cards] > li").length >= 4; })()' },
      { label:'两行两列（卡片呈矩阵分布）', js:'(function(){ if(!doc) return false; var items = [].slice.call(doc.querySelectorAll("ul[class*=cards] > li")).map(function(li){ var r = li.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top) }; }); if (items.length < 4) return false; var rows = {}; items.forEach(function(it){ var key = it.y; rows[key] = (rows[key]||0)+1; }); var counts = Object.keys(rows).map(function(k){ return rows[k]; }); return counts.length === 2 && counts.every(function(c){ return c === 2; }); })()' },
      { label:'gap ≥ 16px', js:'(function(){ if(!doc) return false; var g = doc.querySelector("ul[class*=cards]"); if(!g) return false; var cs = win.getComputedStyle(g); return parseFloat(cs.rowGap) >= 16 && parseFloat(cs.columnGap) >= 16; })()' },
      { label:'卡片圆角 ≥ 18px', js:'(function(){ if(!doc) return false; var li = doc.querySelector("ul[class*=cards] > li"); return !!li && parseFloat(win.getComputedStyle(li).borderRadius) >= 18; })()' },
      { label:'卡片内边距 ≥ 20px', js:'(function(){ if(!doc) return false; var li = doc.querySelector("ul[class*=cards] > li"); return !!li && parseFloat(win.getComputedStyle(li).paddingTop) >= 20; })()' },
      { label:'四卡主题齐全（摄像头/芯片/颜色/电池）', js:'(function(){ if(!doc) return false; var t = doc.querySelector("ul[class*=cards]").textContent; return t.indexOf("摄像头") >= 0 && /A20|芯片/.test(t) && /颜色|外观/.test(t) && /电池|续航/.test(t); })()' }
    ],
    hints:[
      'Grid 两行就位：.cards { display:grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }',
      '卡片质感三件：background:#1d1d1f; border-radius:18px; padding:24px。',
      '四张卡的内容各写一句话——结构对了，内容随意（判分只认主题词）。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; padding: 56px 40px; }\n  h2 { font-size: 36px; font-weight: 600; margin: 0 0 24px; }\n  .cards {\n    list-style: none; margin: 0; padding: 0;\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n  }\n  .cards li {\n    background: #1d1d1f;\n    border-radius: 18px;\n    padding: 24px;\n  }\n  .cards h3 { font-size: 21px; font-weight: 600; margin: 0 0 8px; }\n  .cards p { font-size: 14px; line-height: 1.6; color: #86868b; margin: 0; }\n</style>\n</head>\n<body>\n  <main>\n    <section>\n      <h2>先刷重点</h2>\n      <ul class="cards">\n        <li><h3>摄像头</h3><p>4800 万像素融合式主摄，支持可变光圈。</p></li>\n        <li><h3>A20 Pro 芯片</h3><p>2 纳米制程，7 核图形处理器，性能翻倍。</p></li>\n        <li><h3>四色外观</h3><p>勃艮第酒红、冰川蓝、银色、黑色钛金属。</p></li>\n        <li><h3>电池续航</h3><p>视频播放最长可达 43 小时，续航大进化。</p></li>\n      </ul>\n    </section>\n  </main>\n</body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 散装的卡片堆',
    story:'这份"矩阵"名不副实：卡片各占一行（grid 没生效）、间距为 0、卡片是直角、内边距挤成一条缝。Run → 修 → 检查几何。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; padding: 40px; }\n  h2 { font-size: 30px; margin: 0 0 18px; }\n  ul { list-style: none; padding: 0; margin: 0; }\n  .cards li { background: #1d1d1f; }\n  .cards h3 { font-size: 18px; margin: 0 0 6px; }\n  .cards p { font-size: 13px; color: #86868b; margin: 0; }\n</style>\n</head>\n<body>\n  <main>\n    <h2>先刷重点</h2>\n    <ul class="cards">\n      <li><h3>摄像头</h3><p>4800 万像素融合式主摄。</p></li>\n      <li><h3>A20 Pro 芯片</h3><p>2 纳米制程性能翻倍。</p></li>\n      <li><h3>四色外观</h3><p>酒红 / 冰川蓝 / 银 / 黑。</p></li>\n      <li><h3>电池续航</h3><p>视频播放最长 43 小时。</p></li>\n    </ul>\n  </main>\n</body>\n</html>',
    checks:[
      { label:'grid 生效（两列轨道）', js:'(function(){ if(!doc) return false; var g = doc.querySelector("ul.cards"); return !!g && win.getComputedStyle(g).display === "grid" && win.getComputedStyle(g).gridTemplateColumns.split(" ").length === 2; })()' },
      { label:'两行两列矩阵分布', js:'(function(){ if(!doc) return false; var items = [].slice.call(doc.querySelectorAll("ul.cards > li")).map(function(li){ var r = li.getBoundingClientRect(); return Math.round(r.top) + ":" + Math.round(r.left); }); if (items.length < 4) return false; var rows = {}; items.forEach(function(it){ var y = it.split(":")[0]; rows[y] = (rows[y]||0)+1; }); var counts = Object.keys(rows).map(function(k){ return rows[k]; }); return counts.length === 2 && counts.every(function(c){ return c === 2; }); })()' },
      { label:'gap ≥ 16px', js:'(function(){ if(!doc) return false; var cs = win.getComputedStyle(doc.querySelector("ul.cards")); return parseFloat(cs.rowGap) >= 16 && parseFloat(cs.columnGap) >= 16; })()' },
      { label:'卡片圆角 ≥ 18px', js:'(function(){ if(!doc) return false; return parseFloat(win.getComputedStyle(doc.querySelector("ul.cards > li")).borderRadius) >= 18; })()' },
      { label:'卡片内边距 ≥ 20px', js:'(function(){ if(!doc) return false; return parseFloat(win.getComputedStyle(doc.querySelector("ul.cards > li")).paddingTop) >= 20; })()' },
      { label:'无横向溢出', js:'(function(){ if(!doc || !doc.documentElement) return false; return doc.documentElement.scrollWidth <= doc.documentElement.clientWidth + 1; })()' }
    ],
    hints:[
      'grid 生效只差一行：.cards { display:grid; grid-template-columns: repeat(2,1fr); gap:20px; }',
      '卡片质感两件：border-radius:18px; padding:24px。',
      '判分读的是真实几何（卡片真的排成 2×2 了吗）——改完 Run 看预览。'
    ],
    cause:'完整病因单——<b>无 display:grid</b>（卡片堆叠成一列，矩阵名存实亡）；<b>无列轨道</b>（即使 grid 了也只有一列）；<b>gap:0</b>（卡片粘连）；<b>无圆角</b>（直角卡片失去 Apple 卡片语言）；<b>无内边距</b>（内容贴边，卡片失去"容器感"）。修复 = display + 轨道 + gap + 圆角 + padding 五笔。' },

  { type:'design', title:'Design Challenge · 矩阵的纪律', lead:'卡片系统的高级感来自"一致性"。两道判断。',
    questions:[
      { q:'Q1 · 哪组卡片的"系统感"更强？',
        a:{ label:'版本 A', body:'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div style="background:#1d1d1f;border-radius:14px;padding:12px"><p style="margin:0;font-size:12px;color:#f5f5f7;font-weight:600">摄像头</p></div><div style="background:#1d1d1f;border-radius:14px;padding:12px"><p style="margin:0;font-size:12px;color:#f5f5f7;font-weight:600">A20 Pro</p></div><div style="background:#1d1d1f;border-radius:14px;padding:12px"><p style="margin:0;font-size:12px;color:#f5f5f7;font-weight:600">四色外观</p></div><div style="background:#1d1d1f;border-radius:14px;padding:12px"><p style="margin:0;font-size:12px;color:#f5f5f7;font-weight:600">电池</p></div></div>' },
        b:{ label:'版本 B', body:'<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:8px"><div style="background:#26262b;border-radius:8px;padding:14px"><p style="margin:0;font-size:13px;color:#f5f5f7;font-weight:600">摄像头</p></div><div style="background:#141416;border-radius:20px;padding:8px"><p style="margin:0;font-size:11px;color:#f5f5f7;font-weight:600">A20 Pro</p></div><div style="background:#1d1d1f;border-radius:12px;padding:18px"><p style="margin:0;font-size:12px;color:#f5f5f7;font-weight:600">四色外观</p></div><div style="background:#2a2a30;border-radius:6px;padding:10px"><p style="margin:0;font-size:14px;color:#f5f5f7;font-weight:600">电池</p></div></div>' },
        correct:'a',
        analysis:'A 胜。统一的底色、圆角、内边距、字号——一致性让四张卡读作"一个系统"；B 的四张卡四种性格，像临时拼凑（P17）。',
        principle:'P17 Consistency Is a System' },
      { q:'Q2 · 卡片矩阵的 gap 哪个更对？',
        a:{ label:'版本 A', body:'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px"><div style="background:#1d1d1f;border-radius:14px;height:44px"></div><div style="background:#1d1d1f;border-radius:14px;height:44px"></div><div style="background:#1d1d1f;border-radius:14px;height:44px"></div><div style="background:#1d1d1f;border-radius:14px;height:44px"></div></div>' },
        b:{ label:'版本 B', body:'<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px"><div style="background:#1d1d1f;border-radius:14px;height:44px"></div><div style="background:#1d1d1f;border-radius:14px;height:44px"></div><div style="background:#1d1d1f;border-radius:14px;height:44px"></div><div style="background:#1d1d1f;border-radius:14px;height:44px"></div></div>' },
        correct:'a',
        analysis:'A 胜。卡片需要"被看见是分开的个体"——gap 2px 时圆角互相入侵，卡片语言崩坏。深色主题的卡片 gap 通常 16~24px（视觉观察）。',
        principle:'P07 Whitespace Creates Hierarchy' }
    ]},

  { type:'design2', title:'Layout Trade-off · 密度对比 vs 宽松叙事', lead:'Scenario：一个开发者监控 Dashboard 的状态卡片区域。用户每 30 秒刷新一次，只看"有没有红色告警"。',
    questions:[
      { q:'Q · 状态卡片布局：高密度对比 vs 宽松叙事？',
        a:{ label:'高密度', body:'<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:4px"><div style="background:#1d1d1f;border-radius:6px;padding:8px"><p style="margin:0;font-size:9px;color:#86868b">CPU</p><p style="margin:0;font-size:16px;font-weight:700;color:#30d158">42%</p></div><div style="background:#1d1d1f;border-radius:6px;padding:8px"><p style="margin:0;font-size:9px;color:#86868b">MEM</p><p style="margin:0;font-size:16px;font-weight:700;color:#ffd60a">78%</p></div><div style="background:#1d1d1f;border-radius:6px;padding:8px"><p style="margin:0;font-size:9px;color:#86868b">DISK</p><p style="margin:0;font-size:16px;font-weight:700;color:#30d158">51%</p></div><div style="background:#1d1d1f;border-radius:6px;padding:8px"><p style="margin:0;font-size:9px;color:#86868b">NET</p><p style="margin:0;font-size:16px;font-weight:700;color:#ff453a">92%</p></div></div>', when:'适合：监控 Dashboard——用户 30 秒扫一次，只看"有没有红的"。密度越高，一次扫的指标越多。' },
        b:{ label:'宽松叙事', body:'<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"><div style="background:#1d1d1f;border-radius:14px;padding:18px"><p style="margin:0 0 6px;font-size:12px;color:#86868b">CPU 使用率</p><p style="margin:0;font-size:22px;font-weight:700;color:#30d158">42%</p><p style="margin:4px 0 0;font-size:10px;color:#86868b">比昨日 -3%</p></div><div style="background:#1d1d1f;border-radius:14px;padding:18px"><p style="margin:0 0 6px;font-size:12px;color:#86868b">内存</p><p style="margin:0;font-size:22px;font-weight:700;color:#ffd60a">78%</p><p style="margin:4px 0 0;font-size:10px;color:#86868b">接近上限</p></div></div>', when:'适合：管理报告页、给非技术人的 overview、需要上下文（比昨日 -3%）辅助理解。' },
        analysis:'两个都合理——取决于用户多久看一次、看的目的。30 秒一次的监控用高密度；一天看一次的报告用宽松叙事。P01 的"一个焦点"在 Dashboard 里变成"红色告警就是焦点"。' }
    ] },

  { type:'quiz', title:'Quiz · Grid 七连问', questions:[
      { q:'Grid 与 Flex 的本质区别是？',
        options:['没有区别','Grid 是二维（行+列），Flex 是一维（主轴）','Flex 更新','Grid 只能放图片'], answer:1,
        explain:'二维 vs 一维——选型的第一问。' },
      { q:'repeat(2, 1fr) 的意思是？',
        options:['重复两次同一个元素','两列轨道，每列等分剩余空间','两倍大小','两行'], answer:1,
        explain:'repeat 简写轨道声明；fr 是"剩余空间份数"。' },
      { q:'auto-fit + minmax 的典型用途是？',
        options:['固定两列','不写媒体查询的响应式卡片列','居中文字','设置圆角'], answer:1,
        explain:'能塞几列塞几列、每列不小于最小值——卡片矩阵的自适应神器。' },
      { q:'minmax(280px, 1fr) 的 280px 是？',
        options:['最大宽度','卡片的最小可读宽度下限','间距','行高'], answer:1,
        explain:'下限来自可读性——与容器行宽哲学同源。' },
      { q:'卡片系统的"一致性"指？',
        options:['颜色越多越好','底色/圆角/内边距/字号统一——四张卡读作一个系统','每张卡不同才有趣','都用白色'], answer:1,
        explain:'一致性是系统感（P17）的来源。' },
      { q:'深色主题卡片矩阵的 gap 通常是？',
        options:['0','2px','16~24px 一档','越大越好'], answer:2,
        explain:'卡片要"被看见是分开的个体"——gap 过小圆角互相入侵。' },
      { q:'全局导航该用 Flex 还是 Grid？',
        options:['Grid','Flex——一维排列是导航的本质','必须同时用','都不用'], answer:1,
        explain:'没有二维诉求就别上二维工具（Stage 6 的选型回环）。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我建立了 Grid 的轨道/单元格心智',
      '我会用 repeat(2, 1fr) 声明两列等分',
      '我理解 auto-fit + minmax 的自适应卡片列',
      '我能判断 Flex vs Grid（一维 vs 二维）',
      '我知道卡片一致性四件（底色/圆角/内边距/字号）',
      '我完成了 Coding Challenge（8 项几何判分全过）',
      '我完成了 Debug Challenge（散装卡片堆修复）',
      '我完成了 Judge 选型训练（4 场景）'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['Grid 心智', '容器画轨道，item 自动落格——二维秩序'],
      ['核心语法', 'repeat() / minmax() / gap / auto-fit 卡片法'],
      ['选型', '一维 Flex（导航/两栏）；二维 Grid（矩阵/多列）'],
      ['设计', '卡片系统的尊严 = 一致性（P17）+ 合理 gap（P07）']
    ],
    next:{ stage:'stage-11', text:'Stage 11：颜色选择器——JavaScript 与 DOM 交互登场' } }
]},

/* ---------- Stage 11 ---------- */
{ id:'stage-11', num:11, title:'颜色选择器 + JavaScript', short:'颜色选择器', status:'ready', minutes:'200–260 min',
  blocks:[
  { type:'jsprimer', title:'JavaScript Primer · 看懂 S11 的语言', lead:'接下来你要写 JS 交互了。这个 Primer 只覆盖 S11/S12 会用到的语言结构——不是完整 JS 课程。每个实验都可以动手改，让你在写颜色选择器之前先"摸过"这些工具。' },

  { type:'goals', title:'本关目标', lead:'JavaScript 登场。前 10 关证明了 HTML+CSS 能走多远——这一关回答"什么时候必须用 JS"：状态交互。你要亲手做出 Apple 的四色切换，并理解 button（Stage 3 的伏笔）如何在这里兑现。',
    items:[
      'script 标签与 JS 的正确姿势：行为层只做 HTML/CSS 做不到的事',
      'DOM 查询：querySelector / querySelectorAll——从文档里"选中"元素',
      '事件：addEventListener + click——让页面"听见"用户',
      '状态管理第一课：selected 状态如何存、如何展示、如何同步',
      '完成 Color Picker：四色切换真实交互（改 src / 切 class / 更新文案）'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 10：颜色只是文字', dark:true, blank:'（四色卡片是静态的——点了没反应）' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 11：四色真实切换', dark:true, blank:'button ○○○○ ▸ 点击 → 产品图与文案即时切换' },
    caption:'这是整个课程第一次"页面因用户而改变"。请特别留意：我们点的不是 div（Stage 3 的判断在这里兑现）——颜色圆点是 button，因为它是"在当前界面做事"。' },

  { type:'observe', title:'Observe Apple 颜色选择器', img:'curriculum/reference/18pro-hero-desktop.png',
    imgCap:'"设计"模块的四色切换（Stage 0 实测：勃艮第酒红 / 冰川蓝 / 银色 / 黑色）。',
    items:[
      { q:'颜色圆点是什么元素？', a:'实测：button（a11y 树可见按钮语义）。它是页内动作——Stage 3 Decision Lab 场景 2 的标准答案。' },
      { q:'点击后发生什么？', a:'视觉观察：产品大图更换 + 当前色名文字更新 + 选中圆点出现描边。三件事同步发生 = 状态一致性。' },
      { q:'用户怎么知道"当前选中的是哪个"？', a:'视觉观察：选中圆点有描边/勾选态——状态必须可见（State Visibility），这是交互设计的底线。' },
      { q:'为什么键盘用户也能切换？', a:'实测（通用规则）：button 天然可 Tab、可 Enter/Space——语义选对了，无障碍免费获得（P12）。' }
    ]},

  { type:'taglab', title:'Tag Lab · script 与它的三板斧', lead:'JS 通过 script 标签进入页面。本关的"新标签"只有它一个——重头戏是三个伙伴：查询、事件、状态。',
    tags:[
    { tag:'<script>', cn:'脚本容器', one:'让 JavaScript 进入页面的入口。',
      what:'可执行脚本的容器：内联代码，或用 src 引入外部 .js 文件。',
      why:'行为层（交互/状态/数据）需要一种标准方式注入页面。',
      where:'body 末尾（推荐）或 head（配合 defer）。放末尾的原因：DOM 先就位，脚本再运行。',
      inside:'JS 代码，或 src 属性（二者选一）。',
      min:'<script>\n  document.querySelector("#btn")\n    .addEventListener("click", fn);\n</script>',
      apple:'实测（通用规则）：Apple 页面加载大量 JS（视图切换/动画/懒加载）——但每个静态模块"没有 JS 也成立"：渐进增强。',
      hero:'你的颜色选择器脚本将放在 body 末尾——等 DOM 全部就位再"接电"。',
      vs:'内联 script vs src 外链：练习用内联；工程用外链（可缓存、可维护）。',
      errs:'脚本放 head 且直接查 DOM（元素还不存在 → null 报错）；onclick 属性写逻辑（Stage 3 批判过的可点击 div 近亲）。',
      try:'为什么前 10 关的挑战代码从不需要 script？（浏览器原生状态够用——本关起我们才真正"需要"JS。）' },
    { tag:'querySelector', cn:'DOM 查询', one:'用 CSS 选择器从文档里选中元素——JS 触达页面的手。',
      what:'document.querySelector("选择器") 返回第一个匹配；querySelectorAll 返回全部（NodeList）。',
      why:'要改变页面，先要"找到"元素——选择器语法你已经全会（就是 CSS！）。',
      where:'script 内。',
      inside:'任意合法 CSS 选择器。',
      min:'var img = document.querySelector(".hero-img");\nvar dots = document.querySelectorAll(".dot");',
      apple:'（教学示例）工程师同样用选择器选中颜色圆点与产品图——这是 DOM 操作的通用起手。',
      hero:'你将选中：4 个圆点按钮、1 张产品图、1 个色名文案。',
      vs:'querySelector vs getElementById：前者吃完整选择器语法（推荐统一用它）；后者只认 id。',
      errs:'选择器写错 → 返回 null → 后续 .addEventListener 直接报错；忘记 querySelectorAll 返回的是列表（要遍历）。',
      try:'选中"class 为 dot 且 data-color 是 glacier 的按钮"，选择器怎么写？（.dot[data-color="glacier"]。）' },
    { tag:'addEventListener', cn:'事件监听', one:'告诉元素："用户点击时，执行这个函数"。',
      what:'element.addEventListener("click", 函数)：把行为与元素绑定。click 之外还有 input、scroll 等一整族事件。',
      why:'交互 = 事件驱动：页面不预测用户，而是"听"——听见才反应。',
      where:'script 内，选中元素之后。',
      inside:'事件名（字符串）+ 回调函数。',
      min:'dot.addEventListener("click", function () {\n  img.src = "…/product-color-glacier.png";\n});',
      apple:'（通用机制）颜色切换、选项卡、轮播全部建立在事件监听上——机制是标准 DOM 事件。',
      hero:'每个圆点监听 click：点击 → 换图 + 换文案 + 换选中态。',
      vs:'addEventListener vs onclick 属性：前者可挂多个、可移除、代码与结构分离——工程默认。',
      errs:'事件名写成 "onclick"（错，是 "click"）；回调忘写 function 包裹（立即执行而不是监听）。',
      try:'为什么 onclick 属性写法在 Stage 3 就被批判，而 addEventListener 是正解？（语义/行为分离、可维护、可无障碍。）' }
    ]},

  { type:'domviz', title:'DOM Interaction Visualizer · 一次点击的旅程', lead:'点击左边的模拟圆点，看数据流：用户事件 → 监听器 → 状态更新 → DOM 同步。这条链路就是所有前端交互的心跳。',
    tree:[
      { id:'usr', label:'👤 用户点击圆点', children:[
        { id:'evt', label:'click 事件', children:[
          { id:'lst', label:'监听器（JS 函数）', children:[
            { id:'cimg', label:'img.src ← 新图' },
            { id:'ctxt', label:'色名 ← 更新' },
            { id:'csel', label:'圆点 ← 选中态' }
          ]}
        ]}
      ]}
    ],
    notes:{
      'usr':'一切从用户开始：点击、输入、滚动都是"事件"。',
      'evt':'浏览器把点击包装成事件对象，派发给被点的元素。',
      'lst':'监听器被触发：它读参数（哪个色），然后负责"同步一切"。',
      'cimg':'第一步：换产品图（改 src）。视觉反馈的主体。',
      'ctxt':'第二步：更新色名文字——别让用户猜当前状态。',
      'csel':'第三步：更新选中态（描边 / aria-pressed）——状态可见是交互设计底线。'
    },
    visual:'<div class="pickmock"><div class="pk-dots"><button class="pk-dot demo" data-r="usr">●</button><button class="pk-dot demo" data-r="usr">●</button></div>'
      + '<div class="pk-stage"><img src="assets/images/hero/product-color-glacier.png" data-r="cimg" alt="" style="width:100%;display:block;border-radius:8px;cursor:pointer"><div style="display:flex;gap:8px;margin-top:8px"><span class="pk-name demo" data-r="ctxt">冰川蓝</span><span class="pk-sel demo" data-r="csel">选中态 ✓</span></div></div></div>' },

  { type:'statesync', title:'State Lab · 状态同步三件事', lead:'真实颜色选择器每次点击要同步三处：图片、文案、选中态。左边的"故障版"只换了图——点几下感受"状态不一致"有多难受；右边的完整版是你要做出的东西。',
    brokenDoc:'<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><style>body{margin:0;background:#000;color:#f5f5f7;font-family:-apple-system,"PingFang SC",sans-serif;padding:18px}img{display:block;width:100%;border-radius:10px}.row{display:flex;gap:12px;align-items:center;margin-top:12px}.dot{width:26px;height:26px;border-radius:50%;cursor:pointer;border:0}.dot[data-color=burgundy]{background:#5b2530}.dot[data-color=glacier]{background:#4a6a85}.dot.active{outline:2px solid #2997ff;outline-offset:3px}p{font-size:12px;margin:8px 0 0;color:#86868b}</style></head><body><img id="i" src="assets/images/hero/product-color-burgundy.png" width="600" height="338"><div class="row"><button class="dot active" data-color="burgundy" aria-label="酒红"></button><button class="dot" data-color="glacier" aria-label="冰川蓝"></button></div><p>图换了，但名字还是酒红、选中还在第一个 ← 状态不一致</p><script>var i=document.getElementById("i");document.querySelectorAll(".dot")[1].addEventListener("click",function(){i.src="assets/images/hero/product-color-glacier.png"});</script></body></html>',
    goodDoc:'<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><style>body{margin:0;background:#000;color:#f5f5f7;font-family:-apple-system,"PingFang SC",sans-serif;padding:18px}img{display:block;width:100%;border-radius:10px}.row{display:flex;gap:12px;align-items:center;margin-top:12px}.dot{width:26px;height:26px;border-radius:50%;cursor:pointer;border:0;transition:transform .15s}.dot:hover{transform:scale(1.1)}.dot[data-color=burgundy]{background:#5b2530}.dot[data-color=glacier]{background:#4a6a85}.dot.active{outline:2px solid #2997ff;outline-offset:3px}p{font-size:12px;margin:8px 0 0;color:#f5f5f7;font-weight:600}</style></head><body><img id="i" src="assets/images/hero/product-color-burgundy.png" width="600" height="338"><div class="row"><button class="dot active" data-color="burgundy" aria-label="酒红"></button><button class="dot" data-color="glacier" aria-label="冰川蓝"></button></div><p id="n">勃艮第酒红色 · 三态同步</p><script>var names={burgundy:"勃艮第酒红色",glacier:"冰川蓝色"};var i=document.getElementById("i");var n=document.getElementById("n");var dots=document.querySelectorAll(".dot");dots.forEach(function(d){d.addEventListener("click",function(){i.src="assets/images/hero/product-color-"+d.dataset.color+".png";n.textContent=names[d.dataset.color]+" · 三态同步";dots.forEach(function(x){x.classList.remove("active")});d.classList.add("active");});});</script></body></html>' },

  { type:'challenge', title:'Coding Challenge · 四色切换（真实点击判分）',
    task:'构建真实可用的颜色选择器：① 4 个 button.dot（data-color：burgundy/glacier/silver/black）+ 产品图 img.pick-img + 色名 span.pick-name；② script：querySelectorAll 选中全部圆点并监听 click；③ 点击后三同步：img.src 换对应色图、name 更新、圆点 active 类移动（唯一）；④ 默认第一色选中。图片路径 assets/images/hero/product-color-{色名}.png。本关判分会真实点击按钮。',
    script:true,
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; padding: 40px; }\n  .pick-img { display: block; width: 100%; max-width: 480px; border-radius: 14px; }\n  .pick-row { display: flex; gap: 14px; align-items: center; margin-top: 16px; }\n  .dot {\n    width: 30px; height: 30px; border-radius: 50%; border: 2px solid transparent;\n    cursor: pointer; padding: 0;\n  }\n  .dot[data-color="burgundy"] { background: #5b2530; }\n  .dot[data-color="glacier"] { background: #4a6a85; }\n  .dot[data-color="silver"] { background: #c8c8cd; }\n  .dot[data-color="black"] { background: #232327; }\n  /* TODO 1: .dot.active——选中描边（outline 2px #2997ff，偏移 3px） */\n\n  .pick-name { font-size: 14px; font-weight: 600; margin-left: 6px; }\n</style>\n</head>\n<body>\n  <img class="pick-img" src="assets/images/hero/product-color-burgundy.png" alt="iPhone 18 Pro 产品图" width="1200" height="675">\n  <div class="pick-row">\n    <!-- TODO 2: 四个 button.dot（data-color + aria-label）+ span.pick-name（默认酒红） -->\n\n  </div>\n  <script>\n    // TODO 3: 色名映射 + 查询全部圆点 + 逐个监听 click +\n    //   三同步：img.src / .pick-name / .active（先全部移除再加当前）\n\n  </script>\n</body>\n</html>',
    checks:[
      { label:'四个圆点都是 button（不是 div！）', js:'doc && doc.querySelectorAll("button.dot").length === 4 && doc.querySelectorAll("div.dot").length === 0' },
      { label:'每个圆点带 data-color 与 aria-label', js:'(function(){ if(!doc) return false; var dots = [].slice.call(doc.querySelectorAll("button.dot")); return dots.length === 4 && dots.every(function(d){ return d.dataset.color && (d.getAttribute("aria-label") || "").length >= 2; }); })()' },
      { label:'script 里存在 addEventListener', js:'(function(){ if(!doc) return false; var s = [].slice.call(doc.querySelectorAll("script")).map(function(x){ return x.textContent; }).join(""); return s.indexOf("addEventListener") >= 0; })()' },
      { label:'点击 glacier 圆点 → 图片切换成功', js:'(function(){ if(!doc) return false; var d = [].slice.call(doc.querySelectorAll("button.dot")).filter(function(x){ return x.dataset.color === "glacier"; })[0]; if (!d) return false; d.click(); var i = doc.querySelector("img.pick-img, img"); return !!i && i.src.indexOf("product-color-glacier") >= 0; })()' },
      { label:'点击后色名同步（含"冰川蓝"）', js:'(function(){ if(!doc) return false; var n = doc.querySelector(".pick-name"); return !!n && n.textContent.indexOf("冰川蓝") >= 0; })()' },
      { label:'active 选中态移动且唯一', js:'(function(){ if(!doc) return false; var act = doc.querySelectorAll("button.dot.active"); return act.length === 1 && act[0].dataset.color === "glacier"; })()' },
      { label:'再点 silver 三态依然同步', js:'(function(){ if(!doc) return false; var d = [].slice.call(doc.querySelectorAll("button.dot")).filter(function(x){ return x.dataset.color === "silver"; })[0]; if (!d) return false; d.click(); var i = doc.querySelector("img.pick-img, img"); var n = doc.querySelector(".pick-name"); return !!i && i.src.indexOf("silver") >= 0 && !!n && n.textContent.indexOf("银色") >= 0 && !!doc.querySelector("button.dot.active[data-color=silver]"); })()' },
      { label:'黑屏兜底不存在：图片真实可加载', js:'(function(){ if(!doc) return false; var i = doc.querySelector("img.pick-img, img"); return !!i && i.naturalWidth > 0; })()' }
    ],
    hints:[
      '结构：.pick-row 里放 4 个 button.dot（data-color + aria-label="xx色"）+ span.pick-name。',
      '事件骨架：document.querySelectorAll(".dot").forEach(function(d){ d.addEventListener("click", function(){ … }); });',
      '回调三同步：img.src = "assets/images/hero/product-color-" + d.dataset.color + ".png"；name.textContent = names[d.dataset.color]；先移除所有 .active 再给当前加。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; padding: 40px; }\n  .pick-img { display: block; width: 100%; max-width: 480px; border-radius: 14px; }\n  .pick-row { display: flex; gap: 14px; align-items: center; margin-top: 16px; }\n  .dot { width: 30px; height: 30px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; padding: 0; transition: transform .15s; }\n  .dot:hover { transform: scale(1.1); }\n  .dot[data-color="burgundy"] { background: #5b2530; }\n  .dot[data-color="glacier"] { background: #4a6a85; }\n  .dot[data-color="silver"] { background: #c8c8cd; }\n  .dot[data-color="black"] { background: #232327; }\n  .dot.active { outline: 2px solid #2997ff; outline-offset: 3px; }\n  .pick-name { font-size: 14px; font-weight: 600; margin-left: 6px; }\n</style>\n</head>\n<body>\n  <img class="pick-img" src="assets/images/hero/product-color-burgundy.png" alt="iPhone 18 Pro 产品图" width="1200" height="675">\n  <div class="pick-row">\n    <button class="dot active" data-color="burgundy" aria-label="勃艮第酒红色"></button>\n    <button class="dot" data-color="glacier" aria-label="冰川蓝色"></button>\n    <button class="dot" data-color="silver" aria-label="银色"></button>\n    <button class="dot" data-color="black" aria-label="黑色"></button>\n    <span class="pick-name">勃艮第酒红色</span>\n  </div>\n  <script>\n    var names = { burgundy: "勃艮第酒红色", glacier: "冰川蓝色", silver: "银色", black: "黑色" };\n    var img = document.querySelector(".pick-img");\n    var nameEl = document.querySelector(".pick-name");\n    var dots = document.querySelectorAll(".dot");\n    dots.forEach(function (d) {\n      d.addEventListener("click", function () {\n        img.src = "assets/images/hero/product-color-" + d.dataset.color + ".png";\n        nameEl.textContent = names[d.dataset.color];\n        dots.forEach(function (x) { x.classList.remove("active"); });\n        d.classList.add("active");\n      });\n    });\n  </script>\n</body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 精神的颜色选择器',
    script:true,
    story:'这个选择器"看起来能用"，一按就露馅：圆点是 div（Stage 3 亡灵）、事件挂在 body 上一刀切、点了图换但名字不换、选中态永远停在第一个。Run → 点几下 → 修复 → 检查（判分真实点击）。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; padding: 40px; }\n  .pick-img { display: block; width: 100%; max-width: 480px; border-radius: 14px; }\n  .dot { width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: inline-block; }\n  .dot[data-color="burgundy"] { background: #5b2530; }\n  .dot[data-color="glacier"] { background: #4a6a85; }\n  .dot[data-color="silver"] { background: #c8c8cd; }\n  .dot[data-color="black"] { background: #232327; }\n  .dot.active { outline: 2px solid #2997ff; outline-offset: 3px; }\n  .pick-name { font-size: 14px; font-weight: 600; margin-left: 6px; }\n</style>\n</head>\n<body>\n  <img class="pick-img" src="assets/images/hero/product-color-burgundy.png" width="1200" height="675">\n  <div class="pick-row">\n    <div class="dot active" data-color="burgundy"></div>\n    <div class="dot" data-color="glacier"></div>\n    <div class="dot" data-color="silver"></div>\n    <div class="dot" data-color="black"></div>\n    <span class="pick-name">勃艮第酒红色</span>\n  </div>\n  <script>\n    var img = document.querySelector(".pick-img");\n    document.body.addEventListener("click", function () {\n      img.src = "assets/images/hero/product-color-glacier.png";\n    });\n  </script>\n</body>\n</html>',
    checks:[
      { label:'圆点改为 button（语义修正）', js:'(function(){ if(!doc) return false; return doc.querySelectorAll("button.dot").length >= 4 && doc.querySelectorAll("div.dot").length === 0; })()' },
      { label:'逐圆点监听（不再 body 一刀切）', js:'(function(){ if(!doc) return false; var s = [].slice.call(doc.querySelectorAll("script")).map(function(x){ return x.textContent; }).join(""); return s.indexOf("body.addEventListener") < 0 && s.indexOf("addEventListener") >= 0; })()' },
      { label:'点击 glacier → 图与色名同步（冰川蓝）', js:'(function(){ if(!doc) return false; var d = [].slice.call(doc.querySelectorAll("button.dot")).filter(function(x){ return x.dataset.color === "glacier"; })[0]; if (!d) return false; d.click(); var i = doc.querySelector("img.pick-img, img"); var n = doc.querySelector(".pick-name"); return !!i && i.src.indexOf("glacier") >= 0 && !!n && n.textContent.indexOf("冰川蓝") >= 0; })()' },
      { label:'选中态移动且唯一', js:'(function(){ if(!doc) return false; var act = doc.querySelectorAll("button.dot.active"); return act.length === 1 && act[0].dataset.color === "glacier"; })()' },
      { label:'连续点击不炸（silver 点两次仍正常）', js:'(function(){ if(!doc) return false; var d = [].slice.call(doc.querySelectorAll("button.dot")).filter(function(x){ return x.dataset.color === "silver"; })[0]; if (!d) return false; d.click(); d.click(); var i = doc.querySelector("img.pick-img, img"); return !!i && i.src.indexOf("silver") >= 0; })()' }
    ],
    hints:[
      '三个病灶：① div.dot → button.dot + aria-label；② body.addEventlistener 点击任何地方都换且永远换冰川蓝；③ 色名不更新、active 不移动。',
      'script 全部重写为"逐圆点监听"——监听器里通过 d.dataset.color 知道点的是谁。',
      '回调三同步：换 src、换名字、移动 active（先全部移除再加当前）。'
    ],
    cause:'完整病因单——<b>语义</b>：① 圆点是 div（键盘够不着、读屏器不报按钮、Stage 3 的判断被背叛）；<b>事件</b>：② 监听挂 body 上——点页面任何地方都触发，且无视被点颜色永远换冰川蓝；<b>状态</b>：③ 色名从不更新（用户被迫猜）；④ active 从不移动（状态不可见）；⑤ 无 aria-label（无障碍盲区）。修复 = button 化 + 逐元素监听 + 状态三同步。' },

  { type:'design', title:'Design Challenge · 状态的可见性', lead:'交互设计底线：用户永远知道"当前是什么"。两道判断。',
    questions:[
      { q:'Q1 · 哪个选择器让用户"不用猜"？',
        a:{ label:'版本 A', body:'<div style="display:flex;gap:10px;align-items:center"><span style="width:26px;height:26px;border-radius:50%;background:#5b2530;display:inline-block;outline:2px solid #2997ff;outline-offset:3px"></span><span style="width:26px;height:26px;border-radius:50%;background:#4a6a85;display:inline-block"></span><span style="font-size:12px;color:#f5f5f7;margin-left:6px">勃艮第酒红色</span></div>' },
        b:{ label:'版本 B', body:'<div style="display:flex;gap:10px;align-items:center"><span style="width:26px;height:26px;border-radius:50%;background:#5b2530;display:inline-block"></span><span style="width:26px;height:26px;border-radius:50%;background:#4a6a85;display:inline-block"></span></div>' },
        correct:'a',
        analysis:'A 胜。选中描边 + 色名文字 = 状态双重可见；B 的用户每次都要"猜当前颜色"。状态可见是交互设计的底线。',
        principle:'P11 Interaction Feedback Confirms Intent' },
      { q:'Q2 · 切换颜色时，哪种反馈更完整？',
        a:{ label:'版本 A', body:'<div style="background:#101014;border-radius:10px;padding:12px;display:flex;gap:12px;align-items:center"><img src="assets/images/hero/product-color-glacier.png" alt="" style="width:96px;border-radius:8px;display:block"><div><p style="margin:0;font-size:12px;color:#f5f5f7;font-weight:600">冰川蓝色</p><p style="margin:2px 0 0;font-size:11px;color:#86868b">图 ✓ 名 ✓ 选中 ✓</p></div></div>' },
        b:{ label:'版本 B', body:'<div style="background:#101014;border-radius:10px;padding:12px;display:flex;gap:12px;align-items:center"><img src="assets/images/hero/product-color-glacier.png" alt="" style="width:96px;border-radius:8px;display:block"><div><p style="margin:0;font-size:12px;color:#86868b">图换了，但名字还写着"酒红色"</p></div></div>' },
        correct:'a',
        analysis:'A 胜。图、名、选中态三处同步 = 状态一致（State Lab 的核心）；B 是真实产品里最常见的"半截交互"——比不做交互更让人不安。',
        principle:'P11 Interaction Feedback Confirms Intent' }
    ]},

  { type:'quiz', title:'Quiz · JS 入门八连问', questions:[
      { q:'script 放 body 末尾的主要原因是？',
        options:['加载更快','DOM 已就位，脚本可直接查询元素','习惯而已','防止复制'], answer:1,
        explain:'脚本执行时它上面的元素已存在——避免 null 报错。' },
      { q:'querySelector 返回的是？',
        options:['全部匹配','第一个匹配（没有则 null）','字符串','新元素'], answer:1,
        explain:'全部匹配用 querySelectorAll（返回 NodeList，需遍历）。' },
      { q:'监听点击的正确写法是？',
        options:['el.onClick = fn','el.addEventListener("click", fn)','el.click = fn()','listen(el, click)'], answer:1,
        explain:'事件名是 "click"；addEventListener 是工程标准。' },
      { q:'颜色圆点应该用什么元素？',
        options:['div + onclick','button + addEventListener','a href="#"','span'], answer:1,
        explain:'页内动作 = button（Stage 3 判决的兑现）：键盘可达、语义正确。' },
      { q:'切换颜色时要同步的三件事是？',
        options:['颜色/大小/位置','产品图、色名文字、选中态','HTML/CSS/JS','什么都不用'], answer:1,
        explain:'状态三同步——缺任何一件都是"半截交互"。' },
      { q:'data-color 属性的作用是？',
        options:['改变颜色','把数据挂在元素上，供 JS 读取','样式声明','无意义'], answer:1,
        explain:'data-* 是 JS 的"元素口袋"——行为参数与结构共存。' },
      { q:'classList.add/remove 管的是？',
        options:['JS 逻辑','通过 class 切换视觉状态（如选中描边）','改 HTML 结构','发请求'], answer:1,
        explain:'JS 改状态，CSS 管长相——add/remove class 是两者的分工界面。' },
      { q:'渐进增强的意思是？',
        options:['页面必须等 JS','HTML/CSS 先成立，JS 在其上增强体验','JS 越多越好','先写 JS 再补 HTML'], answer:1,
        explain:'Apple 式思路：没有 JS 页面仍是好页面；有了 JS 体验更上一层。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我知道 script 放 body 末尾的原因',
      '我会用 querySelector / querySelectorAll 选中元素',
      '我会用 addEventListener 绑定 click',
      '我的颜色圆点是 button 且带 aria-label（Stage 3 兑现）',
      '我的切换同步三件事：图、色名、选中态',
      '我理解 data-* 是 JS 读参数的口袋',
      '我理解"JS 改状态、CSS 管长相"的分工（classList）',
      '我完成了 Color Picker（8 项含真实点击全过）',
      '我完成了 Debug Challenge（精神选择器修复）'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['JS 三板斧', 'querySelector 选中 · addEventListener 监听 · 回调里改 DOM'],
      ['状态三同步', '图 + 文案 + 选中态——交互一致性底线'],
      ['语义回环', '颜色圆点 = button（Stage 3 判断在此兑现）'],
      ['分工', 'JS 改状态（classList/src/textContent），CSS 管视觉']
    ],
    next:{ stage:'stage-12', text:'Stage 12：滚动显现——IntersectionObserver 与动效分寸' } }
]},

/* ---------- Stage 12 ---------- */
{ id:'stage-12', num:12, title:'滚动显现 + IntersectionObserver', short:'滚动显现', status:'ready', minutes:'170–210 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'滚动是长页面的主线剧情。这一关学"元素进入视口"的正确监听方式——IntersectionObserver，配合 transform/opacity 做"有分寸"的显现动画。同时你会亲手对比 No Motion / Subtle / Exaggerated，理解为什么 Apple 的动效从不吵闹。',
    items:[
      '理解 viewport 与"进入视口"的判断问题——以及 scroll 事件方案为何低效',
      '掌握 IntersectionObserver：observe / threshold / unobserve',
      'transform + opacity + transition：性能友好的显现动画组合',
      '动效分寸：No Motion / Subtle / Exaggerated 三档对比 + prefers-reduced-motion',
      '完成 Coding Challenge：滚动显现（真实滚动判分）'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 11：模块永远摆在那里', dark:true, blank:'（所有模块从页面加载起就静止可见）' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 12：滚动到才优雅浮现', dark:true, blank:'模块初始 opacity:0 + 下移 24px ▸ 进入视口 → 0.6s 浮现' },
    caption:'显现动画的本质是"叙事节奏"：内容在用户到达时才登场。关键是分寸——出现（Subtle）而非表演（Exaggerated）。' },

  { type:'observe', title:'Observe Apple 滚动行为', img:'curriculum/reference/18pro-page-strip-1.png',
    imgCap:'Stage 0 的页面切片（结构层）。滚动行为本身截图拍不到——以下是实测与通用规则的结合。',
    items:[
      { q:'Apple 页面滚动时有什么行为？', a:'实测 + 视觉观察：模块进入视口时内容有轻微的浮现/位移；Stage 0 还实测了 154 张懒加载占位图——"接近才加载"同属 IntersectionObserver 家族。' },
      { q:'动效的幅度有多大？', a:'视觉观察：位移小（十几像素级）、时长短（半秒级）、只播一次——确认"内容到了"，绝不表演。' },
      { q:'用 scroll 事件做这些有什么问题？', a:'工程事实：scroll 每秒触发几十次，回调里查布局会迫使浏览器反复重排——IntersectionObserver 把判断交给浏览器空闲时批量处理，这是它存在的理由。' },
      { q:'晕动症用户怎么办？', a:'无障碍规范（通用规则）：prefers-reduced-motion: reduce 时应省略非必要动画——Apple 的实现遵循系统设置（合理推测）。Stage 14 收编进 Audit。' }
    ]},

  { type:'csslab', title:'CSS Lab · 显现三件套', lead:'显现动画的配方极简：初始态（隐藏+位移）+ 过渡 + 进入态（JS 加 class）。性能与分寸各占一半。',
    props:[
    { name:'transform', cn:'位移/缩放（合成层）',
      what:'不改变布局的视觉变换：translateY(24px) 等。由合成器处理——动画不触发布局重算。',
      def:'none。',
      min:'.reveal {\n  transform: translateY(24px);\n}',
      apple:'Apple 的浮现位移都是 transform 级（视觉观察）——动起来"不惊动"页面其他部分。',
      gone:'用 top/margin 做位移：每帧触发布局，动画卡顿。',
      exp:'Threshold Lab 里的显现用的就是 transform。',
      try:'记住性能口诀：动画只碰 transform 和 opacity，不碰布局属性。' },
    { name:'opacity', cn:'透明度（合成层）',
      what:'0（全透明）到 1（不透明）。与 transform 同属"便宜"的动画属性。',
      def:'1。',
      min:'.reveal {\n  opacity: 0;\n}\n.reveal.in {\n  opacity: 1;\n}',
      apple:'淡入是 Apple 显现的主旋律——从 0 到 1 的过渡天然柔和。',
      gone:'只有位移没有淡入：内容"啪"地滑入，生硬。',
      exp:'Motion Compare 里调 duration 感受。',
      try:'opacity:0 的元素仍在文档里（占位、可聚焦）——这与 display:none 的区别要分清。' },
    { name:'transition（复习+深化）', cn:'过渡',
      what:'属性变化的中间过程。Stage 3 用它做 hover；这里用它做"进入视口"的状态切换。',
      def:'none（瞬间切换）。',
      min:'.reveal {\n  opacity: 0;\n  transform: translateY(24px);\n  transition: opacity .6s ease, transform .6s ease;\n}\n.reveal.in {\n  opacity: 1;\n  transform: none;\n}',
      apple:'视觉观察：Apple 的浮现过渡约 0.4~0.8s、缓出曲线——"到达"而不是"弹射"。',
      gone:'没有 transition：class 一加，内容瞬间出现——等于没做。',
      exp:'Motion Compare 三档对比。',
      try:'transition 写在初始态上（Stage 3 的老规矩）——进出双向平滑。' },
    { name:'prefers-reduced-motion', cn:'减弱动效查询',
      what:'检测系统"减弱动态效果"设置：reduce 时省略非必要动画。',
      def:'no-preference。',
      min:'@media (prefers-reduced-motion: reduce) {\n  .reveal {\n    transition: none;\n    transform: none;\n    opacity: 1;\n  }\n}',
      apple:'遵循系统减弱动效设置（合理推测；这是 Apple 无障碍哲学 P12 的自然延伸）。',
      gone:'晕动症用户被迫接受不必要的运动。',
      exp:'macOS：系统设置 → 辅助功能 → 显示 → 减弱动态效果。开一次，看本平台的动画如何集体安静（试试！）。',
      try:'这不是可选项：动效越多的页面，越需要这条逃生门。' }
    ]},

  { type:'ioviz', title:'Viewport Observer Visualizer · 谁在看谁', lead:'拖动滚动条，观察"模块"与"视口"的相交状态何时翻转——这就是 IntersectionObserver 通知你的时刻。threshold 滑杆改变触发时机。' },

  { type:'motioncompare', title:'Motion Compare · 动效的分寸', lead:'三档显现动效并排。看完回答：哪一档配得上 Apple？' },

  { type:'challenge', title:'Coding Challenge · 滚动显现（真实滚动判分）',
    task:'给三个模块加滚动显现：① .reveal 初始 opacity:0 + translateY(24px) + transition（opacity/transform 0.3~1.5s）；② script 用 IntersectionObserver（threshold 0.15）：进入视口时加 .in 并 unobserve；③ .reveal.in = opacity:1 + transform:none；④ 加 prefers-reduced-motion 豁免。判分会真实滚动页面验证。',
    script:true,
    tallFrame:true,
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; }\n  .spacer { height: 300px; display: flex; align-items: flex-end; padding: 0 40px; color: #86868b; font-size: 13px; }\n  .module { margin: 0 40px 60px; padding: 30px; background: #1d1d1f; border-radius: 18px; }\n  .module h3 { margin: 0 0 8px; font-size: 24px; }\n  .module p { margin: 0; color: #86868b; font-size: 14px; }\n  /* TODO 1: .reveal 初始态——opacity:0 + translateY(24px) + transition */\n\n  /* TODO 2: .reveal.in 进入态——opacity:1 + transform:none */\n\n  /* TODO 3: prefers-reduced-motion 豁免 */\n\n</style>\n</head>\n<body>\n  <div class="spacer" style="height:800px">↓ 往下滚，三个模块应依次浮现</div>\n  <div class="module reveal"><h3>摄像头</h3><p>4800 万像素融合式主摄。</p></div>\n  <div class="module reveal"><h3>A20 Pro</h3><p>2 纳米制程，性能翻倍。</p></div>\n  <div class="module reveal"><h3>电池</h3><p>视频播放最长 43 小时。</p></div>\n  <script>\n    // TODO 4: IntersectionObserver(threshold 0.15)\n    //   进入 → add .in + unobserve\n\n  </script>\n</body>\n</html>',
    checks:[
      { label:'.reveal 初始隐藏（opacity < 0.1）', js:'(function(){ if(!doc) return false; var first = doc.querySelector(".reveal"); return !!first && parseFloat(win.getComputedStyle(first).opacity) < 0.1; })()' },
      { label:'初始有位移（transform ≠ none）', js:'(function(){ if(!doc) return false; var r = doc.querySelector(".reveal"); return !!r && win.getComputedStyle(r).transform !== "none"; })()' },
      { label:'有 transition（0.3 ~ 1.5s）', js:'(function(){ if(!doc) return false; var r = doc.querySelector(".reveal"); if (!r) return false; var d = parseFloat(win.getComputedStyle(r).transitionDuration) || 0; return d >= 0.3 && d <= 1.5; })()' },
      { label:'脚本使用了 IntersectionObserver', js:'(function(){ if(!doc) return false; var s = [].slice.call(doc.querySelectorAll("script")).map(function(x){ return x.textContent; }).join(""); return s.indexOf("IntersectionObserver") >= 0; })()' },
      { label:'observe 被调用', js:'(function(){ if(!doc) return false; var s = [].slice.call(doc.querySelectorAll("script")).map(function(x){ return x.textContent; }).join(""); return s.indexOf(".observe(") >= 0 || s.indexOf("observe(") >= 0; })()' },
      { label:'真实滚动后全部模块获得 .in', scroll:true, js:'(function(){ if(!doc) return false; win.scrollTo(0, doc.body.scrollHeight); return doc.querySelectorAll(".reveal.in").length >= 3; })()' },
      { label:'滚到底后最后一个模块可见（opacity > 0.9）', scroll:true, js:'(function(){ if(!doc) return false; var list = doc.querySelectorAll(".reveal"); var last = list[list.length - 1]; return !!last && parseFloat(win.getComputedStyle(last).opacity) > 0.9; })()' },
      { label:'prefers-reduced-motion 豁免存在', js:'(function(){ if(!doc) return false; var st = [].slice.call(doc.querySelectorAll("style")).map(function(x){ return x.textContent; }).join(""); return st.indexOf("prefers-reduced-motion") >= 0; })()' }
    ],
    hints:[
      '初始态与进入态是"同一元素的两个 class"：.reveal（藏）→ .reveal.in（现）。transition 写在 .reveal 上。',
      'observer 三行：var io = new IntersectionObserver(fn, { threshold: 0.15 })；回调里 entry.isIntersecting 时 add .in + io.unobserve(entry.target)；最后对每个 .reveal 调 io.observe。',
      '判分会真的 scrollTo 底部再检查 .in 与 opacity——确认回调在真实滚动下工作。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; }\n  .spacer { height: 300px; display: flex; align-items: flex-end; padding: 0 40px; color: #86868b; font-size: 13px; }\n  .module { margin: 0 40px 60px; padding: 30px; background: #1d1d1f; border-radius: 18px; }\n  .module h3 { margin: 0 0 8px; font-size: 24px; }\n  .module p { margin: 0; color: #86868b; font-size: 14px; }\n  .reveal {\n    opacity: 0;\n    transform: translateY(24px);\n    transition: opacity .6s ease, transform .6s ease;\n  }\n  .reveal.in {\n    opacity: 1;\n    transform: none;\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .reveal { transition: none; transform: none; opacity: 1; }\n  }\n</style>\n</head>\n<body>\n  <div class="spacer" style="height:800px">↓ 往下滚，三个模块应依次浮现</div>\n  <div class="module reveal"><h3>摄像头</h3><p>4800 万像素融合式主摄。</p></div>\n  <div class="module reveal"><h3>A20 Pro</h3><p>2 纳米制程，性能翻倍。</p></div>\n  <div class="module reveal"><h3>电池</h3><p>视频播放最长 43 小时。</p></div>\n  <script>\n    var io = new IntersectionObserver(function (entries) {\n      entries.forEach(function (en) {\n        if (en.isIntersecting) {\n          en.target.classList.add("in");\n          io.unobserve(en.target);\n        }\n      });\n    }, { threshold: 0.15 });\n    document.querySelectorAll(".reveal").forEach(function (el) {\n      io.observe(el);\n    });\n  </script>\n</body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 永不出现的模块',
    story:'这个页面的模块滚动到了但永远不出现。Run → 滚动预览试试 → 找出原因 → 修复 → 检查（判分真实滚动）。',
    script:true,
    tallFrame:true,
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; }\n  .spacer { height: 800px; display: flex; align-items: flex-end; padding: 0 40px; color: #86868b; font-size: 13px; }\n  .module { margin: 0 40px 60px; padding: 30px; background: #1d1d1f; border-radius: 18px; }\n  .module h3 { margin: 0 0 8px; font-size: 24px; }\n  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s, transform .6s; }\n  .reveal.in { opacity: 1; transform: none; }\n</style>\n</head>\n<body>\n  <div class="spacer">↓ 滚动预览：模块们集体隐身……</div>\n  <div class="module reveal"><h3>摄像头</h3><p>4800 万像素融合式主摄。</p></div>\n  <div class="module reveal"><h3>A20 Pro</h3><p>2 纳米制程。</p></div>\n  <div class="module reveal"><h3>电池</h3><p>最长 43 小时。</p></div>\n  <script>\n    // observer 被注释掉了……\n  </script>\n</body>\n</html>',
    checks:[
      { label:'IntersectionObserver 存在且 observe 了元素', js:'(function(){ if(!doc) return false; var s = [].slice.call(doc.querySelectorAll("script")).map(function(x){ return x.textContent; }).join(""); return s.indexOf("new IntersectionObserver") >= 0 && s.indexOf("observe(") >= 0; })()' },
      { label:'滚动后全部模块获得 .in', scroll:true, js:'(function(){ if(!doc) return false; win.scrollTo(0, doc.body.scrollHeight); return doc.querySelectorAll(".reveal.in").length >= 3; })()' },
      { label:'显现带过渡（≥ 0.3s）', js:'(function(){ if(!doc) return false; var r = doc.querySelector(".reveal"); return !!r && (parseFloat(win.getComputedStyle(r).transitionDuration) || 0) >= 0.3; })()' },
      { label:'初始位移在（transform ≠ none）', js:'(function(){ if(!doc) return false; var r = doc.querySelector(".reveal"); return !!r && win.getComputedStyle(r).transform !== "none"; })()' },
      { label:'prefers-reduced-motion 豁免存在', js:'(function(){ if(!doc) return false; var st = [].slice.call(doc.querySelectorAll("style")).map(function(x){ return x.textContent; }).join(""); return st.indexOf("prefers-reduced-motion") >= 0; })()' },
      { label:'滚到底后全部可见（opacity > 0.9）', scroll:true, js:'(function(){ if(!doc) return false; var list = doc.querySelectorAll(".reveal"); var last = list[list.length - 1]; return !!last && parseFloat(win.getComputedStyle(last).opacity) > 0.9; })()' }
    ],
    hints:[
      'script 是空的——observer 从未创建，.in 永远不会加。照主课三行写。',
      'transition 已就位（检查过）——焦点全在把 observer 接上。',
      '无障碍收尾：@media (prefers-reduced-motion: reduce) 让 .reveal 直接管住。'
    ],
    cause:'完整病因单——<b>observer 缺失</b>：① script 空转，.in 永远不会添加，模块全部"隐身"（opacity:0 永续）——这是"内容消失"类 bug 的头号来源；其余（transition/位移）都在。修复 = 创建 observer（threshold 0.15 + isIntersecting + unobserve）+ 补 prefers-reduced-motion 豁免。<b>教训：初始隐藏 + JS 依赖 = 单点故障，调试口诀是"先看 script 有没有跑"。</b>' },

  { type:'quiz', title:'Quiz · 滚动显现七连问', questions:[
      { q:'IntersectionObserver 解决的核心问题是？',
        options:['让页面滚动更快','高效判断元素与视口的相交——不必每帧监听 scroll','让元素隐身','压缩图片'], answer:1,
        explain:'相交判断交给浏览器批量处理，主线程不再被 scroll 回调拖着跑。' },
      { q:'threshold: 0.15 的含义是？',
        options:['透明度 0.15','元素 15% 进入视口时触发回调','滚动速度','延迟 0.15 秒'], answer:1,
        explain:'threshold 是相交比例的触发线。' },
      { q:'显现动画为什么只用 transform 和 opacity？',
        options:['好看','它们不触发布局重算——由合成器处理，性能友好','传统','浏览器只支持这两个'], answer:1,
        explain:'动 top/margin 每帧重排——性能口诀：只碰 transform 与 opacity。' },
      { q:'.in 类加完后为什么要 unobserve？',
        options:['省内存','显现只播一次——没必要继续观察','必须配对才合法','防止反向动画'], answer:1,
        explain:'一次性动画 observer 用完即弃，避免无谓回调。' },
      { q:'prefers-reduced-motion 是给谁的？',
        options:['设计师','系统开启了"减弱动态效果"的用户','搜索引擎','旧浏览器'], answer:1,
        explain:'晕动症用户的逃生门——动效系统的道德条款（P12）。' },
      { q:'过渡应该写在哪个 class 上？',
        options:['只写 .in','初始态 .reveal 上（进出双向平滑）','body 上','随便'], answer:1,
        explain:'Stage 3 的规矩：transition 写默认态。' },
      { q:'"滚一下所有东西都飞进来"违背的是？',
        options:['P16 交替节奏','动效辅助叙事而非表演——分寸即品味','P07 留白','P15 构图'], answer:1,
        explain:'显现是"内容到了"的确认——不是马戏团开场。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我能说出 scroll 方案与 IntersectionObserver 的效率差别',
      '我会创建 observer（threshold + 回调 + observe + unobserve）',
      '我掌握显现三件套（transform + opacity + transition）',
      '我的动画只碰合成属性（不碰布局）',
      '我加了 prefers-reduced-motion 豁免',
      '我在 Motion Compare 里做出了"分寸"判断',
      '我完成了 Coding Challenge（真实滚动判分 8 项全过）',
      '我完成了 Debug Challenge（永不出现的模块修复）'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['问题', '"进入视口"的判断 → 交给 IntersectionObserver，不折磨 scroll'],
      ['配方', '初始态(.reveal) + 进入态(.in) + transition，只碰 transform/opacity'],
      ['分寸', 'Subtle 是默认档；一次性播放；reduced-motion 逃生门'],
      ['叙事', '动效 = 内容到达的确认——不是表演']
    ],
    next:{ stage:'stage-13', text:'Stage 13：对比表 + 页脚——密集信息与站点收尾' } }
]},

/* ---------- Stage 13 ---------- */
{ id:'stage-13', num:13, title:'对比表 + 页脚', short:'表格与页脚', status:'ready', minutes:'160–200 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'页面的信息密度巅峰：规格对比表与站点地图式页脚。这一关学 table 家族与 footer 语义，回答两个经典问题——"什么时候 table 才是 table"与"页脚为什么可以信息密集却不乱"。',
    items:[
      '吃透 table 家族：table / thead / tbody / tr / th / td 的语义分工',
      'table 的使用边界：数据表格 vs 布局滥用的历史教训',
      'footer + nav + 多列链接组（Grid 实战回环）',
      '小字层级：页脚的信息密度与排版纪律',
      '完成 Coding Challenge：规格对比表 + 完整页脚'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · Stage 12：没有对比，没有收尾', dark:true, blank:'（用户想比较参数——只能凭记忆；想找链接——无处可去）' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · Stage 13：对比表 + 页脚', dark:true, blank:'table（18 Pro vs Duo 规格对比）＋ footer（三列链接 + 版权行）' },
    caption:'对比表帮用户做决定（转化的临门一脚）；页脚是全站的"目录与法律收尾"。两者都是信息密集区——层级纪律是唯一的救生索。' },

  { type:'observe', title:'Observe Apple 对比与页脚', img:'curriculum/reference/18pro-hero-desktop.png',
    imgCap:'对比区与页脚在首屏截图之外——以下是 Stage 0 解剖的实测结论（a11y 树 + 结构抓取）。',
    items:[
      { q:'Apple 的对比区长什么样？', a:'实测：机型对比是卡片式并排（18 Pro vs Duo）+ 规格行；标题"看看哪款 iPhone 适合你"。教学版用标准 table 实现——语义更朴素，信息等价（教学简化）。' },
      { q:'页脚有多少链接？', a:'实测：站点地图五组（选购及了解/Apple 钱包/账户/娱乐…）+ 脚注 + 版权行。信息极密但分组清晰。' },
      { q:'页脚的链接组用了什么结构？', a:'实测：每组是 heading + 链接列表组合——Stage 6 的导航语义在页脚的复用（导航是职责不是位置）。' },
      { q:'脚注怎么组织？', a:'实测：星号上标链接到脚注编号 + 底部小字区。法律与条件信息"在但低调"——小字层级（12px 级灰字）。' }
    ]},

  { type:'taglab', title:'Tag Lab · 表格家族与 footer', lead:'table 家族六件套 + footer。它们的语义分工精细——缺一层，读屏器的"表格模式"就失灵一层。',
    tags:[
    { tag:'<table>', cn:'数据表格', one:'二维数据的正统容器：行与列有真实含义时才用它。',
      what:'数据表容器：内部必须按 tr（行）组织，行内是 th/td（单元格）。',
      why:'读屏器有"表格模式"：按行列导航、播报表头关系——div 拼的假表格没有这些能力。',
      where:'需要呈现二维数据的位置：规格对比、价目表、时刻表。',
      inside:'可选 thead/tbody/tfoot + tr。',
      min:'<table>\n  <thead>\n    <tr><th></th><th>18 Pro</th><th>Duo</th></tr>\n  </thead>\n  <tbody>\n    <tr><th>屏幕</th><td>6.9 英寸</td><td>7.6 英寸</td></tr>\n  </tbody>\n</table>',
      apple:'实测（教学对照）：Apple 的对比区用卡片+规格行实现——视觉更像"并排卡片"。我们用语义 table 教学：结构与无障碍更直白（教学简化，信息等价）。',
      hero:'你的对比表呈现"18 Pro vs Duo"核心规格——屏幕/芯片/电池三行。',
      vs:'table vs div+CSS 网格：数据有行列语义用 table；纯视觉排布用 CSS。反过来：拿 table 排版页面布局是上世纪的黑魔法——语义全毁。',
      errs:'table 做页面布局；表格没有表头（读屏器不知道每列是什么）；tbody 直接包文字（结构违法）。',
      try:'"商品列表想三列摆放"该用 table 吗？（不该——那是布局，用 Grid。"三列价格对比数据"才用 table。）' },
    { tag:'<tr> / <th> / <td>', cn:'行与单元格', one:'tr 是行；th 是表头单元格（语义标题）；td 是数据单元格。',
      what:'行内单元格：th 声明"这一行/列的标题"，td 装数据。th 的 scope 属性（row/col）明确表头方向。',
      why:'读屏器靠 th+scope 建立单元格的"坐标"：第 2 行第 3 列 = "Duo 的屏幕"。',
      where:'thead/tbody 内。',
      inside:'th/td 里可以是任意流内容。',
      min:'<tr>\n  <th scope="row">芯片</th>\n  <td>A20 Pro</td>\n  <td>A20 Pro</td>\n</tr>',
      apple:'（教学对照）规格行的"属性名 | 值A | 值B"结构一致——th 承担属性名。',
      hero:'每行规格：th scope="row" 属性名 + 两个 td 值。',
      vs:'th vs td：标题 vs 数据。scope="row" vs "col"：本行的表头还是本列的表头。',
      errs:'全 td 无 th（表头信息丢失）；用 CSS 加粗的 td 冒充 th（语义假）。',
      try:'对比表第一行（机型名）的单元格应该是什么？（th scope="col"——它们是列标题。）' },
    { tag:'<thead> / <tbody>', cn:'表区结构', one:'表格的"表头区"与"数据区"：吸顶表头、打印重复表头都靠它。',
      what:'thead 包表头行（列名行），tbody 包数据行。浏览器自动把裸 tr 归入 tbody。',
      why:'结构化后：CSS 可以只固定 thead；读屏器区分"列名"与"数据"。',
      where:'table 内。thead 最多一个，tbody 可多个。',
      inside:'tr。',
      min:'<table>\n  <thead>…列名行…</thead>\n  <tbody>…数据行…</tbody>\n</table>',
      apple:'（通用规范）长规格表的吸顶表头就是 thead 的功劳。',
      hero:'你的表：thead = 机型名行；tbody = 规格行们。',
      vs:'thead vs 首行 tr：thead 是"区"的声明；没有它，首行只是普通行。',
      errs:'把列名行写进 tbody（区结构失真）；thead 里放数据。',
      try:'对比表的"屏幕/芯片/电池"行属于 thead 还是 tbody？（tbody——它们是数据行。）' },
    { tag:'<footer>', cn:'页脚区域', one:'页面或区块的收尾结构：站点地图、法律信息、版权。',
      what:'与 header 对称的收尾语义容器。页面级 footer = 站点页脚。',
      why:'读屏器用户可以一键跳到页脚找"全站链接与版权"——结构即导航。',
      where:'body 末尾（页面级）；article 内（文章级收尾）。',
      inside:'nav（链接组）、小字段落、版权。',
      min:'<footer>\n  <nav>…链接组…</nav>\n  <p><small>© 2026 …</small></p>\n</footer>',
      apple:'实测：Apple 页脚 = 多组标题+链接 + 法务小字 + 版权行——正是 footer > (nav 组们 + small) 的结构。',
      hero:'你的页脚：三列链接组（Grid 排）+ 版权 small。',
      vs:'footer vs 页脚 div：语义差一层"收尾区域"的声明。footer vs header：开头与收尾，对称的结构角色。',
      errs:'把主要内容塞进 footer；页脚链接组不用 nav（它们是全站导航！Stage 6 的"导航是职责"回环）。',
      try:'页脚里的"选购 iPhone"链接组算 nav 吗？（算——它就是全站导航的一部分。）' }
    ]},

  { type:'tablelab', title:'Table Lab · 语义排布现场', lead:'一个结构完整的对比表。展开看每层的职责标注；再用开关体验"没有 th 的表格"对读屏器意味着什么。' },

  { type:'design', title:'Design Challenge · 密集信息的秩序', lead:'信息越密，层级越重要。两道判断。',
    questions:[
      { q:'Q1 · 同一张对比表，哪个更"可扫读"？',
        a:{ label:'版本 A', body:'<div style="background:#101014;border-radius:10px;padding:14px"><table style="width:100%;border-collapse:collapse;font-size:12px;color:#f5f5f7"><tr><td></td><td style="padding:6px;font-weight:700">18 Pro</td><td style="padding:6px;font-weight:700">Duo</td></tr><tr><td style="padding:6px;color:#86868b">屏幕</td><td style="padding:6px;border-top:1px solid #2c2c31">6.9″</td><td style="padding:6px;border-top:1px solid #2c2c31">7.6″</td></tr><tr><td style="padding:6px;color:#86868b">芯片</td><td style="padding:6px;border-top:1px solid #2c2c31">A20 Pro</td><td style="padding:6px;border-top:1px solid #2c2c31">A20 Pro</td></tr></table></div>' },
        b:{ label:'版本 B', body:'<div style="background:#101014;border-radius:10px;padding:14px"><table style="width:100%;border-collapse:collapse;font-size:12px;color:#f5f5f7"><tr><td style="padding:6px">屏幕</td><td style="padding:6px">6.9″</td><td style="padding:6px">7.6″</td></tr><tr><td style="padding:6px">芯片</td><td style="padding:6px">A20 Pro</td><td style="padding:6px">A20 Pro</td></tr><tr><td style="padding:6px">电池</td><td style="padding:6px">43h</td><td style="padding:6px">44h</td></tr></table></div>' },
        correct:'a',
        analysis:'A 胜。属性列弱化（灰）、机型列加粗、行分隔线——三条视觉规则让眼睛可以"竖着扫一列"。B 所有单元格同权重：每次对比都要逐格找。',
        principle:'P17 Consistency Is a System' },
      { q:'Q2 · 页脚链接组，哪个更专业？',
        a:{ label:'版本 A', body:'<div style="background:#f5f5f7;border-radius:10px;padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:12px"><div><p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#1d1d1f">选购</p><p style="margin:0;font-size:10.5px;color:#6e6e73;line-height:1.8">iPhone · Mac · iPad</p></div><div><p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#1d1d1f">服务</p><p style="margin:0;font-size:10.5px;color:#6e6e73;line-height:1.8">AppleCare · 支持</p></div></div>' },
        b:{ label:'版本 B', body:'<div style="background:#f5f5f7;border-radius:10px;padding:14px"><p style="margin:0;font-size:10.5px;color:#6e6e73;line-height:2">iPhone · Mac · iPad · AppleCare · 支持 · 隐私 · 法务 · 商店</p></div>' },
        correct:'a',
        analysis:'A 胜。分组标题 + 列式排布：密集但有序（Grid 回环）。B 一锅粥——信息没变，秩序全无。页脚的克制不等于糊成一团。',
        principle:'P17 Consistency Is a System' }
    ]},

  { type:'challenge', title:'Coding Challenge · 规格对比表 + 页脚',
    task:'构建收尾双模块：① section：table——thead（机型名两列 th scope="col"）+ tbody 三行（屏幕/芯片/电池，属性名 th scope="row"）；② footer：nav 内含链接组（h4 + ul > li > a，至少 4 个链接）+ 版权 small；③ table 有基础样式（border-collapse、单元格 padding）；④ footer 多列用 grid。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; padding: 50px 40px; }\n  h2 { font-size: 32px; font-weight: 600; margin: 0 0 20px; }\n  /* TODO 1: table 基础样式——border-collapse: collapse + 单元格 padding */\n\n  th, td { text-align: left; font-size: 14px; }\n  thead th { font-weight: 700; }\n  tbody th { color: #86868b; font-weight: 500; }\n  /* TODO 2: footer——grid 多列 + 链接样式 + small 版权 */\n\n</style>\n</head>\n<body>\n  <main>\n    <h2>看看哪款适合你</h2>\n    <!-- TODO 3: table：thead(机型名列) + tbody(屏幕/芯片/电池) -->\n\n  </main>\n  <!-- TODO 4: footer：nav 链接组(h4+ul) + small 版权 -->\n\n</body>\n</html>',
    checks:[
      { label:'table 存在且含 thead + tbody', js:'doc && doc.querySelector("table thead") && doc.querySelector("table tbody")' },
      { label:'列标题是 th scope="col"（≥2 个）', js:'(function(){ if(!doc) return false; return doc.querySelectorAll("thead th[scope=col]").length >= 2; })()' },
      { label:'行标题是 th scope="row"（≥3 个）', js:'(function(){ if(!doc) return false; return doc.querySelectorAll("tbody th[scope=row]").length >= 3; })()' },
      { label:'数据行齐全（tr ≥ 3，含屏幕/芯片/电池）', js:'(function(){ if(!doc) return false; var t = (doc.querySelector("table tbody") || {}).textContent || ""; return doc.querySelectorAll("table tbody tr").length >= 3 && t.indexOf("屏幕") >= 0 && /芯片|A20/.test(t) && /电池|续航|小时/.test(t); })()' },
      { label:'表格有样式（border-collapse）', js:'(function(){ if(!doc) return false; var t = doc.querySelector("table"); return !!t && win.getComputedStyle(t).borderCollapse === "collapse"; })()' },
      { label:'footer 存在且内含 nav 或链接组', js:'(function(){ if(!doc) return false; return !!doc.querySelector("footer nav") || (!!doc.querySelector("footer") && !!doc.querySelector("footer ul")); })()' },
      { label:'页脚链接 ≥ 4 个', js:'(function(){ if(!doc) return false; return doc.querySelectorAll("footer a").length >= 4; })()' },
      { label:'版权信息存在（small 或 © 文本）', js:'(function(){ if(!doc) return false; var f = doc.querySelector("footer"); return !!f && (!!f.querySelector("small") || f.textContent.indexOf("©") >= 0); })()' }
    ],
    hints:[
      '表格骨架：table > thead > tr > (th 空 + th scope=col ×2)；tbody > 3 × (tr > th scope=row + td ×2)。',
      '表格样式两行：table { border-collapse: collapse } th, td { padding: 10px 14px }。',
      '页脚骨架：footer > nav > (div 组们：h4 + ul > li > a) + small©。多列排布用 grid（Stage 10 回环）。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; padding: 50px 40px; }\n  h2 { font-size: 32px; font-weight: 600; margin: 0 0 20px; }\n  table { width: 100%; border-collapse: collapse; }\n  th, td { text-align: left; font-size: 14px; padding: 12px 14px; border-bottom: 1px solid #2c2c31; }\n  thead th { font-weight: 700; }\n  tbody th { color: #86868b; font-weight: 500; }\n  footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid #2c2c31; }\n  .foot-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }\n  .foot-grid h4 { font-size: 13px; margin: 0 0 8px; }\n  .foot-grid ul { list-style: none; margin: 0; padding: 0; }\n  .foot-grid a { color: #86868b; font-size: 13px; text-decoration: none; line-height: 2; }\n  .foot-grid a:hover { color: #f5f5f7; }\n  footer small { display: block; margin-top: 26px; color: #6e6e73; font-size: 11.5px; }\n</style>\n</head>\n<body>\n  <main>\n    <h2>看看哪款适合你</h2>\n    <table>\n      <thead>\n        <tr>\n          <th></th>\n          <th scope="col">iPhone 18 Pro</th>\n          <th scope="col">iPhone Duo</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr><th scope="row">屏幕</th><td>6.9 英寸</td><td>7.6 英寸可折叠</td></tr>\n        <tr><th scope="row">芯片</th><td>A20 Pro</td><td>A20 Pro</td></tr>\n        <tr><th scope="row">电池</th><td>视频播放最长 43 小时</td><td>外屏 44 小时</td></tr>\n      </tbody>\n    </table>\n  </main>\n  <footer>\n    <nav>\n      <div class="foot-grid">\n        <div><h4>选购</h4><ul><li><a href="#">iPhone</a></li><li><a href="#">Mac</a></li><li><a href="#">配件</a></li></ul></div>\n        <div><h4>服务</h4><ul><li><a href="#">AppleCare</a></li><li><a href="#">分期</a></li><li><a href="#">换购</a></li></ul></div>\n        <div><h4>价值观</h4><ul><li><a href="#">环境</a></li><li><a href="#">隐私</a></li><li><a href="#">无障碍</a></li></ul></div>\n      </div>\n    </nav>\n    <small>© 2026 我的前端教室 · 保留所有权利 · 仅供学习</small>\n  </footer>\n</body>\n</html>' },

  { type:'debug', title:'Debug Challenge · 假表格与裸页脚',
    story:'这份"对比表+页脚"全是语义事故：表格用 div 拼（读屏器表格模式失效）、无表头、页脚是裸链接堆、没有版权信息。Run → 修 → 检查。',
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; padding: 40px; }\n  .row { display: flex; gap: 20px; padding: 8px 0; border-bottom: 1px solid #2c2c31; }\n  .cell { width: 120px; font-size: 14px; }\n</style>\n</head>\n<body>\n  <main>\n    <h2>看看哪款适合你</h2>\n    <div class="table">\n      <div class="row"><div class="cell"></div><div class="cell">18 Pro</div><div class="cell">Duo</div></div>\n      <div class="row"><div class="cell">屏幕</div><div class="cell">6.9 英寸</div><div class="cell">7.6 英寸</div></div>\n      <div class="row"><div class="cell">芯片</div><div class="cell">A20 Pro</div><div class="cell">A20 Pro</div></div>\n      <div class="row"><div class="cell">电池</div><div class="cell">43 小时</div><div class="cell">44 小时</div></div>\n    </div>\n  </main>\n  <div class="foot">\n    <a href="#">iPhone</a>\n    <a href="#">Mac</a>\n    <a href="#">隐私</a>\n    <a href="#">法务</a>\n  </div>\n</body>\n</html>',
    checks:[
      { label:'div 假表格改为真 table（tr ≥ 4）', js:'(function(){ if(!doc) return false; return !!doc.querySelector("table") && doc.querySelectorAll("table tr").length >= 4; })()' },
      { label:'thead/tbody 结构存在', js:'!!(doc && doc.querySelector("table thead") && doc.querySelector("table tbody"))' },
      { label:'表头 th + scope 语义（col ≥2 / row ≥3）', js:'(function(){ if(!doc) return false; return doc.querySelectorAll("th[scope=col]").length >= 2 && doc.querySelectorAll("th[scope=row]").length >= 3; })()' },
      { label:'页脚改为 footer > nav/ul 结构', js:'!!(doc && doc.querySelector("footer") && (doc.querySelector("footer nav") || doc.querySelector("footer ul")))' },
      { label:'页脚链接 ≥ 4 个', js:'(function(){ if(!doc) return false; return doc.querySelectorAll("footer a").length >= 4; })()' },
      { label:'版权信息存在', js:'(function(){ if(!doc) return false; var f = doc.querySelector("footer"); return !!f && (!!f.querySelector("small") || f.textContent.indexOf("©") >= 0); })()' }
    ],
    hints:[
      '翻译练习：.table→table，.row→tr，首行 cell→th scope=col，属性名 cell→th scope=row，数据 cell→td。',
      '页脚三件：footer 容器 + nav（链接组）+ small©。别忘了 Stage 6 的教训：链接组是导航。',
      '表格样式可以复用 div 版的 border-bottom 思路——th, td { padding; border-bottom }。'
    ],
    cause:'完整病因单——<b>假表格</b>：① div 拼表格——读屏器表格模式完全失效（行列关系无从播报）；② 无 th/scope——单元格失去"坐标"；③ 无 thead/tbody——区结构缺失；<b>裸页脚</b>：④ 链接堆无 footer/nav 语义（全站导航的职责声明丢失）；⑤ 无版权信息（收尾不完整）。修复 = div→table 全家桶 + footer>nav>+small。' },

  { type:'quiz', title:'Quiz · 表格与页脚七连问', questions:[
      { q:'table 的正当用途是？',
        options:['页面三栏布局','二维数据的呈现（行列有真实含义）','图片排版','一切并排内容'], answer:1,
        explain:'数据表格用 table；布局用 CSS（Grid/Flex）——这是语义边界。' },
      { q:'th 与 td 的区别是？',
        options:['粗细不同','th 是表头单元格（有语义），td 是数据单元格','td 更大','没有区别'], answer:1,
        explain:'th 自带"标题"语义；用 CSS 加粗的 td 是假表头。' },
      { q:'scope="row" 声明的是？',
        options:['这个表头属于所在行','跨多行','行高','行间距'], answer:1,
        explain:'scope 告诉读屏器：这个 th 是本行（或本列）的标题。' },
      { q:'thead 的价值是？',
        options:['没有价值','结构化表头区：吸顶/打印重复/读屏器区分都靠它','让表格变宽','必须有两个'], answer:1,
        explain:'区结构是表格工程能力的地基。' },
      { q:'页脚的链接组应该包在？',
        options:['div','nav（导航是职责不是位置）','main','随便什么'], answer:1,
        explain:'Stage 6 的原则回环：它们是全站导航。' },
      { q:'版权行的常用元素是？',
        options:['h1','small 或普通 p + © 文本','strong','table'], answer:1,
        explain:'小字语义 + 低音量样式——法律信息"在但低调"。' },
      { q:'Apple 页脚信息极密却不乱，靠的是？',
        options:['字号更小','分组（标题+链接组）+ 多列 Grid + 统一小字层级','更多颜色','随机排布'], answer:1,
        explain:'密度不是问题，秩序才是答案（P17）。' }
    ]},

  { type:'checklist', title:'验收 Checklist', items:[
      '我能说出 table 的正当用途与布局滥用的边界',
      '我会搭 thead/tbody + th scope 的完整语义表格',
      '我知道 th 和 td 的语义区别',
      '页脚链接组包在 nav 里（Stage 6 回环）',
      '我的页脚有版权 small/© 信息',
      '我能用 Grid 排页脚多列（Stage 10 回环）',
      '我完成了 Coding Challenge（8 项结构判分全过）',
      '我完成了 Debug Challenge（假表格与裸页脚修复）'
    ]},

  { type:'milestone' },

  { type:'summary', title:'本关总结', points:[
      ['表格', 'table>thead/tbody>tr>th/td 全家桶——读屏器表格模式的地基'],
      ['边界', '数据表用 table；布局永远用 CSS'],
      ['页脚', 'footer > nav 链接组 + small©——收尾即导航'],
      ['设计', '密集信息的秩序：分组 + 列式 + 小字层级（P17）']
    ],
    next:{ stage:'stage-14', text:'Stage 14：响应式系统与 Final Integration——Project A 毕业' } }
]},

/* ---------- Stage 14 ---------- */
{ id:'stage-14', num:14, title:'响应式系统 · Final Integration', short:'响应式毕业', status:'ready', minutes:'240–320 min',
  blocks:[
  { type:'goals', title:'本关目标', lead:'毕业关。Stage 0～13 的所有知识在这一关汇成一个完整的响应式页面：Hero、导航、子导航、模块、视频、卡片、颜色选择器、滚动显现、对比表、页脚。你将建立自己的断点系统、完成 Final Reconstruction，并通过 Project A Audit。',
    items:[
      '媒体查询体系：mobile-first vs desktop-first 的取舍、断点怎么定',
      '把 5 个模块的响应式行为统一到一套断点（734px 主断点 + 微调档）',
      'Final Reconstruction：把全部模块整合成一个完整页面',
      'Project A Audit：12 项自查（语义/响应式/无障碍/性能/构图…）',
      '毕业：Knowledge Map + Skill Map 回顾整个 Project A'
    ]},

  { type:'effect', title:'最终效果',
    before:{ tab:'iPhone 18 Pro 复刻练习', note:'BEFORE · 分散的模块们', dark:true, blank:'（每关一个 Demo——还没有"一个页面"）' },
    after:{ tab:'iPhone 18 Pro 复刻练习', note:'AFTER · 完整响应式页面', dark:true, blank:'nav + subnav + Hero + 模块×3 + 视频 + 卡片 + 对比表 + 页脚 @390/768/1440' },
    caption:'Project A 的终点：一个可以从 390px 平滑拉到 1440px 的完整产品页。它不是 Apple 的副本——是"按 Apple 的原则重建的教学实现"。' },

  { type:'csslab', title:'CSS Lab · 响应式系统五件', lead:'断点系统不是"多写几个 @media"，而是一套全局约定。',
    props:[
    { name:'@media', cn:'媒体查询',
      what:'按条件应用样式：宽度、方向、悬停能力、减弱动效……响应式的语法载体。',
      def:'all（无条件生效）。',
      min:'@media (max-width: 734px) {\n  .module-flex { flex-direction: column; }\n}',
      apple:'实测断点（通用惯例对照）：Apple 的资源按宽度分档；我们教学统一主断点 734px（手机/平板分界）+ 1068px 次断点。',
      gone:'没有媒体查询：桌面布局硬塞给手机——横向滚动 + 字小如蚁。',
      exp:'Responsive Simulator 四档切换。',
      try:'数一数你页面里已经出现过多少个 734px？（picture 的 media、模块堆叠……统一它们！）' },
    { name:'mobile-first', cn:'移动优先策略',
      what:'先写手机样式（默认态），再用 min-width 向上增强——而不是写完桌面再用 max-width 打补丁。',
      def:'——策略而非属性。',
      min:'/* 默认 = 手机 */\n.module-flex { flex-direction: column; }\n/* 平板以上 */\n@media (min-width: 735px) {\n  .module-flex { flex-direction: row; }\n}',
      apple:'（工程惯例推测）移动流量为主的今天，mobile-first 是主流策略；Apple 各断点行为与该思路一致。',
      gone:'desktop-first 的 max-width 补丁越叠越多，最后没人敢删。',
      exp:'Simulator 里从 390 逐步拉宽——观察"增强"而非"修复"。',
      try:'你的模块 CSS 已经是 column 默认 + row 媒体查询——恭喜，你早就写出了 mobile-first。' },
    { name:'断点系统', cn:'breakpoints',
      what:'全站统一的"布局切换宽度"。少而稳：主断点 734px（单列→多列）+ 次断点 1068px（容器加宽）。',
      def:'——约定而非属性。',
      min:'/* 全站只有两个断点 */\n@media (min-width: 735px) { … }\n@media (min-width: 1069px) { … }',
      apple:'实测对照：picture 的 734px 分界 + 资源 large/medium 分档——断点思想一致（具体值属其内部）。',
      gone:'每个组件自定断点（640/700/720…）——响应式行为互相打架。',
      exp:'Simulator 在 734 两侧反复横跳，观察所有模块"同时"切换。',
      try:'断点数量纪律：能两个就别三个——每个断点都是双倍的测试成本。' },
    { name:'响应式间距', cn:'spacing scale',
      what:'间距随断点缩放：桌面 160px 级 section 间距 → 手机 64~80px 级。',
      def:'——约定而非属性。',
      min:'.section {\n  padding: 64px 22px;\n}\n@media (min-width: 735px) {\n  .section { padding: 120px 40px; }\n}',
      apple:'实测（Stage 0）：ps-spacing-large-160 / medium-128 / small-0——类名 token 是 160，但 1440px 下实际计算值约 144（Apple 用了缩放系数）。教学取 token 数值即可。',
      gone:'桌面间距原样搬到手机：模块被推到天边。',
      exp:'Simulator 观察 section 间距在档位间的变化。',
      try:'建立你自己的三档间距表：64 / 96 / 144（举例）——写进注释，全站遵守。' },
    { name:'overflow 调试', cn:'横向溢出排查',
      what:'响应式第一大事故：页面出现横向滚动。排查法：DevTools 逐层找"超出视口宽"的元素。',
      def:'visible。',
      min:'/* 三大常见元凶 */\n/* 1. 固定宽度：width: 1300px → max-width: 100% */\n/* 2. 负 margin / 绝对定位溢出 */\n/* 3. 忘记 box-sizing: border-box */',
      apple:'Apple 在任意宽度下零横向滚动——这是响应式的底线纪律。',
      gone:'——它就是"事故"本身。',
      exp:'Simulator 390 档检查：本页（整个学习平台）也无横向滚动。',
      try:'排查口诀：先二分（删一半样式看谁溢出）再定位；99% 是固定宽度或没算上 padding。' }
    ]},

  { type:'simulator', title:'Responsive Simulator · 四档巡检', lead:'一个浓缩版"复刻页面"（Hero+模块+卡片+页脚）放进可调视口。在 390 / 768 / 1024 / 1440 四档巡检：断点切换、堆叠、间距、溢出。' },

  { type:'final', title:'Final Reconstruction · 我的 iPhone 18 Pro 页面', lead:'这就是你亲手重建的完整 iPhone 18 Pro 教学页面。可以预览、编辑源码、下载保存到 project/ 目录。不是 Apple 官方源码——是你从 Stage 0 开始每关成果的集成。' },

  { type:'challenge', title:'Coding Challenge · 毕业挑战：断点切换',
    task:'毕业级挑战：让 .module-flex 在手机（≤734px）堆叠成单列，在桌面（≥735px）并排两列。写基础样式（flex + column 默认态）与一条 @media (min-width:735px)。判分器会把预览分别在 390px 与 900px 宽度下真实求值（预览为全宽，媒体查询可真实触发）。',
    tallFrame:true, wideFrame:true, script:true,
    starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; padding: 30px 20px; }\n  .module-flex {\n    display: flex;\n    gap: 24px;\n    /* TODO: 默认 column（手机优先），桌面再切 row */\n  }\n  .col { flex: 1; background: #1d1d1f; border-radius: 12px; padding: 18px; }\n  .col h3 { margin: 0 0 6px; font-size: 17px; }\n  .col p { margin: 0; font-size: 13px; color: #86868b; line-height: 1.6; }\n  /* TODO: @media (min-width: 735px) 里切换为 row */\n\n</style>\n</head>\n<body>\n  <div class="module-flex">\n    <div class="col"><h3>2 纳米芯旗舰</h3><p>A20 Pro 采用 2 纳米制程，性能与能效均创 iPhone 新高。</p></div>\n    <div class="col"><h3>续航大进化</h3><p>视频播放最长可达 43 小时，告别电量焦虑。</p></div>\n  </div>\n</body>\n</html>',
    checks:[
      { label:'容器为 flex 两列结构', js:'(function(){ if(!doc) return false; var f = doc.querySelector(".module-flex"); return !!f && win.getComputedStyle(f).display === "flex"; })()' },
      { label:'手机宽度（390px）下模块堆叠为单列', width:'390', js:'(function(){ if(!doc) return false; var f = doc.querySelector(".module-flex"); if(!f) return false; var cs = win.getComputedStyle(f); var kids = [].slice.call(f.children).map(function(c){ return c.getBoundingClientRect(); }); return cs.flexDirection === "column" || kids[1].top >= kids[0].bottom - 1; })()' },
      { label:'桌面宽度（900px）下模块并排两列', width:'900', js:'(function(){ if(!doc) return false; var f = doc.querySelector(".module-flex"); if(!f) return false; var cs = win.getComputedStyle(f); var kids = [].slice.call(f.children).map(function(c){ return c.getBoundingClientRect(); }); return cs.flexDirection === "row" || kids[1].left >= kids[0].right - 2; })()' },
      { label:'存在 735px 断点媒体查询', js:'(function(){ if(!doc) return false; var st = [].slice.call(doc.querySelectorAll("style")).map(function(x){ return x.textContent; }).join(""); return /@media[^{]*735px/.test(st.replace(/\s+/g, "")); })()' },
      { label:'内容完整（两个模块均有标题与文字）', js:'(function(){ if(!doc) return false; var h = doc.querySelectorAll(".col h3, h3"); var p = doc.querySelectorAll(".col p, p"); return h.length >= 2 && p.length >= 2; })()' }
    ],
    hints:[
      'mobile-first 写法：基础样式写 column（手机），再 @media (min-width: 735px) 切 row。',
      '两列并排 = .module-flex { flex-direction: row } + 子元素各 flex:1（子元素已有 flex:1）。',
      '判分器会真的把预览调到 390px 和 900px 分别求值——写完点检查，观察两次求值结果。'
    ],
    answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, "PingFang SC", sans-serif; padding: 30px 20px; }\n  .module-flex {\n    display: flex;\n    flex-direction: column;\n    gap: 24px;\n  }\n  @media (min-width: 735px) {\n    .module-flex { flex-direction: row; }\n  }\n  .col { flex: 1; background: #1d1d1f; border-radius: 12px; padding: 18px; }\n  .col h3 { margin: 0 0 6px; font-size: 17px; }\n  .col p { margin: 0; font-size: 13px; color: #86868b; line-height: 1.6; }\n</style>\n</head>\n<body>\n  <div class="module-flex">\n    <div class="col"><h3>2 纳米芯旗舰</h3><p>A20 Pro 采用 2 纳米制程，性能与能效均创 iPhone 新高。</p></div>\n    <div class="col"><h3>续航大进化</h3><p>视频播放最长可达 43 小时，告别电量焦虑。</p></div>\n  </div>\n</body>\n</html>' },

  { type:'audit', title:'Project A Audit · 十二项毕业自查', lead:'逐项展开：每一项给出"教学实现做到了什么程度 + 你自己的页面该查什么"。Pass / Needs Review 由你判定——这是你未来每个项目的通用自查清单。' },

  { type:'skillmap', title:'Skill Map · 能力清单（覆盖 vs 掌握）', lead:'"课程已覆盖"是平台的状态；"已掌握"必须由你的正式学习与自评产生。六组 24 项能力，逐组对照。' },

  { type:'knowmap', title:'Knowledge Map · Project A 知识地图', lead:'Stage 0～14 覆盖的全部知识点，按 HTML / CSS / JS / Design 四域组织。点击节点跳回对应关卡（学习进度保持你的真实状态）。' },

  { type:'design', title:'Design Challenge · 毕业判断', lead:'最后三道综合判断——它们没有唯一答案，但有"是否成立"。',
    questions:[
      { q:'Q1 · 断点策略：哪种更可维护？',
        a:{ label:'策略 A', body:'<div style="background:#101014;border-radius:10px;padding:14px;font-family:var(--mono);font-size:11.5px;color:#a1a1a6;line-height:1.9">/* 全站统一 */<br>@media (min-width:735px){…}<br>@media (min-width:1069px){…}</div>' },
        b:{ label:'策略 B', body:'<div style="background:#101014;border-radius:10px;padding:14px;font-family:var(--mono);font-size:11.5px;color:#a1a1a6;line-height:1.9">/* 每个组件自定 */<br>.hero: 640/900/1200<br>.cards: 700/960<br>.footer: 660/880/1100</div>' },
        correct:'a',
        analysis:'A 胜。断点是全站约定：一处定义，所有模块在同一宽度"整齐地"切换。B 的页面会在 640~1200 之间"各切各的"——像没对齐的拉链。',
        principle:'P17 Consistency Is a System' },
      { q:'Q2 · 手机端模块堆叠后，图文顺序应该？',
        a:{ label:'版本 A', body:'<div style="background:#101014;border-radius:10px;padding:14px"><p style="margin:0 0 6px;font-size:12px;color:#f5f5f7;font-weight:600">标题 → 文字 → 图</p><p style="margin:0;font-size:11px;color:#86868b">先读懂主题，再看视觉（order 调整）</p></div>' },
        b:{ label:'版本 B', body:'<div style="background:#101014;border-radius:10px;padding:14px"><p style="margin:0 0 6px;font-size:12px;color:#f5f5f7;font-weight:600">图 → 标题 → 文字 → 图 → 标题…</p><p style="margin:0;font-size:11px;color:#86868b">桌面 DOM 原样堆叠（图在 DOM 前时文字被压后）</p></div>' },
        correct:'a',
        analysis:'A 胜。堆叠后阅读顺序 = 语义顺序：标题先行的模块用 order 把图挪到文字后。B 是"DOM 顺序决定论"——桌面好看，手机灾难（Stage 8 的 order 知识回环）。',
        principle:'P16 Alternating Rhythm Creates Flow' },
      { q:'Q3 · 页面 390px 下出现横向滚动，第一反应是？',
        a:{ label:'反应 A', body:'<div style="background:#101014;border-radius:10px;padding:14px"><p style="margin:0;font-size:12px;color:#f5f5f7">系统排查：固定宽度？负 margin？box-sizing？二分定位元凶</p></div>' },
        b:{ label:'反应 B', body:'<div style="background:#101014;border-radius:10px;padding:14px"><p style="margin:0;font-size:12px;color:#f5f5f7">body { overflow-x: hidden } 盖住它</p></div>' },
        correct:'a',
        analysis:'A 胜。overflow-x:hidden 是"把温度计扔掉"——内容还在溢出，只是看不见（被裁掉的部分永远丢失）。A 的排查法来自 Stage 4/5 的真实伤疤。',
        principle:'P03 Craft in the Invisible' }
    ]},

  { type:'design2', title:'Design Trade-off · 双合理判断', lead:'以下每道题的两个方案都可以成立。关键不是选对，而是你能说清"在什么条件下选哪个"。选完展开理由维度自查。',
    questions:[
      { q:'Q1 · 一个 SaaS 产品的 Hero：品牌型 vs 转化型，哪个更合适？',
        a:{ label:'品牌型（大留白 + 一句主张）', body:'<div style="background:#0a0a0a;border-radius:10px;padding:28px;text-align:center"><p style="margin:0;font-size:22px;font-weight:600;color:#fff">让数据为你工作</p><p style="margin:6px 0 0;font-size:12px;color:#86868b">申请试用</p></div>', when:'适合：品牌认知阶段、流量来自口碑、产品需要建立信任感。' },
        b:{ label:'转化型（功能截图 + 表单）', body:'<div style="background:#f8f8f8;border-radius:10px;padding:18px;display:flex;gap:12px;align-items:center"><div style="flex:1.3"><p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#1d1d1f">让数据为你工作</p><p style="margin:0 0 8px;font-size:11px;color:#6e6e73">14 天免费试用 · 无需信用卡</p><div style="background:#0071e3;color:#fff;font-size:11px;border-radius:6px;padding:5px 14px;display:inline-block">开始使用</div></div><div style="flex:1;background:#dde1e6;border-radius:6px;height:56px"></div></div>', when:'适合：付费搜索流量、竞品对比阶段、用户已知道自己要什么。' },
        analysis:'两个都合理——取决于流量来源和用户所处阶段。品牌型降低防线、建立信任；转化型缩短路径、提高即时转化。最好的做法是 A/B 测试而不是预判。' },
      { q:'Q2 · 一个开发者工具的文档页：深色 vs 浅色？',
        a:{ label:'深色主题', body:'<div style="background:#0d1117;border-radius:10px;padding:16px;font-family:var(--mono);font-size:11.5px;color:#c9d1d9"><span style="color:#7ee787">npm install</span> my-tool<br><span style="color:#79c0ff">import</span> { foo } <span style="color:#79c0ff">from</span> <span style="color:#a5d6ff">\'my-tool\'</span></div>', when:'适合：开发者在终端/IDE 里度过了大部分时间，暗色减少眼疲劳。代码示例更协调。' },
        b:{ label:'浅色主题', body:'<div style="background:#fff;border:1px solid #d0d7de;border-radius:10px;padding:16px;font-family:var(--mono);font-size:11.5px;color:#24292f"><span style="color:#cf222e">npm install</span> my-tool<br><span style="color:#cf222e">import</span> { foo } <span style="color:#cf222e">from</span> <span style="color:#0550ae">\'my-tool\'</span></div>', when:'适合：需要嵌入浅色官网、打印友好、与产品 UI 保持一致。' },
        analysis:'两个都合理——取决于文档页的使用场景（独立 docs 站 vs 嵌入官网）和目标用户的阅读环境。最好的做法是提供主题切换。' },
      { q:'Q3 · 户外景区导览屏的页面：深色大气 vs 浅色高对比？（照搬 Apple 风格在此场景可能是较差选择）',
        a:{ label:'深色大气（Apple 式）', body:'<div style="background:#000;border-radius:10px;padding:22px"><p style="margin:0 0 6px;font-size:20px;font-weight:600;color:#f5f5f7">山岳全景 · 一屏纵览</p><p style="margin:0;font-size:11px;color:#86868b">正午阳光直射的屏幕——但页面是暗的</p></div>', when:'适合：品牌宣传、室内展示。但与"强光下快速扫读"这一核心需求矛盾。' },
        b:{ label:'浅色高对比（户外工具风）', body:'<div style="background:#fff;border:2px solid #1a1a1a;border-radius:10px;padding:22px"><p style="margin:0 0 6px;font-size:20px;font-weight:800;color:#111">东山步道 · 步行约 40 分钟</p><p style="margin:0;font-size:11px;color:#333">缆车排队 15 分钟 · 16:30 后停止入园——阳光下依然一眼可读</p></div>', when:'适合：游客在强光环境下需要快速获取关键信息——页面用浅色高对比直接演示了它在阳光下的可用性。' },
        analysis:'B 更合适——不是"Apple 不好"，而是 Apple 的深色大气风格与"强光下快速扫读"这一核心需求相矛盾。页面视觉应该服务使用场景，而不是只追求氛围。原则服务场景，不是反过来。',
        principle:'P06 The Asset Is the Design（反例：素材与场景不符）' },
      { q:'Q4 · 医院急诊信息页：极简留白 + 单一 CTA vs 信息密度优先？',
        a:{ label:'极简留白', body:'<div style="background:#fff;border-radius:10px;padding:22px;text-align:center"><p style="margin:0 0 8px;font-size:18px;font-weight:600;color:#1d1d1f">我们在这里等你</p><p style="margin:0;font-size:11px;color:#6e6e73">立即就医</p></div>', when:'适合：品牌形象页。但急诊信息页的用户没心情欣赏留白——他们需要地址、电话、等待时间、科室指引。' },
        b:{ label:'信息密度优先', body:'<div style="background:#fff;border:1px solid #d0d7de;border-radius:10px;padding:14px"><p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#1d1d1f">急诊科 · 3 楼东翼</p><p style="margin:0;font-size:11.5px;color:#333;line-height:1.7">☎ 010-XXXX-XXXX<br>当前等待：约 45 分钟<br>24h · 无需预约<br><b>路线：</b>从正门右转→电梯→3楼</p></div>', when:'正确选择：用户在紧张状态下需要快速找到关键信息——电话、地址、等待时间。信息密度是急救。' },
        analysis:'B 更合适——急诊页面不是品牌页。用户在乎的是"地址在哪里、电话多少、等多久"。留白和极简在这样的场景里是失职，不是高级。P01（一个焦点）要服务用户需求，不能脱离场景。',
        principle:'P01 One Clear Visual Focus（反例：留白 ≠ 万能）' }
    ] },

  { type:'principles', title:'Design Principles · 全库回顾', lead:'Project A 收官：P01~P17 全部原则。它们是这门课真正的"知识结晶"——比任何标签都重要。' },

  { type:'quiz', title:'Quiz · 毕业九连问', questions:[
      { q:'mobile-first 的写法特征是？',
        options:['全部 max-width','默认态=手机样式，min-width 向上增强','只做手机','字号全部缩小'], answer:1,
        explain:'增强而非修复——CSS 会越写越少而不是越补越多。' },
      { q:'本课程的主断点是多少？',
        options:['320px','734px（+1068px 次断点）','1920px','每个组件自己定'], answer:1,
        explain:'与 picture 的分界一致——断点是全站约定。' },
      { q:'横向溢出的正确处理是？',
        options:['overflow-x:hidden 盖住','系统排查固定宽度/负 margin/box-sizing','缩小所有字号','删掉一个模块'], answer:1,
        explain:'盖住 = 内容被裁丢；找出元凶才是工程。' },
      { q:'响应式间距的缩放规律是？',
        options:['手机更宽','桌面大间距 → 手机收敛（如 160 → 64~80）','永远一样','手机更花'], answer:1,
        explain:'Apple 的 ps-spacing 三档体系就是为此而生。' },
      { q:'模块堆叠后，阅读顺序由谁决定？',
        options:['CSS 顺序','DOM 顺序 + 必要时 order 调整','随机','字号大小'], answer:1,
        explain:'堆叠顺序 = 语义顺序——桌面构图不能绑架手机阅读。' },
      { q:'Final Reconstruction 的定位是？',
        options:['像素级复制 Apple','按 Apple 原则重建的教学实现（结构/行为对应，非源码复制）','随便做做','只做手机版'], answer:1,
        explain:'复刻学的是原则与系统——不是抄袭代码。' },
      { q:'Project A Audit 里"无障碍"该查什么？',
        options:['不用查','lang/alt/焦点环/对比度/缩放/语义标签','只查颜色','只查字体'], answer:1,
        explain:'P03/P12 的全部落地项——看不见处最见功力。' },
      { q:'课程覆盖（Available）与个人掌握（Completed）的区别是？',
        options:['一回事','课程就绪是平台的状态；掌握是你真实完成学习后的状态','Completed 可以代打','Available 无意义'], answer:1,
        explain:'开发完成 ≠ 学习完成——你的进度永远真实。' },
      { q:'毕业之后，面对一个新产品官网，第一件事是？',
        options:['直接开写 CSS','回答 Stage 0 的老问题：它有哪些模块？每个模块的焦点/层级/响应策略是什么','先找素材','先买域名'], answer:1,
        explain:'从 Stage 0 的页面解剖开始——这就是"可迁移的能力"。' }
    ]},

  { type:'checklist', title:'验收 Checklist · 毕业清单', items:[
      '我建立了全站统一的断点系统（734 / 1068）',
      '我的 CSS 是 mobile-first（增强而非补丁）',
      '我有自己的响应式间距表',
      '我能在 390/768/1024/1440 四档巡检一个页面',
      '我能系统排查横向溢出（而不是 hidden 盖住）',
      '我把全部模块整合成了完整页面（Final Reconstruction）',
      '我完成了 12 项 Project A Audit 的自查',
      '我能背出 P01~P17 中至少 10 条原则',
      '我能向别人讲清"Course Available"与"My Completed"的区别',
      '我准备好用同样的方法开始 Project C（原创官网）'
    ]},

  { type:'milestone' },

  { type:'summary', title:'Project A 毕业', points:[
      ['完成', '14 关 · 从空白骨架到完整响应式页面'],
      ['能力', '语义结构 · Typography · 交互 · 媒体 · 布局 · JS · 动效 · 密集信息 · 响应式系统'],
      ['原则', 'P01~P17：可迁移到任何产品的设计系统'],
      ['下一步', 'Project B（Assisted 半独立）或直接 Project C（原创）——由你选择']
    ],
    next:{ stage:'stage-0', text:'🎉 Project A 全部课程制作完成——从 Stage 0 开始你的正式学习之旅' } }
]},
]},

/* ================= PROJECT B · iPhone Duo（Assisted Mode v2.0） ================= */
/* 模式转换：Guided（AI 先教）→ Assisted（先预测/决策/构建，AI 后揭示与校准）。
   不重复 Project A 基础教学；忘却用 Recall Card；帮助分三级并计入 Independence。 */
{ id:'B', name:'Project B · iPhone Duo', mode:'Assisted 半独立',
  stages:[
  { id:'b1', num:1, title:'Reverse Engineer the Duo Hero', short:'拆解 Hero', status:'ready', minutes:'120–160 min',
    blocks:[
    { type:'goals', title:'Mission 1 · Reverse Engineer the Duo Hero', lead:'规则变了。没有人先教你——先看 Reference，做预测，给出判断，然后才轮到揭示与构建。每个 Prediction 都要选 Confidence：我们要训练的不是答题，是校准自己的判断。', items:[
      '观察 Duo Hero 真实参考（Apple 官网截图，本地学习用）',
      '完成 4 个 Prediction：焦点 / DOM / 定位 / 是否需要 JS',
      '按自己的预测重建 Hero（Outcome-based 判分：Flex/Grid/写法不限）',
      'Explain：为什么 Duo 居中而 18 Pro 左对齐？'
    ] },
    { type:'apple', title:'Reference · Duo Hero（真实页面）', img:'curriculum/reference/duo-hero-desktop.png', imgCap:'Apple 官网截图 · 仅供本地学习观察', points:[
      ['排版', '居中式 Hero：产品名小字 → 巨型标语「Hello，hello。」→ 两行发售信息'],
      ['背景', '浅色——与 iPhone 18 Pro 的纯黑 Hero 刻意不同'],
      ['行动', '底部悬浮价格 pill（RMB 15,999 起）+「查看价格」蓝色 CTA'],
      ['证据', '[VISUAL OBSERVATION] 截图只能告诉你"看起来怎样"，不能告诉你"怎么实现"']
    ] },
    { type:'prediction', id:'b1-p1', title:'Prediction 1 · 第一视觉焦点', q:'打开这个页面的一秒之内，眼睛先落在哪里？你的判断是？', options:[
        {k:'A', t:'巨型标语「Hello，hello。」——字号跳跃制造的第一焦点'},
        {k:'B', t:'手持产品大图——人物与产品带来的情绪冲击'},
        {k:'C', t:'底部价格 pill——蓝色 CTA 是页面上唯一的饱和色'},
        {k:'D', t:'多焦点并列，无法分出主次'} ], answer:0,
      observation:'[VISUAL OBSERVATION] 标语约 96px+ 且带句号设计，是第一视觉焦点；产品图是第二焦点（情绪）；价格 pill 是行动焦点（P05/P10：视觉焦点与行动焦点是两件事，Apple 刻意让它们分离——先心动，再行动）。',
      infer:'[IMPLEMENTATION INFERENCE] 居中排版用 text-align:center 即可起步；层级由字号跳跃（P04）制造，不需要任何 JS。' },
    { type:'prediction', id:'b1-p2', title:'Prediction 2 · DOM 结构', q:'不打开 DevTools：这个 Hero 的 DOM 顶层最可能是怎么组织的？', options:[
        {k:'A', t:'一个语义容器，内部按「名→标语→信息→图→CTA」顺序堆叠'},
        {k:'B', t:'左右两栏 Flex（文案一栏、产品图一栏）'},
        {k:'C', t:'Grid 模板区域（header/visual/cta 三区）'},
        {k:'D', t:'仅凭截图无法判断'} ], answer:3,
      observation:'[VISUAL OBSERVATION] 视觉上只能看出"垂直居中堆叠"的结果；DOM 是否有额外 wrapper、用的是 header 还是 section，只有源码能证明。选了 A 且高置信？视觉证据其实支持 A，但它不唯一——这就是"看起来 ≠ 写出来"。',
      infer:'[IMPLEMENTATION INFERENCE] 教学实现：section > h2(产品名) + p(标语，或 h1) + p(发售信息) + img + sticky pill。语义足够即可，不必复刻 Apple 的 wrapper 数量。' },
    { type:'prediction', id:'b1-p3', title:'Prediction 3 · 价格 pill 的定位', q:'价格 pill 悬浮在视口底部——它最可能的实现是？', options:[
        {k:'A', t:'position: sticky; bottom: 0'},
        {k:'B', t:'position: fixed'},
        {k:'C', t:'普通文档流，视觉错觉'},
        {k:'D', t:'仅凭截图无法判断'} ], answer:3,
      observation:'[VISUAL OBSERVATION → 诚实结论] 从静态截图永远无法区分 sticky / fixed / absolute+JS——区分它们的唯一方法是滚动页面观察行为。如果你选了 A 或 B 且高置信：这是本轮最重要的校准点，视觉证据根本不足以下这个结论。',
      infer:'[IMPLEMENTATION INFERENCE] 教学实现推荐 sticky bottom:0（跟随内容流、不遮挡、语义更贴合）。但记住：这是推荐，不是"Apple 真相"——真相要滚动态才能验证。' },
    { type:'prediction', id:'b1-p4', title:'Prediction 4 · 需要 JavaScript 吗？', q:'实现这个 Hero 需要 JavaScript 吗？你的判断依据是？', options:[
        {k:'A', t:'不需要——纯 HTML/CSS 可完整实现'},
        {k:'B', t:'需要——价格 pill 的悬浮依赖 JS'},
        {k:'C', t:'需要——标语入场动效必须 JS'},
        {k:'D', t:'无法判断'} ], answer:0,
      observation:'[IMPLEMENTATION INFERENCE] 判断"要不要 JS"的方法：找状态。文字、图片、sticky 定位、hover 反馈都没有"状态变化"——纯 HTML/CSS 足够。Duo 真正需要 JS 的地方是折叠状态切换（Mission 2）——那里有真状态。',
      infer:'[TEACHING IMPLEMENTATION] 本关判分不含任何 JS 要求——写 JS 反而说明你还没建立"找状态"的判断习惯。' },
    { type:'recall', id:'b1-r1', title:'Typography recap · clamp()', src:'Project A · Stage 5', link:'stage-5', points:[
      'clamp(min, preferred, max)：视口流式字号，三区自动夹取',
      '巨型标语常用 clamp(48px, 10vw, 150px)——手机不挤、桌面不飘',
      '字号跳跃（P04）制造层级：标语 ≥ 产品名 ×4 以上'
    ] },
    { type:'assisted', id:'b1-hero', tag:'Build · Outcome-based', title:'Build · 重建 Duo Hero', task:'按你的预测实现 Duo Hero。判分只看结果（几何与行为），不看写法——不用 Flex/Grid、怎么组织 DOM 都由你决定。', brief:[
      '产品名「iPhone Duo」在前，巨型标语「Hello，hello。」为 h1（渲染后 ≥64px）',
      '两行发售信息（10 月 16 日晚 8 点接受预购 / 10 月 23 日发售）',
      '产品图占页面宽度 50% 以上（素材：duo-fold-closed 或 duo-hero-desktop）',
      '价格 pill（含「查看价格」链接）sticky 或 fixed 于底部——链接必须键盘可达',
      '390px 宽无横向溢出'
    ], script:false,
      starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  /* Duo Hero — 从空白开始。语义骨架你自己定。\n     素材：../assets/images/duo/duo-fold-closed.svg（竖长产品图） */\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; }\n</style>\n</head>\n<body>\n  <!-- TODO: 产品名 + 巨型标语 + 发售信息 + 产品图 + sticky 价格 pill -->\n\n</body>\n</html>',
      hints:[
        '先搭语义骨架：一个 section 装产品名/标语/信息/图，价格 pill 独立一个元素放最后——排列方式你选',
        '巨型字号用 clamp(64px, 12vw, 150px)；sticky 生效的条件：position:sticky + bottom:0，且祖先不能有 overflow:hidden',
        '价格 pill 参考：<div style="position:sticky;bottom:0;background:rgba(255,255,255,.9);padding:12px;display:flex;gap:12px;justify-content:center;align-items:center">…<a href="#price">查看价格</a></div>'
      ],
      answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; background: #fff; }\n  .hero { text-align: center; padding: 72px 22px 40px; }\n  .hero .name { font-size: 19px; font-weight: 600; margin: 0 0 8px; }\n  .hero h1 { font-size: clamp(64px, 12vw, 150px); font-weight: 700; letter-spacing: -0.02em; margin: 0 0 20px; }\n  .hero .date { font-size: 15px; color: #1d1d1f; margin: 0; line-height: 1.7; }\n  .hero img { display: block; width: 62%; margin: 24px auto 0; }\n  .pill { position: sticky; bottom: 0; display: flex; gap: 14px; justify-content: center; align-items: center;\n          background: rgba(255,255,255,.92); padding: 12px 16px; font-size: 14px; }\n  .pill a { background: #0071e3; color: #fff; text-decoration: none; font-weight: 600; padding: 9px 18px; border-radius: 99px; }\n  .pill a:focus-visible { outline: 2px solid #0071e3; outline-offset: 3px; }\n</style>\n</head>\n<body>\n  <section class="hero">\n    <p class="name">iPhone Duo</p>\n    <h1>Hello，hello。</h1>\n    <p class="date">10 月 16 日晚 8 点接受预购<br>10 月 23 日发售</p>\n    <img src="../assets/images/duo/duo-fold-closed.svg" alt="折叠闭合态的 iPhone Duo">\n  </section>\n  <div class="pill">\n    <span>RMB 15,999 起或 RMB 667/月 (24 期) 起</span>\n    <a href="#price">查看价格</a>\n  </div>\n</body>\n</html>',
      checks:[
        { label:'标语是 h1 且渲染字号 ≥64px', js:'(function(){var h=doc.querySelector("h1");if(!h)return false;var cs=win.getComputedStyle(h);var r=h.getBoundingClientRect();var visible=cs.display!=="none"&&cs.visibility!=="hidden"&&parseFloat(cs.opacity)>0.05&&r.width>0&&r.left<doc.documentElement.clientWidth&&r.right>0;return visible&&parseFloat(cs.fontSize)>=64;})()' },
        { label:'产品名「iPhone Duo」出现在标语之前', js:'(function(){var t=doc.body.textContent;var a=t.indexOf("iPhone Duo"),b=t.indexOf("Hello");return a>-1&&b>-1&&a<b;})()' },
        { label:'产品图存在且宽 >50% 视口', js:'(function(){var i=doc.querySelector("img");if(!i)return false;return i.getBoundingClientRect().width>doc.documentElement.clientWidth*0.5;})()' },
        { label:'「查看价格」是 a 或 button（键盘可达）', js:'(function(){var els=doc.querySelectorAll("a,button");for(var i=0;i<els.length;i++){if(els[i].textContent.indexOf("查看价格")>-1)return true;}return false;})()' },
        { label:'价格 pill sticky 或 fixed 于底部', js:'(function(){var els=doc.querySelectorAll("*");for(var i=0;i<els.length;i++){var s=win.getComputedStyle(els[i]);if((s.position==="sticky"||s.position==="fixed")&&els[i].textContent.indexOf("查看价格")>-1)return true;}return false;})()' },
        { label:'390px 无横向溢出', width:390, js:'(function(){return doc.documentElement.scrollWidth<=391;})()' }
      ] },
    { type:'reasoning', id:'b1-r', title:'Explain · 为什么 Duo Hero 居中，而 18 Pro 左对齐？', lead:'没有标准答案，但理由必须成立。先勾选你能成立的，再对照考虑清单。', checks:[
      '我能说出两种 Hero 对应的受众/场景差异',
      '我考虑了产品图形状对构图的影响（竖长折叠机 vs 横向旗舰）',
      '我认为「Hello，hello。」这句标语的宣告感需要居中对称',
      '我知道同一产品若做 B2B 官网，这个选择可能不同'
    ], considerations:[
      '居中 = 仪式感与发布会式宣告——适合面向大众的新品类亮相（折叠 iPhone 是新品类）',
      '左对齐 = 信息效率——适合参数导向的成熟产品受众（18 Pro 的续作买家已懂产品）',
      '竖长产品图天然适合中轴对称构图；横向旗舰更适合左文右图的平衡',
      'Contextual Design：Apple 的选择依赖场景，不是普适真理——这正是 Mission 结束要留下的判断力'
    ] },
    { type:'quiz', title:'Retrieval · 不翻笔记，凭记忆答', questions:[
        { q:'justify-content 控制的是哪个轴？（Recall：Project A · Stage 6）', options:['交叉轴','主轴','垂直轴永远是','Z 轴'], answer:1, explain:'主轴由 flex-direction 决定——这是 Flex 的第一课。' },
        { q:'position:sticky 相对什么吸附？（Recall：Stage 7）', options:['最近的定位祖先','视口 + 你设置的 top/bottom 阈值','文档顶部','父元素中心'], answer:1, explain:'sticky = 相对滚动容器 + 阈值；祖先 overflow:hidden 会让它失效。' }
      ]},
    { type:'checklist', title:'Mission 1 验收', items:[
      '我完成了 4 个 Prediction 并诚实选择了 Confidence',
      '我能说出"视觉焦点"和"行动焦点"的区别',
      '我的 Hero 通过全部 outcome 检查（含 390px 无溢出）',
      '我能解释居中 vs 左对齐的场景依据',
      '我知道判断"要不要 JS"的方法：找状态'
    ]},
    { type:'milestone' },
    { type:'summary', title:'Mission 1 完成', points:[
      ['方法', 'Observe → Predict（+Confidence）→ Reveal → Build → Explain'],
      ['校准', '去首页看 Independence：哪个 Prediction 过度自信了？'],
      ['下一步', 'Mission 2：折叠三态——Duo 真正需要 JS 的地方']
    ], next:{ stage:'b2', text:'进入 Mission 2 · Folding Interaction' } }
    ] },

  { id:'b2', num:2, title:'Folding Interaction & State Model', short:'折叠状态', status:'ready', minutes:'150–190 min',
    blocks:[
    { type:'goals', title:'Mission 2 · Folding Interaction & State Model', lead:'Duo 最有价值的学习对象：折叠。这次先建模，再写码——UI = f(state)。Project A S11 学过的东西，这里只给你 Recall Card。', items:[
      '观察闭合 / 半开 / 展开 三个状态，回答"什么变了，什么没变"',
      '建立 State Model：一个 state 变量驱动所有 UI',
      'Build 折叠切换器（键盘可达 + 状态三同步）',
      'Debug 一只真实的"状态不同步"Bug，并写入 Bug Journal'
    ] },
    { type:'gallery', kicker:'Observe · 三态对比', title:'折叠的三个状态', lead:'同一设备、同一构图、同一大小——变的只有姿态。先看 30 秒，不要急着写代码。注意：图片间"不变"的东西和"变"的东西一样重要。', images:[
        { src:'assets/images/duo/duo-fold-closed.svg', name:'closed · 闭合', note:'外屏朝上，5.4" 竖屏' },
        { src:'assets/images/duo/duo-fold-half.svg', name:'half · 坐立', note:'铰链立起，上下分区' },
        { src:'assets/images/duo/duo-fold-open.svg', name:'open · 展开', note:'7.6" 一整块内屏' }
      ] },
    { type:'prediction', id:'b2-p1', title:'Prediction 1 · 状态建模', q:'三个状态之间，什么在变、什么在驱动？', options:[
        {k:'A', t:'只是换了三张图片——三个独立 <img> 切 display'},
        {k:'B', t:'图片、指示（active 态）、文案都由同一个 state 值驱动'},
        {k:'C', t:'三个独立页面互相跳转'},
        {k:'D', t:'无法判断'} ], answer:1,
      observation:'[IMPLEMENTATION INFERENCE] 正确的心智模型是 B：UI = f(state)。state 是唯一的真相源（closed/half/open），图片、active 样式、文字标签都是 state 的函数——这正是 Project A S11 的核心。三张 <img> 切 display 在 3 态时能跑，但状态一多（真实页面有 7 种姿态）就会失控。',
      infer:'[TEACHING IMPLEMENTATION] 判分会检查"点击后图片、标签、active 三处同步变化"——这就是在验证你的 state 模型。' },
    { type:'prediction', id:'b2-p2', title:'Prediction 2 · 切换由什么驱动？', q:'实现三态切换，你选哪种驱动方式？', options:[
        {k:'A', t:'JS 状态 + button——可扩展、可联动文案、键盘天然可达'},
        {k:'B', t:'纯 CSS :checked hack——零 JS 也能做'},
        {k:'C', t:'三个页面 <a> 跳转'},
        {k:'D', t:'无法判断'} ], answer:0,
      observation:'[IMPLEMENTATION INFERENCE] 诚实答案：3 态时 B（:checked + 兄弟选择器）完全可行——A 和 B 都能通过本关判分。教学推荐 A：真实产品查看器会扩展到 7+ 姿态并联动文案/价格，button + state 可维护性碾压 CSS hack。"CSS 够用吗"这个判断本身，是 Mission 4 的主题。',
      infer:'[TEACHING IMPLEMENTATION] 记住判断依据而非口诀：状态数量 × 联动复杂度 → 决定 CSS hack 的存活空间。' },
    { type:'recall', id:'b2-r1', title:'State 三同步 recap', src:'Project A · Stage 11', link:'stage-11', points:[
      '一次状态变更同步三处：数据（img.src）+ 视图（active class）+ 文案（textContent）',
      '监听器绑定在用户操作的元素上（querySelectorAll + addEventListener）',
      'state 是唯一真相源——所有 UI 都是它的函数，永远不要手动"猜"该改哪几个地方'
    ] },
    { type:'assisted', id:'b2-fold', tag:'Build · State Model', title:'Build · 折叠切换器', task:'实现三态切换：点击按钮切换闭合/坐立/展开，图片、状态名、active 样式必须同步。starter 已给出 HTML 骨架与 .active 样式——你的工作是把 state 接上。', brief:[
      '三个 button：闭合 / 坐立 / 展开（键盘可达）',
      '图片随状态切换：duo-fold-closed / duo-fold-half / duo-fold-open',
      '.state-name 文字同步为当前状态名',
      '当前按钮带 .active 样式',
      '首次点击「坐立」后：img 含 half、.state-name 含「坐立」、按钮带 active'
    ], script:true,
      starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; text-align: center; padding: 24px; }\n  .fold-btn { font: inherit; font-size: 14px; padding: 8px 18px; margin: 0 4px; border-radius: 99px;\n              border: 1px solid #d2d2d7; background: #fff; cursor: pointer; }\n  .fold-btn.active { background: #0071e3; color: #fff; border-color: #0071e3; }\n  .fold-btn:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; }\n  .stage img { display: block; width: min(320px, 80%); margin: 20px auto 8px; }\n  .state-name { font-size: 14px; color: #6e6e73; }\n</style>\n</head>\n<body>\n  <div class="stage">\n    <p>\n      <button class="fold-btn active" data-state="closed">闭合</button>\n      <button class="fold-btn" data-state="half">坐立</button>\n      <button class="fold-btn" data-state="open">展开</button>\n    </p>\n    <img id="foldImg" src="../assets/images/duo/duo-fold-closed.svg" alt="iPhone Duo 折叠状态">\n    <p class="state-name">闭合</p>\n  </div>\n  <script>\n    // TODO: 建立 state → UI 的映射，点击时同步三处：img.src / .state-name / .active\n    var STATES = {\n      closed: { img: "../assets/images/duo/duo-fold-closed.svg", name: "闭合" },\n      half:   { img: "../assets/images/duo/duo-fold-half.svg",   name: "坐立" },\n      open:   { img: "../assets/images/duo/duo-fold-open.svg",   name: "展开" }\n    };\n  </script>\n</body>\n</html>',
      hints:[
        'L1 方向：给三个按钮各绑一个 click（或事件委托），在处理器里用 STATES[state] 取出图片与文字——一次赋值，三处同步',
        'L2 结构：点击处理器里从同一条 STATES 记录取值，依次更新三处派生视图——图片的 src、状态名的 textContent、再遍历所有按钮切换 active（谁是 active 由「是否等于被点的那个」决定）',
        'L3 接近答案：document.querySelectorAll(".fold-btn").forEach(function(b){ b.addEventListener("click", function(){ var s = STATES[b.dataset.state]; img.src = s.img; nameEl.textContent = s.name; document.querySelectorAll(".fold-btn").forEach(function(x){ x.classList.toggle("active", x === b); }); }); });'
      ],
      answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; text-align: center; padding: 24px; }\n  .fold-btn { font: inherit; font-size: 14px; padding: 8px 18px; margin: 0 4px; border-radius: 99px; border: 1px solid #d2d2d7; background: #fff; cursor: pointer; }\n  .fold-btn.active { background: #0071e3; color: #fff; border-color: #0071e3; }\n  .fold-btn:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; }\n  .stage img { display: block; width: min(320px, 80%); margin: 20px auto 8px; }\n  .state-name { font-size: 14px; color: #6e6e73; }\n</style>\n</head>\n<body>\n  <div class="stage">\n    <p>\n      <button class="fold-btn active" data-state="closed">闭合</button>\n      <button class="fold-btn" data-state="half">坐立</button>\n      <button class="fold-btn" data-state="open">展开</button>\n    </p>\n    <img id="foldImg" src="../assets/images/duo/duo-fold-closed.svg" alt="iPhone Duo 折叠状态">\n    <p class="state-name">闭合</p>\n  </div>\n  <script>\n    var STATES = {\n      closed: { img: "../assets/images/duo/duo-fold-closed.svg", name: "闭合" },\n      half:   { img: "../assets/images/duo/duo-fold-half.svg",   name: "坐立" },\n      open:   { img: "../assets/images/duo/duo-fold-open.svg",   name: "展开" }\n    };\n    var img = document.getElementById("foldImg");\n    var nameEl = document.querySelector(".state-name");\n    var btns = document.querySelectorAll(".fold-btn");\n    btns.forEach(function (b) {\n      b.addEventListener("click", function () {\n        var s = STATES[b.dataset.state];\n        img.src = s.img;\n        nameEl.textContent = s.name;\n        btns.forEach(function (x) { x.classList.toggle("active", x === b); });\n      });\n    });\n  </script>\n</body>\n</html>',
      checks:[
        { label:'三个切换控件都是 button（键盘可达）', js:'(function(){var bs=doc.querySelectorAll("button");var n=0;bs.forEach?bs.forEach(function(b){if(/闭合|坐立|展开/.test(b.textContent))n++;}):0;return n>=3;})()' },
        { label:'初始显示闭合态图片', js:'(function(){var i=doc.querySelector("img");return !!i&&i.src.indexOf("closed")>-1;})()' },
        { label:'点击「坐立」→ 图片切换为 half', js:'(function(){var bs=doc.querySelectorAll("button");var hit=null;for(var i=0;i<bs.length;i++){if(bs[i].textContent.indexOf("坐立")>-1)hit=bs[i];}if(!hit)return false;hit.click();var im=doc.querySelector("img");return !!im&&im.src.indexOf("half")>-1;})()' },
        { label:'点击后 .state-name 同步为「坐立」', js:'(function(){var n=doc.querySelector(".state-name");return !!n&&n.textContent.indexOf("坐立")>-1;})()' },
        { label:'被点击的按钮获得 active 样式', js:'(function(){var bs=doc.querySelectorAll("button");for(var i=0;i<bs.length;i++){if(bs[i].textContent.indexOf("坐立")>-1)return bs[i].classList.contains("active");}return false;})()' }
      ] },
    { type:'debug', title:'Debug · 「点了展开，图换了，字还停在闭合」', story:'症状：点击「展开」后，图片正确切换成了展开态——但底部状态文字仍显示「闭合」，上一个按钮的 active 样式也不消失。只有图片这一处"听话"。', script:true,
      starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; text-align: center; padding: 24px; }\n  .fold-btn { font: inherit; font-size: 14px; padding: 8px 18px; margin: 0 4px; border-radius: 99px; border: 1px solid #d2d2d7; background: #fff; cursor: pointer; }\n  .fold-btn.active { background: #0071e3; color: #fff; border-color: #0071e3; }\n  .stage img { display: block; width: min(320px, 80%); margin: 20px auto 8px; }\n  .state-name { font-size: 14px; color: #6e6e73; }\n</style>\n</head>\n<body>\n  <div class="stage">\n    <p>\n      <button class="fold-btn active" data-state="closed">闭合</button>\n      <button class="fold-btn" data-state="half">坐立</button>\n      <button class="fold-btn" data-state="open">展开</button>\n    </p>\n    <img id="foldImg" src="../assets/images/duo/duo-fold-closed.svg" alt="iPhone Duo 折叠状态">\n    <p class="state-name">闭合</p>\n  </div>\n  <script>\n    var STATES = {\n      closed: { img: "../assets/images/duo/duo-fold-closed.svg", name: "闭合" },\n      half:   { img: "../assets/images/duo/duo-fold-half.svg",   name: "坐立" },\n      open:   { img: "../assets/images/duo/duo-fold-open.svg",   name: "展开" }\n    };\n    var img = document.getElementById("foldImg");\n    var btns = document.querySelectorAll(".fold-btn");\n    btns.forEach(function (b) {\n      b.addEventListener("click", function () {\n        img.src = STATES[b.dataset.state].img;\n        /* TODO 观察上面的症状：还差哪几处没同步？ */\n      });\n    });\n  </script>\n</body>\n</html>',
      hints:[
        '状态三同步是三处，不是一处：列出所有该变化的 UI 元素（图 / 文字 / active），逐个检查点击处理器里更新了几个',
        '处理器里只有 img.src 一行。.state-name 的 textContent 和按钮的 active class 完全没被碰过',
        '接近答案：加 nameEl.textContent = STATES[b.dataset.state].name; 且 btns.forEach(function(x){ x.classList.toggle("active", x===b); });'
      ],
      cause:'根因：状态同步只做了一层。UI = f(state) 里 f 必须覆盖全部派生视图——图片、文字、active 都是同一个 state 的函数。这正是 S11「状态三同步」存在的意义：不是规范洁癖，而是漏一处就是用户可见的 Bug。',
      answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; text-align: center; padding: 24px; }\n  .fold-btn { font: inherit; font-size: 14px; padding: 8px 18px; margin: 0 4px; border-radius: 99px; border: 1px solid #d2d2d7; background: #fff; cursor: pointer; }\n  .fold-btn.active { background: #0071e3; color: #fff; border-color: #0071e3; }\n  .stage img { display: block; width: min(320px, 80%); margin: 20px auto 8px; }\n  .state-name { font-size: 14px; color: #6e6e73; }\n</style>\n</head>\n<body>\n  <div class="stage">\n    <p>\n      <button class="fold-btn active" data-state="closed">闭合</button>\n      <button class="fold-btn" data-state="half">坐立</button>\n      <button class="fold-btn" data-state="open">展开</button>\n    </p>\n    <img id="foldImg" src="../assets/images/duo/duo-fold-closed.svg" alt="iPhone Duo 折叠状态">\n    <p class="state-name">闭合</p>\n  </div>\n  <script>\n    var STATES = {\n      closed: { img: "../assets/images/duo/duo-fold-closed.svg", name: "闭合" },\n      half:   { img: "../assets/images/duo/duo-fold-half.svg",   name: "坐立" },\n      open:   { img: "../assets/images/duo/duo-fold-open.svg",   name: "展开" }\n    };\n    var img = document.getElementById("foldImg");\n    var nameEl = document.querySelector(".state-name");\n    var btns = document.querySelectorAll(".fold-btn");\n    btns.forEach(function (b) {\n      b.addEventListener("click", function () {\n        var s = STATES[b.dataset.state];\n        img.src = s.img;\n        nameEl.textContent = s.name;\n        btns.forEach(function (x) { x.classList.toggle("active", x === b); });\n      });\n    });\n  </script>\n</body>\n</html>',
      checks:[
        { label:'点击「展开」→ 图片切换为 open', js:'(function(){var bs=doc.querySelectorAll("button");for(var i=0;i<bs.length;i++){if(bs[i].textContent.indexOf("展开")>-1){bs[i].click();break;}}var im=doc.querySelector("img");return !!im&&im.src.indexOf("open")>-1;})()' },
        { label:'点击后 .state-name 同步为「展开」', js:'(function(){var n=doc.querySelector(".state-name");return !!n&&n.textContent.indexOf("展开")>-1;})()' },
        { label:'「展开」按钮获得 active', js:'(function(){var bs=doc.querySelectorAll("button");for(var i=0;i<bs.length;i++){if(bs[i].textContent.indexOf("展开")>-1)return bs[i].classList.contains("active");}return false;})()' },
        { label:'「闭合」按钮的 active 已被移除', js:'(function(){var bs=doc.querySelectorAll("button");for(var i=0;i<bs.length;i++){if(bs[i].textContent.indexOf("闭合")>-1)return !bs[i].classList.contains("active");}return false;})()' }
      ] },
    { type:'bugjournal', title:'Bug Journal · 记下你的第一只', lead:'刚才那只「状态不同步」就是一条完美的 Journal 素材。按五段写：症状 → 假设 → 根因 → 修复 → 如何验证。以后每个 Mission 都会回来记录——方法比结论值钱。' },
    { type:'reasoning', id:'b2-r', title:'Explain · 物理模拟 vs 状态切换', lead:'有人建议把折叠做成跟手的 3D 物理动画（WebGL/Three.js）。你的判断？', checks:[
      '我能说出这个交互的教学/展示目标是什么',
      '我考虑了实现成本与维护成本的比值',
      '我考虑了移动端性能与无障碍（prefers-reduced-motion）',
      '我知道"状态正确 + 切换清晰"比"物理逼真"更接近 Apple 官网的实际做法'
    ], considerations:[
      'Apple 官网用的是预渲染序列帧/视频 + 少量状态驱动——不是实时 3D 物理模拟',
      'Three.js 的成本：包体、性能、可维护性——对"讲清楚三个状态"这个目标是严重过度设计',
      'Image sequence / 三张同构图图片切换 = 状态清晰、成本最低、无障碍最友好',
      '当目标变成"展示铰链工艺细节"时，答案可能改变——判断永远依附于目标'
    ] },
    { type:'checklist', title:'Mission 2 验收', items:[
      '我建立了 state → UI 的映射，而不是三处各自为政的赋值',
      '折叠切换器通过全部检查（图/名/active 三同步 + 键盘可达）',
      '我修复了状态不同步 Bug 并写入了 Bug Journal',
      '我能解释为什么不用 WebGL 做折叠演示',
      '我的 Prediction 校准记录又多了两条'
    ]},
    { type:'milestone' },
    { type:'summary', title:'Mission 2 完成', points:[
      ['方法', 'State Model 先行：UI = f(state)，一次变更同步所有派生视图'],
      ['Debug', '症状 → 假设 → 根因 → 修复 → 验证，已进入你的 Bug Journal'],
      ['下一步', 'Mission 3：双屏布局——Flex 还是 Grid，这次没人告诉你']
    ], next:{ stage:'b3', text:'进入 Mission 3 · Dual-Screen Responsive Layout' } }
    ] },

  { id:'b3', num:3, title:'Dual-Screen Responsive Layout', short:'双屏布局', status:'ready', minutes:'140–180 min',
    blocks:[
    { type:'goals', title:'Mission 3 · Dual-Screen Responsive Layout', lead:'Project B 的核心布局训练。给 Reference 和需求，不给布局答案——Flex、Grid、嵌套、文档流，能达标的全是正解。判分器只测几何结果与响应行为。', items:[
      'Prediction：Apple 的双屏演示区用的是什么实现？',
      'Build：桌面两块 app 面板并排等宽，移动端堆叠（多解合法）',
      'Explain：为什么这么选？对照考虑清单',
      'Debug 一只真实溢出 Bug'
    ] },
    { type:'apple', title:'Reference · 双屏多任务', img:'assets/images/duo/duo-dual-screen.svg', imgCap:'双屏分屏示意 · 展开态左右两块 app 区域', points:[
      ['场景', '7.6" 内屏的分屏多任务：左侧地图 + 右侧消息'],
      ['桌面', '两块面板并排、等宽、有间隙'],
      ['移动', '窄屏下垂直堆叠，顺序：地图 → 消息'],
      ['证据', '[VISUAL OBSERVATION] 看不出实现——这正是本关第一道 Prediction']
    ] },
    { type:'prediction', id:'b3-p1', title:'Prediction · Apple 用的是 Flex 还是 Grid？', q:'桌面端左右两块内容——真实 Apple 页面更可能用什么实现？', options:[
        {k:'A', t:'Flexbox'},
        {k:'B', t:'Grid'},
        {k:'C', t:'都可能——仅凭截图无法判断'},
        {k:'D', t:'float 布局'} ], answer:2,
      observation:'[VISUAL OBSERVATION → 诚实结论] C 是唯一诚实的答案。Flex 和 Grid 都能产生完全相同的视觉结果——视觉是输出，不是实现。想证明只能读源码。如果你 A/B 选择了且高置信：问自己"我的证据是什么？"——"看起来像"不是证据。',
      infer:'[TEACHING IMPLEMENTATION] 本关判分是 outcome-based：只测几何（并排/等宽/间隙）与响应（堆叠/溢出），不检查属性名。Flex 和 Grid 都能满分——这是刻意设计。' },
    { type:'recall', id:'b3-r1', title:'Flex vs Grid 选型 recap', src:'Project A · Stage 6 / Stage 10', link:'stage-10', points:[
      'Flex = 一维：一行或一列的内容流，尺寸由内容参与决定',
      'Grid = 二维：行与列同时约束，先定格子再放内容',
      '选择依据是内容关系（一维序列 vs 二维结构），不是视觉结果',
      'justify-content 管主轴，align-items 管交叉轴；gap 两者通用'
    ] },
    { type:'assisted', id:'b3-layout', tag:'Build · 多解判分', title:'Build · 双屏多任务区', task:'实现双屏多任务区。判分只测几何与响应，不测实现方式——Flex 和 Grid 都能满分，嵌套也行。', brief:[
      '两个面板：<section class="panel"> 地图（MAP）与 消息（MESSAGES），源顺序 map → messages',
      '桌面（≥735px）：并排、等宽（±24px 内）、间隙 ≥12px',
      '窄屏（<735px）：垂直堆叠，地图在上（保持源顺序）',
      '390px 无横向溢出',
      'starter 已给内容与样式底子——布局方式你自己定'
    ], wideFrame:true, script:false,
      starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; background: #f5f5f7; padding: 24px; }\n  .panels { /* TODO: 你的布局方案 */ }\n  .panel { background: #fff; border-radius: 16px; padding: 18px; min-height: 220px; }\n  .panel h3 { margin: 0 0 8px; font-size: 15px; }\n  .panel p { margin: 0; font-size: 13px; color: #6e6e73; line-height: 1.6; }\n  .panel .mock { margin-top: 12px; height: 140px; border-radius: 10px; }\n  .map .mock { background: linear-gradient(135deg, #d8e8f5, #b8d4ee); }\n  .msg .mock { background: linear-gradient(135deg, #ece8f5, #d4c8ee); }\n</style>\n</head>\n<body>\n  <div class="panels">\n    <section class="panel map">\n      <h3>MAP · 地图</h3>\n      <p>路线导航与实时路况。</p>\n      <div class="mock"></div>\n    </section>\n    <section class="panel msg">\n      <h3>MESSAGES · 信息</h3>\n      <p>对话与通知，左右互不遮挡。</p>\n      <div class="mock"></div>\n    </section>\n  </div>\n</body>\n</html>',
      hints:[
        '布局方式不限定：.panels 用 display:flex（默认 row）或 display:grid;grid-template-columns:1fr 1fr 都能达标——选一个，说出你的理由',
        '堆叠断点：@media (max-width:734px) 里把排列方向改为纵向——Flex 是 flex-direction:column，Grid 是 grid-template-columns:1fr',
        '接近答案：@media (max-width:734px){ .panels{flex-direction:column} }（Flex 版）或 { grid-template-columns:1fr }（Grid 版）；gap 已由你设置'
      ],
      answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; background: #f5f5f7; padding: 24px; }\n  .panels { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }\n  .panel { background: #fff; border-radius: 16px; padding: 18px; min-height: 220px; }\n  .panel h3 { margin: 0 0 8px; font-size: 15px; }\n  .panel p { margin: 0; font-size: 13px; color: #6e6e73; line-height: 1.6; }\n  .panel .mock { margin-top: 12px; height: 140px; border-radius: 10px; }\n  .map .mock { background: linear-gradient(135deg, #d8e8f5, #b8d4ee); }\n  .msg .mock { background: linear-gradient(135deg, #ece8f5, #d4c8ee); }\n  @media (max-width: 734px) { .panels { grid-template-columns: 1fr; } }\n</style>\n</head>\n<body>\n  <div class="panels">\n    <section class="panel map">\n      <h3>MAP · 地图</h3>\n      <p>路线导航与实时路况。</p>\n      <div class="mock"></div>\n    </section>\n    <section class="panel msg">\n      <h3>MESSAGES · 信息</h3>\n      <p>对话与通知，左右互不遮挡。</p>\n      <div class="mock"></div>\n    </section>\n  </div>\n</body>\n</html>',
      checks:[
        { label:'两个面板存在（.panel × 2）', js:'(function(){return doc.querySelectorAll(".panel").length===2;})()' },
        { label:'桌面：面板水平相邻', js:'(function(){var ps=doc.querySelectorAll(".panel");var a=ps[0].getBoundingClientRect(),b=ps[1].getBoundingClientRect();return Math.abs(a.top-b.top)<6&&b.left>=a.right-2;})()' },
        { label:'桌面：面板等宽（±24px）', js:'(function(){var ps=doc.querySelectorAll(".panel");var a=ps[0].getBoundingClientRect(),b=ps[1].getBoundingClientRect();return Math.abs(a.width-b.width)<=24;})()' },
        { label:'桌面：间隙 ≥12px', js:'(function(){var ps=doc.querySelectorAll(".panel");var a=ps[0].getBoundingClientRect(),b=ps[1].getBoundingClientRect();return (b.left-a.right)>=12;})()' },
        { label:'390px：垂直堆叠（地图在上）', width:390, js:'(function(){var ps=doc.querySelectorAll(".panel");var a=ps[0].getBoundingClientRect(),b=ps[1].getBoundingClientRect();return a.bottom<=b.top+6;})()' },
        { label:'390px：无横向溢出', width:390, js:'(function(){return doc.documentElement.scrollWidth<=391;})()' }
      ] },
    { type:'reasoning', id:'b3-r', title:'Explain · 你的布局为什么成立', lead:'判分通过了不代表判断成立。勾选你能回答的，再对照考虑清单。', checks:[
      '我能说出我的方案里内容关系是一维还是二维',
      '我考虑了换成一个 2×2 面板时，我的方案是否还成立',
      '移动端堆叠顺序 = 源顺序 = 读屏顺序，我没有用 order 偷换视觉顺序',
      '我知道等宽是 Flex（flex:1）和 Grid（1fr）都能做到的——所以它不构成选型依据'
    ], considerations:[
      '一维内容流 → Flex 更贴；二维结构/先定区域 → Grid 更贴。两块等宽面板两种都说得通——所以判分不测属性',
      '2×2 扩展：Grid 改 template 天然支持；Flex 要嵌套或换行——扩展性是真实的选型论据',
      'order 能改变视觉顺序但伤害读屏顺序——能用源顺序解决就不要用 order',
      '等宽、gap、堆叠这些"结果"两种方案都给得出——把选型依据建立在内容关系上，而不是结果倒推'
    ] },
    { type:'debug', title:'Debug · 「375px 下双屏区左右溢出」', story:'症状：真机 375px 宽打开，双屏区出现横向滚动条，右侧面板被截掉一半。桌面显示正常。', wideFrame:true, script:false,
      starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; background: #f5f5f7; padding: 24px; }\n  .panels { display: flex; gap: 16px; }\n  .panel { background: #fff; border-radius: 16px; padding: 18px; min-height: 220px; width: 480px; }\n  .panel h3 { margin: 0 0 8px; font-size: 15px; }\n  @media (max-width: 734px) { .panels { flex-direction: column; } }\n</style>\n</head>\n<body>\n  <div class="panels">\n    <section class="panel map"><h3>MAP · 地图</h3><p>路线导航与实时路况。</p></section>\n    <section class="panel msg"><h3>MESSAGES · 信息</h3><p>对话与通知。</p></section>\n  </div>\n</body>\n</html>',
      hints:[
        '溢出三查：固定宽度 / box-sizing / 最小内容宽度。先在 390px 预览里看哪个元素超出了视口',
        '.panel 有 width:480px——固定像素宽度在窄屏上必然溢出；断点只改了方向没改宽度',
        '接近答案：面板宽度改为弹性（width:auto + flex:1，或直接删掉 width），或 max-width:480px;width:100%'
      ],
      cause:'根因：固定像素宽度（480px）+ 只改方向不改尺寸的断点。column 方向下面板仍占 480px 宽 > 375px 视口。修复 = 让宽度参与弹性（flex:1 / width:100%+max-width）。这是 Project A S14 溢出三查的直接迁移：先找元凶，再用 overflow-x:hidden 盖症状。',
      answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; background: #f5f5f7; padding: 24px; }\n  .panels { display: flex; gap: 16px; }\n  .panel { background: #fff; border-radius: 16px; padding: 18px; min-height: 220px; flex: 1; min-width: 0; }\n  .panel h3 { margin: 0 0 8px; font-size: 15px; }\n  @media (max-width: 734px) { .panels { flex-direction: column; } }\n</style>\n</head>\n<body>\n  <div class="panels">\n    <section class="panel map"><h3>MAP · 地图</h3><p>路线导航与实时路况。</p></section>\n    <section class="panel msg"><h3>MESSAGES · 信息</h3><p>对话与通知。</p></section>\n  </div>\n</body>\n</html>',
      checks:[
        { label:'390px：无横向溢出', width:390, js:'(function(){return doc.documentElement.scrollWidth<=391;})()' },
        { label:'390px：面板堆叠且全宽', width:390, js:'(function(){var ps=doc.querySelectorAll(".panel");var a=ps[0].getBoundingClientRect();return a.width>doc.documentElement.clientWidth*0.8;})()' },
        { label:'桌面：仍然并排', js:'(function(){var ps=doc.querySelectorAll(".panel");var a=ps[0].getBoundingClientRect(),b=ps[1].getBoundingClientRect();return Math.abs(a.top-b.top)<6&&b.left>=a.right-2;})()' }
      ] },
    { type:'bugjournal', title:'Bug Journal · 记录溢出 Bug', lead:'这是 S14「溢出三查」的迁移实战：症状（375 溢出）→ 假设（谁是元凶？）→ 根因（固定宽度）→ 修复 → 验证（390 断言）。写进你的 Journal。' },
    { type:'checklist', title:'Mission 3 验收', items:[
      '我诚实回答了"Flex 还是 Grid"的 Prediction（答案是无法从截图判断）',
      '我的双屏布局通过全部几何检查——无论我用了哪种方案',
      '我能用内容关系（而非视觉结果）论证我的选型',
      '我修复了溢出 Bug 并写入了 Bug Journal',
      '我没有用 order 偷换视觉顺序'
    ]},
    { type:'milestone' },
    { type:'summary', title:'Mission 3 完成', points:[
      ['方法', 'Outcome-based：先定义"什么算对"，再选实现——多解合法'],
      ['选型', '依据是内容关系，不是视觉倒推；等宽不构成选型依据'],
      ['下一步', 'Mission 4：这个效果 CSS 够吗？——CSS vs JS 决策']
    ], next:{ stage:'b4', text:'进入 Mission 4 · Interactive Product Story' } }
    ] },

  { id:'b4', num:4, title:'Interactive Product Story', short:'交互叙事', status:'ready', minutes:'150–190 min',
    blocks:[
    { type:'goals', title:'Mission 4 · Interactive Product Story', lead:'交互的决策训练：这个效果，CSS 就够，还是需要 JS？先判断再实现。FAQ 手风琴是本关主战场——两种实现都合法，判分只看行为。', items:[
      '3 个 CSS vs JS Decision Prediction（hover / 手风琴 / 滚动显现）',
      'Build FAQ 手风琴：details/summary 或 button+JS，任选并说明理由',
      'Build 滚动显现：IntersectionObserver 迁移实战',
      'Debug 互斥手风琴 + Bug Journal'
    ] },
    { type:'prediction', id:'b4-p1', title:'Decision 1 · hover 反馈', q:'导航链接 hover 变色 + 下划线——CSS 还是 JS？', options:[
        {k:'A', t:'CSS :hover——纯视觉状态反馈'},
        {k:'B', t:'JS mouseover 监听'},
        {k:'C', t:'两者等价，随便选'},
        {k:'D', t:'无法判断'} ], answer:0,
      observation:'[IMPLEMENTATION INFERENCE] A。hover 是纯视觉、无数据、无结构变化的状态——CSS 的主场，且键盘焦点用 :focus-visible 一并覆盖。JS 做 hover 是典型的"用错工具"：多代码、多 bug 面、还慢。',
      infer:'判断句式：状态只影响样式 → CSS；状态影响结构/数据 → JS。这不是口诀，是成本分析。' },
    { type:'prediction', id:'b4-p2', title:'Decision 2 · FAQ 手风琴', q:'点击问题展开/收起答案——details/summary 还是 button+JS？', options:[
        {k:'A', t:'details/summary——零 JS、语义自带、无障碍免费'},
        {k:'B', t:'button + JS——完全控制动画与互斥'},
        {k:'C', t:'取决于需求：是否需要互斥/自定义动画'},
        {k:'D', t:'无法判断'} ], answer:2,
      observation:'[IMPLEMENTATION INFERENCE] C 是最专业的答案。单开、无动画 → details 一行都不用写；互斥（开一关一）+ 平滑高度动画 → JS 更直接。判断依据是需求清单，不是"哪个更高级"。本关判分两种实现都接受。',
      infer:'[TEACHING IMPLEMENTATION] 陷阱在"背答案"：背下"手风琴用 details"和背下"手风琴用 JS"是同一种错——都要先问需求。' },
    { type:'prediction', id:'b4-p3', title:'Decision 3 · 滚动显现', q:'模块滚动进入视口时淡入——纯 CSS 还是 JS？', options:[
        {k:'A', t:'纯 CSS 可以感知滚动位置'},
        {k:'B', t:'IntersectionObserver——浏览器高效判断"进入视口"'},
        {k:'C', t:'scroll 事件 + 手写几何计算'},
        {k:'D', t:'无法判断'} ], answer:1,
      observation:'[IMPLEMENTATION INFERENCE] B。"元素与视口相交"是浏览器才知道的高频几何事实——IO 就是为它生的 API（Project A S12）。scroll 事件手写=性能差且易错；纯 CSS 至今无法可靠感知相交。注意 C "能跑"但不是好工程——这也是判断的一部分。',
      infer:'回忆 S12：iframe 内 IO 与顶层视口相交的坑、threshold、unobserve 一次性触发。Recall Card 在下面。' },
    { type:'recall', id:'b4-r1', title:'IntersectionObserver recap', src:'Project A · Stage 12', link:'stage-12', points:[
      'new IntersectionObserver(callback, { threshold: 0.15 }) + observe(target)',
      'isIntersecting 时加 class（如 .in），然后 unobserve——一次性触发',
      'CSS 侧：.reveal 初始 opacity:0 + translateY，.in 过渡进入；prefers-reduced-motion 要兜底'
    ] },
    { type:'assisted', id:'b4-faq', tag:'Build · 任选实现', title:'Build · Duo FAQ 手风琴', task:'实现 4 条 Duo FAQ。details/summary 或 button+JS 都合法——判分只测行为：能开、能关、控件键盘可达。选完后准备在 Reasoning 里说明取舍。', brief:[
      '4 个问题（折痕会断吗 / 支持 Apple Pencil 吗 / 外屏能独立使用吗 / 防水等级）——问答内容由你撰写',
      '默认收起，点击展开，再点收起',
      '问题控件是 summary 或 button（键盘可达、有 focus 样式）',
      '若用 JS 方案：aria-expanded 标注展开状态'
    ], script:true,
      starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; padding: 24px; max-width: 640px; }\n  h2 { font-size: 21px; }\n  .faq { border-top: 1px solid #d2d2d7; }\n  /* 实现方式你选：details/summary 或 button+JS 都行 */\n</style>\n</head>\n<body>\n  <h2>Duo 常见问题</h2>\n  <div class="faq">\n    <!-- TODO: 4 组问答。问题示例：铰链折痕会影响显示吗？ -->\n  </div>\n</body>\n</html>',
      hints:[
        'L1 方向：方案 A = 4 个 <details><summary>问题</summary><p>答案</p></details>，零 JS；方案 B = button + 相邻答案容器 + class 切换。先定方案，再写 4 组内容',
        'L2 结构：details 方案的开合由 open 属性表达（JS 零行）；button+JS 方案则在点击处理器里翻转答案容器的可见性，并同步按钮的 aria-expanded 与布尔值一致',
        'L3 接近答案：details 版一行模板——<details><summary style="cursor:pointer;padding:14px 0">Q</summary><p style="color:#6e6e73">A</p></details>；JS 版监听按钮 click → ans.hidden = !ans.hidden'
      ],
      answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; padding: 24px; max-width: 640px; }\n  h2 { font-size: 21px; }\n  .faq { border-top: 1px solid #d2d2d7; }\n  .faq details { border-bottom: 1px solid #d2d2d7; }\n  .faq summary { cursor: pointer; padding: 14px 0; font-size: 15px; font-weight: 600; }\n  .faq summary:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; }\n  .faq p { margin: 0 0 14px; font-size: 13.5px; color: #6e6e73; line-height: 1.7; }\n</style>\n</head>\n<body>\n  <h2>Duo 常见问题</h2>\n  <div class="faq">\n    <details>\n      <summary>铰链折痕会影响显示吗？</summary>\n      <p>内屏采用纳米纹理表层与 10 层超薄结构，折痕在正常使用视角下几乎不可见。</p>\n    </details>\n    <details>\n      <summary>支持 Apple Pencil 吗？</summary>\n      <p>支持。展开后的 7.6 英寸内屏可作为随手记录的画板。</p>\n    </details>\n    <details>\n      <summary>外屏能独立完成日常使用吗？</summary>\n      <p>5.4 英寸外屏显示面积达 iPhone 18 Pro 的 90% 以上，闭合状态可独立完成通话与信息。</p>\n    </details>\n    <details>\n      <summary>防水等级是什么？</summary>\n      <p>具备抗水能力（具体等级与 Apple 官网核对后再写——教学示例不编数字）。</p>\n    </details>\n  </div>\n</body>\n</html>',
      checks:[
        { label:'4 组问答存在（问题控件是 summary 或 button）', js:'(function(){var n=doc.querySelectorAll("summary,button").length;return n>=4;})()' },
        { label:'初始状态：答案不可见（收起）', js:'(function(){return !doc.querySelector("details[open]");})()' },
        { label:'点击第一问 → 答案可见', js:'(function(){var t=doc.querySelector("summary")||doc.querySelector("button");if(!t)return false;t.click();var d=t.closest?t.closest("details"):null;if(d)return d.hasAttribute("open");var a=t.nextElementSibling;return !!a&&a.offsetHeight>0;})()' },
        { label:'再点一次 → 收起', js:'(function(){var t=doc.querySelector("summary")||doc.querySelector("button");if(!t)return false;t.click();var d=t.closest?t.closest("details"):null;if(d)return !d.hasAttribute("open");var a=t.nextElementSibling;return !a||a.offsetHeight===0;})()' },
        { label:'JS 方案有 aria-expanded，或使用 details 元素', js:'(function(){return !!doc.querySelector("details")||!!doc.querySelector("[aria-expanded]");})()' }
      ] },
    { type:'assisted', id:'b4-reveal', tag:'Build · IO 迁移', title:'Build · 滚动显现', task:'模块进入视口时淡入上浮。你只有 Recall Card，没有教程——S12 的知识自己取用。', brief:[
      '页面含一个高 spacer（已给）+ 一个 .reveal 模块',
      '模块初始 opacity:0 且下移，进入视口后过渡进入',
      'JS 方案用 IntersectionObserver（推荐）；threshold 0.15；触发后 unobserve',
      '（无障碍）prefers-reduced-motion 下直接可见'
    ], script:true, tallFrame:true,
      starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; }\n  .spacer { height: 800px; display: flex; align-items: center; justify-content: center; color: #a1a1a6; font-size: 13px; }\n  /* TODO: .reveal 初始态 + .in 进入态 + 过渡 */\n  .reveal { background: #f5f5f7; border-radius: 16px; padding: 32px; margin: 0 24px 48px; }\n  @media (prefers-reduced-motion: reduce) { /* TODO */ }\n</style>\n</head>\n<body>\n  <div class="spacer">↓ 向下滚动 · 模块在视口外等待显现</div>\n  <section class="reveal">\n    <h3 style="margin:0 0 6px">灵活多用</h3>\n    <p style="margin:0;color:#6e6e73;font-size:14px">iOS 重塑新体验，摆出面面新可能。</p>\n  </section>\n  <script>\n    // TODO: IntersectionObserver → isIntersecting → add("in") → unobserve\n  </script>\n</body>\n</html>',
      hints:[
        'L1 方向：CSS 两态（.reveal 初始 opacity:0/transform:translateY(24px)，.in 恢复 + transition），JS 只负责在相交时 add("in")',
        'L2 结构：三步——① new 一个 IntersectionObserver（回调 + threshold 0.15）；② 回调里对 isIntersecting 的目标加 class 并停止观察它；③ observe 目标元素。CSS 侧的 .reveal/.in 两态由你写',
        'L3 接近答案：reduced-motion 兜底——@media (prefers-reduced-motion: reduce){ .reveal{opacity:1;transform:none;transition:none} }'
      ],
      answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; }\n  .spacer { height: 800px; display: flex; align-items: center; justify-content: center; color: #a1a1a6; font-size: 13px; }\n  .reveal { background: #f5f5f7; border-radius: 16px; padding: 32px; margin: 0 24px 48px; opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }\n  .reveal.in { opacity: 1; transform: none; }\n  @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }\n</style>\n</head>\n<body>\n  <div class="spacer">↓ 向下滚动 · 模块在视口外等待显现</div>\n  <section class="reveal">\n    <h3 style="margin:0 0 6px">灵活多用</h3>\n    <p style="margin:0;color:#6e6e73;font-size:14px">iOS 重塑新体验，摆出面面新可能。</p>\n  </section>\n  <script>\n    var io = new IntersectionObserver(function (entries) {\n      entries.forEach(function (en) {\n        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }\n      });\n    }, { threshold: 0.15 });\n    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });\n  </script>\n</body>\n</html>',
      checks:[
        { label:'.reveal 存在且初始不可见（opacity < 1）', js:'(function(){var r=doc.querySelector(".reveal");if(!r)return false;return parseFloat(win.getComputedStyle(r).opacity)<1||r.getBoundingClientRect().top>0;})()' },
        { label:'滚动到模块 → opacity 变为 1', scroll:true, js:'(function(){var r=doc.querySelector(".reveal");if(!r)return false;return r.classList.contains("in")||parseFloat(win.getComputedStyle(r).opacity)>0.5;})()' },
        { label:'触发后 observer 停止观察（unobserve / 一次性）', js:'(function(){var s=doc.querySelector("script");return !!s&&s.textContent.indexOf("unobserve")>-1;})()' }
      ] },
    { type:'debug', title:'Debug · 「第二项展开时，第一项不收起」', story:'症状：需求是互斥手风琴——同一时间只开一条。现在的实现：展开第二问后，第一问仍然开着。逐条独立开关是对的，互斥没有发生。', script:true,
      starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; padding: 24px; max-width: 640px; }\n  .q { display: block; width: 100%; text-align: left; font: inherit; font-size: 15px; font-weight: 600;\n       padding: 14px 0; background: none; border: none; border-bottom: 1px solid #d2d2d7; cursor: pointer; }\n  .q:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; }\n  .a { margin: 0 0 14px; font-size: 13.5px; color: #6e6e73; line-height: 1.7; }\n</style>\n</head>\n<body>\n  <div class="faq">\n    <button class="q" aria-expanded="false">铰链折痕会影响显示吗？</button>\n    <p class="a" hidden>内屏采用纳米纹理表层，折痕几乎不可见。</p>\n    <button class="q" aria-expanded="false">支持 Apple Pencil 吗？</button>\n    <p class="a" hidden>支持。展开后的 7.6 英寸内屏可作为画板。</p>\n  </div>\n  <script>\n    var qs = document.querySelectorAll(".q");\n    qs.forEach(function (q) {\n      q.addEventListener("click", function () {\n        var a = q.nextElementSibling;\n        var open = a.hidden;\n        a.hidden = !open;\n        q.setAttribute("aria-expanded", String(open));\n        /* TODO 症状：互斥没发生——缺了什么？ */\n      });\n    });\n  </script>\n</body>\n</html>',
      hints:[
        'L1 方向：互斥 = 打开一条之前，先把其他所有条目关掉。现在每条只管自己',
        'L2 缩小范围：点击处理器里，在展开当前项之前，遍历所有 .q/.a：不是当前的全部 hidden=true + aria-expanded=false',
        'L3 接近答案：qs.forEach(function(o){ if(o!==q){ o.nextElementSibling.hidden=true; o.setAttribute("aria-expanded","false"); } });'
      ],
      cause:'根因：每条问答的监听器只操作自己的状态——互斥是"条目之间的关系"，必须有一步"遍历他人、重置他人"。单条自洽 ≠ 全局正确：这就是状态模型里"谁负责维护全局约束"的问题。',
      answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; padding: 24px; max-width: 640px; }\n  .q { display: block; width: 100%; text-align: left; font: inherit; font-size: 15px; font-weight: 600; padding: 14px 0; background: none; border: none; border-bottom: 1px solid #d2d2d7; cursor: pointer; }\n  .q:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; }\n  .a { margin: 0 0 14px; font-size: 13.5px; color: #6e6e73; line-height: 1.7; }\n</style>\n</head>\n<body>\n  <div class="faq">\n    <button class="q" aria-expanded="false">铰链折痕会影响显示吗？</button>\n    <p class="a" hidden>内屏采用纳米纹理表层，折痕几乎不可见。</p>\n    <button class="q" aria-expanded="false">支持 Apple Pencil 吗？</button>\n    <p class="a" hidden>支持。展开后的 7.6 英寸内屏可作为画板。</p>\n  </div>\n  <script>\n    var qs = document.querySelectorAll(".q");\n    qs.forEach(function (q) {\n      q.addEventListener("click", function () {\n        var a = q.nextElementSibling;\n        var open = a.hidden;\n        qs.forEach(function (o) {\n          o.nextElementSibling.hidden = true;\n          o.setAttribute("aria-expanded", "false");\n        });\n        if (open) { a.hidden = false; q.setAttribute("aria-expanded", "true"); }\n      });\n    });\n  </script>\n</body>\n</html>',
      checks:[
        { label:'点开第一问 → 第一问答案可见', js:'(function(){var qs=doc.querySelectorAll(".q");qs[0].click();return !qs[0].nextElementSibling.hidden;})()' },
        { label:'再点第二问 → 第二问可见', js:'(function(){var qs=doc.querySelectorAll(".q");qs[1].click();return !qs[1].nextElementSibling.hidden;})()' },
        { label:'互斥：此时第一问已收起', js:'(function(){var qs=doc.querySelectorAll(".q");return qs[0].nextElementSibling.hidden;})()' },
        { label:'aria-expanded 状态同步正确', js:'(function(){var qs=doc.querySelectorAll(".q");return qs[0].getAttribute("aria-expanded")==="false"&&qs[1].getAttribute("aria-expanded")==="true";})()' }
      ] },
    { type:'reasoning', id:'b4-r', title:'Explain · 你的手风琴选了哪条路，为什么', lead:'details/summary 还是 button+JS？写出你的取舍依据。', checks:[
      '我列过需求：要不要互斥？要不要动画？要多少浏览器兼容面？',
      '我知道 details 自带语义与键盘行为，JS 方案要自己补 aria-expanded',
      '我能说出我的方案在"以后要加互斥/动画"时的改造成本',
      '我没有因为"JS 显得专业"或"零 JS 显得极简"而跳过需求分析'
    ], considerations:[
      'details：零 JS、语义内置、键盘免费；代价是样式控制与互斥都要绕（name 属性 2026 兼容面仍需评估）',
      'button+JS：完全控制 + 互斥直白；代价是要手动补无障碍与键盘细节',
      '判断顺序：需求 → 方案成本 → 选择。先选再凑理由是倒置',
      '两种都通过判分——因为判分测的是行为，而行为两种都达标'
    ] },
    { type:'checklist', title:'Mission 4 验收', items:[
      '三个 Decision Prediction 我都给了判断 + 依据（不是背口诀）',
      'FAQ 手风琴通过行为判分——无论 details 还是 JS 方案',
      '滚动显现用 IO 实现，reduced-motion 有兜底',
      '互斥 Bug 已修复并写入 Bug Journal',
      '我能说出"状态影响样式→CSS，影响结构/数据→JS"的成本分析'
    ]},
    { type:'milestone' },
    { type:'summary', title:'Mission 4 完成', points:[
      ['方法', 'CSS vs JS = 成本分析：状态影响什么，决定工具是什么'],
      ['无障碍', 'aria-expanded / summary 键盘行为——交互不只是"能动"'],
      ['下一步', 'Mission 5：完整重建 Apple「定睛细看」查看器']
    ], next:{ stage:'b5', text:'进入 Mission 5 · Complex Section Reconstruction' } }
    ] },

  { id:'b5', num:5, title:'Complex Section Reconstruction', short:'复杂重建', status:'ready', minutes:'160–200 min',
    blocks:[
    { type:'goals', title:'Mission 5 · Complex Section Reconstruction', lead:'选择 Duo 页面最复杂的模块之一——「定睛细看」产品查看器（真实页面有 7 种姿态）。不给逐行教程：只有 Reference、Requirements、Assets、Acceptance Criteria。三级 Help 是你的安全网，用了会被 Independence 记录。', items:[
      '独立重建姿态查看器（4 姿态简化版：闭合/坐立/展开/横屏）',
      '状态联动：图片 + 标题 + active pill 三同步（M2 的放大版）',
      '响应式：桌面左右结构，移动端堆叠',
      '至少记录一条 Bug Journal'
    ] },
    { type:'apple', title:'Reference · 「定睛细看」查看器（真实页面结构）', img:'assets/images/duo/duo-fold-half.svg', imgCap:'真实页面为 7 姿态查看器；本关简化为 4 姿态', points:[
      ['结构', '左侧姿态 pill 列表（可折叠设计/横屏/竖屏/闭合/坐立/站立/耐久性），右侧设备大图'],
      ['交互', '点击 pill → 图片 + 说明联动；当前 pill 有选中态'],
      ['键盘', 'pill 全部可 Tab 聚焦、Enter 触发'],
      ['证据', '[VISUAL OBSERVATION] 参考截图 duo-page-strip-1.png；[TEACHING IMPLEMENTATION] 简化为 4 态']
    ] },
    { type:'assisted', id:'b5-viewer', tag:'Build · 独立重建', title:'Build · 姿态查看器（定睛细看）', task:'从空白 starter 重建查看器。这关不教你——把 M2 的 state 模型 + M4 的判断力组合起来。Help 在工具栏里，用了会记录。', brief:[
      '4 个姿态 pill（button）：闭合 / 坐立 / 展开 / 横屏，垂直排列',
      '点击 → 右侧大图切换（closed/half/open/dual-screen）+ 标题与说明文字联动 + pill 选中态',
      '布局：桌面（≥735px）左 pill 右图；窄屏堆叠（pill 在上）',
      '键盘可达（button + focus 样式）；390px 无横向溢出',
      '初始态：闭合'
    ], script:true, wideFrame:true,
      starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; background: #f5f5f7; padding: 24px; }\n  /* 结构参考：.viewer 内 左 .pills 右 .stage——布局方式你定 */\n  .pills button { display: block; width: 100%; font: inherit; font-size: 14px; text-align: left;\n                  padding: 10px 16px; margin-bottom: 8px; border-radius: 99px;\n                  border: 1px solid #d2d2d7; background: #fff; cursor: pointer; }\n  .pills button.active { background: #0071e3; color: #fff; border-color: #0071e3; }\n  .pills button:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; }\n  .stage img { display: block; width: min(360px, 100%); margin: 0 auto; }\n  .stage h3 { margin: 12px 0 4px; font-size: 17px; }\n  .stage p { margin: 0; font-size: 13px; color: #6e6e73; }\n</style>\n</head>\n<body>\n  <div class="viewer">\n    <!-- TODO: 4 个姿态 pill（闭合/坐立/展开/横屏）+ 右侧 .stage（图/标题/说明） -->\n  </div>\n  <script>\n    // TODO: state → UI（图片、标题、说明、active 同步）\n    // 素材：../assets/images/duo/duo-fold-closed.svg | duo-fold-half.svg | duo-fold-open.svg | duo-dual-screen.svg\n  </script>\n</body>\n</html>',
      hints:[
        'L1 方向：先写数据表 POSTURES = { closed:{img,name,desc}, half:{…}, open:{…}, dual:{…} }——M2 的模式直接放大',
        'L2 缩小范围：布局用 flex（.viewer{display:flex;gap:24px}，窄屏 column）；点击处理器里同步 img.src / h3 / p / active 四处',
        'L3 接近答案：pill 数据属性 data-p="closed|half|open|dual"，处理器读 POSTURES[p] 后逐处赋值；@media (max-width:734px){.viewer{flex-direction:column}}'
      ],
      answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; background: #f5f5f7; padding: 24px; }\n  .viewer { display: flex; gap: 28px; align-items: flex-start; max-width: 760px; margin: 0 auto; }\n  .pills { flex: 0 0 180px; }\n  .pills button { display: block; width: 100%; font: inherit; font-size: 14px; text-align: left; padding: 10px 16px; margin-bottom: 8px; border-radius: 99px; border: 1px solid #d2d2d7; background: #fff; cursor: pointer; }\n  .pills button.active { background: #0071e3; color: #fff; border-color: #0071e3; }\n  .pills button:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; }\n  .stage { flex: 1; text-align: center; }\n  .stage img { display: block; width: min(360px, 100%); margin: 0 auto; }\n  .stage h3 { margin: 12px 0 4px; font-size: 17px; }\n  .stage p { margin: 0; font-size: 13px; color: #6e6e73; }\n  @media (max-width: 734px) { .viewer { flex-direction: column; } .pills { flex: none; width: 100%; } }\n</style>\n</head>\n<body>\n  <div class="viewer">\n    <div class="pills">\n      <button class="active" data-p="closed">闭合</button>\n      <button data-p="half">坐立</button>\n      <button data-p="open">展开</button>\n      <button data-p="dual">横屏</button>\n    </div>\n    <div class="stage">\n      <img id="vImg" src="../assets/images/duo/duo-fold-closed.svg" alt="iPhone Duo 姿态">\n      <h3 id="vName">闭合</h3>\n      <p id="vDesc">外屏朝上，日常随行。</p>\n    </div>\n  </div>\n  <script>\n    var POSTURES = {\n      closed: { img: "../assets/images/duo/duo-fold-closed.svg",  name: "闭合", desc: "外屏朝上，日常随行。" },\n      half:   { img: "../assets/images/duo/duo-fold-half.svg",    name: "坐立", desc: "铰链立起，视频通话免手持。" },\n      open:   { img: "../assets/images/duo/duo-fold-open.svg",    name: "展开", desc: "7.6 英寸内屏，一览无余。" },\n      dual:   { img: "../assets/images/duo/duo-dual-screen.svg",  name: "横屏", desc: "分屏多任务，两边同时进行。" }\n    };\n    var img = document.getElementById("vImg");\n    var nameEl = document.getElementById("vName");\n    var descEl = document.getElementById("vDesc");\n    var btns = document.querySelectorAll(".pills button");\n    btns.forEach(function (b) {\n      b.addEventListener("click", function () {\n        var p = POSTURES[b.dataset.p];\n        img.src = p.img;\n        nameEl.textContent = p.name;\n        descEl.textContent = p.desc;\n        btns.forEach(function (x) { x.classList.toggle("active", x === b); });\n      });\n    });\n  </script>\n</body>\n</html>',
      checks:[
        { label:'4 个姿态 pill 都是 button', js:'(function(){var bs=doc.querySelectorAll("button");var n=0;for(var i=0;i<bs.length;i++){if(/闭合|坐立|展开|横屏/.test(bs[i].textContent))n++;}return n>=4;})()' },
        { label:'初始态：闭合图 + 闭合标题', js:'(function(){var im=doc.querySelector(".stage img")||doc.querySelector("img");var n=doc.getElementById("vName")||doc.querySelector(".stage h3");return !!im&&im.src.indexOf("closed")>-1&&!!n&&n.textContent.indexOf("闭合")>-1;})()' },
        { label:'点「坐立」→ 图/标题联动', js:'(function(){var bs=doc.querySelectorAll("button");for(var i=0;i<bs.length;i++){if(bs[i].textContent.indexOf("坐立")>-1){bs[i].click();break;}}var im=doc.querySelector("img");var n=(doc.getElementById("vName")||doc.querySelector(".stage h3"));return !!im&&im.src.indexOf("half")>-1&&!!n&&n.textContent.indexOf("坐立")>-1;})()' },
        { label:'点「横屏」→ 切到双屏图', js:'(function(){var bs=doc.querySelectorAll("button");for(var i=0;i<bs.length;i++){if(bs[i].textContent.indexOf("横屏")>-1){bs[i].click();break;}}var im=doc.querySelector("img");return !!im&&im.src.indexOf("dual")>-1;})()' },
        { label:'当前 pill 有选中态（active class）', js:'(function(){var bs=doc.querySelectorAll("button");for(var i=0;i<bs.length;i++){if(bs[i].textContent.indexOf("横屏")>-1)return bs[i].classList.contains("active");}return false;})()' },
        { label:'390px：无横向溢出', width:390, js:'(function(){return doc.documentElement.scrollWidth<=391;})()' }
      ] },
    { type:'reasoning', id:'b5-r', title:'Explain · 查看器的状态设计', lead:'真实页面有 7 种姿态。为什么不用 7 张高清大图一次全部渲染、用滚动浏览？', checks:[
      '我能说出状态数量与资源成本的关系（图越多，首屏与内存成本越高）',
      '我考虑了用户注意力：一次看一个姿态 vs 自己在 7 张图里找',
      '我知道查看器模式可以随需求扩展（加价格联动/对比）而滚动列表不行',
      '我能说出本关 4 态简化是 [TEACHING IMPLEMENTATION]，不是 Apple 原样'
    ], considerations:[
      '查看器 = 互斥单选状态（M4 互斥的图形版）；滚动列表 = 全量展示。前者控制注意力，后者鼓励扫读',
      '资源：7 张大图全渲染 → 首屏加载与内存都为 100%；查看器按需切换，配合懒加载成本更低',
      '扩展性：查看器的 state 可以联动文案/CTA/对比数据——列表做不到',
      '证据分级意识：4 态是教学简化，答题时明确标注，不要把它说成 Apple 的事实'
    ] },
    { type:'bugjournal', title:'Bug Journal · 复杂重建的坑', lead:'查看器比切换器多了布局、响应式、多数据字段——出 Bug 的面也更大。修完把过程记下来。' },
    { type:'checklist', title:'Mission 5 验收', items:[
      '查看器通过全部检查（四态联动 + active + 响应式 + 键盘）',
      '我没有看教程——只在需要时用了 Help（已计入 Independence）',
      '我能解释查看器 vs 滚动列表的取舍',
      'Bug Journal 新增至少一条',
      '我能区分 [VISUAL OBSERVATION] 与 [TEACHING IMPLEMENTATION]'
    ]},
    { type:'milestone' },
    { type:'summary', title:'Mission 5 完成', points:[
      ['方法', 'Reference + Requirements + Acceptance——没有教程的重建'],
      ['组合', 'M2 状态模型 × M3 响应式 × M4 判断力 = 复杂模块'],
      ['下一步', 'Mission 6：独立重建 Duo 精华页——最后没有人帮你']
    ], next:{ stage:'b6', text:'进入 Mission 6 · Independent Duo Reconstruction' } }
    ] },

  { id:'b6', num:6, title:'Independent Duo Reconstruction', short:'独立重建', status:'ready', minutes:'220–300 min',
    blocks:[
    { type:'goals', title:'Mission 6 · Independent Duo Reconstruction', lead:'最后一关。没有教程、没有逐行提示。Reference + Assets + Required Behavior + Acceptance Criteria——然后是你和页面的独处。Independence 指标会在结尾等你。', items:[
      '自主实现「Duo 精华页」：Hero + 折叠或配色交互 + 双屏布局 + 对比表 + FAQ + 页脚',
      '语义、响应式、无障碍、键盘全部自查',
      'Contextual Design 终极拷问：B2B 场景你会推翻 Apple 的哪些选择？',
      '查看 Independence 指标——定位还需要回顾的知识区'
    ] },
    { type:'apple', title:'Reference · Duo 页面（回顾）', img:'curriculum/reference/duo-hero-desktop.png', imgCap:'真实页面参考 · 本关只要求代表性模块，不求 1:1 长度', points:[
      ['范围', '[TEACHING IMPLEMENTATION] 选代表性模块：Hero / 折叠或配色交互 / 双屏布局 / 对比表 / FAQ / Footer'],
      ['事实', '[VERIFIED APPLE FACT] 内屏 7.6\" · A20 Pro · RMB 15,999 起　[MEDIA-REPORTED] 外屏 5.4\" · 折叠 11.3mm/展开 5.2mm（2026-09 媒体口径，Apple 官网未直接标注）'],
      ['素材', 'assets/images/duo/ 全部可用（hero、三折叠态、双屏、相机、双色）'],
      ['目标', '自主实现质量 > 页面长度']
    ] },
    { type:'assisted', id:'b6-final', tag:'Final · Independent', export:{ file:'duo-independent.html' }, title:'Final Build · Duo 精华页', task:'从近空白 starter 开始，独立完成。Acceptance Criteria 在检查清单里——它就是需求文档。Help 按钮仍在（这很诚实），但每一级都会被记录。', brief:[
      '语义骨架：header(nav) + main(hero / 交互区 / 双屏区 / 对比表 / FAQ) + footer',
      'Hero：产品名 + 「Hello，hello。」巨型标语 + 产品图 + 价格信息',
      '交互区：折叠三态切换 或 夜空色/星光色配色切换——至少一个真实 JS 交互，状态同步完整',
      '双屏区：桌面并排等宽、窄屏堆叠（Flex/Grid 自选）',
      '对比表：Duo vs 18 Pro 至少 3 行规格，表头用 scope 标注',
      'FAQ：至少 3 条，details 或 JS 方案均可',
      '全页：所有 img 有 alt、无横向溢出（390px）、交互控件键盘可达、console 无错误'
    ], script:true, wideFrame:true, tallFrame:true,
      starter:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  /* Duo 精华页 — 独立实现。可用素材（相对本预览）：\n     ../assets/images/duo/duo-hero-desktop.svg · duo-hero-mobile.svg\n     duo-fold-closed.svg · duo-fold-half.svg · duo-fold-open.svg\n     duo-dual-screen.svg · duo-camera-close.svg\n     duo-color-midnight.svg · duo-color-starlight.svg\n     [VERIFIED APPLE FACT] 7.6 内屏 · A20 Pro · RMB 15,999 起 · [MEDIA-REPORTED] 外屏 5.4 / 11.3-5.2mm（媒体口径 2026-09）*/\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; }\n</style>\n</head>\n<body>\n  <!-- TODO: header(nav) + main(hero + 交互 + 双屏 + 对比表 + FAQ) + footer -->\n\n</body>\n</html>',
      hints:[
        'L1 方向：先写语义骨架（header/main/footer + 五个 section），每个 section 先放标题和占位——让页面立起来，再逐区充实',
        'L2 缩小范围：交互区抄 M2/M5 的 state 模型（数据表 + 三同步）；双屏区用 M3 的几何方案；对比表回忆 S13（table > thead th[scope=col] + tbody th[scope=row]）',
        'L3 接近答案：Hero 结构参考 M1 答案；配色切换 = 两张 duo-color-*.svg + 圆点按钮 + .state-name 同步；逐项对照 Acceptance 自查'
      ],
      answer:'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<style>\n  * { box-sizing: border-box; }\n  body { margin: 0; font-family: -apple-system, "PingFang SC", sans-serif; background: #fff; color: #1d1d1f; }\n  header nav { display: flex; justify-content: space-between; padding: 12px 22px; font-size: 12px; background: #f5f5f7; }\n  header nav a { color: #1d1d1f; text-decoration: none; }\n  .hero { text-align: center; padding: 64px 22px 32px; }\n  .hero .name { font-size: 19px; font-weight: 600; margin: 0 0 8px; }\n  .hero h1 { font-size: clamp(56px, 10vw, 128px); margin: 0 0 16px; }\n  .hero .price { color: #6e6e73; font-size: 14px; }\n  .hero img { display: block; width: min(560px, 80%); margin: 20px auto 0; }\n  .stage { text-align: center; padding: 40px 22px; background: #f5f5f7; }\n  .fold-btn { font: inherit; padding: 8px 18px; margin: 0 4px; border-radius: 99px; border: 1px solid #d2d2d7; background: #fff; cursor: pointer; }\n  .fold-btn.active { background: #0071e3; color: #fff; border-color: #0071e3; }\n  .fold-btn:focus-visible { outline: 2px solid #0071e3; outline-offset: 2px; }\n  .stage img { display: block; width: min(300px, 80%); margin: 18px auto 6px; }\n  .state-name { font-size: 13px; color: #6e6e73; }\n  .dual { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 40px 22px; background: #f5f5f7; }\n  .dual .panel { background: #fff; border-radius: 16px; padding: 20px; }\n  .tbl-wrap { padding: 40px 22px; overflow-x: auto; }\n  table { border-collapse: collapse; width: 100%; font-size: 14px; }\n  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e8e8ed; }\n  .faq-wrap { padding: 0 22px 40px; max-width: 640px; }\n  .faq-wrap details { border-bottom: 1px solid #e8e8ed; }\n  .faq-wrap summary { cursor: pointer; padding: 12px 0; font-weight: 600; }\n  .faq-wrap p { color: #6e6e73; font-size: 13.5px; }\n  footer { border-top: 1px solid #e8e8ed; padding: 24px 22px; font-size: 12px; color: #6e6e73; }\n  @media (max-width: 734px) { .dual { grid-template-columns: 1fr; } }\n</style>\n</head>\n<body>\n  <header>\n    <nav aria-label="全局"><a href="#">Apple</a><a href="#">iPhone</a><a href="#">购买</a></nav>\n  </header>\n  <main>\n    <section class="hero">\n      <p class="name">iPhone Duo</p>\n      <h1>Hello，hello。</h1>\n      <p class="price">RMB 15,999 起或 RMB 667/月 (24 期) 起 · 7.6 英寸内屏 · A20 Pro</p>\n      <img src="../assets/images/duo/duo-hero-desktop.svg" alt="iPhone Duo 折叠形态" width="1600" height="900">\n    </section>\n    <section class="stage">\n      <p>\n        <button class="fold-btn active" data-state="closed">闭合</button>\n        <button class="fold-btn" data-state="half">坐立</button>\n        <button class="fold-btn" data-state="open">展开</button>\n      </p>\n      <img id="foldImg" src="../assets/images/duo/duo-fold-closed.svg" alt="iPhone Duo 折叠状态">\n      <p class="state-name">闭合</p>\n    </section>\n    <section class="dual">\n      <div class="panel"><h3>MAP</h3><p>路线导航与实时路况。</p></div>\n      <div class="panel"><h3>MESSAGES</h3><p>对话与通知互不遮挡。</p></div>\n    </section>\n    <section class="tbl-wrap">\n      <h2 style="font-size:21px">Duo 或 18 Pro？</h2>\n      <table>\n        <thead><tr><th></th><th scope="col">iPhone Duo</th><th scope="col">iPhone 18 Pro</th></tr></thead>\n        <tbody>\n          <tr><th scope="row">屏幕</th><td>7.6 英寸内屏（折叠）</td><td>6.9 英寸</td></tr>\n          <tr><th scope="row">芯片</th><td>A20 Pro</td><td>A20 Pro</td></tr>\n          <tr><th scope="row">电池（视频播放）</th><td>内屏最长 31 小时</td><td>最长 43 小时</td></tr>\n        </tbody>\n      </table>\n    </section>\n    <section class="faq-wrap">\n      <h2 style="font-size:21px">常见问题</h2>\n      <details><summary>外屏能独立使用吗？</summary><p>可以。5.4 英寸外屏覆盖 90% 以上日常场景。</p></details>\n      <details><summary>折痕明显吗？</summary><p>纳米纹理表层 + 10 层超薄内屏，正常视角几乎不可见。</p></details>\n      <details><summary>什么时候发货？</summary><p>10 月 16 日晚 8 点接受预购，10 月 23 日发售。</p></details>\n    </section>\n  </main>\n  <footer>© 2026 教学复刻 · 非 Apple 官方页面 · 仅供学习</footer>\n  <script>\n    var STATES = {\n      closed: { img: "../assets/images/duo/duo-fold-closed.svg", name: "闭合" },\n      half:   { img: "../assets/images/duo/duo-fold-half.svg",   name: "坐立" },\n      open:   { img: "../assets/images/duo/duo-fold-open.svg",   name: "展开" }\n    };\n    var img = document.getElementById("foldImg");\n    var nameEl = document.querySelector(".state-name");\n    var btns = document.querySelectorAll(".fold-btn");\n    btns.forEach(function (b) {\n      b.addEventListener("click", function () {\n        var s = STATES[b.dataset.state];\n        img.src = s.img;\n        nameEl.textContent = s.name;\n        btns.forEach(function (x) { x.classList.toggle("active", x === b); });\n      });\n    });\n  </script>\n</body>\n</html>',
      checks:[
        { label:'语义骨架：header nav + main + footer', js:'(function(){return !!doc.querySelector("header nav")&&!!doc.querySelector("main")&&!!doc.querySelector("footer");})()' },
        { label:'Hero：h1 含 Hello', js:'(function(){var h=doc.querySelector("h1");return !!h&&h.textContent.indexOf("Hello")>-1;})()' },
        { label:'交互：点击切换控件后图片与状态文字同步', js:'(function(){var bs=doc.querySelectorAll("button");for(var i=0;i<bs.length;i++){if(bs[i].textContent.indexOf("展开")>-1||bs[i].textContent.indexOf("星光")>-1){bs[i].click();break;}}var ims=doc.querySelectorAll("img");var im=null;for(var j=0;j<ims.length;j++){var s=ims[j].getAttribute("src")||"";if(s.indexOf("fold-")>-1||s.indexOf("color-")>-1){im=ims[j];break;}}if(!im)return false;var changed=im.src.indexOf("open")>-1||im.src.indexOf("starlight")>-1;var nm=doc.querySelector(".state-name,.color-name");var synced=!nm||nm.textContent.length>0;return changed&&synced;})()' },
        { label:'双屏区：桌面并排', js:'(function(){var ps=doc.querySelectorAll(".panel,.dual > *");if(ps.length<2)return false;var a=ps[0].getBoundingClientRect(),b=ps[1].getBoundingClientRect();return Math.abs(a.top-b.top)<8&&b.left>=a.right-2;})()' },
        { label:'对比表：table + scope 标注', js:'(function(){var t=doc.querySelector("table");if(!t)return false;return !!t.querySelector("th[scope]")&&t.querySelectorAll("tbody tr").length>=3;})()' },
        { label:'FAQ：至少 3 条（details 或 JS 方案）', js:'(function(){var n=doc.querySelectorAll("details").length;if(n>=3)return true;var qs=doc.querySelectorAll(".q,[data-a]");return qs.length>=3;})()' },
        { label:'无障碍：所有 img 都有 alt', js:'(function(){var ims=doc.querySelectorAll("img");for(var i=0;i<ims.length;i++){if(!ims[i].hasAttribute("alt"))return false;}return ims.length>0;})()' },
        { label:'390px：无横向溢出', width:390, js:'(function(){return doc.documentElement.scrollWidth<=391;})()' }
      ] },
    { type:'reasoning', id:'b6-r', title:'Explain · Contextual Design 终极拷问', lead:'如果这是 B2B 折叠设备（企业采购、户外作业）的官网，你会推翻 Apple 的哪些选择？', checks:[
      '我能指出至少两处 Apple 消费品做法在 B2B 场景的失效',
      '我考虑了新受众（采购决策者）与已知产品（不再需要发布会式宣告）',
      '我知道哪些原则仍然成立（层级、对比、响应式、无障碍）',
      '我能区分"Apple 风格"与"设计原则"——前者是选择，后者是底线'
    ], considerations:[
      '发布会式巨型 Hero → 信息效率优先：参数、适配性、TCO 前置（参考户外码表考试的结论）',
      '氛围大图 → 场景实证图（作业现场、耐久测试）；情绪让位给证据',
      '仍然成立：语义结构、视觉层级、响应式、键盘可达、对比度——原则跨场景，风格不跨',
      '这正是整门课的目标：脱离模仿，按 User/Goal/Constraint 重新判断'
    ] },
    { type:'quiz', title:'Retrieval · 毕业前最后一次凭记忆', questions:[
        { q:'互斥手风琴（开一关一）的关键实现步是？', options:['每条各自为政即可','打开当前前先遍历重置其他条目','用 details 自动互斥（任何版本都行）','把所有答案都显示出来'], answer:1, explain:'互斥是"条目之间的关系"，必须有全局重置步。' },
        { q:'判断"CSS 够还是需要 JS"的依据是？', options:['JS 总是更好','状态影响什么：只影响样式→CSS，影响结构/数据→JS','看个人喜好','CSS 已被废弃'], answer:1, explain:'成本分析，不是工具崇拜。' },
        { q:'outcome-based 判分意味着？', options:['必须写 Grid','必须与参考答案逐字一致','几何结果与行为达标即通过，实现路径不限','不需要写代码'], answer:2, explain:'多解合法——这正是真实工程的样子。' }
      ]},
    { type:'independence', title:'Independence Indicators · 你的独立调用图谱', lead:'不是分数。Strong = ≤L1 帮助解决；Assisted = 用到 L2；Needs Review = 用到 L3 或 Reference。它告诉你：哪些知识已经能独立调用，哪些值得回 Project A 再看一眼。', areas:[
        { name:'Hero 语义与排版', from:'M1 · b1-hero', challenge:'b1-hero' },
        { name:'JS 状态模型', from:'M2 · b2-fold', challenge:'b2-fold' },
        { name:'Flex/Grid 布局选型', from:'M3 · b3-layout', challenge:'b3-layout' },
        { name:'CSS vs JS 决策 + 互斥', from:'M4 · b4-faq', challenge:'b4-faq' },
        { name:'复杂模块重建', from:'M5 · b5-viewer', challenge:'b5-viewer' },
        { name:'独立完成整页', from:'M6 · b6-final', challenge:'b6-final' }
      ] },
    { type:'checklist', title:'Project B 毕业清单', items:[
      '我完成了 6 个 Mission，每个 Prediction 都诚实选择了 Confidence',
      '我的最终实现通过全部 Acceptance 检查（语义/交互/响应式/表格/FAQ/无障碍/390）',
      '我能按 User/Goal/Constraint 论证自己的设计选择，而不是模仿 Apple',
      '我的 Bug Journal 里有 3 条以上完整五段记录',
      '我知道自己的 Independence 图谱：哪里 Strong，哪里 Needs Review',
      '我准备好进入 Project C（原创官网）'
    ]},
    { type:'milestone' },
    { type:'summary', title:'Project B 毕业', points:[
      ['路径', 'Guided（A）→ Assisted（B）：预测 · 决策 · 构建 · 解释 · 校准'],
      ['能力', 'Recognition → Recall → Selection → Application → Debugging → Design Reasoning'],
      ['图谱', 'Independence Indicators 告诉你下一步回顾哪里'],
      ['下一步', 'Project C · 原创产品官网（Independent）——Coming']
    ], next:{ stage:'home', text:'回到首页查看 Project B 完成状态' } }
    ] }
]},

/* ================= PROJECT C · 沐光 HelioHub（Independent Mode · 6 Phases） ================= */
/* v2 架构冻结：Phase 0–5 / 9 核心文件 / project/heliohub/ 真实项目。
   status 保持 coming 直至 M2 渲染器全部可达并通过浏览器验证（铁律：Course Availability 对应真实可达 UI）。 */
{ id:'C', name:'Project C · 沐光 HelioHub', mode:'Independent 独立',
  stages:[
  { id:'c0', num:0, title:'Phase 0 · Understand the Brief', status:'coming', plan:'读懂 Brief：价值主张 / 用户与目标 / 歧义清单 / Assumptions Log。', tags:['brief'] },
  { id:'c1', num:1, title:'Phase 1 · Research & Define', status:'coming', plan:'站点地图 / 内容清单 / 表单 Research Gap / Scope Cut。', tags:['research','ia'] },
  { id:'c2', num:2, title:'Phase 2 · Design Direction', status:'coming', plan:'Token 表 / 构图声明 / 与 Apple 默认解的决裂声明。', tags:['direction'] },
  { id:'c3', num:3, title:'Phase 3 · Build', status:'coming', plan:'在 project/heliohub/ 真实多文件项目中实现 MVP（9 个核心文件）。', tags:['build'] },
  { id:'c4', num:4, title:'Phase 4 · Review & Repair', status:'coming', plan:'Review Package → External Review → Findings 裁决 → Repair → 复审。', tags:['review'] },
  { id:'c5', num:5, title:'Phase 5 · Defend & Graduate', status:'coming', plan:'Design / Technical Rationale + Final Defense + 毕业门（X / 6 Phases）。', tags:['defense'] }
]}
]
};

/* ================= BLIND FINAL EXAM（独立 Final Assessment Route，不属于任何 stages 数组） ================= */
/* 考试内容层。学生端可见；不含任何参考 DOM/CSS/布局答案。渲染器见 learn.js renderExam()。 */
window.EXAM_DATA = {
  brand: 'Vector Trail',
  sub: 'Professional Outdoor Cycling Computer',
  tagline: '一块在强光下、雨天里、全速巡航中、戴着骑行手套时——依然一扫可读的码表。',
  brief: [
    'Vector Trail 是一款面向专业与严肃爱好者的户外智能骑行码表。它装在公路车的把组上，跟着用户翻山、逆风、淋雨、赶时间。',
    '这不是一块"顺便能显示时间"的智能手表配件——它是骑行时的仪表盘：用户在 40 km/h 的下坡中只给它 1 秒的扫视时间，它必须把最关键的信息在 1 秒内交付。',
    '你的任务：为它设计并实现一个完整的产品官网。不是改一张 Apple 页面的皮肤——从信息架构开始，基于它的用户与使用场景做设计判断。'
  ],
  users: [
    '公路骑行用户：长距离巡航、爬坡训练，关心功率/心率/配速趋势',
    '山地骑行用户：颠簸路段、戴手套、视线离开路面即有风险',
    '长距离耐力用户：200km+ 骑行，电量焦虑是真实痛点',
    '训练型用户：用数据安排训练计划，会在桌面端复盘深度数据'
  ],
  environment: [
    '户外强光：正午阳光直射屏幕与页面（可能立于树荫明暗交界）',
    '高速运动中短时扫读：单次注视 < 1 秒',
    '戴骑行手套操作：触控目标必须宽松、可键盘/触控直达',
    '雨天与泥点：信息不能依赖细腻的低对比灰字',
    '桌面端复盘：训练后在大屏上回看路线与数据趋势'
  ],
  features: [
    { name: 'Ride Data', cn: '骑行数据', what: '速度 / 距离 / 时间等实时核心数据' },
    { name: 'Navigation', cn: '路线导航', what: '转向提示、路线回放、爬升剖面' },
    { name: 'Training Status', cn: '训练状态', what: '负荷 / 恢复 / 训练建议' },
    { name: 'Heart Rate', cn: '心率', what: '实时心率与区间分布' },
    { name: 'Climbing', cn: '爬升', what: '坡度 / 累计爬升 / 剩余爬坡' },
    { name: 'Battery', cn: '电池', what: '超长续航与省电模式' }
  ],
  constraints: [
    '户外强光下核心信息必须可读——可读性是硬约束，实现方向由你设计判断',
    '信息密度明显高于 iPhone 式营销页：一次扫视要带回数据，而不是只带回情绪',
    '数据优先：页面主角是数据与功能，不是氛围图',
    '工具属性优先：用户用它训练，而不是用它羡慕',
    'Desktop 与 Mobile 都必须成立（至少 1440 与 390 两档实测通过）',
    '不允许直接复制 Project A 的 Hero 结构',
    '不允许"换品牌名的 Apple 页"：黑底 + 超大标语 + 单一大图的组合不构成设计判断',
    '每一个视觉决定，都要能回答"为什么它适合骑行场景"'
  ],
  required: [
    { item: 'Hero', note: '让骑行用户 3 秒内明白这是什么、为谁而生' },
    { item: 'Core Features', note: '六项核心能力的呈现方式由你组织' },
    { item: 'Ride Data', note: '数据呈现要有工具感，不是营销口号' },
    { item: 'Navigation', note: '路线/转向能力的展示' },
    { item: 'Training Metrics', note: '训练状态/心率/爬升等指标' },
    { item: 'Battery', note: '续航是耐力用户的购买理由之一' },
    { item: 'Product Specifications', note: '规格表——密集信息的秩序（参考 S13 原则，方案自定）' },
    { item: 'Purchase CTA', note: '明确的购买主行动，层级自定' },
    { item: 'FAQ', note: '真实骑行用户会问的问题（至少 4 条，内容由你撰写）' },
    { item: 'Footer', note: '完整的页脚信息' }
  ],
  tech: [
    'Semantic HTML（语义标签用在对的地方）',
    'CSS Layout（至少一处 Flexbox、一处 Grid——用在哪由你判断）',
    'Responsive Design（至少 1440 / 768 / 390 三档成立）',
    'Responsive Media（图片在各档位合理加载与呈现）',
    'CTA hierarchy（主次行动清晰）',
    '至少一个 JavaScript Interaction（真实可交互、状态同步）',
    'Keyboard usable controls（交互控件可聚焦、可操作）',
    'Basic Accessibility（lang / alt / 焦点可见 / 语义结构）',
    'Mobile adaptation（触控目标与移动端可读性）',
    '无横向溢出（390px 下）',
    'Debugging（记录你遇到的真实问题与修复过程）'
  ],
  deliverables: [
    'Information Architecture（模块清单与组织理由，一页即可）',
    '完整 HTML（index.html）',
    '完整 CSS（styles.css）',
    'JavaScript（main.js 或内联，须真实可运行）',
    'Desktop 页面（1440 宽截图或描述）',
    'Mobile 页面（390 宽截图或描述）',
    'Design Rationale（回答本页列出的全部设计问题）',
    'Responsive Rationale（断点策略与理由）',
    'Accessibility Checklist（逐项自查）',
    'Debug Log（问题 → 假设 → 验证 → 修复）'
  ],
  rationale: [
    '为什么 Hero 采用现在的结构？',
    '整个页面的第一视觉焦点是什么？为什么是它？',
    '为什么选择当前的 Typography hierarchy？',
    '哪些模块使用了 Flexbox？',
    '哪些模块使用了 Grid？',
    '上述选型的理由是什么？（为什么不是反过来）',
    '你如何处理强光环境下的可读性？',
    'Desktop 与 Mobile 之间最重要的结构变化是什么？',
    'CTA 为什么这样设置主次？',
    '哪些 Project A 原则被继续使用？',
    '哪些 Apple 的做法被你主动舍弃？',
    '为什么没有直接复制 iPhone 18 Pro 页面？'
  ],
  rubric: [
    { dim: 'Information Architecture', focus: '模块分组与顺序是否服务骑行用户的扫读路径' },
    { dim: 'Semantic HTML', focus: '语义标签用对位置；header/nav/main/section/footer 各司其职' },
    { dim: 'Content Hierarchy', focus: '每一屏内主次是否一眼分明' },
    { dim: 'Typography', focus: '字阶 / 行高 / 字重是否成系统，而非逐处手调' },
    { dim: 'Spacing', focus: '间距有节奏、有 token 意识，不是随机值' },
    { dim: 'Composition', focus: '视觉焦点与构图是否服务户外场景' },
    { dim: 'CSS Layout', focus: 'Flex / Grid 选型与实现质量（选型本身无标准答案）' },
    { dim: 'Responsive Design', focus: '断点策略一致；两档端实测完整' },
    { dim: 'Responsive Media', focus: '媒体在各档位的加载、比例与表现' },
    { dim: 'JavaScript Interaction', focus: '交互真实、状态三同步、无僵尸监听' },
    { dim: 'Accessibility', focus: 'alt / 焦点 / 键盘 / 对比 / 语义' },
    { dim: 'Code Maintainability', focus: '命名 / 组织 / 重复度 / 可读性' },
    { dim: 'Debugging', focus: 'Debug Log 是否真实呈现 问题→假设→验证→修复' },
    { dim: 'Design Reasoning', focus: '取舍是否基于用户/目标/约束，而非对 Apple 的惯性照搬' }
  ],
  autoChecks: [
    'html 带 lang 属性',
    'meta viewport 存在',
    '主要 semantic 元素齐备（header / nav / main / section / footer）',
    '390px 宽下无横向滚动条',
    'Console 无 JS 错误',
    '交互控件可被键盘聚焦（Tab 可达）',
    '所有 img 均有 alt',
    'Desktop 与 Mobile 两档截图/描述已提交'
  ],
  manualChecks: [
    'Typography 是否优秀（Auto 只能检查字号存在，不能检查品味）',
    'Composition 是否优秀（Auto 无法判断构图）',
    'Design Reasoning 质量（Auto 无法判断理由深度）',
    'Spacing 节奏与系统性',
    'Content Hierarchy 的实际观感',
    'Information Architecture 的组织质量'
  ],
  assets: [
    { file: 'assets/images/exam/bike-computer-front.svg', alt: 'Vector Trail 码表正面：屏幕显示骑行数据' },
    { file: 'assets/images/exam/bike-computer-angle.svg', alt: 'Vector Trail 码表 3/4 视角：机身与按钮' },
    { file: 'assets/images/exam/map-screen.svg', alt: '屏幕特写：路线导航图' },
    { file: 'assets/images/exam/data-screen.svg', alt: '屏幕特写：训练数据分区' },
    { file: 'assets/images/exam/navigation-screen.svg', alt: '屏幕特写：转向导航提示' }
  ]
};

/* 学习平台使用到的里程碑（Project A 页面成长） */
window.COURSE_MILESTONES = [
  { id:'stage-0', s:'S0', t:'页面解剖', dark:false, res:'还没有页面——你在理解整座网站的构造。' },
  { id:'stage-1', s:'S1', t:'文档骨架', dark:false, res:'一副正确但空白的骨架：画布上什么都看不见。' },
  { id:'stage-2', s:'S2', t:'纯黑 + Hero 文案', dark:true, res:'页面第一次可见：纯黑背景 + 白色 Hero 文案层级。' },
  { id:'stage-3', s:'S3', t:'CTA 与交互反馈', dark:true, res:'Hero 开始可以操作：CTA + Hover + Focus + Transition。' },
  { id:'stage-4', s:'S4', t:'产品视觉登场', dark:true, res:'重要里程碑：真正的产品视觉进入 Hero——网站第一次拥有视觉主体。' },
  { id:'stage-5', s:'S5', t:'Hero 完整', dark:true, res:'Hero 布局精修完成，接近 Apple 观感。' },
  { id:'stage-6', s:'S6', t:'全局导航', dark:true, res:'顶部 44px 全局导航出现。' },
  { id:'stage-7', s:'S7', t:'吸顶子导航', dark:true, res:'产品子导航滚动吸顶。' },
  { id:'stage-8', s:'S8', t:'图文两栏', dark:true, res:'第一个"左文右图"产品模块。' },
  { id:'stage-9', s:'S9', t:'全宽视频', dark:true, res:'全宽产品影片区上线。' },
  { id:'stage-10', s:'S10', t:'卡片矩阵', dark:true, res:'"先刷重点"卡片矩阵 + 选项卡。' },
  { id:'stage-11', s:'S11', t:'颜色切换交互', dark:true, res:'四色切换真实交互上线。' },
  { id:'stage-12', s:'S12', t:'滚动显现', dark:true, res:'模块滚动淡入。' },
  { id:'stage-13', s:'S13', t:'对比表+页脚', dark:true, res:'规格对比区 + 完整页脚。' },
  { id:'stage-14', s:'S14', t:'Project A 毕业', dark:true, res:'桌面 / 手机两档完整还原——Project A 毕业。' },
  { id:'b1', s:'M1', t:'拆解 Duo Hero', dark:false, res:'Assisted 模式开始：预测 → 揭示 → 重建居中 Hero。' },
  { id:'b2', s:'M2', t:'折叠状态模型', dark:false, res:'UI = f(state)：三态切换 + 状态三同步 + 第一只 Bug Journal。' },
  { id:'b3', s:'M3', t:'双屏响应式布局', dark:false, res:'Outcome-based 多解判分：Flex/Grid 由你选，几何说了算。' },
  { id:'b4', s:'M4', t:'交互叙事与决策', dark:false, res:'CSS vs JS 成本分析：手风琴 + IO 滚动显现 + 互斥修复。' },
  { id:'b5', s:'M5', t:'复杂模块重建', dark:false, res:'无教程重建「定睛细看」查看器——三级 Help 记入 Independence。' },
  { id:'b6', s:'M6', t:'独立重建毕业', dark:false, res:'Duo 精华页独立实现 + Independence 图谱——Project B 毕业。' }
];

/* ================= HELIO BRIEF（Project C 内容地基 · M1） =================
   客户 Brief 与事实库。所有 P0–P5 渲染器从这里取内容，禁止散落在 learn.js。
   本产品为教学虚构；所有价格/数据/费率均为 Teaching Model，Brief 内多处显式声明。 */
window.HELIO_BRIEF = {
  meta: {
    codename: 'HelioHub',
    cn: '沐光 · 家庭能源中枢',
    briefVersion: '1.0（Architecture v2 冻结版）',
    release: 'staged',           /* 分段释放：主 Brief 先行，hiddenAppendix 需提问解锁 */
    fiction: '本 Brief 为教学虚构产品与虚构企业；所有价格、数据、费率均为教学模型。'
  },

  product: {
    oneLiner: '沐光 HelioHub 是一台装在车库或配电箱旁的家庭能源中枢：它把屋顶光伏、储能电池和电网统一调度，晚高峰自动切换电池供电，月底账单见分晓。',
    what: '它不是智能电表，也不是一堆智能开关的组合——它是家里所有电的调度台：光伏发的、电池存的、电网来的，每一度电去哪了，它来调度（并如实记账）。',
    whyNow: '分时电价覆盖越来越广，晚高峰电价可以是深夜的三倍。大多数家庭既看不懂自己的用电结构，也没有工具主动调度——他们缺的不是又一台电器，是一个「看得懂、信得过」的调度台。',
    trust: '信任感是这个产品的生死线：用户要把自己家的电路交给它。网站的第一任务不是惊艳，是可信。'
  },

  businessGoal: {
    primary: '让业主在 3 分钟内理解「这台机器怎么帮我省钱」，并预约一次免费上门勘测。',
    metrics: ['勘测预约提交量', '计算器使用 → 预约转化', '支持页自助解决率']
  },

  primaryUsers: [
    { role: '家庭业主（决策者）', detail: '30–45 岁，管账的人。对「省 30%」这类数字天然怀疑——会去算、会去比、会去查条款。', topQuestion: '这台东西一年到底能帮我省多少钱？靠谱吗？' },
    { role: '家庭成员（日常使用者）', detail: '不看报表，只想要一句话的安心：现在用的谁的电、今晚停不停电。', topQuestion: '今晚停电吗？现在用的是谁的电？' },
    { role: '安装工程师', detail: '看参数、安装条件与流程，不看营销话术。', topQuestion: '这一户的现场条件够不够？我要带什么设备？' }
  ],
  secondaryUsers: [
    { role: '物业 / 电工', detail: '关心安装是否动公共线路、是否有资质。', topQuestion: '施工会不会影响其他住户？' }
  ],

  coreProblems: [
    '看不懂：电费单只有一个总数。家庭不知道电都花在哪、贵在哪一个小时。',
    '管不了：明知晚高峰贵，也没有工具让「热水器别这时候烧」。',
    '不信：节能产品的宣传数字太漂亮，业主没有办法按自己家的情况算一遍。'
  ],

  mvpPages: {
    fileManifest: ['index.html', 'calculator.html', 'plans.html', 'survey.html', 'support.html', 'privacy.html', 'styles.css', 'main.js', 'README.md'],
    manifestNote: 'LOCAL QA 的文件存在性检查以这 9 个核心文件为准（project/heliohub/）。',
    pages: [
      { file: 'index.html', tier: 'primary', duty: 'Home / 产品体验：让决策者建立信任并产生「按我家情况算一算」的冲动。' },
      { file: 'calculator.html', tier: 'primary', duty: '节能计算器：本站最重要的信任工具——按自己的电费算一遍。业务契约见 calculator。' },
      { file: 'plans.html', tier: 'primary', duty: '资费与方案对比：三档方案与适用家庭；表格信息密集，桌面与手机都必须可读。' },
      { file: 'survey.html', tier: 'primary', duty: '预约上门勘测：收集地址/家庭情况/时间窗/电话，提交后有明确确认。表单知识需自行研究（见 formRequirements）。' },
      { file: 'support.html', tier: 'secondary', duty: '支持：常见问题与联系途径。目的在多页导航、footer 与信息层级，不要求设计突破。' },
      { file: 'privacy.html', tier: 'secondary', duty: '隐私说明：数据采集范围与承诺。同上，二级页标准。' }
    ]
  },

  requiredFeatures: [
    '跨页共享的导航与页脚——六个页面是一个网站，不是六张孤立的图',
    '节能计算器：契约见 calculator（Teaching Model 公式固定，交互形态由你决定）',
    '勘测预约表单：见 formRequirements 的验收标准',
    '资费对比：三档方案在桌面与手机两种阅读方式下都成立',
    '素材使用：assets/images/helio/ 提供了教学素材——用哪些、放哪里、配什么文字，由你决定'
  ],

  constraints: [
    '目标用户包含老年家庭成员：正文可读性是硬约束，实现方向由你判断',
    '信任优先：页面上的数字必须有出处（Teaching Model / 教学设定标注），不许无依据承诺',
    '深色大图 Hero 不是必须的——本产品的信任感来自「看得懂的朴素」；是否采用由你论证，且必须能辩护',
    'Desktop 与 Mobile 都必须成立（至少 1440 与 390 两档实测通过）',
    '全部 6 页共享同一套导航与页脚',
    '计算公式必须使用 Brief 提供的 Teaching Model，不得自造费率'
  ],

  trustPrivacy: [
    '「节省百分比」不是承诺而是模型估算——界面文案必须让用户知道这是估算（措辞由你设计）',
    '勘测预约收集的信息（地址/电话/时间窗）必须在隐私页有对应说明',
    '不得出现政府或电网公司的背书暗示（客户与电网无官方合作，仅代办并网手续）',
    '客户明确拒绝：营销弹窗、自动播放音视频、虚假倒计时、恐吓式文案'
  ],

  calculator: {
    title: 'Calculator Contract（Teaching Model）',
    disclaimer: 'For learning purposes only——真实电价因地区、时段、政策而异。本模型只用于教学，不构成任何真实报价。',
    inputs: [
      { label: '月均电费', kind: '货币数值', example: '¥ 100 – 2,000' },
      { label: '已装光伏', kind: '是 / 否' },
      { label: '已装储能电池', kind: '是 / 否' }
    ],
    outputs: ['预计每月节省（¥）', '预计每年节省（¥）', '剩余电网用电占比（%）'],
    model: [
      '无光伏 · 无电池：节省 = 月均电费 × 18%',
      '有光伏 · 无电池：节省 = 月均电费 × 30%',
      '有光伏 · 有电池：节省 = 月均电费 × 42%',
      '只有电池 · 无光伏：业务上不成立——界面必须向用户解释原因（如何解释由你设计）'
    ],
    gridShare: '剩余电网占比教学值：无光伏 100% / 有光伏 55% / 有光伏+电池 35%（与上表配套，仅用于展示）',
    localQACases: [
      { input: '¥200 / 无光伏 / 无电池', expectMonthly: '¥36' },
      { input: '¥350 / 有光伏 / 无电池', expectMonthly: '¥105' },
      { input: '¥500 / 有光伏 / 有电池', expectMonthly: '¥210' }
    ],
    edgeCases: ['空输入', '非数字', '负数', '电池无光伏组合'],
    notProvided: '输入控件结构、DOM、函数划分、状态模型、事件组织、按钮文案——全部由你设计。Brief 只定义业务，不定义实现。'
  },

  formRequirements: {
    page: 'survey.html',
    business: '收集：小区/地址、家庭大致情况（如居住人数/是否自有住房）、期望勘测时间窗、联系电话。提交后用户必须明确知道「下一步会发生什么」。',
    acceptance: [
      '每个控件都有可访问名称（具体技术由你研究后决定）',
      '必要字段有验证；错误状态可被感知（不能只靠颜色区分）',
      '提交后有可见、可理解的确认（不是 alert）',
      '电话字段只接受合理格式'
    ],
    researchGap: '表单（form / label / input / select / 验证 / fieldset / legend）在本课程中从未被系统教学——这是刻意的 Research Gap。你需要自己查资料、做最小实验、留下 Research Note。Phase 1 的 Gate 条件包含这篇笔记。'
  },

  /* Client 事实库：P0 Q&A 只能从这里匹配回答；匹配不到时统一回复「这个由你决定」。 */
  clientFacts: {
    howToUse: 'main = Brief 已含的公开事实；hiddenAppendix = 问到才释放的客户附录；open = 客户不设答案、由学生决定并记录。',
    open: [
      '视觉方向：配色、字体、语气——客户只要「信任感」这个结果，不预设手段',
      '页面布局、模块顺序与断点：由你按内容决定',
      '计算器的交互形态：输入框、滑杆、分步向导——由你决定',
      '每个页面的信息取舍与详略',
      '二级页的内容组织方式',
      '「节省数字如何标注为估算」的具体措辞'
    ]
  },

  /* Client Hidden Appendix：P0 提问命中关键词后释放。 */
  hiddenAppendix: [
    { q: '省 30% 是不是所有家庭都能做到？', a: '不是。18/30/42% 是按调度能力给出的模型估算，实际取决于你家能把多少用电挪出高峰窗口——这正是计算器存在的意义：让用户按自己家的情况算，而不是相信统一承诺。' },
    { q: '只有电池、没有光伏，能装吗？', a: '技术上可以，但省钱逻辑不成立：电池只能在峰谷之间搬运有限电量，没有光伏补充，净收益接近于零。我们不做这个组合的营销，官网也不应把它当作推荐选项。' },
    { q: '安装当天家里要停电吗？', a: '只有更换主开关的约 2 小时例外，其余时间正常供电。勘测报告会提前告知具体时段。' },
    { q: '用电数据存在哪、谁能看到？', a: '仅存于沐光云（境内节点），传输全程加密，只用于调度优化与账单展示；不出售、不用于广告；用户可随时导出或删除。隐私页素材里有完整条款。' },
    { q: '老房子、老电路能装吗？', a: '2010 年后建成的小区绝大多数可以直接安装；最终以勘测工程师的现场评估为准——官网不应替工程师下结论。' },
    { q: '能直接控制我的空调或热水器吗？', a: '首版只做调度建议与一键执行（例如把热水器推迟到低谷时段），不做空调品牌遥控。请避免让用户误以为它是万能遥控器。' },
    { q: '满配版起价 ¥16,999 之后还有别的费用吗？', a: '按屋顶评估可能出现加项（支架/走线），报价在勘测后出具；签约之后不会再出现新的收费项。' }
  ],

  clientFactsMain: [
    '安装位置与条件：挂墙安装在车库或配电箱旁；需要一路 220V 电路与 2.4G Wi-Fi 覆盖。',
    '分时电价背景（教学设定）：晚高峰 18:00–21:00 电价约为深夜时段的 3 倍；多数家庭 40% 以上的用电发生在这个窗口。',
    '产品三档方案（教学设定价格）：基础版 ¥3,999（中枢 + 安装）；全天候版 ¥9,999（中枢 + 5kWh 电池）；满配版 ¥16,999 起（6kW 光伏 + 10kWh 电池 + 中枢，按屋顶评估定价）。',
    '预约流程：提交勘测预约 → 48 小时内电话确认 → 上门勘测约 90 分钟 → 3 个工作日内出具方案与报价。',
    '服务范围：首期仅开放试点城市（北京 / 上海 / 广州 / 深圳 / 杭州）。',
    '质保：主机 5 年；电池 8 年或 6000 次循环（以先到为准）。',
    '安装耗时：标准住宅 1 个工作日；更换主开关时该户停电约 2 小时。',
    '停电保护（教学设定）：有电池时自动切换供电，切换时间小于 20 毫秒——家里几乎无感。',
    'App 能力：实时/历史用电查看、调度建议推送、一键执行；iOS 与 Android。',
    '节省数字全部来自 Brief 的 Teaching Model（见 calculator），不是实测统计。',
    '不支持（首版）：三相电家庭、即热式热水器直控、三相大功率设备调度。',
    '试点数据（教学虚构）：500 户试点家庭，首年续约意愿 92%——引用时必须标注「试点调查」与「教学设定」。',
    '与电网公司：无官方合作关系，仅代办并网手续；不得暗示政府或电网背书。',
    '联系途径：支持页电话 400-000-0000（教学假号）与工作日 9:00–18:00 在线客服。'
  ],

  scopeBoundaries: [
    '明确不做：在线购买/支付、账号系统、实时电价 API 接入、多语言版本',
    'support / privacy 为二级页：信息组织与导航正确即可，不要求设计突破',
    '素材包之外的图不要求自绘——用排版与文字同样可以成立',
    '全部 6 个页面共享同一导航与页脚；单页「孤岛」不被接受'
  ],

  /* 二级页文字素材：只给内容，不给结构。 */
  secondaryPages: {
    support: {
      intro: '以下 FAQ 与联系信息为素材，如何组织由你决定。',
      faq: [
        { q: '勘测预约后多久有人联系我？', a: '48 小时内会有安装顾问电话确认时间，请保持电话畅通。' },
        { q: '安装需要我准备什么？', a: '确保安装位置（车库/配电箱旁）可以到达，Wi-Fi 覆盖 2.4G 频段，并清空设备挂墙区域。' },
        { q: '施工会弄脏墙面吗？', a: '走线以原有桥架和线槽为主，少量明线会使用线槽遮盖；施工结束后安装区清洁交付。' },
        { q: '可以查看每个电器的用电吗？', a: '中枢按回路计量（照明/插座/大功率电器回路），可到回路级；单个电器级计量需智能插座配合。' },
        { q: '搬家了设备能带走吗？', a: '基础版可以申请移机服务；满配版的光伏部分随房产归属，电池与中枢可移机。' },
        { q: '如何删除我的用电数据？', a: '在 App「隐私中心」提交删除申请，7 个工作日内完成全量删除并邮件确认。' }
      ],
      contact: '电话 400-000-0000（教学假号）· 工作日 9:00–18:00 · 在线客服（App 内）'
    },
    privacy: {
      intro: '以下条款为素材，如何呈现由你决定（注意 trustPrivacy 的要求）。',
      clauses: [
        { t: '我们收集什么', d: '账户信息（手机号）、安装地址与房型、按回路计量的用电数据、勘测预约记录。' },
        { t: '我们如何使用', d: '仅用于设备调度优化、账单展示与勘测服务；不用于广告，不向第三方出售。' },
        { t: '数据存在哪里', d: '沐光云境内节点，传输全程加密；保留期为服务存续期 + 12 个月。' },
        { t: '你的权利', d: '随时导出全部用电数据；提交删除申请后 7 个工作日内全量删除并邮件确认。' },
        { t: '儿童与家庭成员', d: '家庭成员查看功能需主账户授权；儿童数据不做单独画像。' },
        { t: '教学声明', d: '本页为课程教学虚构条款，不构成任何真实隐私政策。' }
      ]
    }
  },

  /* 教学素材包清单（渲染器与 LOCAL QA 均从此处读取）。 */
  assets: {
    dir: 'assets/images/helio/',
    note: '内容素材：颜色与构图是插画风格示意，不构成站点配色或布局建议。用哪些、放哪里由你决定。',
    files: [
      { file: 'hub-device.svg', shows: '沐光中枢主机正面（挂墙设备，状态灯环）' },
      { file: 'hub-installed.svg', shows: '安装场景：配电箱与中枢并排挂墙' },
      { file: 'energy-flow.svg', shows: '家庭能源流示意：电网 / 光伏 / 电池 / 中枢 / 家' },
      { file: 'solar-roof.svg', shows: '屋顶光伏板与太阳' },
      { file: 'battery-unit.svg', shows: '家用储能电池塔（电量指示）' },
      { file: 'grid-pylon.svg', shows: '输电塔（电网侧示意）' },
      { file: 'installer.svg', shows: '两名安装工程师作业场景' },
      { file: 'app-dashboard.svg', shows: 'App 仪表盘示意（实时用电卡片）' },
      { file: 'usage-curve.svg', shows: '24 小时用电曲线（晚高峰标注）' },
      { file: 'hub-ports.svg', shows: '中枢接口特写（电网/光伏/电池/网络）' },
      { file: 'home-evening.svg', shows: '傍晚的家庭住宅（信任/安心场景）' }
    ]
  },

  /* Self-QA 清单（P3/P4 使用；LOCAL QA 自动项之外的人工确认层）。 */
  selfQaChecklist: [
    '六页在浏览器直接打开全部可达（file:// 双击 index.html）',
    '每页有唯一 h1；导航在每页存在且能识别当前页',
    '所有 img 有 alt；装饰性图片的处理方式你能说明理由',
    '所有表单控件有可访问名称；必填验证可用；错误不只靠颜色',
    '计算器三组 LOCAL QA 用例自测通过；边界输入（空/非数字/负数/电池无光伏）不崩',
    '320 / 390 / 768 / 1440 四档无文档级横向滚动',
    '键盘能走通：导航 → 计算 → 提交，全程无键盘陷阱',
    'console 无错误',
    '无 TODO / lorem / 占位文本残留',
    '内部链接与锚点全部有效',
    '页面数字有出处（Teaching Model / 教学设定标注）',
    '节省相关文案带「估算」语义词',
    'reduced-motion 下页面功能不破坏',
    'README 与实际文件一致',
    'Decision Log 覆盖布局选型 / 断点 / JS 架构 / 表单实现四类各至少一条'
  ]
};

/* ================= HELIO BANKS（题库 · M1） =================
   本地规则选题，绝不生成式。Socratic/Critic 只问不答；Defense 不提供标准答案。 */
window.HELIO_BANKS = {
  defense: [
    { q: '为什么没有照搬 Apple？至少说出一个你主动拒绝的 Apple 式做法、拒绝的理由和代价。', tags: ['apple-breakup'], core: true },
    { q: '为什么这个 breakpoint 在这里？它由什么内容行为决定，而不是由设备型号决定？', tags: ['responsive'], core: true },
    { q: '为什么这里需要 JavaScript？没有它，这个页面会失去什么？', tags: ['calculator'], core: true },
    { q: '你最重要的一次 Scope Cut 是什么？如果今天重新决定，你还会砍掉它吗？', tags: ['scope'], core: true },
    { q: '你不同意 Reviewer 的地方是什么？你的证据链是什么？现在重看，你怎么看？', tags: ['dispute'], core: true },
    { q: '你研究的陌生知识是什么？你的最小实验证明了什么？', tags: ['help'], core: true },
    { q: '用你自己的话说：HelioHub 官网的「成功」是什么？你把这个定义写进了哪条 Decision？', tags: ['brief'] },
    { q: '三类用户里，你为谁牺牲了谁？举一个具体的取舍现场。', tags: ['brief'] },
    { q: '站点地图为什么是这个顺序？一个首次来访者从哪里进入计算器？', tags: ['ia'] },
    { q: 'survey 和 calculator 是两页——这个拆分是你的决定，说说它对用户流程的影响。', tags: ['ia'] },
    { q: 'footer 里放什么、不放什么？你的判断依据是什么？', tags: ['ia'] },
    { q: '二级页你花了几成精力？为什么这样分配是对的？', tags: ['scope'] },
    { q: '你的正文字号与行高是为谁定的？说出依据（用户特征，不是习惯）。', tags: ['tokens'] },
    { q: '你的主色为什么适合「信任」这个目标？换一个色系会更好还是更坏——你怎么判断？', tags: ['tokens'] },
    { q: '资费表在 390px 上你做了什么决定？为什么不用另一种常见方案？', tags: ['layout'] },
    { q: '哪里用了 Grid、哪里用了 Flex？各举一处，并说明为什么不能反过来。', tags: ['layout'] },
    { q: '首页在手机上的信息顺序与桌面一致吗？如果不一致，为什么允许不一致？', tags: ['responsive'] },
    { q: '「电池无光伏」这个组合，你的界面怎么处理？为什么这样处理而不是别样？', tags: ['calculator'] },
    { q: '计算结果旁边你放了什么出处/估算说明？为什么放在那个位置？', tags: ['calculator'] },
    { q: 'label 和 placeholder 的区别——在你的 survey 页代码里指出来讲。', tags: ['forms'] },
    { q: '提交确认你为什么用这种方式？alert 为什么不行？', tags: ['forms'] },
    { q: '键盘用户走完你的核心路径了吗？你在哪里、怎么验证过？', tags: ['accessibility'] },
    { q: '「错误状态不能只靠颜色」你是怎么落实的？指给评审看。', tags: ['accessibility'] },
    { q: '你修过的最隐蔽的一个 bug：从现象到根因的完整路径。', tags: ['debug'] },
    { q: '哪条 Review finding 让你不服、但后来发现对方是对的？', tags: ['review'] },
    { q: '你的 Self-QA 和 External Review 各自抓到了什么对方抓不到的问题？', tags: ['review'] },
    { q: '你的哪一处设计，如果给 Apple 的设计师看会被「改回去」？你为什么坚持？', tags: ['apple-breakup'] }
  ],

  socratic: [
    { q: '如果主要用户只有 10 秒，他们第一眼必须知道什么？你的页面现在满足吗？', phase: 1, topic: 'ia' },
    { q: '你的六个页面里，哪一个删掉后没有任何用户目标受损？那它为什么存在？', phase: 1, topic: 'scope' },
    { q: '这个功能服务三类用户中的哪一位？答不上来意味着什么？', phase: 1, topic: 'scope' },
    { q: '你查到的资料里，哪一条还没在自己的最小实验里验证过？', phase: 1, topic: 'research' },
    { q: '把你的正文颜色打印成黑白，层级还在吗？', phase: 2, topic: 'tokens' },
    { q: '如果只许保留三个字号，你留哪三个？多出来的那些在服务谁？', phase: 2, topic: 'tokens' },
    { q: '一个为电费焦虑的家长看到你的首屏，三秒后是更安心还是更怀疑？', phase: 2, topic: 'direction' },
    { q: '你现在的方向里，哪部分是「像 Apple 所以好看」，哪部分是「适合这个产品所以对」？', phase: 2, topic: 'direction' },
    { q: '这块内容不写任何布局、纯流式排下来会怎样？如果它已经成立，你为什么还需要那个容器？', phase: 3, topic: 'layout' },
    { q: '用户把月均电费填成 0，会看到什么？那是你想要的吗？', phase: 3, topic: 'calculator' },
    { q: '只用键盘，现在能完成一次提交吗？卡在哪一步？', phase: 3, topic: 'forms' },
    { q: '这条 finding 引用的证据在你代码的哪一行？找不到位置说明什么？', phase: 4, topic: 'review' },
    { q: '你打算反驳的那条 finding——如果导师也这么说，你还反驳吗？', phase: 4, topic: 'review' },
    { q: '明天要向一个陌生人讲述你最重要的三个决定，你讲哪三个？', phase: 5, topic: 'defense' }
  ],

  critic: [
    { q: '你的主色让它更像能源公司还是理财 App？你想让它像哪个——为什么？', topic: 'direction' },
    { q: '你的 Hero 只有一个核心主张吗？用一句话说出它，再看你页面上那一行是不是这句话。', topic: 'direction' },
    { q: '哪里你在用「大」制造层级而不是用「对比」？大是唯一手段吗？', topic: 'direction' },
    { q: '页面里最贵的一块空间（最大的留白）给了什么？值不值？', topic: 'direction' },
    { q: '如果禁用所有图片，你的首页还成立吗？', topic: 'direction' },
    { q: '一屏之内第一个被点击的东西应该是什么？实际第一个是什么？', topic: 'cta' },
    { q: '深色还是浅色——你的决定是从用户场景推出来的，还是从审美偏好？', topic: 'direction' },
    { q: '你沿用了 A 课的哪些模式？逐个问自己：在这里它还是对的吗？', topic: 'direction' }
  ],

  rationale: {
    design: [
      '你的首屏让用户第一眼记住哪一句话？为什么是它？',
      '哪个决定在服务「家庭业主」，哪个在服务「家庭成员」？各举一处。',
      '你的视觉方向从 Brief 的哪一条推出来？如果产品换成理财 App，哪条 Token 必须变？',
      '哪里你刻意选择了「朴素」而不是「高级感」？代价是什么？',
      '逐条说出你的三处 Apple 决裂：不学什么 + 为什么 + 代价。',
      '留白最大的区域给了什么内容？为什么它配得上？',
      '全站第一主动作是什么？为什么是它而不是「购买」？',
      'plans 页桌面与手机的信息顺序一致吗？说出决定与理由。',
      '图片在你的页面里承担什么职责？哪一张删掉后信任感不受损？',
      '如果只允许改动一处来提升信任感，你改哪里？为什么？'
    ],
    tech: [
      '资费表你用了什么布局方案？为什么不用另一种常见方案？',
      '你的断点有几个、值是多少？分别由什么内容行为触发？',
      '计算器有哪些状态？你为什么这样划分？',
      'main.js 的结构是怎么组织的？如果新增第二个交互，往哪里加？',
      '表单验证你研究了哪些方案？最终选了哪个、为什么？',
      '哪些地方你选择了普通文档流而不是 Flex/Grid？为什么？'
    ]
  }
};
