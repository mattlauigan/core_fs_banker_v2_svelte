const extract = (bitmapStr: string): number[] => {
  const bitArr: number[] = []

  const bitmapLen = bitmapStr.length / 2
  for (let i = 0; i < bitmapLen; i++) {
    const dec = parseInt('0x' + bitmapStr.substring(i * 2, i * 2 + 2))
    for (let j = 0; j < 8; j++) {
      if (dec & (1 << (7 - j))) {
        const bitno = i * 8 + j + 1
        bitArr.push(bitno)
      }
    }
  }

  return bitArr
}

export const Bitmap = {
  extract,
}