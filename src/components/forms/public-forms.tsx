"use client"

import Link from "next/link"
import { ActionForm, SubmitButton } from "@/components/forms/form"
import { Acknowledge, ChoiceGroup, SelectField, TextArea, TextField } from "@/components/forms/fields"
import { Notice } from "@/components/ui/misc"
import {
  submitContactEnquiry,
  submitEventRegistration,
  submitNewsletter,
  submitPartnerEnquiry,
  submitOutreachRequest,
  submitSponsorEnquiry,
  submitVolunteerEnquiry,
} from "@/app/(site)/actions"
import {
  ATTENDEE_ROLES,
  AUDIENCES,
  CONTACT_TOPICS,
  HOST_TYPES,
  NEWSLETTER_CONSENT_TEXT,
  ORGANISATION_TYPES,
  PARTICIPANT_RANGES,
  OUTREACH_SUPPORT,
  PARTNERSHIP_INTERESTS,
  SPONSOR_TYPES,
  SPONSORSHIP_INTERESTS,
  VOLUNTEER_AREAS,
} from "@/lib/validation"

function PrivacyAck() {
  return (
    <Acknowledge name="privacy">
      I have read the{" "}
      <Link href="/policies/privacy" className="font-semibold text-rose-700 underline underline-offset-2" target="_blank">
        privacy notice
      </Link>{" "}
      and agree to Restored Bloom using these details to respond to this enquiry.
    </Acknowledge>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>
}

function RequiredNote() {
  return (
    <p className="text-sm text-plum-600">
      Fields marked <span className="text-rose-700">*</span> are required.
    </p>
  )
}

export function OutreachRequestForm({ token }: { token: string }) {
  return (
    <ActionForm action={submitOutreachRequest} token={token} id="invite">
      <Notice tone="warning" title="Please don't include personal information about individuals">
        This form is for arranging a session or visit only. Please don&apos;t share anyone&apos;s names or personal
        details, or any disclosures or concerns about abuse. If you&apos;re worried about someone&apos;s safety, follow
        your organisation&apos;s safeguarding procedures and contact the appropriate authorities.
      </Notice>
      <RequiredNote />
      <fieldset className="space-y-5">
        <legend className="mb-1 text-lg font-display text-plum-900">About your organisation or group</legend>
        <Grid>
          <TextField name="organisation" label="Name of organisation or group" required autoComplete="organization" />
          <SelectField name="hostType" label="Type of organisation or group" options={HOST_TYPES} required />
        </Grid>
        <TextField name="location" label="Location" hint="Area, city and state — or 'online'" required />
      </fieldset>
      <fieldset className="space-y-5">
        <legend className="mb-1 text-lg font-display text-plum-900">Your details</legend>
        <Grid>
          <TextField name="contactName" label="Contact person" required autoComplete="name" />
          <TextField name="contactRole" label="Your role" hint="e.g. Head teacher, pastor, HR lead, coordinator" required />
          <TextField name="email" label="Email" type="email" required autoComplete="email" />
          <TextField name="phone" label="Phone" type="tel" required autoComplete="tel" />
        </Grid>
      </fieldset>
      <fieldset className="space-y-5">
        <legend className="mb-1 text-lg font-display text-plum-900">How can we help?</legend>
        <ChoiceGroup name="audiences" label="Who is the session for?" options={AUDIENCES} columns={2} required />
        <Grid>
          <SelectField name="support" label="What kind of support would you like?" options={OUTREACH_SUPPORT} required />
          <SelectField name="participants" label="Estimated number of participants" options={PARTICIPANT_RANGES} required />
        </Grid>
        <TextField
          name="preferredDates"
          label="Preferred dates or timeframe"
          hint="e.g. 'A Saturday in March' or 'During our youth week'"
          required
          maxLength={300}
        />
        <TextArea
          name="logistics"
          label="Anything else that would help us plan"
          hint="Venue, timings, languages, accessibility needs or what prompted your request. Please don't include information about individuals."
          maxLength={2000}
        />
      </fieldset>
      <div className="space-y-3">
        <Acknowledge name="noPersonalInfo">
          I confirm this request does not include anyone&apos;s names or personal details, or any disclosures of abuse.
        </Acknowledge>
        <PrivacyAck />
      </div>
      <SubmitButton size="lg">Send invitation</SubmitButton>
    </ActionForm>
  )
}

export function VolunteerForm({ token }: { token: string }) {
  return (
    <ActionForm action={submitVolunteerEnquiry} token={token} id="volunteer">
      <RequiredNote />
      <Grid>
        <TextField name="name" label="Full name" required autoComplete="name" />
        <TextField name="email" label="Email" type="email" required autoComplete="email" />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" />
        <TextField name="location" label="City or area" required />
      </Grid>
      <ChoiceGroup name="areas" label="How would you like to help?" options={VOLUNTEER_AREAS} columns={2} required />
      <TextField
        name="background"
        label="Relevant professional background"
        hint="A short line is enough — e.g. 'Primary teacher', 'Registered counsellor'. Please don't upload or share documents at this stage."
        maxLength={500}
      />
      <TextField name="availability" label="Availability" hint="e.g. weekends, school holidays, a few hours a month" maxLength={300} />
      <TextArea name="message" label="Anything else you'd like us to know" rows={4} maxLength={1500} />
      <div className="space-y-3">
        <Acknowledge name="screeningAcknowledged">
          I understand that submitting this enquiry <strong>does not</strong> authorise me to work with children or
          represent Restored Bloom. Any role involving children requires screening, references and approval first.
        </Acknowledge>
        <PrivacyAck />
      </div>
      <SubmitButton size="lg">Send volunteer enquiry</SubmitButton>
    </ActionForm>
  )
}

export function PartnerForm({ token }: { token: string }) {
  return (
    <ActionForm action={submitPartnerEnquiry} token={token} id="partner">
      <RequiredNote />
      <Grid>
        <TextField name="organisation" label="Organisation name" required autoComplete="organization" />
        <SelectField name="organisationType" label="Type of organisation" options={ORGANISATION_TYPES} required />
        <TextField name="name" label="Contact name" required autoComplete="name" />
        <TextField name="role" label="Your role" required />
        <TextField name="email" label="Email" type="email" required autoComplete="email" />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" />
      </Grid>
      <TextField name="website" label="Website" type="url" placeholder="https://" />
      <ChoiceGroup name="interests" label="Areas of interest" options={PARTNERSHIP_INTERESTS} columns={2} required />
      <TextArea
        name="message"
        label="Tell us briefly about your organisation and the partnership you have in mind"
        required
        maxLength={2000}
      />
      <PrivacyAck />
      <SubmitButton size="lg">Send partnership enquiry</SubmitButton>
    </ActionForm>
  )
}

export function SponsorForm({ token }: { token: string }) {
  return (
    <ActionForm action={submitSponsorEnquiry} token={token} id="sponsor">
      <RequiredNote />
      <ChoiceGroup name="sponsorType" label="I am enquiring as" type="radio" options={SPONSOR_TYPES} required />
      <Grid>
        <TextField name="name" label="Your name" required autoComplete="name" />
        <TextField name="organisation" label="Organisation" autoComplete="organization" />
        <TextField name="email" label="Email" type="email" required autoComplete="email" />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" />
      </Grid>
      <ChoiceGroup name="interests" label="What would you like to support?" options={SPONSORSHIP_INTERESTS} columns={2} required />
      <TextArea name="message" label="Anything else you'd like to tell us" rows={4} maxLength={1500} />
      <p className="text-sm text-plum-600">
        This is an enquiry only. No payment is taken through this website.
      </p>
      <PrivacyAck />
      <SubmitButton size="lg">Send sponsorship enquiry</SubmitButton>
    </ActionForm>
  )
}

export function ContactForm({ token }: { token: string }) {
  return (
    <ActionForm action={submitContactEnquiry} token={token} id="contact">
      <Notice tone="warning" title="This form is for general enquiries only">
        It is not monitored as an emergency response channel. Please don&apos;t include detailed accounts of abuse. If
        anyone is in immediate danger, contact local emergency services. See{" "}
        <Link href="/support" className="font-semibold underline underline-offset-2">
          finding support
        </Link>
        .
      </Notice>
      <RequiredNote />
      <Grid>
        <TextField name="name" label="Name" required autoComplete="name" />
        <TextField name="email" label="Email" type="email" required autoComplete="email" />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" />
        <SelectField name="topic" label="Topic" options={CONTACT_TOPICS} required />
      </Grid>
      <TextArea name="message" label="Message" required maxLength={2000} rows={6} />
      <PrivacyAck />
      <SubmitButton size="lg">Send message</SubmitButton>
    </ActionForm>
  )
}

export function EventRegistrationForm({ token, eventId, placesLeft }: { token: string; eventId: string; placesLeft: number | null }) {
  return (
    <ActionForm action={submitEventRegistration} token={token} id="register">
      <input type="hidden" name="eventId" value={eventId} />
      {placesLeft !== null && (
        <p className="text-sm font-medium text-plum-700">
          {placesLeft} {placesLeft === 1 ? "place" : "places"} remaining
        </p>
      )}
      <RequiredNote />
      <div className="grid gap-5">
        <TextField name="name" label="Full name" required autoComplete="name" />
        <TextField name="email" label="Email" type="email" required autoComplete="email" />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" />
        <TextField name="organisation" label="Organisation, school or church" autoComplete="organization" />
        <SelectField name="role" label="Which best describes you?" options={ATTENDEE_ROLES} placeholder="Prefer not to say" />
      </div>
      <Acknowledge name="privacy">
        I agree to Restored Bloom using these details to manage my registration, as described in the{" "}
        <Link href="/policies/privacy" className="font-semibold text-rose-700 underline underline-offset-2" target="_blank">
          privacy notice
        </Link>
        .
      </Acknowledge>
      <SubmitButton size="lg" className="w-full" pendingLabel="Registering…">
        Register
      </SubmitButton>
    </ActionForm>
  )
}

export function NewsletterForm({ token }: { token: string }) {
  return (
    <ActionForm action={submitNewsletter} token={token} id="newsletter" className="space-y-4">
      <TextField name="email" label="Email address" type="email" required autoComplete="email" />
      <Acknowledge name="consent">{NEWSLETTER_CONSENT_TEXT}</Acknowledge>
      <SubmitButton variant="rose">Sign up</SubmitButton>
    </ActionForm>
  )
}
