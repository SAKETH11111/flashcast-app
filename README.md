# Flashcast App

A modern React application built with Vite, TypeScript, and Tailwind CSS.


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

### Voice Answer (Gemini) Setup

- Create a Google AI Studio API key and restrict it to your domain.
- Add the key to an `.env` file at repo root as:

```
VITE_GEMINI_API_KEY=your_key_here
```

The Study page voice button records speech, evaluates your spoken answer with `gemini-2.5-flash`, flips the card, and shows a one-sentence analysis.

## License

[MIT](LICENSE)
