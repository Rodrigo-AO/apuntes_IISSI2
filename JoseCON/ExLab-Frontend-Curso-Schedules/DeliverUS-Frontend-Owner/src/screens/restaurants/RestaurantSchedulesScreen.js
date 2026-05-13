/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, FlatList, Pressable, View } from 'react-native'

import { getRestaurantSchedules, removeSchedule } from '../../api/RestaurantEndpoints'
import ImageCard from '../../components/ImageCard'
import TextSemiBold from '../../components/TextSemibold'
import TextRegular from '../../components/TextRegular'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { AuthorizationContext } from '../../context/AuthorizationContext'
import { showMessage } from 'react-native-flash-message'
import DeleteModal from '../../components/DeleteModal'
import scheduleIcon from '../../../assets/schedule.png'

export default function RestaurantSchedulesScreen ({ navigation, route }) {
  const { loggedInUser } = useContext(AuthorizationContext)
  const [schedules, setSchedules] = useState([])
  const [scheduleToBeDeleted, setScheduleToBeDeleted] = useState(null)

  useEffect(() => {
    if (loggedInUser) {
      fetchSchedules()
    } else {
      setSchedules([])
    }
  }, [loggedInUser, route])

  const renderSchedule = ({ item }) => {
    return (
      <ImageCard
        imageUri={scheduleIcon}
        title={item.startTime + ' - ' + item.endTime}
      >
        <TextRegular textStyle={styles.productsAssociatedText}>
          {item.products.length} products associated
        </TextRegular>
      </ImageCard>
    )
  }

  const renderEmptySchedulesList = () => {
    return (
      <TextRegular textStyle={styles.emptyList}>
        No schedules were retreived. Either you are not logged in or the restaurant has no schedules yet.
      </TextRegular>
    )
  }

  const renderHeader = () => {
    return (
      <>
      {loggedInUser &&
      <Pressable
        onPress={() => navigation.navigate('EditScheduleScreen', { 
            id: item.id,                 // El ID del horario a editar
            restaurantId: route.params.id, // El ID del restaurante
            schedule: item               // <--- IMPORTANTE: mandamos el objeto entero para la precarga
          })}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? GlobalStyles.brandBlueTap
                : GlobalStyles.brandBlue
            },
            styles.actionButton
        ]}>
        <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
          <MaterialCommunityIcons name='plus-circle' color={'white'} size={20}/>
          <TextRegular textStyle={styles.text}>
            Create schedule
          </TextRegular>
        </View>
      </Pressable>
    }
    </>
    )
  }

  const fetchSchedules = async () => {
    try {
      const fetchedSchedules = await getRestaurantSchedules(route.params.id)
      setSchedules(fetchedSchedules)
    } catch (error) {
      showMessage({
        message: `There was an error while retrieving schedules. ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  const remove = async (schedule) => {
    try {
      // 1. Llamamos a la función del API que nos dice el enunciado
      await removeSchedule(route.params.id, schedule.id)
      
      // 2. Si el borrado tiene éxito, refrescamos la lista para que desaparezca
      await fetchSchedules()
      
      // 3. Cerramos el modal poniendo el estado a null
      setScheduleToBeDeleted(null)
      
      // 4. Mostramos mensaje de éxito
      showMessage({
        message: 'Schedule successfully removed',
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    } catch (error) {
      // Si hay error, cerramos el modal y avisamos
      setScheduleToBeDeleted(null)
      showMessage({
        message: `Schedule could not be removed. ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  return (
    <>
      <FlatList
        style={styles.container}
        data={schedules}
        renderItem={renderSchedule}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptySchedulesList}
      />

      <DeleteModal
        isVisible={scheduleToBeDeleted !== null}
        onCancel={() => setScheduleToBeDeleted(null)}
        onConfirm={() => remove(scheduleToBeDeleted)}>
          <TextRegular>If the schedule is deleted, the associated products will be unscheduled.</TextRegular>
      </DeleteModal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%'
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    bottom: 5,
    position: 'absolute',
    width: '90%'
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 5
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  },
  productsAssociatedText: {
    textAlign: 'right',
    color: GlobalStyles.brandSecondary
  }
})
