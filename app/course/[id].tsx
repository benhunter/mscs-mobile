import React, {useEffect} from "react";
import {Text} from '@gluestack-ui/themed';
import {Stack, useLocalSearchParams} from 'expo-router'

import {useCourses} from "../../components/Courses";

export default function () {
  const {id} = useLocalSearchParams()
  const courses = useCourses()

  return <>
    <Stack.Screen
      options={{
        // headerShown: false,
        title: 'TEST',
      }}
    />
    <CourseDetails courseId={id as string}/>
  </>;
}

type CourseDetailsProps = {
  courseId: string
}

function CourseDetails(props: CourseDetailsProps) {
  useEffect(() => {
    console.log('CourseDetails', props.courseId)
  }, []);
  return <>
    <Stack.Screen
      options={{
        // headerShown: false,
        title: 'TEST',
      }}
    />
    <Text>Course ID: {props.courseId}</Text>
  </>;
}
