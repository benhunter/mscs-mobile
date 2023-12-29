import React, {useEffect, useState} from "react";
import {Box, Heading, Pressable, ScrollView, Spinner, Text, View, VStack} from "@gluestack-ui/themed";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {app} from "../firebaseConfig";
import {Link} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export type Course = {
  ClassName: string,
  CourseNumber: string,
  id: string,
  debug: string
}

interface CoursesProviderProps {
  children: React.ReactNode
}

export const CoursesProvider: React.FC<CoursesProviderProps> = ({children}) => {

  let [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCourses().then((courses) => {
      courses.sort((a, b) => {
        return a.ClassName.localeCompare(b.ClassName)
      });
      setCourses(courses)
    })
  }, [])

  useEffect(() => {
    if (courses.length > 0) {
      setLoading(false)
    }
  }, [courses])

  if (loading) {
    return (
      <View justifyContent='center' w='100%' h='100%'>
        <Spinner size='large'/>
      </View>
    )
  }

  return <CoursesContext.Provider value={courses}>
    {children}
  </CoursesContext.Provider>
}

export const CoursesContext = React.createContext<Course[]>(null);

export const useCourses = () => React.useContext(CoursesContext);

const getCourses = async () => {
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

type CourseCardProps = {
  course: Course
}

const CourseCard = ({course}: CourseCardProps) => {
  return <Link href={{pathname: `/course/${course.id}`}}
               asChild>
    <Pressable
      onPress={() => {
        console.log(`Pressed ${course.ClassName}`)
      }}
      key={course.id}>

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
    </Pressable>
  </Link>
}

type CoursesListProps = {
  courses: Course[]
}

export const CoursesList = ({courses}: CoursesListProps) => {

  // const insets = useSafeAreaInsets();
  // return (
  //   <View style={{ flex: 1, paddingTop: insets.top }}>

  return <View
    // style={{paddingTop: insets.top, paddingBottom: insets.bottom}}
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
    {/*>Courses</Heading>*/}
    <ScrollView width="100%" height="100%" pb="$0" mb="$16" mx="$0">
      <VStack
        pb="$16"
        mx="$2"
      >

        {courses && courses.map((c: Course) => {
          return <CourseCard course={c} key={c.id}/>
        })}

      </VStack>
    </ScrollView>
    {/*</Box>*/}
  </View>;
}
