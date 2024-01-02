import React, {useEffect} from "react";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Box,
  Divider,
  GlobeIcon,
  Heading,
  Image,
  ScrollView,
  Text,
  View
} from '@gluestack-ui/themed';
import {useLocalSearchParams} from 'expo-router'

import {Course, useCourses} from "../../components/Courses";

export default function () {
  const {id} = useLocalSearchParams();
  const courses = useCourses();
  const selectedCourse = courses.find(course => course.id === id);

  if (!selectedCourse) {
    return <Heading>Course not found</Heading>
  }

  return <CourseDetails course={selectedCourse}/>;
}

type CourseDetailsProps = {
  course: Course
}

function CourseDetails({course}: CourseDetailsProps) {
  useEffect(() => {
    console.log('CourseDetails', course.id);
    console.log('Course GraphicUrl', course.GraphicUrl);
  }, []);

  const category = course.category.charAt(0).toUpperCase() + course.category.slice(1)

  return <ScrollView>

    <Box
      p="$4"
      // height="100%"
      // spaceY="$4"
    >
      <Heading
        // mx="$8"
        // mt="$1"
        // mb="$4"
        fontSize="$2xl"
      >{course.ClassName}</Heading>
      <Text>{course.CourseNumber}</Text>
    </Box>
    <Divider my="$0"/>
    <Box
      p="$4"
    >
      <Text>Professor: {course.Teacher}</Text>
      {/*<Text>Category: <Text bold>{category}</Text></Text>*/}

      <View
        alignSelf="flex-start"
        p="$2"
      >
        <Badge size="lg" variant="outline" borderRadius="$lg" action="muted"
        >
          <BadgeText>{category}</BadgeText>
          <BadgeIcon as={GlobeIcon} ml="$2"/>
        </Badge>
      </View>

      <Image
        source={{uri: course.GraphicThumbnail}}
      />

    </Box>
    <Divider my="$0"/>
    <Box
      p="$4"
    >
      <Text>Course debug: {course.debug}</Text>
    </Box>
  </ScrollView>
    ;
}
