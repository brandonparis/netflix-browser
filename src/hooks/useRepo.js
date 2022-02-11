import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useRepo({ repo }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let { data } = await axios.get(
          `https://api.github.com/orgs/${repo}/repos`
        );
        setRepos(data);
      } catch (error) {
        toast(error.message);
      }
    }
    fetchData();
  }, [repo]);

  return {
    repos,
  };
}
