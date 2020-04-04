import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import catch22Api from '../api/catch22delivery';

const Categories = ({ style }) => {
  const [categories, setCategories] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState('');

  let indexAll = 0;
  const getCategories = async () => {
    try {
      const response = await catch22Api.get('/categories', {
        params: {
          per_page: 50
        }
      });
      setCategories(
        response.data.map((cat, i) => {
          if (cat.slug === 'all') {
            indexAll = i;
          }
          return {
            cat,
            selected: i === indexAll ? true : false
          };
        })
      );
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  const handleButtonPress = iPressed => {};

  return (
    <View style={style}>
      <Text style={styles.headerStyle}>Categories</Text>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      <ScrollView
        style={styles.categoryBoxStyles}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
      >
        {categories.map((item, i) => {
          const cat = item.cat;
          if (item.selected) {
            return (
              <Button
                key={cat.id}
                style={styles.itemStyle}
                title={cat.name}
                iconRight
                icon={
                  <FontAwesome
                    name='check'
                    size={20}
                    style={{ color: 'white', paddingLeft: 3 }}
                  />
                }
              />
            );
          }
          return (
            <Button
              key={cat.id}
              style={styles.itemStyle}
              title={cat.name}
              type='outline'
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

Categories.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 5
  },
  categoryBoxStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap'
    // justifyContent: 'center'
  },
  contentContainerStyle: {
    justifyContent: 'center'
  },
  itemStyle: {
    margin: 4
  }
});

export default Categories;
