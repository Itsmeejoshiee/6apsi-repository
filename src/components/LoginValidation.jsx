import { getFileContent } from '../api/github';

const ACCOUNTS_PATH = 'data/users.json';

export async function validateLogin(accountName, accountPassword) {
  if (!accountName.trim() || !accountPassword.trim()) {
    return { success: false, message: 'All fields are required.' };
  }

  try {
    const { content } = await getFileContent(ACCOUNTS_PATH);

    if (!content || !Array.isArray(content.users)) {
      throw new Error('Expected an array of accounts in users.json');
    }

    console.log('Users:', content.users);
    console.log('Trying login:', { accountName, accountPassword });

    const account = content.users.find(
      acc => acc.accountName.trim().toLowerCase() === accountName.trim().toLowerCase() &&
             acc.accountPassword === accountPassword
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
