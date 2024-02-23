export interface IUsersResponse {
  status: number;
  url: string;
  headers: IHeaders;
  data: IUser[];
}

export enum Type {
  Organization = "Organization",
  User = "User",
}

export interface IHeaders {
  "access-control-allow-origin": string;
  "access-control-expose-headers": string;
  "cache-control": string;
  "content-encoding": string;
  "content-security-policy": string;
  "content-type": string;
  date: string;
  etag: string;
  "github-authentication-token-expiration": string;
  link: string;
  "referrer-policy": string;
  server: string;
  "strict-transport-security": string;
  "transfer-encoding": string;
  vary: string;
  "x-accepted-oauth-scopes": string;
  "x-content-type-options": string;
  "x-frame-options": string;
  "x-github-api-version-selected": Date;
  "x-github-media-type": string;
  "x-github-request-id": string;
  "x-oauth-scopes": string;
  "x-ratelimit-limit": string;
  "x-ratelimit-remaining": string;
  "x-ratelimit-reset": string;
  "x-ratelimit-resource": string;
  "x-ratelimit-used": string;
  "x-xss-protection": string;
}

export interface IUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface ISingleUser extends IUser {
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: null;
  bio: null;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}
