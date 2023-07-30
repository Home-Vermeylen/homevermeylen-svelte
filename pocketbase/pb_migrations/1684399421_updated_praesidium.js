migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
