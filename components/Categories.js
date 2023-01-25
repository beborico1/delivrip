import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../sanity'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "category"]
    `).then(data => {
      setCategories(data)
    })
  })
  return (
    <ScrollView
    contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 5,
    }}
    horizontal
    showsHorizontalScrollIndicator={false}
    className="bg-white pb-3"
    >
        {categories?.map(category => (
          <CategoryCard
            key={category._id}
            imgUrl={urlFor(category.image).width(200).url()}
            title = {category.name}
          >

          </CategoryCard>
        ))}
    </ScrollView>
  )
}

export default Categories