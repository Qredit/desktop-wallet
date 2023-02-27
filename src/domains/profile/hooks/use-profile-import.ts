import { Contracts, Environment } from "@payvo/sdk-profiles";

import { ReadableFile } from "@/app/hooks/use-files";

interface ImportFileProperties {
	file?: ReadableFile;
	password?: string;
}

export const useProfileImport = ({ env }: { env: Environment }) => {
	const importProfileFromDwe = async (profileData: string, password?: string) => {
		let profile: Contracts.IProfile;

		try {
			profile = await env.profiles().import(profileData, password);
		} catch (error) {
			if (error.message.includes("Reason: Unexpected token") && !password) {
				throw new Error("PasswordRequired");
			}

			if (error.message.includes("Reason: Unexpected token") && password) {
				throw new Error("InvalidPassword");
			}

			throw error;
		}

		return profile;
	};

	const importLegacyProfile = async (profileData: string) => {
		let data: Record<string, any>;

		try {
			data = JSON.parse(profileData);
		} catch {
			throw new Error("CorruptedData");
		}

		if (!data?.wallets?.length) {
			throw new Error("MissingWallets");
		}

		const profile = env.profiles().create("");

		for (const wallet of data.wallets) {
			if (wallet?.address && wallet?.balance.XQR) {
				await profile.coins().set("XQR", "xqr.mainnet").__construct();
			}

			if (wallet?.address && wallet?.balance.dXQR) {
				await profile.coins().set("XQR", "xqr.testnet").__construct();
			}
		}

		await Promise.all(
			data.wallets.map(async (wallet: Record<string, any>) => {
				if (wallet?.address && wallet?.balance.XQR) {
					const importedWallet = await profile.walletFactory().fromAddress({
						address: wallet.address,
						coin: "XQR",
						network: "xqr.mainnet",
					});
					profile.wallets().push(importedWallet);
					return wallet;
				}

				if (wallet?.address && wallet?.balance.dXQR) {
					profile.settings().set(Contracts.ProfileSetting.UseTestNetworks, true);

					const importedWallet = await profile.walletFactory().fromAddress({
						address: wallet.address,
						coin: "XQR",
						network: "xqr.testnet",
					});
					profile.wallets().push(importedWallet);
					return importedWallet;
				}
			}),
		);

		env.profiles().forget(profile.id());
		return profile;
	};

	const importProfile = async ({ password, file }: ImportFileProperties) => {
		if (!file) {
			return;
		}

		if (file?.extension === ".dwe") {
			return await importProfileFromDwe(file.content.toString(), password);
		}

		if (file?.extension === ".json") {
			return await importLegacyProfile(file.content.toString());
		}
	};

	return { importProfile };
};
