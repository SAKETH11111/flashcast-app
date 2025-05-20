# Flashcast App

A modern React application built with Vite, TypeScript, and Tailwind CSS.

## GitHub Pages Setup

To set up GitHub Pages for this repository:

1. Create a Personal Access Token (PAT):
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
   - Give it a descriptive name like "GitHub Pages Deployment"
   - Select the following scopes: `repo`, `workflow`, and `admin:org` (for Pages access)
   - Copy the generated token

2. Add the token to your repository secrets:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Create a new repository secret
   - Name: `PERSONAL_ACCESS_TOKEN`
   - Value: [paste the token you copied]
   - Click "Add secret"

3. Run the Setup Workflow:
   - Go to the "Actions" tab in your repository
   - In the left sidebar, click on "Setup GitHub Pages"
   - Click the "Run workflow" button and select the main branch
   - Wait for the workflow to complete

After the setup workflow completes successfully, the main deployment workflow will automatically deploy your application when you push to the main branch.

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## License

[MIT](LICENSE)
