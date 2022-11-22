import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {ReactElement} from 'react';

type Props = {
  randomNumber: number;
  isSelected: boolean;
  onPress: () => void;
};
const RandomNumber: React.FC<Props> = ({
  randomNumber,
  isSelected,
  onPress,
}): ReactElement => {
  const handleOnPress = () => {
    onPress();
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Text style={[styles.randomNumberText, isSelected && styles.selected]}>
        {randomNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default RandomNumber;

const styles = StyleSheet.create({
  randomNumberText: {
    fontSize: 35,
    backgroundColor: 'green',
    textAlign: 'center',
    width: 100,
    marginHorizontal: 50,
    marginVertical: 25,
  },
  selected: {
    opacity: 0.3,
  },
});
