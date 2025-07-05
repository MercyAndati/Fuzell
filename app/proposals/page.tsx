"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, DollarSign, Clock, User } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Proposal {
  id: string
  jobId: string
  jobTitle: string
  proposal: string
  bidAmount: number
  submittedAt: string
  status: "pending" | "accepted" | "rejected"
  freelancer?: {
    name: string
    email: string
  }
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchProposals()
  }, [])

  const fetchProposals = async () => {
    try {
      const response = await fetch("/api/proposals")
      const data = await response.json()
      if (response.ok) {
        // Mock some additional data for display
        const mockProposals = [
          {
            id: "1",
            jobId: "1",
            jobTitle: "Full-Stack React Developer Needed",
            proposal: "I am excited to work on your e-commerce platform. With 5+ years of React experience...",
            bidAmount: 2800,
            submittedAt: "2024-01-11T10:00:00Z",
            status: "pending" as const,
            freelancer: {
              name: "John Doe",
              email: "john@example.com",
            },
          },
          {
            id: "2",
            jobId: "2",
            jobTitle: "Mobile App UI/UX Designer",
            proposal: "Your mobile app design project caught my attention. I specialize in creating intuitive...",
            bidAmount: 1200,
            submittedAt: "2024-01-09T14:30:00Z",
            status: "accepted" as const,
            freelancer: {
              name: "Alex Johnson",
              email: "alex@test.com",
            },
          },
        ]
        setProposals(mockProposals)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch proposals",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleProposalAction = async (proposalId: string, action: "accept" | "reject") => {
    try {
      // Mock API call - in real app, this would update the proposal status
      setProposals((prev) =>
        prev.map((p) => (p.id === proposalId ? { ...p, status: action === "accept" ? "accepted" : "rejected" } : p)),
      )

      toast({
        title: `Proposal ${action}ed`,
        description: `The proposal has been ${action}ed successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} proposal`,
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
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
      {/* Navigation Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {user?.role === "freelancer" ? "My Proposals" : "Review Proposals"}
              </h1>
              <p className="text-sm text-gray-600">
                {user?.role === "freelancer"
                  ? "Track your submitted proposals"
                  : "Review and manage proposals for your jobs"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {proposals.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
              <p className="text-gray-600 mb-4">
                {user?.role === "freelancer"
                  ? "Start applying to jobs to see your proposals here."
                  : "Proposals for your jobs will appear here."}
              </p>
              <Link href={user?.role === "freelancer" ? "/jobs" : "/jobs/post"}>
                <Button>{user?.role === "freelancer" ? "Browse Jobs" : "Post a Job"}</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <Card key={proposal.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{proposal.jobTitle}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-2">
                        {user?.role === "client" && proposal.freelancer && (
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {proposal.freelancer.name}
                          </span>
                        )}
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />${proposal.bidAmount}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(proposal.submittedAt).toLocaleDateString()}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        proposal.status === "accepted"
                          ? "default"
                          : proposal.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {proposal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">{proposal.proposal}</p>

                  {user?.role === "client" && proposal.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button onClick={() => handleProposalAction(proposal.id, "accept")} size="sm">
                        Accept Proposal
                      </Button>
                      <Button onClick={() => handleProposalAction(proposal.id, "reject")} variant="outline" size="sm">
                        Decline
                      </Button>
                    </div>
                  )}

                  {user?.role === "freelancer" && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Submitted on {new Date(proposal.submittedAt).toLocaleDateString()}
                      </span>
                      <Link href={`/jobs/${proposal.jobId}`}>
                        <Button variant="outline" size="sm">
                          View Job
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
