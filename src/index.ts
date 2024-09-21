import { ArxMap, HudElements, Settings, Vector3 } from 'arx-level-generator'
import { loadRooms } from 'arx-level-generator/prefabs/rooms'
import { createDoorstepAt } from './prefabs/createDoorstepAt.js'

const settings = new Settings()
const map = new ArxMap()

map.config.offset = new Vector3(6000, 0, 6000)

map.hud.hide(HudElements.Minimap)

const apartmentType13rdFloor = await loadRooms('./apartment-type-1.rooms', settings)
apartmentType13rdFloor.forEach((room) => {
  map.add(room, true)
})

Object.entries(apartmentType13rdFloor.cursor.saves).forEach(([key, { cursor }]) => {
  if (!key.startsWith('add-prefab-doorstep')) {
    return
  }

  const doorstep = createDoorstepAt(map.config.offset.clone().add(cursor), key.includes('-ns-') ? 'ns' : 'ew')
  map.polygons.addThreeJsMesh(doorstep)
})

map.finalize(settings)
map.saveToDisk(settings)
