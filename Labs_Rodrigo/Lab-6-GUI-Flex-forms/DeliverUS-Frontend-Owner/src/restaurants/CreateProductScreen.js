import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import defaultProductImage from '../../../assets/product.jpeg'
import { getProductCategories, create } from '../../api/ProductEndpoints'
import { showMessage } from 'react-native-flash-message'
import DropDownPicker from 'react-native-dropdown-picker'
import * as yup from 'yup'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'
import ImagePicker from '../../components/ImagePicker'
import DropDownPicker from 'react-native-dropdown-picker'
import { Image, Platform, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native'

export default function CreateProductScreen({ navigation, route }) {
  const [restaurantCategories, setRestaurantCategories] = useState([])
  const [open, setOpen] = useState(false)

  const initialProductValues = {
    name: null,
    description: null,
    price: null,
    order: null,
    restaurantId: route.params.id,
    productCategoryId: null,
    availability: true
  }

  useEffect(() => {
    async function fetchRestaurantCategories() {
      try {
        const fetchedRestaurantCategories = await getRestaurantCategories()
        const fetchedRestaurantCategoriesReshaped =
          fetchedRestaurantCategories.map(e => {
            return {
              label: e.name,
              value: e.id
            }
          })
        setRestaurantCategories(fetchedRestaurantCategoriesReshaped)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving restaurant categories. ${error} `,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    fetchRestaurantCategories()
  }, [])

  return (
    <Formik
    initialValues={initialProductValues}
    >
      {({ setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
                <InputItem        // Archivo components/InputItem.js, implementa varios campos de entrada para el formulario
                    name='name'
                    label='Name:'
                />
                <InputItem
                    name='description'
                    label='Description:'
                />
                <InputItem
                    name='price'
                    label='Price:'
                />
                <InputItem
                    name='order'
                    label='Order Code:'
                />

                <DropDownPicker
                  open={open}
                  value={values.restaurantCategoryId}
                  items={restaurantCategories}
                  setOpen={setOpen}
                  onSelectItem={item => {
                    setFieldValue('restaurantCategoryId', item.value)
                  }}
                  setItems={setRestaurantCategories}
                  placeholder="Select the restaurant category"
                  containerStyle={{ height: 40, marginTop: 20 }}
                  style={{ backgroundColor: GlobalStyles.brandBackground }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                />

                <TextRegular>Is it available?</TextRegular>
                <Switch
                  trackColor={{
                    false: GlobalStyles.brandSecondary,
                    true: GlobalStyles.brandPrimary
                  }}
                  thumbColor={
                    values.availability ? GlobalStyles.brandSecondary : '#f4f3f4'
                  }
                  value={values.availability}
                  style={styles.switch}
                  onValueChange={value => setFieldValue('availability', value)}   // si la función es más compleja, podemos invocar otra función así onValueChange={toggleSwitch}
                />

                <ImagePicker
                  label="Image:"
                  image={values.image}
                  defaultImage={defaultProductImage}
                  onImagePicked={result => setFieldValue('image', result)}
                />

                <Pressable
                  onPress={() => console.log('Button pressed')}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? GlobalStyles.brandSuccessTap
                        : GlobalStyles.brandSuccess
                    },
                    styles.button
                  ]}
                >
                  <View
                    style={[
                      { flex: 1, flexDirection: 'row', justifyContent: 'center' }
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="content-save"
                      color={'white'}
                      size={20}
                    />
                    <TextRegular textStyle={styles.text}>Save</TextRegular>
                  </View>
                </Pressable>

            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  },
  switch: {
    marginTop: 5
  }
})
