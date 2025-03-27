import appVersion from "@/lib/version";
import packageInfo from "../../../package.json";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Version Info | Next App",
  description: "Version information for Next App",
};

export default function VersionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Application Version</h1>
        
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{packageInfo.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Version Information</h3>
              <ul className="space-y-2">
                <li><strong>Version:</strong> {appVersion.versionDisplay}</li>
                <li><strong>Major:</strong> {appVersion.major}</li>
                <li><strong>Minor:</strong> {appVersion.minor}</li>
                <li><strong>Patch:</strong> {appVersion.patch}</li>
                <li><strong>Status:</strong> {appVersion.isDevelopment ? 'Development' : 'Production Ready'}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Package Details</h3>
              <ul className="space-y-2">
                <li><strong>Node.js:</strong> {process.version}</li>
                <li><strong>Next.js:</strong> {packageInfo.dependencies.next}</li>
                <li><strong>React:</strong> {packageInfo.dependencies.react}</li>
              </ul>
            </div>
          </div>
        </Card>
        
        <h2 className="text-2xl font-semibold mb-4">Dependencies</h2>
        <Card className="p-6 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Runtime Dependencies</h3>
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="text-left p-2">Package</th>
                      <th className="text-left p-2">Version</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {Object.entries(packageInfo.dependencies).map(([pkg, version]) => (
                      <tr key={pkg} className="hover:bg-gray-50">
                        <td className="p-2">{pkg}</td>
                        <td className="p-2">{version as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Dev Dependencies</h3>
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="text-left p-2">Package</th>
                      <th className="text-left p-2">Version</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {Object.entries(packageInfo.devDependencies).map(([pkg, version]) => (
                      <tr key={pkg} className="hover:bg-gray-50">
                        <td className="p-2">{pkg}</td>
                        <td className="p-2">{version as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 