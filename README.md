## Project information



## Onboarding

Follow these steps to onboard

1. **Install dependencies:**

    ```
    npm ci
    ```

2. **Start the application:**

    ```
    npm run start
    ```

3. **Visit the application:**

    http://127.0.0.1:3000

4. **Command to run lint and jest and push. Use this instead of "git push". would have used husky if had more time**

    npm run push

## Design Choices

### Tests

- **Testing Framework**: The project uses Jest for testing. 
- **Configuration**: The Jest configuration is defined in `jest.config.ts`. Outputs to the `coverage` folder
- **Running Tests**: Tests can be run using the following command:
    ```
    npm run test
    ```
- **Linting**: ESLint is used for linting the codebase. The configuration is defined in `eslint.config.mjs`] Linting can be run using:
    ```
    npm run lint
    ```

### Deployment

- **CI/CD Pipeline**: The project uses GitHub Actions for continuous integration and deployment.
- **Steps in CI/CD**:
  1. **Checkout Code**: The workflow checks out the code from the repository.
  2. **Set up Node.js**: It sets up Node.js version 20.
  3. **Install Dependencies**: Dependencies are installed using `npm ci`.
  4. **Run Tests**: Tests are run using `npm run test`.
  5. **Run Lint**: Linting is performed using `npm run lint`.
  6. **Build**: The project is built using `npm run build`.
  7. **Deploy**: A placeholder step for deploying to AWS ECR or S3 is included, but not implemented due to time constraints.

### Pushing to Production

- **Push Command**: A custom push command is defined in the `package.json` scripts. It runs linting and tests before pushing the code to the repository.
    ```bash
    npm run push
    ```
- **Husky**: Husky could be used to automate pre-commit and pre-push hooks, but I ran out of time.
