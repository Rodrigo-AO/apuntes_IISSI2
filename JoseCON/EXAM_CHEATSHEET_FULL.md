# EXAM CHEATSHEET — Versión completa y práctica

Objetivo: tener un único fichero con plantillas cortas y adaptables para copiar/pegar en examen. Reemplaza MAYÚSCULAS: `RESOURCE`, `ENDPOINT`, `id`, `FIELD`, `SCREEN`, `PARENT_ID`.

---

## 1) Flujo rápido de examen (3 pasos)
1. Pegar la plantilla que necesitas (List / Form / API / Handler).  
2. Reemplazar MAYÚSCULAS por nombres del enunciado.  
3. Añadir imports necesarios y probar en expo — corregir 1 error de import a la vez.

Consejo: prioriza que funcione, no el estilo. Usa `showMessage` para feedback y deshabilita botones durante llamadas.

---

## 2) Imports comunes (pégalo arriba del componente)
```js
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { View, Text, FlatList, Pressable, TextInput, Image, ActivityIndicator, Switch } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { showMessage } from 'react-native-flash-message'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { API_BASE_URL } from '@env'
```

---

## 3) API helper (pegar si no existe)
```js
import { API_BASE_URL } from '@env'
async function request(method, path, body) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  })
  if (!res.ok) throw await res.text()
  return res.status === 204 ? null : res.json()
}
export const get = (p) => request('GET', p)
export const post = (p, b) => request('POST', p, b)
export const put = (p, b) => request('PUT', p, b)
export const patch = (p, b) => request('PATCH', p, b)
export const destroy = (p) => request('DELETE', p)
```

---

## 4) Endpoints plantilla (rápido)
```js
import { get, post, put, patch, destroy } from './helpers/ApiRequestsHelper'
export const list = (parentId) => get(`RESOURCE/${parentId}/ENDPOINT`)
export const getById = (id) => get(`RESOURCE/${id}`)
export const create = (data) => post(`RESOURCE`, data)
export const update = (id, data) => put(`RESOURCE/${id}`, data)
export const remove = (id) => destroy(`RESOURCE/${id}`)
// nextStatus si aplica (estado -> siguiente)
export const nextStatus = (item) => {
  switch(item.status){
    case 'pending': return patch(`RESOURCE/${item.id}/confirm`)
    case 'in process': return patch(`RESOURCE/${item.id}/send`)
    case 'sent': return patch(`RESOURCE/${item.id}/deliver`)
    default: throw new Error('No transition')
  }
}
```

Nota: sustituye rutas y añade auth header en `ApiRequestsHelper` si el examen lo pide.

---

## 5) Plantilla Lista (copiar/pegar y adaptar)
- Uso: para pantallas que muestran colecciones.
```js
export default function SCREEN({ navigation, route }){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [advancing, setAdvancing] = useState(null)

  useEffect(()=>{ fetchItems() }, [route])

  const fetchItems = async ()=>{
    try{ setLoading(true); const data = await list(route.params?.id ?? PARENT_ID); setItems(data) }
    catch(e){ showMessage({message:String(e), type:'danger'}) }
    finally{ setLoading(false) }
  }

  const handleNextStatus = async (item) => {
    try{
      setAdvancing(item.id)
      await nextStatus(item)
      showMessage({message:'Advanced', type:'success'})
      await fetchItems()
    } catch(e){ showMessage({message:String(e), type:'danger'}) }
    finally{ setAdvancing(null) }
  }

  const renderItem = useCallback(({item}) => (
    <View style={{padding:8}}>
      <Text>{item.id} • {item.status}</Text>
      <Text numberOfLines={1}>{item.address ?? item.name ?? ''}</Text>
      <View style={{flexDirection:'row'}}>
        <Pressable onPress={()=>navigation.navigate('EditScreen',{id:item.id})}><Text>Edit</Text></Pressable>
        {item.status !== 'delivered' && (
          <Pressable onPress={()=>handleNextStatus(item)} disabled={advancing===item.id} style={advancing===item.id?{opacity:0.6}:{}}>
            <Text>Advance</Text>
          </Pressable>
        )}
      </View>
    </View>
  ), [advancing])

  return (
    <FlatList data={items} renderItem={renderItem} keyExtractor={i=>i.id.toString()} ListEmptyComponent={<Text>No items</Text>} />
  )
}
```

Variantes: usar `ScrollView`+`map` para listas muy cortas.

---

## 6) Plantilla Item / Card (rápido)
```js
function Card({item, onEdit, onDelete, onAdvance}){
  return (
    <View style={{padding:10, margin:8, borderRadius:8, backgroundColor:'#fff'}}>
      {item.image && <Image source={{uri: API_BASE_URL + '/' + item.image}} style={{height:120}} />}
      <Text style={{fontWeight:'600'}}>{item.title ?? `#${item.id}`}</Text>
      <Text>{item.subtitle ?? item.status}</Text>
      <View style={{flexDirection:'row'}}>
        <Pressable onPress={()=>onEdit(item)}><Text>Edit</Text></Pressable>
        <Pressable onPress={()=>onDelete(item)}><Text>Delete</Text></Pressable>
        {onAdvance && <Pressable onPress={()=>onAdvance(item)}><Text>Advance</Text></Pressable>}
      </View>
    </View>
  )
}
```

---

## 7) Formulario (Formik + Yup) plantilla corta
```js
const schema = Yup.object().shape({ name: Yup.string().required('Required') })
export default function EditScreen({ navigation, route }){
  const [initialValues, setInitialValues] = useState({name:''})
  useEffect(()=>{ if(route.params?.id) load() }, [])
  const load = async ()=>{ const data = await getById(route.params.id); setInitialValues({name: data.name}) }
  const handleSubmit = async (values, {setSubmitting})=>{
    try{ await update(route.params.id, values); showMessage({message:'Saved', type:'success'}); navigation.goBack() }
    catch(e){ showMessage({message:String(e), type:'danger'}) }
    finally{ setSubmitting(false) }
  }
  return (
    <Formik initialValues={initialValues} enableReinitialize validationSchema={schema} onSubmit={handleSubmit}>
      {({handleChange, handleSubmit, values, errors, isSubmitting})=> (
        <View>
          <TextInput value={values.name} onChangeText={handleChange('name')} placeholder='Name' />
          {!!errors.name && <Text>{errors.name}</Text>}
          <Button title='Save' onPress={handleSubmit} disabled={isSubmitting} />
        </View>
      )}
    </Formik>
  )
}
```

Consejo: `enableReinitialize` necesario si cargas datos remotos.

---

## 8) Botones y variaciones (pegables)
- Básico: `<Pressable onPress={f}><Text>LABEL</Text></Pressable>`
- Con icono: `<MaterialCommunityIcons name='pencil' size={18}/>` dentro del `Pressable`.
- Disabled visual: `style={disabled?{opacity:0.6}:{}}` + `disabled` prop.
- Loading: mostrar `<ActivityIndicator/>` en vez de texto.

---

## 9) Subida de imágenes / archivos (esquema)
```js
const upload = async (uri, fieldName='file') => {
  const fd = new FormData()
  fd.append(fieldName, { uri, name: 'file.jpg', type: 'image/jpeg' })
  const res = await fetch(`${API_BASE_URL}/ENDPOINT`, { method:'POST', headers:{'Content-Type':'multipart/form-data'}, body: fd })
  return res.json()
}
```

Nota: algunas APIs requieren token; añade `Authorization` en headers.

---

## 10) Errores y mensajes (estandarizar)
```js
try{ ... } catch(e){ const m = e?.message ?? String(e); showMessage({ message: 'Error', description: m, type: 'danger' }) }
```

---

## 11) Patrones avanzados (rápido)
- Pagination (infinite scroll): `onEndReached` + `page` state.  
- Optimistic update: actualizar UI antes del await y revertir en catch.  
- Debounce search: `setTimeout` en `useEffect`.  
- Memo: `useCallback` + `React.memo` en `renderItem`.

Snippet debounce:
```js
useEffect(()=>{ const t = setTimeout(()=> fetch(q), 300); return ()=>clearTimeout(t) }, [q])
```

---

## 12) Checklist final antes de entregar
- Reemplaza todas las MAYÚSCULAS.  
- Asegura imports (Formik, Yup, showMessage, icons).  
- Comprueba `route.params` y nombres de pantalla.  
- Deshabilita botones en llamadas.  
- Probar la funcionalidad mínima (crear/editar/avanzar).  
- Mostrar errores legibles (`String(e)`).

---

## 13) Ejemplo de pegado rápido (paso a paso)
1. Pega la plantilla `Lista` en el fichero solicitado.  
2. Reemplaza `RESOURCE`/`ENDPOINT` y `route.params?.id` si hace falta.  
3. Añade imports que falten.  
4. Ejecuta `npx expo start` → reproducir error → corregir import/typo.  
5. Si falla una llamada API: comprueba ruta y auth.

---

Si quieres: automatizo (A) crear `src/docs/` con separadores por categoría (ya creado), (B) generar la versión 1‑página resumen, o (C) pegar y adaptar una plantilla concreta en `OrdersScreen.js` ahora. ¿Qué opción quieres? 
