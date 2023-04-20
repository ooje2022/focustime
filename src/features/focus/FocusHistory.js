import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { fontSizes, spacingSizes } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';

const HistoryItem = ({ item, index }) => {
  return (
    <Text style={styles.historyItem(item.status)}>{item.subject}</Text> //JSON.stringify(item) gives {subject: Banana, status: 2}
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'Center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things focused on</Text>

            <FlatList
              style={{ width: '100%', height: '100%' }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => {
                  onClear();
                }}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }), //putting the last set of parenthesis ensures that the function returns an object
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacingSizes.md,
  },
});
