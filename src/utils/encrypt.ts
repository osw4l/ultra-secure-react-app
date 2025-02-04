import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "secure";

export const encryptData = (data: string): string => {
  if (!data) return "";

  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decryptData = (ciphertext: string): string => {
  if (!ciphertext) return "";
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);

    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);

    return "Error decrypting data";
  }
};
