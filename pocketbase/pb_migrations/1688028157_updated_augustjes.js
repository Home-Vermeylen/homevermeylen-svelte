migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gyhgsh3iihv7n73")

  collection.createRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid.functie = \"Scriptor\" || @request.auth.beheerder_ad_interim = true)"
  collection.updateRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid.functie = \"Scriptor\" || @request.auth.beheerder_ad_interim = true)"
  collection.deleteRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid.functie = \"Scriptor\" || @request.auth.beheerder_ad_interim = true)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gyhgsh3iihv7n73")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
