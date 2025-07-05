"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, FileText, MessageSquare, DollarSign, Briefcase, Clock, Eye, LogOut, Trash2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function ClientDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [stats, setStats] = useState({
    activeJobs: 3,
    totalSpent: 8750,
    completedProjects: 8,
    activeFreelancers: 5,
  })

  const activeJobs = [
    {
      id: "1",
      title: "Full-Stack Web Application Development",
      proposals: 12,
      budget: 3000,
      postedAt: "2024-01-10",
      status: "Active",
    },
    {
      id: "2",
      title: "Mobile App UI/UX Design",
      proposals: 8,
      budget: 1500,
      postedAt: "2024-01-08",
      status: "In Progress",
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
          <p className="text-gray-600">Manage your projects and find the perfect freelancers</p>
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
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">2 awaiting proposals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSpent}</div>
            <p className="text-xs text-muted-foreground">Across {stats.completedProjects} projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedProjects}</div>
            <p className="text-xs text-muted-foreground">100% satisfaction rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Freelancers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeFreelancers}</div>
            <p className="text-xs text-muted-foreground">Working on your projects</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your projects efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/jobs/post" className="block">
              <Button className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </Link>
            <Link href="/freelancers" className="block">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Browse Freelancers
              </Button>
            </Link>
            <Link href="/proposals" className="block">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Review Proposals
              </Button>
            </Link>
            <Link href="/chat" className="block">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Active Jobs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Active Jobs</CardTitle>
            <CardDescription>Monitor your posted jobs and proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{job.title}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
                      <span className="text-sm text-gray-500">
                        <Users className="inline h-3 w-3" />
                        {job.proposals} proposals
                      </span>
                      <span className="text-sm text-gray-500">
                        <DollarSign className="inline h-3 w-3" />${job.budget}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Clock className="inline h-3 w-3" />
                        Posted: {job.postedAt}
                      </span>
                    </div>
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Job
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
