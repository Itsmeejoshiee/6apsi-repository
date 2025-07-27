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
            return { content: {}, sha: null };
        }
        throw new Error(`Failed to fetch ${path}`);
    }

    const data = await res.json();
    const content = JSON.parse(atob(data.content));
    return { content, sha: data.sha };
}

export async function updateFile(path, contentObj, message) {
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
        throw new Error(`Failed to update ${path}`);
    }

    return await res.json();
}
