export function generateRandomDigits() {
	// Generate a random number between 10000 and 99999
	const randomDigits = Math.floor(10000 + Math.random() * 90000);

	// Convert the number to a string
	const randomDigitsString = randomDigits.toString();

	return randomDigitsString;
}
