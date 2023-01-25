import { Text, SafeAreaView, Image, View, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { UserIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon} from "react-native-heroicons/outline";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation()
    const [featuredCategories, setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    },[])

    useEffect(()=> {
        sanityClient.fetch(`
        *[_type=="featured"] {
            ...,
            restaurants[] -> {
              ...,
              dishes[]
            }
          }
        `).then((data) => {
            setFeaturedCategories(data)
        }).catch((err) => console.error("orror: ",err));
    },[])

  return (
    <SafeAreaView className="bg-white pt-5">
        {/* Header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
            <Image
                source={{
                    uri: "https://i.ibb.co/RHYhTMq/imgonline-com-ua-Replace-Color-A3vd-JDXm-E484f2-V.jpg"
                }}
                className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />

            <View className="flex-1 pl-1">
                <Text className="font-bold text-gray-400 text-xs">
                    ¡Entregar ahora!
                </Text>

                <Text className="font-bold text-xl">
                    Ubicación actual{" "}
                    <ChevronDownIcon size={20} color="#88E000"/>
                </Text>
            </View>
            <UserIcon size={35} color="#88E000"/>
        </View>
        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
            <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                <MagnifyingGlassIcon color="gray" size={20}/>
                <TextInput 
                    placeholder="Restaurantes y cocinas"
                    keyboardType='default'
                />
            </View>
            <AdjustmentsHorizontalIcon color="#88E000"/>
        </View>

        {/* Body */}
        <ScrollView
            // className="bg-gray-100"
            contentContainerStyle={{paddingBottom: 100,}}
        >
            {/* Categories */}
            <Categories/>

            {featuredCategories?.map((category) => (
                <FeaturedRow
                    key = {category._id}
                    id= {category._id}
                    title= {category.name}
                    description={category.short_description}
                />
            ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen