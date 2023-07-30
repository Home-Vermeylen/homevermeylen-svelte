migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r96nt7gpaoy6qzt")

  collection.createRule = "@request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true"
  collection.updateRule = "@request.auth.id = gebruiker.id || @request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true"
  collection.deleteRule = "@request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r96nt7gpaoy6qzt")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
