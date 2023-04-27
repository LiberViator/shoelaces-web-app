import { useState, useEffect } from "react";

const data = {
	id: 0,
	name: "Adidas",
	coordinates: {
		LT1: "10",
		LT2: "20",
	},
	steps: [
		["LT1", "LT2"],
		["LT3", "LT4"],
		["LT5", "LT6"],
		["LT7", "LT8"],
	],
};

export default function ShoePage() {
	const [currentStep, setStep] = useState(0);
	const [path, setPath] = useState([]);

	const nextStep = () => {
		if (currentStep < data.steps.length) {
			setStep(currentStep + 1);
		}
	};
	const prevStep = () => {
		if (currentStep > 0) {
			setStep(currentStep - 1);
		}
	};

	useEffect(() => setPath(data.steps.slice(0, currentStep)), [currentStep]);

	return (
		<>
			<Header />
			<Shoe data={data} currentStep={currentStep} />
			<Footer prevStep={prevStep} nextStep={nextStep} />
		</>
	);
}

export function Header() {
	return <header></header>;
}

export function Shoe({ data, currentStep }) {
	return (
		<main className={``}>
			<div>
				<h1></h1>
				<span>Step: {currentStep}/</span>
			</div>
			Shoe
		</main>
	);
}

export function Footer({ prevStep, nextStep }) {
	return (
		<footer>
			<button onClick={prevStep}>Previous step</button>
			<button onClick={nextStep}>Next step</button>
		</footer>
	);
}
