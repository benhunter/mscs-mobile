import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { app } from './firebaseConfig';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

export default function App() {
  let [classes, setClasses] = useState<Class[]>([])

  useEffect(() => {
    // set classes to the result of getClasses()
    getClasses().then((classes) => {
      setClasses(classes)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {classes.map((c: Class) => {
        return <>
        <Text style={{margin: 10}}>{c.ClassName}</Text>
        </>
      })}
      {classes.map((c: any) => {
        return <Text>{JSON.stringify(c)}</Text>
      })}
      <StatusBar style="auto" />
    </View>
  )
}

type Class = {
  ClassName: string,
  id: string,
}

const getClasses = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "Class"));

  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
  const classes = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    return { ...data, id } as Class;
  } );
  return classes;
};

import { collection, getDocs } from "firebase/firestore";
import {useEffect, useState} from "react";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
