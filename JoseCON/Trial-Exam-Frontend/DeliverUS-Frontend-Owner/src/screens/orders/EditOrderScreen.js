import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import { Formik } from 'formik'
import { getById, update } from '../../api/OrderEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import TextError from '../../components/TextError'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'

export default function EditOrderScreen ({ navigation, route }) {
  const [order, setOrder] = useState({})
  const [initialValues, setInitialValues] = useState({ address: '', price: '' })
  const [backendErrors, setBackendErrors] = useState([])

  const validationSchema = yup.object().shape({
    address: yup.string().required('Address is required'),
    price: yup
      .number()
      .typeError('Price must be a number')
      .required('Price is required')
      .positive('Price must be greater than 0')
  })

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = route?.params?.orderId ?? route?.params?.id
        const fetchedOrder = await getById(orderId)
        setOrder(fetchedOrder)
        setInitialValues({
          address: fetchedOrder.address ?? '',
          price: fetchedOrder.price?.toString?.() ?? ''
        })
      } catch (error) {
        showMessage({
          message: `Error loading order. ${error}`,
          type: 'danger',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }

    fetchOrder()
  }, [route])

  const updateOrder = async (values) => {
    setBackendErrors([])
    try {
      await update(order.id, values)
      showMessage({
        message: 'Edit successfully',
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.goBack()
    } catch (error) {
      setBackendErrors(error?.errors || [])
      showMessage({
        message: `Error updating order. ${error}`,
        type: 'danger',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={updateOrder}
    >
      {({ handleSubmit }) => (
        <ScrollView>
          <View>
            <InputItem name='address' label='Address' />
            <InputItem name='price' label='Price' />

            {backendErrors.map((e, i) => (
              <TextError key={i}>{e.param}-{e.msg}</TextError>
            ))}

            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? GlobalStyles.brandGreenTap
                    : GlobalStyles.brandGreen
                },
                styles.button
              ]}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <MaterialCommunityIcons name='content-save' color='white' size={20} />
                <TextRegular textStyle={styles.text}>Save</TextRegular>
              </View>
            </Pressable>
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
  }
})
