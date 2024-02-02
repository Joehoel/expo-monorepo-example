import '../../global.css';

import { Stack } from 'expo-router';

import { AssetsProvider } from '~/providers/assets';
import { SplashScreenProvider } from '~/providers/splash';
import { TRPCProvider } from '~/providers/trpc';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function Layout() {
  return (
    <SplashScreenProvider>
      <AssetsProvider>
        <TRPCProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
          </Stack>
        </TRPCProvider>
      </AssetsProvider>
    </SplashScreenProvider>
  );
}
