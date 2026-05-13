import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import * as yup from 'yup'
import { Formik } from 'formik'
import TextError from '../../components/TextError'
import { buildInitialValues } from '../Helper'
import { updateSchedule } from '../../api/RestaurantEndpoints'

export default function EditScheduleScreen ({ navigation, route }) {
  const [schedule, setSchedule] = useState()

  // Esquema de validación para las horas
  const validationSchema = yup.object().shape({
    startTime: yup.string()
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'The time must be in the HH:mm:ss (e.g. 14:30:00) format')
      .required('Start time is required'),
    endTime: yup.string()
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'The time must be in the HH:mm:ss (e.g. 14:30:00) format')
      .required('End time is required')
  })
  useEffect(() => {
    // Los datos del horario vienen a través de la ruta (route.params.schedule)
    // O si prefieres, puedes pasarlos como objeto inicial.
    if (route.params.schedule) {
      setSchedule(route.params.schedule)
    }
  }, [route])
  const update = async (values) => {
    try {
      await updateSchedule(route.params.restaurantId, route.params.id, values)
      showMessage({
        message: 'Schedule successfully updated',
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.goBack()
    } catch (error) {
      showMessage({
        message: `Schedule could not be updated. ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }
  return (
    <Formik
      enableReinitialize
      initialValues={schedule || { startTime: '', endTime: '' }}
      validationSchema={validationSchema}
      onSubmit={update}
    >
      {({ handleSubmit, setFieldValue, values, errors }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '80%' }}>
              
              <InputItem
                name='startTime'
                label='Start Time (HH:mm:ss):'
                placeholder='12:00:00'
                onChangeText={value => setFieldValue('startTime', value)}
                value={values.startTime}
              />
              {errors.startTime && <TextError>{errors.startTime}</TextError>}

              <InputItem
                name='endTime'
                label='End Time (HH:mm:ss):'
                placeholder='14:00:00'
                onChangeText={value => setFieldValue('endTime', value)}
                value={values.endTime}
              />
              {errors.endTime && <TextError>{errors.endTime}</TextError>}

              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccessTap
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                  <MaterialCommunityIcons name='save' color={'white'} size={20}/>
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

  }
})
