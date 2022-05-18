import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import * as Progress from 'react-native-progress';

export default function Votes({ coinsData }) {

  const Vote = ({ data, animation }) => {
      return (
        <View style={{backgroundColor:"#302f2f", justifyContent:"center", alignItems:"center", padding:10, width:"48%", borderRadius:20}}>
        <LottieView
         style={{ height: 100, alignSelf: "center", marginBottom: 5 }}
         source={animation}
         autoPlay
         speed={1}
         loop={true}
       />
        <Text style={{color:"white", fontSize:30}}>{data ? data + "%" : "N/A"}</Text>
        </View>
      )
  }

  return (
    <View style={{width:"100%", justifyContent:"center", alignItems:"center", marginTop:15}}>
    <View style={{width:"97%", justifyContent:"flex-start", alignItems:"flex-start"}}> 
        <Text style={{color:"white", fontSize:20, marginLeft:10}}>Sentiment votes</Text>
    </View>
    <View style={{width:"100%", justifyContent:"center", alignItems:"center"}}>
    <View
     style={{width:"97%", justifyContent:"space-between", alignItems:"center", marginTop:6, paddingHorizontal:0, flexDirection:"row"}}>
     <Vote animation={require("../../assets/animations/smile.json")} key="Good" data={coinsData.sentiment_votes_up_percentage} />
     <Vote animation={require("../../assets/animations/bad.json")} key="Bad" data={coinsData.sentiment_votes_down_percentage} />
    </View>
    </View>
     <View style={{width:"97%", borderRadius:20, marginTop:10, backgroundColor:"#302f2f", justifyContent:"center", alignItems:"center", padding:10}}>
     <Progress.Bar progress={coinsData.sentiment_votes_up_percentage ? coinsData.sentiment_votes_up_percentage / 100 : 0.0}  unfilledColor="#FA0A32" color="#16c784"
     borderWidth={0}
      width={((Dimensions.get("window").width / 100) * 97)  - 20}
     />
     </View>
    </View>
  )
}