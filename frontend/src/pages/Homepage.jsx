import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../authSlice";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  // Working logout using your existing Redux thunk
  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      setLogoutError("");
 
      await dispatch(logoutUser()).unwrap();
      

      navigate("/login", { replace: true });
    } catch (error) {
      setLogoutError(
        typeof error === "string"
          ? error
          : error?.message || "Logout failed. Please try again."
      );
    } finally {
      setLoggingOut(false);
    }
  };

  const firstName = user?.firstName || "Coder";
  const initial = firstName.charAt(0).toUpperCase();

  const stats = [
    {
      label: "Problems Solved",
      value: "—",
      icon: "✓",
      color: "text-green-400",
      description: "Keep building your streak",
    },
    {
      label: "Acceptance Rate",
      value: "—",
      icon: "↗",
      color: "text-blue-400",
      description: "Your submission accuracy",
    },
    {
      label: "Current Streak",
      value: "—",
      icon: "⚡",
      color: "text-orange-400",
      description: "Show up every day",
    },
  ];

  const categories = [
    {
      title: "Arrays & Strings",
      description:
        "Master array manipulation, two pointers, sliding window and strings.",
      icon: "⌘",
      tag: "START HERE",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      route: "/problems",
    },
    {
      title: "Data Structures",
      description:
        "Practice linked lists, stacks, queues, trees and graphs.",
      icon: "▤",
      tag: "FUNDAMENTALS",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      route: "/problems",
    },
    {
      title: "Algorithms",
      description:
        "Improve your skills in binary search, recursion and dynamic programming.",
      icon: "⚡",
      tag: "LEVEL UP",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      route: "/problems",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#eff1f3]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex shrink-0 items-center gap-2"
          >
            <span className="text-3xl font-bold text-orange-400">◈</span>
            <span className="text-xl font-bold tracking-tight">
              Leet<span className="text-orange-400">Code</span>
            </span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 text-sm text-gray-400 md:flex">
            <button
              onClick={() => navigate("/problems")}
              className="transition hover:text-orange-400"
            >
              Problems
            </button>

            <button
              onClick={() => navigate("/contest")}
              className="transition hover:text-orange-400"
            >
              Contest
            </button>

            <button
              onClick={() => navigate("/discuss")}
              className="transition hover:text-orange-400"
            >
              Discuss
            </button>

            <button
              onClick={() => navigate("/leaderboard")}
              className="transition hover:text-orange-400"
            >
              Leaderboard
            </button>
          </div>

          {/* User and logout */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => navigate("/profile")}
              title={firstName}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/40 bg-orange-400/10 font-bold text-orange-400 transition hover:bg-orange-400/20"
            >
              {initial}
            </button>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-lg border border-white/15 px-3 py-2 text-sm font-medium transition hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loggingOut ? "Logging out..." : "Logout ↗"}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="flex gap-6 overflow-x-auto border-t border-white/5 px-5 py-3 text-sm text-gray-400 md:hidden">
          <button
            onClick={() => navigate("/problems")}
            className="shrink-0 hover:text-orange-400"
          >
            Problems
          </button>

          <button
            onClick={() => navigate("/contest")}
            className="shrink-0 hover:text-orange-400"
          >
            Contest
          </button>

          <button
            onClick={() => navigate("/discuss")}
            className="shrink-0 hover:text-orange-400"
          >
            Discuss
          </button>

          <button
            onClick={() => navigate("/leaderboard")}
            className="shrink-0 hover:text-orange-400"
          >
            Leaderboard
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:py-10">
        {/* Error message */}
        {logoutError && (
          <div
            role="alert"
            className="mb-5 flex items-center justify-between gap-4 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-300"
          >
            <span>{logoutError}</span>

            <button
              onClick={() => setLogoutError("")}
              className="shrink-0 font-semibold hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Hero section */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#30271f] via-[#24211f] to-[#1e1e1e] p-7 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="pointer-events-none absolute bottom-0 right-10 hidden select-none text-[180px] font-bold leading-none text-white/[0.025] lg:block">
            {"</>"}
          </div>

          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-orange-400">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              YOUR CODING JOURNEY
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Welcome back,
              <span className="block break-words text-orange-400">
                {firstName}!
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
              Every expert was once a beginner. Practice problems, strengthen
              your DSA skills, and get one step closer to your dream tech job.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/problems")}
                className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400"
              >
                Start Solving Problems →
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 font-medium transition hover:bg-white/[0.08]"
              >
                View Profile
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="text-orange-400">◆</span>
                DSA Practice
              </span>

              <span className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Interview Preparation
              </span>

              <span className="flex items-center gap-2">
                <span className="text-blue-400">↗</span>
                Track Your Growth
              </span>
            </div>
          </div>
        </section>

        {/* Progress section */}
        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Your Progress
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Your journey to becoming a better problem solver.
              </p>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="text-sm font-medium text-orange-400 transition hover:text-orange-300"
            >
              View details →
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-[#222222] p-5 transition hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">{stat.label}</p>

                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-xl ${stat.color}`}
                  >
                    {stat.icon}
                  </span>
                </div>

                <p className={`mt-5 text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Practice categories */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Explore & Practice
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Pick a topic and start improving your coding skills.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.title}
                onClick={() => navigate(category.route)}
                className="group rounded-xl border border-white/10 bg-[#222222] p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-[#262626]"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${category.bg} ${category.color}`}
                  >
                    {category.icon}
                  </span>

                  <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] font-semibold tracking-wider text-gray-500">
                    {category.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold transition group-hover:text-orange-400">
                  {category.title}
                </h3>

                <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-400">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-sm font-medium text-orange-400">
                    Explore problems
                  </span>

                  <span className="text-orange-400 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Daily challenge banner */}
        <section className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#222222] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <div className="text-sm font-semibold tracking-wider text-orange-400">
                CONSISTENCY IS KEY
              </div>

              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">
                One problem at a time.
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                You don't need to solve everything today. Solve one problem,
                understand the logic, and come back stronger tomorrow.
              </p>
            </div>

            <button
              onClick={() => navigate("/problems")}
              className="shrink-0 rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              Solve a Problem →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14 border-t border-white/10 py-7">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
            <p>
              <span className="font-semibold text-gray-300">
                LeetCode Clone
              </span>{" "}
              · Practice. Improve. Repeat.
            </p>

            <p>Built for developers who never stop learning.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Homepage;
