/**
 * Public site copy that does not change often. Copy here is DRAFT launch copy
 * written for founder review, see LAUNCH_CHECKLIST.md. Contact details,
 * founder biography, programme status, policies and support contacts are
 * editable in the admin dashboard instead.
 */

export const SITE = {
  name: "Restored Bloom",
  tagline: "Creating safe spaces. Restoring hope. Helping lives bloom.",
  description:
    "Restored Bloom is a Lagos-based foundation for sexual abuse awareness, prevention education and survivor support, ready to bring age-appropriate outreach to schools, faith communities, organisations and communities wherever help is needed.",
  founder: "Motunrayo Odusina",
  city: "Lagos, Nigeria",
} as const

export const NAV = [
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Invite Us", href: "/invite-us" },
  { label: "Resources", href: "/resources" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "/get-involved" },
] as const

export const FOOTER_LINKS = {
  "The foundation": [
    { label: "About us", href: "/about" },
    { label: "Our programmes", href: "/programmes" },
    { label: "Invite us", href: "/invite-us" },
    { label: "Events", href: "/events" },
  ],
  "Take part": [
    { label: "Get involved", href: "/get-involved" },
    { label: "Support our work", href: "/support-our-work" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
  "Help & policies": [
    { label: "Finding support", href: "/support" },
    { label: "Safeguarding", href: "/policies/safeguarding" },
    { label: "Privacy", href: "/policies/privacy" },
    { label: "Website terms", href: "/policies/terms" },
    { label: "Accessibility", href: "/policies/accessibility" },
  ],
} as const

// ─── Programmes ──────────────────────────────────────────────────────────────

export type ProgrammeStatus = "planned" | "piloting" | "operating"

export const PROGRAMME_STATUS_LABELS: Record<ProgrammeStatus, string> = {
  planned: "Planned",
  piloting: "Pilot stage",
  operating: "Running now",
}

export type Programme = {
  id: string
  title: string
  short: string
  audience: string
  summary: string
  topics: string[]
  format: string
  icon: "seedling" | "leaf" | "people" | "community" | "heart"
}

export const PROGRAMMES: Programme[] = [
  {
    id: "primary",
    title: "Body-safety awareness for children",
    short: "Gentle, age-appropriate sessions that help younger children understand body safety.",
    audience: "Children of primary-school age, in schools, churches, mosques, clubs and community programmes, with their own trusted adults present",
    summary:
      "Short, interactive sessions using stories, songs and simple activities. Children learn that their bodies belong to them, that some secrets should never be kept, and that safe adults will always want to help.",
    topics: [
      "Naming body parts and understanding privacy",
      "Safe and unsafe touch, explained without fear",
      "The difference between surprises and secrets",
      "Identifying trusted adults at home, at school and in their community",
      "How to tell someone, and to keep telling until someone helps",
    ],
    format: "30–45 minute interactive sessions, adapted by age group and setting",
    icon: "seedling",
  },
  {
    id: "secondary",
    title: "Awareness for teenagers and young people",
    short: "Honest, respectful conversations with teenagers and young adults about consent, boundaries and help-seeking.",
    audience: "Secondary-school students, youth fellowships, youth clubs and young adults",
    summary:
      "Discussion-based sessions that treat young people with respect. Students explore healthy relationships, consent and online safety, and learn where and how to seek help for themselves or a friend.",
    topics: [
      "Personal boundaries and consent",
      "Healthy and unhealthy relationships",
      "Recognising grooming, pressure and manipulation, online and offline",
      "How to support a friend who confides in you",
      "Where to seek help, and what happens when you do",
    ],
    format: "45–60 minute sessions, with separate small-group options where appropriate",
    icon: "leaf",
  },
  {
    id: "parents-educators",
    title: "Parent and educator sensitisation",
    short: "Equipping the adults around children to prevent, notice and respond well.",
    audience: "Parents, caregivers, teachers, youth workers, faith leaders and others who work with children",
    summary:
      "Keeping children safe is always the responsibility of adults. These sessions help parents, educators and anyone who works with children understand warning signs, talk openly with children, and respond calmly and appropriately if a child discloses abuse.",
    topics: [
      "Understanding how abuse happens and common warning signs",
      "Talking to children about body safety at home",
      "Responding to a disclosure: listen, reassure, report",
      "Creating safer homes, schools, churches, mosques and youth spaces",
      "Knowing the appropriate reporting routes",
    ],
    format: "60–90 minute workshops for PTA meetings, staff training days, faith and community groups",
    icon: "people",
  },
  {
    id: "community",
    title: "Community and organisation awareness",
    short: "Breaking silence and stigma in faith communities, workplaces, youth groups and the wider community.",
    audience: "Faith communities, residents' associations, youth groups, organisations, workplaces and the public",
    summary:
      "Abuse thrives in silence. Community sessions encourage open, compassionate conversations, challenge harmful myths, and help communities stand with survivors rather than against them.",
    topics: [
      "Challenging myths and victim-blaming",
      "How communities can protect children",
      "Supporting survivors with dignity",
      "Signposting to appropriate services",
    ],
    format: "Talks, workshops, staff briefings and awareness events, arranged with the hosting organisation",
    icon: "community",
  },
  {
    id: "survivor-support",
    title: "Survivor support and referral partnerships",
    short: "Working towards trusted referral pathways to qualified professional support.",
    audience: "Survivors of sexual abuse and the people who support them",
    summary:
      "Restored Bloom is not a counselling, medical or emergency service. Our aim is to build relationships with qualified, verified organisations so that people who reach out can be pointed towards appropriate, professional help. Referral partners will only be listed once relationships have been confirmed.",
    topics: [
      "Identifying and verifying qualified support organisations",
      "Clear, respectful signposting information",
      "Awareness of survivors' dignity, choice and confidentiality",
    ],
    format: "Partnership development - no direct clinical services are offered",
    icon: "heart",
  },
]

export const OUTREACH_STEPS = [
  {
    title: "Send an invitation",
    body: "Tell us who you are, who the session is for and the dates you have in mind. No personal details about individuals are needed.",
  },
  {
    title: "Planning conversation",
    body: "We talk with your contact person to understand your audience and agree goals, content, timings and safeguarding arrangements.",
  },
  {
    title: "Preparing together",
    body: "We share session outlines in advance, agree how any concerns will be handled, and for sessions with children, make sure parents are informed.",
  },
  {
    title: "Delivery",
    body: "Sessions are delivered with age-appropriate, non-graphic materials. When children take part, responsible adults from your organisation are present throughout.",
  },
  {
    title: "Follow-up",
    body: "We share follow-up resources and information on where to find help, and invite feedback so each session can improve.",
  },
] as const

/** The kinds of places Restored Bloom can be invited to. */
export const WHERE_WE_HELP = [
  { icon: "school", title: "Schools", body: "Primary and secondary schools, colleges and their parent communities." },
  { icon: "faith", title: "Faith communities", body: "Churches, mosques and faith groups, at services, youth meetings and family programmes." },
  { icon: "community", title: "Communities", body: "Residents' associations, community leaders, markets and town-hall gatherings." },
  { icon: "youth", title: "Youth groups", body: "Clubs, camps, youth fellowships and after-school programmes." },
  { icon: "workplace", title: "Organisations & workplaces", body: "NGOs, businesses and public bodies, with staff awareness and safeguarding briefings." },
  { icon: "family", title: "Families & parents", body: "Parents' groups, PTAs and caregivers who want to protect the children in their care." },
] as const

export const VALUES = [
  { title: "Safety first", body: "Every decision begins with the wellbeing of children and young people." },
  { title: "Dignity", body: "Survivors are treated with respect, belief and compassion, never as stories to be told." },
  { title: "Honesty", body: "We say clearly what we do, what we don't do, and what is still being built." },
  { title: "Hope", body: "Healing is possible. We hold space for hope without minimising pain." },
  { title: "Collaboration", body: "We work alongside schools, faith communities, families, organisations and qualified professionals rather than alone." },
] as const

export const RESOURCE_CATEGORY_LABELS = {
  CHILDREN: "For children",
  TEENAGERS: "For teenagers",
  PARENTS: "For parents & caregivers",
  EDUCATORS: "For educators",
  SURVIVORS: "For survivors",
} as const

export const RESOURCE_CATEGORY_SLUGS = {
  children: "CHILDREN",
  teenagers: "TEENAGERS",
  parents: "PARENTS",
  educators: "EDUCATORS",
  survivors: "SURVIVORS",
} as const
