migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gyhgsh3iihv7n73")

  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gyhgsh3iihv7n73")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
