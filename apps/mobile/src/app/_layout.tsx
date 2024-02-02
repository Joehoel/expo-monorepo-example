import { Stack } from 'expo-router';

import '../../global.css';
import { TRPCProvider } from '../lib/trpc';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function Layout() {
  return (
    <TRPCProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
    </TRPCProvider>
  );
}
