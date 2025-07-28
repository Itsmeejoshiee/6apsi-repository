const BRANCH = 'main';
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

if (!TOKEN) {
  throw new Error('Missing GitHub token. Please set REACT_APP_GITHUB_TOKEN in your .env file.');
}

const apiBase = 'https://api.github.com/repos/EC2-code/data-storage/contents/';

const getHeaders = () => ({
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
});

export async function getFileContent(path) {
  const res = await fetch(`${apiBase}${path}?ref=${BRANCH}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!res.ok) {
    if (res.status === 404) {
      return { content: { tasks: [] }, sha: null };
    }
    throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const content = JSON.parse(atob(data.content));

  return { content, sha: data.sha };
}

export async function updateFile(path, contentObj, message, sha, maxRetries = 8) {
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const body = {
        message,
        content: btoa(JSON.stringify(contentObj, null, 2)),
        branch: BRANCH,
        sha,
      };

      console.log("Updating file:", path);
      console.log("Commit message:", message);
      console.log("File SHA:", sha);
      console.log("Content to commit:", contentObj);

      const res = await fetch(`${apiBase}${path}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.status === 409 && attempt < maxRetries) {
          console.warn(`Conflict on attempt ${attempt}, retrying...`);
          await wait(200 * attempt);
          continue;
        }
        const errorText = await res.text();
        throw new Error(`Failed to update ${path}: ${res.status} ${res.statusText} - ${errorText}`);
      }

      const json = await res.json();
      console.log("Update response:", json);
      return json;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) throw error;
      await wait(200 * attempt);
    }
  }
}
