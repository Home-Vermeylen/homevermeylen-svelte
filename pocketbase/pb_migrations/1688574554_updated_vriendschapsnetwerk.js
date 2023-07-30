migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("blfiluklmv2z923")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("blfiluklmv2z923")

  collection.createRule = null

  return dao.saveCollection(collection)
})
