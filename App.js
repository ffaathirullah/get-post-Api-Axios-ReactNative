import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button
} from 'react-native';
import axios from 'axios';

export default App = () => {

  const [title, setTitle] = useState("")
  const [description, setdescription] = useState("")
  const [movies, setMovies] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const getMoviesAxios = () => {
    axios.get('https://reactnative.dev/movies.json')
    .then(function (response) {
      // handle success
      setTitle(response.data.title);
      setdescription(response.data.description);
      setMovies(response.data.movies);
      console.log(response.data);
    });
  }

  const registerAxios = () => {
    axios.post('https://reqres.in/api/register', {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const getMoviesFromApi = () => {
    return fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => {
        setTitle(json.title);
        setdescription(json.description);
        setMovies(json.movies);
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => { //React Hook
    // getMoviesFromApi();
    // getMoviesAxios();
    registerAxios();
  }, [])

  renderItem = ({item}) => {
    return <Text>{item.title} | {item.releaseYear}</Text>
  }

  return (
    <View>
      <Text>Title: {title}</Text>
      <Text>Description: {description}</Text>
      <FlatList
      data={movies}
      renderItem={renderItem}
      />
      <TextInput
      placeholder="email"
      onChangeText={text => setEmail(text)}
      />
      <TextInput
      placeholder="password"
      onChangeText={text => setPassword(text)}
      />
      <Button
      title="Submit"
      onPress={() => registerAxios()}
      />
    </View>
  );
}
