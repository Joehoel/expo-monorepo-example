import { Slot } from 'expo-router';

// Import your global CSS file
import '../global.css';
import { TRPCProvider } from './lib/trpc';

export default function Layout() {
  return (
    <TRPCProvider>
      <Slot />
    </TRPCProvider>
  );
}
