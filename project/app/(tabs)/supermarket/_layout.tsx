import { Stack } from 'expo-router';

export default function SupermarketLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[products]" />
    </Stack>
  );
}