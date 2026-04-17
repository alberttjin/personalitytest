import { isValidArchetypeCode } from './data';

/** Valid tab identifier (matches UI); URL slugs differ — see `TAB_SEGMENT`. */
export type AppTab = 'quiz' | 'types' | 'guide';

/** URL path segment after the base prefix for each tab */
const TAB_SEGMENT: Record<AppTab, string> = {
  quiz: 'quiz',
  types: 'personality-types',
  guide: 'letter-key',
};

/** Path segments before app routes, e.g. ['personalitytest'] on GitHub Pages. */
export function pathPrefixSegments(): string[] {
  const raw = (import.meta.env.BASE_URL || '/').replace(/^\/+|\/+$/g, '');
  return raw ? raw.split('/').filter(Boolean) : [];
}

export function buildTypePath(code: string): string {
  const prefix = pathPrefixSegments();
  return '/' + [...prefix, 'type', code].join('/');
}

export function buildTabPath(tab: AppTab): string {
  const prefix = pathPrefixSegments();
  return '/' + [...prefix, TAB_SEGMENT[tab]].join('/');
}

export function buildTypeShareUrl(code: string): string {
  return `${window.location.origin}${buildTypePath(code)}`;
}

/** Root of the SPA (base URL only), e.g. `/` or `/personalitytest/` */
export function buildHomePath(): string {
  const prefix = pathPrefixSegments();
  if (!prefix.length) return '/';
  return `/${prefix.join('/')}/`;
}

export type ParsedAppRoute =
  | { mode: 'type'; code: string }
  | { mode: 'tab'; tab: AppTab };

function restPathAfterPrefix(): string[] {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const prefix = pathPrefixSegments();
  if (!prefix.length) return pathParts;
  if (pathParts.length < prefix.length) return [];
  for (let i = 0; i < prefix.length; i++) {
    if (pathParts[i] !== prefix[i]) return [];
  }
  return pathParts.slice(prefix.length);
}

/** e.g. TRP from `/personalitytest/type/TRP` or `/type/TRP` in dev */
export function parseTypeCodeFromPath(): string | null {
  const rest = restPathAfterPrefix();
  if (rest[0] === 'type' && rest[1]) {
    const code = rest[1].trim().toUpperCase();
    if (!isValidArchetypeCode(code)) return null;
    return code;
  }
  return null;
}

export function parseAppRoute(): ParsedAppRoute {
  const rest = restPathAfterPrefix();

  if (rest[0] === 'type' && rest[1]) {
    const code = rest[1].trim().toUpperCase();
    if (isValidArchetypeCode(code)) return { mode: 'type', code };
  }

  if (rest[0] === TAB_SEGMENT.quiz) return { mode: 'tab', tab: 'quiz' };
  if (rest[0] === TAB_SEGMENT.types) return { mode: 'tab', tab: 'types' };
  if (rest[0] === TAB_SEGMENT.guide) return { mode: 'tab', tab: 'guide' };

  return { mode: 'tab', tab: 'quiz' };
}

export type InitialAppRoute = ParsedAppRoute;

/**
 * First paint: legacy `?code=` → `/type/CODE`, else pathname → tab or type modal.
 */
export function getInitialAppRoute(): InitialAppRoute {
  const params = new URLSearchParams(window.location.search);
  const legacy = params.get('code');
  if (legacy && isValidArchetypeCode(legacy)) {
    const code = legacy.trim().toUpperCase();
    window.history.replaceState(
      {},
      '',
      `${buildTypePath(code)}${window.location.hash}`,
    );
    return { mode: 'type', code };
  }
  return parseAppRoute();
}
