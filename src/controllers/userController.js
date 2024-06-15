



function formUser(choice, link) {

    return (
        `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clothes Website Dashboard</title>
    <link rel="stylesheet" href="../styles.css">
    </head>
   <body>
    <form action='/${choice}' method="POST">
        <label for="username">User Name:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <input type="submit" value='${choice}'>
        <a href='/${link}'>${link}</a>

    </form>
</body>

</html>

`)

};











module.exports = { formUser }