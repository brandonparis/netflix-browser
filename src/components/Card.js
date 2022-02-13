import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";

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
  h3,
  p {
    color: #fff;
    padding: 0.25rem 0;
    text-align: left;
  }
  p {
    font-size: 14px;
  }
  span {
    color: #e4fbff;
    font-weight: 600;
  }
`;

export default function Card({ repo, commits, setCommits }) {
  async function getCommits(e) {
    try {
      if (commits[repo.name] && commits[repo.name].length) {
        return setCommits({ ...commits, [repo.name]: [] });
      }
      let { data } = await axios.get(
        `https://api.github.com/repos/${repo.full_name}/commits`
      );
      setCommits({ ...commits, [repo.name]: data });
    } catch (error) {
      toast(error.message);
    }
  }
  return (
    <Container onClick={getCommits}>
      <h1>{repo.name}</h1>
      <p>
        <span>Language:</span> {repo.language}
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
      {commits[repo.name] && Object.keys(commits[repo.name]).length ? (
        <>
          <h3>Commits</h3>
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
              </>
            ))}
        </>
      ) : null}
    </Container>
  );
}
