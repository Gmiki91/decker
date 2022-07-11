import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput,Text, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001')
const App = () => {
  const [room, setRoom] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages(prevState => ([...prevState, data]))
    })
  }, [socket])
  const sendMessage = () => {
    socket.emit('message',{message,room});
    setMessage('');
  }
  const joinRoom = () => {
    if(room!==''){
      socket.emit('join_room', room);
    }
  }
  
  return (
    <View style={styles.container}>
       <TextInput style={styles.input} onChangeText={setRoom} placeholder='# of room' value={room}/>
      <Button title='Click' onPress={joinRoom} />
      <TextInput style={styles.input} onChangeText={setMessage} placeholder='Write message' value={message}/>
      <Button title='Click' onPress={sendMessage} />
      {messages.map(message=>(<Text key={message}>{message}</Text>))}
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderColor:'black',
    borderWidth:1,
    marginBottom:5
  }
});
export default App;
