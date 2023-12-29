import React from "react";
import 'firebase/firestore';
import {Stack} from "expo-router";
import {CoursesList, useCourses} from "../components/Courses";

export default function App() {
  const courses = useCourses()

  return (
    <>
      <Stack.Screen
        options={{
          // headerShown: false,
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Courses',
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
      <CoursesList courses={courses}/>
    </>
  )
}
