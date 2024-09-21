import { Texture, Vector3 } from 'arx-level-generator'
import { createBox } from 'arx-level-generator/prefabs/mesh'
import { doorstepSide, doorstepTop } from '@/textures.js'

export function createDoorstepAt(position: Vector3, orientation: 'ns' | 'ew') {
  const height = 4

  const doorstep = createBox({
    position: position.clone().add(new Vector3(0, -(height / 2), 0)),
    size: new Vector3(150, height, 20),
    materials: [Texture.alpha, Texture.alpha, Texture.alpha, doorstepTop, doorstepSide, doorstepSide],
    angleY: orientation === 'ns' ? 90 : 0,
  })

  return doorstep
}
