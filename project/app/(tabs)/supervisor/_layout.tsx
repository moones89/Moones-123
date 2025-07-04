import { Stack } from 'expo-router';

export default function SupervisorLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="delivery-tracking" />
      <Stack.Screen name="activity-log" />
      <Stack.Screen name="performance" />
    </Stack>
  );
}