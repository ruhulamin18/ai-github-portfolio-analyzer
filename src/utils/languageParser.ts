import { LanguageStat, Repository } from '../types';

export const LANG_COLOR_PALETTE: Record<string, string> = {
  JavaScript: '#F7DF1E',   // Bright Yellow
  TypeScript: '#3178C6',   // Deep Blue
  Python: '#3572A5',       // Steel Blue
  Java: '#B07219',         // Golden Brown
  HTML: '#E34C26',         // Red-Orange
  CSS: '#563D7C',          // Deep Purple
  'C++': '#F34B7D',        // Vivid Pink/Red
  C: '#555555',            // Slate Gray
  'C#': '#178600',         // Forest Green
  Go: '#00ADD8',           // Bright Cyan
  Ruby: '#E11D48',         // Crimson Red
  PHP: '#6366F1',          // Indigo
  Shell: '#84CC16',        // Lime Green
  Rust: '#DEA584',         // Bronze
  Swift: '#F05138',        // Bright Orange
  Kotlin: '#A97BFF',       // Purple Violet
  Dart: '#00B4AB',         // Teal
  Vue: '#41B883',          // Emerald Green
  Svelte: '#FF3E00',       // Coral Red
  Jupyter: '#DA5B0B',      // Dark Orange
  'Jupyter Notebook': '#DA5B0B',
  R: '#198CE7',            // Sky Blue
  Scala: '#DC322F',        // Bright Crimson
  Elixir: '#6E4A7E',       // Dark Orchid
  Haskell: '#5E5086',      // Slate Purple
  Lua: '#000080',          // Navy Blue
  Clojure: '#DB5855',      // Terracotta
  Perl: '#0298C3',         // Aqua
  Matlab: '#E16737',       // Rust Orange
  Assembly: '#6E4C13',     // Coffee Brown
  Others: '#94A3B8',       // Gray
};

const DYNAMIC_FALLBACK_COLORS = [
  '#F59E0B', '#10B981', '#EC4899', '#8B5CF6', '#06B6D4',
  '#E11D48', '#84CC16', '#F97316', '#3B82F6', '#6366F1', '#14B8A6'
];

export function getLanguageColor(name: string, customColor?: string, index: number = 0): string {
  if (LANG_COLOR_PALETTE[name]) {
    return LANG_COLOR_PALETTE[name];
  }
  if (customColor && customColor !== '#3B82F6' && customColor !== '#94a3b8' && customColor !== '#94A3B8') {
    return customColor;
  }
  return DYNAMIC_FALLBACK_COLORS[index % DYNAMIC_FALLBACK_COLORS.length];
}

export interface ProcessedLanguage {
  name: string;
  percentage: number;
  displayVal: string;
  color: string;
}

export function parseLanguageDistribution(
  languages: LanguageStat[] = [],
  repos: Repository[] = []
): ProcessedLanguage[] {
  let rawLangList: { name: string; percentage: number; color: string }[] = [];

  if (languages && languages.length > 0) {
    rawLangList = languages
      .map((l, idx) => ({
        name: l.name,
        percentage: Number(l.percentage),
        color: getLanguageColor(l.name, l.color, idx),
      }))
      .filter((l) => l.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage);
  } else {
    const langCounts: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language) {
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      }
    });
    const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    rawLangList = Object.entries(langCounts)
      .map(([name, count], idx) => ({
        name,
        percentage: (count / total) * 100,
        color: getLanguageColor(name, undefined, idx),
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }

  // Ensure unique colors across all items in rawLangList
  const usedColors = new Set<string>();
  rawLangList = rawLangList.map((l) => {
    let color = l.color;
    if (usedColors.has(color.toLowerCase())) {
      const available = DYNAMIC_FALLBACK_COLORS.find((c) => !usedColors.has(c.toLowerCase()));
      if (available) {
        color = available;
      }
    }
    usedColors.add(color.toLowerCase());
    return { ...l, color };
  });

  if (rawLangList.length <= 5) {
    return rawLangList.map((l) => {
      const rounded = Math.round(l.percentage * 10) / 10;
      return {
        name: l.name,
        percentage: rounded,
        displayVal: `${rounded.toFixed(1)}%`,
        color: l.color,
      };
    });
  }

  const top5 = rawLangList.slice(0, 5);
  const othersSum = rawLangList.slice(5).reduce((acc, curr) => acc + curr.percentage, 0);

  const result: ProcessedLanguage[] = top5.map((l) => {
    const rounded = Math.round(l.percentage * 10) / 10;
    return {
      name: l.name,
      percentage: rounded,
      displayVal: `${rounded.toFixed(1)}%`,
      color: l.color,
    };
  });

  if (othersSum > 0) {
    const othersRounded = Math.round(othersSum * 10) / 10;
    result.push({
      name: 'Others',
      percentage: othersRounded,
      displayVal: `${othersRounded.toFixed(1)}%`,
      color: LANG_COLOR_PALETTE.Others,
    });
  }

  return result;
}
