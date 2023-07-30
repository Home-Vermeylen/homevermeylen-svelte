migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bqeyim82",
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
  const collection = dao.findCollectionByNameOrId("h0ad0pd3ntujvuy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bqeyim82",
    "name": "praesidium",
    "type": "relation",
    "required": false,
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
})
