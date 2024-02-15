import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        title: 'Search',
        headerSearchBarOptions: {
          placeholder: 'Zoek op product naam',
          hideWhenScrolling: false,
        },
        headerLargeTitle: true,
      }}
    />
  );
}
