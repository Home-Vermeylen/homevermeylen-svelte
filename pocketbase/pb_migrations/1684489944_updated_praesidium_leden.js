migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r96nt7gpaoy6qzt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ednk62ys",
    "name": "gebruiker",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "created",
        "updated",
        "username",
        "email",
        "emailVisibility",
        "verified",
        "voornaam",
        "familienaam",
        "avatar",
        "praesidiumlid",
        "quote"
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
    "id": "ednk62ys",
    "name": "gebruiker",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
