"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, User, Mail, Shield } from "lucide-react"
import Link from "next/link"

export default function TestAuthPage() {
  const testUsers = [
    { name: "John Doe", email: "john@example.com", role: "freelancer", password: "password" },
    { name: "Jane Smith", email: "jane@example.com", role: "client", password: "password" },
    { name: "Alex Johnson", email: "alex@test.com", role: "freelancer", password: "password" },
    { name: "Sarah Wilson", email: "sarah@test.com", role: "client", password: "password" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SkillSync AI</span>
          </Link>
          <div className="flex space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Test Authentication</CardTitle>
              <CardDescription>Use these test accounts to login and explore the platform features</CardDescription>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {testUsers.map((user, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>{user.name}</span>
                    </CardTitle>
                    <Badge variant={user.role === "freelancer" ? "default" : "secondary"}>{user.role}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Password: {user.password}</span>
                  </div>
                  <Link href="/auth/login" className="block">
                    <Button className="w-full mt-4">Login as {user.name}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">For Freelancers:</h3>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Browse and search jobs with AI</li>
                    <li>• Generate proposals automatically</li>
                    <li>• Chat with clients in real-time</li>
                    <li>• Track earnings and projects</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">For Clients:</h3>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Post jobs and find talent</li>
                    <li>• Review AI-matched proposals</li>
                    <li>• Collaborate with freelancers</li>
                    <li>• Manage projects and payments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
