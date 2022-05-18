import { View, Text, Image } from 'react-native'
import React from 'react'

export default function CoinItem({ coin, percentageDailyColor }) {
  return (
    <View style={{width:"100%", justifyContent:"center", alignItems:"center", marginTop:7}}>
     <View style={{width:"97%", justifyContent:"flex-start", alignItems:"flex-start",}}> 
          <Text style={{color:"white", fontSize:20, marginLeft:10}}>Coin</Text>
      </View>
      <View style={{width:"97%", justifyContent:"space-between", alignItems:"center", marginTop:6, borderRadius:20, backgroundColor:"#302f2f", paddingHorizontal:0, flexDirection:"row", paddingVertical:10}}>
          <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
          <View style={{backgroundColor:"#444", justifyContent:"center", alignItems:"center", borderRadius:20, height:65, width:65, marginLeft:10, position:"relative"}}>
          <Text style={{ color: "white",
            maxWidth: "100%",
            fontSize: 15,
            backgroundColor: "#5c5a5a",
            borderRadius: 3,
            padding: 5,
            zIndex:9,
            position:"absolute",
            top:-5,
            right:-5,
            paddingVertical: 0,}} numberOfLines={1} ellipsizeMode="tail">#{coin.market_cap_rank ? coin.market_cap_rank : "N/A"}</Text>
          <Image style={{width:45, height:45, borderRadius:20, zIndex:1}} source={{uri: coin.image}} />
          </View>
          <View style={{marginLeft:6, justifyContent:"flex-start", alignItems:"flex-start"}}>
             <Text style={{fontSize:20, maxWidth:200, color:"white"}}>{coin.name}</Text>
             <Text style={{fontSize:14, maxWidth:200, color:"#7a7a7a"}}>{coin.symbol.toUpperCase()}</Text>
          </View>
          </View>
          <View style={{backgroundColor:percentageDailyColor, width:13, height:13, borderRadius:50, marginRight:10}}></View>
      </View>
      </View>
  )
}