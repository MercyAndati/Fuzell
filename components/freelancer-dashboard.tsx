"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  FileText,
  MessageSquare,
  DollarSign,
  Star,
  TrendingUp,
  Briefcase,
  Clock,
  LogOut,
  Trash2,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function FreelancerDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [stats, setStats] = useState({
    activeProposals: 5,
    totalEarnings: 2450,
    completedJobs: 12,
    rating: 4.8,
    profileCompletion: 85,
  })

  const recentJobs = [
    {
      id: "1",
      title: "React Developer for E-commerce Platform",
      client: "TechCorp Inc.",
      status: "In Progress",
      budget: 1200,
      deadline: "2024-01-15",
    },
    {
      id: "2",
      title: "UI/UX Design for Mobile App",
      client: "StartupXYZ",
      status: "Completed",
      budget: 800,
      deadline: "2023-12-20",
    },
  ]

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      logout()
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
      })
      router.push("/")
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's what's happening with your freelancing journey</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProposals}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarnings}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedJobs}</div>
            <p className="text-xs text-muted-foreground">100% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rating}/5.0</div>
            <p className="text-xs text-muted-foreground">Based on {stats.completedJobs} reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get things done faster</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/jobs" className="block">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Find New Jobs
              </Button>
            </Link>
            <Link href="/proposals" className="block">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View My Proposals
              </Button>
            </Link>
            <Link href="/chat" className="block">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link href="/profile" className="block">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
            <CardDescription>Your latest project activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-600">Client: {job.client}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant={job.status === "Completed" ? "default" : "secondary"}>{job.status}</Badge>
                      <span className="text-sm text-gray-500">
                        <DollarSign className="inline h-3 w-3" />${job.budget}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Clock className="inline h-3 w-3" />
                        Due: {job.deadline}
                      </span>
                    </div>
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>A complete profile gets 3x more job invitations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm text-gray-600">{stats.profileCompletion}%</span>
            </div>
            <Progress value={stats.profileCompletion} className="w-full" />
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Add Portfolio</Badge>
              <Badge variant="outline">Upload Profile Photo</Badge>
              <Badge variant="outline">Add Skills Certification</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
