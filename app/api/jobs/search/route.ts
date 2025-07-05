import { type NextRequest, NextResponse } from "next/server"

// Mock jobs database (same as in jobs/route.ts)
const jobs = [
  {
    _id: "1",
    title: "Full-Stack React Developer Needed",
    description:
      "We are looking for an experienced React developer to build a modern e-commerce platform. The project involves creating a responsive frontend with React, implementing user authentication, payment integration with Stripe, and building a robust backend API.",
    budget: 3000,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    location: "Remote",
    postedAt: "2024-01-10T10:00:00Z",
    client: {
      name: "Sarah Johnson",
      company: "TechCorp Inc.",
      email: "sarah@techcorp.com",
    },
    proposals: 12,
  },
  {
    _id: "2",
    title: "Mobile App UI/UX Designer",
    description:
      "Looking for a talented UI/UX designer to create beautiful and intuitive designs for our mobile application. The project includes user research, wireframing, prototyping, and creating high-fidelity designs.",
    budget: 1500,
    skills: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping"],
    location: "Remote",
    postedAt: "2024-01-08T14:30:00Z",
    client: {
      name: "Mike Chen",
      company: "StartupXYZ",
      email: "mike@startupxyz.com",
    },
    proposals: 8,
  },
  {
    _id: "3",
    title: "Python Data Scientist for ML Project",
    description:
      "We need a data scientist to help us build machine learning models for predictive analytics. The project involves data preprocessing, feature engineering, model training, and deployment.",
    budget: 2500,
    skills: ["Python", "Machine Learning", "Data Science", "TensorFlow", "AWS"],
    location: "Remote",
    postedAt: "2024-01-05T09:15:00Z",
    client: {
      name: "Dr. Emily Rodriguez",
      company: "DataTech Solutions",
      email: "emily@datatech.com",
    },
    proposals: 15,
  },
]

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ jobs })
    }

    // Simple text-based search since OpenAI API is not configured
    const searchTerms = query.toLowerCase().split(" ")

    const filteredJobs = jobs.filter((job) => {
      const searchableText = `${job.title} ${job.description} ${job.skills.join(" ")}`.toLowerCase()
      return searchTerms.some((term) => searchableText.includes(term))
    })

    // Sort by relevance (number of matching terms)
    const scoredJobs = filteredJobs
      .map((job) => {
        const searchableText = `${job.title} ${job.description} ${job.skills.join(" ")}`.toLowerCase()
        const score = searchTerms.reduce((acc, term) => {
          return acc + (searchableText.includes(term) ? 1 : 0)
        }, 0)
        return { ...job, score }
      })
      .sort((a, b) => b.score - a.score)

    return NextResponse.json({ jobs: scoredJobs })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ message: "Search failed" }, { status: 500 })
  }
}
