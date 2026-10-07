# Founder launch checklist

Work through this list before telling people about the website. Items marked ⚠️ are shown to visitors as "draft" or are hidden until you complete them.

## 1. Words on the website

- [ ] Read every public page and confirm the wording is accurate. The draft copy was written without project documents, so check especially:
  - the story, mission, vision and values (About page, `src/lib/content.ts`)
  - the programme descriptions, topics and session formats
  - the Invite Us page: the kinds of places you can be invited to, how an invitation works (the five steps) and what hosts are asked to provide
  - whether you can travel outside Lagos, or offer online sessions (the site says to get in touch either way)
- [ ] The site describes Restored Bloom as a **foundation**. Confirm this matches how it is (or will be) registered, e.g. with the CAC as incorporated trustees, and adjust the wording if not.
- [ ] Confirm the tagline: *"Creating safe spaces. Restoring hope. Helping lives bloom."*
- [ ] Remove or change anything that doesn't reflect what Restored Bloom does or plans to do.
- [ ] Have someone with child-protection experience check that the programme wording is age-appropriate and never implies children are responsible for preventing abuse.

## 2. Founder profile ⚠️

- [ ] **Dashboard → Site settings → Founder biography**: write or approve your biography.
- [ ] Include only qualifications, roles and experience you are happy to have published, and that can be verified.
- [ ] Tick "The founder has approved this biography" to remove the draft label.
- [ ] Optional: send a photo of yourself if you'd like one. The site currently uses a botanical illustration instead of a photo.

## 3. Contact details ⚠️

- [ ] **Dashboard → Site settings**: add the public email address, phone number and response hours you want shown. Empty fields stay hidden.
- [ ] Add social media links, if any.
- [ ] Add a registration line (e.g. CAC number) only once registration is confirmed. Otherwise leave it blank.
- [ ] Decide who receives "new enquiry" alert emails (`ADMIN_NOTIFICATION_EMAILS`).

## 4. Programme status

- [ ] **Dashboard → Site settings → Programme status**: everything starts as "Planned". Change a programme to "Pilot stage" or "Running now" only when that is true.

## 5. Policies ⚠️ (need professional review)

Each page shows a "Draft — awaiting review" banner until it is marked reviewed in **Dashboard → Pages & policies**.

- [ ] **Privacy notice**: review against the Nigeria Data Protection Act 2023 with a data protection adviser. Confirm the contact for privacy requests and how long records are kept.
- [ ] **Safeguarding statement**: develop it into a full safeguarding policy with a qualified safeguarding professional before any session with children. Name a designated safeguarding lead.
- [ ] **Website terms**: review with a legal adviser.
- [ ] **Accessibility statement**: confirm, ideally after testing with assistive-technology users.
- [ ] Record who reviewed each page and when in the "Review record" field, then tick "reviewed".

## 6. Finding support page and referral information ⚠️

- [ ] Review the general guidance on **Dashboard → Pages & policies → Finding support** with a qualified professional.
- [ ] Decide which helplines, emergency numbers and organisations to list. For each one, in **Dashboard → Support contacts**:
  - check the phone number and website directly (call or email them)
  - record how and when it was verified
  - keep the "Not a formal partner" wording unless a partnership agreement exists
  - tick "verified", then "show on the public Support page"
- [ ] Only describe an organisation as a partner once both sides have formally agreed.

## 7. Volunteers and safeguarding process

- [ ] Agree the screening process for volunteers who would work with children (references, checks, training, approval). The website deliberately does not collect documents. That process happens separately.
- [ ] Decide who on the team handles volunteer enquiries (assign them the Outreach coordinator role).

## 8. Accounts and access

- [ ] Create your administrator account with `npm run admin:create` (see README).
- [ ] Add team members in **Dashboard → Users** with the least access they need.
- [ ] Use strong, unique passwords (a phrase of several words works well).
- [ ] Set a data-retention period in Site settings (default 24 months) and add a calendar reminder to run **Dashboard → Data retention**.

## 9. Email and newsletter

- [ ] Choose an email provider and add the SMTP settings (see README → Credentials).
- [ ] Send a test: use "Forgotten your password?" on the sign-in page and check the email arrives.
- [ ] If you want a newsletter, tick "Show the newsletter signup" in Site settings once email works.

## 10. Online donations (optional — not set up)

The site does **not** take payments. The Support Our Work page invites sponsorship enquiries instead.

- [ ] If you want online donations, choose an approved provider (e.g. Paystack or Flutterwave), open an account in the organisation's name, and confirm how donations will be accounted for. A developer then needs to build and test the integration (see README → Pending).

## 11. Before going live

- [ ] Hosting and database set up, environment variables set, migrations applied (README → Production deployment).
- [ ] Domain connected with HTTPS.
- [ ] Submit each form once yourself and check it appears in the dashboard.
- [ ] Check the site on a phone.
- [ ] Remove any development/test records (none should exist if the seed was never run on production).
- [ ] Optional: delete the `_archive/` folder (the earlier prototype) from the repository.
