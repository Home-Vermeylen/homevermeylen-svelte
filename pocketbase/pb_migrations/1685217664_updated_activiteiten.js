migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  collection.listRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid != \"[]\")"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  collection.listRule = null

  return dao.saveCollection(collection)
})
