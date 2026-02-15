# ReactNativeJS - Food Ordering App

## Project Overview
React Native food ordering app built with Expo (SDK 54), using Appwrite as the backend and Sentry for error monitoring.

## Tech Stack
- **Framework**: React Native 0.81 + Expo ~54 + Expo Router v6
- **Language**: TypeScript (strict mode)
- **Styling**: NativeWind v4 (TailwindCSS for React Native)
- **Backend**: Appwrite (via `react-native-appwrite`)
- **Monitoring**: Sentry (`@sentry/react-native`)
- **Fonts**: Quicksand family (Bold, SemiBold, Medium, Regular, Light)

## Project Structure
- `app/` - Expo Router file-based routing
  - `(auth)/` - Auth group (sign-in, sign-up)
  - `(tabs)/` - Main tab navigation (home, search, cart, profile)
- `components/` - Reusable components (CustomButton, CustomInput, CartButton)
- `constants/` - Static data, image/icon exports
- `lib/` - Service integrations (appwrite.ts)
- `assets/` - Fonts, images, icons

## Conventions
- Use `@/` path alias for imports (maps to project root)
- Use NativeWind `className` for styling, not inline StyleSheet
- Use `clsx` for conditional class merging
- Components are default-exported functional components
- Custom colors: primary (#FE8C00), dark-100 (#181C2E), error (#F14141), success (#2F9B65)
- Font classes: `font-quicksand`, `font-quicksand-bold`, `font-quicksand-semibold`, `font-quicksand-medium`, `font-quicksand-light`

## Commands
- `npm start` - Start Expo dev server
- `npm run ios` - Run on iOS
- `npm run android` - Run on Android
- `npm run lint` - Run ESLint

## Important Notes
- Never commit `.env` or `.env.local` files
- Sentry DSN is configured in `app/_layout.tsx`
- Appwrite config lives in `lib/appwrite.ts`
