import React, {useEffect} from "react";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Box,
  Divider,
  GlobeIcon,
  Heading, HStack,
  Image,
  ScrollView,
  Text,
  View, VStack
} from '@gluestack-ui/themed';
import {useLocalSearchParams} from 'expo-router'

import {Course, useCourses} from "../../components/Courses";
import {useFeatureFlags} from "../../components/FeatureFlags";

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

  const features = useFeatureFlags();

  useEffect(() => {
    console.log('CourseDetails', course.id);
    console.log('Course GraphicUrl', course.GraphicUrl);
    console.log('graphicUrl', graphicUrl);
  }, []);

  const category = course.category.charAt(0).toUpperCase() + course.category.slice(1)
  const graphicUrl = course.GraphicUrl.slice(4, course.GraphicUrl.length - 1);

  return <ScrollView>

    <Box
      // p="$4"
      // height="100%"
      // spaceY="$4"
    >
      <HStack justifyContent="space-between">
        <VStack pt="$4" pl="$4" w="80%">
          <Heading
            // mx="$8"
            // mt="$1"
            // mb="$4"
            fontSize="$2xl"
          >{course.ClassName}</Heading>
          <Text>{course.CourseNumber}</Text>
        </VStack>

        <Image
          source={{uri: course.GraphicThumbnail}}
          bg="$trueGray400"
          alt="Course Thumbnail"
        />

      </HStack>

    </Box>
    <Divider my="$0"/>
    <VStack
      p="$4"
    >

      {course.Teacher &&
          <HStack m="$2">
              <Text size="sm" mr="$4">Professor</Text>
              <Text>{course.Teacher}</Text>
          </HStack>}

      <HStack m="$2">
        <Text size="sm" mr="$2">Category</Text>
        <Badge size="lg" variant="outline" borderRadius="$lg" action="muted"
        >
          <BadgeText>{category}</BadgeText>
          {/*<BadgeIcon as={GlobeIcon} ml="$2"/>*/}
        </Badge>
      </HStack>

      <HStack m="$2">
        <Text
          size="sm"
          mr="$2"
        >Languages</Text>
        {course.languages.map((language) => {
          return <Badge size="lg"
                        variant="outline"
                        borderRadius="$lg"
                        action="muted"
                        mr="$2"
          >
            <BadgeText>{language}</BadgeText>
          </Badge>
        })}
      </HStack>

      <HStack m="$2">
        <VStack>
          <Text size="sm" mr="$4">Textbook</Text>
        </VStack>
        {(course.Textbook && course.TextbookName) ?
          <Text>{course.TextbookName}</Text>
          : <Text>None</Text>
        }
      </HStack>

      {course.meta.exams &&
          <VStack m="$2">
              <Text size="sm">Exams</Text>
              <Text>{course.meta.exams}</Text>
          </VStack>
      }

      {
        course.meta.projects &&
          <HStack m="$2">
              <Text size="sm" mr="$4">Projects</Text>
              <Text>{course.meta.projects}</Text>
          </HStack>
      }

      {
        course.meta.homework &&
          <HStack m="$2">
              <Text size="sm" mr="$4">Homework</Text>
              <Text>{course.meta.homework}</Text>
          </HStack>
      }

      {features.courseDetailsImages && <>
          <HStack m="$2">
              <Image
                  source={{uri: course.GraphicThumbnail}}
                  bg="$trueGray400"
                  alt="Course Thumbnail"
                  m="$4"
              />
              <Image
                  source={{uri: graphicUrl}}
                  bg="$trueGray400"
                  alt="Course Graphic"
                  m="$4"
              />
          </HStack>
      </>}

    </VStack>

    {features.debug && <>
        <Divider mt="$40"/>
        <Box
            p="$4"
            bg="$backgroundDark100"
        >
            <Heading>Course Debug</Heading>
            <Divider/>
            <Text>{course.debug}</Text>
        </Box>
    </>}

  </ScrollView>
}
