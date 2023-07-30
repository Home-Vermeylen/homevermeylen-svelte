migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-05-09 14:17:07.146Z",
      "updated": "2023-05-10 18:00:31.454Z",
      "name": "gebruikers",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
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
          "id": "5gpbdbdm",
          "name": "familienaam",
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
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null,
            "protected": false
          }
        },
        {
          "system": false,
          "id": "hfdqdjau",
          "name": "praesidiumlid",
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
        }
      ],
      "indexes": [],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "r96nt7gpaoy6qzt",
      "created": "2023-05-10 09:48:52.905Z",
      "updated": "2023-05-10 14:43:10.022Z",
      "name": "praesidium_leden",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "r5mipdjp",
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
          "id": "prstt4ng",
          "name": "familienaam",
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
          "id": "ednk62ys",
          "name": "gebruiker",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "twd8bdn7",
          "name": "praesidium",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "qiwewt6q0gm6zgy",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "82s4fw8p",
          "name": "functie",
          "type": "select",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "Praeses",
              "Vice-Praeses",
              "Penning",
              "Cultuur",
              "Sport",
              "Feest",
              "Bar",
              "Secretaris",
              "ICT",
              "Schachtentemmer",
              "Internationaal",
              "VM",
              "Peter",
              "Meter",
              "Zeden",
              "Cantor",
              "Milieu",
              "PR-Intern",
              "PR-Extern",
              "Scriptor",
              "Lustrum"
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
    },
    {
      "id": "qiwewt6q0gm6zgy",
      "created": "2023-05-10 09:57:28.441Z",
      "updated": "2023-05-10 14:17:43.457Z",
      "name": "praesidium",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "5bvrz76w",
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
          "id": "cnhrschb",
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
          "id": "meb6d0ny",
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
      "indexes": [
        "CREATE UNIQUE INDEX `idx_plbDimG` ON `praesidium` (`academiejaar`)",
        "CREATE INDEX `idx_eZvQy1h` ON `praesidium` (`academiejaar`)"
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "h0ad0pd3ntujvuy",
      "created": "2023-05-10 13:44:43.421Z",
      "updated": "2023-05-10 13:44:43.421Z",
      "name": "activiteiten",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "kkn0vtto",
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
          "id": "jxglbnmb",
          "name": "omschrijving",
          "type": "editor",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "ugqnwgnj",
          "name": "locatie",
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
          "id": "nnz8zjgv",
          "name": "datum",
          "type": "date",
          "required": true,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "tvz5mj4u",
          "name": "activiteitstype",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "BAR",
              "CANTUS",
              "SPORT",
              "CULTUUR",
              "ANDERE"
            ]
          }
        },
        {
          "system": false,
          "id": "0pqmy1pf",
          "name": "banner",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [],
            "thumbs": [],
            "protected": false
          }
        },
        {
          "system": false,
          "id": "ltw2dvwq",
          "name": "inschrijven",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "7cs4a9hp",
          "name": "inschrijvings_start_datum",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "iih12rz0",
          "name": "inschrijvings_eind_datum",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "rkyh4kiw",
          "name": "exclusief_vermeylen",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "stnwzbcs",
          "name": "formlink",
          "type": "url",
          "required": false,
          "unique": false,
          "options": {
            "exceptDomains": [],
            "onlyDomains": []
          }
        },
        {
          "system": false,
          "id": "afdj9cw2",
          "name": "extra_velden",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "bqeyim82",
          "name": "praesidium",
          "type": "relation",
          "required": false,
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
        },
        {
          "system": false,
          "id": "3g86qsz5",
          "name": "gepubliceerd",
          "type": "bool",
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
      "options": {}
    },
    {
      "id": "bfbaz5drj603l73",
      "created": "2023-05-10 13:47:38.458Z",
      "updated": "2023-05-10 13:47:38.458Z",
      "name": "site_instellingen",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "qehvg7pg",
          "name": "sleutel",
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
          "id": "lwkoligq",
          "name": "waarde",
          "type": "json",
          "required": true,
          "unique": false,
          "options": {}
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_2O0KbN7` ON `site_instellingen` (`sleutel`)"
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
