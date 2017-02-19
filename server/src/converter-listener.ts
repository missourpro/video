export interface ConverterListener{
  converted(): void;
}
export class NullConverterListener implements ConverterListener{
  converted(): void {
  }

}
