import { View, Text } from 'react-native'
import React from 'react'
import AntIcon from "react-native-vector-icons/AntDesign"

export default function HeaderBanner({ percentageDailyColor, coin, price, currencySymbol, percentageDaily, arrow  }) {
  return (
    <View style={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexDirection:"row",
        paddingHorizontal:10
  }}>
  <View
   style={{
     justifyContent: "flex-start",
     alignItems: "flex-start",
   }}
  >
   <Text style={{ fontSize: 17, color: "#c9c7c7", maxWidth:250 }} ellipsizeMode='tail' numberOfLines={1}>{coin.name}</Text>
   <Text style={{ fontSize: 32, color: "white", marginTop:-5 }}>
     {price ? currencySymbol + price : "N/A"}
   </Text>
  </View>
  <View
   style={{
     paddingVertical: 5,
     paddingHorizontal: 5,
     backgroundColor: percentageDailyColor,
     flexDirection:"row",
     justifyContent:"center",
     alignItems:"center",
     borderRadius:20
   }}
  >
   {isNaN(percentageDaily) ? (
     <Text style={{color:"white", fontSize:20}}>N/A</Text>
   ) : (
     <View
       style={{ justifyContent: "space-around", alignItems: "center", flexDirection:"row" }}
     >
       <AntIcon
         name={arrow == false ? "caretdown" : "caretup"}
         size={20}
         color="white"
         style={{ alignSelf: "center", marginRight: 2 }}
       />
       <Text style={{ color: "white", fontSize: 20 }}>
         {percentageDaily} %
       </Text>
     </View>
   )}
  </View>
  </View>
  )
}