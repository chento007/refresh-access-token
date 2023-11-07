// for encryption and decryption
import CryptoJS from "crypto-js";

// for secure local storage
import secureLocalStorage from "react-secure-storage";

// encrypt refresh token
export function encrypt(message, secretKey) {
  let ciphertext = null;
  try {
    ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
  } catch (err) {
    console.log("Encrypt secret key error:", err);
  }

  return ciphertext;
}

// decrypt refresh token

// store refresh token in secure local storage
export function storeRefresh(refresh) {
  try {
    // Store 'username' in localStorage
    secureLocalStorage.setItem(
      process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX,
      refresh
    );
    
  } catch (e) {
    // Log the error if any of the storage operations fail
    console.error("Storage operation failed: ", e);
  }
}


export function secureRefresh(refresh) {
  const encryptedRefresh = encrypt(
    refresh,
    process.env.NEXT_PUBLIC_SECRET_KEY
  );
  storeRefresh(encryptedRefresh);
}


export function decrypt(ciphertext, secretKey) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    if (plaintext === '') {
      throw new Error('Decryption succeeded but returned an empty string.');
    }
    return plaintext;
  } catch (err) {
    console.error("Decrypt secret key error:", err);
    throw err; // rethrow the error to handle it in the calling function
  }
}


export async function getDecryptedRefresh() {
  try {
    const encryptedRefresh =  getRefresh();
    if (!encryptedRefresh) {
      console.error("Encrypted refresh token is empty.");
      return null;
    }
    if (!process.env.NEXT_PUBLIC_SECRET_KEY) {
      console.error("Secret key is undefined.");
      return null;
    }

    const decryptedRefresh = decrypt(
      encryptedRefresh,
      process.env.NEXT_PUBLIC_SECRET_KEY
    );

    if (!decryptedRefresh) {
      console.error("Decryption failed or returned an empty result.");
      return null;
    }

    return decryptedRefresh;
  } catch (error) {
    console.error("An error occurred during decryption:", error);
    return null;
  }
}


export function getRefresh() {
  const refresh = secureLocalStorage.getItem(    
    process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX
  );
  if (typeof refresh === 'undefined') {
    console.error("No refresh token found in secureLocalStorage.");
  }
  return refresh;
}


export function removeRefresh() {
  secureLocalStorage.removeItem(
    process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX
  );
}
