"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const requestsOverTime = [
  { month: "Jan", requests: 28, stories: 8 },
  { month: "Feb", requests: 35, stories: 12 },
  { month: "Mar", requests: 42, stories: 15 },
  { month: "Apr", requests: 38, stories: 10 },
  { month: "May", requests: 55, stories: 18 },
  { month: "Jun", requests: 67, stories: 22 },
]

const categoryData = [
  { name: "Abuse Support", value: 45 },
  { name: "Sexual Health", value: 20 },
  { name: "Counselling", value: 18 },
  { name: "Legal", value: 9 },
  { name: "Emergency", value: 5 },
  { name: "Other", value: 3 },
]

const resourceViews = [
  { title: "Understanding Trauma", views: 1240 },
  { title: "Faith Meets Pain", views: 980 },
  { title: "Signs of Abuse", views: 870 },
  { title: "Healthy Relationships", views: 720 },
  { title: "Rebuilding Trust", views: 640 },
  { title: "Women's Health", views: 590 },
]

const PIE_COLORS = ["#1B6E6E", "#7C3AED", "#F59E0B", "#EF4444", "#10B981", "#6B7280"]

const metricCards = [
  { label: "Total Help Requests", value: "265", change: "+18% this month", up: true },
  { label: "Stories Published", value: "85", change: "+6 pending review", up: true },
  { label: "Resource Views", value: "12,450", change: "+22% this month", up: true },
  { label: "Volunteers Active", value: "34", change: "7 pending approval", up: false },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map(({ label, value, change, up }) => (
          <div key={label} className="bg-white rounded-2xl border border-stone-100 p-5">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">{label}</p>
            <p className="text-3xl font-bold text-stone-900 mb-1">{value}</p>
            <p className={`text-xs font-medium ${up ? "text-teal-600" : "text-amber-600"}`}>{change}</p>
          </div>
        ))}
      </div>

      {/* Line chart: requests over time */}
      <div className="bg-white rounded-2xl border border-stone-100 p-6">
        <h3 className="font-bold text-stone-900 mb-5">Help Requests & Story Submissions Over Time</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={requestsOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "1px solid #e7e5e4", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#1B6E6E"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#1B6E6E" }}
              name="Help Requests"
            />
            <Line
              type="monotone"
              dataKey="stories"
              stroke="#7C3AED"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#7C3AED" }}
              name="Story Submissions"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Pie chart: request categories */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h3 className="font-bold text-stone-900 mb-5">Help Requests by Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                dataKey="value"
                nameKey="name"
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e7e5e4" }}
                formatter={(value) => [`${value}%`, ""]}
              />
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart: resource views */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h3 className="font-bold text-stone-900 mb-5">Top Resource Views</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={resourceViews} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="title"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={140}
              />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e7e5e4" }}
              />
              <Bar dataKey="views" fill="#1B6E6E" radius={[0, 6, 6, 0]} name="Views" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
