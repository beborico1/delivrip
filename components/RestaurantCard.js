import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

const RestaurantCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity 
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          rating,
          genre,
          title,
          address,
          short_description,
          dishes,
          long,
          lat,
        })
      }}
      className="bg-white mr-3 shadow-sm rounded-lg"
    >
      <Image
        source={{
            uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64"
      />
      <View className="px-3 pb-4"> 
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
            <StarIcon color="#88E000" opacity={0.6} size={22}/>
            <Text className="text-xs text-gray-500"><Text className="text-lime-500">{rating}</Text> · {genre}</Text>
        </View>

        <View className="flex-row items-center space-x-1">
            <MapPinIcon color="gray" opacity={0.4} size={22}/>
            <Text numberOfLines={1} className="text-sm text-gray-500 w-48">{address}</Text>
        </View>
      </View>
      
    </TouchableOpacity>
  )
}

export default RestaurantCard