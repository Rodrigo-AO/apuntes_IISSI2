# Chuleta organizada de examen Frontend DeliverUS

## Para que sirve

Este archivo esta pensado para entrar al examen con una guia corta pero completa:

1. Saber que carpeta tocar segun el enunciado.
2. Saber que archivo va primero y cual despues.
3. Tener plantillas de copia y pega para listas, formularios, borrado y dropdowns.
4. Evitar perder tiempo buscando nombres de pantallas o endpoints.

## Regla numero 1

Antes de escribir codigo, decide si el examen es de:

- `DeliverUS-Frontend-Owner`: examenes de propietario.
- `DeliverUS-Frontend`: examenes de cliente.

Si el enunciado habla de restaurantes, productos, horarios, categorias o pedidos del owner, casi siempre vas a `DeliverUS-Frontend-Owner/src/screens/` y `DeliverUS-Frontend-Owner/src/api/`.
Si habla de direcciones, carrito o pedidos del cliente, casi siempre vas a `DeliverUS-Frontend/src/screens/` y `DeliverUS-Frontend/src/api/`.

---

## 1. Mapa rapido de los examenes que has visto

### A. Modelo Schedules

Archivos clave:

- `DeliverUS-Frontend-Owner/src/screens/restaurants/RestaurantDetailScreen.js`
- `DeliverUS-Frontend-Owner/src/screens/restaurants/RestaurantSchedulesScreen.js`
- `DeliverUS-Frontend-Owner/src/screens/restaurants/CreateScheduleScreen.js`
- `DeliverUS-Frontend-Owner/src/screens/restaurants/EditScheduleScreen.js`
- `DeliverUS-Frontend-Owner/src/screens/restaurants/EditProductScreen.js`
- `DeliverUS-Frontend-Owner/src/api/RestaurantEndpoints.js`

Lo que suele pedir:

- Ver productos con horario.
- Ver listado de horarios del restaurante.
- Borrar horario con confirmacion.
- Crear o editar horario.
- Asignar o quitar horario a un producto.

### B. Modelo Product Category

Archivos clave:

- `DeliverUS-Frontend-Owner/src/screens/restaurants/ProductCategoriesScreen.js`
- `DeliverUS-Frontend-Owner/src/screens/restaurants/CreateProductCategoryScreen.js`
- `DeliverUS-Frontend-Owner/src/screens/restaurants/EditProductScreen.js`
- `DeliverUS-Frontend-Owner/src/screens/restaurants/CreateProductScreen.js`
- `DeliverUS-Frontend-Owner/src/api/CategoriesEndpoints.js` o `src/api/ProductEndpoints.js` segun el enunciado del examen.

Lo que suele pedir:

- Listado de categorias.
- Crear categoria.
- Borrar categoria con modal.
- Mostrar categorias del restaurante en un dropdown al crear o editar producto.

### C. Modelo Shipping Address

Archivos clave:

- `DeliverUS-Frontend/src/screens/profile/AddressScreen.js`
- `DeliverUS-Frontend/src/screens/profile/AddressDetailScreen.js`
- `DeliverUS-Frontend/src/screens/cart/ConfirmOrderScreen.js`
- `DeliverUS-Frontend/src/screens/cart/RestaurantOrderScreen.js`
- `DeliverUS-Frontend/src/screens/cart/LocalStorageController.js`
- `DeliverUS-Frontend/src/api/AddressEndpoints.js`
- `DeliverUS-Frontend/src/api/OrderEndpoints.js`

Lo que suele pedir:

- Listar direcciones.
- Crear direccion.
- Marcar direccion por defecto.
- Borrar direccion con confirmacion.
- Usar la direccion elegida en el pedido.

### D. Modelo Orders / Trial

Archivos clave:

- `DeliverUS-Frontend-Owner/src/screens/orders/OrdersScreen.js`
- `DeliverUS-Frontend-Owner/src/screens/orders/EditOrderScreen.js`
- `DeliverUS-Frontend-Owner/src/screens/controlPanel/ControlPanelScreen.js`
- `DeliverUS-Frontend-Owner/src/api/OrderEndpoints.js`

Lo que suele pedir:

- Listado de pedidos.
- Editar pedido.
- Avanzar estado.
- Mostrar contadores o resumen.

---

## 2. Estructura del proyecto: donde va cada cosa

### 2.1 Carpeta `src/api/`

Aqui van las funciones que llaman al backend.

Regla practica:

- Si necesitas `GET`, `POST`, `PUT`, `PATCH` o `DELETE`, primero mira si ya existe una funcion.
- Si no existe, creala en el archivo del dominio correcto.
- No mezcles endpoints de restaurantes, productos y pedidos en un mismo archivo si no hace falta.

Archivos tipicos:

- `RestaurantEndpoints.js`
- `ProductEndpoints.js`
- `OrderEndpoints.js`
- `AuthEndpoints.js`
- `AddressEndpoints.js`
- `CategoriesEndpoints.js`

### 2.2 Carpeta `src/screens/`

Aqui van las pantallas de verdad.

Patron muy comun:

- `XScreen.js` para una pantalla.
- `CreateXScreen.js` para crear.
- `EditXScreen.js` para editar.
- `XStack.js` para registrar rutas de ese bloque.

### 2.3 Carpeta `src/components/`

Aqui van piezas reutilizables.

Las mas importantes en examen:

- `DeleteModal.js`
- `InputItem.js`
- `ImageCard.js`
- `TextError.js`
- `TextRegular.js`
- `TextSemibold.js`
- `SystemInfo.js`

### 2.4 Carpeta `src/context/`

Normalmente no la tocas salvo que el examen te obligue a mover datos globales.

### 2.5 Carpeta `src/styles/`

Aqui suelen estar los colores, fuentes y estilos comunes.

Si una pantalla queda rara, revisa antes de inventar estilos nuevos si ya existe algo en `GlobalStyles.js`.

---

## 3. Orden exacto para atacar cualquier examen

### Paso 1. Leer el enunciado y marcar archivos

Haz una lista con tres cosas:

1. Pantallas que hay que tocar.
2. Endpoints que faltan.
3. Acciones que pide el enunciado: crear, editar, borrar, listar, seleccionar, marcar default, avanzar estado.

### Paso 2. Montar primero el backend helper

Antes de pelearte con la UI, confirma que existe una funcion API para cada accion.

### Paso 3. Hacer primero el listado

Si el listado funciona, ya puedes navegar, borrar, editar y refrescar.

### Paso 4. Hacer luego crear o editar

Usa Formik + Yup y precarga valores si es edicion.

### Paso 5. Cerrar con borrar y acciones especiales

Borrar suele requerir `DeleteModal`.
Las acciones especiales suelen ser:

- asignar horario
- quitar horario
- marcar direccion por defecto
- avanzar estado del pedido

### Paso 6. Recalcar feedback

Siempre mete:

- mensaje de exito
- mensaje de error
- refresco del listado o `navigation.goBack()`

---

## 4. Plantillas universales para copiar y completar

## 4.1 Plantilla de endpoint en `src/api/`

Usa este esquema cuando el helper todavia no existe o te faltan funciones.

```js
import { get, post, put, patch, destroy } from './helpers/ApiRequestsHelper'

const getAll = () => get('entities')

const getDetail = (id) => get(`entities/${id}`)

const create = (data) => post('entities', data)

const update = (id, data) => put(`entities/${id}`, data)

const remove = (id) => destroy(`entities/${id}`)

const customAction = (id, data) => patch(`entities/${id}/action`, data)

export { getAll, getDetail, create, update, remove, customAction }
```

### Lo que debes cambiar siempre

1. El nombre del archivo.
2. La ruta exacta.
3. Los nombres de parametros.
4. El metodo HTTP correcto.

### Regla practica

- `get` para listar o ver detalle.
- `post` para crear.
- `put` para editar completo.
- `patch` para cambios parciales o acciones concretas.
- `destroy` para borrar.

## 4.2 Plantilla de pantalla de listado

Sirve para restaurantes, horarios, categorias, direcciones o pedidos.

```js
import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { showMessage } from 'react-native-flash-message'

export default function ExampleScreen ({ route, navigation }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const data = await getAll(route?.params?.id)
      setItems(data)
    } catch (error) {
      showMessage({
        message: `Error loading data. ${error}`,
        type: 'danger'
      })
    }
  }

  const renderItem = ({ item }) => {
    return <ItemRow item={item} onPress={() => {}} />
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <TextRegular>No data available</TextRegular>}
      />
    </View>
  )
}
```

### Puntos a revisar en un listado

1. `useEffect` llama al fetch.
2. `keyExtractor` usa `id.toString()`.
3. Si no hay datos, muestra texto vacio.
4. Si hay error, enseña mensaje.

## 4.3 Plantilla de formulario con Formik + Yup

```js
import React from 'react'
import { View, Pressable } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { showMessage } from 'react-native-flash-message'

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required')
})

const initialValues = {
  name: ''
}

export default function ExampleFormScreen ({ navigation, route }) {
  const handleSave = async (values) => {
    try {
      await createOrUpdate(values)
      showMessage({
        message: 'Saved successfully',
        type: 'success'
      })
      navigation.goBack()
    } catch (error) {
      showMessage({
        message: `Error saving. ${error}`,
        type: 'danger'
      })
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSave}
    >
      {({ handleSubmit }) => (
        <View>
          <InputItem name='name' placeholder='Name' />
          <Pressable onPress={handleSubmit}>
            <TextRegular>Save</TextRegular>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}
```

### Lo que no debes olvidar

1. Si es edicion, precarga `initialValues`.
2. Si hay errores del backend, mostrarlos o convertirlos en mensaje.
3. Si el guardado va bien, volver atras o refrescar.

## 4.4 Plantilla de borrado con `DeleteModal`

```js
const [showDeleteModal, setShowDeleteModal] = useState(false)
const [selectedItem, setSelectedItem] = useState(null)

const askDelete = (item) => {
  setSelectedItem(item)
  setShowDeleteModal(true)
}

const confirmDelete = async () => {
  try {
    await remove(selectedItem.id)
    setShowDeleteModal(false)
    await fetchItems()
  } catch (error) {
    showMessage({ message: `Error deleting. ${error}`, type: 'danger' })
  }
}

<DeleteModal
  visible={showDeleteModal}
  title='Please confirm deletion'
  description='Are you sure you want to delete this item?'
  onCancel={() => setShowDeleteModal(false)}
  onConfirm={confirmDelete}
/>
```

### Regla practica

- El modal no borra por si mismo.
- El modal solo pide confirmacion.
- El borrado real va en la funcion `confirmDelete`.

## 4.5 Plantilla de dropdown con `react-native-dropdown-picker`

Muy util para productos, categorias y horarios.

```js
const [open, setOpen] = useState(false)
const [value, setValue] = useState(null)
const [items, setItems] = useState([])

<DropDownPicker
  open={open}
  value={value}
  items={items}
  setOpen={setOpen}
  setValue={setValue}
  setItems={setItems}
  placeholder='Select one option'
/>
```

### Como convertir datos del backend en items

```js
const mapped = data.map((item) => ({
  label: item.name,
  value: item.id
}))
```

### Caso especial: opcion vacia

Si quieres permitir quitar un horario o dejar un producto sin categoria:

```js
[{ label: 'Not scheduled', value: null }, ...mapped]
```

## 4.6 Plantilla de pantalla con detalle + boton de navegacion

```js
<Pressable onPress={() => navigation.navigate('TargetScreen', { id })}>
  <TextRegular>Go</TextRegular>
</Pressable>
```

### Regla practica

- Si el siguiente flujo depende de `restaurantId`, pasalo en `route.params`.
- No vuelvas a pedir al backend algo que ya tienes en el detalle si te basta con navegar.

## 4.7 Plantilla maestra de listado completa (con render y return ya hechos)

Usa esta plantilla cuando el enunciado pida ver una lista y acciones de editar o borrar.
Solo cambia los nombres marcados en mayusculas.

```js
import React, { useEffect, useState } from 'react'
import { View, FlatList, Pressable } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import DeleteModal from '../../components/DeleteModal'
import TextRegular from '../../components/TextRegular'
import TextSemibold from '../../components/TextSemibold'
import { getAllENTITIES, removeENTITY } from '../../api/ENTITYEndpoints'

export default function ENTITYListScreen ({ route, navigation }) {
  const [items, setItems] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const parentId = route?.params?.restaurantId

  useEffect(() => {
    fetchItems()
  }, [parentId])

  const fetchItems = async () => {
    try {
      const data = await getAllENTITIES(parentId)
      setItems(Array.isArray(data) ? data : [])
    } catch (error) {
      showMessage({
        message: `Error loading data. ${error}`,
        type: 'danger'
      })
    }
  }

  const goToCreate = () => {
    navigation.navigate('CreateENTITY', { restaurantId: parentId })
  }

  const goToEdit = (item) => {
    navigation.navigate('EditENTITY', { restaurantId: parentId, entity: item })
  }

  const askDelete = (item) => {
    setSelectedItem(item)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      await removeENTITY(parentId, selectedItem.id)
      setShowDeleteModal(false)
      setSelectedItem(null)
      await fetchItems()
      showMessage({ message: 'Deleted successfully', type: 'success' })
    } catch (error) {
      showMessage({ message: `Error deleting. ${error}`, type: 'danger' })
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
        <TextSemibold>{item.name}</TextSemibold>
        <TextRegular>{item.description ?? 'No description'}</TextRegular>
        <TextRegular>
          {item.schedule ? `${item.schedule.startTime} - ${item.schedule.endTime}` : 'Not scheduled'}
        </TextRegular>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
          <Pressable onPress={() => goToEdit(item)}>
            <TextRegular>Edit</TextRegular>
          </Pressable>
          <Pressable onPress={() => askDelete(item)}>
            <TextRegular>Delete</TextRegular>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Pressable onPress={goToCreate} style={{ marginBottom: 12 }}>
        <TextRegular>Create</TextRegular>
      </Pressable>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <TextRegular>No data available</TextRegular>}
      />

      <DeleteModal
        visible={showDeleteModal}
        title='Please confirm deletion'
        description='Are you sure you want to delete this item?'
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </View>
  )
}
```

## 4.8 Plantilla maestra de formulario completa (crear y editar)

Usa esta plantilla cuando tengas dudas con el `return` de Formik.
Sirve para `CreateXScreen` y `EditXScreen`.

```js
import React from 'react'
import { View, Pressable } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { showMessage } from 'react-native-flash-message'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import { createENTITY, updateENTITY } from '../../api/ENTITYEndpoints'

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required')
})

export default function SaveENTITYScreen ({ route, navigation }) {
  const isEdit = Boolean(route?.params?.entity)
  const entity = route?.params?.entity
  const parentId = route?.params?.restaurantId

  const initialValues = {
    name: isEdit ? entity.name : '',
    description: isEdit ? (entity.description ?? '') : ''
  }

  const handleSave = async (values) => {
    try {
      if (isEdit) {
        await updateENTITY(parentId, entity.id, values)
      } else {
        await createENTITY(parentId, values)
      }
      showMessage({
        message: isEdit ? 'Updated successfully' : 'Created successfully',
        type: 'success'
      })
      navigation.goBack()
    } catch (error) {
      showMessage({ message: `Error saving. ${error}`, type: 'danger' })
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
        <View style={{ padding: 12 }}>
          <InputItem name='name' placeholder='Name' />
          <InputItem name='description' placeholder='Description' />

          <Pressable onPress={handleSubmit} style={{ marginTop: 12 }}>
            <TextRegular>{isEdit ? 'Update' : 'Create'}</TextRegular>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}
```

## 4.9 Donde va cada bloque dentro del archivo (chuleta anti bloqueo)

Sigue este orden SIEMPRE y no te pierdes:

1. `imports`: arriba del todo.
2. `useState` y `const ... = route?.params...`: dentro del componente, justo al empezar.
3. `useEffect`: despues de los estados.
4. Funciones (`fetchItems`, `handleSave`, `confirmDelete`): despues de `useEffect` y antes de `renderItem`.
5. `renderItem`: justo antes del `return` principal.
6. `return` principal: al final del componente.
7. `DeleteModal`: dentro del `return` principal, normalmente debajo de `FlatList`.

Si dudas, recuerda esta frase:

`datos -> funciones -> renderItem -> return`.

## 4.10 Como elegir plantilla segun el tipo de pantalla

Si el enunciado dice "listar", "mostrar", "ver todos":

- usa la plantilla 4.7.

Si el enunciado dice "crear" o "editar":

- usa la plantilla 4.8.

Si dice "borrar":

- añade bloque de `DeleteModal` (plantilla 4.4) dentro de 4.7.

Si dice "seleccionar categoria/horario/direccion":

- añade dropdown (plantilla 4.5) dentro del `return` de 4.8.

Si dice "navegar a otra pantalla":

- usa `navigation.navigate(...)` con params (plantilla 4.6).

## 4.11 Mini plantillas de `renderItem` segun caso real

### Caso A: lista simple (solo nombre)

```js
const renderItem = ({ item }) => (
  <View>
    <TextRegular>{item.name}</TextRegular>
  </View>
)
```

### Caso B: lista con acciones (editar y borrar)

```js
const renderItem = ({ item }) => (
  <View>
    <TextSemibold>{item.name}</TextSemibold>
    <Pressable onPress={() => goToEdit(item)}>
      <TextRegular>Edit</TextRegular>
    </Pressable>
    <Pressable onPress={() => askDelete(item)}>
      <TextRegular>Delete</TextRegular>
    </Pressable>
  </View>
)
```

### Caso C: lista con estado opcional

```js
const renderItem = ({ item }) => (
  <View>
    <TextSemibold>{item.name}</TextSemibold>
    <TextRegular>{item.schedule ? `${item.schedule.startTime} - ${item.schedule.endTime}` : 'Not scheduled'}</TextRegular>
  </View>
)
```

## 4.12 Mini plantillas de `return` segun caso real

### Return de listado minimo

```js
return (
  <View style={{ flex: 1 }}>
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={() => <TextRegular>No data available</TextRegular>}
    />
  </View>
)
```

### Return de listado con boton crear y modal borrar

```js
return (
  <View style={{ flex: 1 }}>
    <Pressable onPress={goToCreate}>
      <TextRegular>Create</TextRegular>
    </Pressable>

    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />

    <DeleteModal
      visible={showDeleteModal}
      title='Please confirm deletion'
      description='Are you sure you want to delete this item?'
      onCancel={() => setShowDeleteModal(false)}
      onConfirm={confirmDelete}
    />
  </View>
)
```

### Return de formulario con Formik

```js
return (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSave}
    enableReinitialize
  >
    {({ handleSubmit }) => (
      <View>
        <InputItem name='name' placeholder='Name' />
        <Pressable onPress={handleSubmit}>
          <TextRegular>Save</TextRegular>
        </Pressable>
      </View>
    )}
  </Formik>
)
```

## 4.13 Mapa exacto: que plantilla va en que archivo

Esta seccion es para no dudar durante el examen.

Piensa asi:

- `src/api/*.js` = funciones de backend (plantilla 4.1).
- `src/screens/*/*Screen.js` = UI de listado o formulario (plantillas 4.7, 4.8, 4.11, 4.12).
- `src/screens/*/*Stack.js` = registrar navegacion de pantallas nuevas.

### Caso 1: entidad nueva completa (crear flujo desde cero)

Si el examen pide una entidad nueva (ejemplo: `Schedules`, `ProductCategories`, `Addresses`), normalmente tocas:

1. `DeliverUS-Frontend-Owner/src/api/NuevaEntidadEndpoints.js` o `DeliverUS-Frontend/src/api/NuevaEntidadEndpoints.js`
2. `DeliverUS-Frontend-Owner/src/screens/.../NuevaEntidadScreen.js` o `DeliverUS-Frontend/src/screens/.../NuevaEntidadScreen.js` (listado)
3. `DeliverUS-Frontend-Owner/src/screens/.../CreateNuevaEntidadScreen.js` o `DeliverUS-Frontend/src/screens/.../CreateNuevaEntidadScreen.js`
4. `DeliverUS-Frontend-Owner/src/screens/.../EditNuevaEntidadScreen.js` o `DeliverUS-Frontend/src/screens/.../EditNuevaEntidadScreen.js` (si el enunciado pide editar)
5. `DeliverUS-Frontend-Owner/src/screens/.../...Stack.js` o `DeliverUS-Frontend/src/screens/.../...Stack.js`

Que plantilla pegar en cada archivo:

1. Archivo API (`...Endpoints.js`) -> plantilla 4.1.
2. Pantalla de listado (`NuevaEntidadScreen.js`) -> plantilla 4.7 + mini de 4.11/4.12 si quieres simplificar.
3. Pantalla crear (`CreateNuevaEntidadScreen.js`) -> plantilla 4.8.
4. Pantalla editar (`EditNuevaEntidadScreen.js`) -> plantilla 4.8 con `isEdit=true` via `route.params.entity`.
5. Stack (`...Stack.js`) -> registrar rutas `NuevaEntidad`, `CreateNuevaEntidad`, `EditNuevaEntidad`.

### Caso 2: modificar entidad que ya existe

Si la entidad ya existe (ejemplo: `Product`, `Order`, `Address`), normalmente tocas:

1. `.../src/api/EntidadExistenteEndpoints.js`
2. `.../src/screens/.../EntidadExistenteScreen.js` (o detalle que lista subdatos)
3. `.../src/screens/.../CreateEntidadExistenteScreen.js` o `EditEntidadExistenteScreen.js` (segun pida)
4. `.../src/screens/.../...Stack.js` (solo si agregas pantalla nueva)

Que plantilla usar segun accion:

1. Si falta endpoint -> 4.1 en `api`.
2. Si piden mostrar datos nuevos en lista -> 4.7 o 4.11 (solo `renderItem`) en pantalla de listado actual.
3. Si piden campo nuevo en formulario -> 4.8 en pantalla `Create` o `Edit` existente.
4. Si piden borrar -> 4.4 dentro de la pantalla de listado donde esta el boton Delete.
5. Si piden selector categoria/horario/direccion -> 4.5 dentro del `return` del formulario (normalmente `Create...` y `Edit...`).

### Caso 3: examen Owner (restaurantes, productos, horarios, categorias, pedidos owner)

Carpeta base casi siempre:

- `DeliverUS-Frontend-Owner/src/api/`
- `DeliverUS-Frontend-Owner/src/screens/restaurants/`
- `DeliverUS-Frontend-Owner/src/screens/orders/`
- `DeliverUS-Frontend-Owner/src/screens/controlPanel/`

Relacion plantilla -> archivo:

1. 4.1 -> `DeliverUS-Frontend-Owner/src/api/*.js`
2. 4.7/4.11/4.12 listado -> `DeliverUS-Frontend-Owner/src/screens/restaurants/*Screen.js` o `DeliverUS-Frontend-Owner/src/screens/orders/*Screen.js`
3. 4.8 formulario -> `DeliverUS-Frontend-Owner/src/screens/restaurants/Create*Screen.js`, `DeliverUS-Frontend-Owner/src/screens/restaurants/Edit*Screen.js`, `DeliverUS-Frontend-Owner/src/screens/orders/EditOrderScreen.js`
4. 4.4 borrar -> misma pantalla de listado donde pintas filas
5. 4.6 navegar -> detalles/listados que abren otra pantalla

### Caso 4: examen Cliente (direcciones, carrito, pedido)

Carpeta base casi siempre:

- `DeliverUS-Frontend/src/api/`
- `DeliverUS-Frontend/src/screens/profile/`
- `DeliverUS-Frontend/src/screens/cart/`

Relacion plantilla -> archivo:

1. 4.1 -> `DeliverUS-Frontend/src/api/AddressEndpoints.js` o `OrderEndpoints.js`
2. 4.7 listado -> `DeliverUS-Frontend/src/screens/profile/AddressScreen.js`
3. 4.8 formulario -> `DeliverUS-Frontend/src/screens/profile/AddressDetailScreen.js` (o pantalla create/edit equivalente)
4. 4.4 borrar -> `DeliverUS-Frontend/src/screens/profile/AddressScreen.js`
5. 4.5 dropdown/select -> `DeliverUS-Frontend/src/screens/cart/ConfirmOrderScreen.js` si debes seleccionar direccion

### Regla de oro de archivos para no fallar

1. Si cambias datos remotos: toca `src/api`.
2. Si cambias lo que se ve en pantalla: toca `src/screens/...Screen.js`.
3. Si creas pantalla nueva: toca tambien `...Stack.js`.
4. Si hay boton borrar: esa misma pantalla debe tener `DeleteModal`.
5. Si hay formulario create/edit: esa misma pantalla debe tener Formik + Yup.

### Plantilla de decision de 30 segundos (archivo + plantilla)

Pregunta 1: el enunciado dice listar o ver?

- Archivo: `.../src/screens/.../XScreen.js`
- Plantilla: 4.7 (o 4.11 + 4.12 minimo)

Pregunta 2: el enunciado dice crear o editar?

- Archivo: `.../src/screens/.../CreateXScreen.js` o `EditXScreen.js`
- Plantilla: 4.8

Pregunta 3: dice borrar?

- Archivo: el mismo listado `XScreen.js`
- Plantilla: 4.4

Pregunta 4: dice que falta endpoint?

- Archivo: `.../src/api/XEndpoints.js`
- Plantilla: 4.1

Pregunta 5: dice que no navega a la pantalla nueva?

- Archivo: `.../src/screens/.../...Stack.js`
- Accion: registrar `Stack.Screen`

---

## 5. Guia por examen

## 5.1 Schedules: lo que hay que tocar y en que orden

### Archivos que normalmente tocas

1. `DeliverUS-Frontend-Owner/src/api/RestaurantEndpoints.js`
2. `DeliverUS-Frontend-Owner/src/screens/restaurants/RestaurantDetailScreen.js`
3. `DeliverUS-Frontend-Owner/src/screens/restaurants/RestaurantSchedulesScreen.js`
4. `DeliverUS-Frontend-Owner/src/screens/restaurants/CreateScheduleScreen.js`
5. `DeliverUS-Frontend-Owner/src/screens/restaurants/EditScheduleScreen.js`
6. `DeliverUS-Frontend-Owner/src/screens/restaurants/EditProductScreen.js`
7. `DeliverUS-Frontend-Owner/src/screens/restaurants/RestaurantsStack.js`

### Endpoints reales del proyecto

- `getRestaurantSchedules(id)`
- `createSchedule(restaurantId, data)`
- `updateSchedule(restaurantId, scheduleId, data)`
- `removeSchedule(restaurantId, scheduleId)`

### RF.01: productos con horario en `RestaurantDetailScreen.js`

Lo que tiene que verse:

- nombre del producto
- descripcion
- precio si existe
- horario asignado como `HH:mm:ss - HH:mm:ss`
- texto `Not scheduled` si no hay horario

### Truco de implementacion

Si el producto trae `schedule`, pinta:

```js
item.schedule ? `${item.schedule.startTime} - ${item.schedule.endTime}` : 'Not scheduled'
```

### Boton para ir a horarios

En el detalle del restaurante mete un boton tipo:

```js
navigation.navigate('RestaurantSchedules', { restaurantId: item.id })
```

### RF.02: listado de horarios en `RestaurantSchedulesScreen.js`

Cada item debe mostrar:

- hora de inicio
- hora de fin
- numero de productos asociados
- boton editar
- boton borrar

### Como calcular el numero de productos

Si el backend ya manda `products`, usa:

```js
item.products.length
```

### RF.03: borrar horario

Patron:

1. Boton borrar abre `DeleteModal`.
2. Confirmacion llama a `removeSchedule(restaurantId, scheduleId)`.
3. Tras borrar, refresca o vuelve al detalle.

### RF.04: crear horario

Campos tipicos:

- `startTime`
- `stopTime` o el nombre que pida el backend helper

### Regla importante

En el enunciado y en el backend del examen aparece `stopTime` para actualizar horarios. Si la UI enseña `End Time`, el payload puede seguir usando `stopTime`.

### Validacion recomendada

Usa una expresion para hora completa:

```js
/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
```

Si quieres ser mas permisivo con la correccion visual, al menos exige el formato `HH:mm:ss`.

### RF.05: editar horario

Ten en cuenta:

- precargar valores desde `route.params.schedule`
- mantener el mismo validador que en crear
- al guardar, llamar a `updateSchedule(restaurantId, scheduleId, data)`

### RF.06: asignar o quitar horario a un producto

En `EditProductScreen.js` mete un dropdown de horarios del restaurante.

Patron de valor:

- horario asignado -> `scheduleId: 2`
- sin horario -> `scheduleId: null`

### Como pintarlo en la vista

Si no hay horario:

- mostrar `Not scheduled`

Si hay horario:

- mostrar `startTime - endTime`

### Flujo de guardado

1. Cargar producto.
2. Cargar horarios del restaurante.
3. Convertir horarios a items del dropdown.
4. Guardar con `update(productId, data)`.

### Payload mental que debes recordar

```js
{
  name,
  description,
  price,
  order,
  productCategoryId,
  availability,
  scheduleId: null
}
```

---

## 5.2 Product Category: lo que hay que tocar y en que orden

### Archivos que normalmente tocas

1. `DeliverUS-Frontend-Owner/src/screens/restaurants/ProductCategoriesScreen.js`
2. `DeliverUS-Frontend-Owner/src/screens/restaurants/CreateProductCategoryScreen.js`
3. `DeliverUS-Frontend-Owner/src/screens/restaurants/CreateProductScreen.js`
4. `DeliverUS-Frontend-Owner/src/screens/restaurants/EditProductScreen.js`
5. `DeliverUS-Frontend-Owner/src/api/CategoriesEndpoints.js` o `ProductEndpoints.js`
6. `DeliverUS-Frontend-Owner/src/screens/restaurants/RestaurantsStack.js`

### RF.01: ver categorias del restaurante

La pantalla debe funcionar como listado simple:

- nombre de categoria
- boton crear categoria
- boton borrar por cada fila

### RF.02: crear categoria

Formulario minimo:

- `name`

Validacion:

- obligatorio

### RF.03: borrar categoria

Patron:

1. Mostrar modal de confirmacion.
2. Llamar a `destroy` o funcion de borrado.
3. Si falla, mostrar error.
4. Si va bien, refrescar listado.

### RF.04: asignar categoria al producto

En crear y editar producto, el dropdown de categorias debe venir del restaurante correcto.

### Truco

No pongas todas las categorias globales si el examen pide solo las del restaurante.

### Mapa visual

- `ProductCategoriesScreen.js` lista categorias.
- `CreateProductCategoryScreen.js` crea categoria.
- `CreateProductScreen.js` y `EditProductScreen.js` usan el dropdown.

### Payload tipico para producto

```js
{
  productCategoryId: 1
}
```

### Si el enunciado usa otro nombre

Si ves `CategoriesEndpoints.js` en el examen, sigue el nombre del archivo que te den y no forces `ProductEndpoints.js`.

---

## 5.3 Shipping Address: lo que hay que tocar y en que orden

### Archivos que normalmente tocas

1. `DeliverUS-Frontend/src/api/AddressEndpoints.js`
2. `DeliverUS-Frontend/src/screens/profile/AddressScreen.js`
3. `DeliverUS-Frontend/src/screens/profile/AddressDetailScreen.js`
4. `DeliverUS-Frontend/src/screens/cart/ConfirmOrderScreen.js`
5. `DeliverUS-Frontend/src/screens/cart/RestaurantOrderScreen.js`
6. `DeliverUS-Frontend/src/screens/cart/LocalStorageController.js`

### RF.01: listar direcciones

Cada item debe mostrar:

- alias
- calle
- ciudad
- codigo postal
- provincia
- estrella o indicador si es default

### RF.02: crear direccion

Campos habituales:

- `alias`
- `street`
- `city`
- `zipCode`
- `province`

### Regla importante

Si es la primera direccion, suele quedar como predeterminada automaticamente.

### RF.03: marcar predeterminada

Cuando pulses en la estrella:

- llama al endpoint correspondiente
- actualiza la lista
- pinta el nuevo default al instante

### RF.04: borrar direccion

Siempre con confirmacion.

### Truco de examen

Si el enunciado dice `isDefault: true`, usa esa propiedad para dibujar la estrella llena.

### Pantallas de flujo de compra

Si el cliente elige direccion en el checkout, recuerda guardar la seleccion en el estado global o en local storage si el proyecto ya lo hace asi.

---

## 5.4 Orders y control panel

### Archivos que normalmente tocas

1. `DeliverUS-Frontend-Owner/src/screens/orders/OrdersScreen.js`
2. `DeliverUS-Frontend-Owner/src/screens/orders/EditOrderScreen.js`
3. `DeliverUS-Frontend-Owner/src/screens/controlPanel/ControlPanelScreen.js`
4. `DeliverUS-Frontend-Owner/src/api/OrderEndpoints.js`

### Lo que suele salir

- listado de pedidos por restaurante
- resumen de pedidos pendientes, entregados o de hoy
- boton editar pedido
- boton avanzar estado del pedido

### Patrón de estados

Suele haber algo como:

- pending
- in process
- sent
- delivered

### En el listado

Muestra:

- estado
- direccion
- importe
- fecha
- accion principal

### En la edicion

Suele haber pocos campos:

- direccion
- precio
- estado o avance

---

## 6. Plantillas visuales de pantalla para examen

## 6.1 Tarjeta de lista con acciones

```js
<View style={styles.card}>
  <TextSemibold>{item.name}</TextSemibold>
  <TextRegular>{item.description}</TextRegular>
  <View style={styles.actionsRow}>
    <Pressable onPress={() => editItem(item)}>
      <TextRegular>Edit</TextRegular>
    </Pressable>
    <Pressable onPress={() => askDelete(item)}>
      <TextRegular>Delete</TextRegular>
    </Pressable>
  </View>
</View>
```

## 6.2 Fila con dato principal y secundario

```js
<View>
  <TextSemibold>Start Time: </TextSemibold>
  <TextRegular>{item.startTime}</TextRegular>
</View>
<View>
  <TextSemibold>End Time: </TextSemibold>
  <TextRegular>{item.endTime}</TextRegular>
</View>
```

## 6.3 Texto de estado vacio

```js
<TextRegular>Not scheduled</TextRegular>
```

## 6.4 Boton principal de creacion

```js
<Pressable onPress={() => navigation.navigate('CreateSomething', { restaurantId })}>
  <TextRegular>Create</TextRegular>
</Pressable>
```

---

## 7. Navegacion: lo que hay que mirar siempre

### Si hay una pantalla nueva

Revisa el `Stack.js` del bloque correspondiente.

Ejemplos:

- `src/screens/restaurants/RestaurantsStack.js`
- `src/screens/orders/OrdersStack.js`
- `src/screens/profile/ProfileStack.js`

### Regla practica

Si no registras la pantalla en el stack, puedes tener el archivo perfecto y aun asi no poder navegar.

### Pasar parametros

Lo mas comun:

- `restaurantId`
- `productId`
- `scheduleId`
- `categoryId`
- `orderId`

### Guardar y volver

Si la pantalla es un formulario:

- `navigation.goBack()` tras guardar.

Si el listado depende del dato nuevo:

- refresca el listado antes de volver o al volver.

---

## 8. Errores tipicos que te cuestan tiempo

1. Confundir el nombre del archivo: crear en otra carpeta y luego no navega.
2. Usar `endTime` en el payload cuando el backend espera `stopTime`.
3. Pintar `Not Scheduled` con una mayuscula distinta a la del enunciado cuando el test es sensible al texto.
4. No refrescar el listado despues de borrar.
5. Poner el dropdown de categorias o horarios con datos globales en vez de los del restaurante.
6. No precargar los valores en edicion.
7. Olvidar el modal de confirmacion en borrados.
8. No mostrar error de validacion si el formulario falla.

---

## 9. Checklist de examen antes de entregar

### Funcional

- [ ] Se ve el listado principal.
- [ ] Se puede crear.
- [ ] Se puede editar.
- [ ] Se puede borrar con confirmacion.
- [ ] Las acciones especiales funcionan.
- [ ] Los datos se refrescan tras el cambio.

### Visual

- [ ] La pantalla se parece a la captura.
- [ ] Los textos clave coinciden.
- [ ] No hay botones perdidos fuera de sitio.
- [ ] El estado vacio se entiende.

### Tecnico

- [ ] Las pantallas estan registradas en el stack.
- [ ] Los endpoints existen en `src/api/`.
- [ ] Formik + Yup valida bien.
- [ ] `DeleteModal` se usa en los borrados.
- [ ] El dropdown usa datos reales del backend.

---

## 10. Plantilla de respuesta mental para el examen

Cuando leas un enunciado, piensa en este orden:

1. Que pantalla exacta me piden.
2. Que endpoint exacto necesito.
3. Si la accion es listado, formulario, borrado o dropdown.
4. Si tengo que tocar `Stack.js`.
5. Si necesito `DeleteModal`, `Formik`, `Yup` o `DropDownPicker`.

Si sigues ese orden, casi siempre reduces el problema a un trozo conocido.

---

## 11. Resumen ultra corto para memoria rapida

- Owner: `DeliverUS-Frontend-Owner`.
- Cliente: `DeliverUS-Frontend`.
- Listado primero, luego formulario, luego borrar.
- Borrar siempre con `DeleteModal`.
- Formulario siempre con `Formik + Yup`.
- Dropdown para categorias u horarios.
- Refrescar despues de guardar o borrar.
- Revisa siempre el `Stack.js`.
