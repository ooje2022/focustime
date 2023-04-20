import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const Focus = ({ addSub }) => {
  const [tempItem, setTempItem] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What woud you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: spacingSizes.md }}
            onSubmitEditing={({ nativeEvent }) => {
              setTempItem(nativeEvent.text);
            }}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSub(tempItem);
              console.log(tempItem)
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: spacingSizes.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontwWight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacingSizes.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
