import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useRepo({ repo }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let { data } = await axios.get(
          `https://api.github.com/orgs/${repo}/repos`
        );
        setRepos(data);
      } catch (error) {
        toast(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [repo]);

  return {
    repos,
    loading,
  };
}
