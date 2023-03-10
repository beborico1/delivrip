import {  Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import { StarIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/restaurantSlice'

const RestaurantScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { params: {
    id,
    imgUrl,
    title,
    genre,
    address,
    short_description,
    dishes,
    rating,
    long,
    lat
  }} = useRoute()

  useEffect(()=> {
    dispatch(
      setRestaurant({
      id,
      imgUrl,
      title,
      genre,
      address,
      short_description,
      dishes,
      rating,
      long,
      lat,
    }))
  },[dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <>
    <BasketIcon/>
    <ScrollView className="">
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
              }}
              className="w-full h-56 bg-gray-300 p-4"
          />

          <TouchableOpacity 
            onPress={navigation.goBack} 
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color = "#88E000" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
            <View className="px-4 pt-4">
              <Text className="text-3xl font-bold mb-1">{title}</Text>
              <View className="flex-row space-x-2 my-1"> 
                <View className="flex-row space-x-1 items-center">
                  <StarIcon color="#88E000" opacitiy={0.6} size={22} />
                  <Text className="text-xs text-gray-500">
                    <Text className="text-lime-500">{rating}</Text> ?? {genre}
                  </Text>
                </View>

                <View className="flex-row space-x-1 items-center">
                  <MapPinIcon color="gray" opacitiy={0.4} size={22} />
                  <Text numberOfLines={1} className="text-xs text-gray-500 w-52">
                    {address}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
            </View>
            <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
              <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20}/>
              <Text className="pl-2 flex-1 text-md font-bold">??Tiene alergia a alg??n alimento?</Text>
              <ChevronRightIcon color="#88E000"/>
            </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-4 mb-3 font-bold text-xl">
            {dishes?.map(dish => (
              <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                price={dish.price}
                image={dish.image}
              />
            ))}
          </Text>
        </View>
    </ScrollView>
    </>
  )
}

export default RestaurantScreen