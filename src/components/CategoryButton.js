import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

const CategoryButton = ({ cat, isSelected, toggleCategory }) => {
  if (isSelected) {
    return (
      <Button
        style={styles.buttonStyle}
        title={cat.name}
        iconRight
        icon={
          <FontAwesome
            name='check'
            size={20}
            style={{ color: 'white', paddingLeft: 3 }}
          />
        }
        onPress={toggleCategory}
      />
    );
  }
  return (
    <Button
      style={styles.buttonStyle}
      title={cat.name}
      type='outline'
      onPress={toggleCategory}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 3
  }
});
export default CategoryButton;
