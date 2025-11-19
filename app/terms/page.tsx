export const metadata = { title: "Terms of Service - Digital Tap" };

import SiteHeader from "@/components/site-header";

export default function Terms() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Terms of Service</h1>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-sm text-yellow-800 font-semibold">
              ⚠️ PROTOTYPE DISCLAIMER: This is a demonstration prototype and not a production system.
            </p>
          </div>

          <p className="text-lg text-gray-600 mb-8">
            <strong>Last Updated:</strong> November 5, 2025
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Digital Tap prototype ("the Service"), you accept and agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Prototype Status</h2>
          <p>
            The Service is a <strong>prototype demonstration</strong> and is provided "as-is" for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Demonstration purposes only</li>
            <li>Gathering feedback and suggestions</li>
            <li>Testing user experience concepts</li>
            <li>Educational and research purposes</li>
          </ul>
          <p>
            The Service is <strong>NOT intended for production use</strong> and should not be relied upon for actual transportation, 
            payment processing, or any real-world travel purposes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The creators and operators of this prototype are <strong>not liable</strong> for any direct, indirect, incidental, 
            special, consequential, or exemplary damages arising from your use of the Service</li>
            <li>This includes, but is not limited to, damages for loss of data, profits, goodwill, or other intangible losses</li>
            <li>No warranties, express or implied, are provided regarding the accuracy, reliability, or availability of the Service</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Data and Content</h2>
          <p>
            <strong>User-Generated Content:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Content you submit (feedback, votes, images) is stored temporarily for demonstration purposes</li>
            <li>All submitted content may be deleted, modified, or removed at any time without notice</li>
            <li>Do not submit sensitive, confidential, or personal information beyond basic contact details</li>
            <li>You retain ownership of content you submit, but grant us a licence to use it for demonstration and improvement purposes</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Acceptable Use</h2>
          <p>
            You agree NOT to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the Service for any illegal or unauthorised purpose</li>
            <li>Submit offensive, abusive, defamatory, or inappropriate content</li>
            <li>Attempt to access, modify, or interfere with the Service's systems or infrastructure</li>
            <li>Upload malicious code, viruses, or harmful files</li>
            <li>Scrape, harvest, or collect data from the Service using automated means</li>
            <li>Impersonate others or provide false information</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Service Availability</h2>
          <p>
            The Service may be:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Modified, suspended, or discontinued at any time without notice</li>
            <li>Unavailable due to maintenance, updates, or technical issues</li>
            <li>Reset, with all data deleted during development iterations</li>
          </ul>
          <p>
            We make no guarantees about uptime, data persistence, or continued availability.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Third-Party Services</h2>
          <p>
            The Service integrates with third-party platforms including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Supabase (database and storage)</li>
            <li>Resend (email delivery)</li>
            <li>Netlify (hosting)</li>
          </ul>
          <p>
            These services have their own terms and privacy policies. We are not responsible for their actions or policies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Intellectual Property</h2>
          <p>
            All design, code, concepts, and materials related to the Digital Tap prototype are the intellectual property 
            of the creators. The "DLR" name and branding are owned by Transport for London (TfL). This prototype is an 
            unofficial demonstration and is not affiliated with, endorsed by, or connected to TfL.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon 
            posting. Your continued use of the Service after changes constitutes acceptance of the modified terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Governing Law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive 
            jurisdiction of the courts of England and Wales.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact</h2>
          <p>
            For questions about these Terms of Service, please use our <a href="/contact" className="text-blue-600 hover:underline">contact form</a>.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By using the Digital Tap prototype, you acknowledge that you have read, understood, and agree to be 
              bound by these Terms of Service.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
