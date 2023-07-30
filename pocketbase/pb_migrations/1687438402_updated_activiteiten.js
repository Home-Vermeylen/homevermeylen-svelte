migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  collection.listRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid != null || @request.auth.beheerder_ad_interim = true)"
  collection.viewRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid != null || @request.auth.beheerder_ad_interim = true)"
  collection.createRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid != null || @request.auth.beheerder_ad_interim = true)"
  collection.updateRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid != null || @request.auth.beheerder_ad_interim = true)"
  collection.deleteRule = "@request.auth.id != \"\" && (@request.auth.praesidiumlid:length != null || @request.auth.beheerder_ad_interim = true)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
