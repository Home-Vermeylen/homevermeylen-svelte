migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  collection.listRule = "@request.auth.praesidiumlid != \"\" || @request.auth.beheerder_ad_interim = true"
  collection.updateRule = "@request.auth.praesidiumlid != \"\" || @request.auth.beheerder_ad_interim = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  collection.listRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
