migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r96nt7gpaoy6qzt")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r96nt7gpaoy6qzt")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
