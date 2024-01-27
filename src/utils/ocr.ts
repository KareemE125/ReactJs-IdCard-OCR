import IdData from "../models/IdData";

async function ocr(image: File){

    const formData = new FormData();
    formData.append('apikey', 'K82440376688957');
    formData.append('language', 'dut');
    formData.append('isOverlayRequired', 'true');
    formData.append('file', image);

    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData
    })

    const data: string = (await response.json()).ParsedResults[0].ParsedText;

    return data;
}


export default async function parsedIdData(image: File){

    const data: string = await ocr(image);
    const lines = data.split('\n');
    
    const idData:IdData = {
        imageUrl: null,
        imageName: null,
        surname: null,
        docNo: null,
        givenName: null,
        dateOfIssue: null,
        dateOfBirth: null,
        dateOfExpiry: null,
        nationality: null,
        sex: null
    };

    // Logic for getting the fields when the titles are detected by the OCR
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.includes('surname') || line.includes('sur')) {
            idData.surname = lines[i + 1].trim();
        } else if (line.includes('voornamen / given names') || line.includes('voornamen') || line.includes('given names') || line.includes('names')|| line.includes('voor')) { 
            idData.givenName = lines[i + 1].trim();
        } else if (line.includes('geslacht/ sex nationaliteit / nationality') || line.includes('geslacht') || line.includes('nationality') || line.includes('nation') || line.includes('sex')) {
            if(lines[i + 1].includes('F') || lines[i + 1].includes('F/F') || lines[i + 1].includes('V/F') || lines[i + 1].includes('f')){
                idData.sex = 'Female';
            }
            else if(lines[i + 1].includes('M') || lines[i + 1].includes('M/M') || lines[i + 1].includes('V/M') || lines[i + 1].includes('m')){
                idData.sex = 'Male';
            }
            else
            {
                idData.sex = 'Not Specified';
            }
            idData.nationality = lines[i + 1].trim().split(' ')[1] ? lines[i + 1].trim().split(' ')[1] : lines[i + 1].trim();
        
        } else if (line.includes('geboortedatum') || line.includes('birth')){
            idData.dateOfBirth = lines[i + 1].trim();
        } else if (line.includes('datum van afgifte') || line.includes('issue')){
            idData.dateOfIssue = lines[i + 1].trim();
        } else if (line.includes('geldig tot') || line.includes('expiry')){
            idData.dateOfExpiry = lines[i + 1].trim();
        } else if (line.includes('documentnummer') || line.includes('document no.')  || line.includes('doc')) {
            idData.docNo = lines[i + 1].trim();
        }
    }

    // Logic for when the titles is not detected by the OCR
    const allFieldsNull = Object.values(idData).every(value => value === null);
    if(allFieldsNull && lines.length < 15){
        let lineIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('/') && lines[i+1].includes('/') && lines[i+2].includes('/')) {
                lineIndex =  i;
                break
            } 
        }

        if( lineIndex !== -1){
            idData.dateOfExpiry = lines[lineIndex+2].trim();
            idData.dateOfIssue = lines[lineIndex+1].trim();
            idData.dateOfBirth = lines[lineIndex].trim();

            // Set Sex and Nationality
            if(lines[lineIndex - 1].includes('F') || lines[lineIndex - 1].includes('F/F') || lines[lineIndex - 1].includes('V/F') || lines[lineIndex - 1].includes('f')){
                idData.sex = 'Female';
            }
            else if(lines[lineIndex - 1].includes('M') || lines[lineIndex - 1].includes('M/M') || lines[lineIndex - 1].includes('V/M') || lines[lineIndex - 1].includes('m')){
                idData.sex = 'Male';
            }
            else
            {
                idData.sex = 'Not Specified';
            }
            idData.nationality = lines[lineIndex - 1].trim().split(' ')[1] ? lines[lineIndex - 1].trim().split(' ')[1] : lines[lineIndex - 1].trim();
        
            idData.givenName = lines[lineIndex - 2].trim();
            idData.surname = lines[lineIndex - 3].trim();
            idData.docNo = lines[lineIndex - 4].trim();
        }
    }

    return idData;
}