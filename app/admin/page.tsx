"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  RefreshCw,
  Copy,
  CheckCircle,
  Lock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

interface Stats {
  totalVotes: number;
  totalComments: number;
  recentComments: number;
  daysSinceLaunch: number;
  lastUpdated: string;
  topComments: Array<{
    name: string;
    comment: string;
    date: string;
  }>;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "dlr2024admin";
    
    if (password === correctPassword) {
      setIsAuthenticated(true);
      fetchStats();
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stats", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || "your-secret-api-key"}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load statistics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Statistics copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const generateSocialPost = () => {
    if (!stats) return "";

    return `🚇 Digital Tap Campaign Update

📊 ${stats.totalVotes.toLocaleString()} people have voted for contactless, queue-free travel on the DLR!

💬 ${stats.totalComments} comments from frustrated commuters sharing their experiences with broken tap points, rush hour queues, and missed trains.

🎯 Day ${stats.daysSinceLaunch} of our ongoing campaign to bring modern travel technology to the DLR.

Every voice matters. Join the movement: https://dlrdigitaltap.netlify.app

@TfL @MayorofLondon #DLR #London #PublicTransport #Innovation`;
  };

  if (!isAuthenticated) {
    return (
      <>
        <SiteHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Lock className="h-6 w-6 mr-2" />
                Admin Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Access Dashboard
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  This dashboard is protected. Only authorised users can access campaign statistics.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-cyan-600 to-teal-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-cyan-100">Campaign statistics and social media content</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Campaign Statistics</h2>
              <p className="text-gray-600">
                Last updated: {stats ? new Date(stats.lastUpdated).toLocaleString("en-GB") : "—"}
              </p>
            </div>
            <Button
              onClick={fetchStats}
              disabled={isLoading}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Votes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Heart className="h-8 w-8 text-red-500 mr-3" />
                  <div className="text-3xl font-bold text-gray-900">
                    {stats?.totalVotes.toLocaleString() || "—"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <MessageCircle className="h-8 w-8 text-blue-500 mr-3" />
                  <div className="text-3xl font-bold text-gray-900">
                    {stats?.totalComments || "—"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Recent (30 days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
                  <div className="text-3xl font-bold text-gray-900">
                    {stats?.recentComments || "—"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Campaign Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-cyan-500 mr-3" />
                  <div className="text-3xl font-bold text-gray-900">
                    {stats?.daysSinceLaunch || "—"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Social Media Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-semibold mb-2 block">
                    Ready-to-post Tweet/LinkedIn Content
                  </Label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                      {generateSocialPost()}
                    </pre>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => copyToClipboard(generateSocialPost())}
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Comments */}
          {stats && stats.topComments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.topComments.map((comment, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-gray-900">{comment.name}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.date).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{comment.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
