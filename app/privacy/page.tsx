export const metadata = { title: "Privacy Policy - DLR Digital Tap" };

import SiteHeader from "@/components/site-header";

export default function Privacy() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-sm text-blue-800 font-semibold">
              🔒 Your privacy matters. This policy explains how we collect, use, and protect your data.
            </p>
          </div>

          <p className="text-lg text-gray-600 mb-8">
            <strong>Last Updated:</strong> November 5, 2025
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p>
            This Privacy Policy explains how DLR Digital Tap ("we", "our", "us") collects, uses, stores, and protects 
            your personal information when you use our prototype demonstration service. By using the Service, you consent 
            to the data practices described in this policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Data We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Information You Provide</h3>
          <p>We collect information that you voluntarily provide when using our Service:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Contact Form:</strong> Name, email address, subject, and message content</li>
            <li><strong>Voting/Feedback:</strong> Your votes, comments, and optional images you upload</li>
            <li><strong>User Journey Data:</strong> Station selections, tap-in/tap-out times, and simulated journey details</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Automatically Collected Data</h3>
          <p>We do NOT automatically collect:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Cookies or tracking pixels</li>
            <li>IP addresses for tracking</li>
            <li>Device fingerprints</li>
            <li>Analytics or usage patterns</li>
            <li>Third-party advertising data</li>
          </ul>
          <p>
            <strong>Note:</strong> Our hosting provider (Netlify) may collect basic server logs for operational purposes, 
            which are governed by their privacy policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Data</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Communication:</strong> To respond to your contact form submissions and inquiries</li>
            <li><strong>Demonstration:</strong> To display voting results and feedback within the prototype</li>
            <li><strong>Improvement:</strong> To gather feedback and improve the prototype concept</li>
            <li><strong>Testing:</strong> To test user flows and interface functionality</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Storage and Security</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Where We Store Data</h3>
          <p>Your data is stored using:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Supabase:</strong> Database for user submissions, votes, and journey data</li>
            <li><strong>Supabase Storage:</strong> Cloud storage for uploaded images</li>
            <li><strong>Resend:</strong> Email service for contact form deliveries</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Data Retention</h3>
          <p>
            <strong>Important:</strong> As this is a prototype:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>All data may be <strong>deleted at any time</strong> during development cycles</li>
            <li>Data should <strong>not be considered permanent</strong></li>
            <li>We make no guarantees about data retention or backup</li>
            <li>You should not submit data you need to keep</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Security Measures</h3>
          <p>We implement reasonable security measures including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>HTTPS encryption for data transmission</li>
            <li>Secure authentication for database access</li>
            <li>Regular security updates and patches</li>
            <li>Limited access to data (development team only)</li>
          </ul>
          <p>
            However, no system is 100% secure. Please do not submit highly sensitive or confidential information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Sharing and Disclosure</h2>
          <p>We do NOT:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Sell your personal information to third parties</li>
            <li>Share your data with advertisers</li>
            <li>Use your data for marketing purposes</li>
            <li>Provide your information to data brokers</li>
          </ul>
          <p>We MAY share data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>With service providers (Supabase, Resend, Netlify) necessary to operate the Service</li>
            <li>If required by law or legal process</li>
            <li>To protect rights, property, or safety of users or others</li>
            <li>Aggregated, anonymized data for research or demonstration purposes</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
          <p>Under GDPR and UK data protection laws, you have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
            <li><strong>Restriction:</strong> Request limitation of processing your data</li>
            <li><strong>Portability:</strong> Request transfer of your data to another service</li>
            <li><strong>Objection:</strong> Object to processing of your data</li>
            <li><strong>Withdrawal:</strong> Withdraw consent at any time</li>
          </ul>
          <p>
            To exercise these rights, please contact us via the <a href="/contact" className="text-blue-600 hover:underline">contact form</a>.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
          <p>
            The Service is not intended for children under 13. We do not knowingly collect personal information from 
            children. If you believe we have collected data from a child, please contact us immediately.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Third-Party Services</h2>
          <p>The Service uses the following third-party services, each with their own privacy policies:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Supabase:</strong> <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy Policy</a></li>
            <li><strong>Resend:</strong> <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy Policy</a></li>
            <li><strong>Netlify:</strong> <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy Policy</a></li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. International Data Transfers</h2>
          <p>
            Your data may be transferred to and stored on servers located outside the UK/EEA, including the United States. 
            We ensure appropriate safeguards are in place, such as standard contractual clauses, when transferring data internationally.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated 
            "Last Updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>
          <p>
            For questions, concerns, or requests regarding your personal data or this Privacy Policy, please contact us 
            via our <a href="/contact" className="text-blue-600 hover:underline">contact form</a>.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Data Controller:</strong> DLR Digital Tap Prototype<br />
              <strong>Jurisdiction:</strong> England and Wales<br />
              <strong>Compliance:</strong> UK GDPR and Data Protection Act 2018
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
