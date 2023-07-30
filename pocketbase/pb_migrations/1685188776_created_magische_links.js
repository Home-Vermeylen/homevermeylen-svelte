migrate((db) => {
  const collection = new Collection({
    "id": "smaydctbi9kikvl",
    "created": "2023-05-27 11:59:36.693Z",
    "updated": "2023-05-27 11:59:36.693Z",
    "name": "magische_links",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5zio1epw",
        "name": "doel",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "SCHACHTACCOUNT",
            "COMMIACCOUNT",
            "BEWONERACCOUNT",
            "PRAESIDIUMACCOUNT"
          ]
        }
      },
      {
        "system": false,
        "id": "qk1yuxtz",
        "name": "code",
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
        "id": "pmnq8ofg",
        "name": "actief",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_614BJL7` ON `magische_links` (`code`)"
    ],
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
  const collection = dao.findCollectionByNameOrId("smaydctbi9kikvl");

  return dao.deleteCollection(collection);
})
