import { View, Text, Image } from 'react-native'
import React from 'react'

export default function HeaderBannerItems({ coin, currencyAPI, currencySymbol, price}) {
  return (
    <View style={{width:"100%", justifyContent:"center", alignItems:"center", flexDirection:"row",marginTop:14}}>
    <View style={{width:"47%", height:65, justifyContent:"space-between", alignItems:"center",flexDirection:"row", borderTopLeftRadius:20, borderBottomLeftRadius:20, backgroundColor:"#302f2f", paddingHorizontal:10, paddingVertical:6, marginRight:3}}>
          <Text style={{color:"white"}}>1.00</Text>
          <View style={{height:45, borderLeftColor:"#918c8c", borderLeftWidth:1, justifyContent:"center", alignItems:"center", paddingLeft:10, flexDirection:"row"}}>
              <Image style={{ width: 25, height: 25, borderRadius:8, marginRight:3 }} source={{ uri: coin.image }} />
              <Text style={{maxWidth:45, color:"#c9c7c7"}} numberOfLines={1} ellipsizeMode="tail" >{coin.symbol.toUpperCase()}</Text>
          </View>
    </View>
    <View style={{width:"47%", height:65, justifyContent:"space-between", alignItems:"center",borderBottomRightRadius:20, borderTopRightRadius:20, backgroundColor:"#302f2f", paddingHorizontal:10, paddingVertical:6, flexDirection:"row"}}>
          <Text style={{color:"white"}}>{price ? currencySymbol + price : "N/A"}</Text>
          <View style={{height:45, borderLeftColor:"#918c8c", borderLeftWidth:1, justifyContent:"center", alignItems:"center", paddingLeft:10}}>
              <Text style={{fontSize:20, color:"#c9c7c7", maxWidth:45}}  >{currencyAPI.toUpperCase()}</Text>
          </View>
    </View>
 </View>
  )
}