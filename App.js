import React from "react";
import { StyleSheet, Text, View, Button, Vibration, TextInput } from "react-native";

export default class App extends React.Component {
  state = {
    work : {
      starting_minutes : 25,
      name : "Work",
      active: true,
    },
    rest : {
      starting_minutes : 5,
      name : "Rest",
      active: false,
    },
    active : {}
  }

  componentDidMount = () => {
    this.changeToActive()
    this.timer = setInterval(this.updateTime, 1000);
  }

  changeToActive = () => {
    if (this.state.work.active){
      this.setState(prevState => ({
        active : {
          starting_minutes : prevState.work.starting_minutes,
          name: prevState.work.name, 
          time: prevState.work.starting_minutes * 60,
          minutes: prevState.work.starting_minutes,
          seconds: 0,
          isPaused: true,
        }
      }))
    } else {
      this.setState(prevState => ({
        active : {
          starting_minutes : prevState.rest.starting_minutes,
          name: prevState.rest.name, 
          time: prevState.rest.starting_minutes * 60,
          minutes: prevState.rest.starting_minutes,
          seconds: 0,
          isPaused: true,
        }
      }))
    }
  }

  updateTime = () => {
    if (this.state.active.time >= 0) {
      if (!this.state.active.isPaused) {
        this.setState((prevState) => ({
          active : {
            minutes : Math.floor(prevState.active.time / 60),
            seconds: prevState.active.time % 60,
            time: prevState.active.time - 1,
            starting_minutes : prevState.active.starting_minutes,
            isPaused: prevState.active.isPaused,
            name : prevState.active.name,
          }
        }));
      }
    } else {
      Vibration.vibrate([500, 500, 500])
      console.log("vibrating")
      this.setState(prevState => ({
        work : {
          name : prevState.work.name,
          starting_minutes : prevState.work.starting_minutes,
          active : !prevState.work.active,
        },
        rest : {
          name : prevState.rest.name,
          starting_minutes : prevState.rest.starting_minutes,
          active : !prevState.rest.active,
        }
      }))
      this.changeToActive()
    }
  };

  pausePlay = () => {
    this.setState(prevState =>({
      active : {
        starting_minutes : prevState.active.starting_minutes,
        isPaused: !prevState.active.isPaused,
        time : prevState.active.time,
        minutes : prevState.active.minutes,
        seconds : prevState.active.seconds,
        name : prevState.active.name,
      }
    }));
  };

  reset = () => {
    this.setState(prevState => ({
      active : {
        starting_minutes : prevState.active.starting_minutes,
        time : prevState.active.starting_minutes*60,
        minutes : prevState.active.starting_minutes,
        seconds : 0,
        isPaused : true,
        name : prevState.active.name,
      }
    }));
  };

  onChangeWorkTime = (minutes) => {
    if (+minutes >= 0){
      this.setState(prevState => ({
        work : { 
          starting_minutes : +minutes,
          name : prevState.work.name,
          active : prevState.work.active,
        }
      }))
    }
    this.changeToActive()
  }

  onChangeRestTime = (minutes) => {
    if (+minutes >= 0){
      this.setState(prevState => ({
        rest : { 
          starting_minutes : +minutes,
          name : prevState.rest.name,
          active : prevState.rest.active,
        }
      }))
    }
    this.changeToActive()
  }


  render() {
    return (
      <View style={{flex:1}}>
       
        <View style={styles.container}>
          <Text style={styles.title}>
            {this.state.active.name} time
          </Text>
          <Text style={styles.time}>
            {this.state.active.minutes} : 
            {this.state.active.seconds < 10
              ? " 0" + this.state.active.seconds
              : this.state.active.seconds}
          </Text>
          <View style={styles.controllers}>
            <View style={styles.buttons}>
              <Button 
                color="#FF003E"
                title={this.state.active.isPaused == true ? "Start" : "Pause"} 
                onPress={this.pausePlay} 
              />
            </View>
            <View style={styles.buttons}>
              <Button 
                color="#FF003E" 
                title="Reset" 
                onPress={this.reset} 
              />
            </View>
          </View>
          <View style={styles.inputs}>
            <View style={styles.timerInputHolder}>
              <Text style={{fontSize:20, color:'#fff'}}>
                {this.state.work.name}
              </Text>
              <TextInput 
                onChangeText={text => this.onChangeWorkTime(text)} 
                style={{fontSize:35, color:'#fff'}} 
                keyboardType="numeric" 
                value={"" + this.state.work.starting_minutes}/>
            </View>
            <View style={styles.timerInputHolder}>
              <Text style={{fontSize:20, color:'#fff'}}>
              {this.state.rest.name}
              </Text>
              <TextInput 
                onChangeText={text => this.onChangeRestTime(text)}
                style={{fontSize:35, color:'#fff'}} 
                keyboardType="numeric" 
                value={"" + this.state.rest.starting_minutes}/>
            </View>
          </View>
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
