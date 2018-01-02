import fs from 'fs';
import PDFDocumentFactory from './src/core/pdf-document/PDFDocumentFactory';
import { PDFDictionary, PDFName } from './src/core/pdf-objects';
import { PDFContentStream } from './src/core/pdf-structures';

import { arrayToString, charCodes, writeToDebugFile } from './src/utils';

const files = {
  BOL: n => `/Users/user/Desktop/bols/bol${n || ''}.pdf`,
  MINIMAL: '/Users/user/Desktop/pdf-lib/test-pdfs/minimal.pdf',
  PDF_SPEC: '/Users/user/Documents/PDF32000_2008.pdf',
  CMP_SIMPLE_TABLE_DECOMPRESS:
    '/Users/user/Documents/cmp_simple_table-decompress.pdf',
  CMP_SIMPLE_TABLE: '/Users/user/Documents/cmp_simple_table.pdf',
  AST_SCI_DATA_TABLES: '/Users/user/Documents/ast_sci_data_tables_sample.pdf',
  MOVE_CRM_WEB_SERV: '/Users/user/Documents/moveCRM_Webservices.pdf',
};
const inFile = files.PDF_SPEC;
const outFile = '/Users/user/Desktop/modified.pdf';
const bytes = fs.readFileSync(inFile);

const pdfDoc = PDFDocumentFactory.load(bytes);

const pages = pdfDoc.getPages();
console.log(`Pages: ${pages.length}`);
const page1 = pages[0];
console.log(`Page 1 Content Streams: ${page1.getContentStreams().length}`);

const editPdf = () => {
  const page1Resources = page1.get('Resources');
  const page1Font = page1Resources.pdfObject
    ? page1Resources.pdfObject.get('Font')
    : page1Resources.get('Font');

  page1Font.set(
    'F1',
    PDFDictionary.from({
      Type: PDFName.from('Font'),
      Subtype: PDFName.from('Type1'),
      BaseFont: PDFName.from('Times-Roman'),
    }),
  );

  const stream = new PDFContentStream()
    .beginText()
    .setFont('F1', 50)
    .moveText(0, 750)
    .showText('TESTING TESTING TESTING')
    .endText()
    .beginText()
    .setFont('F1', 50)
    .moveText(0, 500)
    .showText('TESTING TESTING TESTING')
    .endText();
  page1.addContentStream(stream);
};

editPdf();

fs.writeFileSync(outFile, pdfDoc.toBytes());
