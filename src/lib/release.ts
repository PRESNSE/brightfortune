import fs from 'node:fs';
import path from 'node:path';
import defaultConfig from '@content/launch-config.json';

export type LaunchConfig = typeof defaultConfig;

/** Test fixtures may swap the launch config via LAUNCH_CONFIG_PATH. Never used to flip approvals in real deployments. */
export function launchConfig(): LaunchConfig {
  const p = process.env.LAUNCH_CONFIG_PATH;
  if (!p) return defaultConfig;
  return JSON.parse(fs.readFileSync(path.resolve(/* turbopackIgnore: true */ process.cwd(), p), 'utf8')) as LaunchConfig;
}

const APPROVALS = [
  'companyIdentityApproved', 'historyApproved', 'copyApproved', 'articlesApproved',
  'assetsApproved', 'legalApproved', 'regulatoryApproved', 'contactApproved',
] as const;

export interface Release {
  /** True only when every gate passes. Never derived from NODE_ENV. */
  publicReady: boolean;
  /** Approved HTTPS origin, when SITE_URL is valid, regardless of readiness (used for preview-safe absolute URLs only when ready). */
  origin: string | null;
  blockers: string[];
}

function cleanOrigin(v: string | undefined): string | null {
  if (!v) return null;
  try {
    const u = new URL(v);
    if (u.protocol !== 'https:' || u.pathname !== '/' || u.search || u.hash || u.username || u.password) return null;
    return u.origin;
  } catch {
    return null;
  }
}

export function getRelease(): Release {
  const cfg = launchConfig();
  const blockers: string[] = [];
  const envOrigin = cleanOrigin(process.env.SITE_URL);
  if (process.env.SITE_MODE !== 'public') blockers.push('SITE_MODE is not "public"');
  if (cfg.mode !== 'public') blockers.push('launch-config mode is not "public"');
  if (!envOrigin) blockers.push('SITE_URL is not a valid HTTPS origin');
  if (!cfg.canonicalOrigin || cleanOrigin(cfg.canonicalOrigin) !== envOrigin) blockers.push('canonicalOrigin does not match SITE_URL');
  for (const k of APPROVALS) if (!cfg[k]) blockers.push(`${k} is false`);
  if (!cfg.brand.officialLogoProvided && !cfg.brand.draftWordmarkApprovedForLaunch) blockers.push('no approved wordmark');
  if (!cfg.regulatoryStatement) blockers.push('regulatoryStatement is empty');
  const hasChannel = !!(cfg.contact.phone || cfg.contact.email);
  if (!hasChannel) blockers.push('no verified contact channel');
  const publicReady = blockers.length === 0;
  return { publicReady, origin: publicReady ? envOrigin : null, blockers };
}

export const isApproved = (key: string): boolean => !!(launchConfig() as Record<string, unknown>)[key];

export type FormMode = 'preview' | 'contact-only' | 'live';

/**
 * Enquiry runtime mode. Live needs a configured transport; a mock transport is honoured only
 * when the site is NOT public-ready, so a fake "success" can never reach a real public site.
 */
export function getFormMode(): FormMode {
  const rel = getRelease();
  const cfg = launchConfig();
  const mock = process.env.ENQUIRY_TRANSPORT === 'mock' && !rel.publicReady;
  if (process.env.ENQUIRY_MODE === 'live' && (mock || (rel.publicReady && transportConfigured()))) return 'live';
  if (rel.publicReady && cfg.form.contactOnlyFallback && cfg.contactApproved) return 'contact-only';
  return 'preview';
}

export function transportConfigured(): boolean {
  const e = process.env;
  return !!(e.RESEND_API_KEY && e.ENQUIRY_FROM && e.ENQUIRY_TO && e.UPSTASH_REDIS_REST_URL && e.UPSTASH_REDIS_REST_TOKEN && launchConfig().form.retentionPolicyApproved);
}
