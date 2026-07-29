import { LanguageStat, Repository } from '../types';

export const LANG_COLOR_PALETTE: Record<string, string> = {
  JavaScript: '#F59E0B',
  Python: '#3B82F6',
  Java: '#10B981',
  HTML: '#EF4444',
  CSS: '#8B5CF6',
  TypeScript: '#3178C6',
  'C++': '#EC4899',
  Go: '#06B6D4',
  Ruby: '#E11D48',
  PHP: '#6366F1',
  Shell: '#84CC16',
  Others: '#94A3B8',
};

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
      .map((l) => ({
        name: l.name,
        percentage: Number(l.percentage),
        color: l.color || LANG_COLOR_PALETTE[l.name] || '#F59E0B',
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
      .map(([name, count]) => ({
        name,
        percentage: (count / total) * 100,
        color: LANG_COLOR_PALETTE[name] || '#F59E0B',
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }

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
