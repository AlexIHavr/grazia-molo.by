class TextService {
  getTextArr(text: string, separator: string) {
    return text?.trim() ? text.split(separator).filter((value) => value.trim() !== '') : [];
  }
}

export default new TextService();
