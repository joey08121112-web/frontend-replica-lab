/* ============================================================
   学习平台应用层：渲染 + 交互 + 进度 + 搜索
   纯 Vanilla JS，无依赖，双击 learn.html 即可运行。
   ============================================================ */
(function () {
'use strict';

var DATA = window.COURSE_DATA;
var MS = window.COURSE_MILESTONES;
var KEY = 'apple-course-v1';

/* ---------- 状态 ---------- */
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; }
}
var state = load() || { completed: [], checklists: {}, quiz: {}, current: 'home', exam: { started: false, submitted: false, reviewed: false } };
/* v1.0.1 向后兼容迁移：旧 localStorage 无 exam 字段时补默认值——绝不重建整个 state，保护既有学习进度 */
if (!state.exam) state.exam = { started: false, submitted: false, reviewed: false };
/* Project B（Assisted Mode）状态：prediction/confidence、hint 使用档位、reference 使用、reasoning 自查、Bug Journal、recall 打开记录。
   与 Project A 的 completed/checklists/quiz 完全隔离；缺失时补默认，绝不触碰既有字段。 */
if (!state.projB) state.projB = { predictions: {}, reasoning: {}, hints: {}, hintsSince: {}, solves: {}, refs: {}, attempts: {}, bugjournal: [], recall: {} };
if (!state.projB.solves) state.projB.solves = {};
if (!state.projB.hintsSince) state.projB.hintsSince = {};
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

/* ---------- 工具 ---------- */
function $(s, r) { return (r || document).querySelector(s); }
function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function hl(code) {
  var s = esc(code);
  s = s.replace(/(&lt;\/?!?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^&]|&(?!gt;))*?)(\/?&gt;)/g, function (m, o, t, rest, c) {
    rest = rest
      .replace(/([a-zA-Z-]+)(=)(&quot;.*?&quot;)/g, '<span class="c-attr">$1</span>$2<span class="c-str">$3</span>')
      .replace(/([a-zA-Z-]+)(=)(?!<span)/g, '<span class="c-attr">$1</span>$2');
    return o + '<span class="c-tag">' + t + '</span>' + rest + c;
  });
  s = s.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="c-com">$1</span>');
  return s;
}
function codeBlock(code) { return '<pre class="code">' + hl(code) + '</pre>'; }
function treeBlock(text) { return '<pre class="tk-tree">' + esc(text) + '</pre>'; }
function toast(msg) {
  var t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._tm);
  toast._tm = setTimeout(function () { t.classList.remove('show'); }, 2400);
}
function buildDoc(bodyHtml, css) {
  return '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">'
    + '<meta name="viewport" content="width=device-width, initial-scale=1">'
    + '<style>' + (css || '') + '</style></head><body>' + (bodyHtml || '') + '</body></html>';
}

/* ---------- 课程结构 ---------- */
var FLAT = [];
DATA.projects.forEach(function (p) {
  p.stages.forEach(function (st) { FLAT.push({ stage: st, project: p }); });
});
function flatOf(id) { for (var i = 0; i < FLAT.length; i++) if (FLAT[i].stage.id === id) return i; return -1; }
function getStage(id) { var i = flatOf(id); return i < 0 ? null : FLAT[i]; }
function totalStages() { return FLAT.length; }
function doneCount() { return state.completed.length; }
function isDone(id) { return state.completed.indexOf(id) >= 0; }
function firstUnfinished() {
  for (var i = 0; i < FLAT.length; i++) {
    if (FLAT[i].stage.status === 'ready' && !isDone(FLAT[i].stage.id)) return FLAT[i];
  }
  return null;
}

/* ---------- 侧栏 ---------- */
function renderSidebar() {
  var html = '';
  DATA.projects.forEach(function (p) {
    var doneInP = p.stages.filter(function (s) { return isDone(s.id); }).length;
    html += '<div class="proj-group"><div class="proj-head">'
      + '<span class="proj-name">' + esc(p.name) + '</span>'
      + '<span class="proj-mode">' + esc(p.mode) + '</span>'
      + '<span class="proj-mode">' + doneInP + '/' + p.stages.length + '</span>'
      + '</div>';
    p.stages.forEach(function (st) {
      var ico = '○', cls = '';
      if (st.status === 'coming') { cls = 'is-coming'; }
      if (isDone(st.id)) { ico = '✓'; }
      else if (state.current === st.id) { ico = '◐'; }
      if (state.current === st.id) { cls += ' active'; }
      html += '<button class="stage-item ' + cls + '" data-action="stage" data-id="' + st.id + '">'
        + '<span class="st-ico">' + ico + '</span>'
        + '<span class="st-num">S' + st.num + '</span>'
        + '<span class="st-name">' + esc(st.title) + '</span>'
        + (st.status === 'coming' ? '<span class="st-soon">未制作</span>' : '')
        + '</button>';
    });
    html += '</div>';
  });
  $('#sideNav').innerHTML = html;
}

/* ---------- 顶栏 ---------- */
function renderTopbar() {
  var cur = getStage(state.current);
  var pct = Math.round(doneCount() / totalStages() * 100);
  $('#progFill').style.width = pct + '%';
  $('#progText').textContent = '总进度 ' + pct + '%';
  var crumbs = '<span class="c-proj">首页</span>';
  if (cur) {
    crumbs = '<span class="c-proj">' + esc(cur.project.name) + '</span>'
      + '<span class="c-stage">Stage ' + cur.stage.num + ' · ' + esc(cur.stage.title) + '</span>';
  }
  $('#crumbs').innerHTML = crumbs;
}

/* ---------- Pager ---------- */
function renderPager() {
  var i = flatOf(state.current);
  var pager = $('#pager');
  if (i < 0) { pager.innerHTML = ''; pager.style.display = 'none'; return; }
  pager.style.display = '';
  var prev = i > 0 ? FLAT[i - 1] : null;
  var next = i < FLAT.length - 1 ? FLAT[i + 1] : null;
  var cur = FLAT[i].stage;
  var done = isDone(cur.id);
  pager.innerHTML =
    (prev ? '<button class="tool-btn" data-action="stage" data-id="' + prev.stage.id + '">← ' + esc(prev.stage.title) + '</button>' : '<span></span>')
    + '<div class="pg-info">' + (done ? '✓ 本关已标记学会' : '学完本关后点击右侧按钮标记') + '</div>'
    + '<button class="mark-btn' + (done ? ' done' : '') + '" data-action="mark-learned">' + (done ? '✓ 已学会' : '标记学会') + '</button>'
    + (next ? '<button class="tool-btn primary" data-action="stage" data-id="' + next.stage.id + '">' + esc(next.stage.title) + ' →</button>' : '<span></span>');
}

/* ============================================================
   块渲染器
   ============================================================ */
var R = {};

R.goals = function (b) {
  return '<section class="block"><div class="kicker">Goals</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p><ul class="goal-list">'
    + b.items.map(function (it, i) { return '<li><span class="g-n">' + (i + 1) + '</span><span>' + it + '</span></li>'; }).join('')
    + '</ul></section>';
};

R.effect = function (b) {
  function mock(m) {
    var canvasInner = esc(m.blank);
    if (m.hero) {
      canvasInner = '<span class="mini-hero"><span class="mh-name">' + esc(m.hero.name) + '</span>'
        + '<span class="mh-slogan">' + esc(m.hero.slogan) + '</span>'
        + '<span class="mh-desc">' + esc(m.hero.desc) + '</span>';
      if (m.hero.cta) {
        canvasInner += '<span class="mh-cta-row"><span class="mh-price">' + esc(m.hero.cta.price) + '</span>'
          + '<span class="mh-ctas"><span class="mh-cta">' + esc(m.hero.cta.primary) + '</span>'
          + '<span class="mh-link">' + esc(m.hero.cta.secondary) + '</span></span></span>';
      }
      if (m.hero.img) {
        canvasInner += '<img class="mh-img" src="' + m.hero.img + '" alt="">';
      }
      canvasInner += '</span>';
    }
    return '<div><p class="effect-tag">' + m.note + '</p><div class="browser">'
      + '<div class="b-chrome"><span class="b-dots"><i></i><i></i><i></i></span>'
      + '<span class="b-tab">' + esc(m.tab) + '</span></div>'
      + '<div class="b-canvas' + (m.dark ? ' dark' : '') + '">' + canvasInner + '</div>'
      + '</div></div>';
  }
  return '<section class="block"><div class="kicker">Result</div><h2>' + esc(b.title) + '</h2>'
    + '<div class="effect-row">' + mock(b.before) + mock(b.after)
    + '<p class="effect-cap">' + b.caption + '</p></div></section>';
};

R.apple = function (b) {
  return '<section class="block"><div class="kicker">Apple Example</div><h2>' + esc(b.title) + '</h2>'
    + '<div class="apple-shot"><img src="' + b.img + '" alt="iPhone 18 Pro 首屏参考截图">'
    + '<div class="shot-cap">' + esc(b.imgCap) + '</div></div>'
    + '<div class="apple-points">'
    + b.points.map(function (pt) { return '<div class="pt"><b>' + esc(pt[0]) + '</b><span>' + pt[1] + '</span></div>'; }).join('')
    + '</div></section>';
};

var TAG_TABS = [
  ['what', '是什么'], ['why', '为什么存在'], ['when', '什么时候用'], ['where', '通常放哪里'],
  ['inside', '里面通常放什么'], ['href', 'href 是什么'], ['kinds', '三种目的地'],
  ['kb', '键盘与默认行为'], ['min', '最小例子'], ['apple', 'Apple 官网例子'],
  ['hero', '在 Hero 中承担'], ['vs', '对比辨析'], ['errs', '常见错误'], ['try', '马上练习']
];
R.taglab = function (b, sid, bi) {
  var cards = b.tags.map(function (tag, ti) {
    var isAttr = tag.tag.indexOf('<') < 0;
    var tabsDef = TAG_TABS.filter(function (tt) { return tag[tt[0]]; });
    var tabs = tabsDef.map(function (tt, xi) {
      return '<button class="tag-tab' + (xi === 0 ? ' active' : '') + '" data-action="tag-tab" data-card="' + ti + '" data-tab="' + tt[0] + '">' + tt[1] + '</button>';
    }).join('');
    var panels = tabsDef.map(function (tt, xi) {
      var val = tag[tt[0]] || '';
      var inner = (tt[0] === 'min') ? codeBlock(val) : '<p>' + val + '</p>';
      var extra = '';
      if (tt[0] === 'apple') {
        var tree = tag.tree || '';
        if (tree) extra = treeBlock(tree);
      }
      return '<div class="tag-panel' + (xi === 0 ? ' active' : '') + '" data-panel="' + ti + '-' + tt[0] + '"><h4>' + tt[1] + '</h4>' + inner + extra + '</div>';
    }).join('');
    return '<div class="card tag-card" data-tagcard="' + ti + '">'
      + '<div class="tag-head" data-action="tag-open">'
      + '<span class="tag-title' + (isAttr ? ' attr' : '') + '">' + esc(tag.tag) + '</span>'
      + '<span class="tag-cn">' + esc(tag.cn) + '</span>'
      + '<span class="tag-caret">›</span>'
      + (tag.one ? '<p class="tag-one">' + tag.one + '</p>' : '')
      + '</div>'
      + '<div class="tag-tabs">' + tabs + '</div>'
      + '<div class="tag-panels">' + panels + '</div>'
      + '</div>';
  }).join('');
  return '<section class="block"><div class="kicker">Tag Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>' + cards + '</section>';
};

R.lab = function (b, sid, bi) {
  var idp = 'lab-' + sid + '-' + bi + '-';
  window.__vp = window.__vp || {};
  if (b.kind === 'title') {
    return '<section class="block"><div class="kicker">Mini Experiment</div><h2>' + esc(b.title) + '</h2>'
      + '<p class="lead">' + b.desc + '</p>'
      + '<div class="card lab">'
      + '<div class="lab-row"><input type="text" id="' + idp + 'input" value="我的页面" maxlength="40" aria-label="输入页面标题">'
      + '<div class="seg"><button class="tool-btn" data-action="lab-title-default">Reset</button></div></div>'
      + '<div class="tabbar-mock"><span class="tm-dot"></span>'
      + '<div class="tm-tab"><span class="tm-fav"></span><span class="tm-text" id="' + idp + 'tab">我的页面</span><span class="tm-x">×</span></div>'
      + '<span class="tm-dot"></span></div>'
      + '<pre class="code lab-codeline" id="' + idp + 'code"></pre>'
      + '</div></section>';
  }
  if (b.kind === 'bodybg') {
    var bgDoc = function (bg) {
      return buildDoc('<h1 style="margin:0 0 6px;font-size:26px">iPhone 18 Pro</h1>'
        + '<p style="margin:0;font-size:15px">Pro 再超前</p>',
        'body{margin:0;min-height:230px;display:flex;flex-direction:column;justify-content:center;padding:24px;background:' + bg + ';color:#f5f5f7;font-family:-apple-system,"PingFang SC",sans-serif;transition:background .4s}');
    };
    return '<section class="block"><div class="kicker">Mini Experiment</div><h2>' + esc(b.title) + '</h2>'
      + '<p class="lead">' + b.desc + '</p>'
      + '<div class="card lab">'
      + '<div class="lab-row"><div class="seg">'
      + '<button data-action="lab-bg" data-val="#ffffff">白色 #fff</button>'
      + '<button data-action="lab-bg" data-val="#f5f5f7">浅灰 #f5f5f7</button>'
      + '<button class="active" data-action="lab-bg" data-val="#000000">纯黑 #000（Apple）</button>'
      + '</div></div>'
      + '<div class="vp-stage"><div class="vp-device"><iframe id="' + idp + 'frame" sandbox="" title="背景实验预览"></iframe></div></div>'
      + '<p class="vp-caption">同一份白色文字，三种底色。Apple 选择纯黑 —— 注意黑色底上文字用的是 #f5f5f7 而不是纯白（刺眼度更低）。</p>'
      + '</div></section>';
  }
  if (b.kind === 'viewport') {
    window.__vp[idp + 'frame'] = b.vpHtml;
    return '<section class="block"><div class="kicker">Mini Experiment</div><h2>' + esc(b.title) + '</h2>'
      + '<p class="lead">' + b.desc + '</p>'
      + '<div class="card lab">'
      + '<div class="lab-row"><div class="seg">'
      + '<button class="active" data-action="lab-vp" data-val="off">无 viewport（事故）</button>'
      + '<button data-action="lab-vp" data-val="on">有 viewport（正常）</button>'
      + '</div></div>'
      + '<div class="vp-stage"><div class="vp-device mobile"><iframe id="' + idp + 'frame" sandbox="" title="viewport 实验预览"></iframe></div></div>'
      + '<p class="vp-caption">250px 手机框模拟。切换到「无 viewport」：内容按 980px 桌面布局再被等比缩小，文字看不清；切换到「有 viewport」：宽度真正跟随设备，文字正常。</p>'
      + '</div></section>';
  }
  if (b.kind === 'choose') {
    var opts = b.options.map(function (o, i) {
      return '<button class="choice-btn" data-action="lab-choose" data-i="' + i + '">' + esc(o.t) + '</button>';
    }).join(' ');
    return '<section class="block"><div class="kicker">Quick Judge</div><h2>' + esc(b.title) + '</h2>'
      + '<div class="card lab"><p class="lab-title">选择（只能选一次）</p><p class="lab-desc">' + b.q + '</p>'
      + '<div class="lab-row" id="' + idp + 'row">' + opts + '</div>'
      + '<div class="lab-why" id="' + idp + 'why"></div></div></section>';
  }
  return '';
};

R.domviz = function (b, sid, bi) {
  var idp = 'dv-' + sid + '-' + bi + '-';
  function node(n, depth) {
    var kids = (n.children || []).map(function (c) { return node(c, depth + 1); }).join('');
    return '<div>' + '<button class="dom-node" data-action="dom-node" data-id="' + n.id + '">' + esc(n.label) + '</button>'
      + (kids ? '<div class="dom-children">' + kids + '</div>' : '') + '</div>';
  }
  var visual = b.visual ||
    '<div class="browser">'
    + '<span class="b-doctype" data-r="doctype">&lt;!DOCTYPE html&gt;</span>'
    + '<div data-r="html">'
    + '<div class="b-chrome"><span class="b-dots"><i></i><i></i><i></i></span>'
    + '<span class="b-tab" data-r="title" style="cursor:pointer">iPhone 18 Pro 复刻练习 - 我的前端教室</span>'
    + '<button class="tool-btn quiet" style="margin-left:auto;padding:3px 10px" data-action="dv-head-toggle" data-scope="' + idp + '">显示/隐藏幕后</button>'
    + '</div>'
    + '<div class="b-headzone" data-r="head"><span class="hz-label">HEAD · 幕后（用户看不见）</span>'
    + '<span class="b-chip" data-r="meta-charset" style="cursor:pointer">charset="UTF-8"</span>'
    + '<span class="b-chip" data-r="meta-viewport" style="cursor:pointer">viewport</span>'
    + '<span class="b-chip" data-r="title" style="cursor:pointer">title → 标签页</span>'
    + '</div>'
    + '<div class="b-canvas tall" data-r="body"><span>BODY · 画布</span><span style="font-size:11px">（本关空白 · Stage 2 起生长）</span></div>'
    + '</div></div>';
  return '<section class="block"><div class="kicker">DOM Visualizer</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="dom-grid"><div class="dom-tree" id="' + idp + 'tree">' + b.tree.map(function (n) { return node(n, 0); }).join('') + '</div>'
    + '<div class="dom-visual">' + visual + '<div class="dom-caption" id="' + idp + 'cap">点击左侧任意节点开始……</div></div></div></section>';
};

/* Challenge / Debug 共用 */
function editorHtml(idp, b, kind) {
  var wide = !!b.wideFrame;
  var btns = kind === 'assist'
    ? /* Assisted Mode：不直接给 Show Answer；Help 三级渐进，Reference 需先尝试 */
      '<div class="pg-toolbar">'
    + '<button class="tool-btn primary" data-action="assist-run">▶ Run</button>'
    + '<button class="tool-btn" data-action="assist-check">检查成果</button>'
    + '<button class="tool-btn" data-action="assist-hint">Help ▾</button>'
    + '<button class="tool-btn" data-action="assist-ref">Reference Implementation</button>'
    + (b.export ? '<button class="tool-btn" data-action="assist-export">↓ Download 作品</button>'
              + '<button class="tool-btn" data-action="assist-copywork">Copy HTML</button>' : '')
    + '<button class="tool-btn" data-action="assist-reset">Reset</button>'
    + '</div>'
    : '<div class="pg-toolbar">'
    + '<button class="tool-btn primary" data-action="' + kind + '-run">▶ Run</button>'
    + '<button class="tool-btn" data-action="' + kind + '-check">检查答案</button>'
    + '<button class="tool-btn" data-action="' + kind + '-hint">Show Hint</button>'
    + (kind === 'challenge' ? '<button class="tool-btn" data-action="' + kind + '-answer">Show Answer</button>' : '<button class="tool-btn" data-action="' + kind + '-cause">Reveal Cause</button>')
    + '<button class="tool-btn" data-action="' + kind + '-reset">Reset</button>'
    + '</div>';
  var frameStyle = b.tallFrame ? ' style="min-height:560px"' : '';
  if (wide) {
    /* 宽幅预览：编辑器在上、全宽预览在下——供断点类挑战在 ≥735px 时真实触发媒体查询 */
    return '<div>'
      + '<p class="pg-col-label">Code · 直接修改</p>'
      + '<textarea class="editor" id="' + idp + 'code" spellcheck="false" aria-label="代码编辑区">' + esc(b.starter) + '</textarea>' + btns
      + '<div class="hint-box" id="' + idp + 'hints"></div>'
      + (kind === 'debug' ? '<div class="cause-box" id="' + idp + 'cause"></div>' : '')
      + '<p class="pg-col-label" style="margin:14px 0 7px">Preview · 实时运行（全宽，可到 860px+）</p>'
      + '<iframe class="pg-frame" id="' + idp + 'frame"' + frameStyle + ' sandbox="" title="运行预览" style="width:100%;min-height:220px"></iframe>'
      + '<ul class="check-list" id="' + idp + 'checks"></ul>'
      + '<div class="check-pass" id="' + idp + 'pass">✓ 全部通过！这一步你已经超过大多数初学者。</div>'
      + '</div>';
  }
  return '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Code · 直接修改</p>'
    + '<textarea class="editor" id="' + idp + 'code" spellcheck="false" aria-label="代码编辑区">' + esc(b.starter) + '</textarea>' + btns
    + '<div class="hint-box" id="' + idp + 'hints"></div>'
    + (kind === 'debug' ? '<div class="cause-box" id="' + idp + 'cause"></div>' : '')
    + '</div>'
    + '<div class="pg-col"><p class="pg-col-label">Preview · 实时运行</p>'
    + '<iframe class="pg-frame" id="' + idp + 'frame"' + frameStyle + ' sandbox="" title="运行预览"></iframe>'
    + '<ul class="check-list" id="' + idp + 'checks"></ul>'
    + '<div class="check-pass" id="' + idp + 'pass">✓ 全部通过！这一步你已经超过大多数初学者。</div>'
    + '</div></div>';
}
R.challenge = function (b, sid, bi) {
  return '<section class="block"><div class="kicker">Coding Challenge</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.task + '</p>'
    + '<div class="card pad">' + editorHtml('ch-' + sid + '-' + bi + '-', b, 'challenge') + '</div></section>';
};
R.debug = function (b, sid, bi) {
  return '<section class="block"><div class="kicker">Debug Challenge</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.story + '</p>'
    + '<div class="card pad">' + editorHtml('ch-' + sid + '-' + bi + '-', b, 'debug') + '</div></section>';
};

R.design = function (b) {
  var qs = b.questions.map(function (q, qi) {
    function opt(key) {
      var o = q[key];
      return '<button class="design-opt" data-action="design-pick" data-q="' + qi + '" data-opt="' + key + '">'
        + '<span class="do-label">' + esc(o.label) + '</span><div class="do-body">' + o.body + '</div></button>';
    }
    return '<div class="design-q" data-dq="' + qi + '"><h3>' + (qi + 1) + '. ' + q.q + '</h3>'
      + '<div class="design-opts">' + opt('a') + opt('b') + '</div>'
      + '<div class="design-analysis" data-ana="' + qi + '">'
      + '<span class="p-tag">' + esc(q.principle) + '</span>'
      + '<p style="margin:0">' + q.analysis + '</p></div></div>';
  }).join('');
  return '<section class="block"><div class="kicker">Design Thinking</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">先凭直觉选，再看分析。选择本身就是训练。</p>'
    + '<div class="card pad">' + qs + '</div></section>';
};

R.quiz = function (b, sid, bi) {
  function seededShuffle(len, seedStr) {
    var seed = 0;
    for (var c = 0; c < seedStr.length; c++) seed = ((seed << 5) - seed + seedStr.charCodeAt(c)) | 0;
    var idx = [];
    for (var j = 0; j < len; j++) idx.push(j);
    for (var j = len - 1; j > 0; j--) {
      seed = ((seed << 5) - seed + 0x9E3779B9) | 0;
      var k = Math.abs(seed) % (j + 1);
      var tmp = idx[j]; idx[j] = idx[k]; idx[k] = tmp;
    }
    return idx;
  }
  var qs = b.questions.map(function (q, qi) {
    var key = sid + ':' + bi + ':' + qi;
    var chosen = state.quiz[key];
    var perm = seededShuffle(q.options.length, key);
    var opts = perm.map(function (oi, pi) {
      var cls = 'quiz-opt', dis = '', mark = String.fromCharCode(65 + pi);
      var isCorrect = oi === q.answer;
      var isChosen = oi === chosen;
      if (chosen != null) {
        dis = ' disabled';
        if (isCorrect) cls += ' correct';
        else if (isChosen) cls += ' wrong';
      }
      return '<button class="' + cls + '" data-action="quiz-pick" data-q="' + qi + '" data-oi="' + oi + '"' + dis + '>'
        + '<span class="qk">' + mark + '</span><span>' + esc(q.options[oi]) + (chosen != null && isCorrect ? ' <span style="margin-left:6px;color:var(--ok);font-weight:800">✓</span>' : (chosen != null && isChosen ? ' <span style="margin-left:6px;color:var(--err);font-weight:800">✗</span>' : '')) + '</span></button>';
    }).join('');
    var expl = '<div class="quiz-explain' + (chosen != null ? ' show' : '') + '">' + q.explain + '</div>';
    return '<div class="quiz-q"><h3>' + (qi + 1) + '. ' + esc(q.q) + '</h3><div class="quiz-opts">' + opts + '</div>' + expl + '</div>';
  }).join('');
  return '<section class="block"><div class="kicker">Quiz</div><h2>' + esc(b.title) + '</h2>'
    + '<div class="card">' + qs + '</div></section>';
};

R.checklist = function (b, sid) {
  var saved = state.checklists[sid] || [];
  var items = b.items.map(function (it, i) {
    var c = !!saved[i];
    return '<div class="cl-item"><input type="checkbox" id="cl-' + sid + '-' + i + '" data-action="cl" data-i="' + i + '"' + (c ? ' checked' : '') + '>'
      + '<label for="cl-' + sid + '-' + i + '">' + esc(it) + '</label></div>';
  }).join('');
  var done = saved.filter(Boolean).length;
  return '<section class="block"><div class="kicker">Checklist</div><h2>' + esc(b.title) + '</h2>'
    + '<div class="card"><p class="cl-progress" data-clp="' + sid + '">已完成 ' + done + ' / ' + b.items.length + '</p>'
    + '<div class="checklist">' + items + '</div></div></section>';
};

R.milestone = function (b, sid) {
  var curIdx = flatOf(sid);
  var chips = MS.map(function (m, i) {
    var cls = 'ms-chip';
    if (isDone(m.id)) cls += ' done';
    if (m.id === sid) cls += ' current';
    var mock = '<div class="ms-mock' + (m.dark ? ' dark' : '') + '">'
      + (i <= curIdx || isDone(m.id)
        ? '<i style="left:8px;top:8px;width:' + (30 + (i % 4) * 8) + 'px;height:5px;background:' + (m.dark ? 'rgba(255,255,255,.85)' : '#1d1d1f') + '"></i>'
          + '<i style="left:8px;top:19px;width:' + (18 + (i % 3) * 10) + 'px;height:4px;background:' + (m.dark ? 'rgba(255,255,255,.4)' : '#a1a1a6') + '"></i>'
          + '<i style="left:8px;bottom:6px;right:8px;height:' + (10 + (i % 3) * 6) + 'px;background:' + (m.dark ? 'rgba(255,255,255,.14)' : '#e8e8ed') + '"></i>'
        : '')
      + '</div>';
    return '<div class="' + cls + '">' + mock + '<div class="ms-s">' + m.s + '</div><div class="ms-t">' + esc(m.t) + '</div></div>';
  }).join('');
  var latest = null;
  MS.forEach(function (m) { if (isDone(m.id)) latest = m; });
  if (!latest && curIdx >= 0) latest = MS[curIdx];
  var cap = latest
    ? '当前页面状态 · <b>' + latest.s + '</b> ' + esc(latest.res)
    : '尚未开始——完成关卡后，这里会实时告诉你页面长成了什么样。';
  return '<section class="block"><div class="kicker">Progress</div><h2>当前复刻成果</h2>'
    + '<p class="lead">页面是一块一块长出来的。这条时间轴就是你此刻站在整座山的哪里。</p>'
    + '<div class="ms-strip">' + chips + '</div>'
    + '<p class="ms-caption">' + cap + '</p></section>';
};

R.summary = function (b) {
  return '<section class="block"><div class="kicker">Summary</div><h2>' + esc(b.title) + '</h2>'
    + '<div class="summary-grid">'
    + b.points.map(function (pt) { return '<div class="sum-card"><h4>' + esc(pt[0]) + '</h4><p>' + esc(pt[1]) + '</p></div>'; }).join('')
    + '</div>'
    + '<div class="sum-next"><div><div class="sn-t">Next Up</div><div class="sn-d">' + esc(b.next.text) + '</div></div>'
    + '<button class="tool-btn" data-action="stage" data-id="' + b.next.stage + '">前往 →</button></div></section>';
};

R.route = function () {
  return '<section class="block"><div class="kicker">Route</div><h2>三级成长路线</h2>'
    + '<p class="lead">最终目标不是永远跟着教程，而是逐渐脱离教程。</p>'
    + '<div class="route-grid">'
    + '<div class="route-card now"><span class="route-tag">你在这里</span><div class="route-mode">Guided · 强教学</div><h3>Project A<br>iPhone 18 Pro</h3><p>15 关 · 第一次系统学习。每个标签、属性、设计决策都讲透"为什么"——AI 先教，页面从空白长成完整复刻。</p></div>'
    + '<div class="route-arrow">↓</div>'
    + '<div class="route-card"><div class="route-mode">Assisted · 半独立</div><h3>Project B<br>iPhone Duo</h3><p>6 关 · AI 减少答案。你 Predict → Recall → Decide → Build → Debug → Explain，AI 只做揭示、校准与 Review——没人先告诉你答案。</p></div>'
    + '<div class="route-arrow">↓</div>'
    + '<div class="route-card"><div class="route-mode">Independent · 独立</div><h3>Project C<br>沐光 HelioHub</h3><p>6 Phase（Phase 0–5）· 脱离 Apple。Brief → 决策 → 真实多文件项目 → Review → Defend——AI 只做 Client / Reviewer / QA / Critic，一切设计判断归你。</p></div>'
    + '</div></section>';
};

R.factgrid = function (b) {
  return '<section class="block"><div class="kicker">Field Data</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="fact-grid">'
    + b.facts.map(function (f) { return '<div class="fact"><div class="f-n' + (f.mono ? ' mono' : '') + '">' + esc(f.n) + '</div><div class="f-t">' + esc(f.t) + '</div></div>'; }).join('')
    + '</div><p class="fact-note">' + b.note + '</p></section>';
};

R.pagemap = function (b, sid, bi) {
  var idp = 'pm-' + sid + '-' + bi + '-';
  var tabs = b.pages.map(function (p, i) {
    return '<button class="pm-chip' + (i === 0 ? ' active' : '') + '" data-action="pm-tab" data-i="' + i + '" data-scope="' + idp + '">' + esc(p.name) + '</button>';
  }).join('');
  var chips = b.pages[0].modules.map(function (m, i) {
    return '<button class="pm-chip" data-action="pm-chip" data-m="' + i + '" data-scope="' + idp + '">' + esc(m.name) + '</button>';
  }).join('');
  return '<section class="block"><div class="kicker">Page Map</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad" id="' + idp + 'root" data-block="' + bi + '">'
    + '<div class="pm-tabs">' + tabs + '</div>'
    + '<div class="pm-chips" id="' + idp + 'chips">' + chips + '</div>'
    + '<div class="pm-detail" id="' + idp + 'detail">点击上方任意模块查看详情 →</div>'
    + '</div></section>';
};

R.principles = function (b) {
  var list = DATA.principles;
  if (b.ids) list = list.filter(function (p) { return b.ids.indexOf(p.id) >= 0; });
  var items = list.map(function (p) {
    return '<div class="p-item" data-pitem="' + p.id + '">'
      + '<button class="p-head" data-action="principle-toggle">'
      + '<span class="p-id">' + p.id + '</span>'
      + '<span class="p-name">' + esc(p.name) + '<small>' + esc(p.cn) + ' · ' + esc(p.one) + '</small></span>'
      + '<span class="p-caret">›</span></button>'
      + '<div class="p-body">'
      + '<div class="p-row good"><h5>Apple 实例</h5><p>' + p.apple + '</p></div>'
      + '<div class="p-row"><h5>为什么有效</h5><p>' + p.why + '</p></div>'
      + '<div class="p-row bad"><h5>错误反例</h5><p>' + p.bad + '</p></div>'
      + '<div class="p-row"><h5>我的迁移场景</h5><p>' + p.use + '</p></div>'
      + '</div></div>';
  }).join('');
  return '<section class="block"><div class="kicker">Design Principles</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + ' 当前知识库共 ' + DATA.principles.length + ' 条。</p>'
    + '<div class="card pad">' + items + '</div></section>';
};

/* ---------- Stage 2 新块 ---------- */

R.observe = function (b) {
  var items = b.items.map(function (it, i) {
    return '<div class="obs-item"><div class="obs-q"><span class="obs-n">' + (i + 1) + '</span>' + esc(it.q) + '</div>'
      + '<button class="tool-btn quiet" data-action="obs-toggle">展开参考观察</button>'
      + '<div class="obs-a">' + it.a + '</div></div>';
  }).join('');
  return '<section class="block"><div class="kicker">Observe Apple</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.imgCap + '</p>'
    + '<div class="apple-shot"><img src="' + b.img + '" alt="iPhone 18 Pro 首屏参考截图"></div>'
    + '<div class="card pad" style="margin-top:14px">' + items + '</div></section>';
};

R.judge = function (b, sid, bi) {
  var idp = 'jd-' + sid + '-' + bi + '-';
  var scs = b.scenarios.map(function (s, si) {
    var opts = s.options.map(function (o, oi) {
      return '<button class="choice-btn" data-action="judge-pick" data-s="' + si + '" data-i="' + oi + '">' + esc(o.t) + '</button>';
    }).join(' ');
    return '<div class="judge-scenario"><p class="lab-title">' + esc(s.q) + '</p>'
      + '<div class="lab-row" data-srow="' + si + '">' + opts + '</div>'
      + '<div class="lab-why" data-swhy="' + si + '"></div></div>';
  }).join('');
  return '<section class="block"><div class="kicker">Semantic Judge</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p><div class="card pad" id="' + idp + 'root">' + scs + '</div></section>';
};

R.headinglab = function (b, sid, bi) {
  var idp = 'hl-' + sid + '-' + bi + '-';
  var tree = 'main\n└── section\n    ├── h1  iPhone 18 Pro\n    ├── h2  Pro 再超前\n    └── p   购买说明……';
  var modes = '<div class="lab-row"><div class="seg">'
    + '<button class="active" data-action="hl-set" data-mode="apple">Apple 式：h1=32 / h2=80</button>'
    + '<button data-action="hl-set" data-mode="flip">反转：h1=80 / h2=32</button>'
    + '<button data-action="hl-set" data-mode="flat">接近：h1=48 / h2=40</button>'
    + '</div></div>';
  return '<section class="block"><div class="kicker">Heading Hierarchy Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">DOM · 一字不改</p>' + treeBlock(tree) + '</div>'
    + '<div class="pg-col"><p class="pg-col-label">Visual · 只改 CSS 字号</p>'
    + '<div class="hl-stage" id="' + idp + 'stage" data-mode="apple">'
    + '<p class="hl-name">iPhone 18 Pro</p>'
    + '<p class="hl-slogan">Pro 再超前</p>'
    + '<p class="hl-desc">现仅可在线购买，并可选择免费送货或取货。</p>'
    + '</div></div></div>'
    + modes
    + '<div class="card pad" style="margin-top:14px"><p class="lab-title">' + b.q + '</p><p class="lab-desc">先选，再揭晓。</p>'
    + '<div class="lab-row">' + b.options.map(function (o, oi) {
        return '<button class="choice-btn" data-action="hl-pick" data-i="' + oi + '">' + esc(o.t) + '</button>';
      }).join(' ') + '</div>'
    + '<div class="lab-why" id="' + idp + 'why"></div>'
    + '<div class="cause-box" id="' + idp + 'reveal" style="margin-top:12px">' + b.reveal + '</div>'
    + '</div></section>';
};

R.typolab = function (b, sid, bi) {
  var idp = 'tp-' + sid + '-' + bi + '-';
  function slider(id, label, min, max, val, unit) {
    return '<div class="lab-ctrl"><label for="' + id + '">' + label + '</label>'
      + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" value="' + val + '" step="1">'
      + '<output id="' + id + 'v">' + val + unit + '</output></div>';
  }
  return '<section class="block"><div class="kicker">Typography Playground</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + slider(idp + 'name', '产品名字号', 18, 56, 32, 'px')
    + slider(idp + 'slogan', '主标语的字号', 32, 120, 80, 'px')
    + '<div class="lab-ctrl"><label for="' + idp + 'weight">字重</label>'
    + '<select id="' + idp + 'weight" aria-label="字重"><option value="400">400 regular</option><option value="500">500 medium</option><option value="600" selected>600 semibold</option><option value="700">700 bold</option></select><output></output></div>'
    + slider(idp + 'lh', '标语行高', 105, 180, 110, '%')
    + slider(idp + 'ls', '标语字距', 0, 8, 1, 'px')
    + '<div class="lab-ctrl"><label for="' + idp + 'align">对齐</label>'
    + '<select id="' + idp + 'align" aria-label="对齐"><option value="left" selected>左对齐</option><option value="center">居中</option></select><output></output></div>'
    + slider(idp + 'pad', '上下留白', 24, 160, 96, 'px')
    + '<div class="lab-row" style="margin-top:14px">'
    + '<button class="tool-btn" data-action="tp-preset" data-preset="apple">Preset · Apple 参考值</button>'
    + '<button class="tool-btn" data-action="tp-preset" data-preset="flat">Preset · 全都差不多大</button>'
    + '</div>'
    + '<p class="vp-caption" id="' + idp + 'ratio"></p>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Live Preview</p>'
    + '<div class="typo-preview" id="' + idp + 'prev" style="padding:96px 40px;text-align:left">'
    + '<p class="tp-name" id="' + idp + 'pname">iPhone 18 Pro</p>'
    + '<p class="tp-slogan" id="' + idp + 'pslogan">Pro 再超前</p>'
    + '<p class="tp-desc">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或前往 Apple Store 零售店取货。</p>'
    + '</div></div></div></section>';
};

R.spacelab = function (b, sid, bi) {
  var idp = 'sp-' + sid + '-' + bi + '-';
  function slider(id, label, min, max, val, unit) {
    return '<div class="lab-ctrl"><label for="' + id + '">' + label + '</label>'
      + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" value="' + val + '" step="2">'
      + '<output id="' + id + 'v">' + val + unit + '</output></div>';
  }
  return '<section class="block"><div class="kicker">Whitespace Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:14px"><div class="seg">'
    + '<button data-action="sp-preset" data-preset="crowded">Crowded</button>'
    + '<button class="active" data-action="sp-preset" data-preset="balanced">Balanced</button>'
    + '<button data-action="sp-preset" data-preset="empty">Too Empty</button>'
    + '</div></div>'
    + slider(idp + 'pad', 'Hero 上下留白', 16, 200, 120, 'px')
    + slider(idp + 'g1', '产品名 ↔ 标语间距', 0, 96, 12, 'px')
    + slider(idp + 'g2', '标语 ↔ 说明间距', 0, 96, 22, 'px')
    + slider(idp + 'px', '左右留白', 8, 120, 48, 'px')
    + '<p class="vp-caption">观察：间距近 = 一组（产品名+标语），间距远 = 分组。留白自己就在说"谁和谁是一起的"（P07）。</p>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Live Preview</p>'
    + '<div class="typo-preview" id="' + idp + 'prev" style="padding:120px 48px;text-align:left">'
    + '<p class="tp-name" style="margin-bottom:12px">iPhone 18 Pro</p>'
    + '<p class="tp-slogan" style="margin-bottom:22px">Pro 再超前</p>'
    + '<p class="tp-desc">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。</p>'
    + '</div></div></div></section>';
};

R.csslab = function (b, sid, bi) {
  var idp = 'cs-' + sid + '-' + bi + '-';
  var cards = b.props.map(function (p, pi) {
    var demo = '';
    if (p.demo && p.demo.kind === 'bg') {
      demo = '<div class="cssdemo"><p class="cd-label">' + p.demo.label + '</p>'
        + '<div class="cd-box" id="' + idp + 'bg" style="background:#000"><span style="color:#f5f5f7">Pro 再超前</span></div>'
        + '<div class="lab-row">'
        + '<button class="choice-btn cd-btn active" data-action="cs-bg" data-val="#000000">#000</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-bg" data-val="#1d1d1f">#1d1d1f</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-bg" data-val="#f5f5f7">#f5f5f7</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-bg" data-val="#ffffff">#fff</button>'
        + '</div></div>';
    }
    if (p.demo && p.demo.kind === 'align') {
      demo = '<div class="cssdemo"><p class="cd-label">' + p.demo.label + '</p>'
        + '<div class="cd-box" id="' + idp + 'align" style="text-align:left"><span style="color:#f5f5f7">Pro 再超前</span></div>'
        + '<div class="lab-row">'
        + '<button class="choice-btn cd-btn active" data-action="cs-align" data-val="left">left</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-align" data-val="center">center</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-align" data-val="right">right</button>'
        + '</div></div>';
    }
    if (p.demo && p.demo.kind === 'weight') {
      demo = '<div class="cssdemo"><p class="cd-label">' + p.demo.label + '</p>'
        + '<div class="cd-box" id="' + idp + 'weight"><span style="color:#f5f5f7;font-size:30px;font-weight:600">Pro 再超前</span></div>'
        + '<div class="lab-row">'
        + '<button class="choice-btn cd-btn" data-action="cs-weight" data-val="400">400</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-weight" data-val="500">500</button>'
        + '<button class="choice-btn cd-btn active" data-action="cs-weight" data-val="600">600</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-weight" data-val="700">700</button>'
        + '</div></div>';
    }
    if (p.demo && p.demo.kind === 'lh') {
      demo = '<div class="cssdemo"><p class="cd-label">' + p.demo.label + '</p>'
        + '<div class="cd-box"><p id="' + idp + 'lh" style="color:#86868b;font-size:14px;line-height:1.6;margin:0">第一行：iPhone 18 Pro 现已发售。<br>第二行：可选免费送货或到店取货。<br>第三行：RMB 9999 起，24 期免息。</p></div>'
        + '<input type="range" data-cssdemo="lh" data-target="' + idp + 'lh" min="110" max="180" value="160" step="5" style="width:100%" aria-label="行高"></div>';
    }
    if (p.demo && p.demo.kind === 'ls') {
      demo = '<div class="cssdemo"><p class="cd-label">' + p.demo.label + '</p>'
        + '<div class="cd-box"><p id="' + idp + 'ls" style="color:#f5f5f7;font-size:28px;font-weight:600;letter-spacing:1px;margin:0">Pro 再超前</p></div>'
        + '<input type="range" data-cssdemo="ls" data-target="' + idp + 'ls" min="0" max="8" value="1" step="1" style="width:100%" aria-label="字距"></div>';
    }
    if (p.demo && p.demo.kind === 'fit') {
      demo = '<div class="cssdemo"><p class="cd-label">' + p.demo.label + '</p>'
        + '<div class="cd-fitbox" id="' + idp + 'fitbox"><img src="assets/images/hero/product-desktop.png" alt="" style="object-fit:fill"></div>'
        + '<div class="lab-row">'
        + '<button class="choice-btn cd-btn active" data-action="cs-fit" data-val="fill">fill</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-fit" data-val="contain">contain</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-fit" data-val="cover">cover</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-fit" data-val="none">none</button>'
        + '</div></div>';
    }
    if (p.demo && p.demo.kind === 'pos') {
      demo = '<div class="cssdemo"><p class="cd-label">' + p.demo.label + '</p>'
        + '<div class="cd-fitbox"><img src="assets/images/hero/product-studio.png" alt="" id="' + idp + 'pos" style="object-fit:cover;object-position:center"></div>'
        + '<div class="lab-row">'
        + '<button class="choice-btn cd-btn active" data-action="cs-pos" data-val="50% 50%">center</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-pos" data-val="80% 40%">产品</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-pos" data-val="20% 90%">左下</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-pos" data-val="50% 0%">top</button>'
        + '</div></div>';
    }
    if (p.demo && p.demo.kind === 'ratio') {
      demo = '<div class="cssdemo"><p class="cd-label">' + p.demo.label + '</p>'
        + '<div class="cd-ratiobox" id="' + idp + 'ratio" style="aspect-ratio:16/9"><img src="assets/images/hero/product-studio.png" alt=""></div>'
        + '<div class="lab-row">'
        + '<button class="choice-btn cd-btn active" data-action="cs-ratio" data-val="16/9">16:9</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-ratio" data-val="4/3">4:3</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-ratio" data-val="1/1">1:1</button>'
        + '<button class="choice-btn cd-btn" data-action="cs-ratio" data-val="9/16">9:16</button>'
        + '</div></div>';
    }
    var tabsDef = [['what', '是什么'], ['def', '默认情况'], ['min', '最小例子'], ['apple', 'Apple 对应'], ['gone', '删了会怎样'], ['exp', '参数实验'], ['try', '马上练习']].filter(function (tt) { return p[tt[0]]; });
    var tabs = tabsDef.map(function (tt, xi) {
      return '<button class="tag-tab' + (xi === 0 ? ' active' : '') + '" data-action="tag-tab" data-card="' + pi + '" data-tab="' + tt[0] + '">' + tt[1] + '</button>';
    }).join('');
    var panels = tabsDef.map(function (tt, xi) {
      var val = p[tt[0]] || '';
      var inner = (tt[0] === 'min') ? codeBlock(val) : '<p>' + val + '</p>';
      return '<div class="tag-panel' + (xi === 0 ? ' active' : '') + '" data-panel="' + pi + '-' + tt[0] + '"><h4>' + tt[1] + '</h4>' + inner + '</div>';
    }).join('');
    return '<div class="card tag-card" data-tagcard="' + pi + '">'
      + '<div class="tag-head" data-action="tag-open">'
      + '<span class="tag-title" style="font-family:var(--mono);font-size:17px;font-weight:700">' + esc(p.name) + '</span>'
      + '<span class="tag-cn">' + esc(p.cn) + '</span>'
      + '<span class="tag-caret">›</span>'
      + '<p class="tag-one">' + p.what + '</p></div>'
      + '<div class="tag-tabs">' + tabs + '</div>'
      + '<div class="tag-panels">' + panels + demo + '</div></div>';
  }).join('');
  return '<section class="block"><div class="kicker">CSS Property Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>' + cards + '</section>';
};

R.layers = function (b, sid, bi) {
  var idp = 'lz-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Layered View</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row"><div class="seg">'
    + '<button class="active" data-action="lz-set" data-view="final">① Final</button>'
    + '<button data-action="lz-set" data-view="structure">② Structure</button>'
    + '<button data-action="lz-set" data-view="spacing">③ Spacing</button>'
    + '<button data-action="lz-set" data-view="hierarchy">④ Hierarchy</button>'
    + '</div></div>'
    + '<div class="lz-stage" id="' + idp + 'stage" data-view="final">'
    + '<div class="lz-hero" data-label="section.hero" data-vp="120px">'
    + '<div class="lz-content" data-label="div.hero-content">'
    + '<p class="lz-name" data-label="h1" data-h="2">iPhone 18 Pro</p>'
    + '<p class="lz-slogan" data-label="h2" data-h="1">Pro 再超前</p>'
    + '<p class="lz-desc" data-label="p" data-h="3">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或取货。</p>'
    + '</div></div></div>'
    + '<p class="vp-caption" style="margin-top:12px">Structure 视图：每个标签画出了边框和名字。Spacing 视图：斜纹区域就是 padding 撑开的留白。Hierarchy 视图：编号 = 视线到达顺序。同一个页面，四层理解。</p>'
    + '</div></section>';
};

R.transfer = function (b, sid, bi) {
  var idp = 'tf-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Transfer Challenge</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Design Decisions</p><div class="card lab">'
    + '<div class="lab-ctrl"><label>产品名</label><input type="text" id="' + idp + 'name" value="墨记 InkNote" data-tf="name" aria-label="产品名"></div>'
    + '<div class="lab-ctrl"><label>主标语</label><input type="text" id="' + idp + 'slogan" value="想法，落笔即达" data-tf="slogan" aria-label="主标语"></div>'
    + '<div class="lab-ctrl"><label>辅助说明</label><input type="text" id="' + idp + 'desc" value="AI 笔记软件 · 自动整理 · 随处调用" data-tf="desc" aria-label="辅助说明"></div>'
    + '<div class="lab-ctrl"><label>字号层级</label><select id="' + idp + 'scale" data-tf="scale" aria-label="字号层级">'
    + '<option value="jump" selected>跳跃（32 / 84）</option><option value="close">接近（40 / 48）</option></select><output></output></div>'
    + '<div class="lab-ctrl"><label>对齐</label><select id="' + idp + 'align" data-tf="align" aria-label="对齐">'
    + '<option value="left" selected>左对齐</option><option value="center">居中</option></select><output></output></div>'
    + '<div class="lab-ctrl"><label>背景明暗</label><select id="' + idp + 'theme" data-tf="theme" aria-label="背景明暗">'
    + '<option value="dark" selected>深色（Apple 式）</option><option value="light">浅色（笔记工具更常见）</option></select><output></output></div>'
    + '<div class="lab-ctrl"><label>留白</label><select id="' + idp + 'space" data-tf="space" aria-label="留白">'
    + '<option value="large" selected>大留白</option><option value="medium">中</option><option value="small">小</option></select><output></output></div>'
    + '<div class="lab-row" style="margin-top:14px"><button class="tool-btn primary" data-action="tf-reveal">揭示分析 · 哪些是原则，哪些是 Apple 风格</button></div>'
    + '<div class="cause-box" id="' + idp + 'ana"></div>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">你的产品 Hero · Live Preview</p>'
    + '<div class="typo-preview" id="' + idp + 'prev" style="padding:110px 44px;text-align:left;background:#000">'
    + '<p class="tp-name" style="margin-bottom:12px">墨记 InkNote</p>'
    + '<p class="tp-slogan" style="font-size:84px;margin-bottom:24px">想法，落笔即达</p>'
    + '<p class="tp-desc">AI 笔记软件 · 自动整理 · 随处调用</p>'
    + '</div></div></div></section>';
};

/* ---------- Stage 3 新块 ---------- */

R.decision = function (b, sid, bi) {
  var idp = 'dc-' + sid + '-' + bi + '-';
  var scs = b.scenarios.map(function (s, si) {
    function opt(key) {
      return '<button class="choice-btn" data-action="decision-pick" data-s="' + si + '" data-k="' + key + '">' + esc(s[key].t) + '</button>';
    }
    var rightKey = s.answer === 0 ? 'a' : 'b';
    var wrongKey = rightKey === 'a' ? 'b' : 'a';
    var reveal = '<div class="decision-reveal" data-drev="' + si + '">'
      + '<p class="dr-line ok">' + s[rightKey].why + '</p>'
      + '<p class="dr-line">' + s[wrongKey].why + '</p>'
      + '<p class="dr-line"><b>浏览器语义</b>：' + (s[rightKey].semantics || '—') + '</p>'
      + '<p class="dr-line"><b>键盘行为</b>：' + (s[rightKey].keyboard || '—') + '</p>'
      + '<p class="dr-line"><b>Apple 对应</b>：' + (s[rightKey].apple || '—') + '</p>'
      + '</div>';
    return '<div class="judge-scenario"><p class="lab-title">' + esc(s.q) + '</p>'
      + '<div class="lab-row" data-srow="' + si + '">' + opt('a') + opt('b') + '</div>'
      + reveal + '</div>';
  }).join('');
  return '<section class="block"><div class="kicker">Decision Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad">' + scs
    + '<div class="cause-box" id="' + idp + 'formula"><b>判断公式：</b>' + b.formula + '</div>'
    + '</div></section>';
};

R.hreflab = function (b, sid, bi) {
  var idp = 'hr-' + sid + '-' + bi + '-';
  var pageDoc = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><style>'
    + 'body{margin:0;font-family:-apple-system,"PingFang SC",sans-serif;color:#1d1d1f;background:#fff}'
    + 'header{position:sticky;top:0;background:rgba(255,255,255,.92);padding:12px 20px;border-bottom:1px solid #e8e8ed}'
    + 'header a{color:#0066cc;font-size:14px;text-decoration:none}'
    + 'a:focus-visible{outline:2px solid #2997ff;outline-offset:3px;border-radius:4px}'
    + 'section{padding:60px 24px;min-height:180px}'
    + 'h2{margin:0 0 8px;font-size:22px}p{margin:0;color:#6e6e73;font-size:14px}'
    + '#camera{background:#f5f5f7}'
    + '</style></head><body id="top">'
    + '<header><a id="demoLink" href="#top">点我试试 →</a></header>'
    + '<section><h2>Hero 区</h2><p>迷你页面顶部。</p></section>'
    + '<section id="camera"><h2>摄像头章节</h2><p>这就是 id="camera" 的元素——锚点跳转的目的地。</p></section>'
    + '<section id="buy"><h2>购买章节</h2><p>这就是 id="buy" 的元素。</p></section>'
    + '</body></html>';
  var presets = [
    { v: '#camera', label: '#camera（页内锚点）', note: '锚点跳转：浏览器滚动到 id="camera" 的元素——不加载新页面，URL 只多了一个 #camera。' },
    { v: '/buy/', label: '/buy/（站内链接）', note: '站内导航：真实浏览器会加载苹果站的 /buy/ 页面——你离开当前页（这里只模拟地址栏，不会真的离开）。' },
    { v: 'https://www.apple.com.cn/iphone-duo/', label: 'https://…（站外链接）', note: '站外导航：前往另一个站点。回到本题：这就是"去别处"。' }
  ];
  window.__mini = window.__mini || {};
  window.__mini[idp + 'frame'] = pageDoc;
  return '<section class="block"><div class="kicker">Href Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + '<div class="lab-row" style="flex-direction:column;align-items:stretch;gap:8px">'
    + presets.map(function (p) {
      return '<button class="choice-btn" style="font-family:var(--mono);font-size:13px" data-action="hr-preset" data-v="' + esc(p.v) + '">' + esc(p.label) + '</button>';
    }).join('')
    + '</div>'
    + '<div class="urlbar"><span class="ub-label">地址栏</span><span class="ub-url" id="' + idp + 'url">…/mini-page.html</span></div>'
    + '<div class="cause-box show" id="' + idp + 'note" style="display:block">先在左边选一个 href，再点右侧迷你页面顶部的「点我试试 →」。</div>'
    + '<p class="vp-caption">键盘同样有效：用 Tab 让链接获得焦点，按 Enter 一样会跳转。</p>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Mini Page · 真实 iframe</p>'
    + '<iframe class="pg-frame" id="' + idp + 'frame" title="href 实验迷你页" style="height:360px"></iframe>'
    + '</div></div>'
    + '<input type="hidden" id="' + idp + 'presets" value="' + esc(JSON.stringify(presets)) + '">'
    + '</section>';
};

R.actionlevel = function (b) {
  function row(cls, label, text, note) {
    return '<div class="al-row"><span class="al-tag">' + esc(label) + '</span>'
      + '<span class="al-demo"><span class="' + cls + '">' + text + '</span></span>'
      + '<span class="al-note">' + note + '</span></div>';
  }
  return '<section class="block"><div class="kicker">Action Hierarchy</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad">'
    + row('al-primary', 'Primary', '购买', '最重要。一屏至多一个，filled 蓝色胶囊——用户此刻唯一"该做的事"。')
    + row('al-secondary', 'Secondary', '进一步了解 ›', '重要但不是第一目标。文字链接：可发现，不抢戏。')
    + row('al-tertiary', 'Tertiary', '查看全部规格', '弱化。更小的字号 + 次级灰——留给"还想知道更多"的人。')
    + '<div class="note-callout warn" style="margin-top:16px"><b>核心认知：所有动作权重一样 = 没有权重。</b>设计其实是在分配注意力（P05 / P10）。下面的 CTA Hierarchy Playground 让你亲手分配。</div>'
    + '</div></section>';
};

R.statelab = function (b, sid, bi) {
  var idp = 'st-' + sid + '-' + bi + '-';
  var states = [
    { k: 'default', n: 'Default', t: '静止状态。一切交互的起点：传达"这里可以点"即可，不需要任何特效。' },
    { k: 'hover', n: 'Hover', t: '鼠标悬停时触发。职责：轻微确认"我瞄准了它"。颜色微变即可，不要位移抢戏。' },
    { k: 'focus', n: 'Focus', t: '键盘 Tab 聚焦时触发（:focus-visible 会在键盘导航时自动出现）。职责：键盘用户的"你在这里"。绝不能删。' },
    { k: 'active', n: 'Active', t: '按下未松开的瞬间触发。职责：确认"已收到点击"。轻微缩小 1~2px 就足够。' }
  ];
  return '<section class="block"><div class="kicker">Interaction State Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Preview</p>'
    + '<div class="typo-preview" style="min-height:220px;justify-content:center;align-items:center;gap:0">'
    + '<a class="st-cta" id="' + idp + 'cta" href="javascript:void(0)" onclick="return false">购买</a>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">States</p><div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:14px"><div class="seg">'
    + states.map(function (s, i) { return '<button class="' + (i === 0 ? 'active' : '') + '" data-action="st-set" data-k="' + s.k + '">' + s.n + '</button>'; }).join('')
    + '</div></div>'
    + states.map(function (s, i) {
      return '<div class="st-note' + (i === 0 ? ' show' : '') + '" data-st="' + s.k + '"><p class="lab-title">' + s.n + '</p><p class="lab-desc" style="margin:0">' + s.t + '</p></div>';
    }).join('')
    + '</div></div></div></section>';
};

R.focuslab = function (b, sid, bi) {
  var idp = 'fl-' + sid + '-' + bi + '-';
  window.__mini = window.__mini || {};
  window.__mini[idp + 'frame'] = b.iframeDoc;
  return '<section class="block"><div class="kicker">Focus Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">实验步骤</p><div class="card lab">'
    + '<ul class="goal-list">'
    + '<li><span class="g-n">1</span><span>用鼠标点击右侧迷你页面的任意空白处——键盘焦点进入页面</span></li>'
    + '<li><span class="g-n">2</span><span>按 <b>Tab</b>：焦点依次走过 链接 → 正常按钮 → 被删掉 focus 的按钮</span></li>'
    + '<li><span class="g-n">3</span><span>观察第三个按钮：<b>焦点其实在那里</b>（按 Enter 还能触发），但视觉上消失了</span></li>'
    + '<li><span class="g-n">4</span><span>再按几次 Tab / Shift+Tab 走一圈，对比三个元素的焦点环</span></li>'
    + '</ul>'
    + '<div class="note-callout warn" style="margin-top:14px">被删掉 focus 的按钮对键盘用户来说 = <b>从界面上消失</b>。正确做法是用 :focus-visible 定制焦点环（本页前两个元素就是），而不是删掉它（P12）。</div>'
    + '<div class="note-callout">诚实声明：iframe 需要先点击内部才能接收键盘焦点；真实页面里 Tab 从浏览器地址栏开始就能走。其余行为全部真实——课程代码没有写一行 JS 来"扮演"焦点。</div>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Mini Page</p>'
    + '<iframe class="pg-frame" id="' + idp + 'frame" title="focus 实验" style="height:330px"></iframe>'
    + '</div></div></section>';
};

R.transitionlab = function (b, sid, bi) {
  var idp = 'tl-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Transition Playground</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + '<div class="lab-ctrl"><label for="' + idp + 'dur">时长 Duration</label>'
    + '<input type="range" id="' + idp + 'dur" min="0" max="1000" step="50" value="200" data-tl="dur">'
    + '<output id="' + idp + 'durv">200ms</output></div>'
    + '<div class="lab-row"><div class="seg">'
    + '<button data-action="tl-set" data-v="0">0ms</button>'
    + '<button data-action="tl-set" data-v="100">100ms</button>'
    + '<button class="active" data-action="tl-set" data-v="200">200ms</button>'
    + '<button data-action="tl-set" data-v="500">500ms</button>'
    + '<button data-action="tl-set" data-v="1000">1000ms</button>'
    + '</div></div>'
    + '<div class="lab-row" style="margin-top:10px"><button class="tool-btn" data-action="tl-hover">模拟 Hover（按住不放）</button></div>'
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '<div class="note-callout">关键技巧：transition 要写在<b>元素默认态</b>上，不要只写在 :hover 里——写在 hover 里，鼠标移开时变化会瞬间跳回，进出不对称。</div>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Live Preview · 鼠标放上来</p>'
    + '<div class="typo-preview" style="min-height:220px;justify-content:center;align-items:center">'
    + '<a class="st-cta tl-cta" id="' + idp + 'cta" href="javascript:void(0)" onclick="return false" style="transition-duration:200ms">购买</a>'
    + '</div></div></div></section>';
};

R.ctalab = function (b, sid, bi) {
  var idp = 'ct-' + sid + '-' + bi + '-';
  var actions = ['购买', '进一步了解', '查看规格'];
  var styles = [['filled', 'Filled 主按钮'], ['outline', 'Outline 次按钮'], ['text', 'Text Link 文字链接']];
  function sel(i, def) {
    return '<select data-cta-sel="' + i + '" aria-label="' + esc(actions[i]) + ' 的样式">'
      + styles.map(function (s) { return '<option value="' + s[0] + '"' + (s[0] === def ? ' selected' : '') + '>' + s[1] + '</option>'; }).join('')
      + '</select>';
  }
  return '<section class="block"><div class="kicker">CTA Hierarchy Playground</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">分配样式</p><div class="card lab">'
    + actions.map(function (a, i) {
      var def = i === 0 ? 'filled' : 'text';
      return '<div class="lab-ctrl"><label>' + esc(a) + '</label>' + sel(i, def) + '<output></output></div>';
    }).join('')
    + '<div class="lab-row" style="margin-top:14px"><button class="tool-btn primary" data-action="ct-diag">诊断层级</button>'
    + '<button class="tool-btn" data-action="ct-apple">Apple 的分配</button></div>'
    + '<div class="cause-box" id="' + idp + 'diag"></div>'
    + '<div class="lab-why" id="' + idp + 'why">想一想再揭晓：三个动作里哪个是 Primary？为什么其余的必须让路？</div>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Live Hero Preview</p>'
    + '<div class="typo-preview" id="' + idp + 'prev" style="padding:64px 40px">'
    + '<p class="tp-name" style="font-size:22px;margin-bottom:8px">iPhone 18 Pro</p>'
    + '<p class="tp-slogan" style="font-size:52px;margin-bottom:18px">Pro 再超前</p>'
    + '<div class="cta-row" id="' + idp + 'row"></div>'
    + '</div></div></div></section>';
};

R.classify = function (b, sid, bi) {
  var idp = 'cl-' + sid + '-' + bi + '-';
  var dims = ['语义', 'CSS', '交互', '设计', '无障碍'];
  var issues = [
    { t: '「切换颜色」用 div onclick 实现', d: 0, why: '页内动作却没有按钮语义——无键盘、无播报（div 三无产品）。' },
    { t: '「购买」点击后跳转购买页，却用了 button', d: 0, why: '去别处应该用 a——导航语义才对。' },
    { t: 'body 黑底黑字不可读', d: 1, why: 'color 与 background 对比度崩坏——纯 CSS 层面的可读性事故。' },
    { t: '标语与 CTA 之间 margin:0', d: 1, why: '间距归 CSS 管：margin 被清零导致动作糊在内容上。' },
    { t: 'CTA 没有任何 hover 反馈', d: 2, why: '交互层缺失：用户得不到"可以点"的确认。' },
    { t: 'transition: all 3s', d: 2, why: '交互节奏坏死——反馈迟了三秒，等于没有反馈。' },
    { t: '三个动作全部等大等蓝', d: 3, why: '设计层：三个 Primary 抢注意力，行动层级崩塌（P05/P10）。' },
    { t: '所有元素 outline:none', d: 4, why: '无障碍：键盘用户的焦点环被没收（P12）。' }
  ];
  return '<section class="block"><div class="kicker">Classify</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad">'
    + '<div class="badcta-demo">'
    + '<p style="margin:0 0 2px;font-size:30px;font-weight:600;color:#f5f5f7;line-height:1.1">Pro 再超前</p>'
    + '<div style="display:flex;gap:10px;flex-wrap:wrap;margin:2px 0 0">'
    + '<span class="dq-btn" style="background:#0071e3;color:#fff">立即购买 iPhone 18 Pro Max 旗舰机型享受 24 期免息</span>'
    + '<span class="dq-btn" style="background:#0071e3;color:#fff">了解更多详情信息</span>'
    + '<span class="dq-btn" style="background:#0071e3;color:#fff">查看全部规格参数</span>'
    + '<span class="dq-btn" style="background:#0071e3;color:#fff;cursor:pointer">切换颜色</span>'
    + '</div></div>'
    + '<div class="cl-hint">给每个问题选择它所属的维度：</div>'
    + issues.map(function (it, i) {
      return '<div class="cl-row"><span class="cl-t">' + (i + 1) + '. ' + esc(it.t) + '</span>'
        + '<span class="cl-opts">' + dims.map(function (d, di) {
          return '<button class="cl-chip" data-action="cls-pick" data-i="' + i + '" data-d="' + di + '">' + d + '</button>';
        }).join('') + '</span>'
        + '<span class="cl-why" data-clwhy="' + i + '"></span></div>';
    }).join('')
    + '<div class="lab-row" style="margin-top:16px"><button class="tool-btn primary" data-action="cls-reveal">对答案</button>'
    + '<button class="tool-btn" data-action="cls-reset">重选</button></div>'
    + '</div></section>';
};

R.kbdtest = function (b, sid, bi) {
  var idp = 'kb-' + sid + '-' + bi + '-';
  window.__mini = window.__mini || {};
  window.__mini[idp + 'frame'] = b.iframeDoc;
  return '<section class="block"><div class="kicker">Keyboard Test</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">观察清单（亲自验证后逐条确认）</p><div class="card lab">'
    + b.checks.map(function (c, i) {
      return '<label class="kb-check"><input type="checkbox" data-kb="' + i + '"><span>' + esc(c) + '</span></label>';
    }).join('')
    + '<div class="note-callout" style="margin-top:14px">' + b.limits + '</div>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Mini Page · 真实键盘行为</p>'
    + '<iframe class="pg-frame" id="' + idp + 'frame" title="键盘实验" style="height:330px"></iframe>'
    + '</div></div></section>';
};

R.motionlab = function (b, sid, bi) {
  var idp = 'ml-' + sid + '-' + bi + '-';
  var variants = [
    { k: 'subtle', n: 'Subtle 微妙', d: '只有背景色轻微变化。安静，专注，Apple 味。' },
    { k: 'balanced', n: 'Balanced 平衡', d: '颜色 + 1px 位移。多一点点"物理感"，依然克制。' },
    { k: 'exaggerated', n: 'Exaggerated 夸张', d: '放大 + 发光 + 弹跳。注意力杀手——按钮变成了主角。' }
  ];
  return '<section class="block"><div class="kicker">Motion Taste</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="motion-grid">'
    + variants.map(function (v) {
      return '<div class="motion-card"><div class="m-stage"><span class="dq-btn m-' + v.k + '" style="background:#0071e3;color:#fff">购买</span></div>'
        + '<p class="lab-title" style="margin:12px 0 2px">' + v.n + '</p>'
        + '<p class="lab-desc" style="margin:0">' + v.d + '</p></div>';
    }).join('')
    + '</div>'
    + '<div class="card pad" style="margin-top:14px"><p class="lab-title">你的判断：哪个最适合 Apple 风格的产品 Hero？</p>'
    + '<div class="lab-row">' + variants.map(function (v) {
      return '<button class="choice-btn" data-action="ml-pick" data-i="' + v.k + '">' + v.n + '</button>';
    }).join(' ') + '</div>'
    + '<div class="lab-why" id="' + idp + 'why"></div></div></section>';
};

R.transfercta = function (b, sid, bi) {
  var idp = 'tc-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Transfer Challenge</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">策略与决策</p><div class="card lab">'
    + '<div class="note-callout">先想清楚：<b>用户此刻最该做什么？</b>墨记的答案：开始用它（注册/下载）。这决定 Primary。</div>'
    + '<div class="lab-ctrl"><label>Primary 文案</label><input type="text" value="免费开始记录" data-tc="ptext" aria-label="Primary 文案"></div>'
    + '<div class="lab-ctrl"><label>Primary 语义</label><select data-tc="ptype" aria-label="Primary 语义">'
    + '<option value="a" selected>a（去注册页 = 导航）</option><option value="button">button（原地弹出注册框）</option></select><output></output></div>'
    + '<div class="lab-ctrl"><label>Primary 样式</label><select data-tc="pstyle" aria-label="Primary 样式">'
    + '<option value="filled" selected>Filled</option><option value="outline">Outline</option><option value="text">Text Link</option></select><output></output></div>'
    + '<div class="lab-ctrl"><label>Secondary 文案</label><input type="text" value="了解 AI 功能 ›" data-tc="stext" aria-label="Secondary 文案"></div>'
    + '<div class="lab-ctrl"><label>Secondary 语义</label><select data-tc="stype" aria-label="Secondary 语义">'
    + '<option value="a" selected>a（去功能页 = 导航）</option><option value="button">button（原地展开功能列表）</option></select><output></output></div>'
    + '<div class="lab-ctrl"><label>Secondary 样式</label><select data-tc="sstyle" aria-label="Secondary 样式">'
    + '<option value="text" selected>Text Link</option><option value="outline">Outline</option><option value="filled">Filled</option></select><output></output></div>'
    + '<div class="lab-row" style="margin-top:14px"><button class="tool-btn primary" data-action="tc-reveal">揭示分析</button></div>'
    + '<div class="cause-box" id="' + idp + 'ana"></div>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">墨记 Hero · Live Preview</p>'
    + '<div class="typo-preview" id="' + idp + 'prev" style="padding:84px 44px;background:#000">'
    + '<p class="tp-name" style="font-size:24px;margin-bottom:10px">墨记 InkNote</p>'
    + '<p class="tp-slogan" style="font-size:56px;margin-bottom:22px">想法，落笔即达</p>'
    + '<div class="cta-row" id="' + idp + 'row"></div>'
    + '</div></div></div></section>';
};

/* ---------- Stage 4 新块 ---------- */

R.imgviz = function (b, sid, bi) {
  var steps = [
    { t: '① HTML Parser 解析文档', d: '浏览器从上到下解析 HTML。看到 <img> 标签时，它不会停下来等图片——解析继续，请求并行发出。' },
    { t: '② 发现 img 元素', d: '创建对应的 DOM 节点。此刻页面上还什么都没有，只有一个"待填的框"。' },
    { t: '③ 读取 src 地址', d: 'src 决定去哪里要图。相对路径基于当前页面 URL 解析——所以路径写错 = 直接请求失败。' },
    { t: '④ 发起网络请求', d: 'src 就位立即请求（不等渲染完成）。如果标了 loading="lazy" 且离视口很远，这一步会被推迟。' },
    { t: '⑤ 下载图片字节', d: '图片体积越大、网络越慢，这一步越久——这是"图片影响性能"的第一现场。' },
    { t: '⑥ 解码为像素', d: '字节变成浏览器能绘制的位图。大图解码更慢、占内存更多。' },
    { t: '⑦ 得到原始尺寸', d: 'naturalWidth / naturalHeight 就来自这里。HTML 的 width/height 属性让浏览器在拿到真实尺寸前就能预留空间。' },
    { t: '⑧ 绘制到页面', d: '按 CSS 决定的大小与裁切方式（object-fit）画进布局。此刻你才"看见"它。' }
  ];
  return '<section class="block"><div class="kicker">Pipeline</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad">'
    + steps.map(function (s, i) {
      return '<div class="iv-step"><button class="iv-head" data-action="iv-toggle" data-i="' + i + '">'
        + '<span class="iv-n">' + (i + 1) + '</span><span>' + esc(s.t) + '</span><span class="p-caret">›</span></button>'
        + '<div class="iv-body"><p>' + esc(s.d) + '</p></div></div>';
    }).join('')
    + '<div class="note-callout" style="margin-top:14px">初学者结论：<b>img = 引用 + 时机 + 尺寸 + 绘制</b>。src 管引用，loading 管时机，width/height 管预留，object-fit 管绘制。</div>'
    + '</div></section>';
};

R.srclab = function (b, sid, bi) {
  var idp = 'sl-' + sid + '-' + bi + '-';
  var presets = [
    { v: 'assets/images/hero/product-desktop.png', label: '相对路径 · 正确', note: '基于当前页面位置解析——双击打开的本地页面也能加载。' },
    { v: 'assets/images/hero/product.png', label: '相对路径 · 文件不存在', note: '404 → broken image + alt 文本。这就是 alt 的"第三重命运"：图没了，说明还在。' },
    { v: '/assets/images/hero/product-desktop.png', label: '站内绝对路径', note: '以 / 开头 = 从"站点根"找起。双击打开的 file:// 没有站点根 → 直接失败。它需要一台真正的服务器（本地开发服务器也算）。' }
  ];
  return '<section class="block"><div class="kicker">Source Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">选择 src</p><div class="card lab">'
    + '<div class="lab-row" style="flex-direction:column;align-items:stretch;gap:8px">'
    + presets.map(function (p) {
      return '<button class="choice-btn" style="font-family:var(--mono);font-size:12.5px;text-align:left" data-action="src-preset" data-v="' + esc(p.v) + '">' + esc(p.v) + '</button>';
    }).join('')
    + '</div>'
    + '<div class="src-status" id="' + idp + 'status">选择一个 src 试试。</div>'
    + '<div class="cause-box show" style="display:block" id="' + idp + 'note">先选一个 src，观察右侧预览区的变化。</div>'
    + '<div class="note-callout">工程习惯：路径报错的第一反应是"从页面位置出发，一层层数目录"——../ 是上一层。目录结构稳定，路径才稳定（Asset Organization Lab 见）。</div>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Preview</p>'
    + '<div class="srclab-stage"><img id="' + idp + 'img" alt="酒红色 iPhone 18 Pro 正面产品视图" style="max-width:100%;display:none">'
    + '<div class="src-broken" id="' + idp + 'broken" style="display:none"><span>🖼️ broken image</span><span class="src-alt-echo" id="' + idp + 'echo"></span></div>'
    + '</div></div></div></section>';
};

R.altlab = function (b, sid, bi) {
  var idp = 'al-' + sid + '-' + bi + '-';
  var opts = [
    { k: 'empty', label: 'alt=""（空）', sr: '（读屏器直接跳过这张图）' },
    { k: 'generic', label: 'alt="图片"', sr: '图片。' },
    { k: 'thin', label: 'alt="手机"', sr: '手机。' },
    { k: 'good', label: 'alt="酒红色 iPhone 18 Pro 正面产品视图，深色背景"', sr: '图像：酒红色 iPhone 18 Pro 正面产品视图，深色背景。' }
  ];
  return '<section class="block"><div class="kicker">Alt Text Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Preview · 图片加载失败时</p>'
    + '<div class="alt-stage"><div class="alt-broken"><span>🖼️ 无法加载</span><span class="alt-echo" id="' + idp + 'echo"></span></div>'
    + '<div class="alt-sr" id="' + idp + 'sr" hidden><span class="alt-sr-label">读屏器模拟</span><p id="' + idp + 'srtext"></p></div>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">选择 alt</p><div class="card lab">'
    + '<div class="lab-row" style="flex-direction:column;align-items:stretch;gap:8px">'
    + opts.map(function (o) {
      return '<button class="choice-btn" style="font-family:var(--mono);font-size:12.5px;text-align:left" data-action="alt-pick" data-k="' + o.k + '">' + esc(o.label) + '</button>';
    }).join('')
    + '</div>'
    + '<div class="lab-why" id="' + idp + 'why"></div>'
    + '<div class="lab-row" style="margin-top:12px"><button class="tool-btn" data-action="alt-sr">读屏器模拟</button></div>'
    + '<div class="note-callout" style="margin-top:12px">判断标准：闭上眼睛，这段文字能让你想象出"这里是什么"吗？<b>不为 SEO 堆词，为"听的人"写。</b>装饰图才用 alt=""。</div>'
    + '</div></div></div></section>';
};

R.artdirection = function (b, sid, bi) {
  var idp = 'ad-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Art Direction</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:14px"><div class="seg">'
    + '<button data-action="ad-width" data-w="1440">1440</button>'
    + '<button data-action="ad-width" data-w="1024">1024</button>'
    + '<button data-action="ad-width" data-w="768">768</button>'
    + '<button class="active" data-action="ad-width" data-w="390">390</button>'
    + '</div><div class="seg">'
    + '<button class="active" data-action="ad-mode" data-m="same">方案 A · 同图硬缩</button>'
    + '<button data-action="ad-mode" data-m="art">方案 B · Art Direction</button>'
    + '</div></div>'
    + '<div class="ad-frame-outer"><div class="ad-frame" id="' + idp + 'frame" data-w="390" data-mode="same">'
    + '<img id="' + idp + 'img" src="assets/images/hero/product-desktop.png" alt="">'
    + '</div></div>'
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '<div class="note-callout">方案 B 的"换图"由课程模拟 picture 的选择逻辑。下一块 Responsive Image Lab 里，你会看到<b>真实的 picture + source 由浏览器亲自选择</b>。</div>'
    + '</div></section>';
};

R.densitylab = function (b, sid, bi) {
  var idp = 'dn-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Density Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:14px"><div class="seg">'
    + '<button class="active" data-action="dn-dpr" data-dpr="1">1x 普通屏</button>'
    + '<button data-action="dn-dpr" data-dpr="2">2x Retina</button>'
    + '</div><span class="dn-need" id="' + idp + 'need"></span></div>'
    + '<div class="dn-grid">'
    + '<div class="dn-cell"><img id="' + idp + 'img" src="assets/images/hero/product-300.png" alt="密度对比样张（1x 资源）" style="width:300px;max-width:100%;display:block"><p class="vp-caption">同一显示尺寸 · 当前源：<b id="' + idp + 'src">1x 图（300px 资源）</b></p></div>'
    + '</div>'
    + '<p class="vp-caption" id="' + idp + 'pick"></p>'
    + '<div class="note-callout">结论：需要的像素 = 显示宽度 × 设备像素比。浏览器不会替你做对——你要用 srcset 把候选声明出来。对照 Apple 真实文件名 <b>hero__elo7tt0mnqy6_large_2x.webp</b>：__large_2x 就是"大图 2 倍密度"的意思。</div>'
    + '</div></section>';
};

R.detective = function (b, sid, bi) {
  var panels = [
    { n: 'Elements 面板 · 看结构', steps: ['打开 apple.com.cn/iphone-18-pro/ → 右键任意产品图 → 检查', 'Elements 里会定位到 <img>（多半包在 <picture> 里）', '读 src / srcset：注意 __large_2x 这类密度后缀', '看 <source> 的 media 条件——这就是 Art Direction 的现场'] },
    { n: 'Network 面板 · 看请求', steps: ['打开 DevTools → Network → 勾选 Img 筛选 → 刷新页面', '观察：请求数量（首屏就几十个）、文件类型（webp 为主）、每张的 Size', '滚动页面：懒加载的图这时才出现请求（对照 Stage 0 的 154 张占位图）', '看到 video/音频请求：先标记"后面课程再学"，本关不展开'] },
    { n: 'Sources 面板 · 看目录', steps: ['DevTools → Sources → 按域名展开目录树', '找到 /iphone-18-pro/images/overview/… 的目录结构：模块名分目录', '记住命名规则：hero__哈希_large_2x.webp = 模块__内容_尺寸倍率', '右键单张图 → Open in new tab 可以直接查看原图尺寸'] },
    { n: 'Task · 三个回答', steps: ['为什么同一个模块会有多个尺寸的资源？（密度 + 断点）', '为什么不全部直接加载最大图？（流量与解码成本——手机首当其冲）', '为什么存在 WebP 这类新格式？（同等画质体积更小——具体格式以你在 Network 里实际观察到的为准）'] }
  ];
  return '<section class="block"><div class="kicker">Asset Detective</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="apple-shot"><img src="curriculum/reference/18pro-hero-desktop.png" alt="Apple 页面参考截图"><div class="shot-cap">检测对象：iPhone 18 Pro 首屏。带着下面的问题去看它。</div></div>'
    + '<div class="card pad" style="margin-top:14px">'
    + panels.map(function (p, i) {
      return '<div class="iv-step"><button class="iv-head" data-action="iv-toggle" data-i="d' + i + '">'
        + '<span class="iv-n">' + (i + 1) + '</span><span>' + esc(p.n) + '</span><span class="p-caret">›</span></button>'
        + '<div class="iv-body"><ol class="goal-list" style="gap:6px">'
        + p.steps.map(function (s) { return '<li><span class="g-n" style="background:#0071e3">·</span><span>' + esc(s) + '</span></li>'; }).join('')
        + '</ol></div></div>';
    }).join('')
    + '<div class="note-callout warn" style="margin-top:14px">版权底线：Apple 素材仅用于<b>本地学习与分析</b>。你的复刻页面用课程自制的占位素材（assets/），未来原创项目用原创或可授权素材。</div>'
    + '</div></section>';
};

R.sortlab = function (b, sid, bi) {
  var idp = 'so-' + sid + '-' + bi + '-';
  var groups = b.groups.map(function (g, gi) {
    return '<p class="cl-hint" style="margin-top:16px">' + esc(g.title) + '</p>'
      + g.items.map(function (it, i) {
        var key = gi + '-' + i;
        return '<div class="cl-row"><span class="cl-t">' + esc(it.t) + '</span>'
          + '<span class="cl-opts">' + it.options.map(function (o, oi) {
            return '<button class="cl-chip" data-action="sort-pick" data-g="' + gi + '" data-i="' + i + '" data-o="' + oi + '">' + esc(o) + '</button>';
          }).join('') + '</span>'
          + '<span class="cl-why" data-sortwhy="' + key + '"></span></div>';
      }).join('');
  }).join('');
  return '<section class="block"><div class="kicker">Sort Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad">' + groups
    + '<div class="lab-row" style="margin-top:16px"><button class="tool-btn primary" data-action="sort-reveal">对答案</button>'
    + '<button class="tool-btn" data-action="sort-reset">重选</button></div>'
    + '</div></section>';
};

R.fitlab = function (b, sid, bi) {
  var idp = 'ft-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Object Fit Playground</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:12px"><div class="seg">'
    + '<button class="active" data-action="ft-fit" data-v="fill">fill</button>'
    + '<button data-action="ft-fit" data-v="contain">contain</button>'
    + '<button data-action="ft-fit" data-v="cover">cover</button>'
    + '<button data-action="ft-fit" data-v="none">none</button>'
    + '</div></div>'
    + '<div class="lab-ctrl"><label for="' + idp + 'x">焦点 X</label><input type="range" id="' + idp + 'x" min="0" max="100" value="50" data-ft="x"><output id="' + idp + 'xv">50%</output></div>'
    + '<div class="lab-ctrl"><label for="' + idp + 'y">焦点 Y</label><input type="range" id="' + idp + 'y" min="0" max="100" value="50" data-ft="y"><output id="' + idp + 'yv">50%</output></div>'
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Preview · 容器 100% × 260px</p>'
    + '<div class="fit-stage"><img id="' + idp + 'img" src="assets/images/hero/product-studio.png" alt="object-fit 实验图" style="object-fit:fill;object-position:50% 50%"></div>'
    + '</div></div></section>';
};

R.ratiolab = function (b, sid, bi) {
  var idp = 'rt-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Aspect Ratio Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:14px"><div class="seg">'
    + '<button class="active" data-action="rt-set" data-r="16/9">16:9</button>'
    + '<button data-action="rt-set" data-r="4/3">4:3</button>'
    + '<button data-action="rt-set" data-r="1/1">1:1</button>'
    + '<button data-action="rt-set" data-r="9/16">9:16</button>'
    + '</div></div>'
    + '<div class="ratio-stage" id="' + idp + 'stage" style="aspect-ratio:16/9"><img src="assets/images/hero/product-studio.png" alt="比例实验图"></div>'
    + '<p class="vp-caption" id="' + idp + 'read">当前 16:9 —— 桌面 Hero 的常见比例：产品与负空间完整呈现。</p>'
    + '</div></section>';
};

R.trio = function (b, sid, bi) {
  var idp = 'tr-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Compare 3</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="trio-grid">'
    + b.options.map(function (o) {
      return '<button class="trio-card" data-action="trio-pick" data-k="' + o.key + '"><span class="do-label">' + esc(o.label) + '</span><div class="do-body">' + o.html + '</div></button>';
    }).join('')
    + '</div>'
    + '<div class="design-analysis" id="' + idp + 'ana"><span class="p-tag">' + esc(b.principle) + '</span><p style="margin:0">' + b.analysis + '</p></div>'
    + '</section>';
};

R.composelab = function (b, sid, bi) {
  var idp = 'cp-' + sid + '-' + bi + '-';
  function slider(id, label, min, max, val, unit) {
    return '<div class="lab-ctrl"><label for="' + id + '">' + label + '</label>'
      + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" value="' + val + '" step="1" data-cp="' + id.replace(idp, '') + '">'
      + '<output id="' + id + 'v">' + val + unit + '</output></div>';
  }
  return '<section class="block"><div class="kicker">Hero Composition</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + slider(idp + 'scale', '产品图宽度', 40, 100, 78, '%')
    + slider(idp + 'ratio', '视觉区比例(宽:高)', 100, 240, 160, '%')
    + slider(idp + 'posy', '裁切焦点 Y', 0, 100, 40, '%')
    + slider(idp + 'slogan', '标语字号', 36, 80, 56, 'px')
    + slider(idp + 'pad', '顶部留白', 24, 140, 64, 'px')
    + '<p class="vp-caption">自查三连：产品有力量感吗？负空间完整吗？文字与图在呼吸吗？（P13/P14）</p>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Live Hero</p>'
    + '<div class="typo-preview" id="' + idp + 'prev" style="padding:64px 36px 0;background:#000">'
    + '<p class="tp-name" style="font-size:20px;margin-bottom:6px">iPhone 18 Pro</p>'
    + '<p class="tp-slogan" style="font-size:56px;margin-bottom:14px">Pro 再超前</p>'
    + '<p class="tp-desc" style="font-size:13px;margin-bottom:24px">iPhone 18 Pro Max 现仅可在线购买。</p>'
    + '<div style="margin:0 -36px"><img id="' + idp + 'img" src="assets/images/hero/product-studio.png" alt="构图实验" style="display:block;width:78%;max-width:100%;margin-left:auto;aspect-ratio:16/10;object-fit:cover;object-position:50% 40%"></div>'
    + '</div></div></div></section>';
};

R.flexplay = function (b, sid, bi) {
  var idp = 'fx-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Flexbox Playground</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:12px"><div class="seg">'
    + '<button class="active" data-action="fx-dir" data-v="row">row 主轴→</button>'
    + '<button data-action="fx-dir" data-v="column">column 主轴↓</button>'
    + '</div></div>'
    + '<div class="lab-ctrl"><label>justify-content</label><select data-fx="j" aria-label="justify-content">'
    + ['flex-start','center','flex-end','space-between','space-around','space-evenly'].map(function (v) { return '<option' + (v === 'flex-start' ? ' selected' : '') + '>' + v + '</option>'; }).join('')
    + '</select><output></output></div>'
    + '<div class="lab-ctrl"><label>align-items</label><select data-fx="a" aria-label="align-items">'
    + ['stretch','flex-start','center','flex-end'].map(function (v) { return '<option' + (v === 'stretch' ? ' selected' : '') + '>' + v + '</option>'; }).join('')
    + '</select><output></output></div>'
    + '<div class="lab-ctrl"><label for="' + idp + 'gap">gap</label><input type="range" id="' + idp + 'gap" min="0" max="48" value="12" data-fx="g"><output id="' + idp + 'gapv">12px</output></div>'
    + '<p class="pg-col-label" style="margin-top:10px">Boxes 预览（主轴实验）</p>'
    + '<div class="fx-stage"><div class="fx-boxes" id="' + idp + 'boxes">'
    + '<div class="fx-item">1</div><div class="fx-item tall">2</div><div class="fx-item">3</div><div class="fx-item">4</div><div class="fx-item">5</div>'
    + '</div></div>'
    + '<p class="pg-col-label" style="margin-top:10px">迷你导航预览（同一套设置）</p>'
    + '<div class="navmock" style="position:relative"><div class="navmock-list" id="' + idp + 'navlist">'
    + '<a class="navmock-a">Apple</a><a class="navmock-a">商店</a><a class="navmock-a">Mac</a><a class="navmock-a">iPhone</a><a class="navmock-a">技术支持</a>'
    + '</div></div>'
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '</div></section>';
};

R.positionlab = function (b, sid, bi) {
  var idp = 'ps-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Position Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:12px"><div class="seg">'
    + '<button class="active" data-action="ps-mode" data-v="relative">relative</button>'
    + '<button data-action="ps-mode" data-v="absolute">absolute</button>'
    + '</div></div>'
    + '<div class="lab-ctrl"><label for="' + idp + 'ox">偏移 X（relative）</label><input type="range" id="' + idp + 'ox" min="-60" max="60" value="0" data-ps="x"><output id="' + idp + 'oxv">0px</output></div>'
    + '<div class="lab-ctrl"><label for="' + idp + 'oy">偏移 Y（relative）</label><input type="range" id="' + idp + 'oy" min="-60" max="60" value="0" data-ps="y"><output id="' + idp + 'oyv">0px</output></div>'
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Preview</p>'
    + '<div class="ps-stage">'
    + '<div class="ps-card"><p class="ps-title">产品卡片</p><p class="ps-sub">relative 的锚 + 占位测试场</p>'
    + '<span class="ps-badge" id="' + idp + 'badge">NEW 徽章</span>'
    + '</div></div></div></div></section>';
};

R.stickyscroll = function (b, sid, bi) {
  var idp = 'sk-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Sticky Scroll Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:12px"><button class="tool-btn primary" data-action="sk-down">↓ 滚到底</button>'
    + '<button class="tool-btn" data-action="sk-up">↑ 回顶部</button>'
    + '<button class="tool-btn" data-action="sk-break">一键制造失效（overflow:hidden）</button></div>'
    + '<div class="lab-row" style="margin-bottom:12px"><div class="seg">'
    + '<button class="active" data-action="sk-top" data-v="0">top: 0</button>'
    + '<button data-action="sk-top" data-v="none">top: 未设置</button>'
    + '</div></div>'
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '<div class="note-callout">sticky 三要素现场：① position:sticky（本例一直有）② top 阈值（可开关）③ 父容器 overflow（可一键破坏）。用左边的按钮组合出"装死"状态，再修复它。</div>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Mini Page（可滚动）</p>'
    + '<div class="sk-scroll" id="' + idp + 'scroll">'
    + '<div class="sk-hero">HERO 开场区<br><small>子导航此刻还在文档流里——往下滚</small></div>'
    + '<div class="sk-nav" id="' + idp + 'nav"><span>iPhone 18 Pro</span><span class="sk-buy">购买</span></div>'
    + '<div class="sk-body"><p>↓ 往下滚，观察子导航何时"钉住"。</p>'
    + '<p>第一屏内容……</p><p>第二屏内容……</p><p>第三屏内容……</p><p>第四屏内容……</p>'
    + '<p>第五屏内容……</p><p>第六屏内容……</p><p>到底了——sticky 只在父容器范围内有效。</p></div>'
    + '</div></div></div></section>';
};

R.zindexviz = function (b, sid, bi) {
  var idp = 'zx-' + sid + '-' + bi + '-';
  function sl(id, label, val) {
    return '<div class="lab-ctrl"><label for="' + id + '">' + label + '</label>'
      + '<input type="range" id="' + id + '" min="0" max="30" value="' + val + '" data-zx="' + id.replace(idp, '') + '">'
      + '<output id="' + id + 'v">' + val + '</output></div>';
  }
  return '<section class="block"><div class="kicker">Z-Index Visualizer</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + sl(idp + 'content', '普通内容 z-index', 1)
    + sl(idp + 'image', '大图片 z-index', 5)
    + sl(idp + 'subnav', '吸顶子导航 z-index', 10)
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Stacking</p>'
    + '<div class="zx-stage">'
    + '<div class="zx-layer zx-img" id="' + idp + 'image">大图片</div>'
    + '<div class="zx-layer zx-content" id="' + idp + 'content">普通内容</div>'
    + '<div class="zx-layer zx-subnav" id="' + idp + 'subnav">吸顶子导航</div>'
    + '</div></div></div></section>';
};

R.layoutlab = function (b, sid, bi) {
  var idp = 'ly-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Layout Builder</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">装配参数</p><div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:12px"><div class="seg">'
    + '<button class="active" data-action="ly-side" data-v="right">图在右</button>'
    + '<button data-action="ly-side" data-v="left">图在左</button>'
    + '</div><div class="seg">'
    + '<button class="active" data-action="ly-stack" data-v="row">row</button>'
    + '<button data-action="ly-stack" data-v="column">column（堆叠）</button>'
    + '</div></div>'
    + '<div class="lab-ctrl"><label for="' + idp + 'imgw">视觉列 flex</label><input type="range" id="' + idp + 'imgw" min="6" max="20" value="10" data-ly="imgf"><output id="' + idp + 'imgwv">1.0</output></div>'
    + '<div class="lab-ctrl"><label for="' + idp + 'gap">列间距</label><input type="range" id="' + idp + 'gap" min="12" max="80" value="32" data-ly="gap"><output id="' + idp + 'gapv">32px</output></div>'
    + '<div class="lab-row"><div class="seg">'
    + '<button class="active" data-action="ly-align" data-v="center">垂直居中</button>'
    + '<button data-action="ly-align" data-v="flex-start">顶对齐</button>'
    + '</div></div>'
    + '<p class="vp-caption">自查：图有力量感？文字行宽可读？方向选谁？——没有标准答案，有"是否成立"。</p>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">性能模块 · 实时预览</p>'
    + '<div class="typo-preview" style="background:#000;padding:28px 26px">'
    + '<div class="ly-flex" id="' + idp + 'flex" style="display:flex;gap:32px;align-items:center">'
    + '<div class="ly-copy" style="flex:10"><p style="margin:0 0 6px;font-size:20px;font-weight:600;color:#f5f5f7">2 纳米芯旗舰</p><p style="margin:0;font-size:13px;color:#86868b;line-height:1.65">A20 Pro 采用 2 纳米制程，性能和能效均创 iPhone 新高，配合新一代 VC 均热板，持久畅玩高阶游戏。</p></div>'
    + '<figure class="ly-visual" id="' + idp + 'visual" style="flex:10;margin:0"><img src="assets/images/hero/product-studio.png" alt="性能模块视觉" style="display:block;width:100%;height:auto;border-radius:10px"><figcaption style="font-size:10.5px;color:#6e6e73;margin-top:8px">A20 Pro 芯片：2 纳米制程</figcaption></figure>'
    + '</div></div></div></div></section>';
};

R.vidlab = function (b, sid, bi) {
  var idp = 'vd-' + sid + '-' + bi + '-';
  var attrs = [
    { k: 'autoplay', n: 'autoplay', d: '自动播放。浏览器铁律：必须配合 muted，否则拒绝执行。' },
    { k: 'muted', n: 'muted', d: '静音。氛围视频的"入场券"——没有它就没有自动播放。' },
    { k: 'loop', n: 'loop', d: '循环播放。氛围需要"永不落幕"；教学视频千万别开（看完又重来）。' },
    { k: 'playsinline', n: 'playsinline', d: '行内播放。防 iOS 自动全屏劫持——手机页面的保命属性。' },
    { k: 'controls', n: 'controls', d: '显示控制条。给"用户主动看"的视频；氛围视频加了反而意图混乱。' },
    { k: 'poster', n: 'poster', d: '封面图。加载前与未播放时的门面——没有它就是黑屏等待。' }
  ];
  return '<section class="block"><div class="kicker">Video Attribute Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">属性开关</p><div class="card lab">'
    + attrs.map(function (a) {
      var checked = a.k === 'autoplay' || a.k === 'muted' || a.k === 'poster';
      return '<label class="kb-check"><input type="checkbox" data-vd="' + a.k + '"' + (checked ? ' checked' : '') + '><span><b style="font-family:var(--mono);font-size:13px">' + a.n + '</b> · ' + a.d + '</span></label>';
    }).join('')
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Live Video</p>'
    + '<div class="vid-stage"><video id="' + idp + 'v" src="assets/video/intro.mp4" poster="assets/images/hero/product-desktop.png" muted playsinline style="width:100%;display:block;border-radius:10px"></video>'
    + '<p class="vp-caption" id="' + idp + 'read"></p></div></div></div></section>';
};

R.autolab = function (b, sid, bi) {
  var idp = 'au-' + sid + '-' + bi + '-';
  var items = [
    { q: 'Hero 背景的氛围短片（无声、循环、纯氛围）', a: 'auto', why: '自动播放。它是舞台灯光——静音、循环、不打扰。' },
    { q: '"观看产品影片"按钮点开后的 3 分钟讲解', a: 'user', why: '用户点击。长视频有声音有叙事——控制权必须归用户。' },
    { q: '参数表格旁边的小演示循环', a: 'user', why: '默认不播。这是"读"的区域——任何运动都是阅读干扰（P01）。' },
    { q: '滚入视口时的特性演示短片（无声 5 秒）', a: 'auto', why: '可自动播放（静音+行内），但用 IntersectionObserver 控制进出视口暂停——Stage 12 的伏笔。' }
  ];
  return '<section class="block"><div class="kicker">Autoplay Decision</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad">'
    + items.map(function (it, i) {
      return '<div class="judge-scenario"><p class="lab-title">' + esc(it.q) + '</p>'
        + '<div class="lab-row" data-aurow="' + i + '">'
        + '<button class="choice-btn" data-action="au-pick" data-i="' + i + '" data-v="auto">自动播放</button>'
        + '<button class="choice-btn" data-action="au-pick" data-i="' + i + '" data-v="user">用户点击播放</button>'
        + '</div><div class="lab-why" data-auwhy="' + i + '"></div></div>';
    }).join('')
    + '<div class="note-callout" style="margin-top:14px">判断口诀：<b>动归氛围，声归用户，读区禁动。</b></div>'
    + '</div></section>';
};

R.gridplay = function (b, sid, bi) {
  var idp = 'gp-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Grid Playground</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:12px"><div class="seg">'
    + '<button class="active" data-action="gp-cols" data-v="1">1 列</button>'
    + '<button data-action="gp-cols" data-v="2">2 列</button>'
    + '<button data-action="gp-cols" data-v="3">3 列</button>'
    + '<button data-action="gp-cols" data-v="auto">auto-fit</button>'
    + '</div></div>'
    + '<div class="lab-ctrl"><label for="' + idp + 'gap">gap</label><input type="range" id="' + idp + 'gap" min="0" max="48" value="20" data-gp="gap"><output id="' + idp + 'gapv">20px</output></div>'
    + '<div class="gp-cards" id="' + idp + 'cards">'
    + ['摄像头 · 4800 万主摄','A20 Pro · 2 纳米','四色 · 钛金属','电池 · 43 小时','灵动岛 · 新交互','USB-C · 高速'].map(function (t) {
      return '<div class="gp-card"><b>' + t.split(' · ')[0] + '</b><span>' + t.split(' · ')[1] + '</span></div>';
    }).join('')
    + '</div>'
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '</div></section>';
};

R.statesync = function (b, sid, bi) {
  var idp = 'stlab-' + sid + '-' + bi + '-';
  window.__mini = window.__mini || {};
  window.__mini[idp + 'bad'] = b.brokenDoc;
  window.__mini[idp + 'good'] = b.goodDoc;
  return '<section class="block"><div class="kicker">State Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">故障版 · 只换图</p><iframe class="pg-frame" id="' + idp + 'bad" title="状态不一致演示" style="height:300px"></iframe></div>'
    + '<div class="pg-col"><p class="pg-col-label">完整版 · 三态同步</p><iframe class="pg-frame" id="' + idp + 'good" title="状态一致演示" style="height:300px"></iframe></div>'
    + '</div>'
    + '<p class="vp-caption">两个版本代码只差几行——但体验天差地别。状态同步不是"高级优化"，是及格线。</p>'
    + '</section>';
};

R.ioviz = function (b, sid, bi) {
  var idp = 'io-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Intersection Visualizer</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-ctrl"><label for="' + idp + 'th">threshold</label>'
    + '<input type="range" id="' + idp + 'th" min="5" max="95" value="30" data-io="th"><output id="' + idp + 'thv">30%</output></div>'
    + '<div class="io-wrap">'
    + '<div class="io-viewport" id="' + idp + 'vp"><span class="io-vp-tag">视口 viewport</span>'
    + '<div class="io-strip" id="' + idp + 'strip">'
    + '<div class="io-block m1">模块 1<br><small id="' + idp + 's1">…</small></div>'
    + '<div class="io-block m2">模块 2<br><small id="' + idp + 's2">…</small></div>'
    + '<div class="io-block m3">模块 3<br><small id="' + idp + 's3">…</small></div>'
    + '</div></div></div>'
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '<div class="note-callout">真实机制对照：本实验手动计算相交比例；页面上真正的 IntersectionObserver 由浏览器在空闲时批量计算——结果一致，成本天差地别。</div>'
    + '</div></section>';
};

R.motioncompare = function (b, sid, bi) {
  var idp = 'mc-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Motion Compare</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:14px"><button class="tool-btn primary" data-action="mc-play">▶ 播放三档显现</button>'
    + '<button class="tool-btn" data-action="mc-reset">复位</button></div>'
    + '<div class="mc-grid">'
    + '<div class="mc-col"><div class="mc-stage"><div class="mc-box" id="' + idp + 'a" style="opacity:0"></div></div><p class="lab-title" style="margin:10px 0 2px">No Motion</p><p class="lab-desc" style="margin:0">直接出现。信息密度高的工具页常用。</p></div>'
    + '<div class="mc-col"><div class="mc-stage"><div class="mc-box mc-subtle" id="' + idp + 'b" style="opacity:0;transform:translateY(14px)"></div></div><p class="lab-title" style="margin:10px 0 2px">Subtle</p><p class="lab-desc" style="margin:0">淡入 + 14px 上浮，0.5s。Apple 的默认档。</p></div>'
    + '<div class="mc-col"><div class="mc-stage"><div class="mc-box mc-loud" id="' + idp + 'c" style="opacity:0"></div></div><p class="lab-title" style="margin:10px 0 2px">Exaggerated</p><p class="lab-desc" style="margin:0">弹跳 + 旋转 + 缩放。营销活动页偶用，产品页灾难。</p></div>'
    + '</div>'
    + '<div class="lab-row" style="margin-top:14px"><p class="lab-title" style="margin:0">你的判断：产品页的默认档是？</p>'
    + '<div class="seg">'
    + '<button data-action="mc-pick" data-v="none">No Motion</button>'
    + '<button class="choice-btn" data-action="mc-pick" data-v="subtle">Subtle</button>'
    + '<button class="choice-btn" data-action="mc-pick" data-v="loud">Exaggerated</button>'
    + '</div></div>'
    + '<div class="lab-why" id="' + idp + 'why"></div>'
    + '</div></section>';
};

R.tablelab = function (b, sid, bi) {
  var idp = 'tb-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Table Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:14px"><div class="seg">'
    + '<button class="active" data-action="tb-mode" data-v="semantic">语义完整（th + scope）</button>'
    + '<button data-action="tb-mode" data-v="bare">无 th（读屏器视角）</button>'
    + '</div></div>'
    + '<div class="tbl-scroll"><table class="tbl-demo" id="' + idp + 'tbl">'
    + '<thead><tr><th></th><th scope="col">iPhone 18 Pro</th><th scope="col">iPhone Duo</th></tr></thead>'
    + '<tbody>'
    + '<tr><th scope="row">屏幕</th><td>6.9 英寸</td><td>7.6 英寸可折叠</td></tr>'
    + '<tr><th scope="row">芯片</th><td>A20 Pro</td><td>A20 Pro</td></tr>'
    + '<tr><th scope="row">续航</th><td>最长 43 小时</td><td>外屏 44 小时</td></tr>'
    + '</tbody></table></div>'
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '<div class="note-callout">读屏器用户听到的是"第 1 行第 2 列：iPhone 18 Pro"这样的<b>坐标播报</b>——全靠 th + scope。切到"无 th"模式：坐标信息归零，表格变成一堆碰巧排齐的文字。</div>'
    + '</div></section>';
};

R.simulator = function (b, sid, bi) {
  var idp = 'rs-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Responsive Simulator</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:12px"><div class="seg">'
    + '<button class="active" data-action="rs-w" data-w="390">390</button>'
    + '<button data-action="rs-w" data-w="768">768</button>'
    + '<button data-action="rs-w" data-w="1024">1024</button>'
    + '<button data-action="rs-w" data-w="1440">1440</button>'
    + '</div><span class="vp-caption" style="margin:0" id="' + idp + 'w"></span></div>'
    + '<div class="ri-stage" style="background:#000;border-radius:12px;padding:10px;display:flex;justify-content:center;overflow:hidden">'
    + '<iframe id="' + idp + 'frame" title="响应式整页巡检" style="width:390px;height:560px;border:0;border-radius:8px;display:block;max-width:100%"></iframe>'
    + '</div>'
    + '<div class="note-callout" style="margin-top:12px">巡检清单：① 734px 两侧模块是否同时切换 ② 手机档卡片是否单列 ③ 有无横向滚动 ④ 间距是否随档位收敛。断点 = 全站约定，不是每个组件自己的事。</div>'
    + '</div></section>';
};

R.final = function (b) {
  var pageHtml = window.FINAL_PAGE_HTML || '<!-- 加载中 -->';
  return '<section class="block"><div class="kicker">Final Reconstruction</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="note-callout" style="margin-bottom:14px">这是<b>教学复刻</b>，非 Apple 官方源码。Apple 商标归 Apple Inc. 所有，本页面仅供本地学习。素材为课程原创占位，Apple 截图仅作参考。</div>'
    + '<div class="lab-row" style="margin-bottom:12px">'
    + '<button class="tool-btn primary" data-action="asm-download">↓ Download index.html</button>'
    + '<button class="tool-btn" data-action="asm-copy">Copy HTML</button>'
    + '</div>'
    + '<div class="browser" style="margin-bottom:14px">'
    + '<div class="b-chrome"><span class="b-dots"><i></i><i></i><i></i></span>'
    + '<span class="b-tab">iPhone 18 Pro - 教学复刻</span></div>'
    + '<iframe id="finalPreview" title="Final Reconstruction 完整页面" style="width:100%;height:600px;border:0;border-radius:0 0 12px 12px;display:block;background:#000"></iframe>'
    + '</div>'
    + '<details style="margin-top:12px"><summary style="cursor:pointer;font-weight:600;color:var(--link);padding:8px 0">查看完整 HTML 源码</summary>'
    + '<textarea class="editor" readonly style="min-height:300px;margin-top:10px" id="finalSource">' + esc(pageHtml) + '</textarea>'
    + '</details>'
    + '</section>';
};

R.audit = function (b) {
  var items = [
    { n: 'HTML Semantics', cat: 'covered', d: '课程覆盖了 header/nav/main/section/figure/table/footer 等语义标签。' },
    { n: 'CSS Structure', cat: 'covered', d: '容器三件套 + border-box + 模块级类名分区。' },
    { n: 'Responsive', cat: 'auto', d: '预览分别在 390px 与 900px 渲染——Final Assembly iframe 会自动检查横向溢出。' },
    { n: 'Accessibility', cat: 'manual', d: 'lang / alt / focus-visible / 语义 button——需要你逐项检查自己的页面。' },
    { n: 'Interaction', cat: 'manual', d: '颜色切换是否三同步？CTA 是否唯一 Primary？需要你手动确认。' },
    { n: 'Performance Basics', cat: 'covered', d: 'width/height 防跳动、首屏不 lazy、video poster。课程已覆盖，具体数值需你用 DevTools 检查。' },
    { n: 'Visual Hierarchy', cat: 'manual', d: '眯眼看屏幕——第一眼落在哪里？这需要你的眼睛。' },
    { n: 'Spacing', cat: 'covered', d: '间距三档 + 组内紧组间松。课程已覆盖，实际效果需你目视。' },
    { n: 'Typography', cat: 'manual', d: '字号跳跃 32→80、行高正文 1.6 标题 1.1。是否可辨识？你的判断。' },
    { n: 'Image Composition', cat: 'covered', d: '素材负空间、object-fit、不变形。课程已覆盖。' },
    { n: 'Motion', cat: 'auto', d: 'Final Preview 的 IO 是否工作 + reduced-motion 是否豁免。iframe 可自动检查。' },
    { n: 'Maintainability', cat: 'manual', d: '三个月后的你能看懂自己的代码吗？只有你自己知道。' }
  ];
  return '<section class="block"><div class="kicker">Final Audit</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="legend-row" style="margin-bottom:14px">'
    + '<span class="au-badge not-checked">Not Checked</span>'
    + '<span class="au-badge pass">Pass</span>'
    + '<span class="au-badge review">Needs Review</span>'
    + '<span class="au-badge covered-b">Course Covered</span>'
    + '</div>'
    + '<div class="card pad">'
    + items.map(function (it) {
      var isAuto = it.cat === 'auto';
      var badge = isAuto ? '<span class="au-badge pass">Auto</span>' : it.cat === 'covered' ? '<span class="au-badge covered-b">Covered</span>' : '<span class="au-badge not-checked">Not Checked</span>';
      var controls = '';
      if (it.cat !== 'covered') {
        controls = '<div class="au-btns">'
          + '<button class="au-btn" data-audit="pass" aria-pressed="false">Pass</button>'
          + '<button class="au-btn" data-audit="review" aria-pressed="false">Needs Review</button>'
          + '</div>';
      }
      return '<div class="audit-row"><div style="flex:1"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">'
        + '<p class="lab-title" style="margin:0">' + esc(it.n) + '</p>' + badge + '</div>'
        + '<p class="lab-desc" style="margin:4px 0 0">' + esc(it.d) + '</p>'
        + controls + '</div></div>';
    }).join('')
    + '<p class="vp-caption" style="margin-top:12px">Auto = 平台自动检查（蓝色）。Covered = 课程已覆盖（不能当 Pass）。Not Checked = 等你确认。Pass/Needs Review 由你在检查自己的 Final Reconstruction 后手动标记。</p>'
    + '</div></section>';
};

R.knowmap = function (b) {
  var domains = [
    { d: 'HTML', nodes: [
      ['Document', 'S1 骨架 / S1 meta 铁三角'], ['Semantic', 'S2 main·section / S6 header·nav·ul / S13 footer·table'],
      ['Media', 'S4 img·picture·source / S9 video'], ['Navigation', 'S6 nav / S7 sticky 子导航 / S13 页脚 nav'],
      ['Tables', 'S13 table 全家桶 + scope']
    ]},
    { d: 'CSS', nodes: [
      ['Typography', 'S2 字号跳跃 / S5 clamp() 流式'], ['Spacing', 'S2 margin/padding / S5 容器 / S7 间距节奏'],
      ['Flexbox', 'S6 轴与对齐 / S8 两栏深化'], ['Grid', 'S10 repeat·minmax·auto-fit'],
      ['Position', 'S7 sticky/relative/absolute/z-index'], ['Responsive', 'S4 picture / S14 断点系统'],
      ['Motion', 'S3 transition / S12 显现三件套']
    ]},
    { d: 'JavaScript', nodes: [
      ['DOM', 'S11 querySelector / textContent / classList'],
      ['Event', 'S11 addEventListener / click'],
      ['State', 'S11 状态三同步'],
      ['Observer', 'S12 IntersectionObserver + threshold']
    ]},
    { d: 'Design', nodes: [
      ['Hierarchy', 'P01 / P04 / P08'], ['Spacing', 'P07 / P02'],
      ['Composition', 'P06 / P13 / P14 / P15'], ['Action', 'P05 / P10'],
      ['Interaction', 'P11 / P12 / P16 / P17'], ['Structure', 'P03 / P09']
    ]}
  ];
  return '<section class="block"><div class="kicker">Knowledge Map</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + domains.map(function (dom) {
      return '<div class="card pad" style="margin-bottom:14px"><div class="kicker" style="color:var(--ink)">' + esc(dom.d) + '</div>'
        + '<div class="km-grid">'
        + dom.nodes.map(function (n) {
          var jump = '';
          var m = /S(\d+)/.exec(n[1]);
          if (m) jump = ' data-action="km-jump" data-stage="stage-' + m[1] + '"';
          return '<div class="km-node"' + jump + ' style="' + (jump ? 'cursor:pointer' : '') + '"><b>' + esc(n[0]) + '</b><span>' + esc(n[1]) + '</span></div>';
        }).join('')
        + '</div></div>';
    }).join('')
    + '<p class="vp-caption">节点文案即"在哪个 Stage 学到什么"。点击左侧目录任意关卡可回溯复习。</p>'
    + '</section>';
};

R.transferfinal = function (b) {
  return '<section class="block"><div class="kicker">Transfer</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + b.steps.map(function (st) {
      return '<div class="tf-step"><div class="tf-n">' + st.n + '</div>'
        + '<div class="tf-body"><p class="lab-title" style="margin:0 0 4px">' + esc(st.t) + '</p>'
        + '<p class="lab-desc" style="margin:0 0 8px">' + esc(st.d) + '</p>'
        + '<p class="tf-probe">' + esc(st.probe) + '</p></div></div>';
    }).join('')
    + '<div class="sum-next" style="margin-top:16px"><div><div class="sn-t">After Graduation</div>'
    + '<div class="sn-d">Project B（半独立）继续练判断，Project C（独立）把这一切变成你自己的产品。两条路都通——先学完，再选择。</div></div></div>'
    + '</section>';
};

R.skillmap = function (b) {
  var groups = [
    { g: '网页结构', items: ['HTML 语义骨架（S1）', '语义分区 main/section（S2）', '导航与页脚结构（S6/S13）', '表格语义（S13）'] },
    { g: '样式与排版', items: ['Typography 层级（S2/S5）', '容器与流式布局（S5）', 'Flexbox（S6/S8）', 'Grid（S10）', 'Position/Sticky（S7）'] },
    { g: '媒体', items: ['img/picture 响应式图片（S4）', 'object-fit/构图（S4）', 'video 属性策略（S9）'] },
    { g: '交互与 JS', items: ['DOM 查询与事件（S11）', '状态同步（S11）', 'IntersectionObserver（S12）', '无障碍交互（S3/S12）'] },
    { g: '设计判断', items: ['视觉焦点与层级（P01/P04/P08）', '留白与节奏（P02/P07/P16）', '构图与素材（P06/P13/P14/P15）', '动作与反馈（P05/P10/P11）', '一致性与工艺（P03/P09/P17）'] },
    { g: '工程素养', items: ['DevTools 排查（S4/S14）', '真实 DOM 验证思维（全课程）', '断点与性能意识（S14）'] }
  ];
  return '<section class="block"><div class="kicker">Skill Map</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="legend-row"><span class="lg-pill covered">课程已覆盖</span><span class="lg-pill mastered">已掌握（需学习后自评）</span><span class="lg-note">覆盖 ≠ 掌握—— Mastery 由你的正式学习与自评决定。</span></div>'
    + groups.map(function (g) {
      return '<div class="card pad" style="margin-bottom:14px"><div class="kicker" style="color:var(--ink)">' + esc(g.g) + '</div>'
        + '<div class="skill-grid">'
        + g.items.map(function (it) {
          return '<div class="skill-item"><span class="sk-status covered">覆盖</span><span>' + esc(it) + '</span></div>';
        }).join('')
        + '</div></div>';
    }).join('')
    + '<div class="note-callout" style="margin-top:6px">全部 6 组 24 项能力均为<b>课程已覆盖</b>。完成对应 Stage 并打勾 Checklist 后，你可以把它们逐一改标为"已掌握"——那张表才是你的真实能力清单。</div>'
    + '</section>';
};

R.design2 = function (b) {
  var qs = b.questions.map(function (q, qi) {
    function opt(key) {
      var o = q[key];
      return '<button class="design-opt" data-action="design2-pick" data-q="' + qi + '" data-opt="' + key + '">'
        + '<span class="do-label">' + esc(o.label) + '</span><div class="do-body">' + o.body + '</div>'
        + '<p class="lab-desc" style="margin:8px 0 0;font-size:11.5px;color:var(--ink2)">' + esc(o.when) + '</p></button>';
    }
    var dims = ['用户', '页面目标', '取舍', '不是"更像 Apple"'];
    var checklist = '<div class="reason-checklist" data-rc="' + qi + '" style="display:none;margin-top:12px">'
      + '<p class="lab-title" style="margin:0 0 6px;font-size:13px">你的理由是否考虑了这些维度？</p>'
      + dims.map(function (dm, di) {
        return '<label style="display:flex;gap:8px;align-items:center;font-size:13px;padding:4px 0;cursor:pointer">'
          + '<input type="checkbox" data-rc-c="' + qi + '-' + di + '"><span>' + (di < 3 ? '我提到了' : '我不是因为') + esc(dm) + '</span></label>';
      }).join('')
      + '<p class="vp-caption" style="margin-top:8px">两方案都可以成立——关键是你能否说清楚"在什么条件下选哪个"。</p></div>';
    return '<div class="design-q" data-dq2="' + qi + '"><h3>' + esc(q.q) + '</h3>'
      + '<div class="design-opts">' + opt('a') + opt('b') + '</div>'
      + '<div style="margin-top:10px"><button class="tool-btn quiet" data-action="design2-why" data-q="' + qi + '">我选好了——看理由维度</button></div>'
      + checklist
      + '<div class="design-analysis" data-d2a="' + qi + '">'
      + '<span class="p-tag">Trade-off · 两方案都可以成立</span>'
      + '<p style="margin:6px 0 0">' + q.analysis + '</p></div></div>';
  }).join('');
  return '<section class="block"><div class="kicker">Trade-off Judgment</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad">' + qs + '</div></section>';
};

R.jsprimer = function (b, sid, bi) {
  var idp = 'jp-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">JS Primer</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    /* 1. Variable */
    + '<div class="card pad" style="margin-bottom:14px"><div class="kicker" style="color:var(--ink)">1 · Variable 变量</div>'
    + '<p style="font-size:14.5px;margin:0 0 10px"><code style="font-family:var(--mono);font-size:13px">const color = "red"</code> —— <code>const</code> 声明一个不可重新赋值的变量（<code>let</code> 可以）。变量 = 一个有名字的盒子，里面存一个值。</p>'
    + '<div class="lab-row"><input type="text" id="' + idp + 'varIn" value="red" aria-label="修改变量值">'
    + '<span style="font-family:var(--mono);font-size:14px" id="' + idp + 'varOut">color → <b>"red"</b></span></div>'
    + '<p class="vp-caption">修改上面的值，右边的"盒子"实时更新——这就是变量的本质。</p></div>'
    /* 2. Function */
    + '<div class="card pad" style="margin-bottom:14px"><div class="kicker" style="color:var(--ink)">2 · Function 函数</div>'
    + '<p style="font-size:14.5px;margin:0 0 10px">函数 = 一台机器：输入 → 处理 → 输出。<code>function greet(name) { return "Hello " + name; }</code></p>'
    + '<div class="lab-row"><input type="text" id="' + idp + 'fnIn" value="World" aria-label="函数参数">'
    + '<span style="font-family:var(--mono);font-size:13px;color:var(--ink2)">→</span>'
    + '<span style="font-family:var(--mono);font-size:14px;color:#0071e3;font-weight:600" id="' + idp + 'fnOut">"Hello World"</span></div>'
    + '<p class="vp-caption">修改参数 name，看输出怎么变。<code>return</code> 就是"机器吐出的结果"。</p></div>'
    /* 3. Array + forEach */
    + '<div class="card pad" style="margin-bottom:14px"><div class="kicker" style="color:var(--ink)">3 · Array + forEach</div>'
    + '<p style="font-size:14.5px;margin:0 0 10px"><code>forEach</code> 对数组里的<b>每一项</b>执行一次你给的函数。</p>'
    + '<div style="font-family:var(--mono);font-size:13px;background:var(--code-bg);color:var(--code-ink);border-radius:8px;padding:12px 14px;margin-bottom:10px">'
    + '<span style="color:#79c0ff">var</span> colors = [<span style="color:#a5d6ff">"burgundy"</span>, <span style="color:#a5d6ff">"glacier"</span>, <span style="color:#a5d6ff">"silver"</span>];<br>'
    + 'colors.<span style="color:#d2a8ff">forEach</span>(<span style="color:#ff7b72">function</span>(c) { console.<span style="color:#d2a8ff">log</span>(c); });</div>'
    + '<div class="lab-row"><button class="tool-btn primary" data-action="jp-foreach">▶ Run forEach</button></div>'
    + '<div id="' + idp + 'feOut" style="font-family:var(--mono);font-size:12.5px;margin-top:10px;color:var(--ink2);min-height:52px"></div>'
    + '<p class="vp-caption">S11 里你会对 4 个颜色圆点做 forEach——每一个都绑一个 click 事件。</p></div>'
    /* 4. Callback */
    + '<div class="card pad" style="margin-bottom:14px"><div class="kicker" style="color:var(--ink)">4 · Callback 回调</div>'
    + '<p style="font-size:14.5px;margin:0 0 10px"><code>addEventListener("click", <b>doSomething</b>)</code> —— 你传的是<b>函数本身</b>，不是<b>函数的执行结果</b>。浏览器在用户点击时才调用它。</p>'
    + '<div class="lab-row" style="margin-bottom:10px"><button class="tool-btn primary" id="' + idp + 'cbBtn">点我触发 callback</button>'
    + '<span style="font-family:var(--mono);font-size:12px;color:var(--ink3)" id="' + idp + 'cbCount">触发 0 次</span></div>'
    + '<div style="background:var(--bg2);border-radius:8px;padding:10px 14px;font-family:var(--mono);font-size:12px;color:var(--ink2);line-height:1.8">'
    + '用户点击 → 浏览器产生 click event → 调用你给的函数 → 函数改变 DOM<br>'
    + '<span style="color:#0071e3">addEventListener</span>(<span style="color:#a5d6ff">"click"</span>, <span style="color:#d2a8ff">doSomething</span>) ← 传函数名，<b>没有</b>()<br>'
    + '<span style="color:#0071e3">addEventListener</span>(<span style="color:#a5d6ff">"click"</span>, doSomething()) ← ❌ 立即执行了一次，不是监听！</div>'
    + '<p class="vp-caption">这就是为什么 <code>addEventListener("click", fn)</code> 传的是 fn 而不是 fn()。</p></div>'
    /* 5. DOM Bridge */
    + '<div class="card pad"><div class="kicker" style="color:var(--ink)">5 · DOM Bridge · querySelector + dataset</div>'
    + '<p style="font-size:14.5px;margin:0 0 10px">JS 通过 <code>querySelector</code> 用 CSS 选择器"选中"页面元素，通过 <code>dataset</code> 读取 <code>data-*</code> 属性。</p>'
    + '<div style="font-family:var(--mono);font-size:13px;background:var(--code-bg);color:var(--code-ink);border-radius:8px;padding:12px 14px;margin-bottom:10px">'
    + '<span style="color:#79c0ff">var</span> img = document.<span style="color:#d2a8ff">querySelector</span>(<span style="color:#a5d6ff">".pick-img"</span>);<br>'
    + 'img.src = <span style="color:#a5d6ff">"color-" </span> + d.<span style="color:#d2a8ff">dataset</span>.color + <span style="color:#a5d6ff">".png"</span>;</div>'
    + '<p class="vp-caption"><code>dataset.color</code> 读取的就是 HTML 里的 <code>data-color="glacier"</code> 属性。这就是 JS 从 HTML 读参数的方式。</p>'
    + '</div>'
    /* 总结 */
    + '<div class="sum-next" style="margin-top:14px"><div><div class="sn-t">You are ready</div>'
    + '<div class="sn-d">接下来 S11 的颜色选择器会用到：const / querySelector / addEventListener / function / callback / forEach / dataset / classList。刚才你全部摸过了——现在去用它。</div></div></div>'
    + '</section>';
};

var DEFAULT_MINE = '<div style="padding:34px 30px 0"><p style="margin:0 0 4px;font-size:15px;color:#a1a1a6;font-weight:600">iPhone 18 Pro</p><p style="margin:0 0 10px;font-size:36px;font-weight:600;color:#f5f5f7;line-height:1.1">Pro 再超前</p><p style="margin:0 0 16px;font-size:12px;color:#86868b">现仅可在线购买 · RMB 9999 起</p><span style="display:inline-block;background:#0071e3;color:#fff;font-size:13px;font-weight:600;padding:7px 18px;border-radius:99px">购买</span></div><img src="assets/images/hero/product-studio.png" alt="教学实现的产品视觉" style="display:block;width:100%;margin-top:14px">';
var DEFAULT_NOTES = ['产品大小与位置：参考图的产品更靠上、更大——对比你的实现差在哪', '留白：参考图的暗部负空间更大——文字与图的呼吸感差多少', '图文关系：参考图文字压在场景里，你的实现文字在图上方——Stage 5 用布局解决'];
R.refcompare = function (b, sid, bi) {
  var idp = 'rc-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Reference vs Mine</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:12px"><div class="seg">'
    + '<button class="active" data-action="rc-mode" data-m="side">Side-by-side</button>'
    + '<button data-action="rc-mode" data-m="overlay">Overlay 叠加</button>'
    + '</div>'
    + '<div class="lab-ctrl" id="' + idp + 'opwrap" style="display:none;margin:0;flex:1"><label for="' + idp + 'op">我的版本透明度</label>'
    + '<input type="range" id="' + idp + 'op" min="10" max="100" value="50" data-rc="op"><output id="' + idp + 'opv">50%</output></div>'
    + '</div>'
    + '<div class="rc-wrap" id="' + idp + 'wrap" data-mode="side">'
    + '<div class="rc-pane"><span class="rc-tag">Apple Reference</span><img src="curriculum/reference/18pro-hero-desktop.png" alt="Apple 官方首屏参考截图"></div>'
    + '<div class="rc-pane"><span class="rc-tag mine">My Version</span><div class="rc-mine">' + (b.mine || DEFAULT_MINE) + '</div></div>'
    + '</div>'
    + '<ul class="goal-list" style="margin-top:14px">'
    + (b.notes || DEFAULT_NOTES).map(function (n, i) { return '<li><span class="g-n">' + (i + 1) + '</span><span>' + n + '</span></li>'; }).join('')
    + '</ul>'
    + '<p class="vp-caption">Overlay 模式拖动透明度，直接看"差多少"。差异不是失败——它们就是 Stage 5 的任务清单。</p>'
    + '</div></section>';
};

R.rimagelab = function (b, sid, bi) {
  var idp = 'ri-' + sid + '-' + bi + '-';
  var pageDoc = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><style>body{margin:0;background:#000;padding:8px}img{display:block;width:100%;height:auto}</style></head><body>'
    + '<picture>'
    + '<source media="(max-width: 734px)" srcset="assets/images/hero/product-mobile.png 780w, assets/images/hero/product-mobile@2x.png 1560w" sizes="100vw">'
    + '<img src="assets/images/hero/product-desktop.png" srcset="assets/images/hero/product-desktop.png 1200w, assets/images/hero/product-desktop@2x.png 2400w" sizes="100vw" alt="响应式演示图">'
    + '</picture>'
    + '</body></html>';
  window.__mini = window.__mini || {};
  window.__mini[idp + 'frame'] = pageDoc;
  function cell(label, id) {
    return '<div class="ri-row"><span class="ri-k">' + label + '</span><span class="ri-v" id="' + id + '">—</span></div>';
  }
  return '<section class="block"><div class="kicker">Responsive Image Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-row" style="margin-bottom:12px"><div class="seg">'
    + '<button class="active" data-action="ri-width" data-w="390">390</button>'
    + '<button data-action="ri-width" data-w="768">768</button>'
    + '<button data-action="ri-width" data-w="1440">1440</button>'
    + '</div><span class="vp-caption" style="margin:0">改变的是 iframe 的真实视口宽度——媒体条件和 srcset 都由浏览器真实求值。</span></div>'
    + '<div class="ri-stage"><iframe id="' + idp + 'frame" title="响应式图片实验" style="width:390px;height:280px;border:0;border-radius:10px;background:#000;display:block;max-width:100%"></iframe></div>'
    + '<div class="ri-inspector">'
    + '<p class="pg-col-label" style="margin-top:4px">Responsive Image Inspector</p>'
    + cell('Viewport（iframe 视口）', idp + 'w')
    + cell('Device Pixel Ratio', idp + 'dpr')
    + cell('Matched（谁被选中）', idp + 'match')
    + cell('Current Src（最终资源）', idp + 'cur')
    + cell('Intrinsic（密度校正后）', idp + 'nat')
    + cell('Rendered Width（实际渲染宽）', idp + 'rw')
    + '</div>'
    + '<div class="note-callout">换宽度时留意：734px 断点两侧 <b>Matched</b> 会从 mobile source 切到 desktop img；再对照 Current Src 的文件名——你正在亲眼看到浏览器的选择过程。<b>彩蛋：</b>Intrinsic 一栏显示的是"密度校正后"的固有尺寸（规范行为）：780w 资源在 2x 屏的 390px 视口里，等效 390 CSS px——这正是"2x 资源"的意义。</div>'
    + '</div></section>';
};

/* ---------- Stage 5 新块 ---------- */

R.containerlab = function (b, sid, bi) {
  var idp = 'cw-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Container Lab</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card lab">'
    + '<div class="lab-ctrl"><label for="' + idp + 'w">内容宽度</label><input type="range" id="' + idp + 'w" min="320" max="1600" step="10" value="980" data-cw="w"><output id="' + idp + 'wv">980px</output></div>'
    + '<div class="lab-row" style="margin-bottom:12px"><div class="seg">'
    + '<button class="active" data-action="cw-center" data-v="on">居中 ON</button>'
    + '<button data-action="cw-center" data-v="off">居中 OFF</button>'
    + '</div></div>'
    + '<div class="cw-stripes"><div class="cw-outer"><div class="cw-inner" id="' + idp + 'box" style="max-width:980px">'
    + '<p class="cw-hero">Pro 再超前</p>'
    + '<p class="cw-body">iPhone 18 Pro Max 现仅可在线购买，并可选择免费送货或前往 Apple Store 零售店取货，还可享受 24 期免息分期。留意这行文字的"行长"：当它超过约 35 个汉字时，你的眼睛从行尾回到行首会开始丢失位置——这就是内容不能无限宽的生理学原因。</p>'
    + '</div></div></div>'
    + '<p class="vp-caption" id="' + idp + 'read"></p>'
    + '<div class="note-callout">两条背景条纹 = 全宽氛围层（body/section 的黑色背景）；中间内容 = 受限容器层。Apple 的"巨大而不散"就是这两层的分工。</div>'
    + '</div></section>';
};

R.clampplay = function (b, sid, bi) {
  var idp = 'cp2-' + sid + '-' + bi + '-';
  function sl(id, label, min, max, val, unit, attr) {
    return '<div class="lab-ctrl"><label for="' + id + '">' + label + '</label>'
      + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" value="' + val + '" data-cl="' + attr + '">'
      + '<output id="' + id + 'v">' + val + unit + '</output></div>';
  }
  return '<section class="block"><div class="kicker">Clamp Playground</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + sl(idp + 'min', '下限 min', 20, 60, 40, 'px', 'min')
    + sl(idp + 'pref', '首选(×vw)', 2, 16, 8, 'vw', 'pref')
    + sl(idp + 'max', '上限 max', 60, 200, 80, 'px', 'max')
    + sl(idp + 'vw', '当前视口', 320, 1600, 390, 'px', 'vw')
    + '<p class="vp-caption" id="' + idp + 'calc"></p>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Live Preview</p>'
    + '<div class="clamp-stage"><p class="clamp-demo" id="' + idp + 'demo">Pro 再超前</p>'
    + '<p class="clamp-px" id="' + idp + 'px"></p></div></div></div></section>';
};

R.herobalance = function (b, sid, bi) {
  var idp = 'hb-' + sid + '-' + bi + '-';
  function sl(id, label, min, max, val, unit, attr) {
    return '<div class="lab-ctrl"><label for="' + id + '">' + label + '</label>'
      + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" value="' + val + '" data-hb="' + attr + '">'
      + '<output id="' + id + 'v">' + val + unit + '</output></div>';
  }
  return '<section class="block"><div class="kicker">Hero Balance</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="pg-grid">'
    + '<div class="pg-col"><p class="pg-col-label">Controls</p><div class="card lab">'
    + sl(idp + 'cw', '容器宽度', 640, 1200, 980, 'px', 'cw')
    + sl(idp + 'ss', '标语字号上限', 44, 96, 72, 'px', 'ss')
    + sl(idp + 'iw', '产品图宽度', 50, 100, 86, '%', 'iw')
    + sl(idp + 'pt', '顶部留白', 24, 160, 80, 'px', 'pt')
    + sl(idp + 'mt', '文字↔图片间距', 0, 96, 40, 'px', 'mt')
    + '<p class="vp-caption">自查：产品有力量感？负空间完整？标语不挤不飘？三问都过 = 构图成立。</p>'
    + '</div></div>'
    + '<div class="pg-col"><p class="pg-col-label">Live Hero（容器系统内）</p>'
    + '<div class="typo-preview" id="' + idp + 'prev" style="background:#000">'
    + '<div id="' + idp + 'container" style="max-width:980px;margin:0 auto;padding:80px 22px 0">'
    + '<p class="tp-name" style="font-size:19px;margin-bottom:6px">iPhone 18 Pro</p>'
    + '<p class="tp-slogan" style="font-size:72px;margin-bottom:16px">Pro 再超前</p>'
    + '<p class="tp-desc" style="font-size:13px;margin-bottom:10px">现仅可在线购买 · RMB 9999 起</p>'
    + '<span style="display:inline-block;background:#0071e3;color:#fff;font-size:13px;font-weight:600;padding:8px 20px;border-radius:99px;margin-bottom:40px">购买</span>'
    + '<img id="' + idp + 'img" src="assets/images/hero/product-studio.png" alt="构图实验" style="display:block;width:86%;max-width:100%;margin:0 0 0 auto">'
    + '</div></div></div></div></section>';
};

R.transfermedia = function (b, sid, bi) {
  var idp = 'tm-' + sid + '-' + bi + '-';
  var opts = [
    { key: 'messy', label: '素材 A', img: 'assets/images/hero/product-messy.png' },
    { key: 'plain', label: '素材 B', img: 'assets/images/hero/product-plain.png' },
    { key: 'studio', label: '素材 C', img: 'assets/images/hero/product-studio.png' }
  ];
  return '<section class="block"><div class="kicker">Transfer Challenge</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad">'
    + '<p class="cl-hint">第一决策 · 选主视觉（墨记 Recorder：一款 AI 录音硬件）：</p>'
    + '<div class="trio-grid">'
    + opts.map(function (o) {
      return '<button class="trio-card" data-action="tm-img" data-k="' + o.key + '"><span class="do-label">' + o.label + '</span><img src="' + o.img + '" alt="' + o.label + '候选素材" style="width:100%;display:block;border-radius:8px"></button>';
    }).join('')
    + '</div>'
    + '<div class="lab-why" id="' + idp + 'imgwhy"></div>'
    + '<p class="cl-hint" style="margin-top:18px">其余策略：</p>'
    + '<div class="lab-ctrl"><label>Desktop 裁切</label><select data-tm="crop" aria-label="Desktop 裁切"><option value="natural" selected>保持原生比例</option><option value="wide">强制 21:9 电影感裁切</option></select><output></output></div>'
    + '<div class="lab-ctrl"><label>Mobile 构图</label><select data-tm="mobile" aria-label="Mobile 构图"><option value="art" selected>换竖版构图（picture）</option><option value="same">同一张硬缩</option></select><output></output></div>'
    + '<div class="lab-ctrl"><label>文字位置</label><select data-tm="text" aria-label="文字位置"><option value="neg" selected>落在图片负空间</option><option value="on">压在产品上</option></select><output></output></div>'
    + '<div class="lab-ctrl"><label>alt 策略</label><select data-tm="alt" aria-label="alt 策略"><option value="desc" selected>具体描述产品与视角</option><option value="kw">堆关键词 InkNote AI 录音机最新旗舰</option></select><output></output></div>'
    + '<div class="lab-row" style="margin-top:14px"><button class="tool-btn primary" data-action="tm-reveal">揭示分析</button></div>'
    + '<div class="cause-box" id="' + idp + 'ana"></div>'
    + '</div></section>';
};

function renderHome() {
  var pct = Math.round(doneCount() / totalStages() * 100);
  var projA = DATA.projects[0];
  var readyA = projA.stages.filter(function (s) { return s.status === 'ready'; }).length;
  var totalA = projA.stages.length;
  var doneA = projA.stages.filter(function (s) { return isDone(s.id); }).length;
  var projB = DATA.projects[1];
  var readyB = projB.stages.filter(function (s) { return s.status === 'ready'; }).length;
  var totalB = projB.stages.length;
  var doneB = projB.stages.filter(function (s) { return isDone(s.id); }).length;
  return '<div class="block home-hero">'
    + '<div class="home-kicker">Interactive Learning Platform</div>'
    + '<h1>把 Apple 官网<br>变成你的前端教材。</h1>'
    + '<p class="sub">复刻 iPhone 18 Pro 与 iPhone Duo，训练拆解、实现、审美与原创设计能力。学习闭环全部在页面内完成——不需要打开任何 Markdown。</p>'
    + '<ul class="home-flow"><li>Learn</li><li>Try</li><li>Run</li><li>See</li><li>Think</li><li>Debug</li><li>Compare</li><li>Pass</li></ul>'
    + '<div class="home-cta-row"><button class="btn-primary" data-action="stage" data-id="stage-0">开始 Stage 0 · 页面解剖</button>'
    + '<button class="btn-ghost" data-action="stage" data-id="' + (firstUnfinished() ? firstUnfinished().stage.id : 'stage-0') + '">继续上次进度 →</button></div>'
    + '</div>'
    + R.route({})
    + '<div class="home-grid">'
    + '<div class="card pad"><div class="kicker">Course Build</div><h2 style="font-size:21px;margin:0 0 12px">课程建设状态</h2>'
    + '<div style="font-size:44px;font-weight:800;letter-spacing:-.02em">' + readyA + ' <span style="font-size:20px;color:var(--ink3);font-weight:700">/ ' + totalA + '</span></div>'
    + '<p style="color:var(--ink2);font-size:14px;margin:6px 0 14px">Project A · Lessons Ready（已制作并验证）</p>'
    + '<div class="bar" style="width:100%"><i style="width:' + Math.round(readyA / totalA * 100) + '%"></i></div>'
    + '<p style="font-size:12.5px;color:var(--ink3);margin-top:14px">课程就绪 ≠ 学习完成——下面那张卡才是你的真实进度。</p>'
    + '</div>'
    + '<div class="card pad"><div class="kicker">My Learning</div><h2 style="font-size:21px;margin:0 0 12px">我的学习进度</h2>'
    + '<div style="font-size:44px;font-weight:800;letter-spacing:-.02em">' + doneA + ' <span style="font-size:20px;color:var(--ink3);font-weight:700">/ ' + totalA + '</span></div>'
    + '<p style="color:var(--ink2);font-size:14px;margin:6px 0 14px">Project A · Completed（已标记学会）</p>'
    + '<div class="bar" style="width:100%"><i style="width:' + Math.round(doneA / totalA * 100) + '%"></i></div>'
    + '<p style="font-size:12.5px;color:var(--ink3);margin-top:14px">全课程总进度 ' + pct + '%（' + doneCount() + '/' + totalStages() + ' Stage）。保存在本机，可 Reset。</p>'
    + '</div></div>'
    + '<div class="home-grid" style="margin-top:16px"><div class="card pad"><div class="kicker">Course Build · Project B</div><h2 style="font-size:21px;margin:0 0 12px">课程建设状态</h2>'
    + '<div style="font-size:44px;font-weight:800;letter-spacing:-.02em">' + readyB + ' <span style="font-size:20px;color:var(--ink3);font-weight:700">/ ' + totalB + '</span></div>'
    + '<p style="color:var(--ink2);font-size:14px;margin:6px 0 14px">Project B · iPhone Duo · Assisted Mode（先预测、再揭示）</p>'
    + '<div class="bar" style="width:100%"><i style="width:' + Math.round(readyB / totalB * 100) + '%"></i></div>'
    + '<p style="font-size:12.5px;color:var(--ink3);margin-top:14px">Assisted ≠ Guided：提示更少，判断更多。忘了知识？用 Recall Card，不重学。</p>'
    + '</div>'
    + '<div class="card pad"><div class="kicker">My Learning · Project B</div><h2 style="font-size:21px;margin:0 0 12px">我的学习进度</h2>'
    + '<div style="font-size:44px;font-weight:800;letter-spacing:-.02em">' + doneB + ' <span style="font-size:20px;color:var(--ink3);font-weight:700">/ ' + totalB + '</span></div>'
    + '<p style="color:var(--ink2);font-size:14px;margin:6px 0 14px">Project B · Completed（已标记学会）</p>'
    + '<div class="bar" style="width:100%"><i style="width:' + Math.round(doneB / totalB * 100) + '%"></i></div>'
    + '<p style="font-size:12.5px;color:var(--ink3);margin-top:14px">与 Project A 进度完全隔离，互不影响。</p>'
    + '</div></div>'
    + '<div class="card pad" style="margin-top:16px"><div class="kicker">Final Exam</div>'
    + '<h2 style="font-size:21px;margin:0 0 12px">Blind Final Exam</h2>'
    + (examUnlocked()
      ? '<div style="font-size:28px;font-weight:800;color:#30d158">Unlocked</div><p style="color:var(--ink2);font-size:14px;margin:6px 0 10px">' + examProgress().done + '/' + examProgress().total + ' 完成——已解锁。</p><button class="btn-primary" data-action="exam">进入考试 →</button>'
      : '<div style="font-size:28px;font-weight:800;color:var(--ink3)">🔒 Locked</div><p style="color:var(--ink2);font-size:14px;margin:6px 0 10px">完成 ' + examProgress().total + ' Stage 后解锁。课程就绪 ≠ 学习完成。</p><button class="btn-ghost" disabled aria-disabled="true">🔒 Locked · ' + examProgress().done + '/' + examProgress().total + ' Completed</button>')
    + '<p style="font-size:12px;color:var(--ink3);margin-top:8px">Course Ready → Learn → Exam → Graduated</p>'
    + '</div>'
    + '<div class="home-grid" style="margin-top:16px"><div class="card pad"><div class="kicker">How to use</div><h2 style="font-size:21px;margin:0 0 12px">平台用法</h2>'
    + '<ul class="goal-list">'
    + '<li><span class="g-n">1</span><span>左侧目录选关；状态：○ 未开始 / ◐ 学习中 / ✓ 已完成</span></li>'
    + '<li><span class="g-n">2</span><span>Tag Lab 卡片逐页翻看，先自己想再对答案</span></li>'
    + '<li><span class="g-n">3</span><span>编辑器里改代码 → Run → 右侧实时看结果</span></li>'
    + '<li><span class="g-n">4</span><span>Challenge 检查 / Quiz 选择 / Checklist 勾选都会自动保存</span></li>'
    + '<li><span class="g-n">5</span><span>顶部搜索框可跳转任意知识点（如 viewport、flex、sticky）</span></li>'
    + '</ul></div>'
    + '<div class="card pad"><div class="kicker">Sources</div>'
    + '<h2 style="font-size:21px;margin:0 0 12px">内容源与素材</h2>'
    + '<p style="margin:0 0 10px;font-size:14px;color:var(--ink2)">Markdown 教案保留为<b>内容源与备份</b>，不是学习入口。课程素材 <code style="font-family:var(--mono)">assets/</code> 为原创占位素材；Apple 参考截图位于 <code style="font-family:var(--mono)">curriculum/reference/</code>。</p>'
    + '<p style="margin:0;font-size:14px;color:var(--ink2)">版权：一切 Apple 素材仅限本地学习与分析，不可发布；你的复刻页面同理。</p>'
    + '</div></div>';
}

/* ---------- Coming soon ---------- */
function renderComing(fl) {
  var st = fl.stage;
  return '<div class="block coming"><div class="big">🚧</div>'
    + '<h2>Stage ' + st.num + ' · ' + esc(st.title) + '</h2>'
    + '<p>这一关尚未制作。平台框架已就位，内容将按"V1 体验确认 → 逐关加入"的节奏推进。</p>'
    + '<p style="font-size:13.5px;color:var(--ink3)">建议先完成前面的关卡。</p>'
    + '<div class="plan"><h4>本关规划</h4><p style="margin:0">' + esc(st.plan || '') + '</p>'
    + (st.tags ? '<div class="tags">' + st.tags.map(function (t) { return '<code>' + esc(t) + '</code>'; }).join('') + '</div>' : '')
    + '</div>'
    + '<div style="margin-top:22px"><button class="btn-primary" data-action="home">返回首页</button></div></div>';
}

/* ---------- Blind Final Exam（独立 Final Assessment Route · v1.0.1 补实现） ---------- */
function examDef() { return window.EXAM_DATA || { brand: 'Vector Trail', sub: '', tagline: '', brief: [], users: [], environment: [], features: [], constraints: [], required: [], tech: [], deliverables: [], rationale: [], rubric: [], autoChecks: [], manualChecks: [], assets: [] }; }
/* v1.0.1（审查修复 P0）：考试 gate 只看 Project A 的 ready 关卡真实完成度——
   不用 doneCount()（它统计含 Project B/C coming 关的全课程数组，存在灌水解锁路径）。
   Course Availability 不参与解锁：coming 关永远不计入。 */
function examProgress() {
  var a = DATA.projects[0].stages, done = 0, total = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i].status === 'ready') { total++; if (isDone(a[i].id)) done++; }
  }
  return { done: done, total: total };
}
function examUnlocked() { var p = examProgress(); return p.total > 0 && p.done >= p.total; }

function renderExam() {
  var E = examDef();
  /* 路由层锁定：未解锁时无论从哪个入口进来（首页按钮 / 手输 #exam / 刷新），
     只输出锁定页——考题内容一个字都不出现。 */
  if (!examUnlocked()) {
    var p0 = examProgress();
    return '<div class="block coming"><div class="big">🔒</div>'
      + '<h2>Blind Final Exam</h2>'
      + '<p class="lead">Project A 毕业终审 · 独立 Final Assessment Route</p>'
      + '<div style="font-size:44px;font-weight:800;letter-spacing:-.02em;margin:18px 0 4px">' + p0.done + ' <span style="font-size:18px;color:var(--ink3)">/ ' + p0.total + '</span></div>'
      + '<p style="color:var(--ink2);font-size:14px">Your Learning Progress · 完成 Stage 0～14 全部"标记学会"后解锁</p>'
      + '<p style="font-size:12.5px;color:var(--ink3);margin-top:6px">课程就绪 ≠ 学习完成 · 解锁前考题不可见（直接输入 #exam 同样只看到本页）</p>'
      + '<div style="margin-top:22px"><button class="btn-primary" data-action="home">← Return to Learning</button></div></div>';
  }
  var ex = state.exam;
  var badge = function (on, txt, warn) { return '<span class="exam-badge' + (on ? ' on' : (warn ? ' warn' : '')) + '">' + txt + '</span>'; };
  var listHtml = function (arr) { return '<ul class="goal-list">' + arr.map(function (t) { return '<li><span class="g-n">·</span><span>' + esc(t) + '</span></li>'; }).join('') + '</ul>'; };
  var html = '';
  /* 1 · Exam Header + 状态徽章 */
  html += '<div class="block"><div class="kicker">Blind Final Exam · Project A Graduation Gate</div>'
    + '<h1 style="font-size:clamp(34px,6vw,56px);margin:0 0 2px">' + esc(E.brand) + '</h1>'
    + '<p style="font-size:16px;font-weight:600;color:var(--ink2);margin:0 0 8px">' + esc(E.sub) + '</p>'
    + '<p class="lead">' + esc(E.tagline) + '</p>'
    + '<div style="margin-top:14px">'
    + badge(ex.started, ex.started ? '✓ 已进入考试' : '未开始')
    + badge(ex.submitted, ex.submitted ? '✓ Work Prepared' : '作品未备妥', !ex.submitted)
    + badge(ex.reviewed, ex.reviewed ? '✓ Reviewed' : 'Awaiting Review', !ex.reviewed)
    + '</div>'
    + '<div class="exam-callout"><b>Graduation 路径：</b>' + examProgress().done + '/' + examProgress().total + ' Completed + Exam Submitted + Rubric Reviewed = Project A Graduated。Reviewed 必须由真实 reviewer 确认——当前版本没有教师系统，平台不会伪造 Graduated；提交后状态将停在 <b>Course Completed · Awaiting Review</b>。</div>'
    + '</div>';
  /* 2 · Product Brief */
  html += '<div class="block"><div class="card pad"><div class="kicker">Product Brief</div>'
    + E.brief.map(function (p) { return '<p style="font-size:15px;line-height:1.8;color:var(--ink2);margin:12px 0 0">' + esc(p) + '</p>'; }).join('')
    + '</div></div>';
  /* 3 · Users / Environment 双卡 */
  html += '<div class="exam-grid"><div class="card pad"><div class="kicker">Target Users</div>' + listHtml(E.users) + '</div>'
    + '<div class="card pad"><div class="kicker">Environment · 使用场景</div>' + listHtml(E.environment) + '</div></div>';
  /* 4 · Core Features */
  html += '<div class="block"><div class="card pad"><div class="kicker">Core Features</div>'
    + E.features.map(function (f) { return '<div style="padding:10px 0;border-bottom:1px solid var(--bg2)"><b>' + esc(f.name) + '</b> <span style="color:var(--ink3);font-size:12.5px">' + esc(f.cn) + '</span><p style="margin:4px 0 0;font-size:13.5px;color:var(--ink2)">' + esc(f.what) + '</p></div>'; }).join('')
    + '</div></div>';
  /* 5 · Constraints */
  html += '<div class="block"><div class="card pad"><div class="kicker">Design Constraints · 设计约束</div>'
    + '<ol style="margin:10px 0 0;padding-left:22px">' + E.constraints.map(function (c) { return '<li style="font-size:14px;line-height:1.8;color:var(--ink2);margin-bottom:6px">' + esc(c) + '</li>'; }).join('') + '</ol>'
    + '<div class="exam-callout"><b>约束不是答案。</b>高对比与户外可读性是硬约束——但具体的视觉方向、配色、排版与构图由你判断并给出理由。本页不提供、也不会确认任何"标准视觉答案"。</div>'
    + '</div></div>';
  /* 6 · Required Content */
  html += '<div class="block"><div class="card pad"><div class="kicker">Required Content · 内容要求</div>'
    + '<table class="exam-table"><thead><tr><th style="width:32%">模块</th><th>必须传达什么</th></tr></thead><tbody>'
    + E.required.map(function (r) { return '<tr><td><b>' + esc(r.item) + '</b></td><td>' + esc(r.note) + '</td></tr>'; }).join('')
    + '</tbody></table>'
    + '<p style="font-size:12.5px;color:var(--ink3);margin-top:12px">这是<b>内容覆盖要求，不是 DOM 顺序答案</b>——信息架构与模块组织由你决定。</p>'
    + '</div></div>';
  /* 7 · Assets */
  html += '<div class="block"><div class="card pad"><div class="kicker">Assets · 原创教具素材</div>'
    + '<p style="font-size:13.5px;color:var(--ink2);margin:8px 0 0">全部为课程原创矢量素材，可直接用于你的页面。它们不决定你的布局、构图与配色系统。</p>'
    + '<div class="exam-assets">'
    + E.assets.map(function (a) { return '<figure><img src="' + a.file + '" alt="' + esc(a.alt) + '" loading="lazy"><figcaption><code>' + esc(a.file.replace('assets/images/exam/', '')) + '</code></figcaption></figure>'; }).join('')
    + '</div></div></div>';
  /* 8 · Technical Requirements */
  html += '<div class="block"><div class="card pad"><div class="kicker">Technical Requirements</div>' + listHtml(E.tech) + '</div></div>';
  /* 9 · Deliverables */
  html += '<div class="block"><div class="card pad"><div class="kicker">Deliverables · 提交物（' + E.deliverables.length + ' 项）</div>'
    + '<ol style="margin:10px 0 0;padding-left:22px">' + E.deliverables.map(function (d) { return '<li style="font-size:14px;line-height:1.9;color:var(--ink2)">' + esc(d) + '</li>'; }).join('') + '</ol>'
    + '<div class="exam-callout">本课程是 <b>file:// 离线平台，没有服务器</b>——不存在也不应该有"上传"按钮。把项目文件（HTML / CSS / JS / 说明文档）整理进 <code>project/blind-exam/</code>，用下方 Export / Summary 生成提交材料，<b>交给你的 reviewer（老师 / AI）</b>。</div>'
    + '</div></div>';
  /* 10 · Design Rationale */
  html += '<div class="block"><div class="card pad"><div class="kicker">Design Rationale · 设计答辩（' + E.rationale.length + ' 问）</div>'
    + '<p style="font-size:13.5px;color:var(--ink2);margin:8px 0 0">每题写下你的决定与理由，随 Deliverables 一起提交。</p>'
    + E.rationale.slice(0, -1).map(function (q, i) { return '<details class="exam-details"><summary>Q' + (i + 1) + ' · ' + esc(q) + '</summary><p>你的回答：______（写进 Design Rationale 文档）</p></details>'; }).join('')
    + '<div class="exam-callout" style="border-left-color:#b25000"><b>Q' + E.rationale.length + ' · 必答核心题：</b>' + esc(E.rationale[E.rationale.length - 1]) + '——整场考试都在为回答它做准备。</div>'
    + '</div></div>';
  /* 11 · Rubric */
  html += '<div class="block"><div class="card pad"><div class="kicker">Rubric · ' + E.rubric.length + ' 维评审标准</div>'
    + '<p style="font-size:13px;color:var(--ink3);margin:8px 0 0">每维 0–3 分：<b>0</b> Needs Work · <b>1</b> Developing · <b>2</b> Solid · <b>3</b> Strong。Rubric 的作用是<b>发现能力短板</b>——不是总分决定毕业。</p>'
    + '<table class="exam-table"><thead><tr><th style="width:34%">维度</th><th>Reviewer 看什么</th></tr></thead><tbody>'
    + E.rubric.map(function (r, i) { return '<tr><td><b>' + (i + 1) + '. ' + esc(r.dim) + '</b></td><td>' + esc(r.focus) + '</td></tr>'; }).join('')
    + '</tbody></table>'
    + '<div class="exam-grid" style="margin-top:16px"><div class="card" style="padding:14px 16px"><div class="kicker">Auto Check（机器可查 · 学生自查）</div>' + listHtml(E.autoChecks) + '</div>'
    + '<div class="card" style="padding:14px 16px"><div class="kicker">Manual Review（人工评阅）</div>' + listHtml(E.manualChecks) + '</div></div>'
    + '<div class="exam-callout"><b>Auto Check ≠ Mastery。</b>自动检查只证明"基本盘没塌"；Typography / Composition / Design Reasoning 等维度在评审中显示 Manual Review，由人判断。</div>'
    + '</div></div>';
  /* 12 · Submission / Progress */
  html += '<div class="block"><div class="card pad"><div class="kicker">Submission · 提交与状态</div>'
    + '<div style="margin:12px 0;font-size:14.5px">当前状态：<b>' + (ex.submitted ? 'Work Prepared · Awaiting Review' : 'Not Prepared（未备妥）') + '</b>'
    + (ex.submitted ? ' · Course Completed（尚非 Graduated——reviewed 待真实 reviewer 确认）' : '') + '</div>'
    + '<div class="lab-row" style="margin-top:12px">'
    + '<button class="btn-primary" data-action="exam-submit">' + (ex.submitted ? '↺ 撤回"作品已备妥"标记' : '✓ 标记作品已备妥（Mark Work Prepared）') + '</button>'
    + '<button class="tool-btn" data-action="exam-export">↓ Export Submission Checklist (.md)</button>'
    + '<button class="tool-btn" data-action="exam-copy">Copy Submission Summary</button>'
    + '</div>'
    + '<p style="font-size:12.5px;color:var(--ink3);margin-top:14px">"已备妥"是你对自身完成度的真实确认，可随时撤回；Export / Copy 是纯本地操作——平台没有服务器，不会假装上传。</p>'
    + '</div></div>';
  return html;
}

function examSummaryText() {
  var E = examDef();
  var ex = state.exam;
  return 'Blind Final Exam · Submission Summary\n'
    + 'Product: ' + E.brand + ' — ' + E.sub + '\n'
    + 'Learning Progress: ' + doneCount() + '/15 Completed\n'
    + 'Work Prepared: ' + (ex.submitted ? 'yes' : 'no') + '\n'
    + 'Deliverables: ' + E.deliverables.length + ' 项（详见 Submission Checklist）\n'
    + 'Design Rationale: ' + E.rationale.length + ' 问\n'
    + 'Rubric: ' + E.rubric.length + ' 维（0-3）· Auto Check ≠ Mastery\n'
    + 'Note: 本文件为本地导出，随项目文件一起交给 reviewer。';
}

function examSubmissionMd() {
  var E = examDef();
  return ['# Blind Final Exam · Submission Checklist', '',
    '**' + E.brand + ' — ' + E.sub + '**', '',
    '> Learning Progress: ' + doneCount() + '/15 Completed · 导出于 ' + new Date().toLocaleString(), '',
    '## 1 · Deliverables（逐项勾选）', ''].concat(
    E.deliverables.map(function (d) { return '- [ ] ' + d; }),
    ['', '## 2 · Required Content（内容覆盖自查）', ''].concat(
    E.required.map(function (r) { return '- [ ] ' + r.item + ' — ' + r.note; })),
    ['', '## 3 · Technical Requirements', ''].concat(
    E.tech.map(function (t) { return '- [ ] ' + t; })),
    ['', '## 4 · Design Rationale（12 问）', ''].concat(
    E.rationale.map(function (q, i) { return (i + 1) + '. ' + q + '\n   > 你的回答：'; })),
    ['', '## 5 · Rubric（14 维 · 0-3 · 由 reviewer 填写）', '', '| # | 维度 | 看什么 | 分 |', '|---|---|---|---|'].concat(
    E.rubric.map(function (r, i) { return '| ' + (i + 1) + ' | ' + r.dim + ' | ' + r.focus + ' |  |'; })),
    ['', '### Auto Check（学生自查）', ''].concat(
    E.autoChecks.map(function (a) { return '- [ ] ' + a; })),
    ['', '### Manual Review（reviewer 填写 · Auto Check ≠ Mastery）', ''].concat(
    E.manualChecks.map(function (m) { return '- [ ] ' + m; })),
    ['', '---', '', '*本清单由学习平台本地导出（file:// 离线课程，无服务器上传）。随项目文件一起交给 reviewer。*', '']).join('\n');
}

/* ---------- Project B · Assisted Mode 渲染器（v2.0） ---------- */
/* 原则：AI 不先给答案——学生先 Predict → Decide → Build → Test → Explain，平台只做校准反馈。 */

/* Prediction：先选方案（允许"截图无法判断"）+ Confidence 三档 → 揭示 Observation + 校准反馈 */
R.prediction = function (b) {
  var saved = state.projB.predictions[b.id];
  var confLabel = { low: 'Low', medium: 'Medium', high: 'High' };
  var html = '<section class="block"><div class="kicker">Prediction · 先判断，再揭示</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.q + '</p>'
    + (b.img ? '<div class="apple-shot"><img src="' + b.img + '" alt="' + esc(b.imgAlt || '参考截图') + '"></div>' : '')
    + '<div class="card pad">'
    + '<div class="pred-opts" role="radiogroup" aria-label="' + esc(b.title) + '">'
    + b.options.map(function (o, i) {
      var sel = saved && saved.choice === i;
      return '<button class="pred-opt' + (sel ? ' sel' : '') + '" data-action="pred-pick" data-pred="' + b.id + '" data-i="' + i + '" aria-pressed="' + (sel ? 'true' : 'false') + '"><b>' + esc(o.k) + '</b><span>' + esc(o.t) + '</span></button>';
    }).join('')
    + '</div>'
    + '<p class="cl-hint" style="margin-top:14px">Confidence（诚实选择——揭示后会做校准对比）：</p>'
    + '<div class="conf-row" role="radiogroup" aria-label="Confidence">'
    + ['low', 'medium', 'high'].map(function (c) {
      var sel = saved && saved.conf === c;
      return '<button class="conf-btn' + (sel ? ' sel' : '') + '" data-action="conf-pick" data-pred="' + b.id + '" data-c="' + c + '" aria-pressed="' + (sel ? 'true' : 'false') + '">' + confLabel[c] + '</button>';
    }).join('')
    + '</div>'
    + '<div class="lab-row" style="margin-top:14px"><button class="tool-btn primary" data-action="pred-submit" data-pred="' + b.id + '">' + (saved && saved.revealed ? '↺ Revise after learning →' : '提交预测 → 揭示 Observation') + '</button></div>'
    + (saved && saved.revealed
      ? '<p style="font-size:12px;color:var(--ink3);margin:8px 0 0">First Prediction 已锁定（校准按它计算）——揭示后允许改判，记录为 belief update。</p>'
      : '')
    + '<div class="cause-box" id="pred-' + b.id + '-reveal">'
    + (saved && saved.revealed ? predRevealHtml(b, saved) : '')
    + '</div>'
    + '</div></section>';
  return html;
};
function predRevealHtml(b, saved) {
  /* 校准判词基于 First Prediction（revision 不参与——见 pred-submit） */
  var ok = saved.firstChoice === b.answer;
  var firstConf = saved.firstConf || saved.conf;
  var firstKey = saved.firstChoice;
  var verdict;
  if (ok && firstConf === 'high') verdict = '校准良好：高置信 + 正确。这条知识你已经能独立调用了。';
  else if (ok) verdict = '正确，但置信偏保守（' + firstConf + '）——观察证据后，同类判断可以更果断。';
  else if (firstConf === 'high') verdict = '高度自信，但证据与你的假设矛盾——这是本轮最有价值的校准点。';
  else verdict = '不正确（你选了 ' + (b.options[firstKey] ? b.options[firstKey].k : '—') + '）。低置信是诚实的——先观察，再下结论。';
  var rev = '';
  if (saved.revised) {
    rev = '<p class="pred-obs" style="border-top:1px dashed var(--bg3);padding-top:8px"><b>Belief Update：</b>看完证据后你改判为 <b>' + esc((b.options[saved.choice] || { k: '?' }).k) + '</b>。修正观点是能力——但记住第一次的直觉：下次先掂量证据再下注。</p>';
  }
  return '<p class="pred-verdict ' + (ok ? 'ok' : 'no') + '"><b>' + (ok ? '✓' : '✗') + '</b> ' + esc(verdict) + '</p>'
    + '<p class="pred-obs"><b>Observation：</b>' + b.observation + '</p>'
    + (b.infer ? '<p class="pred-obs"><b>Implementation Inference：</b>' + b.infer + '</p>' : '')
    + rev;
}

/* Recall Card：不重讲——压缩复盘 + 来源标注 + 可选跳转（用户主动点击） */
R.recall = function (b) {
  var opens = state.projB.recall[b.id] || 0;
  return '<section class="block"><details class="exam-details recall-card">'
    + '<summary data-action="recall-open" data-id="' + b.id + '">Need a refresher? → ' + esc(b.title) + '</summary>'
    + '<p class="recall-src">You learned this in: ' + esc(b.src) + (opens ? ' · 本卡已打开 ' + opens + ' 次' : '') + '</p>'
    + '<ul class="goal-list">' + b.points.map(function (p) { return '<li><span class="g-n">·</span><span>' + esc(p) + '</span></li>'; }).join('') + '</ul>'
    + (b.link ? '<div class="lab-row" style="margin-top:10px"><button class="tool-btn" data-action="stage" data-id="' + b.link + '">打开 ' + esc(b.src) + ' →</button></div>' : '')
    + '</details></section>';
};

/* Assisted Challenge：Outcome-based 判分 + 三级渐进 Help + gated Reference（使用情况计入 Independence） */
R.assisted = function (b, sid, bi) {
  var idp = 'ax-' + sid + '-' + bi + '-';
  return '<section class="block"><div class="kicker">Assisted Challenge · ' + esc(b.tag || 'Build & Test') + '</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.task + '</p>'
    + (b.export
      ? '<div class="exam-callout" style="margin:0 0 14px"><b>Independent Reconstruction Artifact</b> · 文件名 <code>' + esc(b.export.file) + '</code>——↑ 工具栏可随时 <b>Download / Copy 你的当前代码</b>（无论是否满分；导出的是你的作品，不是参考答案）。教学复刻 · 学生作品，非 Apple 官方页面。</div>'
      : '')
    + (b.brief ? '<div class="card pad"><p class="cl-hint">Requirements：</p><ul class="goal-list">'
      + b.brief.map(function (x) { return '<li><span class="g-n">·</span><span>' + esc(x) + '</span></li>'; }).join('') + '</ul></div>' : '')
    + '<div class="card pad">' + editorHtml(idp, b, 'assist') + '</div></section>';
};
function assistHints(idp, b, n) {
  var box = $('#' + idp + 'hints');
  box.classList.add('show');
  if (n > b.hints.length) n = b.hints.length;
  var labels = ['L1 · 方向', 'L2 · 缩小范围', 'L3 · 接近答案'];
  var html = '';
  for (var i = 0; i < n; i++) html += '<div class="hint-item">Help ' + (labels[i] || 'L' + (i + 1)) + ' · ' + esc(b.hints[i]) + '</div>';
  box.innerHTML = html;
}

/* Bug Journal：Symptom → Hypothesis → Root Cause → Fix → Verified（localStorage 持久化） */
R.bugjournal = function (b) {
  var entries = state.projB.bugjournal;
  var listHtml = entries.length
    ? entries.map(function (e, i) {
      return '<div class="bj-entry"><div class="bj-head"><b>' + esc(e.sym.slice(0, 46)) + '</b><span class="bj-meta">' + esc(e.stage || '') + ' · ' + esc(e.ts) + '</span>'
        + '<button class="tool-btn small" data-action="bj-del" data-i="' + i + '" aria-label="删除这条记录">删除</button></div>'
        + '<p><b>Hypothesis：</b>' + esc(e.hyp || '—') + '</p>'
        + '<p><b>Root Cause：</b>' + esc(e.cause || '—') + '</p>'
        + '<p><b>Fix：</b>' + esc(e.fix || '—') + '</p>'
        + '<p><b>Verified：</b>' + esc(e.verify || '—') + '</p></div>';
    }).join('')
    : '<p style="font-size:13px;color:var(--ink3)">还没有记录。每次真实 Debug 后记一条——方法比结论值钱。</p>';
  return '<section class="block"><div class="kicker">Bug Journal · 你的 Debug 方法</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad">'
    + '<p class="cl-hint">新记录（刚才修的那只 Bug）：</p>'
    + '<div class="bj-form">'
    + '<label>Symptom 症状<textarea class="bj-in" id="bj-sym" rows="2" placeholder="表面现象，不猜原因"></textarea></label>'
    + '<label>Hypothesis 假设<textarea class="bj-in" id="bj-hyp" rows="2" placeholder="你怀疑是什么？怎么验证的？"></textarea></label>'
    + '<label>Root Cause 根因<textarea class="bj-in" id="bj-cause" rows="2" placeholder="真正的原因是什么？"></textarea></label>'
    + '<label>Fix 修复<textarea class="bj-in" id="bj-fix" rows="2" placeholder="改了什么？"></textarea></label>'
    + '<label>How I verified 怎么确认的<textarea class="bj-in" id="bj-verify" rows="2" placeholder="复现→修复→再验证的路径"></textarea></label>'
    + '</div>'
    + '<div class="lab-row" style="margin-top:10px"><button class="tool-btn primary" data-action="bj-add">记录这条 Bug</button></div>'
    + '<div style="margin-top:18px">' + listHtml + '</div>'
    + '</div></section>';
};

/* Reasoning：自评 Checklist + Reference Considerations（不自动打分） */
R.reasoning = function (b) {
  var saved = state.projB.reasoning[b.id] || [];
  return '<section class="block"><div class="kicker">Explain Your Choice</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad"><div class="reason-checklist">'
    + b.checks.map(function (c, i) {
      return '<label><input type="checkbox" data-action="reason-check" data-id="' + b.id + '" data-i="' + i + '"' + (saved[i] ? ' checked' : '') + '> ' + esc(c) + '</label>';
    }).join('')
    + '</div>'
    + '<div class="lab-row" style="margin-top:12px"><button class="tool-btn" data-action="reason-why" data-target="rc-' + b.id + '">Reference Considerations</button></div>'
    + '<div class="cause-box" id="rc-' + b.id + '"></div>'
    + '</div></section>';
};

/* Independence Indicators：按使用过的帮助档位汇总（不羞辱，只定位） */
var PRED_IDX = null;
function predAnswerOf(id) {
  if (!PRED_IDX) {
    PRED_IDX = {};
    DATA.projects.forEach(function (pr) {
      (pr.stages || []).forEach(function (st) {
        (st.blocks || []).forEach(function (bl) { if (bl.type === 'prediction') PRED_IDX[bl.id] = bl.answer; });
      });
    });
  }
  return PRED_IDX[id];
}
function predBlockOf(id) {
  var out = null;
  DATA.projects.forEach(function (pr) {
    (pr.stages || []).forEach(function (st) {
      (st.blocks || []).forEach(function (bl) { if (bl.type === 'prediction' && bl.id === id) out = bl; });
    });
  });
  return out;
}
function reasonBlockOf(id) {
  var out = null;
  DATA.projects.forEach(function (pr) {
    (pr.stages || []).forEach(function (st) {
      (st.blocks || []).forEach(function (bl) { if (bl.type === 'reasoning' && bl.id === id) out = bl; });
    });
  });
  return out;
}
R.independence = function (b) {
  /* v2.0.1 审计修复 P1-1：七态模型，区分 History 与 Current/Best Clean Solve。
     Current（last）= 最近一次通过用了几级帮助；History（maxHelp/refEver）永远保留——
     学生第一次 L3、第二次零帮助 → 显示 Independent（曾用 L3），进步可见、不被永久污名化。 */
  function ind(chId) {
    var pb = state.projB;
    var s = (pb.solves || {})[chId];
    var refEver = !!pb.refs[chId];
    if (s) {
      if (s.last === 0) {
        var hist = refEver || s.refEver ? ' Reference' : (s.maxHelp > 0 ? ' L' + s.maxHelp + ' 帮助' : '');
        return ['✓ Independent' + (hist ? '（曾用' + hist + '）' : ''), 'ind-s'];
      }
      if (s.last === 1) return ['Solved with L1', 'ind-s'];
      if (s.last === 2) return ['Solved with L2', 'ind-a'];
      return ['Solved with L3 · Needs Review', 'ind-r'];
    }
    if (refEver) return ['Used Reference（尚未独立通过）', 'ind-c'];
    if ((pb.attempts || {})[chId]) return ['Attempted · 未通过', 'ind-n'];
    return ['Not Attempted', 'ind-n'];
  }
  var preds = state.projB.predictions, keys = Object.keys(preds);
  var submitted = keys.length, highOk = 0, overconf = 0;
  keys.forEach(function (k) {
    var p = preds[k];
    if (!p || !p.revealed) { submitted--; return; }
    /* 校准统计按 First Prediction（揭示后改判不计入——防洗白，P2-6） */
    var firstIdx = typeof p.firstChoice === 'number' ? p.firstChoice : p.choice;
    var firstConf = p.firstConf || p.conf;
    var ok = firstIdx === predAnswerOf(k);
    if (ok && firstConf === 'high') highOk++;
    if (!ok && firstConf === 'high') overconf++;
  });
  return '<section class="block"><div class="kicker">Independence Indicators · 独立调用能力图谱</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="card pad"><table class="exam-table"><thead><tr><th>能力区</th><th>依据</th><th>当前指标</th></tr></thead><tbody>'
    + b.areas.map(function (a) {
      var v = ind(a.challenge);
      return '<tr><td><b>' + esc(a.name) + '</b></td><td style="font-size:12px;color:var(--ink3)">' + esc(a.from) + '</td><td><span class="ind-badge ' + v[1] + '">' + v[0] + '</span></td></tr>';
    }).join('')
    + '</tbody></table>'
    + '<p style="font-size:12.5px;color:var(--ink3);margin-top:12px">Prediction 校准：已提交 ' + submitted + ' 个 · 高置信正确 ' + highOk + ' 个 · 过度自信 ' + overconf + ' 个。目标不是全绿，是知道哪些知识能独立调用、哪些需要回顾。</p>'
    + '</div></section>';
};

/* Observe 图廊：多状态参考图并排（同构图，便于状态对比） */
R.gallery = function (b) {
  return '<section class="block"><div class="kicker">' + esc(b.kicker || 'Observe') + '</div><h2>' + esc(b.title) + '</h2>'
    + '<p class="lead">' + b.lead + '</p>'
    + '<div class="gallery-row">'
    + b.images.map(function (im) {
      return '<figure class="gallery-item"><img src="' + im.src + '" alt="' + esc(im.alt) + '" loading="lazy"><figcaption><b>' + esc(im.name) + '</b>' + (im.note ? '<span>' + esc(im.note) + '</span>' : '') + '</figcaption></figure>';
    }).join('')
    + '</div></section>';
};

/* ---------- 舞台渲染 ---------- */
function renderStage(id) {
  var fl = getStage(id);
  var view = $('#stageView');
  state.current = id || 'home';
  save();

  if (id === 'exam') {
    if (!state.exam) state.exam = { started: false, submitted: false, reviewed: false };
    if (examUnlocked() && !state.exam.started) { state.exam.started = true; save(); }
    view.innerHTML = renderExam();
    view.dataset.mode = 'exam';
    renderSidebar();
    $('#crumbs').innerHTML = '<span class="c-stage">Blind Final Exam</span>';
    $('#pager').innerHTML = '<span></span><div class="pg-info"></div><span></span>';
    window.scrollTo({ top: 0 });
    /* 焦点管理与切关一致（v1.0.1 审查修复：exam 路由此前跳过了共享尾部的 focus） */
    try { view.focus({ preventScroll: true }); } catch (e) {}
    return;
  }
  if (!fl) {
    view.innerHTML = renderHome();
    view.dataset.mode = 'home';
  } else if (fl.stage.status === 'coming') {
    view.innerHTML = renderComing(fl);
    view.dataset.mode = 'coming';
  } else {
    var html = '';
    var fu = firstUnfinished();
    if (fu && flatOf(id) > flatOf(fu.stage.id)) {
      html += '<div class="advice">建议先完成 Stage ' + fu.stage.num + '（' + esc(fu.stage.title) + '）—— 但你可以自由跳转，学习路径不锁死。</div>';
    }
    var sid = fl.stage.id;
    fl.stage.blocks.forEach(function (b, bi) {
      var fn = R[b.type];
      if (!fn) return;
      html += '<div id="blk-' + sid + '-' + bi + '">' + fn(b, sid, bi) + '</div>';
    });
    view.innerHTML = html;
    view.dataset.mode = 'stage';
    initInteractives(sid);
  }
  renderSidebar();
  renderTopbar();
  renderPager();
  window.scrollTo({ top: 0 });
  /* 焦点管理：切关后焦点移至内容区（tabindex=-1 + outline:none，不影响视觉） */
  try { view.focus({ preventScroll: true }); } catch (e) {}
}

/* ---------- 交互初始化（编辑器 / iframe） ---------- */
var RUN_SEQ = 0;
function challengeMode(idp) {
  var b = findBlockByIdp(idp);
  return b && b.script ? 'both' : 'same';
}
function runFrame(frame, code, mode, force) {
  try {
    frame.setAttribute('sandbox', mode === 'same' ? 'allow-same-origin' : (mode === 'both' ? 'allow-scripts allow-same-origin' : ''));
    if (mode) frame.setAttribute('allow', 'autoplay');
    frame._runToken = ++RUN_SEQ;
    if (frame.getAttribute('srcdoc') === code && !force) {
      /* 内容没变：DOM 已是最新，直接视为已加载 */
      frame._loadedToken = frame._runToken;
      return;
    }
    if (force) code = code + '<!--reload' + RUN_SEQ + '-->';
    if (frame._onload) frame.removeEventListener('load', frame._onload);
    frame._onload = function () { frame._loadedToken = frame._runToken; };
    frame.addEventListener('load', frame._onload);
    frame.srcdoc = code;
  } catch (e) {}
}
/* srcdoc 异步加载：判分前必须等 DOM 真正渲染完成 */
function whenFrameLoaded(frame, cb) {
  if (frame._runToken === frame._loadedToken) { cb(); return; }
  var done = false;
  function finish() {
    if (done) return;
    done = true;
    frame.removeEventListener('load', h);
    clearTimeout(to);
    cb();
  }
  var to = setTimeout(finish, 2500);
  var h = function () { finish(); };
  frame.addEventListener('load', h);
}

function initInteractives(sid) {
  /* bodybg labs：按当前激活按钮设置初始背景 */
  $all('#stageView [data-action="lab-bg"].active').forEach(function (btn) {
    var lab = btn.closest('.lab');
    var frame = $('iframe', lab);
    if (frame) setBgDoc(lab, btn.dataset.val);
  });
  /* viewport labs：按当前激活按钮渲染初始文档 */
  $all('#stageView [data-action="lab-vp"].active').forEach(function (btn) {
    var block = btn.closest('.card');
    var frame = $('iframe', block);
    if (frame) setVpDoc(frame, btn.dataset.val);
  });
  /* title labs：初始化代码行显示 */
  $all('#stageView input[type="text"]').forEach(function (inp) {
    if (inp.id.indexOf('lab-' + sid + '-') === 0) updateTitleLab(inp);
  });
  /* challenge / debug：自动运行起始代码（allow-same-origin 以便读取渲染 DOM 判分） */
  $all('#stageView textarea.editor').forEach(function (ta) {
    var frame = $('#' + ta.id.replace('code', 'frame'));
    if (frame) runFrame(frame, ta.value, challengeMode(ta.id.replace('code', '')));
  });
  /* Stage 3 迷你页面 iframe（hreflab / focuslab / kbdtest） */
  $all('#stageView iframe[id$="-frame"], #stageView iframe[id$="-bad"], #stageView iframe[id$="-good"]').forEach(function (f) {
    var src = (window.__mini || {})[f.id];
    if (src) runFrame(f, src, 'both');
  });
  /* 实验室初始状态同步 */
  $all('#stageView .pg-grid').forEach(function (grid) {
    if ($('input[id^="tp-"]', grid)) applyTypo(grid);
    else if ($('input[id^="sp-"]', grid)) applySpace(grid);
    else if ($('[data-tf]', grid)) applyTransfer(grid);
    else if ($('select[data-cta-sel]', grid)) applyCtaLab(grid);
    else if ($('[data-tc]', grid)) applyTransferCta(grid);
  });
  $all('#stageView input[data-tl="dur"]').forEach(function (inp) {
    updateTransitionRead(inp.closest('.pg-grid'));
  });
  /* Stage 5：Container / Clamp / HeroBalance 初始读数 */
  $all('#stageView input[data-cw="w"]').forEach(function (inp) { applyContainer(inp.closest('.card')); });
  $all('#stageView input[data-cl]').forEach(function (inp) { applyClamp(inp.closest('.pg-grid') || inp.closest('.card')); });
  $all('#stageView input[data-hb]').forEach(function (inp) { applyHeroBalance(inp.closest('.pg-grid')); });
  /* Stage 14：Simulator 迷你页 */
  var simDoc = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>'
    + '*{box-sizing:border-box}body{margin:0;background:#000;color:#f5f5f7;font-family:-apple-system,"PingFang SC",sans-serif}'
    + '.nav{height:44px;background:#161617;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:12px}'
    + '.nav span{color:rgba(255,255,255,.8)}'
    + '.hero{padding:64px 22px;text-align:left}'
    + '.hero h1{margin:0 0 6px;font-size:20px;font-weight:600;color:#a1a1a6}'
    + '.hero h2{margin:0 0 14px;font-size:clamp(30px,6vw,56px);font-weight:600;line-height:1.1}'
    + '.hero p{margin:0 0 18px;font-size:13px;color:#86868b}'
    + '.buy{display:inline-block;background:#0071e3;color:#fff;font-size:13px;font-weight:600;padding:8px 20px;border-radius:99px;text-decoration:none}'
    + '.mods{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;padding:24px 22px}'
    + '.mod{background:#1d1d1f;border-radius:14px;padding:18px}'
    + '.mod h3{margin:0 0 6px;font-size:15px}'
    + '.mod p{margin:0;font-size:12px;color:#86868b;line-height:1.6}'
    + '.two{display:flex;gap:24px;align-items:center;padding:40px 22px}'
    + '.two .copy{flex:1}.two .vis{flex:1}'
    + '.two img{display:block;width:100%;height:auto;border-radius:10px}'
    + 'footer{border-top:1px solid #2c2c31;margin-top:30px;padding:26px 22px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}'
    + 'footer h4{margin:0 0 6px;font-size:12px}footer p{margin:0;font-size:11px;color:#86868b;line-height:1.9}'
    + '@media (max-width:734px){.mods{grid-template-columns:1fr}.two{flex-direction:column}.two .vis{order:-1}footer{grid-template-columns:1fr 1fr}}'
    + '</style></head><body>'
    + '<div class="nav"><span>Apple</span><span>商店</span><span>Mac</span><span>iPhone</span><span>支持</span></div>'
    + '<div class="hero"><h1>iPhone 18 Pro</h1><h2>Pro 再超前</h2><p>现仅可在线购买 · RMB 9999 起</p><a class="buy" href="#">购买</a></div>'
    + '<div class="mods">'
    + '<div class="mod"><h3>摄像头</h3><p>4800 万像素融合式主摄。</p></div>'
    + '<div class="mod"><h3>A20 Pro</h3><p>2 纳米制程，性能翻倍。</p></div>'
    + '<div class="mod"><h3>四色外观</h3><p>酒红 / 冰川蓝 / 银 / 黑。</p></div>'
    + '<div class="mod"><h3>电池</h3><p>视频播放最长 43 小时。</p></div>'
    + '</div>'
    + '<div class="two"><div class="copy"><h3 style="margin:0 0 6px;font-size:22px">2 纳米芯旗舰</h3><p style="margin:0;font-size:13px;color:#86868b;line-height:1.6">A20 Pro 采用 2 纳米制程，性能和能效均创 iPhone 新高。</p></div><div class="vis"><img src="assets/images/hero/product-studio.png" alt="性能模块视觉"></div></div>'
    + '<footer><div><h4>选购</h4><p>iPhone · Mac · 配件</p></div><div><h4>服务</h4><p>AppleCare · 分期</p></div><div><h4>价值观</h4><p>环境 · 隐私 · 无障碍</p></div></footer>'
    + '</body></html>';
  window.__mini = window.__mini || {};
  $all('#stageView iframe[id^="rs-"]').forEach(function (f) {
    window.__mini[f.id] = simDoc;
    runFrame(f, simDoc, 'same');
    f.style.width = '390px';
  });
  /* Stage 14：Final Assembly iframe */
  $all('#stageView iframe[id="finalPreview"]').forEach(function (f) {
    runFrame(f, window.FINAL_PAGE_HTML || '', 'same');
  });
  /* Stage 12：IO Visualizer 初始 */
  $all('#stageView .io-wrap').forEach(function (w3) { initIoViz(w3.closest('.card')); });
  /* Stage 10：Grid Playground 初始读数 */
  $all('#stageView .gp-cards').forEach(function (g2) { applyGrid(g2.closest('.card')); });
  /* Stage 7：sticky 初始读数 */
  $all('#stageView .sk-scroll').forEach(function (b3) { updateSticky(b3.closest('.pg-grid')); });
  /* Stage 6：Flex Playground 初始状态 */
  $all('#stageView .fx-boxes').forEach(function (b2) { applyFlex(b2.closest('.card')); });
  /* Stage 4：Art Direction 初始布局（默认 390 + 同图硬缩） */
  $all('#stageView .ad-frame').forEach(function (f) {
    applyArtDir(f.closest('.card'));
  });
  /* Stage 2 实验室：初始状态同步（输出值 / 比例读数 / 迁移预览） */
  $all('#stageView .pg-grid').forEach(function (grid) {
    if ($('input[id^="tp-"]', grid)) applyTypo(grid);
    else if ($('input[id^="sp-"]', grid)) applySpace(grid);
    else if ($('[data-tf]', grid)) applyTransfer(grid);
  });
}

function setBgDoc(lab, bg) {
  var frame = $('iframe', lab);
  var doc = buildDoc('<h1 style="margin:0 0 6px;font-size:26px">iPhone 18 Pro</h1><p style="margin:0;font-size:15px">Pro 再超前</p>',
    'body{margin:0;min-height:230px;display:flex;flex-direction:column;justify-content:center;padding:24px;background:' + bg + ';color:#f5f5f7;font-family:-apple-system,"PingFang SC",sans-serif;transition:background .4s}');
  runFrame(frame, doc);
}
function setVpDoc(frame, val) {
  var src = (window.__vp || {})[frame.id] || '';
  var meta = val === 'on' ? '<meta name="viewport" content="width=device-width, initial-scale=1">' : '';
  var inner = val === 'on' ? src : '<div style="width:980px;transform:scale(0.255);transform-origin:top left">' + src + '</div>';
  runFrame(frame, '<!DOCTYPE html><html lang="zh-CN"><head>' + meta + '</head><body style="margin:0;background:#fff">' + inner + '</body></html>');
}
function updateTitleLab(inp) {
  var idp = inp.id.replace('input', '');
  var v = inp.value || '（空）';
  $('#' + idp + 'tab').textContent = v;
  $('#' + idp + 'code').innerHTML = hl('<title>' + v + '</title>');
}

/* ---------- Stage 2 实验室辅助 ---------- */
function blockFromEl(el) {
  var wrap = el.closest('[id^="blk-"]');
  if (!wrap) return null;
  var m = wrap.id.match(/^blk-([a-z0-9-]+)-(\d+)$/);
  var fl = getStage(m[1]);
  if (!fl) return null;
  return { sid: m[1], bi: +m[2], b: fl.stage.blocks[+m[2]] };
}
function setSlider(card, suf, val) {
  var inp = $('[id$="-' + suf + '"]', card);
  if (!inp) return;
  inp.value = val;
  var out = $('#' + inp.id + 'v');
  if (out) out.textContent = val + (suf === 'lh' ? '%' : 'px');
}
function applyTypo(grid) {
  if (!grid) return;
  var g = function (suf) { return $('[id$="-' + suf + '"]', grid); };
  var prev = g('prev');
  var name = g('name'), slogan = g('slogan'), weight = g('weight'), lh = g('lh'), ls = g('ls'), align = g('align'), pad = g('pad');
  if (!prev || !name) return;
  var ns = +name.value, ss = +slogan.value;
  g('pname').style.fontSize = ns + 'px';
  var sl = g('pslogan');
  sl.style.fontSize = ss + 'px';
  if (weight) sl.style.fontWeight = weight.value;
  if (lh) sl.style.lineHeight = (+lh.value / 100);
  if (ls) sl.style.letterSpacing = ls.value + 'px';
  if (align) prev.style.textAlign = align.value;
  if (pad) prev.style.padding = pad.value + 'px 40px';
  ['name', 'slogan', 'lh', 'ls', 'pad'].forEach(function (suf) {
    var inp = g(suf);
    var out = $('#' + inp.id + 'v');
    if (out) out.textContent = inp.value + (suf === 'lh' ? '%' : 'px');
  });
  var ratio = g('ratio');
  if (ratio) {
    var r = ss / ns;
    ratio.innerHTML = '标语 / 产品名 = <b>' + r.toFixed(1) + ' 倍</b>'
      + (r >= 2 ? ' —— 跳跃足够，层级清楚（P04）' : ' —— 差距太小，层级开始模糊');
  }
}
function applySpace(grid) {
  if (!grid) return;
  var g = function (suf) { return $('[id$="-' + suf + '"]', grid); };
  var prev = g('prev');
  var pad = g('pad'), g1 = g('g1'), g2 = g('g2'), px = g('px');
  if (!prev || !pad) return;
  prev.style.padding = pad.value + 'px ' + (px ? px.value : 40) + 'px';
  var pn = prev.querySelector('.tp-name');
  var ps = prev.querySelector('.tp-slogan');
  if (pn && g1) pn.style.marginBottom = g1.value + 'px';
  if (ps && g2) ps.style.marginBottom = g2.value + 'px';
  ['pad', 'g1', 'g2', 'px'].forEach(function (suf) {
    var inp = g(suf);
    var out = $('#' + inp.id + 'v');
    if (out) out.textContent = inp.value + 'px';
  });
}
function applyTransfer(grid) {
  if (!grid) return;
  var g = function (suf) { return $('[data-tf="' + suf + '"]', grid); };
  var prev = $('[id$="-prev"]', grid);
  if (!prev || !g('name')) return;
  var pn = prev.querySelector('.tp-name'), ps = prev.querySelector('.tp-slogan'), pd = prev.querySelector('.tp-desc');
  pn.textContent = g('name').value || '产品名';
  ps.textContent = g('slogan').value || '主标语';
  pd.textContent = g('desc').value || '';
  if (g('scale').value === 'jump') { pn.style.fontSize = '32px'; ps.style.fontSize = '84px'; }
  else { pn.style.fontSize = '40px'; ps.style.fontSize = '48px'; }
  prev.style.textAlign = g('align').value;
  if (g('theme').value === 'dark') {
    prev.style.background = '#000';
    pn.style.color = '#a1a1a6'; ps.style.color = '#f5f5f7'; pd.style.color = '#86868b';
  } else {
    prev.style.background = '#f5f5f7';
    pn.style.color = '#86868b'; ps.style.color = '#1d1d1f'; pd.style.color = '#6e6e73';
  }
  var vMap = { large: ['110px', '44px', '26px'], medium: ['72px', '36px', '18px'], small: ['32px', '20px', '8px'] };
  var v = vMap[g('space').value];
  prev.style.padding = v[0] + ' ' + v[1];
  ps.style.marginBottom = v[2];
  $all('select[data-tf]', grid).forEach(function (sel) {
    if (sel.nextElementSibling && sel.nextElementSibling.tagName === 'OUTPUT') {
      sel.nextElementSibling.textContent = sel.options[sel.selectedIndex].text;
    }
  });
}

/* ---------- Stage 3 实验室辅助 ---------- */
function ctaHtml(text, style) {
  return '<span class="cta-' + style + '">' + esc(text) + '</span>';
}
function applyCtaLab(grid) {
  if (!grid) return;
  var rowEl = $('[id$="-row"]', grid);
  if (!rowEl) return;
  var texts = ['购买', '进一步了解', '查看规格'];
  var out = [];
  $all('select[data-cta-sel]', grid).forEach(function (s) {
    var i = +s.dataset.ctaSel;
    if (s.nextElementSibling && s.nextElementSibling.tagName === 'OUTPUT') {
      s.nextElementSibling.textContent = s.options[s.selectedIndex].text;
    }
    out.push(ctaHtml(texts[i], s.value));
  });
  rowEl.innerHTML = out.join('');
}
function diagnoseCta(grid, diagEl) {
  var picks = $all('select[data-cta-sel]', grid).map(function (s) { return s.value; });
  var filled = picks.filter(function (p) { return p === 'filled'; }).length;
  var msg;
  if (filled === 0) msg = '⚠️ 没有 Primary：用户不知道此刻该做什么。至少给一个动作 filled（通常是"购买"）。';
  else if (filled > 1) msg = '⚠️ 出现了 ' + filled + ' 个 Filled 主按钮——多个 Primary 抢注意力 = 没有行动层级（P05/P10）。把次级动作降级为 outline 或 text link。';
  else msg = '✓ 一个 Primary，其余降级——层级正确。现在问自己：filled 给了"最重要"的那个动作吗？';
  diagEl.innerHTML = '<b>层级诊断：</b>' + msg;
  diagEl.classList.add('show');
}
function appleCta(grid, diagEl, whyEl) {
  var sels = $all('select[data-cta-sel]', grid);
  var want = ['filled', 'text', 'text'];
  sels.forEach(function (s, i) { s.value = want[i]; });
  applyCtaLab(grid);
  diagEl.innerHTML = '<b>Apple 的分配：</b>购买 = filled（唯一 Primary）；进一步了解 / 查看规格 = text link。注意：进一步了解也可以是 outline（次级强调）——但 filled 永远只有一个。';
  diagEl.classList.add('show');
  whyEl.className = 'lab-why show ok';
  whyEl.innerHTML = '✓ 设计 = 分配注意力。样式回答的不是"哪个好看"，而是"用户此刻该做什么"。';
}
function applyTransferCta(grid) {
  if (!grid) return;
  var g = function (k) { return $('[data-tc="' + k + '"]', grid); };
  var rowEl = $('[id$="-row"]', grid);
  if (!rowEl || !g('ptext')) return;
  $all('select[data-tc]', grid).forEach(function (s) {
    if (s.nextElementSibling && s.nextElementSibling.tagName === 'OUTPUT') {
      s.nextElementSibling.textContent = s.options[s.selectedIndex].text.split('（')[0];
    }
  });
  var p = ctaHtml(g('ptext').value || '开始使用', g('pstyle').value).replace('cta-', 'cta-');
  var s2 = ctaHtml(g('stext').value || '了解更多', g('sstyle').value);
  rowEl.innerHTML = p + s2;
}
function updateTransitionRead(grid) {
  var dur = $('input[data-tl="dur"]', grid);
  var out = $('[id$="-read"]', grid);
  var outV = $('[id$="durv"]', grid);
  if (!dur || !out) return;
  var v = +dur.value;
  if (outV) outV.textContent = v + 'ms';
  var cta = $('[id$="-cta"]', grid);
  if (cta) cta.style.transitionDuration = v + 'ms';
  var verdict;
  if (v === 0) verdict = '0ms：变化瞬间发生——生硬，像切换了另一个按钮。';
  else if (v <= 100) verdict = v + 'ms：干脆利落，适合极小的变化。';
  else if (v <= 300) verdict = v + 'ms：自然的区间（150~250ms 是微交互的常用地带）。';
  else if (v <= 600) verdict = v + 'ms：开始有点慢——大一点的界面变化可以接受。';
  else verdict = v + 'ms：拖沓。用户在等按钮"醒过来"，反馈变成了障碍。';
  out.innerHTML = '<b>' + verdict + '</b>（不是绝对标准——训练的是节奏判断。）';
}

/* ---------- Stage 4 实验室辅助 ---------- */
function applyArtDir(scopeCard) {
  var frame = $('.ad-frame', scopeCard);
  if (!frame) return;
  var w = +frame.dataset.w;
  var mode = frame.dataset.mode;
  var img = $('img', frame);
  var outer = frame.parentElement;
  var maxW = outer.clientWidth - 4;
  var scale = Math.min(1, maxW / w);
  var aspect = w >= 900 ? 675 / 1200 : (w >= 700 ? 0.72 : 1.3333);
  var innerH = Math.round(w * aspect);
  frame.style.width = w + 'px';
  frame.style.transform = 'scale(' + scale + ')';
  frame.style.height = innerH + 'px';
  outer.style.height = Math.round(innerH * scale) + 'px';
  /* 方案 B 模拟 picture 的选择逻辑；真实行为见 Responsive Image Lab */
  img.src = (mode === 'art' && w <= 734) ? 'assets/images/hero/product-mobile.png' : 'assets/images/hero/product-desktop.png';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = mode === 'art' ? 'cover' : 'fill';
  var read = $('[id$="-read"]', scopeCard);
  if (read) {
    read.innerHTML = '视口 <b>' + w + 'px</b> · 方案 ' + (mode === 'art' ? 'B' : 'A')
      + ' · 使用 <b>' + img.src.split('/').pop() + '</b> · '
      + (w <= 734
        ? (mode === 'art' ? '竖版构图：产品保住大小，负空间转移到上方——文字有处可落（P15）。' : '横图硬缩：产品变得很小，负空间失去意义——这就是问题本身。')
        : '宽屏：横构图正确，两种方案一致。');
  }
}
function updateDensity(card) {
  var dprBtn = $('button.active[data-action="dn-dpr"]', card);
  var dpr = dprBtn ? +dprBtn.dataset.dpr : 1;
  var img = $('img[id$="-img"]', card);
  var need = $('[id$="-need"]', card);
  var pick = $('[id$="-pick"]', card);
  var srcLabel = $('[id$="-src"]', card);
  if (need) need.innerHTML = '显示 300px × DPR ' + dpr + ' = 需要 <b>' + (300 * dpr) + 'px</b> 的图片像素';
  if (img) {
    img.src = dpr === 2 ? 'assets/images/hero/product-studio.png' : 'assets/images/hero/product-300.png';
    if (srcLabel) srcLabel.textContent = dpr === 2 ? '2x 图（1200px 资源）' : '1x 图（300px 资源）';
  }
  if (pick) {
    pick.innerHTML = dpr === 2
      ? '👉 你的浏览器大概率就是 Retina——看上面那张 1x 图的边缘：<b>发虚</b>。srcset 声明 1x/2x 候选后，浏览器会自动选大图。'
      : '👉 1x 屏幕上 300px 资源足够锐利。切到 2x Retina 看差别。';
  }
}
function updateFit(grid) {
  if (!grid) return;
  var img = $('img[id$="-img"]', grid);
  if (!img) return;
  var x = $('input[data-ft="x"]', grid);
  var y = $('input[data-ft="y"]', grid);
  if (x && y) {
    img.style.objectPosition = x.value + '% ' + y.value + '%';
    var xv = $('#' + x.id + 'v'), yv = $('#' + y.id + 'v');
    if (xv) xv.textContent = x.value + '%';
    if (yv) yv.textContent = y.value + '%';
  }
  var read = $('[id$="-read"]', grid);
  var fit = img.style.objectFit;
  var notes = {
    fill: 'fill：强行拉满——容器 16:9、图片 16:10，产品被压扁了。这就是"PPT 感"的来源。',
    contain: 'contain：完整显示、保比例——两侧留白（黑边）。适合 Logo、图标，不适合 Hero。',
    cover: 'cover：保比例裁切填满——产品完整、构图可控。拖动焦点 X/Y 感受"取景器"（P13）。',
    none: 'none：原始尺寸——只显示图片中间一块（配合 overflow:hidden）。极少用于 Hero。'
  };
  if (read) read.innerHTML = '<b>' + (notes[fit] || '') + '</b>';
}
function applyFlex(card) {
  if (!card) return;
  var g = function (k) { return $('[data-fx="' + k + '"]', card); };
  var j = g('j'), a = g('a'), gp = g('g');
  var boxes = $('[id$="boxes"]', card);
  var navlist = $('[id$="navlist"]', card);
  if (!boxes || !j) return;
  var dir = $('[data-action="fx-dir"].active', card).dataset.v;
  [boxes, navlist].forEach(function (elx) {
    elx.style.display = 'flex';
    elx.style.flexDirection = dir;
    elx.style.justifyContent = j.value;
    elx.style.alignItems = a.value;
    elx.style.gap = gp.value + 'px';
  });
  [j, a].forEach(function (sel) {
    if (sel.nextElementSibling && sel.nextElementSibling.tagName === 'OUTPUT') {
      sel.nextElementSibling.textContent = sel.value;
    }
  });
  var gv = $('#' + gp.id + 'v');
  if (gv) gv.textContent = gp.value + 'px';
  var read = $('[id$="-read"]', card);
  if (read) {
    var axisNote = dir === 'row'
      ? 'row：主轴 = 水平 → justify 沿水平分配，align 沿垂直对齐。'
      : 'column：主轴 = 垂直 ↓ justify 沿垂直分配，align 沿水平对齐——注意两个预览里 justify 的效果"转了 90°"。';
    read.innerHTML = '<b>' + axisNote + '</b> 迷你导航用同一套设置——Apple 移动菜单（column）与桌面导航（row）就是这一组开关。';
  }
}
function applyPosition(grid) {
  if (!grid) return;
  var mode = $('[data-action="ps-mode"].active', grid).dataset.v;
  var badge = $('[id$="badge"]', grid);
  var x = $('input[data-ps="x"]', grid), y = $('input[data-ps="y"]', grid);
  var read = $('[id$="-read"]', grid);
  var stage = $('.ps-card', grid);
  if (mode === 'relative') {
    stage.classList.remove('abs-mode');
    badge.style.position = 'relative';
    badge.style.top = y.value + 'px';
    badge.style.left = x.value + 'px';
    badge.style.right = 'auto';
    if (read) read.innerHTML = '<b>relative</b>：徽章"占位"还在原处（文档流没变），只是画面偏移了 (x:' + x.value + ', y:' + y.value + ')。旁边内容不会补位——这是 relative 的标志。';
  } else {
    stage.classList.add('abs-mode');
    badge.style.position = 'absolute';
    badge.style.top = '10px';
    badge.style.right = '10px';
    badge.style.left = 'auto';
    if (read) read.innerHTML = '<b>absolute</b>：徽章脱离文档流，钉在 relative 祖先（卡片）右上角。原位置被内容"忘记"——top/left/right 现在以卡片为锚。';
  }
  var xv = $('#' + x.id + 'v'), yv = $('#' + y.id + 'v');
  if (xv) xv.textContent = x.value + 'px';
  if (yv) yv.textContent = y.value + 'px';
}
function updateSticky(grid) {
  if (!grid) return;
  var box = $('.sk-scroll', grid);
  var nav = $('.sk-nav', grid);
  var read = $('[id$="-read"]', grid);
  if (!box || !nav) return;
  var broken = box.dataset.broken === '1';
  var topBtn = $('[data-action="sk-top"].active', grid);
  var hasTop = topBtn.dataset.v !== 'none';
  nav.style.position = 'sticky';
  nav.style.top = hasTop ? '0px' : 'auto';
  box.style.overflow = broken ? 'hidden' : 'auto';
  box.scrollTop = box.scrollTop;
  var stuck = nav.getBoundingClientRect().top <= box.getBoundingClientRect().top + 1;
  var scrolled = box.scrollTop > 60;
  var state = !hasTop ? '✗ top 未设置：sticky 没有阈值——永远不吸附（死法一）。'
    : broken ? '✗ overflow:hidden 父容器：吸附范围被裁掉——装死中（死法二）。点击"恢复"复位。'
    : scrolled && stuck ? '✓ 已吸附：nav 顶部钉在容器顶端。'
    : scrolled ? '…滚动中，尚未到吸附点。' : '↓ 点"滚到底"触发吸附。';
  if (read) read.innerHTML = '<b>' + state + '</b>';
}
function initIoViz(grid) {
  if (!grid) return;
  var strip = $('[id$="strip"]', grid);
  var vp = $('[id$="-vp"]', grid);
  if (!strip || !vp) return;
  function update() {
    var th = +$('input[data-io="th"]', grid).value / 100;
    var vpR = vp.getBoundingClientRect();
    ['1', '2', '3'].forEach(function (n, i) {
      var b = strip.querySelector('.m' + n);
      var r = b.getBoundingClientRect();
      var inter = Math.max(0, Math.min(r.bottom, vpR.bottom) - Math.max(r.top, vpR.top));
      var ratio = inter / r.height;
      var small = b.querySelector('small');
      if (small) small.textContent = Math.round(ratio * 100) + '% 可见';
      b.classList.toggle('hit', ratio >= th);
    });
    var out = $('#' + $('input[data-io="th"]', grid).id + 'v');
    if (out) out.textContent = Math.round(th * 100) + '%';
    var hits = strip.querySelectorAll('.hit').length;
    var read = $('[id$="-read"]', grid);
    if (read) read.innerHTML = 'threshold <b>' + Math.round(th * 100) + '%</b>：可见比例达到阈值 → isIntersecting 变 true（亮起 <b>' + hits + '</b> 个）。滚动试试。';
  }
  vp.removeEventListener('scroll', update);
  vp.addEventListener('scroll', update);
  $('input[data-io="th"]', grid).removeEventListener('input', update);
  $('input[data-io="th"]', grid).addEventListener('input', update);
  update();
}
function applyGrid(card) {
  if (!card) return;
  var cards = $('[id$="cards"]', card);
  var gap = $('input[data-gp="gap"]', card);
  var colBtn = $('[data-action="gp-cols"].active', card);
  var read = $('[id$="-read"]', card);
  if (!cards || !colBtn) return;
  var v = colBtn.dataset.v;
  cards.style.gridTemplateColumns = v === 'auto' ? 'repeat(auto-fit, minmax(150px, 1fr))' : 'repeat(' + v + ', 1fr)';
  cards.style.gap = gap.value + 'px';
  var gv = $('#' + gap.id + 'v');
  if (gv) gv.textContent = gap.value + 'px';
  if (read) {
    var cols = Math.round(cards.clientWidth / (v === 'auto' ? 170 : (cards.clientWidth / (+v || 1) + +gap.value)));
    read.innerHTML = v === 'auto'
      ? 'auto-fit：容器宽 ' + cards.clientWidth + 'px → 浏览器自动决定列数（每列最小 150px）。缩放窗口看列数增减。'
      : 'repeat(' + v + ', 1fr)：声明 ' + v + ' 列——不管内容多少，轨道说了算。';
  }
}
function applyVideo(grid) {
  if (!grid) return;
  var v = $('video[id$="v"]', grid);
  var read = $('[id$="-read"]', grid);
  if (!v) return;
  var has = function (k) { return !!$('[data-vd="' + k + '"]:checked', grid); };
  ['autoplay', 'muted', 'loop', 'playsinline'].forEach(function (k) {
    if (has(k)) v.setAttribute(k, ''); else v.removeAttribute(k);
  });
  v.controls = has('controls');
  v.muted = has('muted');
  var msgs = [];
  v.pause();
  var p = v.play();
  var self = v;
  if (p && p.catch) {
    p.then(function () {
      if (read) read.innerHTML = '▶ 视频在播。' + (self.hasAttribute('autoplay') && !self.hasAttribute('muted') ? '（本机允许——真实浏览器会拒绝未静音 autoplay，别赌）' : '');
    }).catch(function () {
      if (read) read.innerHTML = '⛔ 浏览器拒绝播放——<b>autoplay 没有 muted</b>。勾上 muted 再试。';
    });
  }
  if (!has('autoplay')) msgs.push('未勾 autoplay：视频停在第 0 帧（poster 显示中）。');
  if (has('controls')) msgs.push('controls 开：这是一台"播放器"，不再是氛围。');
  if (msgs.length && read) read.innerHTML = msgs.join(' ');
}
function applyLayout(grid) {
  if (!grid) return;
  var flex = $('[id$="flex"]', grid);
  var copy = $('.ly-copy', grid);
  var visual = $('[id$="visual"]', grid);
  if (!flex || !visual) return;
  var side = $('[data-action="ly-side"].active', grid).dataset.v;
  var stack = $('[data-action="ly-stack"].active', grid).dataset.v;
  var align = $('[data-action="ly-align"].active', grid).dataset.v;
  var imgf = $('input[data-ly="imgf"]', grid);
  var gap = $('input[data-ly="gap"]', grid);
  flex.style.flexDirection = stack;
  flex.style.alignItems = align;
  flex.style.gap = gap.value + 'px';
  visual.style.flex = (imgf.value / 10);
  copy.style.flex = '10';
  if (stack === 'row') {
    if (side === 'left') { visual.style.order = '-1'; copy.style.order = '0'; }
    else { visual.style.order = '0'; copy.style.order = '-1'; }
  } else {
    if (side === 'left') { visual.style.order = '-1'; copy.style.order = '0'; }
    else { visual.style.order = '0'; copy.style.order = '-1'; }
  }
  var out1 = $('#' + imgf.id + 'v');
  if (out1) out1.textContent = (imgf.value / 10).toFixed(1);
  var out2 = $('#' + gap.id + 'v');
  if (out2) out2.textContent = gap.value + 'px';
}
function applyContainer(card) {
  if (!card) return;
  var inp = $('input[data-cw="w"]', card);
  var box = $('[id$="-box"]', card);
  var out = $('#' + inp.id + 'v');
  var read = $('[id$="-read"]', card);
  if (!inp || !box) return;
  var w = +inp.value;
  box.style.maxWidth = w + 'px';
  if (out) out.textContent = w + 'px';
  var centered = $('[data-action="cw-center"].active', card).dataset.v === 'on';
  box.style.marginInline = centered ? 'auto' : '0';
  var chars = Math.round(w / 17);
  var verdict = w < 480 ? '太窄：一行没几个字，视线跳得像打拍子。'
    : w <= 1100 ? '舒适区：行长可读，构图聚焦——Apple 的内容层就在这个区间。'
    : '超宽：行长接近生理极限，读三行就开始"串行"。';
  if (read) read.innerHTML = '内容宽 <b>' + w + 'px</b> ≈ 每行 <b>' + chars + '</b> 字 · ' + verdict + (centered ? '' : ' · ⚠️ 当前未居中：右侧大量空白没人认领。');
}
function applyClamp(grid) {
  if (!grid) return;
  var g = function (a) { return $('input[data-cl="' + a + '"]', grid); };
  var mn = +g('min').value, pf = +g('pref').value, mx = +g('max').value, vw = +g('vw').value;
  ['min', 'pref', 'max', 'vw'].forEach(function (a) {
    var inp = g(a);
    var out = $('#' + inp.id + 'v');
    if (out) out.textContent = inp.value + (a === 'pref' ? 'vw' : 'px');
  });
  var raw = vw * pf / 100;
  var v = Math.max(mn, Math.min(mx, raw));
  var demo = $('[id$="-demo"]', grid);
  if (demo) demo.style.fontSize = v + 'px';
  var px = $('[id$="-px"]', grid);
  if (px) px.textContent = v + 'px';
  var calc = $('[id$="-calc"]', grid);
  if (calc) {
    calc.innerHTML = 'clamp(' + mn + 'px, ' + pf + 'vw, ' + mx + 'px) @ ' + vw + 'px 视口：<br>'
      + vw + ' × ' + pf + '% = <b>' + (Math.round(raw * 10) / 10) + 'px</b> → '
      + (raw < mn ? '低于下限 → 夹到 <b>' + mn + 'px</b>' : raw > mx ? '高于上限 → 夹到 <b>' + mx + 'px</b>' : '在区间内 → 采用 <b>' + (Math.round(raw * 10) / 10) + 'px</b>');
  }
}
function applyHeroBalance(grid) {
  if (!grid) return;
  var g = function (a) { return $('input[data-hb="' + a + '"]', grid); };
  var container = $('[id$="-container"]', grid);
  var img = $('img[id$="-img"]', grid);
  var prev = $('[id$="-prev"]', grid);
  var slogan = $('.tp-slogan', prev);
  if (!container || !img) return;
  var cw = +g('cw').value, ss = +g('ss').value, iw = +g('iw').value, pt = +g('pt').value, mt = +g('mt').value;
  container.style.maxWidth = cw + 'px';
  container.style.paddingTop = pt + 'px';
  img.style.width = iw + '%';
  img.style.marginTop = mt + 'px';
  if (slogan) slogan.style.fontSize = ss + 'px';
  [['cw', 'px'], ['ss', 'px'], ['iw', '%'], ['pt', 'px'], ['mt', 'px']].forEach(function (p) {
    var inp = g(p[0]);
    var out = $('#' + inp.id + 'v');
    if (out) out.textContent = inp.value + p[1];
  });
}
function applyCompose(grid) {
  if (!grid) return;
  var g = function (suf) { return $('input[data-cp="' + suf + '"]', grid); };
  var prev = $('[id$="-prev"]', grid);
  var img = $('img[id$="-img"]', grid);
  if (!prev || !img) return;
  var scale = g('scale'), ratio = g('ratio'), posy = g('posy'), slogan = g('slogan'), pad = g('pad');
  if (scale) img.style.width = scale.value + '%';
  if (ratio) img.style.aspectRatio = '16 / ' + Math.round(100 * 10 / (+ratio.value || 160) * 10) / 10;
  if (posy) img.style.objectPosition = '50% ' + posy.value + '%';
  if (slogan) $('.tp-slogan', prev).style.fontSize = slogan.value + 'px';
  if (pad) prev.style.paddingTop = pad.value + 'px';
  [['scale', '%'], ['ratio', '%'], ['posy', '%'], ['slogan', 'px'], ['pad', 'px']].forEach(function (suf) {
    var inp = g(suf[0]);
    if (!inp) return;
    var out = $('#' + inp.id + 'v');
    if (out) out.textContent = inp.value + suf[1];
  });
}

/* ---------- Challenge 检查 ----------
   re 检查：对编辑器源码做正则；
   js 检查：读取 iframe 内真实渲染的 DOM 与计算样式（getComputedStyle）。 */
function evalOneCheck(c, doc, win, code) {
  if (c.js) {
    try { return !!(new Function('doc', 'win', '"use strict";return (' + c.js + ');'))(doc, win); } catch (e) { return false; }
  }
  return c.re.test(code);
}
var _pendingChecks = [];
/* v2.0.1 审计修复 P1-1：全过检查时记录独立性证据（仅 assisted 块）。
   rank = 自上次通过以来使用的帮助档位（hintsSince）——0 即零帮助独立通过；
   通过后 hintsSince 归零，学生可通过重做证明进步（历史保留在 maxHelp/refEver）。 */
function recordSolve(idp) {
  try {
    var b = findBlockByIdp(idp);
    if (!b || b.type !== 'assisted' || !b.id) return;
    var pb = state.projB;
    if (!pb.solves) pb.solves = {};
    if (!pb.hintsSince) pb.hintsSince = {};
    var since = pb.hintsSince[b.id] || 0;
    var prev = pb.solves[b.id];
    pb.solves[b.id] = {
      last: since,
      best: Math.min(prev ? prev.best : 9, since),
      maxHelp: Math.max(pb.hints[b.id] || 0, since, prev ? prev.maxHelp : 0),
      refEver: !!pb.refs[b.id] || !!(prev && prev.refEver),
      ts: new Date().toLocaleString()
    };
    pb.hintsSince[b.id] = 0;
    save();
  } catch (e) {}
}
function renderChecks(idp, results, labels) {
  var ul = $('#' + idp + 'checks');
  if (!ul) return; // 切关后 DOM 已清空
  var pass = 0;
  var html = '';
  results.forEach(function (ok, i) {
    if (ok) pass++;
    html += '<li class="' + (ok ? 'ok' : '') + '"><span class="ck">' + (ok ? '✓' : '✗') + '</span><span>' + esc(labels[i]) + '</span></li>';
  });
  ul.innerHTML = html;
  ul.classList.add('show');
  var allPass = pass === labels.length;
  var passEl = $('#' + idp + 'pass');
  passEl.classList.toggle('show', allPass);
  if (allPass) { toast('🎉 全部检查通过'); recordSolve(idp); }
  return allPass;
}
function runChecks(idp, b) {
  var code = $('#' + idp + 'code').value;
  var frame = $('#' + idp + 'frame');
  var doc = null, win = null;
  try { doc = frame.contentDocument; win = frame.contentWindow; } catch (e) {}
  /* v2.0.1 审计修复 P1-2：宽度相会临时改 iframe 宽度求值媒体查询——
     出口统一走 finishChecks，恢复进入时的原始宽度（含 scroll/静态短路路径），
     否则同一次访问内后续桌面检查会残留在 390px 下批量误判（共享引擎，A/B 同受益） */
  var prevW = frame.style.width;
  function finishChecks() {
    frame.style.width = prevW;
    return renderChecks(idp, results, b.checks.map(function (c) { return c.label; }));
  }
  /* 两阶段：静态项先行；标记 scroll:true 的项在"滚动+等 IO"后复评 */
  var results = b.checks.map(function (c) {
    if (c.scroll) return null;
    return evalOneCheck(c, doc, win, code);
  });
  var scrollIdx = [];
  b.checks.forEach(function (c, i) { if (c.scroll) scrollIdx.push(i); });
  var widthChecks = [];
  b.checks.forEach(function (c, i) { if (c.width) widthChecks.push({ i: i, w: c.width }); });
  function evalScroll() {
    scrollIdx.forEach(function (i) {
      results[i] = evalOneCheck(b.checks[i], doc, win, code);
    });
    if (!widthChecks.length) return finishChecks();
    /* 宽度相：依次在多个视口宽度下复评（IO 与媒体查询都真实求值） */
    var widths = [];
    widthChecks.forEach(function (wc) { if (widths.indexOf(wc.w) < 0) widths.push(wc.w); });
    var k = 0;
    function nextW() {
      if (k >= widths.length) return finishChecks();
      var wv = widths[k++];
      try { win.scrollTo(0, 0); } catch (e) {}
      frame.style.width = Math.min(wv, frame.parentElement.clientWidth - 8) + 'px';
      setTimeout(function () {
        widthChecks.forEach(function (wc) {
          if (wc.w === wv) results[wc.i] = evalOneCheck(b.checks[wc.i], doc, win, code);
        });
        nextW();
      }, 550);
    }
    nextW();
  }
  if (!scrollIdx.length && !widthChecks.length) return finishChecks();
  try { win.scrollTo(0, 0); } catch (e) {}
  setTimeout(function () {
    try { win.scrollTo(0, doc.body.scrollHeight); } catch (e) {}
    setTimeout(function () {
      scrollIdx.forEach(function (i) {
        results[i] = evalOneCheck(b.checks[i], doc, win, code);
      });
      try { win.scrollTo(0, 0); } catch (e) {}
      evalScroll();
    }, 700);
  }, 120);
  return false;
}
function addHints(idp, b, n) {
  var box = $('#' + idp + 'hints');
  box.classList.add('show');
  if (n > b.hints.length) n = b.hints.length;
  var html = '';
  for (var i = 0; i < n; i++) html += '<div class="hint-item">Hint ' + (i + 1) + ' · ' + esc(b.hints[i]) + '</div>';
  box.innerHTML = html;
}

/* ---------- Pagemap 详情 ---------- */
function pmShow(idp, b, pageIndex, modIndex) {
  var detail = $('#' + idp + 'detail');
  var m = b.pages[pageIndex].modules[modIndex];
  var tech = [].concat(
    m.h.map(function (x) { return '<code>' + esc(x) + '</code>'; }),
    m.c.map(function (x) { return '<code>' + esc(x) + '</code>'; }),
    m.j.map(function (x) { return '<code>' + esc(x) + '</code>'; })
  ).join('');
  detail.innerHTML = '<h4>' + esc(m.name) + '</h4>'
    + '<p class="pm-what">' + esc(m.what) + '</p>'
    + '<div class="pm-meta"><span class="m-stage">' + esc(m.stage) + '</span>'
    + (m.p ? '<span>' + esc(m.p) + '</span>' : '') + '</div>'
    + (tech ? '<div class="pm-tech">' + tech + '</div>' : '')
    + '<p class="pm-skill"><b>训练能力：</b>' + esc(m.skill) + '</p>';
  var chips = $all('#' + idp + 'chips .pm-chip');
  chips.forEach(function (c, i) { c.classList.toggle('active', i === modIndex); });
}

/* ============================================================
   全局事件委托
   ============================================================ */
document.addEventListener('click', function (ev) {
  if (!ev.target || !ev.target.closest) return;
  var el = ev.target.closest('[data-action]');
  if (!el) {
    var sr = $('#searchResults');
    if (sr && !sr.hidden && !ev.target.closest('.search')) { sr.hidden = true; }
    return;
  }
  var act = el.dataset.action;
  var sid = state.current;

  if (act === 'stage') { showStage(el.dataset.id); closeSidebar(); }
  else if (act === 'home') { showStage('home'); closeSidebar(); }
  else if (act === 'mark-learned') {
    /* v1.0.1：coming 关不得标记学会（build-log Finalization Gate 声称此锁存在但未落地；
       同时封死"灌水未制作关卡解锁考试"的路径） */
    var curSt = getStage(sid);
    if (curSt && curSt.stage.status === 'coming') { toast('🚧 未制作关卡不能标记学会'); return; }
    var idx = state.completed.indexOf(sid);
    if (idx < 0) { state.completed.push(sid); toast('✓ Stage 已标记学会'); }
    else { state.completed.splice(idx, 1); toast('已取消标记'); }
    save(); renderStage(sid);
  }
  else if (act === 'exam') {
    /* v1.0.1：首页 Final Exam 卡入口。锁定态按钮为 disabled，不会走到这里。 */
    if (location.hash === '#exam') renderStage('exam');
    else location.hash = 'exam';
  }
  else if (act === 'exam-submit') {
    if (!examUnlocked()) return;
    state.exam.submitted = !state.exam.submitted;
    if (!state.exam.submitted) state.exam.reviewed = false;
    save(); renderStage('exam');
    toast(state.exam.submitted ? '✓ 已标记作品备妥——状态：Awaiting Review' : '已撤回备妥标记');
  }
  else if (act === 'exam-export') {
    if (!examUnlocked()) return;
    var exBlob = new Blob([examSubmissionMd()], { type: 'text/markdown' });
    var exA = document.createElement('a');
    exA.href = URL.createObjectURL(exBlob);
    exA.download = 'vector-trail-submission-checklist.md';
    exA.click();
    URL.revokeObjectURL(exA.href);
    toast('↓ 提交清单已下载——随作品一起交给 reviewer');
  }
  else if (act === 'exam-copy') {
    if (!examUnlocked()) return;
    var exTxt = examSummaryText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(exTxt).then(function () { toast('✓ Submission Summary 已复制到剪贴板'); }).catch(function () { toast('复制失败——请改用 Export 功能'); });
    } else { toast('当前环境不支持剪贴板——请改用 Export 功能'); }
  }
  /* ---------- Project B · Assisted Mode ---------- */
  else if (act === 'pred-pick') {
    var pc = el.closest('.card');
    $all('.pred-opt', pc).forEach(function (x) { if (x.dataset.pred === el.dataset.pred) { x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); } });
    el.classList.add('sel'); el.setAttribute('aria-pressed', 'true');
  }
  else if (act === 'conf-pick') {
    var cc = el.closest('.card');
    $all('.conf-btn', cc).forEach(function (x) { if (x.dataset.pred === el.dataset.pred) { x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); } });
    el.classList.add('sel'); el.setAttribute('aria-pressed', 'true');
  }
  else if (act === 'pred-submit') {
    var pid = el.dataset.pred;
    var pcard = el.closest('.card');
    var selOpt = $('.pred-opt.sel', pcard);
    var selConf = $('.conf-btn.sel', pcard);
    if (!selOpt || !selConf) { toast('先选择一个预测选项和 Confidence'); return; }
    var pb = predBlockOf(pid);
    if (!pb) return;
    /* v2.0.1 审计修复 P2-6：First Prediction 永不覆盖（校准数据防洗白）。
       揭示后的再次提交记录为 revision——belief update 有教学价值，但统计按 first。 */
    var old = state.projB.predictions[pid];
    var rec;
    if (old && old.revealed) {
      rec = old;
      rec.choice = +selOpt.dataset.i;
      rec.conf = selConf.dataset.c;
      rec.ts = new Date().toLocaleString();
      if (rec.firstChoice !== rec.choice || rec.firstConf !== rec.conf) rec.revised = true;
      else delete rec.revised;
      toast('Revision 已记录——校准统计仍按 First Prediction 计算');
    } else {
      rec = { firstChoice: +selOpt.dataset.i, firstConf: selConf.dataset.c, choice: +selOpt.dataset.i, conf: selConf.dataset.c, revealed: true, ts: new Date().toLocaleString() };
      toast(rec.firstChoice === pb.answer ? '预测已记录——看校准反馈' : '预测与观察不一致——看证据');
    }
    state.projB.predictions[pid] = rec;
    save();
    $('#pred-' + pid + '-reveal').innerHTML = predRevealHtml(pb, rec);
    /* 揭示后按钮切换为 Revise 语义（无重渲染，就地更新） */
    var pbtn = pcard.querySelector('[data-action="pred-submit"]');
    if (pbtn) pbtn.textContent = '↺ Revise after learning →';
  }
  else if (act === 'recall-open') {
    state.projB.recall[el.dataset.id] = (state.projB.recall[el.dataset.id] || 0) + 1;
    save();
  }
  else if (act === 'assist-run') {
    var axIdp1 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    runFrame($('#' + axIdp1 + 'frame'), $('#' + axIdp1 + 'code').value, challengeMode(axIdp1));
  }
  else if (act === 'assist-check') {
    var axIdp2 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var axB = findBlockByIdp(axIdp2);
    var axFrame = $('#' + axIdp2 + 'frame');
    var axBtn = el;
    if (axB && axB.id) { state.projB.attempts[axB.id] = (state.projB.attempts[axB.id] || 0) + 1; save(); }
    axBtn.disabled = true;
    var axScroll = axB && axB.checks.some(function (c) { return c.scroll; });
    if (axScroll) { try { axFrame.scrollIntoView({ block: 'center' }); } catch (e) {} }
    whenFrameLoaded(axFrame, function () {
      var kickAx = function () {
        setTimeout(function () { axBtn.disabled = false; runChecks(axIdp2, axB); }, 350);
      };
      if (axScroll) {
        try { axFrame.contentWindow.scrollTo(0, 0); } catch (e) {}
        setTimeout(kickAx, 650);
      } else kickAx();
    });
  }
  else if (act === 'assist-hint') {
    var axIdp3 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var axB3 = findBlockByIdp(axIdp3);
    var shown3 = $all('.hint-item', $('#' + axIdp3 + 'hints')).length;
    if (shown3 >= axB3.hints.length) { toast('三级 Help 已全部展示——继续自己试，或诚实使用 Reference'); }
    else {
      assistHints(axIdp3, axB3, shown3 + 1);
      if (axB3.id) {
        state.projB.hints[axB3.id] = Math.max(state.projB.hints[axB3.id] || 0, shown3 + 1);
        /* v2.0.1：hintsSince = 自上次通过以来的帮助档位，供 recordSolve 计算当次独立性 */
        state.projB.hintsSince[axB3.id] = Math.max(state.projB.hintsSince[axB3.id] || 0, shown3 + 1);
        save();
        toast('Help L' + (shown3 + 1) + ' 已记录（计入 Independence）');
      }
    }
  }
  else if (act === 'assist-ref') {
    var axIdp4 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var axB4 = findBlockByIdp(axIdp4);
    var tries = (axB4.id && state.projB.attempts[axB4.id]) || 0;
    var helped = (axB4.id && state.projB.hints[axB4.id]) || 0;
    if (tries < 2 && helped < 3) { toast('Reference 还没解锁：先自己跑 ' + (2 - tries) + ' 次检查，或用满三级 Help（当前检查 ' + tries + '/2）'); return; }
    state.projB.refs[axB4.id] = true;
    save();
    $('#' + axIdp4 + 'code').value = axB4.answer;
    runFrame($('#' + axIdp4 + 'frame'), axB4.answer, challengeMode(axIdp4), true);
    var axFrame4 = $('#' + axIdp4 + 'frame');
    whenFrameLoaded(axFrame4, function () { runChecks(axIdp4, axB4); });
    toast('Reference 已解锁——Independence 将记录为 Used Reference');
  }
  else if (act === 'assist-reset') {
    var axIdp5 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var axB5 = findBlockByIdp(axIdp5);
    $('#' + axIdp5 + 'code').value = axB5.starter;
    runFrame($('#' + axIdp5 + 'frame'), axB5.starter, challengeMode(axIdp5), true);
    var ul5 = $('#' + axIdp5 + 'checks'); if (ul5) { ul5.classList.remove('show'); ul5.innerHTML = ''; }
    var ps5 = $('#' + axIdp5 + 'pass'); if (ps5) ps5.classList.remove('show');
  }
  else if (act === 'assist-export') {
    /* v2.0.1 审计修复 P1-5：导出学生当前编辑器内容（不是 Reference），未满分也可保存 */
    var exIdp = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var exB = findBlockByIdp(exIdp);
    var exCode = $('#' + exIdp + 'code').value;
    var exLis = $all('#' + exIdp + 'checks li'), exOk = exLis.filter(function (li) { return li.classList.contains('ok'); }).length;
    var exBlob = new Blob([exCode], { type: 'text/html' });
    var exA = document.createElement('a');
    exA.href = URL.createObjectURL(exBlob);
    exA.download = (exB.export && exB.export.file) || 'my-work.html';
    exA.click();
    URL.revokeObjectURL(exA.href);
    toast('↓ 你的作品已下载' + (exLis.length ? '（当前检查 ' + exOk + '/' + exLis.length + '）' : '') + '——继续改可以再次导出');
  }
  else if (act === 'assist-copywork') {
    var cwIdp = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var cwCode = $('#' + cwIdp + 'code').value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cwCode).then(function () { toast('✓ 你的当前代码已复制到剪贴板'); }).catch(function () { toast('复制失败——请用 Download 保存'); });
    } else { toast('当前环境不支持剪贴板——请用 Download 保存'); }
  }
  else if (act === 'bj-add') {
    var bjSym = $('#bj-sym').value.trim();
    if (!bjSym) { toast('Symptom 是必填——先描述现象'); return; }
    state.projB.bugjournal.unshift({
      sym: bjSym, hyp: $('#bj-hyp').value.trim(), cause: $('#bj-cause').value.trim(),
      fix: $('#bj-fix').value.trim(), verify: $('#bj-verify').value.trim(),
      stage: state.current, ts: new Date().toLocaleString()
    });
    save(); renderStage(state.current);
    toast('🐛 已记录——方法比结论值钱');
  }
  else if (act === 'bj-del') {
    state.projB.bugjournal.splice(+el.dataset.i, 1);
    save(); renderStage(state.current);
    toast('已删除');
  }
  else if (act === 'reason-check') {
    var rid = el.dataset.id, ri = +el.dataset.i;
    var rarr = state.projB.reasoning[rid] || [];
    rarr[ri] = el.querySelector('input').checked;
    state.projB.reasoning[rid] = rarr;
    save();
  }
  else if (act === 'reason-why') {
    var rb = reasonBlockOf(el.dataset.target.replace(/^rc-/, ''));
    var rbox = $('#' + el.dataset.target);
    if (rb && rbox) {
      rbox.innerHTML = '<p class="pred-obs"><b>Reference Considerations（供对照，不是标准答案）：</b></p>'
        + '<ul class="goal-list">' + rb.considerations.map(function (x) { return '<li><span class="g-n">·</span><span>' + esc(x) + '</span></li>'; }).join('') + '</ul>';
      rbox.classList.add('show');
    }
  }
  else if (act === 'reset-progress') {
    if (confirm('确定清空全部学习进度？此操作不可恢复。')) {
      state = { completed: [], checklists: {}, quiz: {}, current: 'home', exam: { started: false, submitted: false, reviewed: false }, projB: { predictions: {}, reasoning: {}, hints: {}, hintsSince: {}, solves: {}, refs: {}, attempts: {}, bugjournal: [], recall: {} } };
      save(); showStage('home'); toast('进度已重置');
    }
  }
  else if (act === 'tag-open') {
    el.closest('.tag-card').classList.toggle('open');
  }
  else if (act === 'tag-tab') {
    var card = el.closest('[data-tagcard]');
    var ti = el.dataset.card;
    $all('.tag-tab', card).forEach(function (t) { t.classList.remove('active'); });
    el.classList.add('active');
    $all('.tag-panel', card).forEach(function (p) {
      p.classList.toggle('active', p.dataset.panel === ti + '-' + el.dataset.tab);
    });
  }
  else if (act === 'lab-title-default') {
    var inp = $('input[type="text"]', el.closest('.lab'));
    inp.value = '我的页面'; updateTitleLab(inp);
  }
  else if (act === 'lab-bg') {
    var lab = el.closest('.lab');
    $all('[data-action="lab-bg"]', lab).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    setBgDoc(lab, el.dataset.val);
  }
  else if (act === 'lab-vp') {
    var seg = el.closest('.lab-row');
    $all('[data-action="lab-vp"]', seg).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var block = el.closest('.card');
    setVpDoc($('iframe', block), el.dataset.val);
  }
  else if (act === 'lab-choose') {
    var row = el.closest('.lab-row');
    var labEl = el.closest('.card');
    var bLab = DATA.projects[0].stages[1].blocks.filter(function (x) { return x.type === 'lab' && x.kind === 'choose'; })[0];
    var opt = bLab.options[+el.dataset.i];
    $all('.choice-btn', row).forEach(function (x) { x.disabled = true; });
    el.classList.add(opt.ok ? 'sel-ok' : 'sel-no');
    var why = $('[id$="why"]', labEl);
    why.className = 'lab-why show ' + (opt.ok ? 'ok' : 'no');
    why.innerHTML = (opt.ok ? '✓ ' : '✗ ') + opt.why;
  }
  else if (act === 'dom-node') {
    var idp2 = el.closest('.dom-grid').querySelector('[id^="dv-"]').id.replace(/tree$/, '');
    dvHighlight(idp2, el.dataset.id);
  }
  else if (act === 'dv-head-toggle') {
    var hz = el.closest('.browser').querySelector('[data-r="head"]');
    hz.style.display = hz.style.display === 'none' ? '' : 'none';
    toast(hz.style.display === 'none' ? '幕后已隐藏（真实页面中 head 本来就看不见）' : '幕后已显示');
  }
  else if (act === 'challenge-run' || act === 'debug-run') {
    var idp3 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    runFrame($('#' + idp3 + 'frame'), $('#' + idp3 + 'code').value, challengeMode(idp3));
  }
  else if (act === 'challenge-check' || act === 'debug-check') {
    var idp4 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var cb = findBlockByIdp(idp4);
    var cbFrame = $('#' + idp4 + 'frame');
    var cbBtn = el;
    cbBtn.disabled = true;
    /* 滚动类检查依赖"iframe 在父视口内"（IO 与顶层视口相交）——先把预览滚进来 */
    var hasScrollChecks = cb.checks.some(function (c) { return c.scroll; });
    if (hasScrollChecks) {
      try { cbFrame.scrollIntoView({ block: 'center' }); } catch (e) {}
    }
    whenFrameLoaded(cbFrame, function () {
      /* 视频 autoplay 在 sandbox iframe 内受策略限制：借"检查"按钮的用户手势代为 play() */
      try {
        var cdoc = cbFrame.contentDocument;
        var cv = cdoc && cdoc.querySelector('video[autoplay][muted]');
        if (cv && cv.paused && cv.play) { var pp = cv.play(); if (pp && pp.catch) pp.catch(function () {}); }
      } catch (e) {}
      var kick = function () {
        setTimeout(function () {
          cbBtn.disabled = false;
          runChecks(idp4, cb);
        }, 350);
      };
      if (hasScrollChecks) {
        /* 先归零滚动位并等 IO 初始回调稳定，再让 runChecks 的两阶段滚动 */
        try { cbFrame.contentWindow.scrollTo(0, 0); } catch (e) {}
        setTimeout(kick, 650);
      } else {
        kick();
      }
    });
  }
  else if (act === 'challenge-hint' || act === 'debug-hint') {
    var idp5 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var bb = findBlockByIdp(idp5);
    var shown = $all('.hint-item', $('#' + idp5 + 'hints')).length;
    if (shown >= bb.hints.length) { toast('提示已全部展示'); }
    addHints(idp5, bb, shown + 1);
  }
  else if (act === 'challenge-answer') {
    var idp6 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var ab = findBlockByIdp(idp6);
    $('#' + idp6 + 'code').value = ab.answer;
    runFrame($('#' + idp6 + 'frame'), ab.answer, challengeMode(idp6), true);
    var abFrame = $('#' + idp6 + 'frame');
    whenFrameLoaded(abFrame, function () { runChecks(idp6, ab); });
    toast('已填入参考答案——回到编辑器逐行读一遍，再 Reset 自己写一次');
  }
  else if (act === 'debug-cause') {
    var idp7 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var cb = findBlockByIdp(idp7);
    var cbox = $('#' + idp7 + 'cause');
    cbox.innerHTML = '<b>五处事故的完整病因：</b><br>' + cb.cause;
    cbox.classList.add('show');
  }
  else if (act === 'challenge-reset' || act === 'debug-reset') {
    var idp8 = el.closest('.card').querySelector('textarea').id.replace('code', '');
    var rb = findBlockByIdp(idp8);
    $('#' + idp8 + 'code').value = rb.starter;
    runFrame($('#' + idp8 + 'frame'), rb.starter, challengeMode(idp8), true);
    $('#' + idp8 + 'checks').classList.remove('show');
    $('#' + idp8 + 'pass').classList.remove('show');
    $('#' + idp8 + 'hints').classList.remove('show');
    var causeEl = $('#' + idp8 + 'cause');
    if (causeEl) causeEl.classList.remove('show');
  }
  else if (act === 'design-pick') {
    var dbq = blockFromEl(el);
    var qi = +el.closest('[data-dq]').dataset.dq;
    var q = dbq.b.questions[qi];
    var dqEl = el.closest('[data-dq]');
    $all('.design-opt', dqEl).forEach(function (o) {
      o.disabled = true;
      var optIsB = o.dataset.opt === 'b';
      if (optIsB === (q.correct === 'b')) o.classList.add('correct');
      else o.classList.add('wrong');
      if (o !== el) o.classList.add('dim');
    });
    $('.design-analysis', dqEl).classList.add('show');
    if ((el.dataset.opt === 'b') === (q.correct === 'b')) toast('✓ 判断正确'); else toast('✗ 再看分析');
  }
  else if (act === 'quiz-pick') {
    var qEl = el.closest('.quiz-q');
    var qIdx = +el.dataset.q;
    var qb = blockFromEl(el);
    var qd = qb.b.questions[qIdx];
    var chosen = +el.dataset.oi;
    state.quiz[qb.sid + ':' + qb.bi + ':' + qIdx] = chosen;
    save();
    $all('.quiz-opt', qEl).forEach(function (o, oi) {
      o.disabled = true;
      if (oi === qd.answer) o.classList.add('correct');
      else if (oi === chosen) o.classList.add('wrong');
    });
    $('.quiz-explain', qEl).classList.add('show');
  }
  else if (act === 'obs-toggle') {
    var item = el.closest('.obs-item');
    var opened = item.classList.toggle('open');
    el.textContent = opened ? '收起参考观察' : '展开参考观察';
  }
  else if (act === 'judge-pick') {
    var sIdx = +el.dataset.s;
    var jb = blockFromEl(el);
    var scen = jb.b.scenarios[sIdx];
    var opt = scen.options[+el.dataset.i];
    var row = el.closest('.lab-row');
    $all('.choice-btn', row).forEach(function (x) { x.disabled = true; });
    el.classList.add(opt.ok ? 'sel-ok' : 'sel-no');
    var why = el.closest('.card').querySelector('[data-swhy="' + sIdx + '"]');
    why.className = 'lab-why show ' + (opt.ok ? 'ok' : 'no');
    why.innerHTML = opt.why;
  }
  else if (act === 'hl-set') {
    var lzseg = el.closest('.lab-row');
    $all('.seg button', lzseg).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var stage = el.closest('.block').querySelector('.hl-stage');
    if (stage) stage.dataset.mode = el.dataset.mode;
  }
  else if (act === 'cs-bg' || act === 'cs-align' || act === 'cs-weight') {
    var segBtns = el.closest('.lab-row');
    $all('.choice-btn', segBtns).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var cbox = el.closest('.cssdemo').querySelector('.cd-box');
    if (act === 'cs-bg') cbox.style.background = el.dataset.val;
    else if (act === 'cs-align') cbox.style.textAlign = el.dataset.val;
    else cbox.querySelector('span').style.fontWeight = el.dataset.val;
  }
  else if (act === 'cs-fit') {
    $all('.choice-btn', el.closest('.lab-row')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    el.closest('.cssdemo').querySelector('.cd-fitbox img').style.objectFit = el.dataset.val;
  }
  else if (act === 'cs-pos') {
    $all('.choice-btn', el.closest('.lab-row')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    el.closest('.cssdemo').querySelector('img').style.objectPosition = el.dataset.val;
  }
  else if (act === 'cs-ratio') {
    $all('.choice-btn', el.closest('.lab-row')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    el.closest('.cssdemo').querySelector('.cd-ratiobox').style.aspectRatio = el.dataset.val.replace('/', ' / ');
  }
  else if (act === 'hl-pick') {
    var hb = blockFromEl(el);
    var hopt = hb.b.options[+el.dataset.i];
    var hrow = el.closest('.lab-row');
    $all('.choice-btn', hrow).forEach(function (x) { x.disabled = true; });
    el.classList.add(hopt.ok ? 'sel-ok' : 'sel-no');
    var hwhy = el.closest('.card').querySelector('.lab-why');
    hwhy.className = 'lab-why show ' + (hopt.ok ? 'ok' : 'no');
    hwhy.innerHTML = hopt.why;
    el.closest('.card').querySelector('.cause-box').classList.add('show');
  }
  else if (act === 'tp-preset') {
    var card = el.closest('.lab');
    if (el.dataset.preset === 'apple') {
      setSlider(card, 'name', 32); setSlider(card, 'slogan', 80);
      $('select[id$="weight"]', card).value = '600';
      setSlider(card, 'lh', 110); setSlider(card, 'ls', 1);
      $('select[id$="align"]', card).value = 'left';
      setSlider(card, 'pad', 96);
    } else {
      setSlider(card, 'name', 40); setSlider(card, 'slogan', 48);
      $('select[id$="weight"]', card).value = '400';
      setSlider(card, 'lh', 140); setSlider(card, 'ls', 0);
      $('select[id$="align"]', card).value = 'center';
      setSlider(card, 'pad', 48);
    }
    var prevCard = card.closest('.pg-grid');
    applyTypo(prevCard);
  }
  else if (act === 'sp-preset') {
    var spCard = el.closest('.lab');
    $all('[data-action="sp-preset"]', spCard).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var p = el.dataset.preset;
    if (p === 'crowded') { setSlider(spCard, 'pad', 24); setSlider(spCard, 'g1', 2); setSlider(spCard, 'g2', 4); setSlider(spCard, 'px', 16); }
    else if (p === 'balanced') { setSlider(spCard, 'pad', 120); setSlider(spCard, 'g1', 12); setSlider(spCard, 'g2', 22); setSlider(spCard, 'px', 48); }
    else { setSlider(spCard, 'pad', 200); setSlider(spCard, 'g1', 56); setSlider(spCard, 'g2', 80); setSlider(spCard, 'px', 110); }
    applySpace(spCard.closest('.pg-grid'));
  }
  else if (act === 'lz-set') {
    var lzseg = el.closest('.lab-row');
    $all('.seg button', lzseg).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    el.closest('.card').querySelector('.lz-stage').dataset.view = el.dataset.view;
  }
  else if (act === 'tf-reveal') {
    var tCard = el.closest('.card');
    var ana = $('#' + el.closest('.block').querySelector('[id$="-ana"]').id);
    ana.innerHTML = '<b>通用设计原则（任何产品都成立）：</b><br>'
      + '· 一个视觉焦点（P01）——你的 Hero 第一眼只有一个主张；<br>'
      + '· 字号跳跃建立层级（P04）——你选了「' + ($('[data-tf="scale"]').value === 'jump' ? '跳跃' : '接近') + '」层级；<br>'
      + '· 留白给焦点让路（P07）——你选了「' + ({ large: '大留白', medium: '中', small: '小' })[$('[data-tf="space"]').value] + '」；<br>'
      + '· 排版决定阅读顺序（P08）——字重和颜色对比要服务同一个顺序。<br><br>'
      + '<b>Apple 风格（可以换掉的）：</b><br>'
      + '· 黑色主题、SF Pro/PingFang 字体、左对齐、聚光灯式摄影。AI 笔记产品用浅色底完全合理——但层级规则不变。<br><br>'
      + '<b>语义层级 ≠ 视觉大小（P09）：</b>无论怎么设计，产品名在 HTML 里仍是 h1，标语是 h2——大小交给 CSS。';
    ana.classList.add('show');
  }
  else if (act === 'pm-tab') {
    var rootPm = el.closest('.card');
    var biPm = +rootPm.dataset.block;
    var pmB = DATA.projects[0].stages[0].blocks[biPm];
    var pi = +el.dataset.i;
    $all('.pm-tabs .pm-chip', rootPm).forEach(function (t) { t.classList.remove('active'); });
    el.classList.add('active');
    var idpPm = el.dataset.scope;
    var chipsEl = $('#' + idpPm + 'chips');
    chipsEl.innerHTML = pmB.pages[pi].modules.map(function (m, i) {
      return '<button class="pm-chip" data-action="pm-chip" data-m="' + i + '" data-scope="' + idpPm + '">' + esc(m.name) + '</button>';
    }).join('');
    $('#' + idpPm + 'detail').innerHTML = '点击上方任意模块查看详情 →';
    rootPm.dataset.page = pi;
  }
  else if (act === 'pm-chip') {
    var rootPm2 = el.closest('.card');
    var biPm2 = +rootPm2.dataset.block;
    var pmB2 = DATA.projects[0].stages[0].blocks[biPm2];
    var pageIdx = rootPm2.dataset.page ? +rootPm2.dataset.page : 0;
    pmShow(el.dataset.scope, pmB2, pageIdx, +el.dataset.m);
  }
  else if (act === 'principle-toggle') {
    el.closest('.p-item').classList.toggle('open');
  }
  else if (act === 'decision-pick') {
    var dIdx = +el.dataset.s;
    var dbk = blockFromEl(el);
    var scen = dbk.b.scenarios[dIdx];
    var rightKey = scen.answer === 0 ? 'a' : 'b';
    var dRow = el.closest('.lab-row');
    $all('.choice-btn', dRow).forEach(function (x) { x.disabled = true; });
    el.classList.add(el.dataset.k === rightKey ? 'sel-ok' : 'sel-no');
    var dCard = el.closest('.card');
    dCard.querySelector('[data-drev="' + dIdx + '"]').classList.add('show');
  }
  else if (act === 'hr-preset') {
    var hrCard = el.closest('.card');
    var hrIdp = el.closest('.block').querySelector('iframe[id$="frame"]').id.replace('frame', '');
    var hrFrame = $('#' + hrIdp + 'frame');
    var presetsEl = $('#' + hrIdp + 'presets');
    var presets = JSON.parse(presetsEl.value);
    var preset = presets.filter(function (p) { return p.v === el.dataset.v; })[0];
    $all('[data-action="hr-preset"]', hrCard).forEach(function (x) { x.classList.remove('sel-ok', 'sel-no', 'active'); });
    el.classList.add('active');
    var v = el.dataset.v;
    var urlEl = $('#' + hrIdp + 'url');
    var noteEl = $('#' + hrIdp + 'note');
    /* file:// + sandbox 下，iframe 内 fragment 导航会重建文档导致父页面失访。
       因此每次选 preset 都重新注入文档，再由平台执行等效的"滚动到锚点"。 */
    runFrame(hrFrame, hrFrame.getAttribute('srcdoc'), 'same');
    whenFrameLoaded(hrFrame, function () {
      var hDoc = hrFrame.contentDocument;
      var link = hDoc ? hDoc.getElementById('demoLink') : null;
      if (link) link.setAttribute('href', v);
      if (v.charAt(0) === '#' && hDoc) {
        var target = hDoc.getElementById(v.slice(1));
        if (target) target.scrollIntoView();
      }
    });
    if (v.charAt(0) === '#') {
      urlEl.textContent = '…/mini-page.html' + v;
      noteEl.innerHTML = '<b>' + esc(v) + '</b> — ' + esc(preset.note) + ' （迷你页已滚动到锚点——你也可以自己点里面的链接体验真实跳转。）';
    } else if (v.indexOf('https') === 0) {
      urlEl.textContent = v;
      noteEl.innerHTML = '<b>' + esc(v) + '</b> — ' + esc(preset.note);
    } else {
      urlEl.textContent = 'https://www.apple.com.cn' + v;
      noteEl.innerHTML = '<b>' + esc(v) + '</b> — ' + esc(preset.note);
    }
  }
  else if (act === 'st-set') {
    var stSeg = el.closest('.seg');
    $all('button', stSeg).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var stGrid = el.closest('.pg-grid');
    var stCta = $('[id$="-cta"]', stGrid);
    stCta.classList.remove('st-hover', 'st-focus', 'st-active');
    if (el.dataset.k !== 'default') stCta.classList.add('st-' + el.dataset.k);
    var stScope = el.closest('.block');
    $all('.st-note', stScope).forEach(function (n) {
      n.classList.toggle('show', n.dataset.st === el.dataset.k);
    });
  }
  else if (act === 'tl-set') {
    var tlSeg = el.closest('.seg');
    $all('button', tlSeg).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var tlScope = el.closest('.card');
    var tlInput = $('input[data-tl="dur"]', tlScope);
    tlInput.value = el.dataset.v;
    updateTransitionRead(tlScope.closest('.pg-grid'));
  }
  else if (act === 'tl-hover') {
    var tlCta = el.closest('.block').querySelector('.tl-cta');
    var on = el.classList.toggle('active');
    tlCta.classList.toggle('sim-hover', on);
    el.textContent = on ? '松开（移出 Hover）' : '模拟 Hover（按住不放）';
  }
  else if (act === 'ct-diag') {
    var ctGrid = el.closest('.pg-grid');
    diagnoseCta(ctGrid, el.closest('.card').querySelector('.cause-box'));
  }
  else if (act === 'ct-apple') {
    var ctg2 = el.closest('.pg-grid');
    appleCta(ctg2, el.closest('.card').querySelector('.cause-box'), el.closest('.card').querySelector('.lab-why'));
  }
  else if (act === 'cls-pick') {
    var clRow = el.closest('.cl-opts');
    $all('.cl-chip', clRow).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
  }
  else if (act === 'cls-reveal') {
    var dims = ['语义', 'CSS', '交互', '设计', '无障碍'];
    var clScope = el.closest('.card');
    var clIssues = [
      [0, '页内动作却没有按钮语义——无键盘、无播报（div 三无产品）。'],
      [0, '去别处应该用 a——导航语义才对。'],
      [1, 'color 与 background 对比度崩坏——纯 CSS 层面的可读性事故。'],
      [1, '间距归 CSS 管：margin 被清零导致动作糊在内容上。'],
      [2, '交互层缺失：用户得不到"可以点"的确认。'],
      [2, '交互节奏坏死——反馈迟了三秒，等于没有反馈。'],
      [3, '设计层：三个 Primary 抢注意力，行动层级崩塌（P05/P10）。'],
      [4, '无障碍：键盘用户的焦点环被没收（P12）。']
    ];
    clIssues.forEach(function (it, i) {
      var whyEl = clScope.querySelector('[data-clwhy="' + i + '"]');
      var picked = clScope.querySelectorAll('.cl-row')[i].querySelector('.cl-chip.active');
      var correct = dims[it[0]];
      whyEl.innerHTML = '<b>' + correct + '</b> · ' + it[1] + (picked && picked.textContent !== correct ? ' <span style="opacity:.7">（你选了 ' + picked.textContent + '）</span>' : '');
      whyEl.classList.add('show');
    });
  }
  else if (act === 'cls-reset') {
    var clScope2 = el.closest('.card');
    $all('.cl-chip', clScope2).forEach(function (x) { x.classList.remove('active'); });
    $all('.cl-why', clScope2).forEach(function (x) { x.classList.remove('show'); x.innerHTML = ''; });
  }
  else if (act === 'ml-pick') {
    var mlb = blockFromEl(el);
    var mlWhy = el.closest('.card').querySelector('.lab-why');
    $all('.choice-btn', el.closest('.lab-row')).forEach(function (x) { x.classList.remove('sel-ok', 'sel-no'); });
    var mlK = el.dataset.i;
    var okPick = mlK === 'subtle' || mlK === 'balanced';
    el.classList.add(okPick ? 'sel-ok' : 'sel-no');
    mlWhy.className = 'lab-why show ' + (okPick ? 'ok' : 'no');
    if (okPick) {
      mlWhy.innerHTML = '✓ ' + (mlK === 'subtle'
        ? 'Subtle 最接近 Apple：反馈只做确认，不抢内容（P11）。'
        : 'Balanced 也可以——颜色 + 1px 位移仍在克制范围内。两者的共同点：变化幅度小、时长短。');
    } else {
      mlWhy.innerHTML = '✗ 夸调动效让按钮变成主角，内容退场——违背 P01（焦点唯一）与 P11（反馈是确认不是表演）。偶尔用于营销活动页可以，产品 Hero 不合适。';
    }
  }
  else if (act === 'tc-reveal') {
    var tcGrid = el.closest('.pg-grid');
    var tcScope = el.closest('.card');
    var tcAna = tcScope.querySelector('.cause-box');
    var ptype = $('[data-tc="ptype"]', tcGrid).value;
    var pstyle = $('[data-tc="pstyle"]', tcGrid).value;
    var stype = $('[data-tc="stype"]', tcGrid).value;
    var sstyle = $('[data-tc="sstyle"]', tcGrid).value;
    tcAna.innerHTML = '<b>对照分析：</b><br>'
      + '· Primary「免费开始记录」：用户此刻最该做的事。你选了 ' + (ptype === 'a' ? 'a —— 去注册页，是导航，语义正确；' : 'button —— 原地弹注册框，也成立；') + '样式 ' + pstyle.toUpperCase() + (pstyle === 'filled' ? '，唯一的 filled ✓' : '（如果它真是最重要的动作，filled 更合适）') + '。<br>'
      + '· Secondary「了解 AI 功能」：' + (stype === 'a' ? 'a —— 去功能页 ✓；' : 'button —— 原地展开 ✓；') + '样式 ' + sstyle.toUpperCase() + (sstyle === 'filled' ? ' —— ⚠️ 两个 filled = 两个 Primary（P05）。' : '，让路给了 Primary ✓') + '<br>'
      + '<b>迁移要点：</b>顺序不能反——先定"用户此刻最该做什么"，再定层级，最后才选标签与样式。Apple 的样式可以换，这个顺序换不得。';
    tcAna.classList.add('show');
  }
  else if (act === 'iv-toggle') {
    el.closest('.iv-step').classList.toggle('open');
  }
  else if (act === 'src-preset') {
    var slScope = el.closest('.card');
    var slImg = $('#' + el.closest('.block').querySelector('img[id$="-img"]').id);
    var slBroken = $('#' + el.closest('.block').querySelector('[id$="-broken"]').id);
    var slStatus = $('#' + el.closest('.block').querySelector('[id$="-status"]').id);
    var slNote = $('#' + el.closest('.block').querySelector('[id$="-note"]').id);
    $all('.choice-btn', el.closest('.lab-row')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var slV = el.dataset.v;
    slImg.style.display = 'none';
    slBroken.style.display = 'none';
    slImg.onload = function () {
      slImg.style.display = 'block';
      slStatus.className = 'src-status ok';
      slStatus.textContent = '✓ 加载成功 · ' + slImg.naturalWidth + '×' + slImg.naturalHeight;
    };
    slImg.onerror = function () {
      slBroken.style.display = 'flex';
      $('#' + el.closest('.block').querySelector('[id$="-echo"]').id).textContent = 'alt: ' + (slImg.alt || '（alt 也是空的——彻底失明）');
      slStatus.className = 'src-status err';
      slStatus.textContent = '✗ 请求失败（404 或路径无法解析）';
    };
    slImg.src = slV;
    var srcPreset = { ok: '相对路径正确：基于当前页面位置解析，直接命中文件。', missing: '文件不存在：请求 404。注意看 broken image 下面显示的 alt——图片失败时它替图片"说话"。', abs: '以 / 开头的站内绝对路径在 file:// 下必然失败：它从"站点根"找起，而双击打开的页面没有站点根。部署到服务器（或本地开发服务器）后才能工作。' };
    slNote.innerHTML = '<b>' + esc(slV) + '</b> — ' + esc(slV.indexOf('/assets') === 0 ? srcPreset.abs : (slV.indexOf('product.png') >= 0 ? srcPreset.missing : srcPreset.ok));
  }
  else if (act === 'alt-pick') {
    var alScope = el.closest('.card');
    var alWhy = $('.lab-why', alScope);
    $all('.choice-btn', el.closest('.lab-row')).forEach(function (x) { x.classList.remove('sel-ok', 'sel-no'); });
    var alEcho = $('#' + el.closest('.block').querySelector('[id$="-echo"]').id);
    var alSr = $('#' + el.closest('.block').querySelector('[id$="-sr"]').id);
    var alSrText = $('#' + el.closest('.block').querySelector('[id$="-srtext"]').id);
    var alK = el.dataset.k;
    var altTexts = { empty: '', generic: '图片', thin: '手机', good: '酒红色 iPhone 18 Pro 正面产品视图，深色背景' };
    var alWhyTexts = {
      empty: '△ 装饰图才合法。这张图承担"产品长什么样"的核心信息——空 alt 让读屏器用户和加载失败的用户同时失去它。',
      generic: '✗ "图片"等于没说——读屏器用户听到的是噪音。',
      thin: '✗ "手机"太薄：什么手机？什么视角？页面语境里的关键信息全丢了。',
      good: '✓ 具体、克制、有信息量：什么产品 + 什么视角 + 什么环境。不堆关键词，为"听的人"而写。'
    };
    el.classList.add(alK === 'good' ? 'sel-ok' : (alK === 'empty' ? 'sel-no' : 'sel-no'));
    if (alK === 'empty') { el.classList.remove('sel-no'); el.classList.add('sel-ok'); el.textContent = 'alt=""（空）—— 装饰图合法，但本图不适用'; }
    alWhy.className = 'lab-why show ' + (alK === 'good' ? 'ok' : 'no');
    alWhy.innerHTML = alWhyTexts[alK];
    alEcho.textContent = 'alt: ' + (altTexts[alK] === '' ? '""（空）' : altTexts[alK]);
    var alStage = el.closest('.block').querySelector('.alt-stage');
    if (alStage) alStage.dataset.lastalt = alK;
    if (!alSr.hidden) { alSrText.textContent = altTexts[alK] === '' ? '（读屏器跳过这张图）' : '图像：' + altTexts[alK]; }
  }
  else if (act === 'alt-sr') {
    var alSr2 = $('#' + el.closest('.block').querySelector('[id$="-sr"]').id);
    alSr2.hidden = !alSr2.hidden;
    el.textContent = alSr2.hidden ? '读屏器模拟' : '关闭模拟';
    var alStage2 = el.closest('.block').querySelector('.alt-stage');
    var alSrText2 = $('#' + el.closest('.block').querySelector('[id$="-srtext"]').id);
    if (alStage2 && alSrText2) {
      var lk = alStage2.dataset.lastalt || 'empty';
      var map = { empty: '（读屏器跳过这张图）', generic: '图像：图片', thin: '图像：手机', good: '图像：酒红色 iPhone 18 Pro 正面产品视图，深色背景' };
      alSrText2.textContent = map[lk];
    }
  }
  else if (act === 'ad-width' || act === 'ad-mode') {
    var adScope = el.closest('.card');
    var adSeg = el.closest('.seg');
    $all('button', adSeg).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var adFrame = $('.ad-frame', adScope);
    if (act === 'ad-width') adFrame.dataset.w = el.dataset.w;
    else adFrame.dataset.mode = el.dataset.m;
    applyArtDir(adScope);
  }
  else if (act === 'dn-dpr') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    updateDensity(el.closest('.card'));
  }
  else if (act === 'sort-pick') {
    $all('.cl-chip', el.closest('.cl-opts')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
  }
  else if (act === 'sort-reveal') {
    var sob = blockFromEl(el);
    var soCard = el.closest('.card');
    sob.b.groups.forEach(function (g, gi) {
      g.items.forEach(function (it, i) {
        var whyEl = soCard.querySelector('[data-sortwhy="' + gi + '-' + i + '"]');
        var picked = soCard.querySelectorAll('.cl-row');
        var rowEl = null;
        $all('.cl-row', soCard).forEach(function (r) {
          if (r.querySelector('[data-sortwhy="' + gi + '-' + i + '"]')) rowEl = r;
        });
        var chosen = rowEl ? rowEl.querySelector('.cl-chip.active') : null;
        var correctText = it.options[it.correct];
        whyEl.innerHTML = '<b>' + esc(correctText) + '</b> · ' + esc(it.why) + (chosen && chosen.textContent !== correctText ? ' <span style="opacity:.7">（你选了 ' + esc(chosen.textContent) + '）</span>' : '');
        whyEl.classList.add('show');
      });
    });
  }
  else if (act === 'sort-reset') {
    var soCard2 = el.closest('.card');
    $all('.cl-chip', soCard2).forEach(function (x) { x.classList.remove('active'); });
    $all('.cl-why', soCard2).forEach(function (x) { x.classList.remove('show'); x.innerHTML = ''; });
  }
  else if (act === 'ft-fit') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var ftCard = el.closest('.card');
    var ftGrid = ftCard.closest('.pg-grid');
    var ftImg = $('img[id$="-img"]', ftGrid);
    ftImg.style.objectFit = el.dataset.v;
    updateFit(ftGrid);
  }
  else if (act === 'rt-set') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var rtStage = el.closest('.card').querySelector('.ratio-stage');
    rtStage.style.aspectRatio = el.dataset.r.replace('/', ' / ');
    var rtRead = el.closest('.card').querySelector('[id$="-read"]');
    var rtNotes = {
      '16/9': '当前 16:9 —— 桌面 Hero 的常见比例：产品与负空间完整呈现。',
      '4/3': '当前 4:3 —— 更高，裁切开始上下收紧，产品仍然完整。',
      '1/1': '当前 1:1 —— 卡片与社交场景常用；负空间被大幅压缩，文字落点开始紧张。',
      '9/16': '当前 9:16 —— 手机竖屏方向：桌面横构图在这里被裁得只剩局部——这正是 Art Direction 存在的理由（P15）。'
    };
    rtRead.innerHTML = rtNotes[el.dataset.r];
  }
  else if (act === 'trio-pick') {
    var trb = blockFromEl(el);
    var trAna = el.closest('.block').querySelector('.design-analysis');
    $all('.trio-card', el.closest('.trio-grid')).forEach(function (c) {
      c.classList.remove('correct', 'wrong');
      if (c.dataset.k === trb.b.correct) c.classList.add('correct');
      else if (c !== el) c.classList.add('wrong');
    });
    trAna.classList.add('show');
    toast(el.dataset.k === trb.b.correct ? '✓ 判断正确' : '✗ 看分析');
  }
  else if (act === 'rc-mode') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var rcWrap = el.closest('.card').querySelector('.rc-wrap');
    rcWrap.dataset.mode = el.dataset.m;
    var rcOpWrap = el.closest('.card').querySelector('[id$="-opwrap"]');
    rcOpWrap.style.display = el.dataset.m === 'overlay' ? 'flex' : 'none';
  }
  else if (act === 'tm-img') {
    var tmWhy = el.closest('.card').querySelector('[id$="-imgwhy"]');
    $all('.trio-card', el.closest('.trio-grid')).forEach(function (c) {
      c.classList.remove('sel-ok', 'sel-no');
    });
    var tmOk = el.dataset.k === 'studio';
    el.classList.add(tmOk ? 'sel-ok' : 'sel-no');
    tmWhy.className = 'lab-why show ' + (tmOk ? 'ok' : 'no');
    tmWhy.innerHTML = tmOk
      ? '✓ 棚拍光影 + 负空间——录音硬件也需要"专注感"的场景表达（P06/P13）。'
      : '✗ 杂乱/平光的素材撑不起产品气质——回头看看 Asset Is the Design 实验（P06）。';
  }
  else if (act === 'tm-reveal') {
    var tmGrid = el.closest('.card');
    var tmAna = tmGrid.querySelector('.cause-box');
    var g = function (k) { return $('[data-tm="' + k + '"]', tmGrid); };
    tmAna.innerHTML = '<b>对照分析：</b><br>'
      + '· Desktop 裁切：' + (g('crop').value === 'natural' ? '保持原生比例 ✓——素材本身就是按目标构图准备的，乱加电影感裁切是"为了高级而高级"。' : '强制 21:9 会切掉上下内容——除非素材天生为宽幅准备，否则慎用。') + '<br>'
      + '· Mobile 构图：' + (g('mobile').value === 'art' ? '换竖版构图 ✓（P15）——录音设备是竖直主体，竖构图反而更对味。' : '同图硬缩——主体变小，负空间失去意义。') + '<br>'
      + '· 文字位置：' + (g('text').value === 'neg' ? '落负空间 ✓（P14）。' : '压在产品上——图文打架。') + '<br>'
      + '· alt 策略：' + (g('alt').value === 'desc' ? '具体描述 ✓——为听的人写，不为搜索引擎堆词。' : '关键词堆砌——读屏器用户听到的是噪音，搜索引擎也会降权。') + '<br>'
      + '<b>迁移要点：</b>媒体策略 = 素材选择 → 构图（Desktop/Mobile）→ 文字关系 → 语义（alt）。四步顺序与 Apple 的做法同构，产品换了照样成立。';
    tmAna.classList.add('show');
  }
  else if (act === 'fx-dir') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    applyFlex(el.closest('.card'));
  }
  else if (act === 'jp-foreach') {
    var feOut = el.closest('.card').querySelector('[id$="feOut"]');
    if (!feOut) return;
    var colors = ['burgundy', 'glacier', 'silver'];
    var html = '';
    colors.forEach(function (c, i) {
      setTimeout(function () {
        html += '<div>[' + i + '] → ' + c + ' ✓</div>';
        feOut.innerHTML = html;
      }, i * 400);
    });
    setTimeout(function () { feOut.innerHTML += '<div style="color:#30d158;font-weight:700">forEach 完成——3 项各执行了一次</div>'; }, 1300);
  }
  else if (act === 'km-jump') {
    showStage(el.dataset.stage);
  }
  else if (act === 'asm-download') {
    var html = window.FINAL_PAGE_HTML || '';
    var blob = new Blob([html], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'iphone-18-pro-replica.html';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('↓ iphone-18-pro-replica.html 已下载——保存到你的 project/ 目录');
  }
  else if (act === 'asm-copy') {
    var html2 = window.FINAL_PAGE_HTML || '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(html2).then(function () { toast('✓ 完整 HTML 已复制到剪贴板'); }).catch(function () {
        toast('复制失败——请用"查看完整 HTML 源码"手动复制');
      });
    } else {
      var src = document.getElementById('finalSource');
      if (src) { src.select(); document.execCommand('copy'); toast('✓ 已复制'); }
    }
  }
  else if (act === 'au-set') {
    var row = el.closest('.audit-row');
    $all('.au-btn', row).forEach(function (b2) { b2.setAttribute('aria-pressed', 'false'); b2.style.opacity = '.5'; });
    el.setAttribute('aria-pressed', 'true');
    el.style.opacity = '1';
    row.querySelector('.au-badge:not(.covered-b):not(.pass):not(.review)')?.remove();
    var isPass = el.dataset.audit === 'pass';
    var badge = row.querySelector('.au-badge:not(.covered-b)');
    if (badge) {
      badge.textContent = isPass ? 'Pass' : 'Needs Review';
      badge.className = 'au-badge ' + (isPass ? 'pass' : 'review');
    }
  }
  else if (act === 'design2-pick') {
    $all('.design-opt', el.closest('.design-opts')).forEach(function (o) { o.classList.remove('correct', 'wrong'); });
    el.classList.add('selected');
  }
  else if (act === 'design2-why') {
    var dq2 = el.closest('[data-dq2]');
    var rc = dq2.querySelector('.reason-checklist');
    var ana = dq2.querySelector('.design-analysis');
    rc.style.display = rc.style.display === 'none' ? 'block' : 'none';
    ana.classList.add('show');
  }
  else if (act === 'tb-mode') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var tbl = el.closest('.card').querySelector('.tbl-demo');
    var read = el.closest('.card').querySelector('[id$="-read"]');
    if (el.dataset.v === 'bare') {
      tbl.classList.add('bare');
      if (read) read.innerHTML = '⚠️ 无 th 模式：表头只是"碰巧加粗的文字"——读屏器没有列坐标，表格模式失效。真实页面请永远给表头 th + scope。';
    } else {
      tbl.classList.remove('bare');
      if (read) read.innerHTML = '✓ 语义模式：th + scope 让每个单元格都有"行列坐标"，读屏器表格模式全速工作。';
    }
  }
  else if (act === 'rs-w') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var rsFrame = el.closest('.card').querySelector('iframe');
    rsFrame.style.width = Math.min(+el.dataset.w, rsFrame.parentElement.clientWidth - 20) + 'px';
    var wOut = el.closest('.card').querySelector('[id$="-w"]');
    if (wOut) wOut.textContent = '当前视口 ' + el.dataset.w + 'px';
  }
  else if (act === 'mc-play') {
    var mcScope = el.closest('.card');
    ['a', 'b', 'c'].forEach(function (k) {
      var bx = mcScope.querySelector('[id$="-' + k + '"]');
      if (bx) bx.classList.add('play');
    });
  }
  else if (act === 'mc-reset') {
    var mcScope2 = el.closest('.card');
    mcScope2.querySelectorAll('.mc-box').forEach(function (bx) { bx.classList.remove('play'); });
  }
  else if (act === 'mc-pick') {
    var mcWhy = el.closest('.card').querySelector('.lab-why');
    $all('.choice-btn', el.closest('.seg')).forEach(function (x) { x.classList.remove('sel-ok', 'sel-no'); });
    var okMc = el.dataset.v === 'subtle';
    el.classList.add(okMc ? 'sel-ok' : 'sel-no');
    mcWhy.className = 'lab-why show ' + (okMc ? 'ok' : 'no');
    mcWhy.textContent = okMc
      ? '✓ Subtle：淡入 + 小位移——确认内容到达，不抢内容本身的风头。'
      : (el.dataset.v === 'none' ? '△ No Motion 不算错（信息工具页的选择），但产品叙事页少了"到达感"。' : '✗ 夸张动效让每个模块都在喊"看我"——长页滚下来像马戏团（P11）。');
  }
  else if (act === 'gp-cols') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    applyGrid(el.closest('.card'));
  }
  else if (act === 'vd-toggle') {
    applyVideo(el.closest('.pg-grid'));
  }
  else if (act === 'au-pick') {
    var auRow = el.closest('.lab-row');
    $all('.choice-btn', auRow).forEach(function (x) { x.disabled = true; });
    var auI = +el.dataset.i;
    var auAnswers = ['auto', 'user', 'user', 'auto'];
    var ok = el.dataset.v === auAnswers[auI];
    el.classList.add(ok ? 'sel-ok' : 'sel-no');
    var auWhy = el.closest('.card').querySelector('[data-auwhy="' + auI + '"]');
    auWhy.className = 'lab-why show ' + (ok ? 'ok' : 'no');
    auWhy.textContent = (ok ? '✓ ' : '✗ ') + ['自动播放。它是舞台灯光——静音、循环、不打扰。', '用户点击。长视频有声音有叙事——控制权必须归用户。', '默认不播。这是"读"的区域——任何运动都是阅读干扰（P01）。', '可自动播放（静音+行内），但用 IntersectionObserver 控制进出视口暂停——Stage 12 的伏笔。'][auI];
  }
  else if (act === 'ly-side' || act === 'ly-stack' || act === 'ly-align') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    applyLayout(el.closest('.pg-grid'));
  }
  else if (act === 'ps-mode') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    applyPosition(el.closest('.pg-grid'));
  }
  else if (act === 'sk-down' || act === 'sk-up') {
    var skBox = el.closest('.pg-grid').querySelector('.sk-scroll');
    skBox.scrollTop = act === 'sk-down' ? skBox.scrollHeight : 0;
    updateSticky(skBox.closest('.pg-grid'));
  }
  else if (act === 'sk-break') {
    var skBox2 = el.closest('.pg-grid').querySelector('.sk-scroll');
    skBox2.dataset.broken = skBox2.dataset.broken === '1' ? '0' : '1';
    el.classList.toggle('active');
    el.textContent = skBox2.dataset.broken === '1' ? '已破坏（点击恢复）' : '一键制造失效（overflow:hidden）';
    updateSticky(skBox2.closest('.pg-grid'));
  }
  else if (act === 'sk-top') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    updateSticky(el.closest('.pg-grid'));
  }
  else if (act === 'cw-center') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    applyContainer(el.closest('.card'));
  }
  else if (act === 'ri-width') {
    $all('button', el.closest('.seg')).forEach(function (x) { x.classList.remove('active'); });
    el.classList.add('active');
    var riIdp = el.closest('.card').querySelector('iframe[id$="frame"]').id.replace('frame', '');
    var riFrame = $('#' + riIdp + 'frame');
    riFrame.style.width = Math.min(+el.dataset.w, riFrame.parentElement.clientWidth - 8) + 'px';
    clearTimeout(riFrame._t);
    riFrame._t = setTimeout(function () {
      var d = null;
      try { d = riFrame.contentDocument; } catch (e) {}
      if (!d || !d.querySelector('img')) {
        $('#' + riIdp + 'w').textContent = el.dataset.w + 'px';
        $('#' + riIdp + 'match').textContent = '（重新打开本页后可读取）';
        return;
      }
      var im = d.querySelector('img');
      var isMobile = riFrame.contentWindow.matchMedia('(max-width: 734px)').matches;
      $('#' + riIdp + 'w').textContent = riFrame.contentWindow.innerWidth + 'px';
      $('#' + riIdp + 'dpr').textContent = riFrame.contentWindow.devicePixelRatio + 'x';
      $('#' + riIdp + 'match').textContent = isMobile ? 'mobile source（max-width:734px 生效）' : 'desktop img（fallback / srcset 候选）';
      $('#' + riIdp + 'cur').textContent = (im.currentSrc || im.src).split('/').pop();
      $('#' + riIdp + 'nat').textContent = im.naturalWidth + ' × ' + im.naturalHeight;
      $('#' + riIdp + 'rw').textContent = Math.round(im.getBoundingClientRect().width) + 'px';
    }, 500);
  }
});

/* click 高亮 for domviz regions & title tab etc. */
document.addEventListener('click', function (ev) {
  var r = ev.target.closest('[data-r]');
  if (r && !ev.target.closest('[data-action]')) {
    var grid = r.closest('.dom-grid');
    if (grid) {
      var idp = grid.querySelector('[id^="dv-"]').id.replace(/tree$/, '');
      dvHighlight(idp, r.dataset.r);
    }
  }
});

function dvHighlight(idp, nodeId) {
  $all('.dom-node', $('#' + idp + 'tree')).forEach(function (n) { n.classList.remove('hl'); });
  $all('[data-r]').forEach(function (n) { n.classList.remove('rhl'); });
  var tn = $('#' + idp + 'tree [data-id="' + nodeId + '"]');
  if (tn) tn.classList.add('hl');
  var rg = document.querySelector('[data-r="' + nodeId + '"]');
  if (rg) rg.classList.add('rhl');
  var b = findDomvizBlock(idp);
  var note = b && b.notes[nodeId];
  $('#' + idp + 'cap').innerHTML = '<b>' + esc(nodeId) + '</b> — ' + (note || '（无说明）');
}

/* 由 idp 反查数据块（仅 Stage 1 用得到，通用实现） */
function findBlockByIdp(idp) {
  /* idp 形如 ch-stage-1-9-（Project A challenge/debug）或 ax-stage-b3-2-（Project B assisted） */
  var m = idp.match(/^(?:ch|ax)-([a-z0-9-]+)-(\d+)-$/);
  if (!m) return null;
  var fl = getStage(m[1]);
  if (!fl) return null;
  var b = fl.stage.blocks[+m[2]];
  return b;
}
function findDomvizBlock(idp) {
  var m = idp.match(/^dv-([a-z0-9-]+)-(\d+)-$/);
  if (!m) return null;
  var fl = getStage(m[1]);
  return fl ? fl.stage.blocks[+m[2]] : null;
}
function findQuizBlock(sid, qEl) {
  var wrap = qEl.closest('[id^="blk-"]');
  var m = wrap.id.match(/^blk-([a-z0-9-]+)-(\d+)$/);
  var fl = getStage(m[1]);
  var bi = +m[2];
  var b = fl.stage.blocks[bi];
  b._bi = bi;
  return b;
}

/* checklist change */
document.addEventListener('change', function (ev) {
  var t = ev.target;
  if (t.matches('input[data-action="cl"]')) {
    var sid = state.current;
    var i = +t.dataset.i;
    var arr = state.checklists[sid] || [];
    arr[i] = t.checked;
    state.checklists[sid] = arr;
    save();
    var card = t.closest('.card');
    var total = $all('input[data-action="cl"]', card).length;
    var done = $all('input[data-action="cl"]', card).filter(function (x) { return x.checked; }).length;
    $('[data-clp]', card).textContent = '已完成 ' + done + ' / ' + total;
    if (done === total) toast('🎉 Checklist 全部完成——记得点下方「标记学会」');
  }
});

document.addEventListener('scroll', function (ev) {
  var t = ev.target;
  if (t && t.classList && t.classList.contains('sk-scroll')) updateSticky(t.closest('.pg-grid'));
}, true);

/* editor input → 自动运行（防抖）+ 实验室控件实时预览 */
document.addEventListener('input', function (ev) {
  var t = ev.target;
  if (!t.matches) return;
  if (t.matches('textarea.editor')) {
    var idp = t.id.replace('code', '');
    var frame = $('#' + idp + 'frame');
    clearTimeout(t._tm);
    t._tm = setTimeout(function () { runFrame(frame, t.value, challengeMode(idp)); }, 500);
  }
  if (t.matches('input[type="text"][id^="lab-"]')) updateTitleLab(t);
  if (t.matches('input[type="range"][data-cssdemo]')) {
    var target = $('#' + t.dataset.target);
    if (target) {
      if (t.dataset.cssdemo === 'lh') target.style.lineHeight = (t.value / 100);
      if (t.dataset.cssdemo === 'ls') target.style.letterSpacing = t.value + 'px';
    }
    return;
  }
  if (t.matches('input[data-tl="dur"]')) { updateTransitionRead(t.closest('.pg-grid')); return; }
  if (t.matches('input[data-tc]')) { applyTransferCta(t.closest('.pg-grid')); return; }
  if (t.matches('input[data-ft]')) { updateFit(t.closest('.pg-grid')); return; }
  if (t.matches('input[data-cp]')) { applyCompose(t.closest('.pg-grid')); return; }
  if (t.id && t.id.indexOf('jp-') === 0) {
    var out = $('#' + t.id + 'Out') || $('#' + t.id.replace('In', 'Out'));
    if (t.id.indexOf('varIn') >= 0) {
      out.innerHTML = 'color → <b>"' + esc(t.value || 'undefined') + '"</b>';
    } else if (t.id.indexOf('fnIn') >= 0) {
      out.textContent = '"Hello ' + (t.value || '?') + '"';
    }
    return;
  }
  if (t.matches('input[data-io]')) { initIoViz(t.closest('.card')); return; }
  if (t.matches('input[data-gp]')) { applyGrid(t.closest('.card')); return; }
  if (t.matches('input[data-vd]')) { applyVideo(t.closest('.pg-grid')); return; }
  if (t.matches('input[data-ly]')) { applyLayout(t.closest('.pg-grid')); return; }
  if (t.matches('input[data-ps]')) { applyPosition(t.closest('.pg-grid')); return; }
  if (t.matches('input[data-zx]')) {
    var zxGrid0 = t.closest('.pg-grid');
    var zxLayer = zxGrid0 && zxGrid0.querySelector('[id$="-' + t.dataset.zx + '"]');
    if (zxLayer) zxLayer.style.zIndex = t.value;
    var zxOut = $('#' + t.id + 'v');
    if (zxOut) zxOut.textContent = t.value;
    var zxCard = t.closest('.card');
    var zxRead = zxCard.querySelector('[id$="-read"]');
    if (zxRead) {
      var cv = $('input[data-zx="content"]', zxCard).value;
      var iv = $('input[data-zx="image"]', zxCard).value;
      var sv = $('input[data-zx="subnav"]', zxCard).value;
      zxRead.innerHTML = '当前层序：内容 ' + cv + ' · 图片 ' + iv + ' · 子导航 ' + sv + ' —— 数字大者在上。试试把"图片"拉到 30：它压过子导航了吗？（同级比数字——这就是全部规则，层叠上下文的"世界边界"以后再深挖。）';
    }
    return;
  }
  if (t.matches('input[data-fx]')) { applyFlex(t.closest('.card')); return; }
  if (t.matches('input[data-cw]')) { applyContainer(t.closest('.card')); return; }
  if (t.matches('input[data-cl]')) { applyClamp(t.closest('.pg-grid') || t.closest('.card')); return; }
  if (t.matches('input[data-hb]')) { applyHeroBalance(t.closest('.pg-grid')); return; }
  if (t.matches('input[data-rc]')) {
    var rcImg = $('img[alt="教学实现的产品视觉"]');
    var rcOut = $('#' + t.id + 'v');
    if (rcImg) rcImg.style.opacity = t.value / 100;
    if (rcOut) rcOut.textContent = t.value + '%';
    return;
  }
  if (t.id && t.id.indexOf('tp-') === 0) applyTypo(t.closest('.pg-grid'));
  else if (t.id && t.id.indexOf('sp-') === 0) applySpace(t.closest('.pg-grid'));
  else if (t.matches('[data-tf]')) applyTransfer(t.closest('.pg-grid'));
  if (t.id === 'searchInput') doSearch(t.value);
});
document.addEventListener('change', function (ev) {
  var t = ev.target;
  if (t.matches && t.matches('select[data-tf]')) applyTransfer(t.closest('.pg-grid'));
  if (t.matches && t.matches('select[data-fx]')) applyFlex(t.closest('.card'));
  if (t.matches && t.matches('select[data-cta-sel]')) applyCtaLab(t.closest('.pg-grid'));
  if (t.matches && t.matches('select[data-tc]')) applyTransferCta(t.closest('.pg-grid'));
  if (t.matches && t.matches('#stageView select[id^="tp-"]')) applyTypo(t.closest('.pg-grid'));
});

/* ---------- 搜索 ---------- */
var INDEX = null;
function buildIndex() {
  INDEX = [];
  FLAT.forEach(function (fl) {
    var st = fl.stage, proj = fl.project;
    INDEX.push({ stage: st.id, label: st.title, blk: null, hay: (proj.name + ' Stage ' + st.num + ' ' + st.title + ' ' + (st.plan || '') + ' ' + (st.tags || []).join(' ')).toLowerCase() });
    (st.blocks || []).forEach(function (b, bi) {
      var push = function (label, extra) {
        INDEX.push({ stage: st.id, label: label, blk: bi, hay: (label + ' ' + (extra || '')).toLowerCase() });
      };
      if (b.type === 'taglab') b.tags.forEach(function (t) { push(t.tag + ' · ' + t.cn, [t.one, t.what, t.when, t.href, t.kinds, t.vs, t.errs].join(' ')); });
      else if (b.type === 'csslab') b.props.forEach(function (p) { push(p.name + ' · ' + p.cn, p.what); });
      else if (b.type === 'judge') b.scenarios.forEach(function (s) { push(s.q.slice(0, 34), ''); });
      else if (b.type === 'observe') b.items.forEach(function (it) { push(it.q, ''); });
      else if (b.type === 'quiz') b.questions.forEach(function (q) { push(q.q.slice(0, 30), ''); });
      else if (b.type === 'pagemap') b.pages.forEach(function (p) { p.modules.forEach(function (m) { push(m.name + '（' + p.name + '）', m.what); }); });
      else if (b.type === 'principles') DATA.principles.forEach(function (p) { push(p.id + ' ' + p.name, p.cn + ' ' + p.one); });
      else if (b.title) push(b.title, b.lead || b.task || b.story || '');
    });
  });
}
function doSearch(q) {
  var box = $('#searchResults');
  q = q.trim().toLowerCase();
  if (!q) { box.hidden = true; return; }
  if (!INDEX) buildIndex();
  var hits = INDEX.filter(function (e) { return e.hay.indexOf(q) >= 0; }).slice(0, 12);
  var stMap = {};
  FLAT.forEach(function (fl) { stMap[fl.stage.id] = fl; });
  box.innerHTML = hits.length
    ? hits.map(function (e, i) {
        var fl = stMap[e.stage];
        return '<button class="sr-item" data-action="sr-go" data-stage="' + e.stage + '" data-blk="' + (e.blk == null ? '' : e.blk) + '">'
          + '<div class="sr-stage">' + esc(fl.project.name) + ' · Stage ' + fl.stage.num + '</div>'
          + '<div class="sr-label">' + esc(e.label) + '</div></button>';
      }).join('')
    : '<div style="padding:14px;color:var(--ink3);font-size:13.5px">没有找到「' + esc(q) + '」相关知识点</div>';
  box.hidden = false;
}
document.addEventListener('click', function (ev) {
  var el = ev.target.closest('[data-action="sr-go"]');
  if (!el) return;
  $('#searchResults').hidden = true;
  $('#searchInput').value = '';
  showStage(el.dataset.stage, el.dataset.blk === '' ? null : +el.dataset.blk);
});
document.addEventListener('keydown', function (ev) {
  if (ev.key === 'Escape') { var sr = $('#searchResults'); if (sr) sr.hidden = true; }
  var tag = (ev.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  var isInteractive = ev.target.closest && ev.target.closest('button, a, [tabindex="0"], iframe');
  if (isInteractive) return;
  if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
    var i = flatOf(state.current);
    if (i < 0) return;
    var n = ev.key === 'ArrowLeft' ? i - 1 : i + 1;
    if (n >= 0 && n < FLAT.length) showStage(FLAT[n].stage.id);
  }
});

/* ---------- 路由 ---------- */
function showStage(id, blk) {
  state.current = id;
  save();
  renderStage(id);
  if (blk != null) {
    var el = $('#blk-' + id + '-' + blk);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var inner = el.firstElementChild;
      if (inner) { inner.classList.add('flash'); setTimeout(function () { inner.classList.remove('flash'); }, 1700); }
    }
  } else {
    var h = '#'.concat(id);
    if (location.hash !== h) history.replaceState(null, '', h);
  }
}
window.addEventListener('hashchange', function () {
  var id = location.hash.replace('#', '') || 'home';
  if (id !== state.current && (id === 'home' || id === 'exam' || getStage(id))) renderStage(id);
});

/* ---------- 侧栏开合（移动端） ---------- */
function closeSidebar() { $('#sidebar').classList.remove('open'); $('#scrim').hidden = true; }
$('#menuBtn').addEventListener('click', function () {
  var sb = $('#sidebar');
  var open = sb.classList.toggle('open');
  $('#scrim').hidden = !open;
});
$('#scrim').addEventListener('click', closeSidebar);

/* Skip link：focus 内容区而非触发 hash 路由 */
document.querySelector('.skip').addEventListener('click', function (e) {
  e.preventDefault();
  var sv = document.getElementById('stageView');
  if (sv) { sv.focus({ preventScroll: false }); sv.scrollIntoView({ block: 'start' }); }
});

/* ---------- 启动 ---------- */
var startId = location.hash.replace('#', '') || state.current || 'home';
/* v1.0.1：#exam 是合法路由。锁定页/考题的保护由 renderExam 内部按 doneCount 决定——
   锁定者首载 #exam 看到 Locked 页（而不是被静默弹回首页），解锁者刷新仍可进入。 */
if (startId !== 'exam' && flatOf(startId) < 0 && startId !== 'home') startId = 'home';
renderStage(startId);

/* 开发期守护：关键渲染器签名断言（防"同名后定义覆盖前者"让某关实验室消失）
   v1.0.1 修复：此前该守护在主 IIFE 之外引用闭包内的 R，导致每次加载都抛
   "Uncaught ReferenceError: R is not defined"——断言从未真正执行过。 */
(function () {
  var EXPECT = [
    ['statelab', 'st-set'],      // S3 四态实验室（若被 S11 版覆盖会丢 st-set）
    ['statesync', 'stlab'],      // S11 状态同步双 iframe
    ['challenge', 'Coding Challenge'], // 挑战编辑器
    ['audit', 'audit-row']       // S14 毕业自查
  ];
  EXPECT.forEach(function (pair) {
    var f = R[pair[0]];
    var src = f ? f.toString() : '';
    if (!f || src.indexOf(pair[1]) === -1) {
      console.warn('[dev] 渲染器签名异常: R.' + pair[0] + ' 未包含 "' + pair[1] + '" —— 可能被同名后定义覆盖');
    }
  });
})();
})();

