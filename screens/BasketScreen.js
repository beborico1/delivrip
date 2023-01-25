import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectrestaurant } from '../features/restaurantSlice'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useState } from 'react'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'

const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectrestaurant)
    const items = useSelector(selectBasketItems)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState({})
    const dispatch = useDispatch()
    const basketTotal = useSelector(selectBasketTotal)

    useMemo(()=> {
      const groupedItems = items.reduce((results, item)=> {
        (results[item.id] = results[item.id] || []).push(item)
        return results
      },{})

      setGroupedItemsInBasket(groupedItems)
    },[items])

    return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#88E000] bg-white shadow-sm">
          <View>
          <Text className="text-lg font-bold text-center">Pedido</Text>
          <Text className="text-center text-gray-400">{restaurant.title}</Text>
        </View>

        <TouchableOpacity
          onPress={navigation.goBack}
          className="rounded-full bg-gray-100 absolute top-3 right-5"
        >
          <XCircleIcon color="#88E000" height={50} width={50}/>
        </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image 
          source={{uri:"https://i.ibb.co/RHYhTMq/imgonline-com-ua-Replace-Color-A3vd-JDXm-E484f2-V.jpg"}}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Entrega en 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#65a800]">Cambiar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-[#65a800]">{items.length} x </Text>
              <Image 
                source={{uri: urlFor(items[0]?.image).url()}}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
              {items[0]?.price} $
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-xs text-[#65a800]"
                  onPress={()=> dispatch(removeFromBasket({id: key}))}
                >Quitar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              {basketTotal}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Envío</Text>
            <Text className="text-gray-400">
              19.99
            </Text>
          </View>


          <View className="flex-row justify-between mb-1">
            <Text>Total</Text>
            <Text className="font-extrabold">
              {basketTotal+19.99}
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} className="rounded-lg bg-[#7ec90c] p-4">
            <Text className="text-center text-white text-lg font-bold">Realizar Pedido</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen