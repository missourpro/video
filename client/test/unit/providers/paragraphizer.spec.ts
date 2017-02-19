import {Paragraphizer} from "../../../src/providers/paragraphizer";
describe('Paragraphizer', () => {
  let paragraphizer: Paragraphizer;
  beforeEach(()=>{
    paragraphizer = new Paragraphizer();
  });
  it('should return list of paragraphs', () => {
    let post: string='line1\nline2\n';
    let paragraphs: Array<string>= paragraphizer.paragraphize(post);
    expect(paragraphs).toContain('line1', 'line2');

  });
  it('should return empty list when string is empty', () => {
    let post: string='';
    let paragraphs: Array<any>= paragraphizer.paragraphize(post);
    expect(paragraphs.length).toEqual(0);
  });
  it('should return empty list when string is undefined', () => {
    let post: string;
    let paragraphs: Array<any>= paragraphizer.paragraphize(post);
    expect(paragraphs.length).toEqual(0);
  });

  it('should return empty list when string contains only spaces and line breaks', () => {
    let post: string=' \n\n   \n       ';
    let paragraphs: Array<any>= paragraphizer.paragraphize(post);
    expect(paragraphs.length).toEqual(0);
  });

  it('should return list of paragraphs not containing empty lines', () => {
    let post: string = 'line1\n\n  \nline2';
    let paragraphs: Array<string> = paragraphizer.paragraphize(post);
    expect(paragraphs.length).toEqual(2);
  });
});
