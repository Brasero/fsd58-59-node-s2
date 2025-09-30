export const header = (stylePath) => {
	return `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<title>Kittens - liste des chatons</title>
			<link rel="stylesheet" href=${stylePath} type="text/css" />
		</head>
	`
}