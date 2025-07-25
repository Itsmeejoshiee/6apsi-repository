const GITHUB_REPO = 'your-username/your-repo'; // e.g., "myuser/todo-storage"
const BRANCH = 'main';
const TOKEN = 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN'; // use env vars in real apps

const apiBase = `https://api.github.com/repos/${'6apsi-repository'}/contents/`;

const getHeaders = () => ({
    'Authorization': `Bearer ${TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
});

// Get file content and SHA
export async function getFileContent(path) {
    const res = await fetch(`${apiBase}${path}`, {
        method: 'GET',
        headers: getHeaders(),
    });

    if (!res.ok) {
        if (res.status === 404) {
        return { content: {}, sha: null }; // Return empty if not found
        }
        throw new Error(`Failed to fetch ${path}`);
    }

    const data = await res.json();
    const content = JSON.parse(atob(data.content));
    return { content, sha: data.sha };
}

// Create or update a file
export async function updateFile(path, contentObj, message) {
    const { sha } = await getFileContent(path);

    const body = {
        message,
        content: btoa(JSON.stringify(contentObj, null, 2)),
        branch: BRANCH,
        ...(sha && { sha }), // Only include if updating
    };

    const res = await fetch(`${apiBase}${path}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`Failed to update ${path}`);
    }

    return await res.json();
}
