migrate((db) => {
  const collection = new Collection({
    "id": "sw3784eivau94g8",
    "created": "2023-05-21 10:38:08.202Z",
    "updated": "2023-05-21 10:38:08.202Z",
    "name": "praesidium_openbaar",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "i94mtzxm",
        "name": "academiejaar",
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
        "id": "dwfvp9os",
        "name": "praesidium_leden",
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
      },
      {
        "system": false,
        "id": "k2vhky4e",
        "name": "activiteiten",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "h0ad0pd3ntujvuy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
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
    "options": {
      "query": "SELECT id, academiejaar, praesidium_leden, activiteiten FROM praesidium"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sw3784eivau94g8");

  return dao.deleteCollection(collection);
})
