# GitHub CLI Authentication Guide

This guide explains how to authenticate with GitHub CLI to manage pull requests, issues, and other GitHub operations from the command line.

## Prerequisites

- GitHub CLI (`gh`) installed on your system
- A GitHub account with access to the repository

## Authentication Steps

### 1. Check Current Authentication Status

First, check if you're already authenticated:

```bash
gh auth status
```

### 2. Authenticate with GitHub

If not authenticated or the token is invalid, run:

```bash
gh auth login -h github.com
```

### 3. Complete Device Flow Authentication

The CLI will display a one-time code and URL:

```
! First copy your one-time code: XXXX-XXXX
Open this URL to continue in your web browser: https://github.com/login/device
```

**Steps:**
1. Copy the one-time code displayed in your terminal
2. Open the URL in your web browser
3. Paste the code when prompted
4. Authorize the GitHub CLI application
5. Select the appropriate permissions when asked

### 4. Verify Authentication

After completing the browser authentication, verify it worked:

```bash
gh auth status
```

You should see output like:

```
github.com
  ✓ Logged in to github.com account <username> (keyring)
  - Active account: true
  - Git operations protocol: https
  - Token: gho_************************************
  - Token scopes: 'gist', 'read:org', 'repo'
```

## Common Commands After Authentication

### List Pull Requests

```bash
# List open PRs
gh pr list

# List all PRs (including closed)
gh pr list --state all

# View specific PR details
gh pr view <PR_NUMBER>
```

### Check Repository Status

```bash
# View repository information
gh repo view

# List issues
gh issue list

# List workflows
gh workflow list
```

### Working with PRs

```bash
# Create a new PR
gh pr create

# Review a PR
gh pr review <PR_NUMBER>

# Merge a PR
gh pr merge <PR_NUMBER>

# Close a PR
gh pr close <PR_NUMBER>
```

## Troubleshooting

### Authentication Expired

If you see "Failed to log in" or "The token is invalid":

```bash
gh auth logout -h github.com
gh auth login -h github.com
```

### Permission Issues

If you encounter permission errors, you may need to refresh your token with additional scopes:

```bash
gh auth refresh -s repo -s read:org -s workflow
```

## Security Notes

- The authentication token is stored securely in your system's keychain
- Never share your authentication token
- Tokens can be revoked at https://github.com/settings/tokens
- Use fine-grained permissions when possible

## Reference

For more information, visit:
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitHub CLI Authentication](https://cli.github.com/manual/gh_auth_login)
