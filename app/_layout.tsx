import {Stack} from 'expo-router/stack';
import {config} from "@gluestack-ui/config";
import React from "react";
import {GluestackUIProvider} from "@gluestack-ui/themed";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {CoursesProvider} from "../components/Courses";

export default function Layout() {
  return <GluestackUIProvider config={config}>
    <SafeAreaProvider>
      <CoursesProvider>
        <Stack
          screenOptions={{
            // headerShown: false,
            // headerStyle: {
            //   backgroundColor: '#fff',
            // },
            // headerTintColor: '#000',
            headerTitleStyle: {
              // fontWeight: 'bold',
            },
          }}
        />
      </CoursesProvider>
    </SafeAreaProvider>
  </GluestackUIProvider>
}
