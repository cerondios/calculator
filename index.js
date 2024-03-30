const weight = document.querySelector("#weight");
const dosis = document.querySelector("#dosis");
const dosisTotal = document.querySelector("#dosis-total");
const precioTotal = document.querySelector("#precio-total");
const precioMiligramo = document.querySelector("#precio-miligramo");
const btn = document.querySelector("#btn");
const tabla = Array.from(
	document.querySelector("#table").children[0].children
).slice(1, 4);

function cambio(value) {
	dosisTotal.value = value;
	precioTotal.value =
		parseFloat(dosisTotal.value) * parseFloat(precioMiligramo.value);

	const dose = {
		25: round(value / 25),
		75: round(value / 75),
	};
	const injection = {
		25: round(dose[25] * 0.5),
		75: round(dose[75] * 1.5),
	};
	const wastage = {
		25: round(Math.ceil(dose[25]) - dose[25]),
		75: round(Math.ceil(dose[75]) - dose[75]),
	};
	tabla[0].children[1].textContent = dose[25];
	tabla[0].children[2].textContent = dose[75];
	tabla[1].children[1].textContent = injection[25];
	tabla[1].children[2].textContent = injection[75];
	tabla[2].children[1].textContent = wastage[25];
	tabla[2].children[2].textContent = wastage[75];
}

function round(value) {
	return Math.round(value * 100) / 100;
}

dosis.addEventListener("change", (e) =>
	cambio(parseFloat(e.target.value) * parseInt(weight.value))
);
weight.addEventListener("change", (e) =>
	cambio(parseFloat(dosis.value) * parseInt(e.target.value))
);
precioMiligramo.addEventListener("input", (e) => {
	precioTotal.value = round(
		parseFloat(dosis.value) * parseFloat(e.target.value)
	);
});

btn.addEventListener("click", (e) => {
	const values = Array.from(tabla[2].children)
		.slice(1, 3)
		.map((el) => parseFloat(el.innerText));
	if (values[0] <= values[1]) {
		alert("Ampollas de 25mg tienen menos desperdicios");
		return;
	}
	alert("Ampollas de 75mg tienen menos desperdicios");
	return;
});

for (let index = 1; index < 111; index++) {
	const option = document.createElement("option");
	option.textContent = index;
	weight.appendChild(option);
}
