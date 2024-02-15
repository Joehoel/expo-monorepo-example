import { Product } from '@boodschappen-vergelijker/api';
import { FlatList, FlatListProps, Image, Text, TouchableOpacity, View } from 'react-native';

import { Nutriscore } from '~/components/nutriscore';
import { api } from '~/lib/trpc';

const nf = new Intl.NumberFormat('nl-NL', {});

interface ProductListProps extends Omit<FlatListProps<Product>, 'data' | 'renderItem'> {
  products: Product[];
}

export function ProductList({ products, ...props }: ProductListProps) {
  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product.id.toString()}
      renderItem={({ item: product }) => {
        return (
          <TouchableOpacity className="p-4 flex-row gap-4 justify-between">
            <View className="flex-row gap-4">
              <View>
                <Image src={product.image} className="w-28 h-28" />
                {product.nutri && (
                  <Nutriscore
                    score={product.nutri}
                    height={25}
                    width={50}
                    style={{ position: 'absolute', left: 0, bottom: 0 }}
                  />
                )}
              </View>
              <View className="gap-1 justify-between w-full">
                <Text className="text-xl max-w-[50%]" ellipsizeMode="tail">
                  {product.name}
                </Text>
                <View className="flex-row items-baseline gap-1">
                  <Text className="mt-1 text-2xl font-bold">€{nf.format(product.price)} </Text>
                  <Text className="text-gray-500">{product.unitSize}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      {...props}
    />
  );
}

export default function Search() {
  const [products] = api.product.getAll.useSuspenseQuery();

  return (
    <ProductList
      contentInsetAdjustmentBehavior="automatic"
      className="bg-white"
      ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
      products={products}
    />
  );
}
