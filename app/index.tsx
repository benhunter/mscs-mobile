import {collection, getDocs, getFirestore} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet } from 'react-native';
import {app} from '../firebaseConfig';
import 'firebase/firestore';

import { GluestackUIProvider, Text, Box, Heading, VStack, ScrollView, Center, Image, View} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context"; // Optional if you want to use default theme
import {Stack} from "expo-router";

export default function App() {
  let [classes, setClasses] = useState<Class[]>([])

  useEffect(() => {
    getClasses().then((classes) => {
      classes.sort((a, b) => {
        return a.ClassName.localeCompare(b.ClassName)
      });
      setClasses(classes)
    })
  }, [])

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <Stack.Screen
          options={{
            // headerShown: false,
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Classes',
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
            // headerStyle: {backgroundColor: 'rgba(94,94,94,0.67)'},
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
            // headerTitle: props => <LogoTitle {...props} />,
          }}
        />
        <Classes classes={classes}/>
      </SafeAreaProvider>
    </GluestackUIProvider>
  )
}

function LogoTitle() {
  return (
    <Image
      style={{width: 50, height: 50}}
      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
    />
  );
}

type ClassesProps = {
  classes: Class[]
}

const Classes = ({classes}: ClassesProps) => {

  const insets = useSafeAreaInsets();
  // return (
  //   <View style={{ flex: 1, paddingTop: insets.top }}>

  return <View style={{paddingTop: insets.top, paddingBottom: insets.bottom}}
               // bg="red"
  >
    {/*<Box width="100%" justifyContent="center" alignItems="center">*/}
    {/*<StatusBar style="auto"/>*/}
    {/*<Heading*/}
    {/*  mx="$8"*/}
    {/*  mt="$1"*/}
    {/*  mb="$4"*/}
    {/*  fontSize="$2xl"*/}
    {/*>Classes</Heading>*/}
    <ScrollView width="100%" height="100%" pb="$0" mb="$16">
      <VStack
        pb="$16"
      >

        {classes && classes.map((c: Class) => {
          return <Box
            bg="white"
            key={c.id}
            maxWidth="$full"
            borderColor="$borderLight200"
            borderRadius="$lg"
            borderWidth="$1"
            my="$2"
            py="$1"
            px="$2"
            overflow="hidden"
            $base-mx="$5"
            $dark-bg="$backgroundDark900"
            $dark-borderColor="$borderDark800"
          >

            {/*<Center>*/}
            <Heading m="$0" fontSize="$md">{c.ClassName}</Heading>
            <Text mx="$2">{c.CourseNumber}</Text>
            {/*</Center>*/}
          </Box>
        })}

      </VStack>
    </ScrollView>
    {/*</Box>*/}
  </View>;
}

type Class = {
  ClassName: string,
  CourseNumber: string,
  id: string,
  debug: string
}

const getClasses = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "Class"));

  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  // });

  const classes = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    const debug = `${doc.id} => ${JSON.stringify(doc.data())}`;
    return {...data, id, debug} as Class;
  });
  return classes;
};
