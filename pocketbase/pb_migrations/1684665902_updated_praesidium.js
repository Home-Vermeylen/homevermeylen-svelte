migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  collection.listRule = "@request.auth.id != \"\""
  collection.viewRule = "@request.auth.id != \"\""
  collection.createRule = "@request.auth.id = id || (@request.auth.praesidiumlid.functie = \"ICT\")"
  collection.updateRule = "(@request.auth.id != \"\" && ((@request.data.academiejaar = academiejaar) && (@request.data.praesidium_leden = praesidium_leden))) || (@request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true)"
  collection.deleteRule = "@request.auth.id = id || (@request.auth.praesidiumlid.functie = \"ICT\")"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
