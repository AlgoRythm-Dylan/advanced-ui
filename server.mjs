import express from "express";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(express.static(join(__dirname, "www")));

app.listen(8092);