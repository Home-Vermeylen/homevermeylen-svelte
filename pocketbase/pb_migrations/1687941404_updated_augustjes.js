migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gyhgsh3iihv7n73")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mvr4umrq",
    "name": "praesidium",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qiwewt6q0gm6zgy",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "academiejaar"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gyhgsh3iihv7n73")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mvr4umrq",
    "name": "praesidium",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qiwewt6q0gm6zgy",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
