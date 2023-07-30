migrate((db) => {
  const collection = new Collection({
    "id": "ewzwajxj2on3ml2",
    "created": "2023-07-06 14:40:41.211Z",
    "updated": "2023-07-06 14:40:41.211Z",
    "name": "fakkels",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dbmcmj71",
        "name": "aantal",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "quoqt6fr",
        "name": "gebruiker",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "voornaam",
            "familienaam"
          ]
        }
      },
      {
        "system": false,
        "id": "ojf3vma6",
        "name": "praesidium",
        "type": "relation",
        "required": true,
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
  const collection = dao.findCollectionByNameOrId("ewzwajxj2on3ml2");

  return dao.deleteCollection(collection);
})
