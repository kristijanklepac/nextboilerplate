import { Card } from "@/components/ui/card";
import apiService from "@/lib/api/api";
import Link from "next/link";
// Import the version display from our version module
import { versionDisplay } from "@/lib/version";

export const metadata = {
  title: "About Us | Next App",
  description: "Learn more about our company and mission",
};

// Mark as dynamic to ensure we always fetch fresh data
export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  // Fetch data from API (will use mocks in test environment)
  const teamMembers = await apiService.getTeamMembers();
  const companyInfo = await apiService.getCompanyInfo();
  
  // Environment indicator for demonstration purposes
  const env = process.env.NEXT_PUBLIC_ENV ?? 'development';
  // Show mock data indicator for test environment or when mocks are explicitly enabled
  const isMockData = env === 'test' || process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Environment badge - for demonstration only */}
        <div className="mb-4 text-right">
          <Link href="/version" className="inline-block">
            <span className={`px-2 py-1 text-xs rounded-full cursor-pointer hover:shadow-sm transition-shadow ${
              env === 'production' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
              env === 'test' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : 
              'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`} title="Click to view version details">
              {env} {isMockData ? '(mock data)' : ''} <span className="opacity-70">{versionDisplay}</span>
            </span>
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center" data-testid="about-title">About Us</h1>
        
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-6" data-testid="mission-text">
            {companyInfo.mission}
          </p>
          
          <div 
            className="my-10 h-64 rounded-lg bg-gray-200 flex items-center justify-center" 
            data-testid="mission-image"
          >
            <span className="text-gray-500">Team collaboration image</span>
          </div>
          
          <p className="text-lg">
            Founded in {companyInfo.founded}, we&apos;ve been at the forefront of web development, embracing the latest technologies and best practices to create solutions that stand the test of time.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="team-grid">
            {teamMembers.map((member) => (
              <Card key={member.id} className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <span className="text-gray-500 text-xs">Photo</span>
                  </div>
                  <h3 className="text-xl font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                  <p className="text-center text-sm">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 