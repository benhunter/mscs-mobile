import {Slot, Stack} from 'expo-router';
import React from "react";

export default function HomeLayout() {
  return <>
    <Stack.Screen
      options={{
        title: "Course Details",
      }}
    />
    <Slot/>
  </>;
}
