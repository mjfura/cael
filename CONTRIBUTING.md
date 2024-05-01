# Contributing

### Setup

1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. Run `pnpm run build` to build the project
4. Run `pnpm run test` to run the tests

### Development

1. Create a new branch from the `main` branch
2. Make your changes
3. Run `pnpm run build` to build the project
4. Run `pnpm run test` to run the tests

All branches will be merged into the `qa` branch. The `qa` branch will be merged into the `main` branch.

Also all branches will be named with the following pattern:

- `feature/FEATURE-NAME`
- `bugfix/FIX-NAME`
- `docs/DOCS-NAME`
- `style/STYLE-NAME`
- `refactor/REFACTOR-NAME`

If you want to test the CLI, you can run the following command after the build process:

```bash
chmod +x ./build/cli.js
```

```bash
cael
```

### Commit

This project uses the following commit message convention:

```
<type>: <subject>
```

Where `<type>` is one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation
- `ci`: Changes to our CI configuration files and scripts
- `revert`: Reverts a previous commit
- `release`: Changes to the release process
- `security`: Changes that address security issues
- `deps`: Changes that update dependencies
- `config`: Changes to the configuration files
- `misc`: Miscellaneous changes

### Pull Request

1. Create a new branch
2. Make your changes
3. Run `pnpm run build` to build the project
4. Run `pnpm run test` to run the tests
5. Create a pull request to the `qa` branch
6. Wait for the review
7. Merge the pull request
8. Delete the branch
9. Update the documentation
10. Update the version in the package.json file
11. Create a new release
12. Publish the package
