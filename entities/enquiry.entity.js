import { Entity } from "electrodb"; // ORM(Object relation mapping) // Adapter on adapter

import { client } from "../util/dbconnection.js";

const Enquires = new Entity(
  {
    model: {
      entity: "Enquires",
      version: "1",
      service: "EnquiryService",
    },
    attributes: {
      id: {
        type: "string",
      },
      fullname: {
        type: "string",
        required: true,
      },
      phone_number: {
        type: "number",
        required: true,
      },
      email: {
        type: "string",
        required: true,
      },

      state: {
        type: "string",
        required: true,
      },

      company: {
        type: "string",
        required: true,
      },
      timestamp: {
        type: "string",
      },
      package: {
        type: "string",
      },
    },
    indexes: {
      primary: {
        pk: {
          // highlight-next-line
          field: "pk",
          facets: ["id"],
        },
        sk: {
          // highlight-next-line
          field: "sk",
          facets: [],
        },
      },
    },
  },
  { client, table: "enquires" }
);

export { Enquires };
