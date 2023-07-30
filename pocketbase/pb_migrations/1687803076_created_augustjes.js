migrate((db) => {
  const collection = new Collection({
    "id": "gyhgsh3iihv7n73",
    "created": "2023-06-26 18:11:16.118Z",
    "updated": "2023-06-26 18:11:16.118Z",
    "name": "augustjes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nq0omyx2",
        "name": "naam",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
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
  const collection = dao.findCollectionByNameOrId("gyhgsh3iihv7n73");

  return dao.deleteCollection(collection);
})
