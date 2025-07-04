# Bolt Marketplace App

A multi-purpose marketplace mobile application built with React Native, Expo, and Expo Router.

## Features

- Home screen with categories and featured items
- Supermarket section with product listings
- Pharmacy section with store listings and products
- Events section with event listings and details
- Shopping cart functionality
- Profile section

## Tech Stack

- React Native
- Expo
- Expo Router for navigation
- TypeScript
- React Context API for state management

## Project Structure

```
project/
├── app/                  # Main application screens
│   ├── (tabs)/           # Tab-based navigation screens
│   ├── auth/             # Authentication screens
│   └── _layout.tsx       # Root layout component
├── assets/               # Static assets like images
├── components/           # Reusable UI components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Reusable Components

The application includes several reusable components to maintain consistency and reduce code duplication:

- `AppHeader`: A customizable header component with search, cart, and notification functionality
- `ProductCard`: A reusable product card component with various display options
- `AdvertisementSlider`: A carousel component for displaying advertisements with platform-specific implementations
- `Cart`: A shopping cart component that uses the CartContext

## Type Safety

The application uses TypeScript for type safety, with centralized type definitions in the `types` directory:

- Common data types (Product, CartItem, etc.)
- Navigation parameter types for type-safe navigation

## Navigation

The application uses Expo Router for navigation with the following structure:

- Tab-based main navigation
- Nested stack navigation for individual sections
- Type-safe navigation helpers in `utils/navigation.ts`

## State Management

The application uses React Context API for state management:

- `CartContext`: Manages the shopping cart state and operations

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Run on a device or emulator:
   ```
   npm run android
   npm run ios
   npm run web
   ```

## Code Improvements

Recent improvements to the codebase include:

1. **Reusable Components**: Created reusable components to reduce code duplication
2. **Type Safety**: Added TypeScript type definitions for better type checking
3. **Navigation Helpers**: Implemented type-safe navigation functions
4. **Context API**: Improved the CartContext implementation
5. **Code Organization**: Better organization of code and assets# Bolt Marketplace App

A multi-purpose marketplace mobile application built with React Native, Expo, and Expo Router.

## Features

- Home screen with categories and featured items
- Supermarket section with product listings
- Pharmacy section with store listings and products
- Events section with event listings and details
- Shopping cart functionality
- Profile section

## Tech Stack

- React Native
- Expo
- Expo Router for navigation
- TypeScript
- React Context API for state management

## Project Structure

```
project/
├── app/                  # Main application screens
│   ├── (tabs)/           # Tab-based navigation screens
│   ├── auth/             # Authentication screens
│   └── _layout.tsx       # Root layout component
├── assets/               # Static assets like images
├── components/           # Reusable UI components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Reusable Components

The application includes several reusable components to maintain consistency and reduce code duplication:

- `AppHeader`: A customizable header component with search, cart, and notification functionality
- `ProductCard`: A reusable product card component with various display options
- `AdvertisementSlider`: A carousel component for displaying advertisements with platform-specific implementations
- `Cart`: A shopping cart component that uses the CartContext

## Type Safety

The application uses TypeScript for type safety, with centralized type definitions in the `types` directory:

- Common data types (Product, CartItem, etc.)
- Navigation parameter types for type-safe navigation

## Navigation

The application uses Expo Router for navigation with the following structure:

- Tab-based main navigation
- Nested stack navigation for individual sections
- Type-safe navigation helpers in `utils/navigation.ts`

## State Management

The application uses React Context API for state management:

- `CartContext`: Manages the shopping cart state and operations

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Run on a device or emulator:
   ```
   npm run android
   npm run ios
   npm run web
   ```

## Code Improvements

Recent improvements to the codebase include:

1. **Reusable Components**: Created reusable components to reduce code duplication
2. **Type Safety**: Added TypeScript type definitions for better type checking
3. **Navigation Helpers**: Implemented type-safe navigation functions
4. **Context API**: Improved the CartContext implementation
5. **Code Organization**: Better organization of code and assets