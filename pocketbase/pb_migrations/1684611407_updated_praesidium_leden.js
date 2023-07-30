migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r96nt7gpaoy6qzt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pzq3ehko",
    "name": "pro_praesidium",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "qiwewt6q0gm6zgy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

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

  // remove
  collection.schema.removeField("pzq3ehko")

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
      "maxSelect": null,
      "displayFields": [
        "academiejaar"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
