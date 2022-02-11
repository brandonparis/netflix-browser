import styled from "styled-components";

import axios from "axios";
import toast from "react-hot-toast";

const Container = styled.button`
  padding: 1rem;
  border-radius: 4px;
  background: transparent;
  border: 1px solid #6857dd;
  cursor: pointer;
  width: 100%;
  height: 100%;
  > h1,
  p {
    color: #fff;
  }
`;

export default function Card({ repo, commits, setCommits }) {
  async function getCommits(e) {
    try {
      if (commits.length) {
        return setCommits([]);
      }
      let { data } = await axios.get(
        `https://api.github.com/repos/${repo.full_name}/commits`
      );
      setCommits(data);
    } catch (error) {
      toast(error.message);
    }
  }

  // Commit title -> commit message
  // Committer username -> author login
  return (
    <Container onClick={getCommits}>
      <h1>{repo.name}</h1>
      <p>language: {repo.language}</p>
      <p>description: {repo.description}</p>
      <p>starred: {repo.stargazers_count}</p>
      <p>forks: {repo.forks_count}</p>
      <p>creation date:{repo.created_at}</p>
    </Container>
  );
}
