import shell from 'shelljs';

(async function (shell) {
    try {
        await shell.exec(`yarn build:clean`);
    } catch (error) {
        console.log(error);
    }
    try {
        await shell.exec(`yarn build:es2015`);
        await shell.exec(`yarn build:esm5`);
        await shell.exec(`yarn build:cjs`);
        await shell.exec(`yarn build:types`);
        await shell.exec(`yarn build:umd`);
    } catch (error) {
        console.log(error);
    }
})(shell);