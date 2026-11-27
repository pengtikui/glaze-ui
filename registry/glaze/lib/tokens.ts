/**
 * Design System Tokens
 * 9 Pastel Hue Families × 6 Shades + 4 Dark Accent Tiles + 11 Neutrals + 5 Semantic + DataViz
 */

export type Hue =
  | 'sky'
  | 'mint'
  | 'peach'
  | 'lilac'
  | 'rose'
  | 'lemon'
  | 'aqua'
  | 'periwinkle'
  | 'coral'

export type DarkTone = 'sky-dark' | 'lilac-dark' | 'aqua-dark' | 'ink'

export type TileTone = 'white' | Hue | DarkTone

export type Status = 'normal' | 'warning' | 'error' | 'info' | 'disabled'

export type TileSize = 's' | 'w' | 't' | 'l' | 'f'

export interface HuePalette {
  id: Hue
  cn: string
  en: string
  50: string
  100: string
  300: string
  500: string
  700: string
  900: string
}

export const HUE_PALETTES: Record<Hue, HuePalette> = {
  sky: {
    id: 'sky',
    cn: '天蓝',
    en: 'Sky',
    50: '#EEF7FD',
    100: '#DDF0FB',
    300: '#A9D6F3',
    500: '#4A9BD8',
    700: '#24557F',
    900: '#123A5C',
  },
  mint: {
    id: 'mint',
    cn: '薄荷',
    en: 'Mint',
    50: '#F1FAEC',
    100: '#E2F5DA',
    300: '#B2DE9F',
    500: '#49A851',
    700: '#2F6B28',
    900: '#173F12',
  },
  peach: {
    id: 'peach',
    cn: '杏桃',
    en: 'Peach',
    50: '#FEF6EA',
    100: '#FBEBD4',
    300: '#F5C995',
    500: '#E3A33B',
    700: '#8A4B12',
    900: '#4D2306',
  },
  lilac: {
    id: 'lilac',
    cn: '丁香',
    en: 'Lilac',
    50: '#FAF1FB',
    100: '#F4E3F6',
    300: '#DDB4E2',
    500: '#A970D6',
    700: '#6A2D70',
    900: '#42104A',
  },
  rose: {
    id: 'rose',
    cn: '玫瑰',
    en: 'Rose',
    50: '#FDF1F4',
    100: '#FBE3E8',
    300: '#F2AEBE',
    500: '#E0607E',
    700: '#8C2440',
    900: '#561228',
  },
  lemon: {
    id: 'lemon',
    cn: '柠檬',
    en: 'Lemon',
    50: '#FEFBEA',
    100: '#FBF3C9',
    300: '#F2DE7C',
    500: '#D4B21E',
    700: '#6E5A06',
    900: '#3E3200',
  },
  aqua: {
    id: 'aqua',
    cn: '湖水',
    en: 'Aqua',
    50: '#EDF9F8',
    100: '#D5F2EF',
    300: '#93DAD3',
    500: '#2FA79B',
    700: '#17625B',
    900: '#0B3D38',
  },
  periwinkle: {
    id: 'periwinkle',
    cn: '长春花',
    en: 'Periwinkle',
    50: '#F3F4FE',
    100: '#E4E6FD',
    300: '#B5BAF6',
    500: '#7B80EA',
    700: '#4A4FB8',
    900: '#262B7A',
  },
  coral: {
    id: 'coral',
    cn: '珊瑚',
    en: 'Coral',
    50: '#FEF2EE',
    100: '#FDE5DC',
    300: '#F7B39C',
    500: '#E5603B',
    700: '#A6360F',
    900: '#5E1E0A',
  },
}

export const HUE_LIST: HuePalette[] = [
  HUE_PALETTES.sky,
  HUE_PALETTES.mint,
  HUE_PALETTES.peach,
  HUE_PALETTES.lilac,
  HUE_PALETTES.rose,
  HUE_PALETTES.lemon,
  HUE_PALETTES.aqua,
  HUE_PALETTES.periwinkle,
  HUE_PALETTES.coral,
]

export interface TileTheme {
  id: TileTone
  cn: string
  code: string
  bg: string
  ink: string
  soft: string
  accent: string
  mutedBar: string
  track: string
  divider: string
  dark?: boolean
}

export const TILE_THEMES: Record<TileTone, TileTheme> = {
  white: {
    id: 'white',
    cn: '纯白',
    code: 'N0',
    bg: '#FFFFFF',
    ink: '#1B1F27',
    soft: '#5B6170',
    accent: '#7B80EA',
    mutedBar: '#ECECF4',
    track: '#ECECF4',
    divider: '#F2F3F5',
  },
  sky: {
    id: 'sky',
    cn: '天蓝',
    code: 'Sky',
    bg: '#DDF0FB',
    ink: '#123A5C',
    soft: '#24557F',
    accent: '#4A9BD8',
    mutedBar: '#A9D6F3',
    track: 'rgba(18,58,92,0.12)',
    divider: 'rgba(18,58,92,0.15)',
  },
  mint: {
    id: 'mint',
    cn: '薄荷',
    code: 'Mint',
    bg: '#E2F5DA',
    ink: '#173F12',
    soft: '#2F6B28',
    accent: '#49A851',
    mutedBar: '#B2DE9F',
    track: 'rgba(23,63,18,0.12)',
    divider: 'rgba(23,63,18,0.15)',
  },
  peach: {
    id: 'peach',
    cn: '杏桃',
    code: 'Peach',
    bg: '#FBEBD4',
    ink: '#4D2306',
    soft: '#8A4B12',
    accent: '#E3A33B',
    mutedBar: '#F5C995',
    track: 'rgba(77,35,6,0.12)',
    divider: 'rgba(77,35,6,0.15)',
  },
  lilac: {
    id: 'lilac',
    cn: '丁香',
    code: 'Lilac',
    bg: '#F4E3F6',
    ink: '#42104A',
    soft: '#6A2D70',
    accent: '#A970D6',
    mutedBar: '#DDB4E2',
    track: 'rgba(66,16,74,0.12)',
    divider: 'rgba(66,16,74,0.15)',
  },
  rose: {
    id: 'rose',
    cn: '玫瑰',
    code: 'Rose',
    bg: '#FBE3E8',
    ink: '#561228',
    soft: '#8C2440',
    accent: '#E0607E',
    mutedBar: '#F2AEBE',
    track: 'rgba(86,18,40,0.12)',
    divider: 'rgba(86,18,40,0.15)',
  },
  lemon: {
    id: 'lemon',
    cn: '柠檬',
    code: 'Lemon',
    bg: '#FBF3C9',
    ink: '#3E3200',
    soft: '#6E5A06',
    accent: '#D4B21E',
    mutedBar: '#F2DE7C',
    track: 'rgba(62,50,0,0.12)',
    divider: 'rgba(62,50,0,0.15)',
  },
  aqua: {
    id: 'aqua',
    cn: '湖水',
    code: 'Aqua',
    bg: '#D5F2EF',
    ink: '#0B3D38',
    soft: '#17625B',
    accent: '#2FA79B',
    mutedBar: '#93DAD3',
    track: 'rgba(11,61,56,0.12)',
    divider: 'rgba(11,61,56,0.15)',
  },
  periwinkle: {
    id: 'periwinkle',
    cn: '长春花',
    code: 'Periwinkle',
    bg: '#E4E6FD',
    ink: '#262B7A',
    soft: '#4A4FB8',
    accent: '#7B80EA',
    mutedBar: '#B5BAF6',
    track: 'rgba(38,43,122,0.12)',
    divider: 'rgba(38,43,122,0.15)',
  },
  coral: {
    id: 'coral',
    cn: '珊瑚',
    code: 'Coral',
    bg: '#FDE5DC',
    ink: '#5E1E0A',
    soft: '#A6360F',
    accent: '#E5603B',
    mutedBar: '#F7B39C',
    track: 'rgba(94,30,10,0.12)',
    divider: 'rgba(94,30,10,0.15)',
  },
  'sky-dark': {
    id: 'sky-dark',
    cn: '天蓝 · 深',
    code: 'Sky 900',
    bg: '#123A5C',
    ink: '#FFFFFF',
    soft: '#C9DDEE',
    accent: '#4A9BD8',
    mutedBar: 'rgba(255,255,255,0.24)',
    track: 'rgba(255,255,255,0.16)',
    divider: 'rgba(255,255,255,0.16)',
    dark: true,
  },
  'lilac-dark': {
    id: 'lilac-dark',
    cn: '丁香 · 深',
    code: 'Lilac 900',
    bg: '#42104A',
    ink: '#FFFFFF',
    soft: '#E7CDEB',
    accent: '#DDB4E2',
    mutedBar: 'rgba(255,255,255,0.24)',
    track: 'rgba(255,255,255,0.16)',
    divider: 'rgba(255,255,255,0.16)',
    dark: true,
  },
  'aqua-dark': {
    id: 'aqua-dark',
    cn: '湖水 · 深',
    code: 'Aqua 900',
    bg: '#0B3D38',
    ink: '#FFFFFF',
    soft: '#BFE8E3',
    accent: '#93DAD3',
    mutedBar: 'rgba(255,255,255,0.24)',
    track: 'rgba(255,255,255,0.16)',
    divider: 'rgba(255,255,255,0.16)',
    dark: true,
  },
  ink: {
    id: 'ink',
    cn: '墨色',
    code: 'Ink',
    bg: '#1B1F27',
    ink: '#FFFFFF',
    soft: '#C5CAD3',
    accent: '#B5BAF6',
    mutedBar: 'rgba(255,255,255,0.24)',
    track: 'rgba(255,255,255,0.16)',
    divider: 'rgba(255,255,255,0.16)',
    dark: true,
  },
}

export const NEUTRALS = [
  { name: 'N0', hex: '#FFFFFF', use: '白色卡片（无描边无投影）、浮层' },
  { name: 'Canvas', hex: '#F2F4F8', use: '页面画布底色（自然衬托白卡）' },
  { name: 'N25', hex: '#F6F7F9', use: '内嵌区块、所有表单控件默认底色' },
  { name: 'N50', hex: '#F2F3F5', use: '胶囊轨道、次级按钮' },
  { name: 'N100', hex: '#E8EBF0', use: '分隔线、浮层微描边' },
  { name: 'N150', hex: '#EEF0F3', use: '列表行分割线' },
  { name: 'N300', hex: '#CDD3DD', use: '拓扑连接线、禁用态' },
  { name: 'N500', hex: '#8A90A0', use: '占位符、装饰图标' },
  { name: 'N600', hex: '#6B7280', use: '说明文字' },
  { name: 'N700', hex: '#5B6170', use: '标签文字' },
  { name: 'N900', hex: '#1B1F27', use: '正文、数字、主按钮' },
] as const

export const SEMANTIC_TOKENS: Record<
  Status,
  {
    name: string
    label: string
    dot: string
    base: string
    bg50: string
    pillBg: string
    ink: string
  }
> = {
  normal: {
    name: '正常',
    label: '正常',
    dot: '#49A851',
    base: '薄荷 500',
    bg50: '#F1FAEC',
    pillBg: '#E2F5DA',
    ink: '#2F6B28',
  },
  warning: {
    name: '注意',
    label: '注意',
    dot: '#E3A33B',
    base: '杏桃 500',
    bg50: '#FEF6EA',
    pillBg: '#FBEBD4',
    ink: '#8A4B12',
  },
  error: {
    name: '异常',
    label: '异常',
    dot: '#E5603B',
    base: '珊瑚 500',
    bg50: '#FEF2EE',
    pillBg: '#FDE5DC',
    ink: '#A6360F',
  },
  info: {
    name: '信息',
    label: '进行中',
    dot: '#4A9BD8',
    base: '天蓝 500',
    bg50: '#EEF7FD',
    pillBg: '#DDF0FB',
    ink: '#24557F',
  },
  disabled: {
    name: '停用',
    label: '已停用',
    dot: '#C5CAD3',
    base: '中性 300',
    bg50: '#F6F7F9',
    pillBg: '#F2F3F5',
    ink: '#5B6170',
  },
}

export const DATAVIZ_PALETTES = {
  categorical: [
    '#7B80EA',
    '#2FA79B',
    '#E3A33B',
    '#E0607E',
    '#4A9BD8',
    '#49A851',
    '#A970D6',
    '#D4B21E',
  ],
  sequential: ['#E4E6FD', '#B5BAF6', '#7B80EA', '#4A4FB8', '#262B7A'],
  diverging: [
    '#A6360F',
    '#E5603B',
    '#F7B39C',
    '#F2F3F5',
    '#93DAD3',
    '#2FA79B',
    '#17625B',
  ],
  heatmapLevels: ['#F2F3F5', '#E4E6FD', '#B5BAF6', '#7B80EA', '#4A4FB8'],
} as const

export const RADII_TOKENS = [
  { px: 28, label: '卡片 / Dialog / Drawer', bg: '#DDF0FB', size: 96 },
  { px: 20, label: '弹出浮层（Menu / Select / Popover）', bg: '#E4E6FD', size: 84 },
  { px: 18, label: '多行与内嵌块（Textarea / Fieldset / Accordion）', bg: '#F4E3F6', size: 74 },
  { px: 14, label: '应用图标 / 下拉菜单项（12px）', bg: '#D5F2EF', size: 56 },
  { px: 10, label: '图标底（Checkbox 6px）', bg: '#FBF3C9', size: 40 },
  { px: 999, label: '全圆胶囊（Button / Select / Input / Switch / Tabs）', bg: '#E8EBF0', size: 72, height: 26, displayLabel: '全圆' },
] as const

export const SPACING_TOKENS = [
  { v: 4, use: '图标与文字' },
  { v: 8, use: '标签之间' },
  { v: 12, use: '列表行距' },
  { v: 16, use: '网格间隙' },
  { v: 20, use: '内嵌区块内边距' },
  { v: 24, use: '格子内边距' },
  { v: 32, use: '区块之间' },
  { v: 48, use: '页面分区' },
] as const

export const TYPOGRAPHY_SCALE = [
  {
    name: '数字 XL',
    sample: '1,284',
    family: "'Plus Jakarta Sans', 'Noto Sans SC', sans-serif",
    size: '68px',
    lh: '68px',
    weight: 800,
    ls: '-0.03em',
    color: '#1B1F27',
    spec: 'Jakarta 800 · 68 / 68 · 字距 -3%',
  },
  {
    name: '数字 L',
    sample: '72%',
    family: "'Plus Jakarta Sans', 'Noto Sans SC', sans-serif",
    size: '48px',
    lh: '50px',
    weight: 800,
    ls: '-0.03em',
    color: '#1B1F27',
    spec: 'Jakarta 800 · 48 / 50',
  },
  {
    name: '数字 M',
    sample: '36.5',
    family: "'Plus Jakarta Sans', 'Noto Sans SC', sans-serif",
    size: '32px',
    lh: '36px',
    weight: 800,
    ls: '-0.02em',
    color: '#1B1F27',
    spec: 'Jakarta 800 · 32 / 36',
  },
  {
    name: '页面标题',
    sample: '这里是页面标题',
    family: "'Plus Jakarta Sans', 'Noto Sans SC', sans-serif",
    size: '38px',
    lh: '46px',
    weight: 800,
    ls: '-0.02em',
    color: '#123A5C',
    spec: 'Jakarta / 思源黑体 800 · 38 / 46',
  },
  {
    name: '卡片标题',
    sample: '卡片标题',
    family: "'Plus Jakarta Sans', 'Noto Sans SC', sans-serif",
    size: '22px',
    lh: '28px',
    weight: 800,
    ls: '0',
    color: '#1B1F27',
    spec: 'Jakarta / 思源黑体 800 · 22 / 28',
  },
  {
    name: '小标题',
    sample: '区块小标题',
    family: "'Inter', 'Noto Sans SC', sans-serif",
    size: '17px',
    lh: '24px',
    weight: 700,
    ls: '0',
    color: '#1B1F27',
    spec: 'Inter / 思源黑体 700 · 17 / 24',
  },
  {
    name: '正文',
    sample: '正文用于说明与段落，单行不超过 40 个汉字。',
    family: "'Inter', 'Noto Sans SC', sans-serif",
    size: '15px',
    lh: '24px',
    weight: 400,
    ls: '0',
    color: '#1B1F27',
    spec: '400 · 15 / 24',
  },
  {
    name: '标签',
    sample: '格子左上角的标签',
    family: "'Inter', 'Noto Sans SC', sans-serif",
    size: '14px',
    lh: '20px',
    weight: 500,
    ls: '0',
    color: '#5B6170',
    spec: '500 · 14 / 20',
  },
  {
    name: '说明',
    sample: '辅助说明 · 12:30 更新',
    family: "'Inter', 'Noto Sans SC', sans-serif",
    size: '12px',
    lh: '16px',
    weight: 400,
    ls: '0',
    color: '#6B7280',
    spec: '400 · 12 / 16 · 最小字号',
  },
] as const
