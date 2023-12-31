import React, {useEffect} from "react";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Box,
  Center,
  Divider,
  GlobeIcon,
  Heading,
  ScrollView,
  Text, View
} from '@gluestack-ui/themed';
import {Stack, useLocalSearchParams} from 'expo-router'

import {Course, useCourses} from "../../components/Courses";

export default function () {
  const {id} = useLocalSearchParams();
  const courses = useCourses();
  const selectedCourse = courses.find(course => course.id === id);

  return <CourseDetails course={selectedCourse}/>;
}

type CourseDetailsProps = {
  course: Course
}

function CourseDetails({course}: CourseDetailsProps) {
  useEffect(() => {
    console.log('CourseDetails', course.id)
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
      <Text>Category: <Text bold>{category}</Text></Text>

      <View
        // width="$10"
      >
        <Badge size="md" variant="solid" borderRadius="$lg" action="muted"
               // width="$full"
        >
          <BadgeText>TODO why full width? {category}</BadgeText>
          <BadgeIcon as={GlobeIcon} ml="$2"/>
        </Badge>
      </View>

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
