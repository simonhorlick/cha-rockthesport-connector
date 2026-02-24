import {
  pgTable,
  pgSchema,
  bigint,
  text,
  timestamp,
  boolean,
  doublePrecision,
  integer,
  unique,
  numeric,
  date,
  varchar,
} from "drizzle-orm/pg-core";

export const raceroster = pgSchema("raceroster");

export const sync = raceroster.table("sync", {
  lastSyncTimestamp: timestamp("last_sync_timestamp", {
    withTimezone: true,
    mode: "date",
  }),
  eventId: bigint("event_id", { mode: "number" })
    .notNull()
    .references(() => events.id),
});

export const questions = pgTable(
  "questions",
  {
    question: text("question"),
    answer: text("answer"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    registrationid: bigint("registrationid", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    participant_id: bigint("participant_id", { mode: "number" })
      .notNull()
      .references(() => participants.id),
  },
  (table) => {
    return {
      questions_participant_id_question_key: unique(
        "questions_participant_id_question_key",
      ).on(table.question, table.participant_id),
    };
  },
);

export const activecampaign = pgSchema("activecampaign");

export const events = pgTable(
  "events",
  {
    eventnumber: varchar("eventnumber"),
    name: varchar("name").notNull(),
    date: date("date", { mode: "date" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    eventid: bigint("eventid", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "events_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    createdat: timestamp("createdat", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedat: timestamp("updatedat", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    platform: text("platform").notNull(),
    name_custom: text("name_custom"),
    currency: varchar("currency", { length: 3 }),
    connectorName: text("connectorname").notNull(),
  },
  (table) => {
    return {
      events_eventnumber_key: unique("events_eventnumber_key").on(
        table.eventnumber,
      ),
    };
  },
);

export const participants = pgTable("participants", {
  eventnumber: varchar("eventnumber"),
  email: varchar("email").notNull(),
  registrationlastmodifieddate: timestamp("registrationlastmodifieddate", {
    withTimezone: true,
    mode: "date",
  }),
  address1: text("address1"),
  address2: text("address2"),
  distance: text("distance"),
  age: integer("age"),
  ageatendofraceyear: integer("ageatendofraceyear"),
  bibnumber: text("bibnumber"),
  cellphonenumber: text("cellphonenumber"),
  chipnumber: text("chipnumber"),
  city: text("city"),
  country: text("country"),
  dateofbirth: date("dateofbirth", { mode: "date" }),
  division: text("division"),
  emergencycontactname: text("emergencycontactname"),
  emergencycontactphone: text("emergencycontactphone"),
  emergencycontactrelationship: text("emergencycontactrelationship"),
  emergencycontact2name: text("emergencycontact2name"),
  emergencycontact2phone: text("emergencycontact2phone"),
  emergencycontact2relationship: text("emergencycontact2relationship"),
  estimatedfinishtime: text("estimatedfinishtime"),
  firstname: text("firstname"),
  gender: text("gender"),
  lastname: text("lastname"),
  membershipstatus: text("membershipstatus"),
  membershipsnapshot: text("membershipsnapshot"),
  ngbwaiversigned: boolean("ngbwaiversigned"),
  pricetype: text("pricetype"),
  primaryphonenumber: text("primaryphonenumber"),
  primaryphoneextension: text("primaryphoneextension"),
  registrationcategory: text("registrationcategory"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  //registrationid: bigint("registrationid", { mode: "number" }),
  registrationnumber: text("registrationnumber"),
  state: text("state"),
  teamname: text("teamname"),
  tshirtsize: text("tshirtsize"),
  usatmembership: text("usatmembership"),
  waiversigned: boolean("waiversigned"),
  wave: text("wave"),
  zipcode: text("zipcode"),
  updatedat: timestamp("updatedat", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  createdat: timestamp("createdat", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  eventId: bigint("event_id", { mode: "number" })
    .notNull()
    .references(() => events.id),
  price: numeric("price"),
  status: text("status"),
  source: text("source"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
    name: "participants_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 9223372036854775807,
    cache: 1,
  }),
  registration_date: timestamp("registration_date", {
    withTimezone: true,
    mode: "date",
  }),
  raceclass: text("raceclass"),
  competitionname: text("competitionname"),
  registrationamount: doublePrecision("registrationamount"),
  discountcodes: text("discountcodes").array(),
  bulkplaces: integer("bulkplaces"),
  platformId: text("platform_id").notNull(),
  tags: text("tags").array(),
  reservation_id: text("reservation_id"),
});

export const series = pgTable(
  "series",
  {
    seriesid: integer("seriesid").primaryKey().generatedAlwaysAsIdentity({
      name: "series_seriesid_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 2147483647,
      cache: 1,
    }),
    seriesname: varchar("seriesname").notNull(),
    senderurl: varchar("senderurl").notNull(),
    short_name: text("short_name"),
    location: text("location"),
  },
  (table) => {
    return {
      series_seriesid_key: unique("series_seriesid_key").on(table.seriesid),
      series_seriesname_key: unique("series_seriesname_key").on(
        table.seriesname,
      ),
    };
  },
);

export const seriesevents = pgTable(
  "seriesevents",
  {
    seriesid: integer("seriesid")
      .references(() => series.seriesid)
      .notNull(),
    createdat: timestamp("createdat", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    agencyid: bigint("agencyid", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "seriesevents_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    event_id: bigint("event_id", { mode: "number" })
      .notNull()
      .references(() => events.id),
  },
  (table) => {
    return {
      seriesevents_event_id_key: unique("seriesevents_event_id_key").on(
        table.event_id,
      ),
    };
  },
);
