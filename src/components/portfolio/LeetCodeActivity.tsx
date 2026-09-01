import { useEffect, useState } from "react";
import { Award, Flame, CheckCircle2 } from "lucide-react";

const USERNAME = "Jagreet1";

type Contribution = {
  date: string;
  count: number;
  level: number;
};

type LeetCodeData = {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  badgesCount: number;
  currentStreak: number;
  longestStreak: number;
  contributions: Contribution[];
};

function getContributionColor(count: number) {
  if (count === 0) return "bg-slate-700/70";
  if (count <= 2) return "bg-cyan-900";
  if (count <= 5) return "bg-cyan-700";
  if (count <= 10) return "bg-cyan-500";
  return "bg-cyan-300";
}

function formatDate(date: Date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDate(dateString: string) {
  return new Date(`${dateString.slice(0, 10)}T12:00:00`);
}

function buildContributionCalendar(contributions: Contribution[]) {
  if (contributions.length === 0) {
    return [];
  }

  const sorted = [...contributions].sort(
    (a, b) =>
      parseDate(a.date).getTime() -
      parseDate(b.date).getTime()
  );

  const contributionMap = new Map<string, Contribution>();

  sorted.forEach((item) => {
    contributionMap.set(item.date.slice(0, 10), item);
  });

  const firstItem = sorted[0];
  const lastItem = sorted[sorted.length - 1];

  if (!firstItem || !lastItem) {
    return [];
  }

  const firstDate = parseDate(firstItem.date);
  const lastDate = parseDate(lastItem.date);

  // ...rest stays the same

  // Start from Sunday
  const startDate = new Date(firstDate);

  startDate.setDate(
    startDate.getDate() - startDate.getDay()
  );

  // End on Saturday
  const endDate = new Date(lastDate);

  endDate.setDate(
    endDate.getDate() + (6 - endDate.getDay())
  );

  const calendar: Contribution[][] = [];

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const week: Contribution[] = [];

    for (let day = 0; day < 7; day++) {
      const dateKey = formatDate(currentDate);

      const contribution =
        contributionMap.get(dateKey);

      week.push(
        contribution ?? {
          date: dateKey,
          count: 0,
          level: 0,
        }
      );

      currentDate.setDate(
        currentDate.getDate() + 1
      );
    }

    calendar.push(week);
  }

  return calendar;
}

function getMonthLabels(weeks: Contribution[][]) {
  const labels: Record<number, string> = {};

  if (weeks.length === 0) {
    return labels;
  }

  const firstWeek = weeks[0];
  const firstDay = firstWeek?.[0];

  if (!firstDay) {
    return labels;
  }

  // Show the first visible month
  const firstDate = parseDate(firstDay.date);

  let previousMonth =
    `${firstDate.getFullYear()}-${firstDate.getMonth()}`;

  weeks.forEach((week, weekIndex) => {
    if (weekIndex === 0) return;

    // Find whether this week contains a new month
    for (const day of week) {
      const date = parseDate(day.date);

      const currentMonth =
        `${date.getFullYear()}-${date.getMonth()}`;

      if (currentMonth !== previousMonth) {
        labels[weekIndex] = date.toLocaleString(
          "default",
          {
            month: "short",
          }
        );

        previousMonth = currentMonth;
        break;
      }
    }
  });

  return labels;
}

export function LeetCodeActivity() {
  const [data, setData] =
    useState<LeetCodeData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    async function fetchLeetCodeData() {
      try {
        setLoading(true);

        const [
          summaryResponse,
          statsResponse,
          heatmapResponse,
          badgesResponse,
        ] = await Promise.all([
          fetch(
            `https://leetcode-stats.tashif.codes/${USERNAME}`
          ),
          fetch(
            `https://leetcode-stats.tashif.codes/${USERNAME}/stats`
          ),
          fetch(
            `https://leetcode-stats.tashif.codes/${USERNAME}/heatmap`
          ),
          fetch(
            `https://leetcode-stats.tashif.codes/${USERNAME}/badges`
          ),
        ]);

        if (
          !summaryResponse.ok ||
          !statsResponse.ok ||
          !heatmapResponse.ok ||
          !badgesResponse.ok
        ) {
          throw new Error(
            "Failed to fetch LeetCode data"
          );
        }

        const summaryResult =
          await summaryResponse.json();

        const statsResult =
          await statsResponse.json();

        const heatmapResult =
          await heatmapResponse.json();

        const badgesResult =
          await badgesResponse.json();

        const summary = summaryResult.data;
        const stats = statsResult.data;
        const heatmap = heatmapResult.data;
        const badges = badgesResult.data;

        setData({
          totalSolved:
            stats.totalSolved ??
            summary.totalSolved ??
            0,

          easySolved:
            stats.byDifficulty?.easy ??
            stats.easySolved ??
            0,

          mediumSolved:
            stats.byDifficulty?.medium ??
            stats.mediumSolved ??
            0,

          hardSolved:
            stats.byDifficulty?.hard ??
            stats.hardSolved ??
            0,

          badgesCount:
            badges.count ??
            summary.badgesCount ??
            0,

          currentStreak:
            heatmap.currentStreak ??
            0,

          longestStreak:
            heatmap.longestStreak ??
            0,

          contributions:
            heatmap.dailyContributions ??
            [],
        });
      } catch (err) {
        console.error(
          "LeetCode API error:",
          err
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchLeetCodeData();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Loading LeetCode activity...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Unable to load LeetCode activity right now.
      </div>
    );
  }

  const weeks = buildContributionCalendar(
    data.contributions
  );

  const monthLabels =
    getMonthLabels(weeks);

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            LeetCode
          </p>

          <h3 className="mt-2 text-xl font-bold">
            Coding Activity
          </h3>
        </div>

        <a
          href={`https://leetcode.com/u/${USERNAME}/`}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          View Profile →
        </a>
      </div>

      {/* Main Statistics */}

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-lg border border-border bg-surface p-4">
          <CheckCircle2 className="size-5 text-primary" />

          <p className="mt-3 font-display text-2xl font-bold text-primary">
            {data.totalSolved}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Problems Solved
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <Flame className="size-5 text-primary" />

          <p className="mt-3 font-display text-2xl font-bold text-primary">
            {data.currentStreak}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Current Streak
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <Flame className="size-5 text-primary" />

          <p className="mt-3 font-display text-2xl font-bold text-primary">
            {data.longestStreak}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Longest Streak
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <Award className="size-5 text-primary" />

          <p className="mt-3 font-display text-2xl font-bold text-primary">
            {data.badgesCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Badges Earned
          </p>
        </div>

      </div>

      {/* Difficulty */}

      <div className="mt-7">
        <h4 className="text-sm font-semibold">
          Problems by Difficulty
        </h4>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-display text-xl font-bold text-primary">
              {data.easySolved}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Easy
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-display text-xl font-bold text-primary">
              {data.mediumSolved}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Medium
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-display text-xl font-bold text-primary">
              {data.hardSolved}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Hard
            </p>
          </div>

        </div>
      </div>

      {/* Contribution Activity */}

      <div className="mt-8">

        <h4 className="text-sm font-semibold">
          Submission Activity
        </h4>

        <p className="mt-1 text-xs text-muted-foreground">
          Your daily LeetCode submissions
        </p>

        {data.contributions.length > 0 ? (

          <div className="mt-5 overflow-x-auto pb-4">

            <div className="min-w-max">

              {/* Month Labels */}

              <div className="flex">

                {/* Space for weekday labels */}

                <div className="w-10 shrink-0" />

                {/* Month grid */}

                <div
                  className="grid gap-1"
                  style={{
                    gridTemplateColumns:
                      `repeat(${weeks.length}, 0.75rem)`,
                  }}
                >
                  {weeks.map(
                    (_, weekIndex) => (
                      <div
                        key={weekIndex}
                        className="h-4 text-[10px] text-muted-foreground whitespace-nowrap"
                      >
                        {monthLabels[weekIndex]}
                      </div>
                    )
                  )}
                </div>

              </div>

              {/* Calendar */}

              <div className="mt-2 flex">

                {/* Weekday Labels */}

                <div className="mr-2 grid w-8 shrink-0 grid-rows-7 gap-1 text-[10px] text-muted-foreground">

                  <span className="h-3" />

                  <span className="h-3 leading-3">
                    Mon
                  </span>

                  <span className="h-3" />

                  <span className="h-3 leading-3">
                    Wed
                  </span>

                  <span className="h-3" />

                  <span className="h-3 leading-3">
                    Fri
                  </span>

                  <span className="h-3" />

                </div>

                {/* Contribution Columns */}

                <div className="flex gap-1">

                  {weeks.map(
                    (week, weekIndex) => (

                      <div
                        key={weekIndex}
                        className="grid grid-rows-7 gap-1"
                      >

                        {week.map((day) => (

                          <div
                            key={day.date}
                            title={`${day.date}: ${day.count} submissions`}
                            className={`size-3 rounded-sm transition-transform duration-200 hover:scale-125 ${getContributionColor(
                              day.count
                            )}`}
                          />

                        ))}

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* Legend */}

              <div className="mt-5 flex items-center justify-end gap-2 text-[11px] text-muted-foreground">

                <span>Less</span>

                <div className="size-3 rounded-sm bg-slate-700/70" />

                <div className="size-3 rounded-sm bg-cyan-900" />

                <div className="size-3 rounded-sm bg-cyan-700" />

                <div className="size-3 rounded-sm bg-cyan-500" />

                <div className="size-3 rounded-sm bg-cyan-300" />

                <span>More</span>

              </div>

            </div>

          </div>

        ) : (

          <p className="mt-3 text-xs text-muted-foreground">
            No submission activity available.
          </p>

        )}

      </div>

    </div>
  );
}