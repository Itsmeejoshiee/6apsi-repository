const BRANCH = 'main';
const TOKEN = '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';

const apiBase = 'https://api.github.com/repos/EC2-code/data-storage/contents/';

const getHeaders = () => ({
    'Authorization': `Bearer ${TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
});

export async function getFileContent(path) {
  const res = await fetch(`${apiBase}${path}?ref=${BRANCH}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!res.ok) {
    if (res.status === 404) {
      return { content: { users: [] }, sha: null };
    }
    throw new Error(`Failed to fetch ${path}`);
  }

  const data = await res.json();

  const content = JSON.parse(atob(data.content));

  return { content, sha: data.sha };
}


export async function updateFile(path, contentObj, message, maxRetries = 8) {
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const { sha } = await getFileContent(path);

      const body = {
        message,
        content: btoa(JSON.stringify(contentObj, null, 2)),
        branch: BRANCH,
        ...(sha && { sha }),
      };

      const res = await fetch(`${apiBase}${path}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.status === 409 && attempt < maxRetries) {
          await wait(200 * attempt);
          continue;
        }
        const errorText = await res.text();
        throw new Error(`Failed to update ${path}: ${res.status} ${res.statusText} - ${errorText}`);
      }

      return await res.json();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await wait(200 * attempt);
    }
  }
}

