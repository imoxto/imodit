import { Visibility } from "@prisma/client";
import { registerEnumType } from "type-graphql";

import { ErrorType } from "../types";

registerEnumType(Visibility, {
  name: "Visibility",
  description: "The basic visibility",
});

registerEnumType(ErrorType, {
  name: "ErrorType",
  description: "Basic errors",
});
