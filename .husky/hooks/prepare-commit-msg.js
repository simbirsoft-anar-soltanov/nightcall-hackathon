#!/usr/bin/env node
const { exec } = require('child_process');
const fs = require('fs');

main().catch((error) => {
  const severity = error.fatal ? 'fatal' : 'not fatal';
  console.log(
    `Error (${severity}) in prepare-commit git hook: ${error.message}`
  );
  if (error.fatal) {
    process.exit(1);
  }
});
async function main() {
  const gitCommitMsgFileName = process.argv[2];
  if (!checkIsPrepareCommitMsgFileName(gitCommitMsgFileName)) {
    process.exit(0);
  }
  const branchName = await gitResolveCurrentBranchName();
  if (
    branchName === 'develop' ||
    branchName === 'trunk' ||
    branchName === 'master' ||
    branchName.startsWith('release/')
  ) {
    await rejectForAnyChangeExceptVersion();
    return;
  }
  if (branchName.startsWith('cherry-pick-')) {
    const branchDetail = branchName.substring(12);
    enhanceFileContentSync(
      gitCommitMsgFileName,
      withCherryPickMark(branchDetail)
    );
    return;
  }
  if (branchName.startsWith('tmp/')) {
    enhanceFileContentSync(gitCommitMsgFileName, withTemporaryMark);
    return;
  }
  enhanceFileContentSync(
    gitCommitMsgFileName,
    withJiraTaskNameAndLink(branchName)
  );
}

function withCherryPickMark(branchDetail) {
  return (originalCommitMsg) => {
    return `Cherry pick: ${branchDetail}\n${originalCommitMsg}`;
  };
}

function withTemporaryMark(originalCommitMsg) {
  return `don't merge this commit, it is temporary\n${originalCommitMsg}`;
}

function withJiraTaskNameAndLink(branchName = '') {
  const taskName = resolveJiraTaskName(branchName);
  if (!taskName) {
    throw new FatalError(
      `Branch name has inappropriate format "${branchName.trim()}".\n` +
        'Required format is: [TaskType]/[JiraTaskId][-short-description-optional]\n' +
        'For example: feature/CMXDEVPL-777-search-page-refactoring'
    );
  }
  return (originalCommitMsg) => {
    const lines = originalCommitMsg.split('\n');
    lines[0] += `, ${taskName}`;
    lines.push(`https://jira.cinimex.ru/browse/${taskName}`);
    return lines.join('\n');
  };
}

function resolveJiraTaskName(branchName) {
  // https://community.atlassian.com/t5/Bitbucket-questions/Regex-pattern-to-match-JIRA-issue-key/qaq-p/233319
  const JIRA_TASK_REGEXP = /((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)/g;
  const match = JIRA_TASK_REGEXP.exec(branchName);
  return match && match[1];
}

function enhanceFileContentSync(filename, enhancer) {
  const content = fs.readFileSync(filename, 'utf8');
  const enhancedContent = enhancer(content);
  fs.writeFileSync(filename, enhancedContent);
}

function checkIsPrepareCommitMsgFileName(fileName) {
  const COMMIT_MSG_FILE_REGEXP = /COMMIT_EDITMSG/g;
  return COMMIT_MSG_FILE_REGEXP.test(fileName);
}

function rejectForAnyChangeExceptVersion() {
  // currently not checking for changes inside files itself, because it a bit cumbersome
  return gitResolveStagedFilenames().then((changedFilesMsg) => {
    const changedFilesList = changedFilesMsg
      ? changedFilesMsg.trim().split('\n')
      : [];
    const isCheckPassed = changedFilesList.every((filename) =>
      ['package.json', 'package-lock.json', 'src/features.json'].includes(
        filename
      )
    );
    if (!isCheckPassed) {
      throw new FatalError(
        `Allow only to update package version in master branch. Changed files: ${changedFilesList.join(
          '\n'
        )}`
      );
    }
  });
}

function gitResolveCurrentBranchName() {
  return new Promise((resolve, reject) => {
    exec('git symbolic-ref --short HEAD', (err, branchName) => {
      if (err) {
        reject(err);
      }
      const actualBranchName =
        // branchName could also be '(no branch)', fallback just follow this convention
        typeof branchName === 'string' ? branchName.trim() : '(no branch)';
      if (actualBranchName === '(no branch)') {
        reject(
          new Error(
            '"(no branch)". It may indicate rebase or other non-HEAD scenario'
          )
        );
      }
      resolve(actualBranchName);
    });
  });
}

function gitResolveStagedFilenames() {
  return new Promise((resolve, reject) => {
    exec('git diff --name-only --cached', (err, changedFilesList) => {
      if (err) {
        reject(err);
      }
      resolve(changedFilesList);
    });
  });
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class FatalError extends Error {
  constructor(...args) {
    super(...args);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FatalError);
    }
    this.fatal = true;
  }
}
