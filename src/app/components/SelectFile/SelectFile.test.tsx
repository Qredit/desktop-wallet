import fs from "fs";
import os from "os";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import electron from "electron";
import React from "react";
import { useTranslation } from "react-i18next";

import { SelectFile } from "./SelectFile";
import { fireEvent, render, screen, waitFor } from "@/utils/testing-library";

const browseFiles = () => screen.getByTestId("SelectFile__browse-files");

const sampleFiles = [{ name: "sample-export.json", path: "path/to/sample-export.json" }];

describe("SelectFile", () => {
	it("should render with dwe file format", () => {
		const { container } = render(<SelectFile fileFormat=".dwe" onSelect={jest.fn} />);

		expect(container).toMatchSnapshot();
	});

	it("should render with json file format", () => {
		const { container } = render(<SelectFile fileFormat=".json" onSelect={jest.fn} />);

		expect(container).toMatchSnapshot();
	});

	it("should open dialog to select file", async () => {
		const fsMock = jest.spyOn(fs, "readFileSync").mockReturnValue(Buffer.from("file"));

		//@ts-ignore
		const showOpenDialogMock = jest.spyOn(electron.remote.dialog, "showOpenDialog").mockImplementation(() => ({
			filePaths: ["filePath"],
		}));

		const onSelect = jest.fn();
		render(<SelectFile fileFormat=".json" onSelect={onSelect} />);

		userEvent.click(browseFiles());

		expect(showOpenDialogMock).toHaveBeenCalledWith({
			defaultPath: os.homedir(),
			filters: [{ extensions: ["json"], name: "" }],
			properties: ["openFile"],
		});

		await waitFor(() =>
			expect(onSelect).toHaveBeenCalledWith({
				content: expect.any(Buffer),
				extension: expect.any(String),
				name: expect.any(String),
			}),
		);

		showOpenDialogMock.mockRestore();
		fsMock.mockRestore();
	});

	it("should change background when dragging over drop zone", async () => {
		render(<SelectFile fileFormat=".json" onSelect={jest.fn} />);

		expect(screen.getByTestId("SelectFile__drop-zone")).toHaveClass(
			"bg-theme-primary-50 dark:bg-theme-secondary-800",
		);

		fireEvent.dragEnter(screen.getByTestId("SelectFile__drop-zone"), {
			dataTransfer: {
				files: sampleFiles,
			},
		});

		await waitFor(() =>
			expect(screen.getByTestId("SelectFile__drop-zone")).toHaveClass("bg-theme-primary-100 dark:bg-black"),
		);

		fireEvent.dragLeave(screen.getByTestId("SelectFile__drop-zone"), {
			dataTransfer: {
				files: sampleFiles,
			},
		});
	});

	it("should handle file drop", async () => {
		//@ts-ignore
		const onSelect = jest.fn();
		render(<SelectFile fileFormat=".json" onSelect={onSelect} />);

		fireEvent.dragOver(browseFiles(), {
			dataTransfer: {
				files: sampleFiles,
			},
		});

		fireEvent.dragEnter(browseFiles(), {
			dataTransfer: {
				files: sampleFiles,
			},
		});

		fireEvent.drop(browseFiles(), {
			dataTransfer: {
				files: sampleFiles,
			},
		});

		await waitFor(() => expect(onSelect).toHaveBeenCalledTimes(1));
	});

	it("should show error if the dropped file has wrong type", () => {
		const { result } = renderHook(() => useTranslation());
		const { t } = result.current;

		const fileFormat = ".json";

		const { container } = render(<SelectFile fileFormat={fileFormat} onSelect={jest.fn} />);

		fireEvent.drop(browseFiles(), {
			dataTransfer: {
				files: [{ name: "sample-export.dwe", path: "path/to/sample-export.dwe" }],
			},
		});

		const errorHtml = t("PROFILE.IMPORT.SELECT_FILE_STEP.ERRORS.NOT_SUPPORTED", { fileFormat });

		expect(container).toContainHTML(errorHtml);

		userEvent.click(screen.getByRole("button"));

		expect(container).not.toContainHTML(errorHtml);
	});

	it("should show error if multiple files are dropped", () => {
		const { result } = renderHook(() => useTranslation());
		const { t } = result.current;

		const { container } = render(<SelectFile fileFormat=".json" onSelect={jest.fn} />);

		fireEvent.drop(browseFiles(), {
			dataTransfer: {
				files: [
					{ name: "sample-export-1.json", path: "path/to/sample-export-1.json" },
					{ name: "sample-export-2.json", path: "path/to/sample-export-2.json" },
				],
			},
		});

		const errorHtml = t("PROFILE.IMPORT.SELECT_FILE_STEP.ERRORS.TOO_MANY", { fileCount: 2 });

		expect(container).toContainHTML(errorHtml);

		userEvent.click(screen.getByRole("button"));

		expect(container).not.toContainHTML(errorHtml);
	});
});
