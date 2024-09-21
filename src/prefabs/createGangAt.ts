import { Vector3 } from 'arx-level-generator'
import { createPlaneMesh } from 'arx-level-generator/prefabs/mesh'
import { MathUtils, Vector2 } from 'three'
import { ceramicTileCorner, ceramicTileEdge } from '@/textures.js'

export function createGangAt(position: Vector3) {
  const cornerSize = new Vector2(25, 25)
  const corner = createPlaneMesh({
    size: cornerSize,
    texture: ceramicTileCorner,
    tileSize: Math.min(cornerSize.x, cornerSize.y),
  })
  corner.position.add(position.clone().add(new Vector3(cornerSize.x / 2, 0, -(cornerSize.y / 2))))

  const xEdgeNSize = new Vector2(25, 900)
  const xEdgeN = createPlaneMesh({
    size: xEdgeNSize,
    texture: ceramicTileEdge,
    tileSize: Math.min(xEdgeNSize.x, xEdgeNSize.y),
  })
  xEdgeN.geometry.rotateY(MathUtils.degToRad(90))
  xEdgeN.position.add(position.clone().add(new Vector3(cornerSize.x + xEdgeNSize.y / 2, 0, -(xEdgeNSize.x / 2))))

  const yEdgeNSize = new Vector2(25, 900)
  const yEdgeN = createPlaneMesh({
    size: yEdgeNSize,
    texture: ceramicTileEdge,
    tileSize: Math.min(yEdgeNSize.x, yEdgeNSize.y),
  })
  yEdgeN.position.add(position.clone().add(new Vector3(yEdgeNSize.x / 2, 0, -cornerSize.y - yEdgeNSize.y / 2)))

  return [corner, xEdgeN, yEdgeN]
}
