import { isValidArchetypeCode } from './data';

/** Path segments before app routes, e.g. ['personalitytest'] on GitHub Pages. */
export function pathPrefixSegments(): string[] {
  const raw = (import.meta.env.BASE_URL || '/').replace(/^\/+|\/+$/g, '');
  return raw ? raw.split('/').filter(Boolean) : [];
}

export function buildTypePath(code: string): string {
  const prefix = pathPrefixSegments();
  return '/' + [...prefix, 'type', code].join('/');
}

export function buildTypeShareUrl(code: string): string {
  return `${window.location.origin}${buildTypePath(code)}`;
}

/** App root with trailing slash when nested (GitHub project page). */
export function buildHomePath(): string {
  const prefix = pathPrefixSegments();
  if (!prefix.length) return '/';
  return `/${prefix.join('/')}/`;
}

/** e.g. TRP from /personalitytest/type/TRP or /type/TRP in dev */
export function parseTypeCodeFromPath(): string | null {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const prefix = pathPrefixSegments();
  if (prefix.length) {
    if (pathParts.length < prefix.length) return null;
    for (let i = 0; i < prefix.length; i++) {
      if (pathParts[i] !== prefix[i]) return null;
    }
  }
  const rest = prefix.length ? pathParts.slice(prefix.length) : pathParts;
  if (rest[0] === 'type' && rest[1]) {
    const code = rest[1].trim().toUpperCase();
    if (!isValidArchetypeCode(code)) return null;
    return code;
  }
  return null;
}

/**
 * Legacy ?code=TRP → replace with /type/TRP. Returns modal type code if any.
 */
export function getInitialTypesRoute(): { typeCode: string | null } {
  const params = new URLSearchParams(window.location.search);
  const legacy = params.get('code');
  if (legacy && isValidArchetypeCode(legacy)) {
    const code = legacy.trim().toUpperCase();
    window.history.replaceState(
      {},
      '',
      `${buildTypePath(code)}${window.location.hash}`,
    );
    return { typeCode: code };
  }
  return { typeCode: parseTypeCodeFromPath() };
}
