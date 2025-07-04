import { Stack } from 'expo-router';

export default function BusinessLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="supermarket" />
      <Stack.Screen name="restaurant" />
      <Stack.Screen name="pharmacy" />
      <Stack.Screen name="inventory" />
      <Stack.Screen name="staff" />
      <Stack.Screen name="reviews" />
    </Stack>
  );
}