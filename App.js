import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { colors } from './src/utils/colors';
import { spacingSizes, fontSizes } from './src/utils/sizes';
import { Timer } from './src/features/timer/Timer';
import { FocusHistory } from './src/features/focus/FocusHistory';

const STATUSES = {
  DONE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSub, setFocusSub] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  //store focus subject change
  /*  useEffect(()=>{
    if(focusHistory) {
      setFocusHistory([...focusHistory, focusSub])
    }
  },[focusSub])

  console.log(focusHistory) */

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
  };

  //console.log(focusHistory)

  const onClear = () => {
    setFocusHistory([]);
  };

  //Working on Persistence - saving and loading
  const saveFocusHistory = async () => {
    try {
      //safe the focusHistory asynchronously to you app state
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch(e) {
      console.log(e)
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if(history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(()=>{loadFocusHistory()}, [])

  useEffect(() => {
    saveFocusHistory()
    }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSub ? (
        <Timer
          focusSub={focusSub}
          onTimerEnd={() => {
            addFocusHistoryWithStatus(focusSub, STATUSES.DONE);
            setFocusSub(null);
          }}
          clearSub={() => {
            setFocusSub(null);
            addFocusHistoryWithStatus(focusSub, STATUSES.CANCELLED);
          }}
        />
      ) : (
        <View style={{flex: 1}}>
          <Focus addSub={setFocusSub} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === 'ios' ? spacingSizes.md : spacingSizes.lg,
  },
});
