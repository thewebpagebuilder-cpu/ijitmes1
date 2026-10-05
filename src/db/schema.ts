import {
  bigserial,
  customType,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const submissions = pgTable("submissions", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  trackingId: varchar("tracking_id", { length: 32 }).notNull().unique(),
  paperTitle: varchar("paper_title", { length: 500 }).notNull(),
  researchArea: varchar("research_area", { length: 250 }).notNull(),
  abstract: text("abstract"),
  authorName: varchar("author_name", { length: 200 }).notNull(),
  designation: varchar("designation", { length: 200 }).notNull(),
  organization: varchar("organization", { length: 300 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  mobile: varchar("mobile", { length: 40 }).notNull(),
  coAuthors: jsonb("co_authors")
    .$type<Array<{ name: string; organization: string; email: string }>>()
    .notNull()
    .default([]),
  postalCode: varchar("postal_code", { length: 24 }).notNull(),
  country: varchar("country", { length: 120 }).notNull(),
  state: varchar("state", { length: 120 }).notNull(),
  city: varchar("city", { length: 120 }).notNull(),
  fileName: varchar("file_name", { length: 500 }).notNull(),
  fileSize: integer("file_size").notNull(),
  fileData: bytea("file_data").notNull(),
  status: varchar("status", { length: 60 }).notNull().default("Editorial screening"),
  statusNote: text("status_note").notNull().default("Your manuscript has been received by the editorial office."),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const enquiries = pgTable("enquiries", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  mobile: varchar("mobile", { length: 40 }),
  subject: varchar("subject", { length: 300 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Submission = typeof submissions.$inferSelect;
