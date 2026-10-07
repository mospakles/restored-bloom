/**
 * Draft copy for editable pages. Shown until an editor saves a version in the
 * dashboard. Every page is flagged "awaiting review" on the public site until
 * someone with content permissions records a founder/professional review.
 */

export type EditablePageSlug = "privacy" | "safeguarding" | "terms" | "accessibility" | "support"

export const EDITABLE_PAGES: Record<EditablePageSlug, { title: string; path: string; body: string }> = {
  privacy: {
    title: "Privacy notice",
    path: "/policies/privacy",
    body: `This notice explains how Restored Bloom ("we", "us") collects and uses personal information through this website. It is a **draft** and must be reviewed by the founder and an appropriately qualified adviser, including against the Nigeria Data Protection Act 2023, before launch.

## Who we are

Restored Bloom is a foundation based in Lagos, Nigeria, founded by Motunrayo Odusina. Contact details for privacy questions are listed on our [contact page](/contact).

## What we collect

We only collect what we need to respond to you:

- **Enquiry forms** (invitations, volunteer, partner, sponsor and general contact): your name, contact details, organisation and the information you choose to provide about your enquiry.
- **Event registrations**: your name, email address, and optionally your phone number, organisation and role.
- **Newsletter**: your email address and a record of your consent.
- **Technical data**: to protect our forms from abuse, we keep a short-lived, one-way scrambled (hashed) version of your IP address. We do not store your raw IP address with your submission.

We ask you **not** to include children's names, personal details about children, or detailed accounts of abuse in any form. Our forms are not designed to receive this information.

## How we use it

- To reply to your enquiry and arrange any follow-up you have asked for.
- To manage event places and send event information.
- To send newsletter updates, only if you have confirmed you want them.
- To keep our website secure.

We do not sell your information or use it for advertising.

## Who can see it

Only authorised Restored Bloom team members whose role requires it can view submissions. Access is protected by individual accounts and recorded in an audit log. We use service providers for website hosting, database storage and email delivery; they process data on our behalf.

## How long we keep it

We keep enquiry records only as long as needed to handle them, and periodically delete closed enquiries (currently after the retention period set by our administrators). You can unsubscribe from the newsletter at any time using the link in every email.

## Your rights

You can ask to see, correct or delete the personal information we hold about you, or object to how we use it. Contact us using the details on our contact page.

## Analytics

If website analytics are enabled, they are only loaded after you agree, never run on staff pages, and never record what you type into forms.

_Last updated: draft — awaiting review._`,
  },
  safeguarding: {
    title: "Safeguarding statement",
    path: "/policies/safeguarding",
    body: `Restored Bloom exists to help children and young people be safer. This statement sets out our commitments. It is a **draft summary** and must be developed into a full safeguarding policy with input from qualified safeguarding professionals before any programme delivery begins.

## Our commitments

- The welfare of children and young people is paramount in everything we do.
- **Keeping children safe is the responsibility of adults.** Our sessions help children recognise unsafe situations and seek help — they never place responsibility on children to prevent abuse.
- All materials are age-appropriate and non-graphic.
- Whenever children take part, responsible adults from the hosting school, faith community or organisation are present throughout, and the host's own safeguarding arrangements apply.
- Anyone delivering sessions with children must be screened and approved by Restored Bloom first. Submitting a volunteer enquiry does not give anyone permission to work with children.
- We do not photograph or film children during sessions, and we never publish identifying images or stories of children or survivors.

## If a child discloses abuse during a session

Our facilitators are briefed to listen calmly, reassure the child, avoid leading questions, and pass the concern immediately to the hosting organisation's designated safeguarding lead (or, where there is none, to the appropriate authorities), following applicable procedures and law. We do not investigate concerns ourselves.

## What this website is not

This website is not an emergency service and is not a channel for reporting abuse. Our forms are not monitored around the clock. If a child or anyone else is in immediate danger, contact local emergency services straight away. See [finding support](/support) for more information.

## Raising a concern about us

If you have a concern about the conduct of anyone representing Restored Bloom, please contact the founder directly using the details on our [contact page](/contact).

_Last updated: draft — awaiting professional review._`,
  },
  terms: {
    title: "Website terms of use",
    path: "/policies/terms",
    body: `These terms apply to your use of the Restored Bloom website. They are a **draft** and should be reviewed by a qualified legal adviser before launch.

## Information on this website

Content on this site is provided for general awareness and education. It is not medical, psychological or legal advice, and it is not a substitute for help from a qualified professional. While we work to keep information accurate and age-appropriate, we cannot guarantee that everything is complete or up to date.

## Not an emergency service

Restored Bloom does not provide emergency, medical or counselling services. Our forms are for general enquiries only and are not monitored as an emergency response channel.

## Acceptable use

Please do not use our forms to send abusive, unlawful or misleading content, or to submit personal information about other people (especially children) without their knowledge. We may block submissions that appear automated or abusive.

## Links to other websites

Where we link to other organisations, we do so for information only. A link does not mean a formal partnership unless we say so explicitly.

## Intellectual property

Unless stated otherwise, content on this site belongs to Restored Bloom. You may share downloadable resources for non-commercial educational use, with credit.

## Changes

We may update these terms. The current version will always be on this page.

_Last updated: draft — awaiting review._`,
  },
  accessibility: {
    title: "Accessibility statement",
    path: "/policies/accessibility",
    body: `We want everyone to be able to use this website, including people who use assistive technology.

## What we have done

- Pages use clear headings, landmarks and labelled form fields.
- The site can be used with a keyboard, and focus is always visible.
- Text and background colours are chosen to meet WCAG 2.2 AA contrast guidance.
- Animations are gentle and switched off if your device asks for reduced motion.
- Layouts adapt to phones, tablets and desktops, and to text zoom up to 200%.

## Known limitations

This statement is a **draft**. A full accessibility review, including testing with screen reader users, has not yet been completed. Some downloadable documents may not yet be fully accessible.

## Feedback

If you find something difficult to use, please tell us through the [contact page](/contact) (choose "Website feedback or accessibility"). We will try to provide the information in another format.

_Last updated: draft — awaiting review._`,
  },
  support: {
    title: "Finding support",
    path: "/support",
    body: `## If someone is in immediate danger

Contact local emergency services or go to the nearest hospital straight away. Restored Bloom is not an emergency service and cannot respond to emergencies through this website.

## If you are a child or young person

What happened is **not your fault**. You deserve to be safe. Tell a trusted adult — a parent, relative, teacher, school counsellor or faith leader. If the first person doesn't help, keep telling until someone does.

## If you are a survivor

Whatever happened, and however long ago, you deserve support, dignity and care. You get to decide when and how you seek help. Qualified professionals — such as counsellors, doctors and specialist support organisations — can help you think through your options.

## If a child tells you something worrying

- Stay calm and listen.
- Reassure them that telling you was the right thing to do and that it is not their fault.
- Don't ask leading questions or promise to keep it secret.
- Write down what they said, in their words, as soon as you can.
- Report your concern to the appropriate authorities or your organisation's safeguarding lead.

## Please don't use our forms to report abuse

Our website forms are for general enquiries only. They are not monitored around the clock and are not a way to report abuse. Please contact emergency services or a specialist organisation instead.`,
  },
}
