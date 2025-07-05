"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, DollarSign, User, Building, Sparkles, Send, ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

interface Job {
  _id: string
  title: string
  description: string
  budget: number
  skills: string[]
  location: string
  postedAt: string
  client: {
    name: string
    company?: string
    email: string
  }
  proposals: number
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [proposal, setProposal] = useState("")
  const [bidAmount, setBidAmount] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchJob()
  }, [params.id])

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`)
      const data = await response.json()
      if (response.ok) {
        setJob(data.job)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch job details",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateProposal = async () => {
    if (!job) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/ai/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: job.title,
          jobDescription: job.description,
          skills: job.skills,
          freelancerProfile: user?.profile || {},
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setProposal(data.proposal)
        toast({
          title: "Proposal Generated!",
          description: "AI has created a tailored proposal for you. Review and customize as needed.",
        })
      }
    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Failed to generate proposal",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const submitProposal = async () => {
    if (!proposal.trim() || !bidAmount) {
      toast({
        title: "Missing Information",
        description: "Please provide both a proposal and bid amount",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: params.id,
          proposal,
          bidAmount: Number.parseFloat(bidAmount),
        }),
      })
      const data = await response.json()
      if (response.ok) {
        // Update job proposal count locally
        if (job) {
          setJob({ ...job, proposals: job.proposals + 1 })
        }

        toast({
          title: "Proposal Submitted!",
          description: "Your proposal has been sent to the client.",
        })
        setProposal("")
        setBidAmount("")
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to submit proposal",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <Card>
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Job not found</h3>
            <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
            <Link href="/jobs">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/jobs">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Job Details</h1>
              <p className="text-sm text-gray-600">Review and apply to this opportunity</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Job Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{job.title}</CardTitle>
            <CardDescription className="flex items-center space-x-6 text-base">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Posted {new Date(job.postedAt).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Budget: ${job.budget}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Job Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Client Information</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{job.client.name}</span>
                </div>
                {job.client.company && (
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    <span>{job.client.company}</span>
                  </div>
                )}
                <Badge variant="outline">{job.proposals} proposals received</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposal Section - Only for freelancers */}
        {user?.role === "freelancer" && (
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Proposal</CardTitle>
              <CardDescription>Use AI to generate a tailored proposal or write your own</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="proposal">Your Proposal</Label>
                <Button variant="outline" onClick={generateProposal} disabled={isGenerating} size="sm">
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="proposal"
                placeholder="Describe why you're the perfect fit for this job..."
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                rows={8}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bidAmount">Your Bid Amount ($)</Label>
                  <Input
                    id="bidAmount"
                    type="number"
                    placeholder="Enter your bid"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </div>
              </div>

              <Button
                onClick={submitProposal}
                disabled={isSubmitting || !proposal.trim() || !bidAmount}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Send className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Proposal
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
