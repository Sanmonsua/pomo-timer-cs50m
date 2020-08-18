import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      time : 25 * 60,
      minutes : 25,
      seconds : 0,
    }
    
  }
  
  componentDidMount(){
    this.timer = setInterval(this.updateTime, 1000)
  }

  updateTime = () => {
    this.setState(prevState => ({
      minutes : Math.floor(prevState.time/60),
      seconds : prevState.time % 60,
      time : prevState.time - 1,
    }))
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>{this.state.minutes} : {this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}</Text>
        <StatusBar style="auto" />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time : {
    fontSize: 60,
  }
});
