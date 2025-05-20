# Flashcast App

A modern React application built with Vite, TypeScript, and Tailwind CSS.

## GitHub Pages Setup

**Important**: Before the GitHub Actions workflow can deploy to GitHub Pages, you must manually enable GitHub Pages in your repository settings:

1. Go to your repository → Settings → Pages
2. Under "Build and deployment":
   - For "Source", select "GitHub Actions"
3. Save the changes

After completing these steps, pushing to the main branch will automatically trigger deployment.

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
