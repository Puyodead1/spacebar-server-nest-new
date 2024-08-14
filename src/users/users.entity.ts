import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";
import BaseEntity from "../baseEntity";

export enum UserPremiumType {
  NONE = 0,
  CLASSIC = 1,
  STANDARD = 2,
  BASIC = 3,
}

export enum UserPurchasedFlags {
  TIER_1 = 1, // classic
  TIER_2 = 2, // standard
  TIER_0 = 3, // basic
}

export class UserAvatarDecorationData {
  @ApiProperty()
  asset: string;
  @ApiProperty()
  expires_at?: Date | null;
  @ApiProperty()
  sku_id: string;
}

@Entity()
export class Users extends BaseEntity {
  @Column()
  @ApiProperty()
  username: string;

  @Column({ nullable: true })
  @ApiProperty()
  avatar?: string | null;

  @Column({ default: "0" })
  @ApiProperty()
  discriminator: string = "0";

  @Column({ default: 0 })
  @ApiProperty()
  public_flags: number = 0;

  @Column({ default: 0 })
  @ApiProperty()
  flags: number = 0;

  @Column({ nullable: true })
  @ApiProperty()
  banner?: string | null;

  @Column({ nullable: true })
  @ApiProperty()
  banner_color?: string | null; // hex color

  @Column({ nullable: true })
  @ApiProperty()
  accent_color?: number | null; // decimal color

  @Column()
  @ApiProperty()
  global_name: string;

  @Column("jsonb", { nullable: true })
  @ApiProperty()
  avatar_decoration_data?: UserAvatarDecorationData | null;

  @Column({ nullable: true })
  @ApiProperty()
  clan?: string | null;

  @Column({ default: false })
  @ApiProperty()
  mfa_enabled: boolean = false;

  @Column({ default: 0 })
  @ApiProperty()
  premium_type: UserPremiumType = 0; // represents the premium type a User has

  @Column({ nullable: true })
  @ApiProperty()
  email?: string | null; // nullable on unclaimed accounts

  @Column({ default: false })
  @ApiProperty()
  verified: boolean = false;

  @Column({ nullable: true })
  @ApiProperty()
  phone?: string | null;

  @Column({ default: false })
  @ApiProperty()
  nsfw_allowed: boolean = false;

  @Column("text", { array: true, default: [] })
  @ApiProperty()
  linked_users: any[] = []; // TODO: unknown what the actual type is, a go package has it as an object array

  @Column({ default: 0 })
  @ApiProperty()
  purchased_flags: number = 0; // represents a user's purchased state

  @Column({ default: "" })
  @ApiProperty()
  bio: string = "";

  @Column({ default: false })
  @ApiProperty()
  desktop: boolean = false;

  @Column({ default: false })
  @ApiProperty()
  mobile: boolean = false;

  @Column({ default: "" })
  @ApiProperty()
  pronouns: string = "";

  @Column({ default: false })
  bot: boolean = false;

  @Column({ nullable: true })
  @Exclude()
  password?: string | null;

  @Column({ default: "en-US" })
  @ApiProperty()
  locale: string = "en-US";

  @Column({ default: "dark" })
  @ApiProperty({
    enum: ["dark", "light"],
  })
  theme: string = "dark";

  @Column({ type: "timestamptz" })
  @Exclude()
  tokens_valid_since: Date = new Date();

  @Column({ type: "timestamptz" })
  @Exclude()
  created_at: Date = new Date();

  @Column({ type: "timestamptz" })
  @Exclude()
  updated_at: Date = new Date();
}
