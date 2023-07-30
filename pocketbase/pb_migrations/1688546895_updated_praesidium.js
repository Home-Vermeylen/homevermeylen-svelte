migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
