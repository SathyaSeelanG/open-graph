<div align="center">
  <img src="https://raw.githubusercontent.com/SathyaSeelanG/open-graph/refs/heads/main/open-graph-icon.png" alt="OpenGraph Checker Logo" width="150"/>
</div>

# 🔍 OpenGraph Checker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4.svg)](https://tailwindcss.com/)

A powerful tool for previewing and validating OpenGraph metadata across social media platforms including LinkedIn, X (formerly Twitter), Discord, Instagram, and more.

<div align="center">
  <img src="https://placehold.co/800x400?text=OpenGraph+Checker" alt="OpenGraph Checker" width="800"/>
</div>

## 📋 Overview

OpenGraph Checker helps website owners, developers, and marketers optimize how their content appears when shared across different social media platforms. The tool validates and previews OpenGraph tags, providing recommendations to improve your website's visibility and engagement when shared online.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌐 **Multi-Platform Preview** | See how your content will appear on LinkedIn, X, Discord, Instagram, and search results |
| ✅ **Metadata Validation** | Identify missing or incorrect OpenGraph tags with detailed reports |
| 👁️ **Visual Previews** | Get an accurate visual representation of how your content will look on each platform |
| 💡 **Recommendations** | Receive platform-specific optimization suggestions |
| 💻 **Code Generation** | Get ready-to-use code snippets to implement proper OpenGraph tags |

## 🏗️ Repository Structure

```
opengraph-checker/
├── web/               # Main web application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── ...
└── seo-extension-1/   # VS Code extension (coming soon)
    ├── src/
    └── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Web Application Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/opengraph-checker.git

# Navigate to the web directory
cd opengraph-checker/web

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### VS Code Extension (Coming Soon) 🔜

The VS Code extension is currently under development. When available, you'll be able to install it directly from the VS Code marketplace.

## 🔧 How It Works

### Web App Architecture

<div align="center">
  <img src="https://placehold.co/600x300?text=Architecture+Diagram" alt="Architecture Diagram" width="600"/>
</div>

#### Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

#### Key Components

1. **🔗 URL Fetching & Metadata Extraction:**
   - Proxy services fetch HTML content
   - Intelligent parsing extracts metadata
   - Fallback mechanisms ensure complete data

2. **🔍 Validation Engine:**
   - Platform-specific requirements checking
   - Missing tag detection
   - Best practice enforcement

3. **📱 Preview Generation:**
   - Real-time visual previews
   - Platform-accurate rendering
   - Responsive design simulation

4. **🎨 User Interface:**
   - Dark/light mode
   - Compact and detailed views
   - Code snippet generation

### Data Flow

```mermaid
graph LR
    A[User Input URL] --> B[Fetch HTML]
    B --> C[Extract Metadata]
    C --> D[Apply Fallbacks]
    D --> E[Validate]
    E --> F[Generate Previews]
    F --> G[Display Results]
```

## 📚 API Reference

### Core Functions

```typescript
// Fetch and process OpenGraph data
async function fetchOpenGraphData(url: string): Promise<OpenGraphData>;

// Validate data against platform requirements
function validateOpenGraphData(data: OpenGraphData): ValidationResult;

// Generate HTML meta tags
function generateMetaTags(data: Partial<OpenGraphData>): string;
```

## 🔧 Project Setup

### Favicon Implementation

The project uses the OpenGraph icon as its favicon. To implement this in your local development:

```html
<!-- Add to your index.html -->
<link rel="icon" href="https://raw.githubusercontent.com/SathyaSeelanG/open-graph/refs/heads/main/open-graph-icon.png" />
```

## 👥 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Roadmap

- 🧩 Chrome extension
- 📝 VS Code extension
- 🔌 API access
- 🔄 More platform integrations (Facebook, WhatsApp, etc.)

---

<div align="center">
  <img src="https://raw.githubusercontent.com/SathyaSeelanG/open-graph/refs/heads/main/open-graph-icon.png" alt="OpenGraph Checker Logo" width="80"/>
  <p>Made with ❤️ by the OpenGraph Checker Team</p>
</div>

 