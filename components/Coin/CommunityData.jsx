import { View, Text } from 'react-native'
import React from 'react'
import CommunityItem from './CommunityItem'

export default function CommunityData({ coinsData }) {

  let data = [
      {title:"Likes", data: coinsData.community_score.facebook_likes, animation: require("../../assets/animations/fb.json")},
      {title:"Followers", data: coinsData.community_data.twitter_followers, animation: require("../../assets/animations/twitter.json")},
      {title:"Subscribers", data: coinsData.community_data.reddit_subscribers, animation:require("../../assets/animations/reddit.json")},
  ]

  return (
    <View style={{width:"100%", justifyContent:"center", alignItems:"center", marginTop:15}}>
    <View style={{width:"97%", justifyContent:"flex-start", alignItems:"flex-start"}}> 
        <Text style={{color:"white", fontSize:20, marginLeft:10}}>Community data</Text>
    </View>
    <View style={{width:"100%", justifyContent:"center", alignItems:"center"}}>
    <View
     style={{width:"97%", justifyContent:"space-between", alignItems:"center", marginTop:6, paddingHorizontal:0, flexDirection:"row"}}
     >
        {
            data.map((item) => (
                <CommunityItem  key={item.title} text={item.title} animation={item.animation} data={item.data} />
            ))
        }
    </View>
    </View>
    </View>
  )
}