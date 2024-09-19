import { ArxMap, Settings, Vector3 } from 'arx-level-generator'
import { loadRooms } from 'arx-level-generator/prefabs/rooms'

const settings = new Settings()
const map = new ArxMap()

map.config.offset = new Vector3(6000, 0, 6000)

const apartmentType13rdFloor = await loadRooms('./apartment-type-1.rooms', settings)
apartmentType13rdFloor.forEach((room) => {
  map.add(room, true)
})

map.finalize(settings)
map.saveToDisk(settings)
