/* @flow */
import { PDFIndirectObject } from '.';

class PDFObject {
  is = <T>(obj: T) => this instanceof obj;

  get object() {
    return this.is(PDFIndirectObject) ? this.pdfObject : this;
  }

  toString = (): string => {
    throw new Error(
      `toString() is not implemented on ${this.constructor.name}`,
    );
  };

  bytesSize = (): number => {
    throw new Error(
      `bytesSize() is not implemented on ${this.constructor.name}`,
    );
  };

  copyBytesInto = (buffer: Uint8Array): Uint8Array => {
    throw new Error(
      `copyBytesInto() is not implemented on ${this.constructor.name}`,
    );
  };
}

export default PDFObject;