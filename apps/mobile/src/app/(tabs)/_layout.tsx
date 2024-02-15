import { Tabs } from 'expo-router';
import { List, MoreHorizontal, Search, Tag, User } from 'lucide-react-native';

export const unstable_settings = {
  initialRouteName: 'search',
};

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#fff',

        tabBarStyle: {
          backgroundColor: '#000',
        },
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: 'Search',
          tabBarIcon: ({ color }) => <Search color={color} style={{ marginBottom: -3 }} />,
        }}
      />
      <Tabs.Screen
        name="discounts"
        options={{
          title: 'Discounts',
          tabBarIcon: ({ color }) => <Tag color={color} style={{ marginBottom: -3 }} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => <List color={color} style={{ marginBottom: -3 }} />,
        }}
      />
      <Tabs.Screen
        name="savings"
        options={{
          title: 'Savings',
          tabBarIcon: ({ color }) => <User color={color} style={{ marginBottom: -3 }} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MoreHorizontal color={color} style={{ marginBottom: -3 }} />,
        }}
      />
    </Tabs>
  );
}
