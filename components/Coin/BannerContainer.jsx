import { View, Text } from 'react-native'
import React from 'react'
import AntIcon from "react-native-vector-icons/AntDesign"

export default function BannerContainer({ item }) {
  return (
        <View key={item.title} style={{width:"95%", height:50, paddingHorizontal:0, borderBottomColor:item.border === true ? "rgba(94, 91, 91, 0.4)" : "#302f2f", 
      borderBottomWidth: item.border == true ? .7 : 0,
      marginBottom:3, justifyContent:"space-between", alignItems:"center", flexDirection:"row"}}>
        <Text style={{color:"#d4cdcd", marginLeft:10}}>{item.title}</Text>
        {item.isPercentage ? (
           <View
           style={{
             paddingVertical: 5,
             paddingHorizontal: 5,
             backgroundColor: item.color,
             flexDirection:"row",
             justifyContent:"center",
             alignItems:"center",
             borderRadius:20,
             marginRight:10
           }}
         >
           <View
           style={{ justifyContent: "space-around", alignItems: "center", flexDirection:"row" }}
         >
           <AntIcon
             name={item.arrow == false ? "caretdown" : "caretup"}
             size={15}
             color="white"
             style={{ alignSelf: "center", marginRight: 2 }}
           />
           <Text style={{ color: "white", fontSize: 15 }}>
             {item.value} %
           </Text>
         </View>
         </View>
        ) : 
          item.isRank ? (
            (
              <Text style={{color:item.color, fontSize:15, backgroundColor:"#444", borderRadius:50, padding:7}}>{item.value}</Text>)
          ) : (<Text style={{color:item.color, marginRight:10}}>{item.value}</Text>)
        }
      </View>
  )
}