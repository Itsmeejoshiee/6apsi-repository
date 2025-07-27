import { getFileContent, updateFile } from '../api/github';

const ACCOUNTS_PATH = '../data/users.json';

function generateAccountId(accounts) {
    const existingIds = accounts.map(acc => acc.accountId);
    let counter = 1;
    let newId;
    do {
        newId = `AB${String(counter).padStart(4, '0')}`;
        counter++;
    } while (existingIds.includes(newId));
    return newId;
}

export async function registerAccount(accountName, accountPassword) {
    if (!accountName.trim() || !accountPassword.trim()) {
        return { success: false, message: 'All fields are required.' };
    }

    try {
        const { content: accounts, sha } = await getFileContent(ACCOUNTS_PATH);
        if (accounts.find(acc => acc.accountName === accountName)) {
            return { success: false, message: 'Username already exists.' };
        }

        const newId = generateAccountId(accounts);
        const newAccount = { accountId: newId, accountName, accountPassword };
        const updatedAccounts = [...accounts, newAccount];

        await updateFile(ACCOUNTS_PATH, updatedAccounts, `Register account: ${accountName}`);

        await updateFile(`storage/${newId}/tasks.json`, [], `Initialize empty tasks for ${newId}`);

        return { success: true, accountId: newId };
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, message: 'Registration failed.' };
    }
}
