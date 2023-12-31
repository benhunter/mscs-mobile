import {Slot, Stack} from 'expo-router';
import React from "react";
import {View} from "@gluestack-ui/themed";

export default function HomeLayout() {
  return <>
    <Stack.Screen
      options={{
        title: "Course Details",
      }}
    />
    <View
      style={{width: '100%', height: '100%'}}
      bg="white"
    >
      <Slot/>
    </View>
  </>;
}
