migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true)"
  collection.deleteRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
