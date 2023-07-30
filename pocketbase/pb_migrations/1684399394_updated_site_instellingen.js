migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfbaz5drj603l73")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfbaz5drj603l73")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
