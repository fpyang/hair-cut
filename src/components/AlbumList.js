import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LunarCalendar from 'lunar-calendar-zh';
/*
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';
*/
import AlbumDetail from './AlbumDetail';


var happyrun = require('../data/happyrun.json');
var styles = {
  center: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  clock: {
    fontFamily: 'Verdana',
    fontSize: 20
  },
  heavy: {
    fontSize: 20
  },
  good: {
    fontSize: 50,
    marginTop: 20,
    marginBottom: 0
  },
  calendarHeader: {
    width: 200,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff3333',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  calendarHeaderFont: {
    color: '#f2f2f2',
    fontWeight: 'bold',
    fontSize: 22
  },
  calendarShadow: {
    width: 200,
    height: 5,
    backgroundColor: '#cc0000'
  },
  calendarContent: {
    width: 200,
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25
  },
  calendarContentFont: {
    color: '#404040',
    fontWeight: 'bold',
    fontSize: 36,
    margin: 20
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
    margin: 5
  },
  comment: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 60
  },
  sunTime: {
    margin: 16,
    fontWeight: 'bold',
    fontSize: 16
  }
}

class AlbumList extends Component {
  state = { curTime: new Date() };

  componentWillMount() {
    let offset = 8; //Taipei


    setInterval( () => {
      // 建立現在時間的物件
      let d = new Date();
      // 取得 UTC time
      let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

      this.setState({
        curTime : new Date(utc + (3600000*offset))
      }, this.setState({
        lunarTime: this.timeToLunarTime(new Date(utc + (3600000*offset)))
      }))
    },1000)
  }
   timeToLunarTime(time){
     let timeStr = time.toLocaleString();
     let dateStr = timeStr.split(' ')[0];
     let [ lyear, lmonth, lday ] = [time.getFullYear(), time.getMonth()+1, time.getDate()];
     let dateDict = { lyear, lmonth, lday};
     let lunarInfo = LunarCalendar.solarToLunar(lyear, lmonth, lday);

     return lunarInfo;

   }
   // 新增當地時區的時間物件
   dateTimezone(offset) {

      // 建立現在時間的物件
      let d = new Date();

      // 取得 UTC time
      let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

      // 新增不同時區的日期資料
      return new Date(utc + (3600000*offset));

  }

  getLunarDay(){
    if(this.state.lunarTime){
      return (happyrun[this.state.lunarTime.lunarDay - 1]);
      //return(this.state.lunarTime.lunarDay - 1);
    }else{
      return('');
    }
  }

  formatter(time){
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    if(second<10){
      second = '0'+second.toString();
    }
    return (year+"/"+month+"/"+date+" "+hour+":"+minute+":"+second);
  }

  renderGood(good){
    if(good){
      return '吉';
    }else{
      return '兇';
    }
  }
  /*

  */
  render() {
    /*
    <AdMobBanner
      style={{position: 'absolute',
              bottom:0,
              left:0}}
      adSize="fullBanner"
      adUnitID="ca-app-pub-2930499231441098/4249773459"
      testDevices={[AdMobBanner.simulatorId]}
      onAdFailedToLoad={error => console.error(error)}
    />
    */
    //<Text>{'\n\n\n' + JSON.stringify(this.state.lunarTime)}</Text>
    let date_taipei = this.dateTimezone(8);
    if(this.state.lunarTime){
      return(
        <View style={styles.center}>
          <Text style={styles.sunTime}>{this.formatter(this.state.curTime)}</Text>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarHeaderFont}>{this.state.lunarTime.lunarMonthName}</Text>
          </View>
          <View style={styles.calendarShadow}></View>
          <View style={styles.calendarContent}>
            <Text style={styles.calendarContentFont}>{this.state.lunarTime.lunarDayName}</Text>
            <Text style={styles.title}>{this.getLunarDay().title}</Text>
          </View>
          <Text style={styles.good}>{this.renderGood(this.getLunarDay().goodday)}</Text>
          <Text style={styles.comment}>{ this.getLunarDay().comment}</Text>


        </View>
      );
    }
    return (
      <View />
    );


    /*
    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
    */
  }
}

export default AlbumList;
