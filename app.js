const ANALYSIS_AS_OF = '2026-10-06';
const PROVINCE_DATA = {
  '北京':{pv:224.6},'天津':{pv:1052.8},'河北':{pv:8567.3},'山西':{pv:5048.2},'内蒙古':{pv:6149.1},'辽宁':{pv:1589.9},'吉林':{pv:748.0},'黑龙江':{pv:924.5},'上海':{pv:653.9},'江苏':{pv:9458.1},'浙江':{pv:6662.7},'安徽':{pv:5770.1},'福建':{pv:1816.7},'江西':{pv:2933.4},'山东':{pv:9573.2},'河南':{pv:5874.5},'湖北':{pv:4615.1},'湖南':{pv:2831.7},'广东':{pv:6543.7},'广西':{pv:3314.8},'海南':{pv:980.4},'重庆':{pv:629.5},'四川':{pv:2422.7},'贵州':{pv:2945.5},'云南':{pv:6069.0},'西藏':{pv:584.2},'陕西':{pv:4239.1},'甘肃':{pv:3888.3},'青海':{pv:4284.2},'宁夏':{pv:4396.6},'新疆':{pv:9278.6},'台湾':{pv:null}
};
const PROVINCE_MAX_PV = 9573.2;
const PROVINCE_SOURCE = '国家能源局口径公开数据整理（2026年一季度累计光伏并网容量，单位：万千瓦）';

const DATA = {
  project: {
    id: 'Lukou',
    name: '南京江宁禄口共享储能项目',
    shortName: '禄口共享储能',
    aliases: ['京能江苏共享储能项目', '南京江宁区禄口储能项目'],
    industry: '储能 / 电网与配电',
    location: '江苏省南京市江宁区禄口街道',
    status: '历史案例 / 供应商研究',
    statusTone: 'neutral',
    latestEvent: '2025-12-23 并网',
    description: '一个已并网的真实案例，用来演示如何沿设备供应链寻找合作对象，保留容量口径差异，并把产品族关联与型号适配分开。'
  },
  events: [
    { id: 'EVT-001', type: '项目建设', title: '项目成功并网', date: '2025-12-23', status: '历史案例', subject: '京能国际江苏南京江宁区禄口50MW/100MWh储能项目', source: 'S01', note: '并网公告容量与技术背景；不等于每个零部件的最终规格。' },
    { id: 'EVT-002', type: '设备采购', title: '储能系统招标发布', date: '2025-07-22', status: '已结束', subject: '55MW/110MWh储能系统招标', source: 'S02', note: '规划容量口径；页面为行业媒体转载。' },
    { id: 'EVT-003', type: '候选公示', title: '储能设备采购候选公示', date: '2025-09-12', status: '待核验', subject: '第一中标候选人：江苏林洋储能技术有限公司', source: 'S03', note: '候选人不自动等于最终中标、签约或实际供货。' },
    { id: 'EVT-004', type: 'EPC采购', title: 'EPC候选人公示', date: '2025-09-25', status: '待核验', subject: 'EPC不含储能设备采购；甲供边界清晰', source: 'S04', note: '储能设备与EPC供货角色拆开记录。' },
    { id: 'EVT-005', type: '年度寻源', title: '年度接插件寻源截止', date: '2025-05-08', status: '已截止', subject: '江苏林洋储能技术有限公司 2025年度招标寻源', source: 'S05', note: '支持企业级需求研究，项目级使用关系仍未确认。' }
  ],
  entities: [
    { id: 'ENT-001', name: '北京京能国际控股有限公司', role: '采购报道所列招标主体', tag: '招标主体', evidence: 'S04', location: '北京', note: '与项目业主法人字段分开保留。' },
    { id: 'ENT-002', name: '江苏林洋储能技术有限公司', role: '储能设备采购第一候选人；年度接插件寻源方', tag: '优先核验', evidence: 'S03 · S05', location: '江苏南通', note: '产品合作对象待核验；未确认已供货。' },
    { id: 'ENT-003', name: '江苏林洋电力服务有限公司', role: 'EPC候选联合体成员', tag: 'EPC候选', evidence: 'S04', location: '江苏', note: '独立法人实体，不与林洋储能技术公司合并。' },
    { id: 'ENT-004', name: '中国电建集团华东勘测设计研究院有限公司', role: 'EPC候选联合体成员', tag: 'EPC候选', evidence: 'S04', location: '杭州', note: '工程供货边界研究对象。' },
    { id: 'ENT-005', name: '南京南瑞继保工程技术有限公司', role: '储能设备采购其他候选人', tag: '相关系统企业', evidence: 'S03', location: '南京', note: '不写成已供货企业。' },
    { id: 'ENT-006', name: '厦门科华数能科技有限公司', role: '储能设备采购其他候选人', tag: '相关系统企业', evidence: 'S03', location: '厦门', note: '不写成已供货企业。' },
    { id: 'ENT-007', name: '具体柜体厂 / 连接器实际采购单位', role: '当前材料未确认', tag: '信息缺失', evidence: '—', location: '未确认', note: '列入待核验清单。' }
  ],
  products: [
    { id: 'PF-001', name: 'BPC 等储能连接器', category: '连接与布线', state: '产品族相关', tone: 'teal', basis: ['F01', 'F05', 'F06a'], gaps: ['连接位置', '实际工作电压 / 电流', '线径与温升', '接口、配对件与认证'], source: 'S06a', action: '取得系统图与关键部件参数，再做型号级选型。' },
    { id: 'PF-002', name: '控制柜端子、电源与保护', category: '控制与供电', state: '应用层关联', tone: 'blue', basis: ['F01', 'F06b'], gaps: ['实际物料清单', '控制柜厂家', '选型与采购权限'], source: 'S06b', action: '核验控制柜供应边界和既有产品替换空间。' },
    { id: 'PF-003', name: '工业通信产品', category: '通信与网络', state: '应用层关联', tone: 'violet', basis: ['F01', 'F06b'], gaps: ['协议与网络架构', '环境要求', '既有设备与改造需求'], source: 'S06b', action: '确认系统集成商、协议和现场网络边界。' }
  ],
  sources: [
    { id: 'S01', title: '京能国际江苏南京江宁区禄口50MW/100MWh储能项目成功并网', type: '企业 / 集团官方页面', publisher: '京能国际', published: '2025-12-23', accessed: '2026-10-06', status: '已读取', verified: true, url: 'https://www.bjei.com/cn/index.php/show-4699.html', claims: ['F01'], summary: '公布并网日期、50MW/100MWh容量、1500V直流系统与液冷技术。' },
    { id: 'S02', title: '招标｜55MW/110MWh！京能江苏共享储能项目储能系统招标！', type: '行业媒体转载', publisher: '国际储能网（标注来源：北京京能电子商务平台）', published: '2025-07-23', accessed: '2026-10-06', status: '转载待核验', verified: false, url: 'https://chuneng.in-en.com/html/chunengy-46954.shtml', claims: ['F02'], summary: '报道规划容量与招标事件；保留转载身份。' },
    { id: 'S03', title: '林洋储能预中标京能江苏共享储能项目55MW/110MWh储能系统采购', type: '行业媒体整理', publisher: '碳索储能网', published: '2025-09-12', accessed: '2026-10-06', status: '转载待核验', verified: false, url: 'https://cn.solarbe.com/news/20250912/50008436.html', claims: ['F03'], summary: '列出第一候选人江苏林洋储能技术有限公司及其他候选人。' },
    { id: 'S04', title: '不含储能设备采购！京能江苏南京50MW/100MWh共享储能项目EPC中标候选人公示', type: '行业媒体转载', publisher: '世纪新能源网（标注来源：中国招标投标公共服务平台）', published: '2025-09-26', accessed: '2026-10-06', status: '转载待核验', verified: false, url: 'https://www.ne21.com/news/show-219718.html', claims: ['F04'], summary: '说明EPC不含储能设备采购，并列出EPC候选联合体。' },
    { id: 'S05', title: '江苏林洋储能技术有限公司2025年度招标寻源公告', type: '协会刊载企业公告', publisher: '中关村储能产业技术联盟', published: '2025-04-23', accessed: '2026-10-06', status: '已读取', verified: true, url: 'https://www.cnesa.org/activity/detail/?column_id=4&id=7017', claims: ['F05'], summary: '接插件列入RACK级原材料范围，报名截止日为2025-05-08；“1970-01-01”是占位字段。' },
    { id: 'S06a', title: '用于储能模块系统的连接器', type: '厂商官方产品页', publisher: '菲尼克斯电气', published: '未明确', accessed: '2026-10-06', status: '已读取', verified: true, url: 'https://www.phoenixcontact.com/zh-cn/products/connector/connectors-for-energy-storage-systems', claims: ['F06'], summary: '公开BPC及其他储能连接产品族与参数方向。' },
    { id: 'S06b', title: '适用于工商业及源网侧储能系统的产品', type: '厂商官方应用页', publisher: '菲尼克斯电气', published: '未明确', accessed: '2026-10-06', status: '已读取', verified: true, url: 'https://www.phoenixcontact.com/zh-cn/industries/components-for-battery-storage-systems/industrial-and-utility-scale-storage-systems', claims: ['F06'], summary: '公开储能场景中的连接、控制、通信、供电保护产品关系。' },
    { id: 'S07', title: '行业和应用', type: '厂商官方目录', publisher: '菲尼克斯电气', published: '未明确', accessed: '2026-10-06', status: '已读取', verified: true, url: 'https://www.phoenixcontact.com/zh-cn/industries', claims: ['Q01'], summary: '用于确定观察行业与应用场景范围。' },
    { id: 'S08', title: '公司集团业务领域', type: '厂商官方页面', publisher: '菲尼克斯电气', published: '未明确', accessed: '2026-10-06', status: '已读取', verified: true, url: 'https://www.phoenixcontact.com/zh-cn/company/phoenix-contact-group/business-fields-of-the-corporate-group', claims: ['Q02'], summary: '设备连接器、工业元件和电子模块、工业管理和自动化业务背景。' },
    { id: 'S09', title: '2026年1—8月份全国固定资产投资基本情况', type: '政府官方统计', publisher: '国家统计局', published: '2026-09-15', accessed: '2026-10-06', status: '已读取', verified: true, url: 'https://www.stats.gov.cn/sj/zxfbhjd/202609/t20260915_1965309.html', claims: ['M01', 'M02'], summary: '制造业投资同比下降2.3%，设备工器具购置投资同比增长9.3%。' }
  ],
  claims: [
    { id: 'F01', label: '并网公告', subject: '禄口共享储能', value: '2025-12-23并网；50MW / 100MWh；1500V直流系统；液冷技术', state: '直接披露', source: 'S01', limitation: '项目技术背景不等于具体零部件规格。' },
    { id: 'F02', label: '招标规划口径', subject: '储能系统招标', value: '55MW / 110MWh；招标事件日期 2025-07-22', state: '转载待核验', source: 'S02', limitation: '与并网公告分字段记录，差异原因待核验。' },
    { id: 'F03', label: '设备采购候选', subject: '江苏林洋储能技术有限公司', value: '2025-09-12候选公示第一候选人', state: '转载待核验', source: 'S03', limitation: '不自动转写为最终中标、签约或实际供货。' },
    { id: 'F04', label: 'EPC供货边界', subject: 'EPC采购', value: '储能系统设备为甲供，EPC不包含该部分设备采购', state: '转载待核验', source: 'S04', limitation: '不能确认每类零件的最终采购单位。' },
    { id: 'F05', label: '企业级年度寻源', subject: '江苏林洋储能技术有限公司', value: '接插件列入RACK级原材料范围；报名截止 2025-05-08', state: '直接披露', source: 'S05', limitation: '未证实与禄口项目直接对应，期限已过。' },
    { id: 'F06', label: '产品族资料', subject: '菲尼克斯储能产品', value: 'BPC储能连接器；端子、供电保护、工业通信应用方案', state: '直接披露', source: 'S06a · S06b', limitation: '产品族相关不等于型号适配，不证明已供货。' }
  ],
  macro: [
    { id: 'M01', label: '制造业投资', value: '-2.3%', direction: '同比下降', dimension: '行业维度', period: '2026年1—8月', source: 'S09', tone: 'amber' },
    { id: 'M02', label: '设备工器具购置投资', value: '+9.3%', direction: '同比增长', dimension: '投资构成维度', period: '2026年1—8月', source: 'S09', tone: 'teal' }
  ],
  actions: [
    { id: 'ACT-01', priority: 'P0', title: '核验林洋储能最终供货与准入流程', body: '候选公示与独立年度接插件寻源共同指向企业级研究价值；仍需补充最终中标、签约或供应商准入证据。', owner: '企业与采购研究', due: '下一步', tag: '优先核验' },
    { id: 'ACT-02', priority: 'P1', title: '取得储能系统图与连接器参数', body: '1500V只能支持产品族关联，无法直接指定型号；需要位置、电压、电流、线径、温升与认证信息。', owner: '产品市场 / 技术', due: '待补充', tag: '参数缺口' },
    { id: 'ACT-03', priority: 'P1', title: '追踪后续运维、改造与新一期寻源', body: '禄口已并网，历史新建采购退出开放列表；后续关注存量设备服务与新的年度寻源窗口。', owner: '行业销售研究', due: '持续观察', tag: '历史案例' }
  ]
};

DATA.sources.push({ id: 'S10', title: '2026年一季度光伏发电建设一览表', type: '公开电力数据整理', publisher: '国家能源局口径 / CEIC公开附件', published: '2026-05', accessed: ANALYSIS_AS_OF, status: '已读取', verified: true, url: 'https://epaper.ceic.com/pc/attachment/202605/22/f9cf37e1-b91b-4113-886d-e54c6a372871.pdf', claims: ['P01'], summary: '按省整理的2026年一季度累计光伏并网容量，用作省份市场需求热度的公开底层指标。' });

const state = { route: location.hash.slice(1) || 'overview', search: '', status: '全部状态', industry: '全部行业', sourceStatus: '全部状态', productFilter: '全部产品', selectedProvince: '江苏' };

const icons = {
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  transmission: '<svg viewBox="0 0 24 24"><path d="M4 21 12 3l8 18M7 14h10M6 18h12M9 10h6M12 3v18"/></svg>',
  battery: '<svg viewBox="0 0 24 24"><rect x="4" y="6" width="15" height="13" rx="2"/><path d="M19 10h2v5h-2M11 8v4H8l4 5v-4h3"/></svg>',
  factory: '<svg viewBox="0 0 24 24"><path d="M3 21V9l6 3V8l6 3V5l6 3v13H3Z"/><path d="M7 16h2M12 16h2M17 16h2M7 19h2M12 19h2M17 19h2"/></svg>',
  plug: '<svg viewBox="0 0 24 24"><path d="M9 3v6M15 3v6M7 8h10v2a5 5 0 0 1-5 5v6M12 15v3"/></svg>',
  server: '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="7" rx="1"/><rect x="4" y="14" width="16" height="7" rx="1"/><path d="M8 6h.01M8 17h.01M12 6h5M12 17h5"/></svg>',
  train: '<svg viewBox="0 0 24 24"><path d="M6 18V6c0-2 2-3 6-3s6 1 6 3v12M6 10h12M8 18l-2 3M16 18l2 3M8 14h.01M16 14h.01"/></svg>',
  connector: '<svg viewBox="0 0 24 24"><path d="M4 8h6v8H4zM14 8h6v8h-6zM10 12h4M7 5v3M17 5v3M7 16v3M17 16v3"/></svg>',
  terminal: '<svg viewBox="0 0 24 24"><path d="M5 6h14v12H5zM8 6v12M12 6v12M16 6v12M3 10h2M19 10h2M3 14h2M19 14h2"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="m12 3 8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"/><path d="M8 12h8M12 8v8"/></svg>',
  control: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.5"/><circle cx="15" cy="9" r="1.5"/><circle cx="9" cy="15" r="1.5"/><circle cx="15" cy="15" r="1.5"/></svg>',
  antenna: '<svg viewBox="0 0 24 24"><path d="M12 14v7M9 21h6M8 11a5 5 0 0 1 8 0M5 8a9 9 0 0 1 14 0M12 14a2 2 0 1 0 0-.01"/></svg>',
  device: '<svg viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h2M13 15h2M9 18h6"/></svg>',
  procurement: '<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/><path d="m16 17 2 2 3-4"/></svg>',
  radar: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4v8l6 4M4 12h16M12 12l-4 7"/></svg>',
  box: '<svg viewBox="0 0 24 24"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2a5 5 0 0 0 7.1 7.1l1.2-1.2"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/><path d="M4 5.5V21M8 7h8M8 11h8"/></svg>',
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>',
  external: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/></svg>',
  filter: '<svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>'
};

function esc(value = '') { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])); }
function icon(name) { return `<span class="icon">${icons[name] || ''}</span>`; }
function badge(text, tone = '') { return `<span class="badge ${tone}">${esc(text)}</span>`; }
function statusClass(text = '') { return text.includes('已读取') || text.includes('直接') ? 'success' : text.includes('截止') || text.includes('结束') ? 'muted' : text.includes('待') || text.includes('转载') ? 'warning' : ''; }
function formatSource(id) { return id.split(' · ').map(part => `<span class="source-chip">${esc(part)}</span>`).join(' '); }
function sourceById(id) { return DATA.sources.find(s => s.id === id); }
function claimById(id) { return DATA.claims.find(c => c.id === id); }
function navItem(route, label, iconName, meta = '') { const active = state.route === route ? 'active' : ''; return `<a class="nav-item ${active}" href="#${route}">${icon(iconName)}<span>${label}</span>${meta ? `<small>${meta}</small>` : ''}</a>`; }

function renderShell(content) {
  return `<div class="app-shell">
    <aside class="sidebar">
      <div class="brand"><div class="brand-mark">P</div><div><strong>Phoenix</strong><span>Market Insight</span></div></div>
      <div class="workspace-label">研究工作台 <span>OFFLINE</span></div>
      <nav class="nav-group">
        <div class="nav-title">导航</div>
        ${navItem('overview', '总览', 'grid', '01')}
        ${navItem('radar', '项目雷达', 'radar', '02')}
        ${navItem('products', '产品关联', 'box', '03')}
        ${navItem('evidence', '证据中心', 'book', '04')}
      </nav>
      <div class="sidebar-case"><div class="sidebar-case-kicker">当前案例</div><strong>南京江宁禄口</strong><span>50MW / 100MWh · 已并网</span><a href="#project">打开案例 ${icon('arrow')}</a></div>
      <div class="sidebar-footer"><div class="avatar">Z</div><div><strong>独立研究</strong><span>公开数据项目</span></div><button class="icon-btn" aria-label="菜单">${icon('menu')}</button></div>
    </aside>
    <main class="main-content">
      <header class="topbar"><div class="breadcrumb"><span>市场洞察</span>${state.route !== 'overview' ? `${icon('chevron')}<strong>${routeLabel(state.route)}</strong>` : ''}</div><div class="top-actions"><span class="asof">分析截至 <b>${ANALYSIS_AS_OF}</b></span><span class="mode-pill"><i></i>真实数据模式</span><button class="outline-btn" data-action="export-sources">${icon('download')}导出来源</button></div></header>
      <div class="page-container">${content}</div>
    </main>
  </div>`;
}
function routeLabel(route) { return ({ radar: '项目雷达', project: '禄口项目详情', products: '产品关联', evidence: '证据中心' }[route] || '总览'); }

function renderOverview() {
  const p = DATA.project;
  return renderShell(`<div class="page-head overview-head"><div><div class="eyebrow">MARKET INTELLIGENCE / 公开数据研究</div><h1>电气市场洞察未来</h1><p>把外部需求信号，整理成可追溯的项目、采购角色与产品方向。</p></div><div class="head-actions"><button class="primary-btn" data-action="open-project">查看禄口案例 ${icon('arrow')}</button></div></div>
    <div class="notice-bar"><span class="notice-dot"></span><div><b>独立研究作品 · 公开数据</b><span>全国市场为观察范围，南京与江苏真实案例作为首批内容。当前样本仅支持研究方向，不代表市场份额或业务收益。</span></div><button data-action="dismiss-notice">${icon('close')}</button></div>
    <section class="metric-grid">
      ${metricCard('01', '已收录项目', '1', '座真实项目', '样本覆盖：南京江宁禄口', 'teal', 'radar')}
      ${metricCard('02', '采购 / 建设事件', '5', '条独立事件', '项目设备、EPC、年度寻源分开', 'blue', 'project')}
      ${metricCard('03', '待核验事项', '8', '项证据缺口', '候选、参数与项目关联', 'amber', 'evidence')}
      ${metricCard('04', '来源完整率', '100%', '10 / 10 已建档', '转载身份与读取日期已记录', 'violet', 'evidence')}
    </section>
    <div class="section-heading"><div><div class="eyebrow">SIGNALS / 真实宏观信号</div><h2>值得先研究什么</h2></div><span class="sample-note">2026年1—8月 · 国家统计局 · 仅两张独立信号卡</span></div>
    <section class="signal-grid">${DATA.macro.map(m => `<article class="signal-card ${m.tone}"><div class="signal-top"><span>${m.dimension}</span>${badge(m.direction, m.tone === 'teal' ? 'success' : 'warning')}</div><div class="signal-value">${m.value}</div><h3>${m.label}</h3><p>${m.period} · 来源 ${formatSource(m.source)}</p><div class="signal-foot"><span>问题：能否找到设备购置、更新或改造相关项目？</span>${icon('arrow')}</div></article>`).join('')}</section>
    <div class="content-grid two-col"><section class="panel matrix-panel"><div class="panel-head"><div><div class="eyebrow">OPPORTUNITY MAP</div><h2>行业 × 产品方向</h2></div><a href="#products" class="text-link">查看全部 ${icon('arrow')}</a></div><p class="panel-intro">基于已收录案例的产品族关联。格子代表研究方向，参数未齐全时不输出型号推荐。</p><div class="matrix"><div class="matrix-corner">观察行业 /<br>产品族</div><div class="matrix-col">连接与布线</div><div class="matrix-col">控制与供电</div><div class="matrix-col">通信与网络</div><div class="matrix-row-label"><span class="row-dot green"></span>储能 / 电网</div><div class="matrix-cell active"><b>BPC 连接器</b><small>产品族相关</small><span class="cell-arrow">${icon('arrow')}</span></div><div class="matrix-cell related"><b>端子 · 保护</b><small>应用层关联</small><span class="cell-arrow">${icon('arrow')}</span></div><div class="matrix-cell related"><b>工业通信</b><small>应用层关联</small><span class="cell-arrow">${icon('arrow')}</span></div><div class="matrix-row-label"><span class="row-dot blue"></span>工厂自动化</div><div class="matrix-cell empty"><span>待采集</span></div><div class="matrix-cell empty"><span>待采集</span></div><div class="matrix-cell empty"><span>待采集</span></div></div><div class="legend"><span><i class="legend-dot active"></i>已建立关联</span><span><i class="legend-dot related"></i>场景相关</span><span><i class="legend-dot empty"></i>待采集</span></div></section>
      <section class="panel action-panel"><div class="panel-head"><div><div class="eyebrow">NEXT ACTIONS</div><h2>重点研究行动</h2></div><span class="count-pill">3 条</span></div><div class="action-list">${DATA.actions.map(actionRow).join('')}</div><a class="panel-link" href="#project">打开完整行动清单 ${icon('arrow')}</a></section></div>
    <section class="panel case-strip"><div class="case-summary"><div class="case-icon">◈</div><div><div class="eyebrow">FEATURED CASE / 核心真实案例</div><h2>${p.name}</h2><p>${p.description}</p><div class="tag-row">${badge('历史案例 / 供应商研究', 'neutral')}${badge('江苏 · 南京')}${badge('50MW / 100MWh')}</div></div></div><div class="case-meta"><div><span>最新可证实状态</span><strong>已并网</strong><small>2025-12-23 · S01</small></div><a class="primary-btn small" href="#project">进入案例 ${icon('arrow')}</a></div></section>`);
}

function metricCard(no, title, value, unit, detail, tone, route) { return `<button class="metric-card ${tone}" data-route="${route}"><div class="metric-top"><span class="metric-no">${no}</span>${icon('arrow')}</div><div class="metric-main"><strong>${value}</strong><span>${unit}</span></div><h3>${title}</h3><p>${detail}</p></button>`; }
function actionRow(a) { return `<div class="action-row"><div class="priority">${esc(a.priority)}</div><div class="action-copy"><strong>${esc(a.title)}</strong><span>${esc(a.body)}</span><small>${esc(a.owner)} · ${esc(a.due)}</small></div><div class="action-tag">${esc(a.tag)}</div></div>`; }

function renderRadar() {
  const filtered = DATA.events.filter(e => (state.search === '' || `${e.title} ${e.subject}`.toLowerCase().includes(state.search.toLowerCase())) && (state.status === '全部状态' || e.status === state.status));
  return renderShell(`<div class="page-head"><div><div class="eyebrow">PROJECT RADAR / 机会池</div><h1>项目雷达</h1><p>先分清项目、标段与企业级采购事件，再决定是否继续跟进。</p></div><div class="head-actions"><button class="outline-btn" data-action="export-radar">${icon('download')}导出当前列表</button></div></div>
    <div class="filter-bar"><div class="search-box">⌕<input data-filter="search" placeholder="搜索项目、企业或事件" value="${esc(state.search)}" /></div><select data-filter="status"><option>全部状态</option><option>历史案例</option><option>已结束</option><option>待核验</option><option>已截止</option></select><select><option>全部行业</option><option>储能 / 电网与配电</option></select><span class="result-count">${filtered.length} / ${DATA.events.length} 条事件</span></div>
    <section class="radar-layout"><div class="panel table-panel"><div class="panel-head"><div><div class="eyebrow">EVENT INVENTORY</div><h2>已收录事件</h2></div><span class="sample-note">转载不重复计数为新项目</span></div><div class="table-wrap"><table><thead><tr><th>事件</th><th>日期</th><th>关联主体 / 范围</th><th>状态</th><th>来源</th><th></th></tr></thead><tbody>${filtered.map(e => `<tr data-event="${e.id}"><td><div class="event-cell"><span class="event-type">${esc(e.type)}</span><strong>${esc(e.title)}</strong><small>${esc(e.subject)}</small></div></td><td class="date-cell">${e.date}</td><td><span class="entity-cell">${e.id === 'EVT-003' ? '江苏林洋储能技术有限公司' : e.id === 'EVT-004' ? '江苏林洋电力服务有限公司 / 华东院' : e.id === 'EVT-005' ? '江苏林洋储能技术有限公司' : '京能国际江苏'}</span></td><td>${badge(e.status, statusClass(e.status))}</td><td>${formatSource(e.source)}</td><td><button class="row-arrow" data-open-event="${e.id}">${icon('chevron')}</button></td></tr>`).join('') || `<tr><td colspan="6"><div class="empty-state">没有匹配的事件。调整筛选条件后再试。</div></td></tr>`}</tbody></table></div></div><aside class="panel radar-aside"><div class="aside-kicker">筛选提示</div><h3>一个项目，五条事件</h3><p>禄口只计作一个真实项目。设备采购、EPC和年度寻源分别记录，避免把企业采购线索误当成第二座电站。</p><div class="mini-stat"><strong>1</strong><span>真实项目</span></div><div class="mini-stat"><strong>5</strong><span>独立事件</span></div><a href="#project" class="panel-link">打开案例详情 ${icon('arrow')}</a></aside></section>`);
}

function renderProject() {
  return renderShell(`<div class="page-head project-head"><div><div class="eyebrow">CASE FILE / ${DATA.project.id}</div><h1>${DATA.project.name}</h1><p>${DATA.project.industry} · ${DATA.project.location}</p></div><div class="head-actions"><button class="outline-btn" data-action="export-case">${icon('download')}导出案例摘要</button></div></div>
    <div class="project-status"><div class="status-symbol">✓</div><div><span>最新可证实状态</span><strong>已并网 · 历史案例 / 供应商研究</strong><small>2025-12-23 · 来源 S01 · 当前分析日 ${ANALYSIS_AS_OF}</small></div><div class="status-note">新建采购已结束<br><b>后续关注运维 / 改造 / 新一期寻源</b></div></div>
    <div class="detail-grid"><div class="detail-main"><section class="panel"><div class="panel-head"><div><div class="eyebrow">FACTS / 可证实事实</div><h2>关键事实</h2></div><span class="sample-note">6 条核心主张</span></div><div class="fact-grid">${DATA.claims.map(c => `<button class="fact-card" data-claim="${c.id}"><div class="fact-card-top"><span class="fact-label">${esc(c.label)}</span>${badge(c.state, c.state === '直接披露' ? 'success' : 'warning')}</div><strong>${esc(c.value)}</strong><small>${esc(c.subject)} · ${formatSource(c.source)}</small><span class="fact-open">查看依据 ${icon('arrow')}</span></button>`).join('')}</div></section>
      <section class="panel"><div class="panel-head"><div><div class="eyebrow">TIMELINE / 事件时间线</div><h2>项目与采购分开看</h2></div></div><div class="timeline">${DATA.events.map((e, i) => `<div class="timeline-item ${i === 0 ? 'latest' : ''}"><div class="timeline-marker">${i === 0 ? '✓' : i + 1}</div><div class="timeline-content"><div class="timeline-top"><span>${e.date}</span>${badge(e.status, statusClass(e.status))}</div><strong>${esc(e.title)}</strong><p>${esc(e.note)}</p><small>${esc(e.type)} · ${formatSource(e.source)}</small></div></div>`).join('')}</div></section>
      <section class="panel"><div class="panel-head"><div><div class="eyebrow">CAPACITY / 口径差异</div><h2>两种容量，保留原文</h2></div><span class="warning-label">需要进一步核验</span></div><div class="capacity-compare"><div class="capacity-card"><span>招标规划容量</span><strong>55<span>MW</span> / 110<span>MWh</span></strong><small>招标事件 2025-07-22 · S02</small><p>行业媒体转载，规划口径。</p></div><div class="capacity-divider">VS</div><div class="capacity-card confirmed"><span>并网公告容量</span><strong>50<span>MW</span> / 100<span>MWh</span></strong><small>并网 2025-12-23 · S01</small><p>项目投资方官方公告口径。</p></div></div><div class="callout"><b>处理规则</b><span>并列展示，不相加、不平均、不静默覆盖。没有补充证据时，不断言是扩容、超配、建设变更或报道错误。</span></div></section></div>
      <aside class="detail-side"><section class="panel roles-panel"><div class="panel-head"><div><div class="eyebrow">ROLES / 采购链</div><h2>应该跟进谁</h2></div></div><div class="role-list">${DATA.entities.slice(0, 6).map(ent => `<div class="role-row"><div class="role-avatar">${ent.name.slice(0, 1)}</div><div><strong>${esc(ent.name)}</strong><span>${esc(ent.role)}</span><small>${formatSource(ent.evidence)} · ${esc(ent.location)}</small></div><span class="role-tag">${esc(ent.tag)}</span></div>`).join('')}</div><div class="role-boundary"><span class="boundary-icon">!</span><p><b>供货边界</b><br>储能设备为甲供，EPC不包含该部分设备采购。不要把所有元器件机会挂到EPC主体。</p></div></section><section class="panel product-mini"><div class="panel-head"><div><div class="eyebrow">PRODUCT DIRECTIONS</div><h2>初步产品方向</h2></div><a href="#products" class="text-link">查看详情 ${icon('arrow')}</a></div>${DATA.products.map(prod => `<button class="product-mini-row" data-product="${prod.id}"><span class="product-dot ${prod.tone}"></span><span><strong>${esc(prod.name)}</strong><small>${esc(prod.state)}</small></span>${icon('chevron')}</button>`).join('')}</section><section class="panel gap-panel"><div class="eyebrow">NEXT CHECK / 待核验</div><h3>下一步核验什么</h3><ul><li>最终中标与实际供货关系</li><li>连接器位置、电流与认证</li><li>控制柜和系统集成边界</li></ul><a href="#evidence" class="panel-link">打开证据中心 ${icon('arrow')}</a></section></aside></div>`);
}

function renderProducts() {
  const products = state.productFilter === '全部产品' ? DATA.products : DATA.products.filter(p => p.category === state.productFilter);
  return renderShell(`<div class="page-head"><div><div class="eyebrow">PRODUCT ASSOCIATION / 产品关联</div><h1>产品关联</h1><p>从应用场景进入产品族，再逐项检查选型约束。</p></div><div class="head-actions"><span class="mode-pill"><i></i>产品族级判断</span></div></div><div class="product-banner"><div class="banner-symbol">⌁</div><div><strong>关联 ≠ 适配</strong><span>禄口项目的1500V背景只能支持储能产品族关联；缺少部件层级参数时，型号状态保持“待技术确认”。</span></div><span class="banner-rule">不输出虚假推荐</span></div><div class="filter-bar product-filter"><span class="filter-label">按产品方向</span><button class="filter-chip ${state.productFilter === '全部产品' ? 'selected' : ''}" data-product-filter="全部产品">全部</button><button class="filter-chip ${state.productFilter === '连接与布线' ? 'selected' : ''}" data-product-filter="连接与布线">连接与布线</button><button class="filter-chip ${state.productFilter === '控制与供电' ? 'selected' : ''}" data-product-filter="控制与供电">控制与供电</button><button class="filter-chip ${state.productFilter === '通信与网络' ? 'selected' : ''}" data-product-filter="通信与网络">通信与网络</button></div><section class="product-card-grid">${products.map(p => `<article class="product-card ${p.tone}"><div class="product-card-head"><div class="product-icon">${p.id === 'PF-001' ? '⌘' : p.id === 'PF-002' ? '▣' : '⌁'}</div><div>${badge(p.state, p.tone === 'teal' ? 'success' : 'info')}<h2>${esc(p.name)}</h2><span>${esc(p.category)}</span></div></div><div class="product-basis"><div class="subhead">关联依据</div><div class="basis-list">${p.basis.map(b => `<button data-claim="${b}">${formatSource(b)} <span>${claimById(b)?.label || '产品资料'}</span>${icon('chevron')}</button>`).join('')}</div></div><div class="parameter-block"><div class="subhead">仍需补齐的参数</div><div class="param-grid">${p.gaps.map(g => `<span>${icon('clock')}${esc(g)}</span>`).join('')}</div></div><div class="product-card-foot"><span><b>下一步</b>${esc(p.action)}</span><a href="#evidence">来源 ${formatSource(p.source)} ${icon('external')}</a></div></article>`).join('')}</section><div class="product-note"><span class="note-icon">i</span><p><b>判断边界</b>：项目总功率不能推算单个连接器电流；年度接插件寻源支持企业级需求研究，但不能当作禄口项目物料清单。</p></div>`);
}

function renderEvidence() {
  const filtered = DATA.sources.filter(s => state.sourceStatus === '全部状态' || s.status === state.sourceStatus);
  return renderShell(`<div class="page-head"><div><div class="eyebrow">EVIDENCE CENTER / 可追溯来源</div><h1>证据中心</h1><p>每条事实都能回到来源、日期和局限；转载身份保持可见。</p></div><div class="head-actions"><button class="outline-btn" data-action="export-sources">${icon('download')}导出来源清单</button></div></div><div class="evidence-stats"><div><strong>10</strong><span>来源条目</span></div><div><strong>6</strong><span>核心事实</span></div><div><strong>3</strong><span>转载待核验</span></div><div><strong>2026-10-06</strong><span>最近读取</span></div></div><div class="filter-bar evidence-filter"><div class="search-box">⌕<input data-filter="source-search" placeholder="搜索来源标题、发布主体或事实" value="${esc(state.search)}" /></div><select data-filter="source-status"><option>全部状态</option><option>已读取</option><option>转载待核验</option></select><span class="result-count">${filtered.length} / 10 个来源</span></div><section class="panel evidence-panel"><div class="table-wrap"><table class="evidence-table"><thead><tr><th>来源 / 发布主体</th><th>类型</th><th>发布日期</th><th>读取与状态</th><th>关联事实</th><th></th></tr></thead><tbody>${filtered.filter(s => !state.search || `${s.title} ${s.publisher} ${s.claims.join(' ')}`.toLowerCase().includes(state.search.toLowerCase())).map(s => `<tr><td><div class="source-cell"><div class="source-id">${s.id}</div><div><strong>${esc(s.title)}</strong><small>${esc(s.publisher)}</small></div></div></td><td>${badge(s.type, s.verified ? 'info' : 'warning')}</td><td class="date-cell">${s.published}</td><td><span class="status-line ${s.verified ? 'verified' : 'pending'}">${icon(s.verified ? 'check' : 'clock')}${esc(s.status)}</span><small class="accessed">读取于 ${s.accessed}</small></td><td>${s.claims.map(formatSource).join(' ')}</td><td><a class="row-arrow" href="${s.url}" target="_blank" rel="noreferrer" title="访问原文">${icon('external')}</a><button class="row-arrow" data-source="${s.id}" title="查看摘要">${icon('chevron')}</button></td></tr><tr class="source-detail" id="source-detail-${s.id}"><td colspan="6"><div><b>摘要与定位</b><span>${esc(s.summary)}</span><em>${s.verified ? '来源已读取，可离线演示。' : '当前页面为转载；原始公告仍待补充。'}</em></div></td></tr>`).join('') || `<tr><td colspan="6"><div class="empty-state">没有匹配的来源。</div></td></tr>`}</tbody></table></div></section><div class="evidence-footnote"><span class="note-icon">i</span><p>本地记录保存了来源网址、发布主体、发布日期、读取日期、访问状态和摘要。外部网站不可访问时，仍可用本地证据记录完成离线演示。</p></div>`);
}

function render() {
  const route = state.route;
  const content = route === 'radar' ? renderRadar() : route === 'project' ? renderProject() : route === 'products' ? renderProducts() : route === 'evidence' ? renderEvidence() : renderOverview();
  document.querySelector('#app').innerHTML = content;
  bindEvents();
}

function download(filename, content, type = 'text/plain;charset=utf-8') { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 500); }
function exportSources() { const rows = [['source_id', 'title', 'publisher', 'type', 'published_at', 'accessed_at', 'status', 'url'], ...DATA.sources.map(s => [s.id, s.title, s.publisher, s.type, s.published, s.accessed, s.status, s.url])]; download('phoenix-sources.csv', rows.map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n'), 'text/csv;charset=utf-8'); }
function exportRadar() { const rows = [['event_id', 'type', 'title', 'date', 'status', 'source'], ...DATA.events.map(e => [e.id, e.type, e.title, e.date, e.status, e.source])]; download('phoenix-events.csv', rows.map(r => r.join(',')).join('\n'), 'text/csv;charset=utf-8'); }
function exportCase() { const text = `电气市场洞察未来｜禄口项目案例摘要\n分析截至：${ANALYSIS_AS_OF}\n\n项目：${DATA.project.name}\n状态：${DATA.project.status}\n并网公告口径：50MW / 100MWh（S01）\n招标规划口径：55MW / 110MWh（S02，转载待核验）\n\n优先核验：江苏林洋储能技术有限公司最终供货与准入流程\n产品方向：BPC等储能连接器、控制柜端子/电源/保护、工业通信\n判断边界：产品族相关不等于型号适配；年度接插件寻源未确认用于本项目。\n来源：S01—S09，具体摘要见证据中心。`; download('lukou-case-summary.txt', text); }

function openModal(html) { const existing = document.querySelector('.modal-backdrop'); if (existing) existing.remove(); const div = document.createElement('div'); div.className = 'modal-backdrop'; div.innerHTML = `<div class="modal">${html}<button class="modal-close" data-action="close-modal">${icon('close')}</button></div>`; document.body.appendChild(div); }
function showClaim(id) { const c = claimById(id); if (!c) return; const s = sourceById(c.source.split(' · ')[0]); openModal(`<div class="modal-kicker">${esc(c.id)} · ${esc(c.state)}</div><h2>${esc(c.label)}</h2><p class="modal-lead">${esc(c.value)}</p><div class="modal-section"><span>主张对象</span><strong>${esc(c.subject)}</strong></div><div class="modal-section"><span>支持来源</span><strong>${formatSource(c.source)} ${s ? esc(s.title) : ''}</strong></div><div class="modal-section"><span>局限与下一步</span><strong>${esc(c.limitation)}</strong></div><a class="primary-btn" href="${s?.url || '#'}" target="_blank" rel="noreferrer">打开来源 ${icon('external')}</a>`); }
function bindEvents() {
  document.querySelectorAll('[data-route]').forEach(el => el.addEventListener('click', () => { location.hash = el.dataset.route; }));
  document.querySelectorAll('[data-action="open-project"]').forEach(el => el.addEventListener('click', () => { location.hash = 'project'; }));
  document.querySelectorAll('[data-action="export-sources"]').forEach(el => el.addEventListener('click', exportSources));
  document.querySelectorAll('[data-action="export-radar"]').forEach(el => el.addEventListener('click', exportRadar));
  document.querySelectorAll('[data-action="export-case"]').forEach(el => el.addEventListener('click', exportCase));
  document.querySelectorAll('[data-action="dismiss-notice"]').forEach(el => el.addEventListener('click', e => e.currentTarget.closest('.notice-bar').remove()));
  document.querySelectorAll('[data-claim]').forEach(el => el.addEventListener('click', e => { e.stopPropagation(); showClaim(el.dataset.claim); }));
  document.querySelectorAll('[data-source]').forEach(el => el.addEventListener('click', () => { const row = document.querySelector(`#source-detail-${el.dataset.source}`); row?.classList.toggle('open'); }));
  document.querySelectorAll('[data-action="close-modal"]').forEach(el => el.addEventListener('click', () => document.querySelector('.modal-backdrop')?.remove()));
  document.querySelector('.modal-backdrop')?.addEventListener('click', e => { if (e.target.classList.contains('modal-backdrop')) e.currentTarget.remove(); });
  document.querySelectorAll('[data-open-event]').forEach(el => el.addEventListener('click', () => location.hash = 'project'));
  document.querySelectorAll('.ref-province-group').forEach(el => {
    const province = el.getAttribute('data-province');
    el.addEventListener('click', () => { state.selectedProvince = province; renderReference(); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); state.selectedProvince = province; renderReference(); } });
  });
  const search = document.querySelector('[data-filter="search"]'); if (search) { search.addEventListener('input', e => { state.search = e.target.value; render(); const input = document.querySelector('[data-filter="search"]'); input?.focus(); input?.setSelectionRange(input.value.length, input.value.length); }); }
  const sourceSearch = document.querySelector('[data-filter="source-search"]'); if (sourceSearch) { sourceSearch.addEventListener('input', e => { state.search = e.target.value; render(); const input = document.querySelector('[data-filter="source-search"]'); input?.focus(); input?.setSelectionRange(input.value.length, input.value.length); }); }
  const status = document.querySelector('[data-filter="status"]'); if (status) status.value = state.status; status?.addEventListener('change', e => { state.status = e.target.value; render(); });
  const sourceStatus = document.querySelector('[data-filter="source-status"]'); if (sourceStatus) sourceStatus.value = state.sourceStatus; sourceStatus?.addEventListener('change', e => { state.sourceStatus = e.target.value; render(); });
  document.querySelectorAll('[data-product-filter]').forEach(el => el.addEventListener('click', () => { state.productFilter = el.dataset.productFilter; render(); }));
}

function refIcon(name){ return `<span class="ref-icon">${icons[name] || icons.book}</span>`; }
function refSideLink(route,label,name,active){ return `<a class="ref-side-link ${active===route?'active':''}" href="#${route}">${refIcon(name)}<span>${label}</span></a>`; }
function refSidebar(active){ return `<aside class="ref-sidebar"><div class="ref-brand">产品机会研究</div><nav class="ref-side-nav">${refSideLink('overview','市场机会','grid',active)}${refSideLink('products','产品方案','box',active)}${refSideLink('project','案例行动','book',active)}${refSideLink('evidence','数据来源','link',active)}</nav><div class="ref-side-footer">公开资料研究<br>事实 / 推断 / 待验证分开呈现</div></aside>`; }
function refShell(content,active,extra=''){ return `<div class="reference-app ref-shell">${refSidebar(active)}<main class="ref-content ${extra}"><div class="ref-alert"><span>⚠&nbsp; 内容样稿｜示意内容，待公开资料核实</span><span class="ref-alert-right">公开资料研究 · 事实 / 推断 / 待验证分开呈现</span></div>${content}</main></div>`; }
function refMetric(iconName,label,value){ return `<div class="ref-metric"><div class="ref-metric-icon">${refIcon(iconName)}</div><div class="ref-metric-copy"><small>${label}</small><strong>${value}</strong></div><div class="ref-mini-bars"><i></i><i></i><i></i><i></i></div><span class="ref-arrow">›</span></div>`; }
function refHeader(title,subtitle,index){ return `<div class="ref-page-head"><div><div class="ref-page-kicker">PRODUCT OPPORTUNITY RESEARCH</div><h1>${title}</h1><p>${subtitle}</p></div>${index?`<div class="ref-page-index"><b>${index}</b> / 03</div>`:''}</div>`; }

function renderReferenceOverview(){
  const actions = DATA.actions;
  const signalRows = [['设备更新','35%','58%'],['储能设备','34%','68%'],['工厂自动化','31%','49%'],['充电设施','28%','41%'],['数据中心','35%','63%'],['轨道交通','37%','58%']];
  const matrix = [['电网改造',['m2','m4','m1','m2','m3']],['储能设备',['m4','m1','m2','m2','m2']],['工厂自动化',['m2','m1','m2','m4','m1']],['充电设施',['m3','m2','m2','m1','m2']],['数据中心',['m1','m2','m4','m2','m4']],['轨道交通',['m2','m1','m2','m2','m1']]];
  return `<div class="reference-app ref-overview"><header class="ref-hero"><div><div class="ref-kicker">INDUSTRY INTELLIGENCE</div><h1>中国电气市场 · 洞察未来</h1><p>公开数据分析｜所有数值与图表均为演示</p></div><div class="ref-work-badge">独立作品 · 概念稿</div></header><nav class="ref-tabs"><a class="ref-tab active" href="#overview">${refIcon('grid')}市场总览</a><a class="ref-tab" href="#overview">${refIcon('radar')}行业机会</a><a class="ref-tab" href="#products">${refIcon('box')}产品匹配</a><a class="ref-tab" href="#project">${refIcon('book')}项目线索</a><a class="ref-tab" href="#evidence">${refIcon('link')}证据中心</a><div class="ref-cycle">▣ 演示周期 <select><option>当前快照</option></select></div></nav><div class="ref-body"><div class="ref-metrics">${refMetric('box','真实项目','01')}${refMetric('link','研究区域','01')}${refMetric('book','独立事件','05')}${refMetric('radar','待核验事项','08')}</div><div class="ref-main-grid"><section class="ref-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('radar')}<h2>需求信号</h2></div><span class="ref-card-note">研究关注度 · 示意</span></div><div class="ref-card-body"><div class="ref-legend"><span><i></i>近一年</span><span><i class="dark"></i>近三年</span></div>${signalRows.map((row)=>`<div class="ref-signal-row"><div class="ref-signal-label">${row[0]}</div><div class="ref-bars"><div class="ref-bar" style="--near:${row[1]}"><span>${row[1]}</span></div><div class="ref-bar dark" style="--long:${row[2]}"><span>${row[2]}</span></div></div></div>`).join('')}</div></section><section class="ref-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('grid')}<h2>行业 × 产品机会</h2></div><span class="ref-card-note">匹配规则示意，不代表市场份额</span></div><div class="ref-card-body"><div class="ref-matrix"><div class="ref-matrix-head"></div>${['连接器','接线端子','电源保护','控制系统','工业通信'].map(x=>`<div class="ref-matrix-head">${x}</div>`).join('')}${matrix.map(row=>`<div class="ref-matrix-row">${row[0]}</div>${row[1].map(c=>`<div class="ref-matrix-cell ${c}"></div>`).join('')}`).join('')}</div><div class="ref-matrix-legend"><span><i></i>待验证</span><span><i class="mid"></i>关注</span><span><i class="high"></i>优先研究</span></div></div></section><section class="ref-card ref-judgment-panel"><div class="ref-card-head"><div class="ref-card-title">${refIcon('radar')}<h2>本期研究判断</h2></div></div><div class="ref-judgment-list">${[['01','设备更新','核验改造项目采购窗口','核验设备更新相关政策与项目公告。','book'],['02','储能配套','追踪集成商与设备订单','基于禄口项目，关注系统集成商的设备采购需求。','box'],['03','数据中心','梳理供配电产品需求','作为后续研究方向，先补齐公开项目和参数。','link']].map(x=>`<div class="ref-judgment"><div class="ref-number">${x[0]}</div><div><h3>${x[1]}</h3><p>${x[2]}<br>${x[3]}</p></div><span class="ref-badge">分析假设 · 待验证</span>${refIcon(x[4])}</div>`).join('')}</div></section></div><div class="ref-bottom-grid"><section class="ref-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('radar')}<h2>从信号到行动</h2></div></div><div class="ref-card-body"><table class="ref-action-table"><thead><tr><th>公开信号</th><th>相关产品</th><th>验证动作</th></tr></thead><tbody>${[['设备更新公告','端子与电源','核验采购清单'],['储能项目招标','功率连接器','识别采购主体'],['机房建设公告','供电与保护','确认选型阶段']].map((x,i)=>`<tr><td><span class="ref-action-index">0${i+1}</span> ${x[0]}</td><td>${x[1]}　›</td><td>${refIcon(i===0?'book':i===1?'radar':'link')} ${x[2]}</td></tr>`).join('')}</tbody></table></div></section><section class="ref-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('book')}<h2>数据可信度</h2></div></div><div class="ref-source-list">${[['官方统计 · 拟接入','宏观行业与投资数据'],['招投标公告 · 拟接入','项目公告与采购信息'],['企业年报 · 拟接入','企业公开资料']].map(x=>`<div class="ref-source-row"><div class="ref-source-icon">${refIcon('book')}</div><div><strong>${x[0]}</strong><span>${x[1]}</span></div><i class="ref-source-dot"></i></div>`).join('')}</div></section></div><div class="ref-footer"><span>${refIcon('book')} 拟接入来源：国家统计局 · 国家能源局 · 公共资源交易公告 · 企业公开资料</span><span>ⓘ 非企业内部经营数据</span></div></div></div>`;
}

function renderReferenceProducts(){
  const rows = [
    {need:'连接可靠',desc:'保障储能设备持续稳定运行',glyph:'⌬',product:'BPC 等储能连接器',sub:'储能模块连接与配对件',condition:'连接位置与工作电压\n线径、温升与认证',basis:'S01 · S05 · S06a'},
    {need:'控制稳定',desc:'保证柜内供电与保护边界',glyph:'▣',product:'控制柜端子、电源与保护',sub:'端子、供电和保护产品',condition:'实际物料清单\n控制柜厂家与采购权限',basis:'S01 · S06b'},
    {need:'状态可视',desc:'实现设备状态监测与远程运维',glyph:'⌁',product:'工业通信产品',sub:'工业以太网与通信模块',condition:'协议与网络架构\n既有设备与改造需求',basis:'S01 · S06b'}
  ];
  return refShell(`<div class="ref-inner">${refHeader('产品方案｜为什么这样选','把客户需求转成可验证的产品条件','02')}<div class="ref-summary-strip"><div class="ref-summary-main">${refIcon('box')}<div><strong>场景</strong><span>储能系统供配电</span></div></div><div class="ref-summary-item"><span>方法</span><strong>需求—参数—证据</strong></div><div class="ref-summary-item"><span>输出</span><strong>候选方案与验证清单</strong></div><div class="ref-summary-item"><span>产品层级</span><strong>产品族相关</strong></div><div class="ref-summary-item"><span>适配状态</span><strong>待技术确认</strong></div><div class="ref-summary-warn">候选类别仅供研究<br>不能直接作为选型结论</div></div><div class="ref-products-grid"><section class="ref-products-table"><div class="ref-section-head"><div class="ref-marker"></div><h2>需求与候选产品</h2><span>候选类别仅供研究，不能直接作为选型结论。</span></div><div class="ref-products-head"><div>客户需求</div><div>候选类别</div><div>关键条件</div><div>验证状态</div></div>${rows.map(r=>`<div class="ref-product-row"><div><h3>${r.need}</h3><p>${r.desc}</p></div><div class="ref-product-visual"><div class="ref-product-glyph">${r.glyph}</div><div><h3>${r.product}</h3><p>${r.sub}</p></div></div><div class="ref-condition"><strong>输入输出条件</strong>${r.condition.split('\n').map(x=>`<span>• ${x}</span>`).join('')}</div><div class="ref-status"><div class="ref-status-badge">⚠ 待核实<br><small>${r.basis}</small></div></div></div>`).join('')}</section><aside class="ref-evidence-side"><div class="ref-section-head"><div class="ref-marker"></div><h2>选型依据</h2><span>多来源交叉验证</span></div>${[['官方产品资料','产品手册、技术参数、选型指南等','S06a'],['应用说明','储能场景应用与系统边界','S06b'],['技术确认','与技术专家或供应商的沟通记录','待补充']].map(x=>`<div class="ref-evidence-card">${refIcon('book')}<div><strong>${x[0]}</strong><span>${x[1]} · ${x[2]}</span></div><span class="ref-arrow">›</span></div>`).join('')}<div class="ref-missing"><strong>⚠ 尚缺信息</strong><p>工况、接口、认证与安装约束。需进一步收集现场工况、接口要求、相关认证要求及安装空间等信息后，才能完成最终选型评估。</p></div></aside></div><div class="ref-compare-grid"><section class="ref-compare"><h2>同条件竞品比较 <small>在相同应用条件下，对候选方案进行比较。</small></h2><table><thead><tr><th>比较维度</th><th>本方案 A</th><th>替代方案 B</th><th>替代方案 C</th></tr></thead><tbody>${[['性能适配','待核实','待核实','待核实'],['接口兼容','待核实','待核实','待核实'],['维护成本','待评估','待评估','待评估'],['证据完整性','待补充','待补充','待补充']].map(r=>`<tr>${r.map((c,i)=>`<td>${i===0?`<b>${c}</b>`:c}</td>`).join('')}</tr>`).join('')}</tbody></table></section><section class="ref-judgment-box"><h2>产品判断</h2><p><b>满足什么条件，才值得推荐？</b><br>综合客户需求、关键条件和证据情况，判断候选方案的适用边界，并明确替代方案。</p><div class="ref-judgment-actions"><div><strong>⚖ 适用边界</strong><span>在哪些场景下更适用</span></div><div><strong>↗ 替代方案</strong><span>当不满足条件时的可选方案</span></div></div><a class="ref-cta" href="#project">查看案例验证 →</a></section></div></div>`,'products');
}

function renderReferenceProject(){
  const proofs=[['事实','公告明确写了什么','从公开资料中抽取与项目相关的关键信息，不做超出原文的解读。','相关公告/文件（示意）','摘录与项目相关的文字内容。'],['推断','为什么可能存在产品需求','基于行业知识和项目背景，推断可能的应用场景与产品需求方向。','行业或项目资料（示意）','与需求相关的背景信息整理。'],['待验证','谁采购、何时采购、是否适配','目前尚不确定的关键信息，需要进一步核实，以判断是否符合公司的产品应用场景。','待补充信息（示意）','采购主体、时间计划、技术条件等仍需核实。']];
  return refShell(`<div class="ref-inner">${refHeader('案例行动｜下一步怎么做','用一个真实项目验证分析，并形成推广建议。','03')}<div class="ref-case-summary"><div class="ref-case-title">${refIcon('book')}<div><strong>真实案例档案</strong><span>${DATA.project.name} · 当前展示页面结构</span></div></div><div class="ref-case-status"><span>项目阶段</span><strong>已并网 / 历史案例</strong></div><div class="ref-case-status"><span>采购主体</span><strong>待核验</strong></div><div class="ref-case-status"><span>需求描述</span><strong>50MW / 100MWh</strong></div><div class="ref-case-status"><span>原始出处</span><strong>S01 · S02</strong></div><div class="ref-case-alert">⚠ 不将已结束项目当作在招商机。</div></div><div class="ref-case-grid"><section class="ref-evidence-panel"><div class="ref-section-head"><div class="ref-marker"></div><h2>证据与判断</h2><span>从公开信息出发，分层梳理事实、推断与待验证的问题。</span></div>${proofs.map((p,i)=>`<div class="ref-proof-row"><div class="ref-proof-tag ${i===1?'blue':i===2?'amber':''}">${p[0]}</div><div><h3>${p[1]}</h3><p>${p[2]}</p></div><div class="ref-proof-source">${refIcon('book')}<span><b>${p[3]}</b><br>${p[4]}</span><button data-claim="${i===0?'F01':i===1?'F06':'F03'}">原文 ↗</button></div></div>`).join('')}</section><section class="ref-action-panel"><div class="ref-section-head"><div class="ref-marker"></div><h2>行动清单</h2><span>从一个真实项目出发，逐步验证并输出可推广的方案。</span></div><div class="ref-action-list">${[['核实采购链条','明确业主、总包、设备商角色。',['梳理项目相关方及其职责','确认可能的采购决策链条','识别关键联系人类型（待核实）'],'book'],['完成技术确认','补齐工况与选型条件。',['收集项目的工况、环境与技术要求','匹配公司相关产品的适用性','整理待澄清的技术问题清单'],'box'],['准备客户沟通','输出应用说明与问题清单。',['形成面向客户的应用说明（初稿）','准备需与客户确认的问题清单','规划后续跟进节奏与沟通方式'],'link']].map((r,i)=>`<div class="ref-action-item"><div class="ref-action-num">0${i+1}</div><div><h3>${r[0]}</h3><p>${r[1]}</p></div><div class="ref-action-checks">${r[2].map(x=>`• ${x}`).join('<br>')}</div>${refIcon(r[3])}</div>`).join('')}</div></section></div><div class="ref-delivery-grid"><section class="ref-delivery"><div class="ref-section-head"><div class="ref-marker"></div><h2>产品推广小方案</h2><span>基于项目分析，设计可执行的推广思路，尚未实际执行。</span></div><div class="ref-delivery-items">${[['目标对象','按实际采购角色确定','radar'],['核心信息','需求、方案、验证依据','radar'],['推广材料','一页应用说明','book'],['效果观察','反馈与试用意向','link']].map(x=>`<div class="ref-delivery-item">${refIcon(x[2])}<strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('')}</div></section><section class="ref-dark-delivery"><h2>面试可展示的交付物</h2><p>体现从数据分析到产品落地的完整思考过程，展示计算机与产品的交叉能力。</p><div class="ref-dark-links"><div>可运行系统<span>项目分析与信息管理</span></div><div>产品对比表<span>基于场景的选型分析</span></div><div>一页行动建议<span>从分析到落地的方案</span></div></div></section></div><div class="ref-footer"><span>${refIcon('link')} 附：数据字典、来源记录与复现说明。</span><span>公开资料研究 · 事实 / 推断 / 待验证分开呈现。</span></div></div>`,'project');
}

function renderReferenceEvidence(){
  const rows=DATA.sources.map(s=>`<tr><td><b>${s.id}</b>　${esc(s.title)}</td><td>${esc(s.publisher)}</td><td>${esc(s.type)}</td><td>${esc(s.published)}</td><td>${badge(s.status,s.verified?'success':'warning')}</td></tr>`).join('');
  return refShell(`<div class="ref-inner ref-source-page">${refHeader('数据来源｜每条判断都要能回溯','来源、发布日期、读取时间和局限均单独保留。','')}<div class="ref-source-grid"><section class="ref-source-big"><table><thead><tr><th>来源</th><th>发布主体</th><th>来源类型</th><th>发布日期</th><th>状态</th></tr></thead><tbody>${rows}</tbody></table></section><aside class="ref-source-card"><h2>证据原则</h2><p>事实、推断与待验证分开呈现。转载保持转载身份，候选公示不自动升级为最终中标，来源无法访问时保留本地记录。</p></aside><aside class="ref-source-card"><h2>当前快照</h2><p>分析截至 2026-10-06<br>10 个来源条目<br>6 条核心事实<br>3 条转载待核验</p></aside></div></div>`,'evidence','ref-source-page');
}

const PROVINCE_SHAPES = [
  ['新疆','50,160 150,125 250,150 230,235 105,255 40,215','145','190'],['西藏','95,270 220,250 295,290 270,380 130,385 65,330','178','322'],['青海','230,245 315,220 360,265 315,315 250,300','294','272'],['甘肃','315,205 355,200 395,265 350,285 315,260','354','242'],['内蒙古','250,125 375,100 500,120 465,175 380,185 300,170','382','142'],['宁夏','368,225 390,225 395,255 370,260','381','244'],['陕西','390,255 435,245 452,300 415,320 390,300','420','284'],['四川','305,315 385,305 410,350 370,385 295,365','355','344'],['重庆','415,310 445,300 455,335 430,350','435','326'],['云南','240,365 315,365 340,420 260,425 205,390','271','395'],['贵州','342,360 400,350 420,390 370,412 330,390','375','382'],['广西','380,405 455,395 490,425 425,450 370,430','426','423'],['海南','432,463 470,455 495,472 460,490 430,480','461','474'],['山西','432,205 470,205 475,250 440,270','454','235'],['河北','485,170 535,170 555,220 515,250 475,235','515','210'],['北京','500,160 518,160 522,178 500,180','510','169'],['天津','523,180 541,180 544,198 525,198','533','189'],['山东','535,245 610,235 642,270 590,290 545,275','588','263'],['河南','480,270 535,265 555,310 510,325 475,305','514','293'],['湖北','455,320 520,310 550,350 500,365 460,350','500','339'],['湖南','455,365 510,360 530,400 475,415 440,390','486','386'],['安徽','540,310 578,310 595,355 558,375 530,345','560','342'],['江苏','590,275 630,270 650,320 610,335 585,315','618','301'],['上海','650,316 668,310 674,330 655,339','661','324'],['浙江','608,340 660,338 675,380 630,395 600,370','638','366'],['江西','540,370 595,362 610,405 565,420 525,395','570','392'],['福建','625,395 665,385 685,430 645,450 620,425','651','418'],['广东','560,425 640,425 660,462 585,470 545,450','605','447'],['辽宁','600,165 665,145 705,175 680,220 620,220','654','184'],['吉林','665,105 730,110 742,155 695,165 670,145','707','133'],['黑龙江','655,35 748,48 750,112 690,120 645,90','700','79'],['台湾','695,400 710,395 715,445 700,460','706','428']
];

function provinceHeat(name){ const pv=PROVINCE_DATA[name]?.pv; return pv == null ? null : Math.round(40 + 55 * pv / PROVINCE_MAX_PV); }
function provinceBand(value){ return value == null ? 'low' : value >= 82 ? 'max' : value >= 68 ? 'high' : value >= 54 ? 'mid' : 'low'; }
function renderProvinceMap(selected){
  return `<div class="ref-map-holder" data-map-holder data-selected-province="${esc(selected)}" aria-label="中国各省电气市场需求热度分布"><div class="ref-map-loading">正在加载省级边界…</div></div>`;
}

function provinceFeatureName(feature){
  return String(feature?.properties?.name || '').replace(/特别行政区|自治区|省|市/g,'');
}
function selectProvince(province){ state.selectedProvince = province; renderReference(); }
async function hydrateProvinceMap(){
  const holder = document.querySelector('[data-map-holder]');
  if (!holder || !window.d3) return;
  try {
    const geo = await fetch('public_china.json').then(response => { if (!response.ok) throw new Error(`map ${response.status}`); return response.json(); });
    if (!document.body.contains(holder)) return;
    const width = 780; const height = 505; const selected = holder.dataset.selectedProvince;
    const svg = d3.select(holder).html('').append('svg').attr('class','ref-map-svg').attr('viewBox',`0 0 ${width} ${height}`).attr('role','img').attr('aria-label','中国各省电气市场需求热度分布');
    const features = (geo.features || []).filter(feature => featureFeatureIsProvince(feature));
    // 用 D3 的 geoTransform 将经纬度线性投影到中国主图视野，避免离岛几何影响比例。
    const xScale = d3.scaleLinear().domain([73,135]).range([30,width - 30]);
    const yScale = d3.scaleLinear().domain([54,15]).range([20,height - 30]);
    const path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(xScale(lon), yScale(lat)); } }));
    const defs = svg.append('defs');
    const palette = {
      low: ['#d4efd2', '#a7d6ae', '#64a57c'],
      mid: ['#a8d9b5', '#73b98f', '#3e895f'],
      high: ['#62b88f', '#2b9169', '#226c50'],
      max: ['#2b986e', '#076044', '#104c38']
    };
    for (const [band, colors] of Object.entries(palette)) {
      const gradient = defs.append('linearGradient').attr('id', `province-surface-${band}`).attr('x1','0%').attr('y1','0%').attr('x2','65%').attr('y2','100%');
      gradient.append('stop').attr('offset','0%').attr('stop-color',colors[0]);
      gradient.append('stop').attr('offset','100%').attr('stop-color',colors[1]);
    }
    const filter = defs.append('filter').attr('id','province-shadow').attr('x','-15%').attr('y','-15%').attr('width','140%').attr('height','145%');
    filter.append('feDropShadow').attr('dx',1).attr('dy',9).attr('stdDeviation',6).attr('flood-color','#286348').attr('flood-opacity',.34);
    svg.append('path').datum(d3.geoGraticule().extent([[73,16],[135,54]]).step([5,5])()).attr('d',path).attr('class','ref-map-graticule');
    // Draw the same geographic outlines beneath the surface to form a thin, solid side wall.
    const base = svg.append('g').attr('class','ref-map-base').attr('filter','url(#province-shadow)').attr('aria-hidden','true');
    base.selectAll('path').data(features).join('path').attr('d',path).attr('transform','translate(0 8)').attr('fill','#498864');
    const sides = svg.append('g').attr('class','ref-map-sides').attr('aria-hidden','true');
    for (let depth = 8; depth >= 1; depth--) {
      sides.append('g').attr('transform',`translate(0 ${depth})`).selectAll('path').data(features).join('path')
        .attr('d',path).attr('fill',feature => palette[provinceBand(provinceHeat(provinceFeatureName(feature)))][2]);
    }
    const mapLayer = svg.append('g').attr('class','ref-map-layer');
    mapLayer.selectAll('path').data(features).join('path')
      .attr('class', feature => { const name=provinceFeatureName(feature); const score=provinceHeat(name); return `ref-province ${provinceBand(score)}${name===selected?' selected':''}`; })
      .style('fill',feature => `url(#province-surface-${provinceBand(provinceHeat(provinceFeatureName(feature)))})`)
      .attr('d', path).attr('data-province', feature => provinceFeatureName(feature)).attr('tabindex',0).attr('role','button').attr('aria-label', feature => `${provinceFeatureName(feature)}省市场需求`)
      .on('click', (event, feature) => selectProvince(provinceFeatureName(feature)))
      .on('keydown', (event, feature) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectProvince(provinceFeatureName(feature)); } });
    mapLayer.select('.ref-province.selected').raise();
    mapLayer.selectAll('text').data(features.filter(feature => feature.properties?.centroid || feature.properties?.center)).join('text')
      .attr('class','ref-province-label').attr('x', feature => xScale((feature.properties.centroid || feature.properties.center)[0])).attr('y', feature => yScale((feature.properties.centroid || feature.properties.center)[1])).text(feature => provinceFeatureName(feature));
    svg.append('text').attr('x',28).attr('y',478).attr('class','ref-map-north').text('N');
    svg.append('path').attr('class','ref-map-compass').attr('d','M35 485l6-28 6 28M41 457v32');
    svg.append('text').attr('x',62).attr('y',482).attr('class','ref-map-scale').text('0　500　1,000　　 2,000　公里');
  } catch (error) {
    holder.innerHTML = '<div class="ref-map-error">省级边界文件加载失败，请检查本地数据文件。</div>';
    console.error(error);
  }
}
function featureFeatureIsProvince(feature){ return Boolean(feature?.properties?.name); }

function provinceIndustryRows(score){
  const clamp = n => Math.max(42, Math.min(96, n));
  return [['电网改造','输配电设备',clamp(score + 5)],['储能设备','储能系统集成',clamp(score + 1)],['工厂自动化','工业控制系统',clamp(score - 7)],['充电设施','充电桩与配套',clamp(score - 15)],['数据中心','供配电与机柜',clamp(score - 23)],['轨道交通','牵引供电设备',clamp(score - 31)]];
}
function provinceDeviceRows(score){
  const clamp = n => Math.max(38, Math.min(96, n));
  return [['连接器','电网改造 / 工厂自动化',clamp(score + 1)],['接线端子','电网改造',clamp(score - 5)],['电源保护','数据中心 / 储能设备',clamp(score - 11)],['控制系统','工厂自动化 / 轨道交通',clamp(score - 19)],['工业通信','工厂自动化 / 数据中心',clamp(score - 28)]];
}
function renderProvinceRows(rows){ return rows.map((row,i)=>`<div class="ref-province-row"><div class="ref-row-icon">${refIcon(i===0?'radar':i===1?'box':i===2?'book':'link')}</div><strong>${row[0]}</strong><span>${row[1]}</span><b>${row[2]}</b><div class="ref-row-track"><i style="width:${row[2]}%"></i></div><em>${i===0?'↗':'↗'}</em></div>`).join(''); }

function renderReferenceOverviewMap(){
  const selected = state.selectedProvince || '广东'; const pv = PROVINCE_DATA[selected]?.pv; const heat = provinceHeat(selected) || 40; const industryRows = provinceIndustryRows(heat); const deviceRows = provinceDeviceRows(heat);
  const clues = selected === '江苏' ? [['01','共享储能项目并网','南京江宁禄口项目已于2025-12-23并网，作为储能设备需求案例。','储能设备','江苏 · 南京'],['02','储能系统设备采购','55MW/110MWh规划口径，招标信息为转载待核验。','储能设备','江苏 · 南京'],['03','企业级接插件寻源','江苏林洋储能年度接插件寻源，项目级对应关系仍待确认。','连接器','江苏 · 南通']] : [['01','该省公开项目样本待补采','当前公开数据只用于省级需求热度，不把推导值写成已发生项目。','待补采','省级'],['02','先核验采购公告与设备更新','建议从公共资源交易公告、企业项目公告和配电改造线索开始。','端子 / 电源保护','省级'],['03','建立省级需求证据链','补齐项目主体、采购阶段、设备清单与技术条件后再输出选型。','全品类','省级']];
  return `<div class="reference-app ref-overview"><header class="ref-hero"><div><div class="ref-kicker">INDUSTRY INTELLIGENCE</div><h1>中国电气市场 · 洞察未来</h1><p>公开数据分析｜省级需求热度由公开光伏并网容量归一化推导</p></div><div class="ref-work-badge">独立作品 · 概念稿</div></header><nav class="ref-tabs"><a class="ref-tab active" href="#overview">${refIcon('grid')}市场总览</a><a class="ref-tab" href="#overview">${refIcon('radar')}行业机会</a><a class="ref-tab" href="#products">${refIcon('box')}产品匹配</a><a class="ref-tab" href="#project">${refIcon('book')}项目线索</a><a class="ref-tab" href="#evidence">${refIcon('link')}证据中心</a><div class="ref-cycle">▣ 演示周期 <select><option>2026 Q1省级快照</option></select></div></nav><div class="ref-body"><div class="ref-map-grid"><section class="ref-card ref-province-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('radar')}<h2>${esc(selected)}省相关产业</h2></div><span class="ref-card-note">查看更多 ›</span></div><div class="ref-card-body"><div class="ref-table-head"><span>行业</span><span>相关产业</span><span>需求指数</span><span>趋势</span></div>${renderProvinceRows(industryRows)}<div class="ref-derived-note">指数为省级光伏并网容量归一化推导，非企业订单。</div></div></section><section class="ref-card ref-map-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('grid')}<h2>全国电气市场需求热度分布</h2></div><select class="ref-map-select"><option>需求热度</option></select></div><div class="ref-map-body"><div class="ref-map-legend-top"><span>需求热度</span><i></i><b>低</b><em>高</em></div>${renderProvinceMap(selected)}<div class="ref-province-popup"><div class="ref-popup-title">♛ ${esc(selected)}省 <span>需求热度第${Math.max(1,Math.round(32 - (heat-40)/2))}位</span></div><div class="ref-popup-stats"><div><small>需求指数</small><strong>${heat}</strong></div><div><small>累计并网</small><strong>${pv == null ? '—' : pv.toLocaleString('zh-CN')}<i>万千瓦</i></strong></div><div><small>数据期</small><strong>2026 Q1</strong></div></div><button class="ref-popup-button" data-route="project">查看相关需求 ${refIcon('arrow')}</button></div><div class="ref-map-legend-bottom"><span><i class="low"></i>低</span><span><i class="mid"></i>中</span><span><i class="high"></i>高</span><span><i class="max"></i>最高</span></div></div></section><section class="ref-card ref-device-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('box')}<h2>${esc(selected)}省设备需求</h2></div><span class="ref-card-note">查看更多 ›</span></div><div class="ref-card-body"><div class="ref-table-head device"><span>设备类型</span><span>关联产业</span><span>需求热度</span></div>${renderProvinceRows(deviceRows)}<div class="ref-derived-note">设备热度按省级指数与应用场景权重推导。</div></div><div class="ref-purchase-card"><div class="ref-card-title">${refIcon('radar')}<h3>采购阶段分布（${esc(selected)}省）</h3></div><div class="ref-purchase-bars"><div><b>37%</b><i style="width:37%"></i><span>前期规划</span></div><div><b>28%</b><i style="width:28%"></i><span>招标采购</span></div><div><b>22%</b><i style="width:22%"></i><span>方案设计</span></div><div><b>13%</b><i style="width:13%"></i><span>施工建设</span></div></div><p>省级采购阶段为当前研究结构示意，项目级证据待补采。</p></div></section></div><section class="ref-card ref-clue-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('book')}<h2>项目需求线索（${esc(selected)}省）</h2></div><span class="ref-card-note">公开公告 / 项目线索</span></div><div class="ref-clue-table"><div class="ref-clue-head"><span>#</span><span>需求项目</span><span>项目概述</span><span>关联设备</span><span>所属行业</span><span>项目阶段</span><span>地区</span><span>操作</span></div>${clues.map(row=>`<div class="ref-clue-row"><b>${row[0]}</b><strong>${row[1]}</strong><span>${row[2]}</span><span>${row[3]}</span><span>${selected==='江苏'?'储能设备':'省级需求'}</span><em>${selected==='江苏'?'历史案例':'待补采'}</em><span>${row[4]}</span><button data-action="open-project">查看详情 ${refIcon('arrow')}</button></div>`).join('')}</div></section><div class="ref-footer"><span>${refIcon('book')} 数据来源：${PROVINCE_SOURCE} · <a href="https://epaper.ceic.com/pc/attachment/202605/22/f9cf37e1-b91b-4113-886d-e54c6a372871.pdf" target="_blank" rel="noreferrer">查看公开附件</a></span><span>所有指数均为研究推导，不代表市场份额或企业订单</span></div></div></div>`;
}

function renderProvinceRowsV2(rows, device = false){
  const rowIcons = device ? ['connector','terminal','shield','control','antenna'] : ['transmission','battery','factory','plug','server','train'];
  return rows.map((row,i) => device
    ? `<div class="ref-province-row-v2 device-row"><div class="ref-row-name"><div class="ref-row-icon">${refIcon(rowIcons[i] || 'device')}</div><strong>${row[0]}</strong></div><span class="ref-row-category">${row[1]}</span><div class="ref-row-score"><b>${row[2]}</b><div class="ref-row-track"><i style="width:${row[2]}%"></i></div></div></div>`
    : `<div class="ref-province-row-v2 ${i===0?'is-focus':''}"><div class="ref-row-name"><div class="ref-row-icon">${refIcon(rowIcons[i] || 'grid')}</div><strong>${row[0]}</strong></div><span class="ref-row-category">${row[1]}</span><div class="ref-row-score"><b>${row[2]}</b><div class="ref-row-track"><i style="width:${row[2]}%"></i></div></div><em>↗</em></div>`
  ).join('');
}

function refHeroScene(){
  return '<div class="ref-hero-scene" aria-hidden="true"></div>';
}

function renderReferenceOverviewMapV2(){
  const selected = state.selectedProvince || '江苏';
  const pv = PROVINCE_DATA[selected]?.pv;
  const heat = provinceHeat(selected) || 40;
  const industryRows = provinceIndustryRows(heat);
  const deviceRows = provinceDeviceRows(heat);
  const clues = selected === '江苏'
    ? [['01','共享储能项目并网','南京江宁禄口项目已于2025-12-23并网，作为储能设备需求案例。','储能设备','江苏 · 南京','历史案例'],['02','储能系统设备采购','55MW/110MWh规划口径，招标信息为转载待核验。','储能设备','江苏 · 南京','待核验'],['03','企业级接插件寻源','江苏林洋储能年度接插件寻源，项目级对应关系仍待确认。','连接器','江苏 · 南通','待核验']]
    : [['01','该省公开项目样本待补采','当前公开数据只用于省级需求热度，不把推导值写成已发生项目。','待补采','省级','待补采'],['02','先核验采购公告与设备更新','建议从公共资源交易公告、企业项目公告和配电改造线索开始。','端子 / 电源保护','省级','待补采'],['03','建立省级需求证据链','补齐项目主体、采购阶段、设备清单与技术条件后再输出选型。','全品类','省级','待补采']];
  return `<div class="reference-app ref-overview"><header class="ref-hero ref-hero-v2"><div class="ref-hero-copy"><div class="ref-kicker">INDUSTRY INTELLIGENCE</div><h1>中国电气市场 · 洞察未来</h1><p>公开数据分析｜所有数值与图表均为演示</p></div>${refHeroScene()}<div class="ref-work-badge">独立作品 · 概念稿</div></header><nav class="ref-tabs"><a class="ref-tab active" href="#overview">${refIcon('grid')}市场总览</a><a class="ref-tab" href="#overview">${refIcon('radar')}行业机会</a><a class="ref-tab" href="#products">${refIcon('box')}产品匹配</a><a class="ref-tab" href="#project">${refIcon('book')}项目线索</a><a class="ref-tab" href="#evidence">${refIcon('link')}证据中心</a><div class="ref-cycle">▣ 演示周期 <select><option>2026 Q1省级快照</option></select></div></nav><div class="ref-body ref-overview-body"><div class="ref-map-grid ref-map-grid-v2"><section class="ref-card ref-province-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('radar')}<h2>${esc(selected)}省相关产业</h2></div><span class="ref-card-note">查看更多 ›</span></div><div class="ref-card-body"><div class="ref-table-head-v2 industry"><span>行业</span><span>相关产业</span><span>需求指数</span><span>趋势</span></div>${renderProvinceRowsV2(industryRows)}<div class="ref-derived-note">指数为省级光伏并网容量归一化推导，非企业订单。</div></div></section><section class="ref-card ref-map-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('grid')}<h2>全国电气市场需求热度分布</h2></div><select class="ref-map-select"><option>需求热度</option></select></div><div class="ref-map-body ref-map-body-v2"><div class="ref-map-legend-top"><span>需求热度</span><i></i><b>低</b><em>高</em></div>${renderProvinceMap(selected)}<div class="ref-province-popup"><div class="ref-popup-title">♛ ${esc(selected)}省 <span>状态 · ${selected==='江苏'?'历史案例':'待补采'}</span></div><div class="ref-popup-stats"><div><small>需求指数</small><strong>${heat}</strong></div><div><small>累计并网</small><strong>${pv == null ? '—' : pv.toLocaleString('zh-CN')}<i>万千瓦</i></strong></div><div><small>数据期</small><strong>2026 Q1</strong></div></div><button class="ref-popup-button" data-route="project">查看相关需求 ${refIcon('arrow')}</button></div><div class="ref-map-legend-bottom"><span><i class="low"></i>低</span><span><i class="mid"></i>中</span><span><i class="high"></i>高</span><span><i class="max"></i>最高</span></div></div></section><div class="ref-right-stack"><section class="ref-card ref-device-card"><div class="ref-card-head"><div class="ref-card-title">${refIcon('box')}<h2>${esc(selected)}省设备需求</h2></div><span class="ref-card-note">查看更多 ›</span></div><div class="ref-card-body"><div class="ref-table-head-v2 device"><span>设备类型</span><span>关联产业</span><span>需求热度</span></div>${renderProvinceRowsV2(deviceRows,true)}<div class="ref-derived-note">设备热度按省级指数与应用场景权重推导。</div></div></section><section class="ref-card ref-purchase-card-v2"><div class="ref-card-head"><div class="ref-card-title">${refIcon('radar')}<h2>采购阶段分布（${esc(selected)}省）</h2></div></div><div class="ref-purchase-bars-v2"><div><b>37%</b><i style="width:37%"></i><span>前期规划</span></div><div><b>28%</b><i style="width:28%"></i><span>招标采购</span></div><div><b>22%</b><i style="width:22%"></i><span>方案设计</span></div><div><b>13%</b><i style="width:13%"></i><span>施工建设</span></div></div><p>省级采购阶段为研究结构示意，项目级证据待补采。</p></section></div></div><section class="ref-card ref-clue-card ref-clue-card-v2"><div class="ref-card-head"><div class="ref-card-title">${refIcon('book')}<h2>项目需求线索（${esc(selected)}省）</h2></div><span class="ref-card-note">公开公告 / 项目线索</span></div><div class="ref-clue-table"><div class="ref-clue-head"><span>#</span><span>需求项目</span><span>项目概述</span><span>关联设备</span><span>所属行业</span><span>项目阶段</span><span>地区</span><span>操作</span></div>${clues.map(row=>`<div class="ref-clue-row"><b>${row[0]}</b><strong>${row[1]}</strong><span>${row[2]}</span><span>${row[3]}</span><span>${selected==='江苏'?'储能设备':'省级需求'}</span><em>${row[5]}</em><span>${row[4]}</span><button data-action="open-project">查看详情 ${refIcon('arrow')}</button></div>`).join('')}</div></section><div class="ref-footer"><span>${refIcon('book')} 数据来源：${PROVINCE_SOURCE} · <a href="https://epaper.ceic.com/pc/attachment/202605/22/f9cf37e1-b91b-4113-886d-e54c6a372871.pdf" target="_blank" rel="noreferrer">查看公开附件</a></span><span>所有指数均为研究推导，不代表市场份额或企业订单</span></div></div></div>`;
}

function renderReference(){
  const route=state.route;
  const content=route==='products'?renderReferenceProducts():route==='project'?renderReferenceProject():route==='evidence'?renderReferenceEvidence():renderReferenceOverviewMapV2();
  document.querySelector('#app').innerHTML=content;
  bindEvents();
  hydrateProvinceMap();
}

window.__phoenixSelectProvince = selectProvince;
window.addEventListener('hashchange', () => { state.route = location.hash.slice(1) || 'overview'; state.search = ''; document.querySelector('.modal-backdrop')?.remove(); renderReference(); });
renderReference();
