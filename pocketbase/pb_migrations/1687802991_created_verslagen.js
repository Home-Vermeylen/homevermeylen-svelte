migrate((db) => {
  const collection = new Collection({
    "id": "kbzdvkw07nm24z8",
    "created": "2023-06-26 18:09:51.612Z",
    "updated": "2023-06-26 18:09:51.612Z",
    "name": "verslagen",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ozslrelj",
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
        "id": "ocik9bwz",
        "name": "verslag",
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
        "id": "mly646fm",
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
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kbzdvkw07nm24z8");

  return dao.deleteCollection(collection);
})
