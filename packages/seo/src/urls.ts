export type AbsoluteUrlOptions = {
  baseUrl: string;
  path?: string;
};

export function absoluteUrl({ baseUrl, path = "/" }: AbsoluteUrlOptions): string {
  return new URL(path, baseUrl).toString();
}

export function normalizePath(path: string): string {
  if (path === "/") {
    return path;
  }

  return path.replace(/\/+$/, "");
}
