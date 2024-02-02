import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { api } from '../lib/trpc';

export default function Page() {
  const { data } = api.hello.world.useQuery('Joel');

  return (
    <SafeAreaView>
      <View className="bg-red-400 rounded">
        <Text className="text-black text-4xl font-bold">{data}</Text>
      </View>
    </SafeAreaView>
  );
}
