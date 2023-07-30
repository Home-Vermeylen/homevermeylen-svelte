migrate((db) => {
  const collection = new Collection({
    "id": "v0nhd5m9mcg3mxe",
    "created": "2023-05-21 08:06:04.964Z",
    "updated": "2023-05-21 08:06:04.964Z",
    "name": "logboek",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yh1umzbi",
        "name": "actie",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "FOTO_TOEVOEGEN",
            "ACTIVITEIT_TOEVOEGEN",
            "GEBRUIKER_TOEVOEGEN",
            "ACTIVITEIT_BEWERKEN",
            "GEBRUIKER_BEWERKEN",
            "FOTO_VERWIJDEREN",
            "GEBRUIKER_VERWIJDEREN",
            "ACTIVITEIT_VERWIJDEREN"
          ]
        }
      },
      {
        "system": false,
        "id": "zjlwfgmy",
        "name": "gebruiker",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "voornaam",
            "familienaam"
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
  const collection = dao.findCollectionByNameOrId("v0nhd5m9mcg3mxe");

  return dao.deleteCollection(collection);
})
