import React from "react";
import {Text} from '@gluestack-ui/themed';
import {useLocalSearchParams} from 'expo-router'

export default function () {
  const {id} = useLocalSearchParams()

  return <CourseDetails courseId={id as string}/>
}

type CourseDetailsProps = {
  courseId: string
}

function CourseDetails(props: CourseDetailsProps) {
  return <Text>Course</Text>
}
