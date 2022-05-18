import { View, StyleSheet, Text} from 'react-native';
import React from 'react';
import Feather from "react-native-vector-icons/Feather";

export  function HeaderTab() {

  const styles = StyleSheet.create({
      header: {
          width:"100%",
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center",
          backgroundColor:"rgba(0,0,0,0.3)",
          padding:10
      },
      profileimage: {
          width:30,
          height:30,
          borderRadius:5
      }
  })  

  return (
    <View style={styles.header}>
        <Feather name='menu' size={30} color="white" />
        <Text style={{color:"white", fontWeight:"bold"}}>CryptoManiac</Text>
        <Feather name='search' size={30} color="white" />
    </View>
  );
}
