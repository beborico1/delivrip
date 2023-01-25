import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectrestaurant } from '../features/restaurantSlice'
import { XMarkIcon } from 'react-native-heroicons/outline'
import * as Progress from "react-native-progress"
import MapView, {Marker} from "react-native-maps"

const DeliveryScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectrestaurant)

  return (
    <View className="bg-lime-500 flex-1">
        <SafeAreaView className="z-50">
            <View className="flex-row justify-between items-center p-5">
                <TouchableOpacity
                    onPress={()=>navigation.navigate("Home")}
                >
                    <XMarkIcon 
                        color="white"
                        size={30}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text className="font-light text-white text-lg">Ayuda con el pedido</Text>
                </TouchableOpacity>
            </View>

            <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
                <View className="flex-row justify-between">
                    <View>
                        <Text className="text-lg text-gray-400">Entrega Estimada</Text>
                        <Text className="text-4xl font-bold">40-55 Minutos</Text>
                    </View>
                    <Image
                        source={require("../assets/bike.gif")}
                        className="h-20 w-20"
                    />
                </View>

                <Progress.Bar size={30} color = "#88E000" indeterminate={true} />
                <Text className="mt-3 text-gray-500">Tu pedido en {restaurant.title} se esta preparando</Text>
            </View>
        </SafeAreaView>

        <MapView
            initialRegion={{
                latitude: restaurant.lat,
                longitude: restaurant.long,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            className="flex-1 -mt-10 z-0"
            mapType='mutedStandard'
        >
            <Marker
            coordinate={{
                latitude: restaurant.lat,
                longitude: restaurant.long,
            }}
            title={restaurant.title}
            description={restaurant.short_description}
            identifier="origin"
            pinColor="#88E000"
            />

        </MapView>
        <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
            <Image
                source={{
                    uri:"https://www.themoviedb.org/t/p/w235_and_h235_face/qckq0EMLDYuTtEJkMeXzFeuKDnK.jpg"
                }}
                className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
            />
            <View className="flex-1">
                <Text className="text-lg">
                    Ranjit Singh
                </Text>
                <Text className="text-gray-400">
                    Su conductor
                </Text>
            </View>
            <Text className="text-lime-500 text-lg mr-5 font-bold">Llamar</Text>
        </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen