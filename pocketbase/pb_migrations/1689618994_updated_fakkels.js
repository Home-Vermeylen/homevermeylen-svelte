migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ewzwajxj2on3ml2")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ewzwajxj2on3ml2")

  collection.createRule = null

  return dao.saveCollection(collection)
})
