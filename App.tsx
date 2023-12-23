import {collection, getDocs, getFirestore} from "firebase/firestore";
import {useEffect, useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {app} from './firebaseConfig';
import 'firebase/firestore';

import {GluestackUIProvider, Text, Box, Heading, VStack, ScrollView, Center} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config'; // Optional if you want to use default theme

function AppGlue() {
  return (
    <GluestackUIProvider config={config}>
      <Box width="100%" justifyContent="center" alignItems="center">
        <Text>Open up App.js to start working on your app!</Text>
      </Box>
    </GluestackUIProvider>
  );
}

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
      <SafeAreaView>
        <Box width="100%" justifyContent="center" alignItems="center">
          <Heading>Classes</Heading>
          <ScrollView width="100%" height="100%">
            <VStack>

              {classes.map((c: Class) => {
                return <Box
                  key={c.id}
                  maxWidth="$full"
                  borderColor="$borderLight200"
                  borderRadius="$lg"
                  borderWidth="$1"
                  my="$1"
                  overflow="hidden"
                  $base-mx="$5"
                  $dark-bg="$backgroundDark900"
                  $dark-borderColor="$borderDark800"
                >

                  <Center>
                    <Text m="$2">{c.ClassName}</Text>
                  </Center>
                </Box>
              })}

            </VStack>
          </ScrollView>
          <StatusBar style="auto"/>
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  )
}

type Class = {
  ClassName: string,
  id: string,
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
    return {...data, id} as Class;
  });
  return classes;
};
