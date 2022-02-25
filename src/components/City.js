import React from 'react';
import {  Text, View, useWindowDimensions } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import City from '../components/City';
const kelvin = 272.15;

export default function CityComponent(props){
    const windowWidth = useWindowDimensions().width;
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const weatherIcons = {
          'Thunderstorm': <FontAwesome5 style={{paddingLeft: 10}} name="thunderstorm" size={30} color='#c4b402'/>,
          'Drizzle' : <FontAwesome5 style={{paddingLeft: 10}} name="cloud-drizzle" size={30} color='#05a0ab'/>,
          'Rain' : <FontAwesome5 style={{paddingLeft: 10}} name="cloud-rain" size={30} color='#05a0ab'/>,
          'Snow' : <FontAwesome5 style={{paddingLeft: 10}} name="snowflake" size={30} color='#65e2eb'/>,
          'Mist' : <FontAwesome5 style={{paddingLeft: 10}} name="fog" size={30} color='#8b8f8c'/>,
          'Clear' : <FontAwesome5 style={{paddingLeft: 10}} name="sun" size={30} color='#f29b29'/>,
          'Clouds' : <FontAwesome5 style={{paddingLeft: 10}} name="cloud" size={30} color='#8b8f8c'/>,
          'Smoke' : <FontAwesome5 style={{paddingLeft: 10}} name="smoke" size={30} color='#8b8f8c'/>,
          'Haze' : <FontAwesome5 style={{paddingLeft: 10}} name="sun-haze" size={30} color='#f29b29'/>,
          'Dust' : <FontAwesome5 style={{paddingLeft: 10}} name="sun-dust" size={30} color='#cf8f3c'/>,
          'Fog' : <FontAwesome5 style={{paddingLeft: 10}} name="fog" size={30} color='#8b8f8c'/>,
          'Sand' : <FontAwesome5 style={{paddingLeft: 10}} name="cactus" size={30} color='#cf8f3c'/>,
          'Ash' : <FontAwesome5 style={{paddingLeft: 10}} name="volcano" size={30} color='#8b8f8c'/>,
          'Squall' : <FontAwesome5 style={{paddingLeft: 10}} name="hurricane" size={30} color='#002674'/>,
          'Tornado' : <FontAwesome5 style={{paddingLeft: 10}} name="tornado" size={30} color='#8b8f8c'/>,
      }
    
      const DaysMap = () => {
        let nextDay = props.currentDay + 1;
        return <ScrollView>
            {props.daysList.map((day, dayKey) => {
            if((nextDay + 1) > 6){
                nextDay = 0;
            } else {
                nextDay++;
            }
            return <View key={dayKey} style={props.styles.daysItem}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize : 18, fontWeight: 'bold'}}>{nextDay != 0 ? weekDays[nextDay - 1] : weekDays[6]}</Text>
                    {weatherIcons[day.weather[0].main]}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{`${Math.round(day.temp.max - kelvin)}°`}</Text>
                        <Text style={{fontSize: 14, fontStyle: 'italic'}}>Max.</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{`${Math.round(day.temp.min - kelvin)}°`}</Text>
                        <Text style={{fontSize: 14, fontStyle: 'italic'}}>Min.</Text>
                    </View>
                </View>
            </View>
        }
        )}
        </ScrollView>;
    }

    return(
        <View>
            <View style={{
                width: Math.round(windowWidth) - 75, 
                height: '90%',
                borderColor: '#002674',
                borderWidth: 2,
                borderRadius: 10,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center'
            }
            }>
                <Text style={{fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 30, 
                    color: '#002674'}}>
                    {props.cityObj.city_name}
                </Text>
                <View style={{flex: 1, marginVertical: 15, width: '90%'}}>
                    <DaysMap/>
                </View>
                
            </View>
        </View>
    );
}