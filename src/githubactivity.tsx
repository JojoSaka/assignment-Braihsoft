import { useState } from "react";
import { Input } from "../src/components/ui/input";
import { Button } from "../src/components/ui/button";
import { Card, CardContent } from "../src/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { scrollToBottom } from "../src/scrollToBottom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

export default function GitHubActivity() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [commitData, setCommitData] = useState<number[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  const fetchRepos = async () => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();
    setRepos(data);
  };

  const fetchCommits = async (repoName: string) => {
    setSelectedRepo(repoName);
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/stats/commit_activity`
    );
    const data = await res.json();
    const weeklyCommits = data.map((week: any) => week.total);
    setCommitData(weeklyCommits);
  };

  const commitChartData = {
    labels: Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`),
    datasets: [
      {
        label: `Commits per Week for ${selectedRepo}`,
        data: commitData,
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.5)",
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">GitHub Activity Tracker</h1>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={fetchRepos}>Fetch Repos</Button>
      </div>

      {repos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <Card key={repo.id}>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg">{repo.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{repo.description}</p>
                <p className="text-sm">⭐ {repo.stargazers_count}</p>
                <Button
                  className="mt-2"
                  onClick={() => {
                    fetchCommits(repo.name);
                    scrollToBottom();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  View Weekly Commits
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {commitData.length > 0 && (
        <div className="mt-10">
          <Line data={commitChartData} />
        </div>
      )}
    </div>
  );
}
