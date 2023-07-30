migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  collection.viewRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid:length != 0)"
  collection.createRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid:length != 0)"
  collection.updateRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid:length != 0)"
  collection.deleteRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid:length != 0)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
