import { type FunctionComponent, cloneElement } from "react";
import RAC, { type Props } from "react-activity-calendar";
import { providers } from "../utils/providers";
import data from "../data.json";
import { intersperse } from "../utils";

// @ts-expect-error library has a strange CJS export that changes on dev/prod
let Calendar: FunctionComponent<Props> = RAC.default ?? RAC;

export function Contributions() {
	const providerElements = providers.map((provider) => (
		<li key={provider.id}>
			{provider.access === "public" && (
				<a
					href={`${provider.origin}/${provider.username}`}
					target="_blank"
					rel="noopener"
					className="text-blue-800 underline"
				>
					{provider.name}
				</a>
			)}

			{provider.access === "file" && (
				<span className="cursor-not-allowed text-blue-800">
					{provider.name}
				</span>
			)}
		</li>
	));

	const dividerElement = <li className="-ml-1">,</li>;

	return (
		<div className="overflow-x-auto rounded-2xl bg-white shadow-2xl">
			<div className="min-h-[259px] min-w-[924px] p-10">
				<Calendar
					data={data as any}
					theme={{
						light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
					}}
					labels={{
						totalCount: `{{count}} contributions in the last year`,
					}}
					colorScheme="light"
					renderBlock={(element, activity) => {
						// Do not inline `title`
						// Warning: A title element received an array with more than 1 element as children.
						let title = `${activity.count} contributions on ${activity.date}`;
						return cloneElement(element, {}, <title>{title}</title>);
					}}
				/>

				<div className="text-sm">
					<span>Sources:</span>
					<ul className="ml-1 inline-flex gap-1">
						{intersperse(providerElements, dividerElement)}
					</ul>
				</div>
			</div>
		</div>
	);
}
