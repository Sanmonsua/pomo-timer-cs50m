import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Vibration, TextInput } from "react-native";

let work = {
  starting_minutes : 25,
  time: 25 * 60,
  minutes: 25,
  seconds: 0,
  isPaused: true,
  name : "Work",
}

let rest = {
  starting_minutes : 5,
  time: 5 * 60,
  minutes: 5,
  seconds: 0,
  isPaused: true,
  name : "Rest",
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = work;
  }

  componentDidMount() {
    this.timer = setInterval(this.updateTime, 1000);
  }

  updateTime = () => {
    if (this.state.time >= 0) {
      if (!this.state.isPaused) {
        this.setState((prevState) => ({
          minutes : Math.floor(prevState.time / 60),
          seconds: prevState.time % 60,
          time: prevState.time - 1,
        }));
      }
    } else {
      Vibration.vibrate([500, 500, 500])
      console.log("vibrating")
      if (this.state.name === work.name){
        this.setState(rest)
        console.log(rest)
      } else {
        this.setState(work)
      }
    }
  };

  pausePlay = () => {
    this.setState(prevState =>({
      isPaused: !prevState.isPaused,
    }));
  };

  reset = () => {
    this.setState({
      time : this.state.starting_minutes*60,
      minutes : this.state.starting_minutes,
      seconds : 0,
      isPaused : true,
    });
  };

  onChangeTime = (timer, minutes) => {
    let timer_obj = {}
    if (minutes.length > 0){
      timer_obj = { 
        starting_minutes : parseInt(minutes),
        time: parseInt(minutes) * 60,
        minutes: parseInt(minutes),
        seconds: 0,
        isPaused: true,
        name : timer,
      }
    } else {
      timer_obj = { 
        starting_minutes : 0,
        time: 0 * 60,
        minutes: 0,
        seconds: 0,
        isPaused: true,
        name : timer,
      }
    }
    
    if (timer_obj.name === work.name){
      work = timer_obj 
    } else {
      rest = timer_obj
    }

    if (timer_obj.name === this.state.name){
      this.setState(timer_obj)
    }

    console.log(this.state)
  }


  render() {
    return (
      <View style={{flex:1}}>
       
        <View style={styles.container}>
          <Text style={styles.title}>{this.state.name} time</Text>
          <Text style={styles.time}>
            {this.state.minutes} : 
            {this.state.seconds < 10
              ? " 0" + this.state.seconds
              : this.state.seconds}
          </Text>
          <View style={styles.controllers}>
            <View style={styles.buttons}>
              <Button color="#FF003E" title={this.state.isPaused == true ? "Start" : "Pause"} onPress={this.pausePlay} />
            </View>
            <View style={styles.buttons}>
              <Button color="#FF003E" title="Reset" onPress={this.reset} />
            </View>
          </View>
          <View style={styles.inputs}>
            <View style={styles.timerInputHolder}>
              <Text style={{fontSize:20, color:'#fff'}}>Work</Text>
              <TextInput onChangeText={text => this.onChangeTime("Work", text)} style={{fontSize:35, color:'#fff'}} keyboardType="numeric" defaultValue="25"/>
            </View>
            <View style={styles.timerInputHolder}>
              <Text style={{fontSize:20, color:'#fff'}}>Rest</Text>
              <TextInput onChangeText={text => this.onChangeTime("Rest", text)} style={{fontSize:35, color:'#fff'}} keyboardType="numeric" defaultValue="5"/>
            </View>
            
          </View>

          <StatusBar style="auto" />
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 30,
  },

  title: { 
    fontSize: 48,
    padding: 20, 
  },

  time: {
    fontSize: 60,
  },
  controllers: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttons: {
    padding: 10,
    height: 70,
    width: "40%",
  },

  inputs: { 
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
  },

  timerInputHolder: {
    backgroundColor: "#FF003E",
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
    fontSize: 39,
    padding: 20,
    margin: 10,
  },
});
