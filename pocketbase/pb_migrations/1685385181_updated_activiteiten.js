migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  collection.viewRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid != null)"
  collection.createRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid != null)"
  collection.updateRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid != null)"
  collection.deleteRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid:length != null)"

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
