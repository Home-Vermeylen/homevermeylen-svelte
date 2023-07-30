migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r96nt7gpaoy6qzt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "twd8bdn7",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r96nt7gpaoy6qzt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "twd8bdn7",
    "name": "praesidium",
    "type": "relation",
    "required": false,
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
