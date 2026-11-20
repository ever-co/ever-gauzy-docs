// Publishes the built site to GitHub Pages, as `docusaurus deploy` did: the contents of build/ as a
// new commit on the deployment branch of ever-co/ever-gauzy-docs. CircleCI's
// `GIT_USER=evereq yarn run deploy --skip-build` publishes the build it has just checked; without
// --skip-build the site is built first. The same settings as before: GIT_USER with GIT_PASS for
// HTTPS, or USE_SSH=true; ORGANIZATION_NAME, PROJECT_NAME, DEPLOYMENT_BRANCH, GITHUB_HOST and
// CUSTOM_COMMIT_MESSAGE override the defaults.
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const env = process.env;
const git = (args, cwd) => execFileSync("git", args, { cwd, stdio: ["ignore", "pipe", "inherit"], encoding: "utf8" }).trim();
const useSsh = env.USE_SSH === "true";
if (!useSsh && !env.GIT_USER) throw new Error("Set GIT_USER (with GIT_PASS for HTTPS), or USE_SSH=true");

const org = env.ORGANIZATION_NAME || "ever-co";
const project = env.PROJECT_NAME || "ever-gauzy-docs";
const branch = env.DEPLOYMENT_BRANCH || "gh-pages";
const host = env.GITHUB_HOST || "github.com";
const credentials = env.GIT_PASS ? `${encodeURIComponent(env.GIT_USER)}:${encodeURIComponent(env.GIT_PASS)}` : env.GIT_USER;
const remote = useSsh ? `git@${host}:${org}/${project}.git` : `https://${credentials}@${host}/${org}/${project}.git`;

const site = new URL("../", import.meta.url).pathname;
if (!process.argv.includes("--skip-build")) {
  execFileSync(join(site, "node_modules/.bin/sourcey"), ["build", "-o", "build"], { cwd: site, stdio: "inherit" });
}
const build = join(site, "build");
const commit = git(["rev-parse", "HEAD"], site);

// The deployment branch as it stands, or a new one when it doesn't exist yet.
const work = mkdtempSync(join(tmpdir(), "gauzy-docs-deploy-"));
try {
  try {
    execFileSync("git", ["clone", "--quiet", "--depth", "1", "--branch", branch, remote, work], { stdio: "ignore" });
  } catch {
    git(["init", "--quiet", work]);
    git(["checkout", "--quiet", "--orphan", branch], work);
    git(["remote", "add", "origin", remote], work);
  }
  for (const entry of readdirSync(work)) if (entry !== ".git") rmSync(join(work, entry), { recursive: true, force: true });
  cpSync(build, work, { recursive: true });
  git(["add", "--all"], work);
  if (!git(["status", "--porcelain"], work)) {
    console.log(`Nothing to publish: ${branch} already holds this build.`);
  } else {
    // A runner with no git identity commits as GIT_USER, as GitHub would show the push.
    let configured = true;
    try { git(["config", "--get", "user.email"], work); } catch { configured = false; }
    const identity = configured ? [] : ["-c", `user.name=${env.GIT_USER}`, "-c", `user.email=${env.GIT_USER}@users.noreply.github.com`];
    git([...identity, "commit", "--quiet", "-m", env.CUSTOM_COMMIT_MESSAGE || `Deploy website - based on ${commit}`], work);
    git(["push", "--quiet", "origin", branch], work);
    console.log(`Published ${commit.slice(0, 7)} to ${org}/${project} ${branch}.`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
