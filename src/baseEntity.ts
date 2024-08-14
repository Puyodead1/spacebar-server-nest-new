import { PrimaryColumn } from "typeorm";

export default class BaseEntity {
  // id is a snowflake type
  @PrimaryColumn()
  id: string;
}
