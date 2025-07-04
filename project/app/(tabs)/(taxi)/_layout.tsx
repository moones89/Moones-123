import { Stack } from 'expo-router';

export default function TaxiLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="booking" />
      <Stack.Screen name="confirmation" />  {/* Ensure unique screen names */}
    </Stack>
  );
}