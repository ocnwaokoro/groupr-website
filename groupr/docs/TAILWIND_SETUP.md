# Tailwind CSS Configuration Notes

## Version
- **Tailwind CSS**: v3.4.19 (as of setup)
- **PostCSS**: v8.5.6
- **Autoprefixer**: v10.4.24

## Configuration Files

### postcss.config.js
```js
export default {
  plugins: {
    tailwindcss: {},  // v3 standard - use tailwindcss directly
    autoprefixer: {},
  },
}
```

### tailwind.config.js
- Uses standard v3 configuration format
- Design tokens (colors, fonts, spacing) defined in `theme.extend`

### src/index.css
```css
@tailwind base;      // v3 syntax
@tailwind components;
@tailwind utilities;
```

## Important Notes

### Tailwind v3 vs v4
- **v3** (current): Uses `tailwindcss: {}` in PostCSS config and `@tailwind` directives
- **v4**: Would require `@tailwindcss/postcss` plugin and different CSS import syntax

### If Upgrading to Tailwind v4 Later
1. Install: `npm install -D @tailwindcss/postcss`
2. Update `postcss.config.js`:
   ```js
   plugins: {
     '@tailwindcss/postcss': {},
     autoprefixer: {},
   }
   ```
3. Update CSS imports (v4 uses `@import "tailwindcss"` instead of `@tailwind` directives)

## Current Status
✅ Configuration matches Tailwind v3.4.19  
✅ PostCSS config uses `tailwindcss: {}` directly  
✅ CSS uses v3 `@tailwind` directives  
✅ Dev server should run without errors
