migrate((db) => {
  const collection = new Collection({
    "id": "blfiluklmv2z923",
    "created": "2023-07-05 14:29:19.207Z",
    "updated": "2023-07-05 14:29:19.207Z",
    "name": "vriendschapsnetwerk",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zpf4pgix",
        "name": "praesidium",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "qiwewt6q0gm6zgy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "academiejaar"
          ]
        }
      },
      {
        "system": false,
        "id": "2l9fruvz",
        "name": "gebruikers",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "oos80m3d",
        "name": "datamap",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("blfiluklmv2z923");

  return dao.deleteCollection(collection);
})
