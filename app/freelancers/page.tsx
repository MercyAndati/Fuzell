"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MapPin, Star, DollarSign, ArrowLeft, MessageSquare } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Freelancer {
  id: string
  name: string
  title: string
  location: string
  hourlyRate: number
  rating: number
  completedJobs: number
  skills: string[]
  description: string
  avatar?: string
}

export default function FreelancersPage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchFreelancers()
  }, [])

  const fetchFreelancers = async () => {
    // Mock freelancers data
    const mockFreelancers: Freelancer[] = [
      {
        id: "1",
        name: "John Doe",
        title: "Full-Stack React Developer",
        location: "Remote",
        hourlyRate: 75,
        rating: 4.9,
        completedJobs: 24,
        skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
        description:
          "Experienced full-stack developer with 5+ years building modern web applications. Specialized in React ecosystem and scalable backend solutions.",
      },
      {
        id: "2",
        name: "Sarah Wilson",
        title: "UI/UX Designer",
        location: "New York, NY",
        hourlyRate: 65,
        rating: 4.8,
        completedJobs: 18,
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Mobile Design"],
        description:
          "Creative designer focused on user-centered design. Expert in creating intuitive interfaces and seamless user experiences.",
      },
      {
        id: "3",
        name: "Alex Johnson",
        title: "Python Data Scientist",
        location: "San Francisco, CA",
        hourlyRate: 85,
        rating: 4.9,
        completedJobs: 31,
        skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "AWS"],
        description:
          "Data scientist with expertise in machine learning and predictive analytics. Proven track record in delivering data-driven solutions.",
      },
      {
        id: "4",
        name: "Emily Chen",
        title: "Mobile App Developer",
        location: "Remote",
        hourlyRate: 70,
        rating: 4.7,
        completedJobs: 15,
        skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
        description:
          "Mobile app developer specializing in cross-platform solutions. Expert in creating high-performance mobile applications.",
      },
    ]

    setFreelancers(mockFreelancers)
    setIsLoading(false)
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      fetchFreelancers()
      return
    }

    const filtered = freelancers.filter(
      (freelancer) =>
        freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        freelancer.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    setFreelancers(filtered)
    toast({
      title: "Search Complete",
      description: `Found ${filtered.length} matching freelancers`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Browse Freelancers</h1>
              <p className="text-gray-600">Find talented professionals for your projects</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, skills, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Freelancers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {freelancers.map((freelancer) => (
            <Card key={freelancer.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {freelancer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{freelancer.name}</CardTitle>
                    <CardDescription className="text-base font-medium text-gray-700">
                      {freelancer.title}
                    </CardDescription>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {freelancer.location}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {freelancer.rating} ({freelancer.completedJobs} jobs)
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />${freelancer.hourlyRate}/hr
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">{freelancer.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                  {freelancer.skills.length > 4 && (
                    <Badge variant="outline">+{freelancer.skills.length - 4} more</Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">View Profile</Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {freelancers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No freelancers found</h3>
              <p className="text-gray-600">Try adjusting your search terms to find more freelancers.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
