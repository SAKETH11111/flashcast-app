# Flashcast App

A modern React application built with Vite, TypeScript, and Tailwind CSS.

## GitHub Pages Setup

Before the GitHub Actions workflow can deploy to GitHub Pages, you need to manually enable GitHub Pages in your repository settings:

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "Pages" section in the sidebar
4. Under "Build and deployment", select "GitHub Actions" as the source
5. Save the changes

After enabling GitHub Pages, the workflow will automatically deploy your application when you push to the main branch.

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
