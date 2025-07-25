import { getFileContent } from '../api/github';

const ACCOUNTS_PATH = '../data/users.json';

export async function validateLogin(accountName, accountPassword) {
    if (!accountName.trim() || !accountPassword.trim()) {
        return { success: false, message: 'All fields are required.' };
    }

    try {
        const { content: accounts } = await getFileContent(ACCOUNTS_PATH);
        const account = accounts.find(acc => 
            acc.accountName === accountName && acc.accountPassword === accountPassword
        ); 

        if (account) {
            return { success: true, accountId: account.accountId };
        } else {
            return { success: false, message: 'Invalid credentials.' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Server error.' };
    }
}
