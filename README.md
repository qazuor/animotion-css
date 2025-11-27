# Animotion CSS

A visual CSS animation generator for creating smooth transitions, micro-interactions, and complex keyframe animations without writing code by hand.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### Visual Keyframe Editor
- **Interactive timeline**: Add, remove, and edit keyframes at any position (0-100%)
- **Property toggles**: Enable/disable specific CSS properties per keyframe with checkboxes
- **Real-time preview**: See your animation play instantly as you make changes
- **Expandable panels**: Clean UI with collapsible keyframe sections

### Animation Properties
Configure all standard CSS animation properties:
- **Duration**: 100ms to 5000ms with slider control
- **Delay**: 0ms to 2000ms
- **Iteration Count**: 1, 2, 3, 5, 10, or infinite
- **Direction**: normal, reverse, alternate, alternate-reverse
- **Fill Mode**: none, forwards, backwards, both
- **Timing Functions**: 17 built-in easing options including:
  - Basic: Linear, Ease, Ease In, Ease Out, Ease In Out
  - Steps: Step Start, Step End
  - Advanced: Smooth, Accelerate, Decelerate, Bouncy, Back In, Back Out, Circular, Exponential, Elastic, Swing

### Animatable Properties
Each keyframe can animate:
- **Transform**: translateX, translateY, scale, rotate, skewX, skewY
- **Visual**: opacity, backgroundColor, color, borderRadius, boxShadow
- **Custom**: Add any custom CSS properties

### 15 Built-in Presets
Get started quickly with ready-to-use animations:
- **Fade**: fadeIn, fadeOut
- **Slide**: slideInLeft, slideInRight, slideInUp, slideInDown
- **Scale**: zoomIn, zoomOut, pulse
- **Rotate**: spin, flip, swing
- **Attention**: bounce, shake, heartbeat

### Preview Options
Test your animation with different element shapes:
- Square
- Circle
- Text ("Animotion")
- Icon

### History & Persistence
- **Auto-save**: Animations are saved to history when you copy the CSS
- **LocalStorage**: History persists across browser sessions
- **Quick apply**: Load any saved animation back into the editor with one click
- **Mini preview**: See a small animated preview in the history panel

### CSS Output
- **Clean code**: Generated CSS follows best practices
- **Copy to clipboard**: One-click copy with visual feedback
- **Complete output**: Includes both `@keyframes` and `animation` property

### Internationalization
- English (en)
- Spanish (es)

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **State Management**: Zustand with persist middleware
- **Build Tool**: Vite 7
- **Animations**: Motion library
- **Icons**: Lucide React
- **i18n**: i18next + react-i18next
- **Testing**: Vitest + Testing Library
- **Linting**: Biome

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/qazuor/animotion-css.git
cd animotion-css

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
pnpm check        # Run Biome check (lint + format)
pnpm test         # Run tests in watch mode
pnpm test:run     # Run tests once
pnpm test:coverage # Run tests with coverage
```

## Usage

1. **Choose a preset** (optional): Click the "Presets" button to load a pre-configured animation
2. **Configure animation settings**: Adjust duration, timing function, delay, iterations, direction, and fill mode
3. **Edit keyframes**:
   - Expand a keyframe to see available properties
   - Toggle properties on/off with checkboxes
   - Adjust values using inputs, sliders, or color pickers
   - Add new keyframes at any position
4. **Preview**: Watch your animation in real-time with play/pause controls
5. **Copy CSS**: Click the copy button to get your animation code and save it to history
6. **Reuse**: Access saved animations from the History tab anytime

## Project Structure

```
src/
├── components/
│   ├── animation/          # Animation editor components
│   │   ├── AnimationControls.tsx
│   │   ├── AnimationPreview.tsx
│   │   ├── CSSOutput.tsx
│   │   ├── KeyframeEditor.tsx
│   │   ├── KeyframeItem.tsx
│   │   ├── PresetSelector.tsx
│   │   ├── PreviewElementSelector.tsx
│   │   └── PropertyEditor.tsx
│   ├── history/            # History panel components
│   │   ├── HistoryItem.tsx
│   │   └── HistoryPanel.tsx
│   ├── layout/             # Layout components
│   ├── common/             # Shared components
│   └── ui/                 # UI primitives (shadcn/ui style)
├── stores/
│   ├── animationStore.ts   # Current animation state
│   └── historyStore.ts     # Persisted history state
├── data/
│   └── animation-presets.ts # Built-in animation presets
├── lib/
│   └── animation-utils.ts  # CSS generation utilities
├── types/
│   └── animation.types.ts  # TypeScript definitions
└── i18n/
    └── locales/            # Translation files
```

## Example Output

```css
@keyframes myAnimation {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animated-element {
  animation: myAnimation 500ms ease-out 0ms 1 normal forwards;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

**qazuor** - [GitHub](https://github.com/qazuor)

---

Made with love using React, TypeScript, and Tailwind CSS
