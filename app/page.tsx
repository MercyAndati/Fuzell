import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Brain, Users, Zap, Shield, MessageSquare, CreditCard, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900">Fuzell</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            AI-Powered Freelancing Platform
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Where Talent Excels
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Fuzell fuses the best of AI technology with human expertise. Experience semantic job matching, AI-generated
            proposals, and real-time collaboration tools that revolutionize freelancing.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/signup?role=freelancer">
              <Button size="lg" className="px-8">
                Excel as Freelancer
              </Button>
            </Link>
            <Link href="/auth/signup?role=client">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Find Excellence
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Fuzell?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>AI-Powered Matching</CardTitle>
                <CardDescription>
                  Semantic search using OpenAI embeddings for perfect freelancer-job matches
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Smart Proposals</CardTitle>
                <CardDescription>
                  GPT-3.5 generates tailored proposals automatically, saving hours of work
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Real-Time Collaboration</CardTitle>
                <CardDescription>Built-in chat and collaborative whiteboarding with Tldraw integration</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>
                  Stripe integration with escrow system and optional blockchain payments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Fraud Detection</CardTitle>
                <CardDescription>AI-powered fraud detection analyzes job postings and user behavior</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Low Fees</CardTitle>
                <CardDescription>Only 5% platform fee compared to 20-30% on traditional platforms</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Excel in Your Freelancing Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of freelancers and clients already excelling with Fuzell
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="px-8">
              Start Excelling Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-xl font-bold">Fuzell</span>
          </div>
          <p className="text-gray-400">© 2024 Fuzell. All rights reserved. Where talent excels.</p>
        </div>
      </footer>
    </div>
  )
}
