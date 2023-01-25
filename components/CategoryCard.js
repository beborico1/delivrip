import { Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryCard = ({imgUrl, title}) => {
  return (
    <TouchableOpacity className="relative mr-2 rounded-lg bg-gray-100">
        <Image 
            source={{
                uri: imgUrl,
            }}
            className="h-16 w-20 mx-4 mt-2"
        />
        <Text className="mb-2 ml-2 mt-1 font-semibold">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard