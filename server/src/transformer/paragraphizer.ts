export class Paragraphizer {
  constructor() {

  }
  public paragraphize(post: string): Array<string>{
    if(this.isUndefined(post)) return [];
    post = this.trim(post);
    if(this.isEmpty(post)) return [];

    let result = this.stripEmptyParagraphs(post);
    return result;
  }

  private isUndefined(post: string) {
    return !post;
  }

  private stripEmptyParagraphs(post: string) {
    let paragraphs: Array<string> = post.split('\n');
    let result: Array<string> = [];
    paragraphs.forEach((paragraph) => {
      paragraph = this.trim(paragraph);
      if (!this.isEmpty(paragraph)) result.push(paragraph);
    });
    return result;
  }

  private isEmpty(post: string) {
    return post.length === 0;
  }

  private trim(post: string) {
    return post.trim();
  }

}
