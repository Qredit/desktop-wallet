import { Contracts } from "@payvo/sdk-profiles";
import userEvent from "@testing-library/user-event";
import electron from "electron";
import { createMemoryHistory } from "history";
import React from "react";
import { Route } from "react-router-dom";

import { Page } from "./Page";
import { env, getDefaultProfileId, render, screen } from "@/utils/testing-library";

let profile: Contracts.IProfile;

const dashboardURL = `/profiles/${getDefaultProfileId()}/dashboard`;
const history = createMemoryHistory();

describe("Page", () => {
	beforeAll(() => {
		profile = env.profiles().findById(getDefaultProfileId());
		history.push(dashboardURL);
	});

	it.each([true, false])("should render with sidebar = %s", (sidebar) => {
		const { container, asFragment } = render(
			<Route path="/profiles/:profileId/dashboard">
				<Page title="Test" sidebar={sidebar}>
					{}
				</Page>
			</Route>,
			{
				history,
				routes: [dashboardURL],
			},
		);

		expect(container).toBeInTheDocument();
		expect(asFragment()).toMatchSnapshot();
	});

	it.each(["Contacts", "Votes", "Settings", "Support"])(
		"should handle '%s' click on user actions dropdown",
		async (label) => {
			const ipcRendererSpy = jest.spyOn(electron.ipcRenderer, "send").mockImplementation();
			const historySpy = jest.spyOn(history, "push").mockImplementation();

			render(
				<Route path="/profiles/:profileId/dashboard">
					<Page>{}</Page>
				</Route>,
				{
					history,
					routes: [dashboardURL],
				},
			);

			await expect(screen.findByTestId("navbar__useractions")).resolves.toBeVisible();

			const toggle = screen.getByTestId("navbar__useractions");

			userEvent.click(toggle);

			await expect(screen.findByText(label)).resolves.toBeVisible();

			userEvent.click(await screen.findByText(label));

			if (label === "Support") {
				expect(ipcRendererSpy).toHaveBeenCalledWith("open-external", "https://payvo.com/contact");
			} else {
				expect(historySpy).toHaveBeenCalledWith(`/profiles/${profile.id()}/${label.toLowerCase()}`);
			}

			ipcRendererSpy.mockRestore();
			historySpy.mockRestore();
		},
	);

	it("should handle 'Sign Out' click on user actions dropdown", async () => {
		render(
			<Route path="/profiles/:profileId/dashboard">
				<Page>{}</Page>
			</Route>,
			{
				history,
				routes: [dashboardURL],
			},
		);

		const historySpy = jest.spyOn(history, "push").mockImplementation();

		await expect(screen.findByTestId("navbar__useractions")).resolves.toBeVisible();

		const toggle = screen.getByTestId("navbar__useractions");

		userEvent.click(toggle);

		await expect(screen.findByText("Sign Out")).resolves.toBeVisible();

		userEvent.click(await screen.findByText("Sign Out"));

		expect(historySpy).toHaveBeenCalledWith("/");

		historySpy.mockRestore();
	});
});
