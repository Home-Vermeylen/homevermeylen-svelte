migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ixl1wgip",
    "name": "pro_praesidiumlid",
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
      "maxSelect": 1,
      "displayFields": [
        "praesidium"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("ixl1wgip")

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
})
