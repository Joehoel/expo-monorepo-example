import { StyleSheet, Text, View } from 'react-native';

import { api } from './lib/trpc';

export default function Page() {
  const { data } = api.hello.world.useQuery('Joel');

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>{data}</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
});