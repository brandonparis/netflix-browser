import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const Container = styled.button`
  padding: 1rem;
  border-radius: 4px;
  background: transparent;
  display: flex;
  flex-direction: column;
  border: 1px solid #6857dd;
  cursor: pointer;
  width: 100%;
  height: 100%;
  > h1,
  h2,
  p {
    color: #fff;
    padding: 0.25rem 0;
    text-align: left;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.25rem;
  }
  p {
    font-size: 0.85rem;
  }
  span {
    color: #b8b5ff;
    font-weight: 600;
  }
  hr {
    width: 100%;
    margin: 0.5rem 0;
  }
`;

export default function Card({ repo, commits, setCommits }) {
  const [isFetchingCommits, setIsFetchingCommits] = useState({});
  async function getCommits(e) {
    try {
      if (commits[repo.name] && commits[repo.name].length) {
        return setCommits({ ...commits, [repo.name]: [] });
      }
      setIsFetchingCommits({ ...isFetchingCommits, [repo.name]: true });
      let { data } = await axios.get(
        `https://api.github.com/repos/${repo.full_name}/commits`
      );
      setCommits({ ...commits, [repo.name]: data });
    } catch (error) {
      toast(error.response.data.message);
    } finally {
      setIsFetchingCommits({ ...isFetchingCommits, [repo.name]: false });
    }
  }
  return (
    <Container onClick={getCommits}>
      <h1>{repo.name}</h1>
      <p>
        <span data-testid={`Language-${repo.id}`}>Language:</span>{" "}
        {repo.language}
      </p>
      <p>
        <span>Description:</span> {repo.description}
      </p>
      <p>
        <span>Stars:</span> {repo.stargazers_count}
      </p>
      <p>
        <span>Forks:</span> {repo.forks_count}
      </p>
      <p>
        <span>Creation date:</span>{" "}
        {moment(repo.created_at).format("MMMM DD, YYYY")}
      </p>
      {isFetchingCommits[repo.name] && (
        <>
          <h2>Commits</h2>
          <p>Loading commits...</p>
        </>
      )}
      {commits[repo.name] && Object.keys(commits[repo.name]).length ? (
        <>
          <h2>Commits</h2>
          {commits[repo.name]
            .sort(
              (a, b) =>
                new Date(b.commit.committer.date) -
                new Date(a.commit.committer.date)
            )
            .slice(0, 3)
            .map((commit) => (
              <>
                <p>
                  <span>Title:</span> {commit.commit.message}
                </p>
                <p>
                  <span>Username:</span> {commit.commit.committer.email}
                </p>
                <p>
                  <span>Hash:</span> {commit.sha}
                </p>
                <p>
                  <span>Creation date:</span>
                  {moment(commit.commit.committer.date).format("MMMM DD, YYYY")}
                </p>
                <hr />
              </>
            ))}
        </>
      ) : null}
    </Container>
  );
}
