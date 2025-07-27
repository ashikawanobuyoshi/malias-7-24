import { PDFDocument, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';
import fs from 'fs';
import path from 'path';

export async function generateOrderPdf(orderDetails: any) {
  const pdfDoc = await PDFDocument.create();

  // フォント登録
  pdfDoc.registerFontkit(fontkit);

  // フォント読み込み
  const fontPath = path.resolve('./server/assets/fonts/ipaexg.ttf');
  const fontBytes = fs.readFileSync(fontPath);
  const customFont = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  page.drawText(`ご注文内容`, {
    x: 50,
    y: height - 50,
    size: 18,
    font: customFont,
    color: rgb(0, 0, 0),
  });

  // 他の注文情報を描画...

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
