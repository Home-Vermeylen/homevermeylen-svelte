migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "@request.auth.id = id || (@request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true)"
  collection.viewRule = "@request.auth.id = id || (@request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true)"
  collection.updateRule = "id = @request.auth.id || (@request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
