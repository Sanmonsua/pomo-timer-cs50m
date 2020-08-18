import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      time : 1 * 60,
      minutes : 1,
      seconds : 0,
      isPaused : false,
    }
    
  }
  
  componentDidMount(){
    this.timer = setInterval(this.updateTime, 1000)
  }

  updateTime = () => {
    if (this.state.time >= 0){
      if (!this.state.isPaused ){
        this.setState(prevState => ({
          minutes : Math.floor(prevState.time/60),
          seconds : prevState.time % 60,
          time : prevState.time - 1,
        }))
      }
    }
    else {
      Vibration.vibrate([500, 500, 500])
      console.log('vibrating')
    }
    
  }

  pause = () =>{
    this.setState({
      isPaused : true,
    })
  }

  play = () =>{
    this.setState({
      isPaused : false,
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>{this.state.minutes} : {this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}</Text>
        <View style={styles.controllers}>
          <View style={styles.buttons}><Button title='Pause' onPress={this.pause}/></View>
          <View style={styles.buttons}><Button title='Play' onPress={this.play}/></View>
          
        </View>
        
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
  },
  controllers : {
    flexDirection: 'row',
    justifyContent : "space-between",
  },

  buttons : {
    padding : 10,
    height : 70,
    width : '40%',
  }
});
