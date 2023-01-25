import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 400000)
    }, [])

  return (
    <SafeAreaView className="bg-lime-500 flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/orderLoading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation = "slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for the restaurant to accept your order...

        

      </Animatable.Text>

      <Animatable.View
        animation = "slideInUp"
        iterationCount={1}
      >
        <Progress.Circle 
          size={60} 
          indeterminate={true} 
          color="white"
          fill="#00000000"
          //borderWidth={3}
          //thickness={3}
        />
      </Animatable.View>

      

    </SafeAreaView>
  )
}

export default PreparingOrderScreen