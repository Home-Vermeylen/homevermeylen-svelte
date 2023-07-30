migrate((db) => {
  const collection = new Collection({
    "id": "kh98ktzpc17hc8g",
    "created": "2023-05-21 08:20:55.998Z",
    "updated": "2023-05-21 08:20:55.998Z",
    "name": "gebruikers_openbaar",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qsmiunup",
        "name": "voornaam",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ptcidpt5",
        "name": "familienaam",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, voornaam, familienaam FROM gebruikers"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g");

  return dao.deleteCollection(collection);
})
