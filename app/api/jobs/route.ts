import { type NextRequest, NextResponse } from "next/server"

// Mock jobs database
const jobs = [
  {
    _id: "1",
    title: "Full-Stack React Developer Needed",
    description:
      "We are looking for an experienced React developer to build a modern e-commerce platform. The project involves creating a responsive frontend with React, implementing user authentication, payment integration with Stripe, and building a robust backend API. The ideal candidate should have experience with Next.js, TypeScript, and modern development practices.",
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
      "Looking for a talented UI/UX designer to create beautiful and intuitive designs for our mobile application. The project includes user research, wireframing, prototyping, and creating high-fidelity designs. Experience with Figma and mobile design patterns is essential.",
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
      "We need a data scientist to help us build machine learning models for predictive analytics. The project involves data preprocessing, feature engineering, model training, and deployment. Experience with Python, scikit-learn, and cloud platforms is required.",
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

export async function GET() {
  try {
    return NextResponse.json({ jobs })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ message: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()

    const newJob = {
      _id: (jobs.length + 1).toString(),
      ...jobData,
      postedAt: new Date().toISOString(),
      proposals: 0,
    }

    jobs.push(newJob)

    return NextResponse.json({ job: newJob }, { status: 201 })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ message: "Failed to create job" }, { status: 500 })
  }
}
