import { Texture, Vector3 } from 'arx-level-generator'
import { createBox } from 'arx-level-generator/prefabs/mesh'
import { doorstepSide, doorstepTop } from '@/textures.js'

export function createDoorstepAt(pos: Vector3, orientation: 'ns' | 'ew') {
  const doorstep = createBox({
    position: pos,
    size: new Vector3(150, 7, 20),
    materials: [Texture.alpha, Texture.alpha, Texture.alpha, doorstepTop, doorstepSide, doorstepSide],
    angleY: orientation === 'ns' ? 90 : 0,
  })

  return doorstep
}
