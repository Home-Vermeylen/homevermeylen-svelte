migrate((db) => {
  const collection = new Collection({
    "id": "cop65v7ealtynqs",
    "created": "2023-05-20 19:28:16.248Z",
    "updated": "2023-05-20 19:28:16.248Z",
    "name": "fotos",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qkjoqi7f",
        "name": "bestand",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "tqocpcfw",
        "name": "praesidium",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "qiwewt6q0gm6zgy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "pmwcwxyv",
        "name": "activiteit",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "h0ad0pd3ntujvuy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cop65v7ealtynqs");

  return dao.deleteCollection(collection);
})
