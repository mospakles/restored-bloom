-- School enquiries become general outreach requests (schools, faith communities,
-- organisations, workplaces, community groups…). Renaming keeps existing rows.
ALTER TYPE "EnquiryType" RENAME VALUE 'SCHOOL' TO 'OUTREACH';
