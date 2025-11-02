# Password Generator

A modern, secure password generator web application built with Next.js. Generate random and memorable passwords with customizable options including length, numbers, and symbols.

🔗 **Live Demo**: [https://passgen.noahatkins.com](https://passgen.noahatkins.com)

## Features

- 🎲 **Random Password Generation** - Cryptographically secure random passwords
- 🧠 **Memorable Password Generation** - Word-based passwords that are easier to remember
- ⚙️ **Customizable Options**:
  - Adjustable password length (8-64 characters)
  - Toggle for including numbers
  - Toggle for including symbols
- 🎨 **Modern UI**:
  - Dark/Light/System theme support
  - Responsive design
  - Clean and intuitive interface
- 📋 **Quick Actions**:
  - One-click copy to clipboard
  - Regenerate password instantly
- 🔍 **SEO Optimized** - Full metadata, Open Graph tags, and structured data
- 🌙 **Theme Toggle** - Switch between light, dark, and system themes

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + ShadCN
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/noahatkins/password-generator.git
cd password-generator
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
password-generator/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main password generator page
│   ├── not-found.tsx       # 404 page
│   ├── robots.ts           # Robots.txt generator
│   ├── sitemap.ts          # Sitemap generator
│   └── globals.css         # Global styles and theme variables
├── components/
│   ├── ThemeToggle.tsx     # Theme switcher component
│   └── ui/                 # ShadCN UI components
├── lib/
│   ├── password-generator.ts  # Password generation logic
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Password Generation

### Random Passwords
Generates cryptographically secure passwords using a mix of:
- Uppercase letters (A-Z)
- Lowercase letters (a-z)
- Numbers (0-9) - optional
- Symbols (!@#$%^&*()_+-=[]{}|;:,.<>?) - optional

### Memorable Passwords
Creates word-based passwords using:
- Common, easy-to-remember words
- Separators (-, _, ., !)
- Optional numbers and symbols
- Capitalization for better readability

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Noah Atkins**

- GitHub: [@noahatkins](https://github.com/noahatkins)
- Website: [https://noahatkins.com](https://noahatkins.com)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [ShadCN](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
