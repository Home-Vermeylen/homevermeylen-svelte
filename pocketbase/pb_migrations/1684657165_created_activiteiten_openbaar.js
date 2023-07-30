migrate((db) => {
  const collection = new Collection({
    "id": "0kdf14cy3mzd0pu",
    "created": "2023-05-21 08:19:25.046Z",
    "updated": "2023-05-21 08:19:25.046Z",
    "name": "activiteiten_openbaar",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wndabbmp",
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
        "id": "wpi8srpw",
        "name": "omschrijving",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \"naam\", \"omschrijving\", \"id\" FROM activiteiten"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu");

  return dao.deleteCollection(collection);
})
