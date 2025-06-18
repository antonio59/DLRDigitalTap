export const metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <main className="prose mx-auto py-12 px-4">
      <h1>Privacy Policy</h1>
      <p>
        This prototype collects only the data you provide in forms (e.g., contact or vote). It uses
        Supabase to persist that information. No tracking or analytics tools are integrated.
      </p>
      <p>
        Data submitted may be deleted at any time during development and should not be considered
        permanent. By using the site you consent to this limited data handling.
      </p>
    </main>
  );
}
