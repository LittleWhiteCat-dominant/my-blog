export function extractMarkdownHeadings(markdownText) {
    const regex = /^(#+)\s+(.*)/gm;
    const headings = [];
    let match;
  
    while ((match = regex.exec(markdownText)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({ level, text });
    }
  
    return headings;
  }

  export function transitTagToLevel(header: string) {
    switch (header.toLowerCase()) {
        case 'h1':  return 1;
        case 'h2': return 2;
        case 'h3': return 3;
        case 'h4': return 4;
        case 'h5': return 5;
        case 'h6': return 6;
        default: return 7;
    }
  }