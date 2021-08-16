import { writeFile, readFile } from 'fs/promises';

interface Cert {
    name: string;
    description: string;
    properties: {
        start_time: string;
        end_time: string;
        power_to_provide: string;
        price_per_watt: string;
        signature: string;
    }
}

async function writeCert(name: string, data: Cert) {
    let d = JSON.stringify(data)
    await writeFile(name, d)
    console.log("end file")
}

export {Cert,
    writeCert, readFile
}