import { FAQ, Resource, Story, Testimonial } from "@/types"

export const SITE_CONFIG = {
  name: "Restored Bloom",
  tagline: "Healing Begins Here.",
  description:
    "A safe, compassionate, faith-centered platform dedicated to helping survivors of sexual abuse, individuals struggling with sexual health challenges, and vulnerable families seeking healing.",
  url: "https://havenofgrace.org",
  email: "support@havenofgrace.org",
  emergencyEmail: "crisis@havenofgrace.org",
  phone: "+234-800-HAVEN-01",
  social: {
    twitter: "https://twitter.com/havenofgrace",
    instagram: "https://instagram.com/havenofgrace",
    facebook: "https://facebook.com/havenofgrace",
    youtube: "https://youtube.com/@havenofgrace",
  },
}

export const CRISIS_LINES = [
  { country: "Nigeria", number: "0800-CALL-NAPTIP", organization: "NAPTIP Helpline" },
  { country: "UK", number: "0808 500 2222", organization: "Rape Crisis England & Wales" },
  { country: "US", number: "1-800-656-4673", organization: "RAINN National Sexual Assault Hotline" },
  { country: "South Africa", number: "0800 428 428", organization: "TEARS Foundation" },
  { country: "International", number: "112 / 999 / 911", organization: "Emergency Services" },
]

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  {
    label: "Get Help",
    href: "/get-help",
    children: [
      { label: "Sexual Abuse Support", href: "/sexual-abuse-support" },
      { label: "Women's Sexual Health", href: "/womens-health" },
      { label: "Teen Support", href: "/teen-support" },
      { label: "Parent Resources", href: "/parent-resources" },
      { label: "Anonymous Help Request", href: "/get-help#anonymous" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "All Resources", href: "/resources" },
      { label: "Faith & Healing", href: "/faith-healing" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Stories", href: "/anonymous-stories" },
  { label: "Volunteer", href: "/volunteer" },
]

export const STATISTICS = [
  { value: "1 in 4", label: "Women experience sexual violence in their lifetime", icon: "Users" },
  { value: "93%", label: "Of victims know their perpetrator", icon: "Heart" },
  { value: "30%", label: "Of cases are ever reported to authorities", icon: "AlertCircle" },
  { value: "100%", label: "Of survivors deserve compassion and support", icon: "Sparkles" },
]

export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "I never thought I would speak about what happened. Finding this space gave me the courage to acknowledge my pain, and for the first time, I felt truly believed and supported.",
    author: "Anonymous Survivor",
    role: "Adult Survivor",
  },
  {
    id: "2",
    quote:
      "As a mother who missed the signs, I carry deep guilt. This community helped me understand it wasn't my fault and taught me how to protect my children going forward.",
    author: "Anonymous",
    role: "Parent",
  },
  {
    id: "3",
    quote:
      "I'm a male survivor and I thought no one would understand. This place showed me I'm not less of a man for what happened to me, and that healing is available for me too.",
    author: "Anonymous",
    role: "Male Survivor",
  },
]

export const SAMPLE_STORIES: Story[] = [
  {
    id: "1",
    content:
      "I never thought I would speak about what happened to me. For years I carried the weight in silence, convinced that nobody would believe me or that I was somehow responsible. Finding Restored Bloom changed everything. For the first time I felt truly heard and not judged. The resources helped me understand that what happened was not my fault, and the counsellor they connected me with helped me begin to heal.",
    author_alias: "A Survivor",
    category: "adult-survivor",
    is_anonymous: true,
    is_published: true,
    trigger_warning: true,
    helpful_count: 47,
    created_at: "2024-11-15",
  },
  {
    id: "2",
    content:
      "As a parent, discovering that my child had been abused was the most devastating moment of my life. I blamed myself terribly. The parent resources on this platform helped me understand the signs I had missed and how to support my child's healing. The community here reminded me that I was not alone.",
    author_alias: "A Mother",
    category: "parent",
    is_anonymous: true,
    is_published: true,
    trigger_warning: false,
    helpful_count: 63,
    created_at: "2024-10-22",
  },
  {
    id: "3",
    content:
      "Society told me that men don't get abused, or that if they do, they should just get over it. For a long time I believed that lie. This platform was the first place I found that acknowledged my experience as valid. Healing is slow but it is real. You are not alone, brother.",
    author_alias: "A Brother",
    category: "male-survivor",
    is_anonymous: true,
    is_published: true,
    trigger_warning: false,
    helpful_count: 91,
    created_at: "2024-09-08",
  },
  {
    id: "4",
    content:
      "My faith was the only thing that held me together, but I also felt like God had abandoned me. The faith-based resources here helped me reconcile my pain with my beliefs. I found that God had not left me, He had been with me through every dark moment, even when I could not feel Him.",
    author_alias: "Restored",
    category: "faith-journey",
    is_anonymous: true,
    is_published: true,
    trigger_warning: false,
    helpful_count: 38,
    created_at: "2024-08-14",
  },
]

export const SAMPLE_RESOURCES: Resource[] = [
  {
    id: "1",
    title: "Understanding Your Trauma Response",
    slug: "understanding-trauma-response",
    excerpt:
      "Why your mind and body react the way they do, and how healing begins with understanding, not shame.",
    content: "",
    category: "survivors",
    tags: ["trauma", "healing", "education"],
    read_time: 8,
    published: true,
    featured: true,
    created_at: "2024-11-01",
    updated_at: "2024-11-01",
  },
  {
    id: "2",
    title: "When Faith Meets Pain: Finding God in the Darkness",
    slug: "faith-meets-pain",
    excerpt: "A devotional guide for survivors navigating spiritual questions after abuse and trauma.",
    content: "",
    category: "faith",
    tags: ["faith", "healing", "devotional"],
    read_time: 12,
    published: true,
    featured: true,
    created_at: "2024-10-15",
    updated_at: "2024-10-15",
  },
  {
    id: "3",
    title: "Recognizing Signs of Abuse in Children",
    slug: "recognizing-signs-abuse-children",
    excerpt:
      "A compassionate guide to behavioral changes, warning signs, and how to create safe conversations with your child.",
    content: "",
    category: "parents",
    tags: ["parents", "children", "protection"],
    read_time: 10,
    published: true,
    featured: false,
    created_at: "2024-09-20",
    updated_at: "2024-09-20",
  },
  {
    id: "4",
    title: "What Healthy Relationships Actually Look Like",
    slug: "healthy-relationships-teenagers",
    excerpt: "Understanding consent, setting boundaries, and recognizing red flags, written for teenagers.",
    content: "",
    category: "teenagers",
    tags: ["teens", "relationships", "consent"],
    read_time: 7,
    published: true,
    featured: false,
    created_at: "2024-08-10",
    updated_at: "2024-08-10",
  },
  {
    id: "5",
    title: "Rebuilding Trust After Betrayal",
    slug: "rebuilding-trust-after-betrayal",
    excerpt: "Practical, gentle steps for adult survivors learning to trust themselves and others again.",
    content: "",
    category: "survivors",
    tags: ["recovery", "trust", "healing"],
    read_time: 9,
    published: true,
    featured: false,
    created_at: "2024-07-05",
    updated_at: "2024-07-05",
  },
  {
    id: "6",
    title: "Your Body, Your Worth: Women's Intimate Health",
    slug: "womens-intimate-health",
    excerpt: "Shame-free information on reproductive health, sexual wellness, and emotional healing.",
    content: "",
    category: "women",
    tags: ["women", "health", "wellness"],
    read_time: 11,
    published: true,
    featured: true,
    created_at: "2024-06-18",
    updated_at: "2024-06-18",
  },
]

export const SAMPLE_FAQS: FAQ[] = [
  {
    id: "1",
    question: "Is everything I share on this platform completely confidential?",
    answer:
      "Yes. Your privacy and safety are our highest priority. All submissions are protected and we will never share your information with anyone without your explicit consent. Anonymous submissions leave no identifying trace.",
    category: "privacy",
    order: 1,
  },
  {
    id: "2",
    question: "Can I really get help without revealing my identity?",
    answer:
      "Absolutely. Our Anonymous Help Center is designed specifically for this. You can submit a request, share your story, or ask questions without providing any identifying information. We generate a secure reference code for your submission so you can check on its status without sharing your contact details.",
    category: "anonymous",
    order: 2,
  },
  {
    id: "3",
    question: "I'm a man. Is this platform for me?",
    answer:
      "Yes, completely. Sexual abuse and trauma affect people of all genders. We explicitly support male survivors and provide resources specific to male experiences. You are seen, valued, and welcome here.",
    category: "who-we-serve",
    order: 3,
  },
  {
    id: "4",
    question: "Do I need to be religious or Christian to use this platform?",
    answer:
      "No. While Restored Bloom is faith-inspired, we warmly welcome people of all faiths and no faith. Our faith section is optional, and all other resources, support, and community spaces are available to everyone.",
    category: "faith",
    order: 4,
  },
  {
    id: "5",
    question: "How quickly will I receive a response to my help request?",
    answer:
      "We aim to respond to all requests within 48 hours. For urgent situations, please use the Emergency Resources section which connects you to crisis lines available 24/7.",
    category: "support",
    order: 5,
  },
  {
    id: "6",
    question: "Are the counsellors and therapists on this platform qualified?",
    answer:
      "Yes. All professionals we refer to or feature in our directory are vetted, qualified, and hold relevant licenses in their jurisdictions. We prioritize trauma-informed practitioners who understand the specific needs of survivors.",
    category: "counseling",
    order: 6,
  },
]

export const SUPPORT_CATEGORIES = [
  {
    title: "Sexual Abuse Support",
    description: "Confidential, trauma-informed support for all survivors regardless of age, gender, or background.",
    href: "/sexual-abuse-support",
    icon: "Shield",
    color: "teal",
    items: ["Children & Teen Support", "Adult Survivors", "Male Survivors", "Crisis Guidance"],
  },
  {
    title: "Women's Sexual Health",
    description: "Honest, shame-free sexual health information rooted in dignity and respect.",
    href: "/womens-health",
    icon: "Heart",
    color: "lavender",
    items: ["Intimate Health Education", "STI Awareness", "Reproductive Health", "Relationship Wellness"],
  },
  {
    title: "Counselling & Therapy",
    description: "Referrals to qualified professionals who understand trauma, faith, and cultural context.",
    href: "/resources",
    icon: "Users",
    color: "blush",
    items: ["Licensed Therapists", "Trauma Specialists", "Faith-Based Counsellors", "Support Groups"],
  },
  {
    title: "Anonymous Help Center",
    description: "Submit questions, request help, or share your story without revealing your identity.",
    href: "/get-help",
    icon: "Lock",
    color: "sage",
    items: ["Anonymous Submissions", "Confidential Requests", "Story Sharing", "Guided Support"],
  },
]

export const VALUES = [
  { title: "Compassion", description: "Every person is met with warmth, not judgment.", icon: "Heart" },
  { title: "Confidentiality", description: "Your trust is sacred. We protect it absolutely.", icon: "Lock" },
  { title: "Safety", description: "Physical, emotional, and digital safety are non-negotiable.", icon: "Shield" },
  { title: "Integrity", description: "We operate with honesty, accountability, and transparency.", icon: "Star" },
  { title: "Advocacy", description: "We stand with survivors and advocate for systemic change.", icon: "Megaphone" },
  { title: "Hope", description: "We believe healing is possible for every story.", icon: "Sunrise" },
  { title: "Faith", description: "Rooted in faith, welcoming to all backgrounds.", icon: "Sparkles" },
]
