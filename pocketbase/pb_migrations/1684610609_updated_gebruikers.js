migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfdqdjau",
    "name": "praesidiumlid",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "r96nt7gpaoy6qzt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "praesidium"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfdqdjau",
    "name": "praesidiumlid",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "r96nt7gpaoy6qzt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
