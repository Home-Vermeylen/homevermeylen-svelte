migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tvz5mj4u",
    "name": "activiteitstype",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "BAR",
        "CANTUS",
        "SPORT",
        "CULTUUR",
        "FUIF",
        "ANDERE"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tvz5mj4u",
    "name": "activiteitstype",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "BAR",
        "CANTUS",
        "SPORT",
        "CULTUUR",
        "ANDERE"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
