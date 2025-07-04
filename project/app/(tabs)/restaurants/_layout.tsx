import { Stack } from 'expo-router';

export default function RestaurantsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[category]" />
    </Stack>
  );
}