import fs from "fs";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import electron from "electron";
import React from "react";

import { SelectProfileImage } from "./SelectProfileImage";
import { useFiles } from "@/app/hooks/use-files";
import { translations } from "@/app/i18n/common/i18n";
import { toasts } from "@/app/services";
import { render, screen, waitFor } from "@/utils/testing-library";

const uploadButton = () => screen.getByTestId("SelectProfileImage__upload-button");

describe("SelectProfileImage", () => {
	it("should render", () => {
		const onSelect = jest.fn();

		const { asFragment } = render(<SelectProfileImage onSelect={onSelect} />);

		expect(asFragment()).toMatchSnapshot();
	});

	it("should render with value svg", () => {
		const onSelect = jest.fn();

		const { asFragment } = render(<SelectProfileImage value="<svg>test</svg>" onSelect={onSelect} />);

		expect(asFragment()).toMatchSnapshot();
	});

	it("should render without value svg", () => {
		const onSelect = jest.fn();

		const { asFragment } = render(<SelectProfileImage value="test" onSelect={onSelect} />);

		expect(asFragment()).toMatchSnapshot();

		userEvent.click(screen.getByTestId("SelectProfileImage__remove-button"));

		expect(onSelect).toHaveBeenCalledWith(expect.any(String));
	});

	it("should handle upload file", async () => {
		const onSelect = jest.fn();

		const { asFragment } = render(<SelectProfileImage value="test" onSelect={onSelect} />);
		const { result: useFilesResult } = renderHook(() => useFiles());

		expect(asFragment()).toMatchSnapshot();

		const openFileDialog = jest.spyOn(electron.remote.dialog, "showOpenDialog").mockImplementation(
			() =>
				({
					filePaths: ["banner.png"],
				} as any),
		);

		uploadButton().addEventListener("click", openFileDialog as any);
		userEvent.click(uploadButton());

		await expect(
			useFilesResult.current.openFile({
				extensions: ["png", "jpg", "jpeg", "bmp"],
			}),
		).resolves.not.toThrow();

		await waitFor(() => expect(onSelect).toHaveBeenCalledWith(expect.any(String)));
	});

	it("should not allow to upload an invalid file image", async () => {
		const fsMock = jest.spyOn(fs, "readFileSync").mockReturnValue(Buffer.from("not-an-image"));

		const onSelect = jest.fn();
		const toastSpy = jest.spyOn(toasts, "error");

		const { asFragment } = render(<SelectProfileImage value="test" onSelect={onSelect} />);

		expect(asFragment()).toMatchSnapshot();

		const openFileDialog = jest.spyOn(electron.remote.dialog, "showOpenDialog").mockImplementation(
			() =>
				({
					filePaths: ["not-an-image.png"],
				} as any),
		);

		uploadButton().addEventListener("click", openFileDialog as any);
		userEvent.click(uploadButton());

		await waitFor(() => expect(toastSpy).toHaveBeenCalledWith(translations.ERRORS.INVALID_IMAGE));

		fsMock.mockRestore();
	});

	it("should not handle upload file", async () => {
		const onSelect = jest.fn();

		const { asFragment } = render(<SelectProfileImage value="test" onSelect={onSelect} />);

		expect(asFragment()).toMatchSnapshot();

		const openFileDialog = jest.spyOn(electron.remote.dialog, "showOpenDialog").mockImplementation(
			() =>
				({
					filePaths: undefined,
				} as any),
		);

		uploadButton().addEventListener("click", openFileDialog as any);
		userEvent.click(uploadButton());

		await waitFor(() => expect(onSelect).not.toHaveBeenCalled());
	});
});
