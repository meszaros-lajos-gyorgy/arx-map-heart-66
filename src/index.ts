import { ArxMap, HudElements, Settings, Vector3 } from 'arx-level-generator'
import { loadRooms } from 'arx-level-generator/prefabs/rooms'
import { MathUtils } from 'three'
import { createDoorstepAt } from './prefabs/createDoorstepAt.js'
import { createGangAt } from './prefabs/createGangAt.js'

const settings = new Settings()
const map = new ArxMap()

map.config.offset = new Vector3(6000, 0, 6000)

// debug: make the player face the "gang"
map.player.orientation.y = MathUtils.degToRad(180)

map.hud.hide(HudElements.Minimap)

const apartmentType1 = await loadRooms('./apartment-type-1.rooms', settings)
apartmentType1.forEach((room) => {
  map.add(room, true)
})

Object.entries(apartmentType1.cursor.saves).forEach(([key, { cursor }]) => {
  if (!key.startsWith('add-prefab-doorstep')) {
    return
  }

  const doorstep = createDoorstepAt(map.config.offset.clone().add(cursor), key.includes('-ns-') ? 'ns' : 'ew')
  map.polygons.addThreeJsMesh(doorstep)
})

const gangMeshes = createGangAt(map.config.offset.clone().add(new Vector3(-125, 0, -345)))
gangMeshes.forEach((gang) => {
  map.polygons.addThreeJsMesh(gang)
})

map.finalize(settings)
map.saveToDisk(settings)
