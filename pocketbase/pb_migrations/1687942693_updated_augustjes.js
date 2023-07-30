migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gyhgsh3iihv7n73")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z4trkomp",
    "name": "augustje",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 50000000,
      "mimeTypes": [
        "application/pdf"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gyhgsh3iihv7n73")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z4trkomp",
    "name": "augustje",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "application/pdf"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
