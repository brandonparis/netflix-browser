import { useState } from "react";
import Card from "./components/Card";
import { Toaster } from "react-hot-toast";
import useRepo from "./hooks/useRepo";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  padding: 4rem;
  max-width: 105ch;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  margin: ${({ commits }) => (commits.length ? "" : "0 auto")};
  gap: 2rem;
`;

const CommitContainer = styled.div``;

function App() {
  const { repos } = useRepo({ repo: "Netflix" });
  const [commits, setCommits] = useState([]);
  console.log(commits);
  return (
    <div>
      <Grid commits={commits}>
        {repos.length &&
          repos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .map((repo) => (
              <Card
                key={repo.id}
                commits={commits}
                setCommits={setCommits}
                repo={repo}
              />
            ))}
      </Grid>
      {commits.length && (
        <CommitContainer>
          {commits.map((commit) => (
            <p key={commit.sha}>Title: {commit.commit.message}</p>
          ))}
        </CommitContainer>
      )}
      <Toaster />
    </div>
  );
}

export default App;
