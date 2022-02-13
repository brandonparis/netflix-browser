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
  margin: 0 auto;
  gap: 2rem;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;

    > button {
      border-radius: 4px;
      border: none;
      background-color: #6857dd;
      color: #fff;
      padding: 6px 28px;
      cursor: pointer;
    }
  }
  label {
    color: #fff;
    font-size: 1.25rem;
    display: block;
  }
  input {
    border-radius: 4px;
    width: 30%;
    padding: 0.25rem 0.5rem;
  }
`;

function App() {
  const [repo, setRepo] = useState("Netflix");
  const [value, setValue] = useState("");
  const { repos } = useRepo({ repo });
  const [commits, setCommits] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") return;
    setRepo(value);
  };
  return (
    <FlexContainer>
      <form onSubmit={handleSubmit}>
        <label id="repository">Search an organization</label>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="text"
          name="repository"
          aria-labelledby="repository"
        />
        <button type="submit">Submit</button>
      </form>
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
        <div>
          {commits.map((commit) => (
            <p key={commit.sha}>Title: {commit.commit.message}</p>
          ))}
        </div>
      )}
      <Toaster />
    </FlexContainer>
  );
}

export default App;
