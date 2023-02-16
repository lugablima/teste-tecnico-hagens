import Cryptr from "cryptr";

function configureCryptr(): Cryptr {
	const secretKey = process.env.CRYPTR_SECRET as string;
	return new Cryptr(secretKey);
}

export function encrypt(data: string): string {
	const cryptr = configureCryptr();
	return cryptr.encrypt(data);
}

export function decrypt(encryptedData: string): string {
	const cryptr = configureCryptr();
	return cryptr.decrypt(encryptedData);
}
