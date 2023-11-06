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
export function decrypt(ciphertext, secretKey) {
  let plaintext = null;
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    plaintext = bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.log("Decrypt secret key error", err);
  }
  return plaintext;
}

// store refresh token in secure local storage
export function storeRefresh(refresh) {
  try {
    // Store 'username' in localStorage
    localStorage.setItem("username", "admin");
    console.log("username store success");

    // Check if the value was stored successfully
    const username = localStorage.getItem("username");
    if (username === "admin") {
      console.log("Confirmed: 'username' is stored in localStorage.");
    } else {
      console.error("Failed to confirm: 'username' is not stored in localStorage.");
    }

    // Store 'refresh' in secureLocalStorage
    secureLocalStorage.setItem(
      process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX + "_refresh",
      refresh
    );
    console.log("refresh store : ", refresh);

    // Check if the 'refresh' value was stored successfully
    const storedRefresh = secureLocalStorage.getItem(
      process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX + "_refresh"
    );
    if (storedRefresh === refresh) {
      console.log("Confirmed: 'refresh' is stored in secureLocalStorage.");
    } else {
      console.error("Failed to confirm: 'refresh' is not stored in secureLocalStorage.");
    }
  } catch (e) {
    // Log the error if any of the storage operations fail
    console.error("Storage operation failed: ", e);
  }
}


// get refresh token from secure local storage
export async function getRefresh() {
  const refresh = secureLocalStorage.getItem(
    process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX
  );
  console.log("get refresh token from secure local storage",refresh)
  return refresh;
}

// remove refresh token from secure local storage
export function removeRefresh() {
  secureLocalStorage.removeItem(
    process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX
  );
}

// secure refresh token in secure local storage
export function secureRefresh(refresh) {
  const encryptedRefresh = encrypt(
    refresh,
    process.env.NEXT_PUBLIC_SECRET_KEY
  );
  storeRefresh(encryptedRefresh);
}

// get unencrypted refresh token from secure local storage
export async function getDecryptedRefresh() {
  const encryptedRefresh = await getRefresh();
  const decryptedRefresh = decrypt(
    encryptedRefresh,
    process.env.NEXT_PUBLIC_SECRET_KEY
  );
  console.log("get refresh token from getdecrypted refresh", decryptedRefresh)
  return decryptedRefresh;
}
