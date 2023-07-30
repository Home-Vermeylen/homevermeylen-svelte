migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfbaz5drj603l73")

  collection.createRule = "@request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true"
  collection.updateRule = "@request.auth.praesidiumlid.functie = \"ICT\" || @request.auth.beheerder_ad_interim = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfbaz5drj603l73")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
