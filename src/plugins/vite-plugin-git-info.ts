import { execSync } from 'child_process';

const BRANCH = 'git rev-parse --abbrev-ref HEAD'; // 获取分支名
const LAST_COMMIT_HASH = 'git rev-parse HEAD'; // 获取最后一次提交 hash
const LAST_COMMIT_MESSAGE = 'git log -1 --pretty=%B'; // 获取最后一次提交信息
const LAST_COMMIT_TIME = 'git log -1 --pretty=%cd'; // 获取最后一次提交时间
const LAST_COMMIT_AUTHOR = 'git log -1 --pretty=%an'; // 获取最后一次提交者

const runGitCommand = async (command) => {
  try {
    const result = await execSync(command).toString().trim();
    return result;
  } catch (error) {
    console.error(`Failed to run git command ${command} ${error}`);
    return 'Failed to run git command';
  }
};

const getGitInfo = async () => {
  try {
    return {
      branch: await runGitCommand(BRANCH),
      lastCommitHash: await runGitCommand(LAST_COMMIT_HASH),
      lastCommitMessage: await runGitCommand(LAST_COMMIT_MESSAGE),
      lastCommitTime: await runGitCommand(LAST_COMMIT_TIME),
      lastCommitAuthor: await runGitCommand(LAST_COMMIT_AUTHOR),
    };
  } catch (error) {
    console.error(`Failed to get git info ${error}`);
    return 'Failed to get git info';
  }
};

const plugin = () => {
  return {
    name: 'vite-plugin-git-info',
    async transformIndexHtml(html) {
      const res = await getGitInfo();
      // 在 head 标签中插入script标签
      return [
        {
          tag: 'script',
          inject: 'head',
          children: `window.GIT_INFO = ${JSON.stringify(res)}`,
          attr: { defer: true },
        },
      ];
    },
  };
};

export default plugin;
