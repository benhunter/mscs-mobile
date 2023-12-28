import {collection, getDocs, getFirestore} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {app} from '../firebaseConfig';
import 'firebase/firestore';

import {
  Box,
  GluestackUIProvider,
  Heading,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context"; // Optional if you want to use default theme
import {Link, Stack} from "expo-router";

export default function App() {
  let [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    getClasses().then((classes) => {
      classes.sort((a, b) => {
        return a.ClassName.localeCompare(b.ClassName)
      });
      setCourses(classes)
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
        <Classes courses={courses}/>
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

type CourseCardProps = {
  course: Course
}

const CourseCard = ({course}: CourseCardProps) => {
  return <Pressable
    onPress={() => {
      console.log(`Pressed ${course.ClassName}`)
    }}
    key={course.id}>
    <Link href={{pathname: `/course/${course.id}`}} asChild>

      <Box
        bg="white"
        key={course.id}
        maxWidth="$full"
        borderColor="$borderLight200"
        borderRadius="$lg"
        borderWidth="$1"
        my="$1"
        mx="$0"
        py="$2"
        px="$4"
        overflow="hidden"
        // $base-mx="$1"
        $dark-bg="$backgroundDark900"
        $dark-borderColor="$borderDark800"
      >

        {/*<Center>*/}
        <Heading m="$0" fontSize="$md">{course.ClassName}</Heading>
        <Text mx="$2">{course.CourseNumber}</Text>
        {/*</Center>*/}
      </Box>
    </Link>
  </Pressable>
}

type ClassesProps = {
  courses: Course[]
}

const Classes = ({courses}: ClassesProps) => {

  const insets = useSafeAreaInsets();
  // return (
  //   <View style={{ flex: 1, paddingTop: insets.top }}>

  return <View style={{paddingTop: insets.top, paddingBottom: insets.bottom}}
    // bg="red"
               mx="$0"
  >
    {/*<Box width="100%" justifyContent="center" alignItems="center">*/}
    {/*<StatusBar style="auto"/>*/}
    {/*<Heading*/}
    {/*  mx="$8"*/}
    {/*  mt="$1"*/}
    {/*  mb="$4"*/}
    {/*  fontSize="$2xl"*/}
    {/*>Classes</Heading>*/}
    <ScrollView width="100%" height="100%" pb="$0" mb="$16" mx="$0">
      <VStack
        pb="$16"
        mx="$2"
      >

        {courses && courses.map((c: Course) => {
          return <CourseCard course={c}/>
        })}

      </VStack>
    </ScrollView>
    {/*</Box>*/}
  </View>;
}

type Course = {
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

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    const debug = `${doc.id} => ${JSON.stringify(doc.data())}`;
    return {...data, id, debug} as Course;
  });
};
