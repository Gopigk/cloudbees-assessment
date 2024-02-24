import { Octokit } from "octokit";

export const BASE_URL = "https://api.github.com";

export const octokit = new Octokit({
  auth: "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",
});

export const Headers = {
  "X-GitHub-Api-Version": "2022-11-28",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers":
    "ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset",
  "Content-type": "application/json; charset=utf-8",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "*",
};
