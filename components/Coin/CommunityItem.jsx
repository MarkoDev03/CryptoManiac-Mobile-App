import { View, Text } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";

export default function CommunityItem({ data, animation, text }) {
  return (
    <View style={{backgroundColor:"#302f2f", justifyContent:"center", alignItems:"center", padding:10, width:"31.5%", borderRadius:20}}>
    <LottieView
     style={{ height: 100, alignSelf: "center", marginBottom: 5 }}
     source={animation}
     autoPlay
     speed={1}
     loop={false}
   />
    <View style={{justifyContent:"center", alignItems:"center"}}>
   <Text style={{color:"white", fontSize:15, fontWeight:"bold"}}>{text}</Text> 
    <Text style={{color:"#d4cdcd", fontSize:15}}>{data ? data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "N/A"}</Text>
    </View>
    </View>
  )
}