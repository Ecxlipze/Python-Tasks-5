export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Welcome Back 👋
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Jobs</h2>
          <p className="mt-2 text-3xl font-bold">12</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Candidates</h2>
          <p className="mt-2 text-3xl font-bold">85</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Resumes</h2>
          <p className="mt-2 text-3xl font-bold">54</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-gray-500">Average Match</h2>
          <p className="mt-2 text-3xl font-bold">92%</p>
        </div>
      </div>
    </div>
  );
}