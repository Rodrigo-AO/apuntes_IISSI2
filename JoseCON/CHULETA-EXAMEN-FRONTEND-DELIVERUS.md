# CHULETA DEFINITIVA EXAMEN FRONTEND DELIVERUS (IISSI)

> Objetivo de esta chuleta:
> que puedas resolver un examen tipo DeliverUS de frontend aunque vayas nervioso, con una guia paso a paso, plantillas listas para copiar, errores tipicos y orden de ejecucion exacto.

---

## 0) Que tipo de examen te va a caer (patron real)

En tus examenes de muestra, el patron se repite:

1. Te dan backend ya funcionando (endpoints listos).
2. Te piden implementar frontend de varios RF en pantallas concretas.
3. Casi siempre toca:
   - Listados (RF visualizacion)
   - Formularios de crear/editar (Formik + Yup)
   - Borrado con confirmacion (DeleteModal)
   - Acciones especificas (marcar default, cambiar estado, analytics, asignar horario)
4. Se evalua:
   - Que cumpla pruebas de aceptacion
   - Que se parezca a las capturas
   - Que navegue bien
   - Que valide bien
   - Que actualice la vista tras cambios

Si haces esto bien, tienes gran parte del examen aprobado.

---

## 1) Metodo de trabajo en examen (orden perfecto)

## 1.1 Orden macro (siempre)

1. Arrancar proyecto y comprobar que backend + frontend levantan.
2. Leer README completo y subrayar:
   - Archivos exactos a tocar
   - RF y pruebas de aceptacion
   - Endpoints disponibles
3. Resolver en este orden:
   - RF de listado principal
   - Navegacion de entrada/salida
   - RF de crear/editar
   - RF de borrar
   - RF extra (analytics, default, advance, dropdown especial)
4. Pulido final:
   - Mensajes success/error
   - Casos vacios
   - Validaciones
   - Comprobacion visual
5. Entrega (limpieza carpetas, zip correcto).

## 1.2 Orden micro por cada RF

1. Ver que endpoint lo resuelve.
2. Crear/confirmar funcion en src/api.
3. Implementar estado + fetch en pantalla.
4. Pintar UI de lista/form.
5. Conectar botones.
6. Mostrar feedback (showMessage).
7. Probar caso feliz + caso error.

Si un RF no depende de otro, ve a por puntos rapidos primero.

---

## 2) Estructura mental de DeliverUS (frontend)

## 2.1 Donde esta cada cosa

- src/api:
  funciones de acceso a backend.
- src/screens:
  pantallas reales del examen.
- src/components:
  InputItem, DeleteModal, ImageCard, TextRegular...
- src/styles/GlobalStyles:
  colores y estilos de marca.
- Stacks (RestaurantsStack/ProfileStack/etc):
  registro de rutas.

## 2.2 Flujo comun

1. Pantalla entra con route.params.id.
2. useEffect llama fetch...
3. setState con respuesta.
4. render list/form.
5. accion de usuario -> endpoint.
6. exito -> showMessage success + refrescar o navegar.
7. error -> showMessage error.

---

## 3) Setup y comandos (plantilla)

## 3.1 Instalacion

Windows:

```bash
npm run install:all:win
```

Linux/Mac:

```bash
npm run install:all:bash
```

## 3.2 Backend

```bash
npm run migrate:backend
npm run start:backend
```

## 3.3 Frontend

```bash
npm run start:frontend
```

## 3.4 Regla de oro

Siempre deja abierto backend y frontend en terminales separadas.

---

## 4) Plantillas universales de codigo (copiar y adaptar)

## 4.1 Plantilla endpoint API

Archivo tipo src/api/FeatureEndpoints.js

```js
import { get, post, put, patch, destroy } from './helpers/ApiRequestsHelper'

const getAllItems = () => get('/ruta')

const getItemDetail = (id) => get(`/ruta/${id}`)

const createItem = (data) => post('/ruta', data)

const updateItem = (id, data) => put(`/ruta/${id}`, data)

const deleteItem = (id) => destroy(`/ruta/${id}`)

const customAction = (id, data = null) => patch(`/ruta/${id}/accion`, data)

export {
  getAllItems,
  getItemDetail,
  createItem,
  updateItem,
  deleteItem,
  customAction
}
```

Checklist rapido API:

1. Import correcto (get/post/put/patch/destroy).
2. Ruta exacta (sin inventar).
3. Parametros correctos (id, restaurantId, etc).
4. Export final correcto.

---

## 4.2 Plantilla listado con fetch

```js
import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { showMessage } from 'react-native-flash-message'

export default function ExampleListScreen ({ route }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems()
  }, [route])

  const fetchItems = async () => {
    try {
      const data = await getAllItems(route?.params?.id)
      setItems(data)
    } catch (error) {
      showMessage({
        message: `Error retrieving items. ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  const renderItem = ({ item }) => {
    return <YourRow item={item} />
  }

  const renderEmpty = () => {
    return <TextRegular>No data available</TextRegular>
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  )
}
```

---

## 4.3 Plantilla formulario Formik + Yup

```js
import React, { useState } from 'react'
import { View, Pressable, ScrollView } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { showMessage } from 'react-native-flash-message'

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup.number().positive('Price must be greater than 0').required('Price is required')
})

const initialValues = {
  name: '',
  price: ''
}

export default function ExampleFormScreen ({ navigation }) {
  const [backendErrors, setBackendErrors] = useState([])

  const handleSave = async (values) => {
    setBackendErrors([])
    try {
      await createOrUpdate(values)
      showMessage({
        message: 'Saved successfully',
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.goBack()
    } catch (error) {
      setBackendErrors(error.errors || [])
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSave}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <ScrollView>
          <View>
            <InputItem name='name' label='Name' />
            <InputItem name='price' label='Price' />

            {backendErrors.map((e, i) => (
              <TextError key={i}>{e.param}-{e.msg}</TextError>
            ))}

            <Pressable onPress={handleSubmit}>
              <TextRegular>Save</TextRegular>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}
```

---

## 4.4 Plantilla borrado con DeleteModal

```js
const [itemToBeDeleted, setItemToBeDeleted] = useState(null)

const removeItem = async (item) => {
  try {
    await deleteItem(item.id)
    setItemToBeDeleted(null)
    await fetchItems()

    showMessage({
      message: 'Item successfully removed',
      type: 'success',
      style: GlobalStyles.flashStyle,
      titleStyle: GlobalStyles.flashTextStyle
    })
  } catch (error) {
    setItemToBeDeleted(null)

    showMessage({
      message: `Item could not be removed. ${error}`,
      type: 'error',
      style: GlobalStyles.flashStyle,
      titleStyle: GlobalStyles.flashTextStyle
    })
  }
}

<DeleteModal
  isVisible={itemToBeDeleted !== null}
  onCancel={() => setItemToBeDeleted(null)}
  onConfirm={() => removeItem(itemToBeDeleted)}
>
  <TextRegular>Confirm deletion?</TextRegular>
</DeleteModal>
```

---

## 4.5 Plantilla dropdown dinamico (categoria/horario)

```js
const [open, setOpen] = useState(false)
const [items, setItems] = useState([])

useEffect(() => {
  fetchDropdownData()
}, [entity])

const fetchDropdownData = async () => {
  const data = await getSomething(entity.restaurantId)
  const reshaped = data.map((e) => ({
    label: e.name,
    value: e.id
  }))
  setItems(reshaped)
}

<DropDownPicker
  open={open}
  value={values.categoryId}
  items={items}
  setOpen={setOpen}
  setItems={setItems}
  onSelectItem={(item) => setFieldValue('categoryId', item.value)}
/>
```

---

## 5) Bloques especificos por tipo de examen

## 5.1 Horarios (Schedules) - plantilla completa

RF tipicos:

1. Ver horario de cada producto en RestaurantDetail.
2. Ver lista de horarios y numero de productos asociados.
3. Editar horario con validacion HH:mm:ss.
4. Borrar horario con confirmacion.
5. Asignar/desasignar horario en EditProduct.

## 5.1.1 Endpoint map minimo

- GET /restaurants/:restaurantId (detalle con products + schedule)
- GET /restaurants/:restaurantId/schedules
- PUT /restaurants/:restaurantId/schedules/:scheduleId
- DELETE /restaurants/:restaurantId/schedules/:scheduleId
- PUT /products/:productId (incluyendo scheduleId o campo equivalente)

## 5.1.2 Regex valida HH:mm:ss

```js
/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
```

Mensaje sugerido:

The time must be in the HH:mm:ss (e.g. 14:30:00) format

## 5.1.3 Pintar producto con horario

```js
<TextRegular>
  {item.schedule
    ? `${item.schedule.startTime} - ${item.schedule.endTime}`
    : 'Not scheduled'}
</TextRegular>
```

## 5.1.4 Dropdown de horarios en EditProduct

1. Cargar horarios con restaurantId del producto.
2. Mapear a label/value.
3. Anadir opcion inicial Not scheduled con value null.
4. setFieldValue en seleccion.

---

## 5.2 Categorias de producto - plantilla completa

RF tipicos:

1. Boton "View categories" en detalle restaurante.
2. Pantalla de listado de categorias del restaurante.
3. Crear categoria.
4. Borrar categoria con modal.
5. Mostrar solo categorias del restaurante en CreateProduct/EditProduct.

## 5.2.1 Patron de listado de categorias

1. fetch detalle restaurante.
2. extraer restaurant.productCategories.
3. pintar filas con nombre + boton delete.

## 5.2.2 Create category payload

```js
const payload = {
  name: values.name,
  restaurantId: route.params.id
}
```

---

## 5.3 Pedidos (Orders) - plantilla completa

RF tipicos:

1. Listado de pedidos de un restaurante.
2. Edicion de direccion y precio.
3. Analiticas.
4. Boton Advance para cambiar estado.

## 5.3.1 Datos minimos por pedido

- createdAt
- status
- address
- price

## 5.3.2 Analiticas esperadas

```js
{
  restaurantId,
  numYesterdayOrders,
  numPendingOrders,
  numDeliveredTodayOrders,
  invoicedToday
}
```

## 5.3.3 Regla de avance de estado

- pending -> in process
- in process -> sent
- sent -> delivered
- delivered -> sin boton Advance

## 5.3.4 Error critico habitual

Si la funcion nextStatus espera order completo, no le pases solo orderId.
Revisa firma de funcion y adapta la llamada.

## 5.3.5 Validacion EditOrder

- address required
- price required
- price > 0

---

## 5.4 Direcciones (Address) - plantilla completa

RF tipicos:

1. Listar direcciones del usuario autenticado.
2. Crear direccion.
3. Marcar default.
4. Borrar direccion.

## 5.4.1 Endpoints esperados

- GET /shippingaddresses
- POST /shippingaddresses
- PATCH /shippingaddresses/:id/default
- DELETE /shippingaddresses/:id

## 5.4.2 Campos obligatorios

- alias
- street
- city
- zipCode
- province

## 5.4.3 Implementacion base AddressEndpoints

```js
import { get, post, patch, destroy } from './helpers/ApiRequestsHelper'

function getAddresses () {
  return get('/shippingaddresses')
}

function addAddress (data) {
  return post('/shippingaddresses', data)
}

function setDefault (id) {
  return patch(`/shippingaddresses/${id}/default`)
}

function deleteAddress (id) {
  return destroy(`/shippingaddresses/${id}`)
}

export { getAddresses, addAddress, setDefault, deleteAddress }
```

## 5.4.4 Lista de direcciones (UI minima)

Cada fila:

1. Alias
2. Direccion completa
3. Estrella (filled si isDefault)
4. Papelera delete

---

## 6) Navegacion: receta anti-fallos

## 6.1 Regla principal

Todo boton de navegacion exige 3 comprobaciones:

1. La pantalla esta registrada en el Stack.
2. El nombre en navigate coincide exacto con Stack.Screen name.
3. params necesarios llegan completos.

## 6.2 Ejemplo seguro

```js
navigation.navigate('EditScheduleScreen', {
  id: schedule.id,
  restaurantId: route.params.id,
  schedule
})
```

## 6.3 Al volver tras guardar

Opciones validas:

1. navigation.goBack()
2. navigation.navigate('ScreenX', { id, dirty: true })

Si usas dirty, en useEffect del listado escucha route y recarga.

---

## 7) Validaciones frecuentes (tabla mental)

1. Texto obligatorio:
   yup.string().required('... is required')
2. Precio:
   yup.number().positive('...').required('...')
3. Entero:
   yup.number().integer('...')
4. Hora HH:mm:ss:
   yup.string().matches(regex, '...')
5. Boolean switch:
   yup.boolean()

Si el enunciado pide mensaje explicito, copia literal o muy parecido.

---

## 8) Estilo visual: como clavar capturas sin perder tiempo

1. Reusa estilos existentes del proyecto.
2. Botones:
   - Primary: borrar
   - Green: crear/guardar
   - Blue: editar/gestion
3. Respeta espaciado y jerarquia visual:
   - Header
   - CTA principal
   - Lista
4. En listas, prioriza legibilidad sobre perfeccion pixel.

---

## 9) Flash messages: plantilla oficial

```js
showMessage({
  message: 'Operation completed',
  type: 'success',
  style: GlobalStyles.flashStyle,
  titleStyle: GlobalStyles.flashTextStyle
})
```

En error:

```js
showMessage({
  message: `Operation failed. ${error}`,
  type: 'error',
  style: GlobalStyles.flashStyle,
  titleStyle: GlobalStyles.flashTextStyle
})
```

No dejes acciones mudas sin feedback.

---

## 10) Casos de aceptacion: checklist brutal antes de entregar

## 10.1 Listados

1. Muestran datos reales de backend.
2. Si vacio, mensaje de empty list.
3. keyExtractor sin warning.
4. Botones visibles segun RF.

## 10.2 Crear/Editar

1. Campos requeridos bloquean submit.
2. Mensajes de validacion se ven.
3. Guardado correcto navega o refresca.
4. Errores backend visibles.

## 10.3 Borrar

1. Hay confirmacion previa.
2. Si confirma, se borra y desaparece.
3. Si falla, mensaje error.
4. Modal se cierra siempre.

## 10.4 Navegacion

1. Todos los botones abren pantalla correcta.
2. Vuelta a lista tras accion.
3. Datos actualizados al volver.

## 10.5 RF especificos

1. Horarios:
   - producto con horario y sin horario
2. Pedidos:
   - Advance oculto en delivered
   - analytics actualiza
3. Direcciones:
   - default cambia visualmente
4. Categorias:
   - no muestra categorias de otro restaurante

---

## 11) Trampas clasicas que tumban nota

1. Funciones API sin export.
2. Ruta mal escrita (singular/plural).
3. id undefined en route.params.
4. Olvidar enableReinitialize en edit forms.
5. Mismatch entre nombre campo frontend y backend.
6. No refrescar tras mutaciones.
7. Errores de zIndex con DropDownPicker y no se despliega.
8. Reutilizar componente pero con props incorrectas.

---

## 12) Plan de tiempo para examen (2.5h-3h)

## 12.1 Plan recomendado

1. 0-15 min:
   lectura README + marcar archivos.
2. 15-55 min:
   listado principal + carga datos.
3. 55-95 min:
   formulario principal (crear/editar).
4. 95-125 min:
   borrar con modal + acciones extra.
5. 125-150 min:
   validaciones + mensajes + pulido visual.
6. 150-fin:
   checklist final + preparacion de entrega.

## 12.2 Regla de supervivencia

Si te atascas 10-12 min en un punto, salta al siguiente RF y vuelve luego.
Puntos rapidos primero.

---

## 13) Plantilla de resolucion por pantalla (guion copy/paste mental)

Para cada pantalla del examen, sigue esta mini-lista:

1. Crear estados con useState.
2. Crear fetchData async.
3. Llamar en useEffect.
4. Pintar FlatList o Formik.
5. Botones con Pressable.
6. onPress conectado a endpoint o navigate.
7. showMessage en exito/error.
8. EmptyComponent o backendErrors.

---

## 14) Chuleta de snippets rapidos

## 14.1 Boton estilo marca

```js
<Pressable
  onPress={handlePress}
  style={({ pressed }) => [
    {
      backgroundColor: pressed ? GlobalStyles.brandGreenTap : GlobalStyles.brandGreen
    },
    styles.button
  ]}
>
  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
    <MaterialCommunityIcons name='plus-circle' color='white' size={20} />
    <TextRegular textStyle={styles.text}>Create</TextRegular>
  </View>
</Pressable>
```

## 14.2 Fila con Edit/Delete

```js
<View style={styles.actionButtonsContainer}>
  <Pressable onPress={onEdit} style={styles.editButton}><TextRegular>Edit</TextRegular></Pressable>
  <Pressable onPress={onDelete} style={styles.deleteButton}><TextRegular>Delete</TextRegular></Pressable>
</View>
```

## 14.3 Cargar detalle para editar

```js
useEffect(() => {
  const fetchDetail = async () => {
    const data = await getDetail(route.params.id)
    setInitialValues({
      name: data.name,
      price: data.price?.toString() ?? ''
    })
  }
  fetchDetail()
}, [route.params.id])
```

---

## 15) Mini-guia de debugging en caliente

Si algo no funciona:

1. Comprueba consola primero.
2. Verifica endpoint y payload.
3. Verifica route.params.
4. Verifica que el boton realmente llama a la funcion.
5. Verifica import/export de funcion API.
6. Log temporal del objeto antes de enviar.

Ejemplo:

```js
console.log('payload', values)
console.log('route params', route.params)
```

---

## 16) Entrega final sin arruinarlo al final

Antes de zip:

1. Borrar:
   - DeliverUS-Backend/node_modules
   - DeliverUS-Frontend-Owner/node_modules o DeliverUS-Frontend/node_modules
   - carpeta .expo del frontend
2. Crear zip de todo el proyecto del examen.
3. Verificar que el zip contiene tus cambios.
4. Subir y comprobar enlace final.

---

## 17) Receta ultra rapida por cada tipo de RF

## 17.1 RF visualizacion

1. Endpoint GET
2. useEffect + setState
3. FlatList
4. Empty state

## 17.2 RF creacion

1. Formik + Yup
2. POST
3. mensaje success
4. volver a listado

## 17.3 RF edicion

1. cargar detalle inicial
2. Formik enableReinitialize
3. PUT/PATCH
4. refrescar listado

## 17.4 RF borrado

1. Boton delete
2. DeleteModal
3. DELETE
4. fetch lista

## 17.5 RF accion especial

1. Boton custom
2. endpoint custom
3. refrescar lo afectado

---

## 18) Recomendaciones para alguien "sin ni idea" de frontend

1. No intentes hacer bonito primero, haz que funcione.
2. Haz una cosa cada vez:
   - primero traer datos
   - luego mostrar
   - luego boton
   - luego validacion
3. No confies en memoria, copia estructuras que ya ves en el proyecto.
4. Si dudas entre dos nombres de campo, imprime la respuesta del backend y comprueba.
5. Cada vez que completes un RF, pruebalo antes de seguir.
6. Guarda frecuentemente.

---

## 19) Plan de emergencia si te quedas bloqueado

1. Implementa solo el caso feliz de cada RF (sin pulido).
2. Deja comentarios claros de lo pendiente.
3. Prioriza funcionalidades con mas puntos.
4. Evita perder 30 min en CSS perfecto.
5. Asegura navegacion y endpoints primero.

---

## 20) Resumen final memorizable

1. Lee README y archivos objetivo.
2. Endpoint primero, pantalla despues.
3. Lista -> Form -> Delete -> Extras.
4. Validacion con Yup.
5. Feedback con showMessage.
6. Navegacion correcta en Stack.
7. Refresca datos tras cada cambio.
8. Checklist y entrega limpia.

Si cumples esto, pasas un examen tipo DeliverUS con mucha mas seguridad.

---

## 21) Bonus: lista de verificacion final en 2 minutos

Marca SI/NO antes de entregar:

- SI/NO: Todos los RF implementados.
- SI/NO: Todos los botones hacen algo.
- SI/NO: No hay TODOs en archivos evaluados.
- SI/NO: Formularios validan.
- SI/NO: Delete tiene confirmacion.
- SI/NO: Navegacion correcta.
- SI/NO: Mensajes de exito/error visibles.
- SI/NO: Datos refrescan tras acciones.
- SI/NO: Se parece a capturas.
- SI/NO: Zip limpio.

Fin de chuleta.
