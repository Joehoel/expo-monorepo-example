import { Text, View } from 'react-native';

import { api } from '~/lib/trpc';

export default function Settings() {
  const { data } = api.hello.world.useQuery('Joel');

  return (
    <View>
      <View className="bg-red-400 rounded">
        <Text className="text-black text-4xl font-bold">Settings</Text>
      </View>
    </View>
  );
}
