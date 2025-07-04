import { Stack } from 'expo-router';

export default function ShoppingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="[category]" />
    </Stack>
  );
}