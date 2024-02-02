import { Tabs } from 'expo-router';
import { Search } from 'lucide-react-native';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: () => <Search />,
        }}
      />
    </Tabs>
  );
}
