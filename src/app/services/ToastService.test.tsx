import React from "react";
import { toast, ToastContainer } from "react-toastify";

import { ToastService } from "./ToastService";
import { act, render, screen } from "@/utils/testing-library";

let subject: ToastService;

describe("ToastService", () => {
	beforeAll(() => {
		subject = new ToastService();
	});

	beforeEach(() => {
		jest.useFakeTimers();
	});

	it.each(["info", "success", "warning", "error"])("should call toast %s method", (method) => {
		jest.spyOn(toast, method);

		render(<ToastContainer />);

		act(() => {
			subject[method](method);
			jest.runAllTimers();
		});

		expect(screen.getByText(method)).toBeInTheDocument();
	});

	it.each(["info", "success", "warning", "error"])("should call toast %s method with options", (method) => {
		render(<ToastContainer />);

		act(() => {
			subject[method](method, { position: "top-right" });
			jest.runAllTimers();
		});

		expect(screen.getByText(method)).toBeInTheDocument();
	});

	it("should call the toast dismiss method", () => {
		const mock = jest.spyOn(toast, "dismiss").mockImplementation();

		subject.dismiss();

		expect(mock).toHaveBeenCalledWith(undefined);
	});

	it("should call the toast dismiss method with toast id", () => {
		const mock = jest.spyOn(toast, "dismiss").mockImplementation();

		subject.dismiss(123);

		expect(mock).toHaveBeenCalledWith(123);
	});
});
