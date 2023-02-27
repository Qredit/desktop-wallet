import React from "react";

import { Item, SideBar } from "./SideBar";
import { render, screen } from "@/utils/testing-library";

describe("SideBar", () => {
	const items: Item[] = [
		{
			icon: "Sliders",
			itemKey: "general",
			label: "General",
			route: "general",
		},
		{
			icon: "Lock",
			itemKey: "password",
			label: "Password",
			route: "password",
		},
		{
			icon: "ArrowUpTurnBracket",
			itemKey: "export",
			label: "Export",
			route: "export",
		},
	];

	it("should render", () => {
		const { asFragment } = render(
			<SideBar handleActiveItem={jest.fn()} activeItem={items[0].itemKey} items={items} />,
		);

		expect(screen.getAllByRole("listitem")).toHaveLength(3);
		expect(asFragment()).toMatchSnapshot();
	});
});
