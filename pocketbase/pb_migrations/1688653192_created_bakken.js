migrate((db) => {
  const collection = new Collection({
    "id": "y7y7cadpsdb35wq",
    "created": "2023-07-06 14:19:52.297Z",
    "updated": "2023-07-06 14:19:52.297Z",
    "name": "bakken",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cptsfvix",
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
        "id": "c6bsbsqn",
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
        "id": "p8edxhsk",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("y7y7cadpsdb35wq");

  return dao.deleteCollection(collection);
})
